self.addEventListener('install', event => {
    console.log('Service Worker 安裝中...');
    self.skipWaiting();
  });
  
  self.addEventListener('activate', event => {
    console.log('Service Worker 已啟用');
  });
  
  self.addEventListener('push', event => {
    const data = event.data.json();
    // 可以印出 data 會更清楚其中的差異
    console.log('data', data)
    // 差異就是多了 notification 這一層的物件
    self.registration.showNotification(data.notification.title, {
      body: data.notification.body,
      icon: data.notification.image,
      data: data.data
    });
  });
  
  self.addEventListener('notificationclick', event => {
    event.notification.close();
    const url = event.notification.data.url;
    event.waitUntil(
      clients.openWindow(url)
    );
  });