console.log('Service Worker Loaded.');

self.addEventListener('push', (event) => {
  const data = event.data.json();
  console.log('Push Received.');

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: 'Notified by Admin',
      icon: 'https://cdn0.iconfinder.com/data/icons/customicondesignoffice5/256/examples.png',
      tag: 'admin',
    })
  );
});
