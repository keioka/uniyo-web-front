var notificationHandler = (function() {

  function push(event) {
    if (event.data || Object.prototype.hasOwnProperty(event.data, 'message')) {
      var title = event.title || "Hello from notification"
      var notificationOptions = {
        body: event.message,
        icon: 'public/assets/images/uniyo.png'
      }

      event.waitUntil(
        self.registration.showNotification(title, notificationOptions)
      )
    }
    // TODO: [Add]
    //   - check the type of notification
    //   - call function depending on notification type
  }

  return {
    push: push
  }

}());

self.addEventListener("push", event => {
  // TODO: [Add] Notification type
  notificationHandler.push(event);
});

self.addEventListener('install', event => {
  notificationHandler.push({ title: "install" });
});

self.addEventListener("activate", event => {
  notificationHandler.push({ title: "title" });
});

self.addEventListener("notificationclick", function(event) {
  clients.openWindow("/dashboard")
}, false);
