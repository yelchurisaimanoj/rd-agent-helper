const CACHE='rd-shell-v9';
const ASSETS=['./','./index.html','./styles-v7.css','./app-v7.js?v=9','./ui.js?v=7'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
 const url=new URL(e.request.url);
 if(e.request.method!=='GET'||url.origin!==self.location.origin||!['/','index.html','app.js','styles.css','app-v7.js','styles-v7.css','ui.js'].some(p=>url.pathname.endsWith(p))||url.pathname.endsWith('config.js'))return;
 e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)));
});
