// ============================================================================
// SERVICE WORKER - HỖ TRỢ ĐỌC KINH THÁNH NGOẠI TUYẾN (OFFLINE PWA)
// Nền tảng "Lời Chúa Mỗi Ngày"
// ============================================================================

const CACHE_NAME = 'loi-chua-cache-v1';

const STATIC_ASSETS = [
  '/',
  '/kinh-thanh',
  '/phung-vu',
  '/nghien-cuu',
  '/ke-hoach-doc',
  '/ca-nhan',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Chỉ cache các yêu cầu GET hợp lệ
  if (event.request.method !== 'GET') return;

  // Bỏ qua các yêu cầu API động hoặc socket
  if (event.request.url.includes('/api/')) return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Trả về cache và cập nhật ngầm (stale-while-revalidate)
        fetch(event.request)
          .then((networkResponse) => {
            if (networkResponse.status === 200) {
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, networkResponse);
              });
            }
          })
          .catch(() => {});
        return cachedResponse;
      }

      return fetch(event.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }

        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return networkResponse;
      }).catch(() => {
        // Fallback offline nếu rớt mạng
        if (event.request.headers.get('accept')?.includes('text/html')) {
          return caches.match('/');
        }
      });
    })
  );
});
