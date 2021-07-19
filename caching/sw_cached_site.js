const CACHE_NAME = 'site_caches';

// Call Install Event
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installed');
});

// Call Activate Event
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activated');
  // Remove unwanted caches
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Service Worker: Clearing Old Cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Call Fetch Event
self.addEventListener('fetch', (event) => {
  console.log('Service Worker: Fetching');

  // event.respondWith(
  //   caches.open(CACHE_NAME).then((cache) => {
  //     cache.match(event.request).then((cachedResponse) => {
  //       // 01 - on network response
  //       // return (
  //       //   cachedResponse ||
  //       //   fetch(event.request).then((networkResponse) => {
  //       //     // Make copy/clone of response
  //       //     const networkResponseClone = networkResponse.clone();
  //       //     // Add response to cache
  //       //     cache.put(event.request, networkResponseClone);
  //       //     return networkResponse;
  //       //   })
  //       // );

  //       // // 02 - Stale-while-revalidate
  //       // const fetchPromise = fetch(event.request).then((networkResponse) => {
  //       //   // Make copy/clone of response
  //       //   const networkResponseClone = networkResponse.clone();
  //       //   // Add response to cache
  //       //   cache.put(event.request, networkResponseClone);
  //       //   return networkResponse;
  //       // });
  //       // return cachedResponse || fetchPromise;
  //     });
  //   })
  // );

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Make copy/clone of response
        const resClone = response.clone();
        // Open cache
        caches.open(CACHE_NAME).then((cache) => {
          // Add response to cache
          cache.put(event.request, resClone);
        });
        return response;
      })
      .catch((error) => caches.match(event.request).then((response) => response))
  );
});
