const CACHE_NAME = 'modi-flappy-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/modi.png',
  '/bg_music.mp3',
  '/gameover.mp3',
  // Manifest & Worker
  '/manifest.webmanifest',
  '/sw.js',
  // Icons (Must be created and added to the folder)
  '/modi_icon_192.png',
  '/modi_icon_512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        // No cache match - fetch from network
        return fetch(event.request);
      })
  );
});
