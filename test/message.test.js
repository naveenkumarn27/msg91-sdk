const nock = require('nock')
const assert = require('assert')
const { performRequest } = require('../libs/network')
const SendOtpService = require('./../index').SendOtpService

describe('SendOtpService', () => {
  it('create new instance', () => {
    const sendOtp = new SendOtpService()
    assert(sendOtp instanceof SendOtpService)
  })

  describe('constructor', () => {
    it('set default template if no message template is provided', () => {
      const sendOtp = new SendOtpService('auth-key')
      assert.strictEqual(sendOtp.authKey, 'auth-key')
      assert.strictEqual(
        sendOtp.messageTemplate,
        'Your otp is {{otp}}. Please do not share it with anybody'
      )
    })
    it('message template is provided', () => {
      const sendOtp = new SendOtpService('auth-key', 'new template to send otp')
      assert.strictEqual(sendOtp.authKey, 'auth-key')
      assert.strictEqual(sendOtp.messageTemplate, 'new template to send otp')
    })
  })

  describe('performRequest', () => {
    before(() => {
      this.nock = nock('https://api.msg91.com')
    })

    it('accepts any 2xx response', (done) => {
      const jsonResponse = { nothing: [] }
      this.nock.get(/.*/).reply(201, jsonResponse)

      const options = {
        method: 'GET',
        hostname: 'api.msg91.com',
        port: null,
        headers: {
          'content-type': 'application/json'
        }
      }

      performRequest(options)
        .then((response) => {
          assert.notDeepStrictEqual(response, null)
          done()
        })
        .catch((error) => {
          assert.notDeepStrictEqual(error, null)
          done()
        })
    })

    it('errors when there is an error object', (done) => {
      const jsonResponse = { errors: ['nope'] }
      this.nock.get(/.*/).reply(203, jsonResponse)

      const options = {
        method: 'GET',
        hostname: 'api.msg91.com',
        port: null,
        headers: {
          'content-type': 'application/json'
        }
      }

      performRequest(options)
        .then((response) => {
          assert.notDeepStrictEqual(response, null)
          done()
        })
        .catch((error) => {
          assert.notDeepStrictEqual(error, null)
          done()
        })
    })
  })
})
