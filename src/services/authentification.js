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

  /**
   * init
   * Set dipatch action to get refresh token
   * @param {function} actionForTokenRefresh
   */

  init(actionForTokenRefresh) {
    this.actionForTokenRefresh = actionForTokenRefresh
    this.initializeRefreshToken(actionForTokenRefresh)
  }

  /**
   * initializeRefreshToken
   * Set Timer to dispatch refresh token action
   * @param {function} action
   */

  initializeRefreshToken(actionForTokenRefresh) {
    const refreshToken = this.storage.refreshToken
    // actionForTokenRefresh(refreshToken)
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
    console.log("----- checking expiration", this.storage.hasValidAccessTokens && this.storage.isAccessTokenExpired )
    if (this.storage.hasValidAccessTokens && this.storage.isAccessTokenExpired) {
      this.actionForTokenRefresh(this.storage.refreshToken)
    }
  }
}


export default new Authentification(storage)
