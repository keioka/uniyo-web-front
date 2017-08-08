var BASE_REDIRECT_URL = '/dashboard'

var notificationHandler = (function () {

  function generateUrlPath(data) {
    var path = BASE_REDIRECT_URL
    switch(data.type) {
      case 'POST_MENTION': {
        var end = '/posts/' + data.post_id;
        path += end;
        break;
      }

      case 'POST_HASHTAG': {
        var end = '/posts/' + data.post_id;
        path += end;
        break;
      }

      case 'NEW_CHANNEL_MESSAGE': {
        var end = '/channels/' + data.channel_id;
        path += end;
        break;
      }

      case 'NEW_COMMENT': {
        var end = '/posts/' + data.post_id
        path += end;
        break;
      }

      case 'NEW_ANSWER': {
        var end = '/questions/' + data.post_id;
        path += end;
        break;
      }


      case 'WEEKLY_RECEIVED_DONUTS_COUNT': {
        break;
      }

      default:
        break;
    }
    return path;
  };

  function push(event) {
    if (event.data || Object.prototype.hasOwnProperty(event.data, 'message')) {
      var data = event.data.json();
      var title = data.title || "Hello from notification";
      var url = generateUrlPath(data);
      var notificationOptions = {
        body: data.message || 'You have updates',
        icon: './assets/images/uniyo.png',
        data: {
          url: url,
        },
      }

      event.waitUntil(
        self.registration.showNotification(title, notificationOptions)
      );
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

self.addEventListener("notificationclick", function(event) {
  const url = event.notification.data.url
  clients.openWindow(url)
}, false);
