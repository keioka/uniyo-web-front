import Fingerprint2 from 'fingerprintjs2'
import UAParser from 'ua-parser-js'
const base64UrlEncodedApplicationServerKey = __STG__ ? 'BOyrRA5otpkiB4pm4ZX6ev1JravtZmH8V2W_CewV9Yv_gxSEKV6ESiaDK1Ni32BAEpXssIVLhm4_UAQIZZ25wYg' : 'BPZVpRpcSsKwFXEAk6fBn2lFWEoz3X0r1ycGtRFN8bl-K_ZyJ9M4MwkDTwB1YSrb5GQjlZQQB6xy8avXGalhQts'

const isBrowserSupportsNotifications = (window && ("Notification" in window || "serviceWorker" in navigator))
let browser
let Notification

if (isBrowserSupportsNotifications && "Notification" in window) {
  browser = window
} else if (isBrowserSupportsNotifications && 'safari' in window) {
  browser = window.safari
}

if (browser) {
  Notification = browser.Notification || browser.pushNotification
}

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

export const permissionStatus = isBrowserSupportsNotifications && Notification.permission

let addDeviceAction
let deleteDeviceAction

export async function subscribe(addDevice, deleteDevice) {
  addDeviceAction = addDevice
  deleteDeviceAction = deleteDevice
  if (Notification && isBrowserSupportsNotifications && Notification.permission === "granted") {
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

const getDeviceType = () => {

  const deviceTypeMapping = {
    'Chrome': 'BROWSER_CHROME',
    'Chromium': 'BROWSER_CHROME',
    'Edge': 'BROWSER_EDGE',
    'Firefox': 'BROWSER_FIREFOX',
    'Safari': 'BROWSER_SAFARI'
  }

  const parser = new UAParser()

  const browserName = parser.getBrowser().name
  const deviceType = deviceTypeMapping[browserName]
   ? deviceTypeMapping[browserName] : 'BROWSER_OTHER'

  return deviceType
}

const getDeviceId = () => {
  return new Promise((resolve) => {
    new Fingerprint2().get(function(result, components) {
      resolve(result)
    })
  })
}

const deleteServiceworker = () => new Promise((resolve, reject) => {
  try {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      for(const registration of registrations) {
        registration.unregister()
      }
      resolve({ isDelete: true })
    })
  } catch(e) {
    reject({ isDelete: false, errorMessage: e })
  }
})

export async function syncSubscription() {
  const applicationServerKey = base64UrlToUint8Array(base64UrlEncodedApplicationServerKey)
  const subscriptionOptions = {
    userVisibleOnly: true,
    applicationServerKey,
  }

  try {
    // const isInit = await deleteServiceworker()
    navigator.serviceWorker.register("/notification_sw.js").then(async serviceWorkerRegistration => {
      const subscription = await serviceWorkerRegistration.pushManager.subscribe(subscriptionOptions)
        // If the browser doesn't support payloads, the subscription object won't contain keys.
      const data = JSON.parse(JSON.stringify(subscription))
      const { endpoint, keys } = data
      const { auth: authSecret, p256dh: p256dhKey } = keys
      console.log('------------')
      console.log(subscription)
      console.log(data)
      const deviceId = await getDeviceId()
      const deviceType = getDeviceType()
      console.log('deviceId', deviceId)
      if (data.keys) {
        // deleteDeviceAction({ deviceId, deviceType })
        addDeviceAction({ deviceId, deviceType, endpoint, authSecret, p256dhKey })
      }

       return true
    })

  } catch (e) {
    console.error(e)
    return false
  }
}
