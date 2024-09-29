const CACHE_NAME = 'thisseasx-cv';
const CACHE_VERSION = 1;
const CACHE = `${CACHE_NAME}-v${CACHE_VERSION}`;

const BASE_URL =
  self.location.origin !== 'http://localhost:5173' ? '/thisseasx-cv' : '';

const ASSETS = [
  `${BASE_URL}/`,
  `${BASE_URL}/index.html?${CACHE}`,
  `${BASE_URL}/manifest.webmanifest`,

  `${BASE_URL}/styles/fonts.css`,
  `${BASE_URL}/styles/main.css`,
  `${BASE_URL}/styles/reset.css`,

  `${BASE_URL}/scripts/collapse.js`,
  `${BASE_URL}/scripts/skills.js`,
  `${BASE_URL}/registerSW.js`,

  `${BASE_URL}/icons/apple-touch-icon.png`,
  `${BASE_URL}/icons/favicon.ico`,
  `${BASE_URL}/icons/icon-192-maskable.png`,
  `${BASE_URL}/icons/icon-192.png`,
  `${BASE_URL}/icons/icon-512-maskable.png`,
  `${BASE_URL}/icons/icon-512.png`,
  `${BASE_URL}/icons/disc.svg`,
  `${BASE_URL}/icons/plus.svg`,

  `${BASE_URL}/images/avatar-thumbnail.webp`,

  `${BASE_URL}/fonts/OpenSans-VariableFont_wdth,wght.ttf`,
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE);

      try {
        await cache.addAll(ASSETS);
      } catch (err) {
        // Most likely offline
        console.error(err);
      }
    })(),
  );

  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    (async () => {
      const cacheKeys = await caches.keys();

      await Promise.all(
        cacheKeys
          .filter((cache) => cache !== CACHE)
          .map((cache) => caches.delete(cache)),
      );
    })(),
  );

  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    (async () => {
      try {
        const response = await caches.match(e.request);

        return response || fetch(e.request);
      } catch (err) {
        // Most likely unable to find asset in cache
        console.error(err);
      }
    })(),
  );
});
