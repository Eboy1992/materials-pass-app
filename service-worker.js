const cacheName = 'mpa-v1';

// ✅ Only list files you're sure EXIST in your repo
const assets = [
  './index.html',
  './entry.html',
  './leaveform.html',
  './pullout.html',
  './purchaserequest.html',
  './transmittal.html',
  './manifest.json',
  './images/icon-192.png',
  './images/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then(async cache => {
      for (const asset of assets) {
        try {
          await cache.add(asset);
          console.log('✅ Cached:', asset);
        } catch (err) {
          console.error('❌ Failed to cache:', asset, err);
        }
      }
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
