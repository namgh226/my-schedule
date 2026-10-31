const CACHE_NAME = 'my-schedule-v1';
const CACHE_FILES = [
  '/my-schedule/',
  '/my-schedule/index.html',
  '/my-schedule/icon-192.png',
  '/my-schedule/icon-512.png',
];
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(CACHE_FILES);
    })
  );
  self.skipWaiting();
});
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});
self.addEventListener('fetch', event => {
  if (
    event.request.url.includes('firebase') ||
    event.request.url.includes('apis.data.go.kr') ||
    event.request.url.includes('firebasedatabase')
  ) {
    return;
  }
  event.respondWith(
    fetch(event.request)
      .then(response => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, clone);
        });
        return response;
      })
      .catch(() => {
        return caches.match(event.request);
      })
  );
});
