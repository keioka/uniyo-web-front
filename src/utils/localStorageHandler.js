/* @flow */
import moment from 'moment'

const ACCESS_TOKEN_KEY = 'ACCESS_TOKEN'
const REFRESH_TOKEN_KEY = 'REFRESH_TOKEN'
const ACCESS_TOKEN_EXPIRATION_KEY = 'ACCESS_TOKEN_EXPIRATION'
const USER_KEY = 'USER'

const localStorage = window.localStorage

const getRandomInt = (min, max) => {
  const minNum = Math.ceil(min)
  const maxNum = Math.floor(max)
  return Math.floor(Math.random() * (maxNum - minNum)) + minNum
}

export default class localStorageHandler {
  static get accessToken():String {
    return localStorage[ACCESS_TOKEN_KEY]
  }

  static get refreshToken():String {
    return localStorage[REFRESH_TOKEN_KEY]
  }

  static get user():Object {
    return localStorage[USER_KEY]
  }

  static get accessTokenExpiration() {
    const expirationTime = localStorage[ACCESS_TOKEN_EXPIRATION_KEY]
    return moment.utc(expirationTime)
  }

  static get isAccessTokenExpired():Boolean {
    // We are going to refresh the access token N minutes before it actually expires
    // We choose this number randomly so multiple tabs don't start this process at the same time.
    const now = moment.utc()
    const randomMinutes = getRandomInt(5, 30)
    const accessTokenRefreshTime = this.accessTokenExpiration.subtract(randomMinutes, 'minutes')
    return now.isSameOrAfter(accessTokenRefreshTime)
  }

  static get isAccessTokenExpiredAlready():Boolean {
    // We are going to refresh the access token N minutes before it actually expires
    // We choose this number randomly so multiple tabs don't start this process at the same time.
    if (!this.accessTokenExpiration) return true
    const now = moment.utc()
    return now.isSameOrAfter(this.accessTokenExpiration)
  }

  static get hasValidAccessTokens():Boolean {
    return !!this.accessTokenExpiration && !!this.refreshToken && !!this.accessToken
  }

  static set accessToken(value: string) {
    localStorage[ACCESS_TOKEN_KEY] = value
  }

  static set refreshToken(value: string) {
    localStorage[REFRESH_TOKEN_KEY] = value
  }

  static set accessTokenExpiration(secondsFromNow) {
    const expirationTime = moment.utc().add(secondsFromNow, 'seconds')
    localStorage[ACCESS_TOKEN_EXPIRATION_KEY] = expirationTime.toISOString()
  }

  static set user(user) {
    localStorage[USER_KEY] = JSON.stringify(user)
  }

  static setTokensFromResponse(result) {
    this.accessToken = result.accessToken
    this.refreshToken = result.refreshToken
    this.accessTokenExpiration = result.expiresIn
    if (result.user) {
      this.user = result.user
    }
  }

  static clear() {
    localStorage.clear()
  }

}
