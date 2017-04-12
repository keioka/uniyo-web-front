/* @flow */
import moment from 'moment'

const ACCESS_TOKEN_KEY = "ACCESS_TOKEN"
const REFRESH_TOKEN_KEY = "REFRESH_TOKEN"
const ACCESS_TOKEN_EXPIRATION_KEY = "ACCESS_TOKEN_EXPIRATION"
const USER_KEY = "USER"

const localStorage = window.localStorage

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
    const now = moment.utc()
    const accessTokenRefreshTime = this.accessTokenExpiration.subtract(20, 'minutes')
    return now.isSameOrAfter(accessTokenRefreshTime)
  }

  static get hasValidAccessTokens():Boolean {
    return this.accessTokenExpiration && this.refreshToken && this.accessToken
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
    this.user = result.user
  }

  static clear() {
    localStorage.clear()
  }

}
