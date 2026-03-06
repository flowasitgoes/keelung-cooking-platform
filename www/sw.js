var CACHE_NAME = 'keelung-cooking-v1';

var urlsToCache = [
  './index.html',
  './courses.html',
  './student.html',
  './chef.html',
  './style.css',
  './app.js',
  './manifest.webmanifest',
  './assets/icons/icon-192.png',
  './assets/images/placeholder.svg'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache).catch(function(err) { console.warn('SW precache:', err); });
    })
  );
  self.skipWaiting();
});

self.addEventListener('fetch', function(event) {
  if (event.request.url.indexOf(self.location.origin) !== 0) return;
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(keys.map(function(key) {
        if (key !== CACHE_NAME) return caches.delete(key);
      }));
    })
  );
  self.clients.claim();
});
