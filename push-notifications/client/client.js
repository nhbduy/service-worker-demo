function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// -------------------------------------------
const publicVapidKey =
  'BFPC-ONgq2f3tlt2RowSXfkD5nOjQvnlWGVnxDDPFOKqF0eIArt_1nO8pC5FFRKpeavQ0zPEKIOwi92uS2b6B_I';

// Check for service worker
if ('serviceWorker' in navigator) {
  send().catch((err) => console.error(err));
}

// Register SW, Register Push, Send Push
async function send() {
  // Register SW
  console.log('Registering Service Worker...');
  const register = await navigator.serviceWorker.register('/sw.js', {
    scope: '/',
  });
  console.log('Service Worker Registered.');

  // Register Push
  console.log('Registering Push...');
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlB64ToUint8Array(publicVapidKey),
  });
  console.log('Push Registered.');

  // Send Push
  await fetch('/subscribe', {
    method: 'POST',
    body: JSON.stringify(subscription),
    headers: {
      'content-type': 'application/json',
    },
  });
  console.log('Push Sent.');
}
