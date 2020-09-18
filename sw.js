const cacheName = 'no-connection-v1';

const assetsToCache = [
  'https://fonts.googleapis.com/css?family=Roboto:400,700',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css',
  'assets/css/style.css',
  'assets/images/pwa-logo.png',
  'assets/images/offline.jpg',
  'offline.html'
];

async function cacheStaticAssets() {
  const cache = await caches.open(cacheName);
  return cache.addAll(assetsToCache);
}

self.addEventListener('install', event => {
  console.log('[Service Worker] Installing service worker...', event);
  event.waitUntil(cacheStaticAssets());
  self.skipWaiting();
});

// TODO delete old caches
self.addEventListener('activate', event => {
  console.log('[Service Worker] Activating service worker...', event);
  self.clients.claim();
});

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    return response;
  } catch (error) {
    const cache = await caches.open(cacheName);
    const url = request.url.endsWith('/') ? 'offline.html' : request.url;
    return cache.match(url);
  }
}

// TODO add a commit with only a console log
self.addEventListener('fetch', event => {
  event.respondWith(networkFirst(event.request));
});
