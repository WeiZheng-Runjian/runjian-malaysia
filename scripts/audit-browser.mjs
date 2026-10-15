import { chromium } from '@playwright/test';
import { readFileSync, writeFileSync } from 'node:fs';
const browser = await chromium.launch({headless: true, executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE || process.env.HOME + '/Library/Caches/ms-playwright/chromium-1237/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing'});
const manifest=JSON.parse(readFileSync('docs/site-manifest.json','utf8'));
const queue=manifest.pages.map(u=>new URL(u).pathname);
const results=[];
await Promise.all(Array.from({length:5},async()=>{
 const page=await browser.newPage({viewport:{width:1440,height:900}});
 let errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 while(queue.length){
  const route=queue.shift();errors=[];
  try{
   await page.goto('http://127.0.0.1:5173'+route,{waitUntil:'domcontentloaded'});
   await page.waitForFunction(()=>window.runjianReady===true,{},{timeout:12000});
   await page.waitForTimeout(100);
   results.push({route,errors:[...new Set(errors)],title:await page.title()});
  }catch(e){results.push({route,errors:[...new Set(errors)],failure:e.message.slice(0,250)});}
  if(results.length%30===0)console.log('Checked',results.length,'/',manifest.pages.length);
 }
 await page.close();
}));
writeFileSync('docs/browser-audit.json',JSON.stringify(results,null,2));
console.log(JSON.stringify(results.filter(r=>r.errors.length||r.failure),null,2));
await browser.close();
