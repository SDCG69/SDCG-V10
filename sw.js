const CACHE = 'challenge-cards-v11';
const ASSETS = [
  './index.html',
  './manifest.json',
  './lib/react.production.min.js',
  './lib/react-dom.production.min.js',
  './lib/babel.min.js',
  // Styles
  './js/styles.css',
  // Utilities
  './js/utils/timer.js',
  './js/utils/resolve.js',
  // Data files
  './js/data/challenges.js',
  './js/data/positions.js',
  './js/data/truths.js',
  './js/data/config.js',
  './js/data/library.js',
  // Components
  './js/components/DiceFace.js',
  // Main app
  './js/app.js',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ).then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  if (url.pathname.includes('/content/')) {
    e.respondWith(
      fetch(e.request).then(res => {
        const clone = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
        return res;
      }).catch(() => caches.match(e.request))
    );
    return;
  }

  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request).then(res => {
      const clone = res.clone();
      caches.open(CACHE).then(c => c.put(e.request, clone));
      return res;
    }))
  );
});
