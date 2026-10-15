"""Lossless WebP conversion: retain exact pixels and transparency, reduce Pages size."""
import concurrent.futures, json,pathlib,subprocess
ROOT=pathlib.Path(__file__).resolve().parent.parent
assets=ROOT/'public/assets'
def convert(p):
 out=p.with_suffix('.webp')
 r=subprocess.run(['cwebp','-quiet','-lossless','-exact','-m','4',str(p),'-o',str(out)],capture_output=True)
 if r.returncode or not out.exists():return None
 if out.stat().st_size>=p.stat().st_size:out.unlink();return None
 return {'old':'assets/'+p.name,'new':'assets/'+out.name,'before':p.stat().st_size,'after':out.stat().st_size}
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool: results=[r for r in pool.map(convert,[p for p in assets.glob('*.png') if p.stat().st_size>200000]) if r]
manifest_path=ROOT/'docs/site-manifest.json';manifest=json.loads(manifest_path.read_text());mapping={r['old']:r['new'] for r in results}
manifest['assets']={u:mapping.get(p,p) for u,p in manifest['assets'].items()}
manifest_path.write_text(json.dumps(manifest,indent=2))
for p in assets.glob('*.js'):
 text=p.read_text(errors='replace')
 for old,new in mapping.items():text=text.replace(old,new)
 p.write_text(text)
for r in results:(ROOT/'public'/r['old']).unlink()
(ROOT/'docs/image-optimization.json').write_text(json.dumps({'method':'Lossless WebP, exact RGBA pixels','savedBytes':sum(r['before']-r['after'] for r in results),'files':results},indent=2))
print('Converted',len(results),'images; saved',sum(r['before']-r['after'] for r in results)//1000000,'MB')
