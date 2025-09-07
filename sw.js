// This is a basic service worker for PWA functionality.

const CACHE_NAME = 'check-in-system-cache-v1';
// *** เปลี่ยนชื่อไฟล์ตรงนี้ให้เป็น index.html ***
const urlsToCache = [
  './index.html' 
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

