self.addEventListener('install', event => {
  console.log('[Service Worker] Installing service worker...', event);
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  console.log('[Service Worker] Activating service worker...', event);
  self.clients.claim();
});
