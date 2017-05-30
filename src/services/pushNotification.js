const base64UrlEncodedApplicationServerKey = process.env.NODE_ENV === "production"
  ? "BPZVpRpcSsKwFXEAk6fBn2lFWEoz3X0r1ycGtRFN8bl-K_ZyJ9M4MwkDTwB1YSrb5GQjlZQQB6xy8avXGalhQts"
  : "BOyrRA5otpkiB4pm4ZX6ev1JravtZmH8V2W_CewV9Yv_gxSEKV6ESiaDK1Ni32BAEpXssIVLhm4_UAQIZZ25wYg"
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

export async function subscribe() {
  console.log('subscribe')
  console.log('browserSupportsNotifications', browserSupportsNotifications)
  console.log('Notification.permission', Notification.permission)
  if (browserSupportsNotifications && Notification.permission === "granted") {
    console.log('subscribe permission')
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
  console.log('syncSubscription')

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
    if (data.keys) {
      
    }

    return true
  } catch (e) {
    console.error(e);
    return false
  }
}
