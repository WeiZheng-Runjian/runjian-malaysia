import {request} from '@playwright/test';
import {readFileSync,writeFileSync,existsSync,mkdirSync} from 'node:fs';
import {dirname} from 'node:path';
const manifest=JSON.parse(readFileSync('docs/site-manifest.json','utf8'));
const queue=Object.entries(manifest.assets).filter(([url,path])=>!existsSync('public/'+path));
const total=queue.length,errors=[];let completed=0;
const context=await request.newContext({userAgent:'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36',extraHTTPHeaders:{Referer:'https://en.runjian.com/'}});
await Promise.all(Array.from({length:4},async()=>{
 while(queue.length){
  const [url,path]=queue.shift();
  try{
   const response=await context.get(url,{timeout:120000,maxRetries:2});
   if(!response.ok())throw Error(`HTTP ${response.status()}`);
   const data=await response.body();mkdirSync(dirname('public/'+path),{recursive:true});writeFileSync('public/'+path,data);await response.dispose();
  }catch(e){errors.push({url,error:e.message.slice(0,200)});}
  completed++;
  if(completed%20===0)console.log(`${completed}/${total}; failed ${errors.length}`);
  writeFileSync('docs/media-errors.json',JSON.stringify(errors,null,2));
 }
}));
await context.dispose();console.log('Complete',completed,'failures',errors.length);
