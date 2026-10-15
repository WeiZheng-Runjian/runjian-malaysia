"""Snapshot the public English Runjian site for a local Vite multi-page build.
No login, form submission, or cross-site crawling. CMS scripts are not imported.
"""
import concurrent.futures as cf, hashlib, html, json, pathlib, re, subprocess, urllib.parse as U
ROOT=pathlib.Path(__file__).resolve().parent.parent
CACHE=ROOT/'.reference';CACHE.mkdir(exist_ok=True)
BASE='https://en.runjian.com'
manifest={}; failures=[]
def fetch(url,path):
 if path.exists() and path.stat().st_size: return True
 path.parent.mkdir(parents=True,exist_ok=True)
 r=subprocess.run(['curl','-fsSL','--retry','2','--max-time','50',url,'-o',str(path)],capture_output=True)
 if r.returncode:
  path.unlink(missing_ok=True);return False
 return True
def path_for(url):
 ext=pathlib.Path(U.urlsplit(url).path).suffix
 if not re.match(r'^\.[a-zA-Z0-9]{1,5}$',ext):ext='.bin'
 return 'assets/'+hashlib.sha256(url.encode()).hexdigest()[:16]+ext
fetch(BASE+'/sitemap.xml',CACHE/'sitemap.xml')
queue=set(re.findall(r'<loc>(.*?)</loc>',(CACHE/'sitemap.xml').read_text()));done={}
def page_get(url):
 path=U.urlsplit(url).path
 cache=CACHE/'pages'/('index.html' if path=='/' else path.lstrip('/'))
 if fetch(url,cache): return url,cache.read_text(errors='replace')
 return url,None
while queue:
 print('Fetching pages:',len(queue),flush=True)
 with cf.ThreadPoolExecutor(max_workers=8) as pool:results=list(pool.map(page_get,sorted(queue)))
 queue=set()
 for url,s in results:
  if s is None:failures.append(url);continue
  done[url]=s
  for link in re.findall(r'href=[\"\']([^\"\']+)',s):
   link=U.urljoin(url,html.unescape(link));p=U.urlsplit(link)
   if p.netloc=='en.runjian.com' and (p.path.endswith('.html') or p.path=='/'):
    clean=BASE+p.path
    if clean not in done and clean not in failures:queue.add(clean)
 if len(done)>800:raise RuntimeError('Unexpected crawl size; inspect before continuing')
# Collect only referenced resources. Leave other websites as external links.
urls=set()
for url,s in done.items():
 for tag in re.findall(r'<(?:img|video|source|link|script)\b[^>]*>',s,re.I):
  if 'dns-prefetch' in tag or 'canonical' in tag:continue
  for raw in re.findall(r'\b(?:src|lazy|poster|href)=[\"\']([^\"\']+)',tag):
   a=U.urljoin(url,html.unescape(raw))
   if a.startswith('https://'):
    if '<script' in tag and '/upload/js/' not in a:continue
    urls.add(a)
 for raw in re.findall(r'url\([\"\']?([^\)\"\']+)',s):
  if not raw.startswith('data:'):urls.add(U.urljoin(url,html.unescape(raw)))

def asset_get(url):
 local=path_for(url);manifest[url]=local
 path=ROOT/'public'/local
 # CDN assets need browser transport (the live site can retrieve them).
 if 'thefastimg.com' in url or 'thefastvideo.com' in url:return
 if not fetch(url,path):failures.append(url)
with cf.ThreadPoolExecutor(max_workers=8) as pool:list(pool.map(asset_get,sorted(urls)))
# CSS dependencies, resolved against the original stylesheet URL.
for url,local in list(manifest.items()):
 p=ROOT/'public'/local
 if p.suffix!='.css' or not p.exists():continue
 css=p.read_text(errors='replace')
 for raw in re.findall(r'url\(([^)]+)\)',css):
  raw=raw.strip(' \"\'')
  if raw.startswith(('data:','#')):continue
  absolute=U.urljoin(url,raw)
  if absolute not in manifest:asset_get(absolute)
 # Store pristine CSS for repeatable rewriting.
 (CACHE/pathlib.Path(local).name).write_text(css)
(ROOT/'docs/site-manifest.json').write_text(json.dumps({'source':BASE,'pages':sorted(done),'assets':manifest,'failures':failures},indent=2))
print('Pages:',len(done),'assets:',len(manifest),'fetch failures:',len(failures),flush=True)
