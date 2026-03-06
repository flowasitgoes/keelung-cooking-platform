var CACHE_NAME = 'keelung-cooking-v2';

var urlsToCache = [
  '/index.html',
  '/courses.html',
  '/student.html',
  '/chef.html',
  '/about.html',
  '/style.css',
  '/app.js',
  '/manifest.webmanifest',
  '/public/assets/icons/Keelung-icon-192x192.jpg',
  '/public/assets/images/placeholder.svg'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache).catch(function(err) { console.warn('SW precache:', err); });
    })
  );
  self.skipWaiting();
});

function isCriticalResource(req) {
  var u = req.url;
  return req.mode === 'navigate' ||
    u.indexOf('/style.css') !== -1 ||
    u.indexOf('/app.js') !== -1 ||
    u.indexOf('.html') !== -1 ||
    u.indexOf('/manifest.webmanifest') !== -1;
}

self.addEventListener('fetch', function(event) {
  if (event.request.url.indexOf(self.location.origin) !== 0) return;
  if (event.request.method !== 'GET') return;
  if (isCriticalResource(event.request)) {
    event.respondWith(
      fetch(event.request)
        .then(function(res) {
          var clone = res.clone();
          caches.open(CACHE_NAME).then(function(cache) { cache.put(event.request, clone); });
          return res;
        })
        .catch(function() {
          return caches.match(event.request);
        })
    );
    return;
  }
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
