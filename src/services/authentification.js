/* @flow */

import storage from '../utils/localStorageHandler'

let instance

class Authentification {
  constructor(storage) {
    // singleton
    if (typeof instance === "undefined") {
      instance = this
    } else {
      return instance
    }

    this.storage = storage
    this.actionForTokenRefresh = null

    // To check
    this.initialized = false
    this.refreshIntervalWorking = false
  }

  get isTokenExist() {
    return this.storage.hasValidAccessTokens
  }

  /**
   * init
   * Set dipatch action to get refresh token
   * @param {function} actionForTokenRefresh
   */

  init(actionForTokenRefresh, isLogin, fetching) {
    this.actionForTokenRefresh = actionForTokenRefresh
    this.isLogin = isLogin
    this.initializeRefreshToken(actionForTokenRefresh, isLogin, fetching)
  }

  /**
   * initializeRefreshToken
   * Initialize refresh token
   * @param {function} action
   */

  initializeRefreshToken(actionForTokenRefresh, isLogin, fetching) {
    if (this.storage.isAccessTokenExpiredAlready) {
      this.storage.clear()
    } else if (!this.initialized && !isLogin && !fetching) {
      // if service is not initialized and user is not isLogin and not fetching user
      const { refreshToken } = this.storage
      actionForTokenRefresh(refreshToken)
    }
  }

  /**
   * tokenRefreshInterval
   * Set Timer to dispatch refresh token action
   * @param {function} action
   */

  tokenRefreshInterval() {
    if (this.refreshIntervalWorking) return
    const self = this
    this.refreshIntervalWorking = true
    return setInterval(() => self.tokenRefreshHandler(), 100000)
  }

  tokenRefreshHandler() {
    // console.log("checking expiration", (this.storage.hasValidAccessTokens && this.storage.isAccessTokenExpired) )
    if (this.storage.hasValidAccessTokens && this.storage.isAccessTokenExpired) {
      this.actionForTokenRefresh(this.storage.refreshToken)
    }
  }
}


export default new Authentification(storage)
