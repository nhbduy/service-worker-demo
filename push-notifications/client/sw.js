console.log('Service Worker Loaded.');

self.addEventListener('push', (e) => {
  const data = e.data.json();
  console.log('Push Received.');

  self.registration.showNotification(data.title, {
    body: 'Notified by Admin',
    icon: 'https://cdn0.iconfinder.com/data/icons/customicondesignoffice5/256/examples.png',
  });
});
