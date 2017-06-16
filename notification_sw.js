
var notificationHandler = (function(){

  function showNotification(notification){
    var title = ""
    var notificationOptions = {
      body: notification.message,
      icon: '/assets/img/uniyo.png'
    }

    return self.registration.showNotification(notification.title, notificationOptions);
  }

  function push(e){
    if (e.data) {
      var n = e.data.json();
      return showNotification(n);
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

self.addEventListener("activate", event => {
  notificationHandler.push("title")
});

self.addEventListener("notificationclick", function(event) {
  clients.openWindow("/dashboard")
}, false);
