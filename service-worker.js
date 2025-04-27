const CACHE_NAME = 'budget-planner-v4';
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/app.js',
  '/style.css',
  '/icons/favicon.ico'
];

// Install event: cache necessary files
self.addEventListener('install', (evt) => {
  self.skipWaiting();
  evt.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(FILES_TO_CACHE);
      })
      .catch((err) => console.error('Cache failed:', err))
  );
});

// Activate event: delete old caches and take control
self.addEventListener('activate', (evt) => {
  const cacheWhitelist = [CACHE_NAME];
  evt.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      self.clients.claim();
    })
  );
});

// Fetch event: try the cache first, then network
self.addEventListener('fetch', (evt) => {
  // Skip external resources
  if (evt.request.url.startsWith('https://') || evt.request.url.startsWith('http://')) {
    return;
  }

  evt.respondWith(
    caches.match(evt.request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          // Update cache in the background
          fetch(evt.request)
            .then((networkResponse) => {
              caches.open(CACHE_NAME)
                .then((cache) => cache.put(evt.request, networkResponse.clone()));
            })
            .catch(() => {}); // Ignore network errors
          return cachedResponse;
        }
        return fetch(evt.request);
      })
      .catch(() => {
        // If both cache and network fail, return a fallback response
        if (evt.request.mode === 'navigate') {
          return caches.match('/index.html');
        }
        return new Response('Offline');
      })
  );
});
