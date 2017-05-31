const base64UrlEncodedApplicationServerKey = "BPZVpRpcSsKwFXEAk6fBn2lFWEoz3X0r1ycGtRFN8bl-K_ZyJ9M4MwkDTwB1YSrb5GQjlZQQB6xy8avXGalhQts"
const browserSupportsNotifications = ("Notification" in window && "serviceWorker" in navigator)

const base64UrlToUint8Array = (base64UrlData) => {
  const padding = '='.repeat((4 - base64UrlData.length % 4) % 4)
  const base64 = (base64UrlData + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/')
  const rawData = atob(base64)
  const buffer = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    buffer[i] = rawData.charCodeAt(i)
  }
  return buffer
}

export const permissionStatus = Notification.permission

let addDeviceAction

export async function subscribe(addDevice) {
  addDeviceAction = addDevice
  if (browserSupportsNotifications && Notification.permission === "granted") {
    await syncSubscription()
  }
}

export async function requestPermissionForNotifications() {
  const permission = await Notification.requestPermission()
  if (permission === "granted") {
    return await syncSubscription()
  } else {
    return false
  }
}

export async function syncSubscription() {
  const applicationServerKey = base64UrlToUint8Array(base64UrlEncodedApplicationServerKey)
  const subscriptionOptions = {
    userVisibleOnly: true,
    applicationServerKey,
  }

  try {
    const serviceWorkerRegistration = await navigator.serviceWorker.register("./public/notification_sw.js")
    const subscription = await serviceWorkerRegistration.pushManager.subscribe(subscriptionOptions)

    // If the browser doesn't support payloads, the subscription object won't contain keys.
    const data = JSON.parse(JSON.stringify(subscription))
    const { endpoint, keys } = data
    const { auth: authSecret, p256dh: p256dhKey } = keys
    if (data.keys) {
      addDeviceAction({ endpoint, authSecret, p256dhKey })
    }

    return true
  } catch (e) {
    console.error(e);
    return false
  }
}
