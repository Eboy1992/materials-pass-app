const cacheName = 'materials-pass-cache-v1';

const assets = [
  '/index.html',
  '/entry.html',
  '/leaveform.html',
  '/pullout.html',
  '/purchaserequest.html',
  '/transmittal.html',
  '/header.png',
  '/images/icon-192.png',
  '/images/icon-512.png'
];

// Install event: cache app files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// Fetch event: load from cache if offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
