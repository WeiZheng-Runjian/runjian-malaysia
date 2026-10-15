"""Transform the reference snapshot into portable, self-contained Vite pages."""
import hashlib,html,json,pathlib,re,urllib.parse as U
ROOT=pathlib.Path(__file__).resolve().parent.parent
m=json.loads((ROOT/'docs/site-manifest.json').read_text()); assets=m['assets']; BASE=m['source']; pages=set(m['pages']);search=[]
for url,local in assets.items():
 p=ROOT/'public'/local;raw=ROOT/'.reference'/p.name
 if p.suffix=='.css' and raw.exists():
  css=raw.read_text()
  def cssurl(match):
   value=match.group(1).strip(' \"\'')
   target=assets.get(U.urljoin(url,value))
   return 'none' if target in ['assets/ed404cb7a425308c.png','assets/578aed09a48b0ea9.png'] else ('url("'+pathlib.PurePosixPath(target).name+'")' if target else match.group(0))
  p.write_text(re.sub(r'url\(([^)]+)\)',cssurl,css))
# Reconcile legacy presentation libraries with the current local Swiper API.
for url, local in assets.items():
 p=ROOT/'public'/local
 if p.suffix != '.js' or not p.exists(): continue
 code=p.read_text(errors='replace')
 if 'container.clientWidth' in code and "document.querySelector('#box')" in code:
  
  if not code.startswith("if(document.querySelector('#box'))"):
   code="if(document.querySelector('#box')) {\n"+code+"\n}\n"
 for remote, target in assets.items():
  if remote in code and '/cms/image/' in remote:
   code=code.replace("'"+remote+"'", "window.runjianURL('"+target+"')")
 p.write_text(code)
for url in sorted(pages):
 path=U.urlsplit(url).path.lstrip('/') or 'index.html'
 raw=(ROOT/'.reference/pages'/path).read_text()
 prefix='../'*path.count('/') or './'
 scripts=[]
 def extract(match):
  tag=match.group(0);src=re.search(r'\bsrc="([^"]+)"',tag)
  if src:
   absolute=U.urljoin(url,html.unescape(src.group(1)))
   if '/upload/js/' in absolute and absolute in assets:scripts.append(prefix+assets[absolute])
  elif 'tpltool_ExtractJs' in tag:
   code=re.sub(r'^<script[^>]*>|</script>$','',tag,flags=re.S)
   # Source logs scroll progress; keep console useful for actual diagnostics.
   code=code.replace("var banner = new Swiper('.banner .swiper-container', {", "var banner = new Swiper('.banner .swiper-container', {watchOverflow: false,")
   code=code.replace('swiper_top.controller.control = swiper1;', 'if(swiper_top.controller && swiper1.controller) swiper_top.controller.control = swiper1;').replace('swiper1.controller.control = swiper_top;', 'if(swiper1.controller && swiper_top.controller) swiper1.controller.control = swiper_top;')
   code=code.replace('var targetUrl = "/globalSearch.html";', 'var targetUrl = window.runjianURL("globalSearch.html");').replace("window.open(targetUrl, '_blank');", '')
   code=re.sub(r'console\.log\([^;\n]*\);?','',code)
   filename='assets/page-'+hashlib.sha256(url.encode()).hexdigest()[:12]+'.js'
   (ROOT/'public'/filename).write_text(code);scripts.append(prefix+filename)
  return ''
 s=re.sub(r'<script\b[^>]*>[\s\S]*?</script>',extract,raw,flags=re.I)
 s=re.sub(r'<!--([\s\S]*?)-->','',s)
 s=re.sub(r'<input\b[^>]*type=[\"\']hidden[\"\'][^>]*>','',s,flags=re.I)
 s=re.sub(r'<input\b[^>]*name=[\"\'](?:propJson|i18nJson)[\"\'][^>]*>','',s,flags=re.I)
 s=re.sub(r'<link[^>]+rel="(?:canonical|dns-prefetch)"[^>]*>','',s)
 def lazy(match):
  tag=match.group(0);l=re.search(r'\blazy="([^"]+)"',tag)
  if l:tag=re.sub(r'\bsrc="[^"]*"','src="'+l.group(1)+'"',tag);tag=re.sub(r'\s+lazy="[^"]*"','',tag)
  return tag
 s=re.sub(r'<img\b[^>]*>',lazy,s)
 def attr(match):
  key,val=match.group(1),html.unescape(match.group(2));absolute=U.urljoin(url,val);p=U.urlsplit(absolute)
  if absolute in assets:return key+'="'+prefix+assets[absolute]+'"'
  clean=BASE+p.path
  if key=='href' and clean in pages:
   target=p.path.lstrip('/') or 'index.html'
   return 'href="'+prefix+target+('?' + html.escape(p.query,quote=True) if p.query else '')+('#'+p.fragment if p.fragment else '')+'"'
  if key=='href' and val.startswith('/'):return 'href="'+html.escape(absolute,quote=True)+'"'
  if key=='href' and (val=='undefined' or val.startswith('The ') or len(val)>200 or val.startswith("RunDo's")): return 'href="#"'
  if key=='href' and re.fullmatch(r'ctn[0-9]+',val):return 'href="#'+val+'"'
  return match.group(0)
 s=re.sub(r'\b(src|href|poster)="([^"]*)"',attr,s)
 def inline_css(match):
  val=match.group(1).strip(' \"\'');target=assets.get(U.urljoin(url,html.unescape(val)))
  return 'url('+prefix+target+')' if target else match.group(0)
 s=re.sub(r'url\(([^)]+)\)',inline_css,s)
 s=s.replace('<head>', '<head><meta charset="utf-8">')
 s=s.replace('width=device-width, initial-scale=1, user-scalable=no','width=device-width, initial-scale=1')
 title=re.search(r'<title>(.*?)</title>',s,re.S);title=html.unescape(title.group(1)) if title else path
 s=re.sub(r'<title>.*?</title>','<title>'+html.escape(title)+' | Malaysia</title>',s,flags=re.S)
 # Local script bootstrap loads presentation code after providing its dependencies.
 payload=json.dumps(scripts).replace('</','<\\/')
 s=s.replace('</body>','<script type="application/json" id="local-presentation-scripts">'+payload+'</script><script type="module" src="'+prefix+'src/main.js"></script></body>')
 out=ROOT/U.unquote(path);out.parent.mkdir(parents=True,exist_ok=True);out.write_text(s)
 body=re.sub(r'<style[\s\S]*?</style>|<script[\s\S]*?</script>',' ',s)
 text=html.unescape(re.sub('<[^>]+>',' ',body));text=re.sub(r'\s+',' ',text).strip()
 search.append({'url':path,'title':title,'text':text[:18000]})
(ROOT/'public/search-index.json').write_text(json.dumps(search,ensure_ascii=False))
print('Prepared',len(search),'local pages')
