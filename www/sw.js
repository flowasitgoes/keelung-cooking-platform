var CACHE_NAME = 'keelung-cooking-v1';

var urlsToCache = [
  './index.html',
  './courses.html',
  './student.html',
  './chef.html',
  './style.css',
  './app.js',
  './manifest.webmanifest',
  './assets/icons/icon-192.svg',
  './assets/images/placeholder.svg'
];

self.addEventListener('install', function(event) {
  var base = self.location.origin + self.location.pathname.replace(/\/sw\.js$/, '/');
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return Promise.all(urlsToCache.map(function(u) {
        var full = u.startsWith('http') ? u : base + u.replace(/^\.\//, '');
        return fetch(full).then(function(r) { return cache.put(full, r); }).catch(function() {});
      }));
    })
  );
  self.skipWaiting();
});

self.addEventListener('fetch', function(event) {
  if (event.request.url.indexOf(self.location.origin) !== 0) return;
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request).then(function(r) {
        var clone = r.clone();
        if (r.status === 200 && event.request.method === 'GET') {
          caches.open(CACHE_NAME).then(function(cache) { cache.put(event.request, clone); });
        }
        return r;
      });
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
