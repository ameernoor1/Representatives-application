const CACHE_NAME = 'admin-dashboard-v1.0';
const urlsToCache = [
  './',
  './admin-dashboard.html',
  './app.js',
  './settings.html',
  './settings.js',
  './manifest-admin.json',
  './service-worker-admin.js'
];

// Install Service Worker
self.addEventListener('install', function(event) {
  console.log('⚙️ تثبيت Service Worker...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('✅ فتح الذاكرة المؤقتة');
        return cache.addAll(urlsToCache);
      })
      .catch(function(error) {
        console.error('❌ خطأ في التثبيت:', error);
      })
  );
  self.skipWaiting();
});

// Activate Service Worker
self.addEventListener('activate', function(event) {
  console.log('🔄 تفعيل Service Worker...');
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            console.log('🗑️ حذف الذاكرة المؤقتة القديمة:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// Fetch - Network First Strategy with Fallback
self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request)
      .then(function(response) {
        // Check if valid response
        if(!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        // Clone the response
        var responseToCache = response.clone();

        caches.open(CACHE_NAME)
          .then(function(cache) {
            cache.put(event.request, responseToCache);
          });

        return response;
      })
      .catch(function() {
        // If network fails, try cache
        return caches.match(event.request)
          .then(function(response) {
            if (response) {
              return response;
            }
            // If not in cache, return offline page
            if (event.request.destination === 'document') {
              return caches.match('./admin-dashboard.html');
            }
          });
      })
  );
});

// Push Notifications
self.addEventListener('push', function(event) {
  console.log('🔔 إشعار جديد');
  
  let notificationData = {
    title: '🗳️ لوحة أساس العراق',
    body: 'لديك إشعار جديد',
    icon: 'https://firebasestorage.googleapis.com/v0/b/messageemeapp.appspot.com/o/Gemini_Generated_Image_tkcjwitkcjwitkcj.png?alt=media&token=3fbffecf-8da5-405d-bcc4-82e2133149f1'
  };

  if (event.data) {
    try {
      notificationData = event.data.json();
    } catch (e) {
      notificationData.body = event.data.text();
    }
  }

  const options = {
    body: notificationData.body,
    icon: notificationData.icon,
    badge: 'https://firebasestorage.googleapis.com/v0/b/messageemeapp.appspot.com/o/Gemini_Generated_Image_tkcjwitkcjwitkcj.png?alt=media&token=3fbffecf-8da5-405d-bcc4-82e2133149f1',
    vibrate: [200, 100, 200],
    tag: 'admin-notification',
    requireInteraction: false,
    data: notificationData.data || {}
  };

  event.waitUntil(
    self.registration.showNotification(notificationData.title, options)
  );
});

// Notification Click
self.addEventListener('notificationclick', function(event) {
  console.log('👆 نقر على الإشعار');
  event.notification.close();

  event.waitUntil(
    clients.openWindow('./admin-dashboard.html')
  );
});

// Background Sync
self.addEventListener('sync', function(event) {
  console.log('🔄 مزامنة في الخلفية');
  if (event.tag === 'sync-data') {
    event.waitUntil(syncData());
  }
});

function syncData() {
  return fetch('./api/sync')
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log('✅ تمت المزامنة بنجاح', data);
    })
    .catch(function(error) {
      console.error('❌ خطأ في المزامنة:', error);
    });
}

// Message from clients
self.addEventListener('message', function(event) {
  console.log('📨 رسالة من التطبيق:', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
