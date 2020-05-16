const { performRequest } = require('./libs/network')

module.exports = {
  SendOtpService: require('./libs/send.otp.service'),
  SendSmsService: require('./libs/send.sms.service'),
  getBalance: async (aAuthKey, aType) => {
    return new Promise(async (resolve, reject) => {
      let path = '/api/balance.php?'

      if (aAuthKey && aAuthKey.length > 0) {
        path += `authkey=${aAuthKey}`
      } else {
        throw new Error('Auth code not available')
      }

      if (aType > 0) {
        path += `&type=${aType}`
      } else {
        throw new Error('Invalid type')
      }

      const options = {
        method: 'GET',
        hostname: 'api.msg91.com',
        port: null,
        path,
        headers: {}
      }

      const response = await performRequest(options)

      if (response.type === 'error') {
        reject(response)
      }

      resolve(response)
    })
  }
}
