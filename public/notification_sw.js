var notificationHandler = (function(){

  function showNotification(title, notification){
    return self.registration.showNotification(title, notification);
  }

  function showPMNotification(name, data){
    var title = "New message from " + name;
    var actions = [
      {action: "like", title: "Like"},
      {action: "reply", title: "Reply"}
    ];

    // TODO: [Add] more notification body
    var notfication = {
      body: "Hi, thank you!",
      actions: actions,
      //  icon: '/app/images/image.jpg',
      //  sound: '/app/res/raw/14044860.mp3',
      //  vibrate: [200, 100, 200, 100, 200, 100, 200],
      //  tag: 'my-tag'
    }

    return showNotification(title, notfication);
  }

  function showMentionedNotification(feedName, data){
    var title = "You are mentioned at " + feedName;
    var notfication = {
      body: "Hello",
      actions: [
        {action: "like", title: "Like"},
        {action: "reply", title: "Reply"}
      ]
    }

    return showNotification(title, notfication);
  }

  function push(event){
    // TODO: [Add]
    //   - check the type of notification
    //   - call function depending on notification type

    return showPMNotification("Kei"); // This is test
  }

  return {
    push: push
  }

}());

self.addEventListener('install', function(event) {
  console.log("SW installed");
});

self.addEventListener("push", event => {
  // TODO: [Add] Notification type
  console.log(event)
  notificationHandler.push(event);
});

self.addEventListener("activate", event => {
  notificationHandler.push("title")
});

self.addEventListener("notificationclick", function(event) {
  var channelId = "412";

  event.notification.close();

  if (event.action === "like") {
    // TODO: add like to comment
  } else if (event.action === "reply") {
    // TODO: add reply to comment
    clients.openWindow("/dashboard/channels/" + channelId);
  }

}, false);
