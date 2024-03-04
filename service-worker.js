// Service Worker Implementation
const CACHE_NAME = 'qr-code-generator-v1';
const relFilesToCache = [
  'index.html',
  'manifest.json',
  'css/bootstrap.min.css',
  'js/qrcode.min.js',
  '',
];
const loc = self.location;

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        // now, we want to modify the relFilesToCache to include the path 
        // as a prefix
        const cacheUrls = relFilesToCache.map(
          fileName => new URL(fileName, loc).pathname
        );
        return cache.addAll(cacheUrls);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
