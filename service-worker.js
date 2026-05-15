const CACHE_NAME = 'ps-cafe-v5-2-action-hotfix-20260515-2';
const urlsToCache = [
  './index.html',
  './manifest.json',
  './service-worker.js',
  './icon.jpeg',
  './wallpaper.jpeg',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache).catch(err => console.warn('Cache addAll error:', err)))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => Promise.all(
      cacheNames.map(cacheName => {
        if (cacheName !== CACHE_NAME && cacheName.startsWith('ps-cafe')) return caches.delete(cacheName);
      })
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const req = event.request;
  const isHtml = req.mode === 'navigate' || req.destination === 'document' || req.url.endsWith('/index.html');

  if (isHtml) {
    event.respondWith(
      fetch(req, { cache: 'no-store' }).then(response => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
        return response;
      }).catch(() => caches.match(req).then(r => r || caches.match('./index.html')))
    );
    return;
  }

  event.respondWith(
    caches.match(req).then(cached => cached || fetch(req).then(response => {
      if (!response || response.status !== 200 || response.type !== 'basic') return response;
      const copy = response.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
      return response;
    })).catch(() => caches.match(req))
  );
});
