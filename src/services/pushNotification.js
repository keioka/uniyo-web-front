import Fingerprint2 from 'fingerprintjs2'
import UAParser from 'ua-parser-js'
import { postValue, decorator } from '../utils'
const { extractHashtagFromText } = postValue

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

let isInit
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
    // let initializer
    // if (!isInit) {
    //   initializer = await deleteServiceworker()
    // }
    // if (initializer.isDelete) {
      navigator.serviceWorker.register("/public/notification_sw.js").then(async serviceWorkerRegistration => {
        const subscription = await serviceWorkerRegistration.pushManager.subscribe(subscriptionOptions)
        // If the browser doesn't support payloads, the subscription object won't contain keys.
        const data = JSON.parse(JSON.stringify(subscription))
        const { endpoint, keys } = data
        const { auth: authSecret, p256dh: p256dhKey } = keys
        const deviceId = await getDeviceId()
        const deviceType = getDeviceType()
        if (data.keys) {
          // deleteDeviceAction({ deviceId, deviceType })
          addDeviceAction({ deviceId, deviceType, endpoint, authSecret, p256dhKey })
        }
        isInit = true
        return true
      })
    // }

  } catch (e) {
    console.error(e)
    return false
  }
}

const postTypes = {
  'POST': 'publication',
  'REVIEW': 'review',
  'QUESTION': 'question',
  'CLASS_NOTE': 'document',
  'ANSWER': 'answer',
}

const generatePushNotificationOption = (notification) => {
  console.log(notification)
  const { type: notificationType } = notification
  const option = {}
  switch (notificationType) {
    case 'POST_MENTION': {
      const { type, text } = notification.post
      const parsedText = text.replace(/<@(.*?)>/g, (match, i) => {
        const segments = match
        .replace('<@', '')
        .replace('>', '')
        .split('|')
        return `@${segments[1]}`
      })

      option.title = `You've mentioned on ${postTypes[type]}`
      option.body = parsedText
      break
    }

    case 'POST_HASHTAG': {
      const { type, user, text } = notification.post
      option.title = `${user.firstName} made a ${postTypes[type]} about ${extractHashtagFromText(text)}`
      option.body = notification.post.text
      break
    }

    case 'NEW_COMMENT': {
      const { type } = notification.post
      const { user } = notification.comment

      option.title = `${user.firstName} commented on your ${postTypes[type]}`
      option.body = notification.comment.text
      break
    }

    case 'NEW_CHANNEL_MESSAGE': {
      option.title = notification.channelMessage.user.name
      option.body = notification.channelMessage.text
      break
    }

    case 'NEW_ANSWER': {
      const { answer } = notification
      const { user, text } = answer
      option.title = `${user.firstName} answered your question`
      option.body = text
      break
    }

    case 'COMMENT_MENTION': {
      const { text, user } = notification.comment
      const parsedText = text.replace(/<@(.*?)>/g, (match, i) => {
        const segments = match
        .replace('<@', '')
        .replace('>', '')
        .split('|')
        return `@${segments[1]}`
      })
      option.title = `You've mentioned on a comment`
      option.body = parsedText
      break
    }

    case 'WEEKLY_RECEIVED_DONUTS_COUNT': {
      const { donutsCount } = notification
      option.title = `You got ${donutsCount} donuts last week`
      option.body = 'See who sent donuts to you!'
      break
    }

    default:
      option.title = `You got an update!`
      option.body = 'See what is happening on your campus'
      break
  }
  return option
}

export const pushNotificationNonVisiable = (notification) => {
  if (!("Notification" in window)) {
    console.error("This browser does not support desktop notification")
  } else if (Notification.permission === "granted") {
    const option = generatePushNotificationOption(notification)
    option.icon = '/public/assets/images/uniyo.png'
    const n = new Notification(option.title, option)
    n.onClick = () => {
      window.open('/dashboard')
    }
  }
}
