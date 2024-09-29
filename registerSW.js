(async () => {
  if (
    'serviceWorker' in navigator &&
    window.location.origin !== 'http://localhost:5173'
  ) {
    try {
      await navigator.serviceWorker.register('sw.js');
      console.log('Service Worker Registered');
    } catch (err) {
      console.log('Service Worker Failed to Register', err);
    }
  }
})();
