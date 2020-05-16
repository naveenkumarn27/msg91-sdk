const {performRequest} = require("./network");

class SendSmsService {

    /**
     * @param {String} aAuthKey Authentication key
     */
    constructor(aAuthKey, aSenderId, aRouteId) {
        this.authKey = aAuthKey
        this.senderId = aSenderId
        this.routeId = aRouteId
    }

    /**
     * @param {Object} aMobileNumbers will list of mobile numbers
     * @param {Object} aMessages to send it to the users
     * @return {Array} list of message object
     */
    extractMessagesObject(aMobileNumbers, aMessages) {
        const messages = []

        if (aMessages && aMessages.length > 0) {
            if (aMessages instanceof Array) {
                aMessages.forEach((message) => {
                    message = message.trimEnd()
                    if (message.length > 0) {
                        messages.push(this.extractedMessage(message, aMobileNumbers));
                    }
                })
            } else if (aMessages instanceof String && aMessages.includes(",")) {
                aMessages.split(",").forEach((message) => {
                    message = message.trimEnd()
                    if (message.length > 0) {
                        messages.push(this.extractedMessage(message, aMobileNumbers));
                    }
                })
            } else {
                messages.push(this.extractedMessage(aMessages, aMobileNumbers));
            }
        }

        return messages
    }

    extractedMessage(aMessage, aMobileNumbers) {
        const message = {}
        message.message = aMessage
        const phoneNumbers = []
        if (aMobileNumbers && aMobileNumbers.length > 0) {
            if (aMobileNumbers instanceof Array) {
                phoneNumbers.push(aMobileNumbers)
            } else if (aMobileNumbers instanceof String && aMobileNumbers.includes(",")) {
                let numberArray = aMobileNumbers.split(",");
                numberArray.forEach((aNumber) => {
                    aNumber.trim()
                })
                phoneNumbers.push(numberArray)
            } else {
                phoneNumbers.push(aMobileNumbers)
            }
            message.to = phoneNumbers
        } else {
            throw new Error("Mobile numbers should not be  null")
        }
    }

    /**
     * Sending sms flow message using template id and it's params
     *
     * @param {string} aMobileNumber will list of mobile numbers
     * @param {string} aTemplateId to send it to the users
     * @param {Object} aParams template placeholder params
     * @return {Promise<Object>}
     */
    sendSMSFlow = async (aMobileNumber, aTemplateId, aParams) => {
        return new Promise(async (resolve, reject) => {
            try {

                if (!aParams) {
                    aParams = {}
                }

                aParams.authkey = this.authKey
                aParams.mobiles = aMobileNumber
                aParams.template_id = aTemplateId

                const options = {
                    "method": "POST",
                    "hostname": "api.msg91.com",
                    "port": null,
                    "path": "/api/v5/flow/?response=json",
                    "headers": {
                        "content-type": "application/json"
                    },
                    "body": aParams
                };

                const response = await performRequest(options)

                if (response.type === 'error') {
                    reject(response)
                }

                resolve(response)
            } catch (error) {
                reject(error)
            }
        })
    }

    /**
     * Sending multiple message to the multiple user
     *
     * @param {string} aMobileNumbers will list of mobile numbers
     * @param {string} aMessage to send it to the users
     * @param {string} aCountryDialCode country dial code of the mobile numbers
     * @return {Promise<Object>}
     */
    sendSMS = async (aMobileNumbers, aMessage, aCountryDialCode) => {
        return this.sendSMSRequest(aMobileNumbers, aMessage, aCountryDialCode);
    }

    /**
     * Sending multiple message to the multiple user
     *
     * @param {Object} aMobileNumbers will list of mobile numbers
     * @param {Object} aMessage to send it to the users
     * @param {string} aCountryDialCode country dial code of the mobile numbers
     * @return {Promise<Object>}
     */
    sendSMSRequest(aMobileNumbers, aMessage, aCountryDialCode) {
        return new Promise(async (resolve, reject) => {
            try {

                const messageArray = this.extractMessagesObject(aMobileNumbers, aMessage)

                if (!messageArray || messageArray.length === 0) {
                    reject("Message object should not null or empty")
                }

                const body = {
                    sender: this.senderId,
                    route: this.routeId,
                    country: aCountryDialCode,
                    sms: messageArray
                }

                const options = {
                    "method": "POST",
                    "hostname": "api.msg91.com",
                    "port": null,
                    "path": "/api/v2/sendsms",
                    "headers": {
                        "authkey": this.authKey,
                        "content-type": "application/json"
                    },
                    "body": body
                };

                const response = await performRequest(options)

                if (response.type === 'error') {
                    reject(response)
                }

                resolve(response)
            } catch (error) {
                reject(error)
            }
        })
    }
}

module.exports = SendSmsService;
