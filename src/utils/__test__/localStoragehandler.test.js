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
})
