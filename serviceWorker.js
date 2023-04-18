const cacheName = 'site-cache';
const urlsToCache = [
  '/',
  '/src',
  'index.html',
  '/src/css/style.css',
  '/src/script.js',
  '/public'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName)
      .then(function(cache) {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
      .catch(function(error) {
        console.error('Erro ao fazer cache dos arquivos:', error);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
