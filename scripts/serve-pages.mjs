// Serve the built files under the same repository subpath used by GitHub Pages.
import {createServer} from 'node:http';
import {createReadStream,existsSync,statSync} from 'node:fs';
import {resolve,extname} from 'node:path';
const root=resolve('dist');const prefix='/runjian-malaysia/';
const mime={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.json':'application/json','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.mp4':'video/mp4','.ico':'image/x-icon'};
createServer((req,res)=>{
 const url=new URL(req.url,'http://localhost');
 if(!url.pathname.startsWith(prefix)){res.writeHead(404);return res.end();}
 let path=resolve(root,decodeURIComponent(url.pathname.slice(prefix.length))||'index.html');
 if(!path.startsWith(root+'/')||!existsSync(path)||!statSync(path).isFile()){res.writeHead(404);return res.end();}
 const size=statSync(path).size;const range=req.headers.range;
 if(range){const match=/bytes=(\d+)-(\d*)/.exec(range);if(match){const start=Number(match[1]),end=Math.min(match[2]?Number(match[2]):size-1,size-1);res.writeHead(206,{'Content-Type':mime[extname(path)]||'application/octet-stream','Content-Range':`bytes ${start}-${end}/${size}`,'Accept-Ranges':'bytes','Content-Length':end-start+1});createReadStream(path,{start,end}).pipe(res);return;}}
 res.writeHead(200,{'Content-Type':mime[extname(path)]||'application/octet-stream','Content-Length':size,'Accept-Ranges':'bytes'});createReadStream(path).pipe(res);
}).listen(4173,'127.0.0.1',()=>console.log('http://127.0.0.1:4173/runjian-malaysia/'));
