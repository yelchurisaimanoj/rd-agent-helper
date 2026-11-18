const CACHE='rd-shell-v6';
const ASSETS=['./','./index.html','./styles.css?v=6','./app.js?v=6'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
 const url=new URL(e.request.url);
 if(e.request.method!=='GET'||url.origin!==self.location.origin||!['/','index.html','app.js','styles.css'].some(p=>url.pathname.endsWith(p))||url.pathname.endsWith('config.js'))return;
 e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)));
});
