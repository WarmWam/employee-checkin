// This is a basic service worker for PWA functionality.

const CACHE_NAME = 'check-in-system-cache-v1';
const urlsToCache = [
  './check-in-system.html' 
  // In a real app, you would add CSS, JS, and image files here too.
];

// Install event: fires when the service worker is first installed.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event: fires for every network request.
// This example serves cached content first (cache-first strategy).
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        // Not in cache - fetch from network
        return fetch(event.request);
      }
    )
  );
});

