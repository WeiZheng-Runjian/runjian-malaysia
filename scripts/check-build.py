"""Check local HTML navigation and asset references in the deployable snapshot."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit,unquote
import json,re
root=Path('dist');issues=[];checked=0
class Check(HTMLParser):
 def handle_starttag(self,tag,attrs):
  global checked
  for key,value in attrs:
   if key not in ('href','src','poster') or not value:continue
   u=urlsplit(value)
   if u.scheme or u.netloc or not u.path:continue
   checked+=1
   target=(self.file.parent/unquote(u.path)) if not u.path.startswith('/') else root/unquote(u.path).lstrip('/')
   if not target.exists():issues.append({'page':str(self.file),'attribute':key,'target':value})
for path in root.rglob('*.html'):
 parser=Check();parser.file=path;parser.feed(path.read_text())
report={'htmlPages':len(list(root.rglob('*.html'))),'checkedReferences':checked,'missingLocalReferences':issues,'totalBytes':sum(p.stat().st_size for p in root.rglob('*') if p.is_file())}
Path('docs/build-audit.json').write_text(json.dumps(report,indent=2));print(json.dumps(report,indent=2))
if issues:raise SystemExit(1)
