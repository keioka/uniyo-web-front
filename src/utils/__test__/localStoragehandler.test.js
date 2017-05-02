import { storage } from '../'
import { expect } from 'chai'
import { mount } from 'enzyme'
import sinon from 'sinon'

const EXPIRED_TIME = 7200

describe('localStorageHandler', () => {
  def('result', function() {
    return {
      accessToken: "casdsdasda",
      refreshToken: "dsadsads",
      expiresIn: EXPIRED_TIME,
      user: {}
    }
  })

  beforeEach(function(){
    storage.setTokensFromResponse($result)
  })

  it('should get accessToken', () => {
    expect(storage.accessToken).to.have.length(10)
  })

  it('should get refreshToken', () => {
    expect(storage.refreshToken).to.have.length(8)
  })

  it('should get isAccessTokenExpired', () => {
    expect(storage.isAccessTokenExpired).to.be.false
  })

  it('should get isAccessTokenExpiredAlready', () => {
    expect(storage.isAccessTokenExpiredAlready).to.be.false
  })
})


describe('localStorageHandler', () => {
  describe('is expired', () => {
    def('result', function() {
      return {
        accessToken: "casdsdasda",
        refreshToken: "dsadsads",
        expiresIn: 0,
        user: {}
      }
    })

    beforeEach(function(){
      storage.setTokensFromResponse($result)
    })

    it('should get isAccessTokenExpired to be true', () => {
      expect(storage.isAccessTokenExpired).to.be.true
    })

    it('should get isAccessTokenExpiredAlready to be true', () => {
      expect(storage.isAccessTokenExpiredAlready).to.be.true
    })
  })
})
