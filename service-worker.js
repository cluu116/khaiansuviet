const CACHE_NAME = 'khaiansuviet-v9';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/collection.html',
  '/artifact.html',
  '/guide.html',
  '/product.html',
  '/assets/css/base.css',
  '/assets/css/components.css',
  '/assets/css/home.css',
  '/assets/css/collection.css',
  '/assets/css/artifact.css',
  '/assets/css/artifact-3d.css',
  '/assets/css/guide.css',
  '/assets/css/product.css',
  '/assets/js/common.js',
  '/assets/js/data.js',
  '/assets/js/home.js',
  '/assets/js/collection.js',
  '/assets/js/artifact.js',
  '/assets/js/guide.js',
  '/assets/js/product.js',
  '/assets/js/effects.js',
  '/assets/data/products-detail.json',
  '/assets/images/favicon.svg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  // Bỏ qua các request POST, PUT, DELETE, v.v.
  if (event.request.method !== 'GET') return;

  // Cache-first cho file tĩnh (fonts, images), Network-first cho API & HTML
  const url = new URL(event.request.url);
  
  // Ngoại lệ: Bỏ qua request đến Google Apps Script API hoặc các CDN bên ngoài
  if (url.origin !== self.location.origin && !url.origin.includes('fonts.')) {
    return;
  }

  // Network-first cho HTML file để cập nhật nhanh
  if (event.request.destination === 'document' || url.pathname.endsWith('.json')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const resClone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, resClone));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Cache-first cho các tài nguyên khác
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).then(fetchRes => {
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, fetchRes.clone());
          return fetchRes;
        });
      });
    })
  );
});
