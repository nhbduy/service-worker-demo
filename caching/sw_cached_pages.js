const CACHE_NAME = `pages_caches`;

const cacheAssets = ['index.html', 'about.html', '/css/style.css', '/js/main.js'];

// Call Install Event
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installed');

  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching Files');
        cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting())
  );
});

// Call Activate Event
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activated');
  // Remove unwanted caches
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => {
            console.log('Service Worker: Clearing Old Cache');
            return caches.delete(cacheName);
          })
      );
    })
  );
});

// Call Fetch Event
self.addEventListener('fetch', (event) => {
  console.log('Service Worker: Fetching');
  // e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Implement cache-first strategy
      return cachedResponse || fetch(event.request);
    })
  );
});
