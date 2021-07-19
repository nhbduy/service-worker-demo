const MODES = {
  pages: { src: '../sw_cached_pages.js', type: 'Pages' },
  site: { src: '../sw_cached_site.js', type: 'Site' },
};

const currentMode = MODES.site;

registerSW();

function registerSW() {
  // Make sure sw are supported
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register(currentMode.src)
        .then((reg) => console.log(`Service Worker: Registered (${currentMode.type})`))
        .catch((err) => console.log(`Service Worker: Error: ${err}`));
    });
  }
}

function unregisterSW() {
  // Unregister all SWs in current origin
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      for (let registration in registrations) {
        registration.unregister().then(() => (unregistered) => console.log(unregistered));
      }
    });
  }
}
