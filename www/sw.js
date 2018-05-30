var now = new Date();
var key = now.getFullYear() + now.getMonth() + now.getDate() + '-key';

var dataCacheName = 'weatherData-v1-' + key;
var cacheName = 'weatherPWA-final-1-' + key;
var filesToCache = [
  '/',
  '/index.html',
  '/js/brain.js',
  '/js/coat.js',
  '/js/network.js',
  '/css/style.css',
  '/images/cartman.png',
  '/images/cartman42x42.png',
  '/images/cartman72x72.png',
  '/images/cartman192x192.png',
  '/images/kenny.png'
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName && key !== dataCacheName) {
          return caches.delete(key);
        }
      }));
    })
  );
  
  return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  var dataUrl = 'api.openweathermap.org';
  if (e.request.url.indexOf(dataUrl) > -1) {
    e.respondWith(
      caches.open(dataCacheName).then(function(cache) {
        return fetch(e.request).then(function(response){
          cache.put(e.request.url, response.clone());
          return response;
        });
      })
    );
  } else {
    e.respondWith(
      caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
      })
    );
  }
});