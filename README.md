# msg91-sdk
This is used to handle msg91 apis such as send otp, sms and sms flow.

[![NPM](https://nodei.co/npm/msg91-sdk.png)](https://nodei.co/npm/msg91-sdk/)

## How to implement 

Install node module package in your project

```npm
npm install msg91-sdk --save
```

## Send OTP 

use the below code snippet for sending OTP message to the specified mobile number 

```javascript
const sendOtpService = require('msg91-sdk').SendOtpService;
const sendOtp = new sendOtpService("AUTH_KEY", "MESSAGE_TEMPLATE");
sendOtp.otpLength = 6 // 'XXXXXX'
sendOtp.otpExpiry = 5 // In minutes

const aOptions = {
    mobile: "91988448XXXXX",// Mandatory param along with country dial code
    otp: "XXXXXX"
}

sendOtp.sendOTP(aOptions).then(() => {
//Handle success result
}).catch(() => {
//Handle failure result
})
```
Verifying OTP message to the specified mobile number

```javascript
const sendOtpService = require('msg91-sdk').SendOtpService;
const sendOtp = new sendOtpService("AUTH_KEY", "MESSAGE_TEMPLATE");

const aOptions = {
    mobile: "91988448XXXXX",// (*) mobile number of the client
    otp: "XXXXXX"// (*) OTP received from the client
}

sendOtp.verifyOTP(aOptions).then(() => {
//Handle success result
}).catch(() => {
//Handle failure result
})
```
Retry OTP message to the specified mobile number

```javascript
const sendOtpService = require('msg91-sdk').SendOtpService;
const sendOtp = new sendOtpService("AUTH_KEY", "MESSAGE_TEMPLATE");

const aOptions = {
    mobile: "91988448XXXXX",// (*) mobile number of the client
    retrytype: "voice"// (optional) ["voice", "text"] "text" -> default one
}

sendOtp.retryOTP(aOptions).then(() => {
//Handle success result
}).catch(() => {
//Handle failure result
})
```

## Send SMS

Sending sms to many messages to many users using a below snippet 

```javascript
const sendSmsService = require('msg91-sdk').SendSmsService;
const sendSms = new sendSmsService("AUTH_KEY", "SENDER_ID", "ROUTE_ID");
sendSms.senderId
const mobileNumbers = [
    "988448XXXXX",
    "988447XXXXX",
    "988547XXXXX",
] // (*) mobile number of the client

const messages = [
    "Hello all, We welcome you all for msg91-sdk",
    "This sdk will give you many advantages from others"
]

const countryDialCode = "91" // "91" -> India, "1" -> USA, "44" -> UK, etc

sendSms.sendSMS(mobileNumbers, messages, countryDialCode).then(() => {
//Handle success result
}).catch(() => {
//Handle failure result
})

sendSms.sendSMS("988448XXXXX", "Hello All", countryDialCode).then(() => {
//Handle success result
}).catch(() => {
//Handle failure result
})

sendSms.sendSMS("988448XXXXX,988458XXXXX,988468XXXXX", "Hello All,New Message", countryDialCode).then(() => {
//Handle success result
}).catch(() => {
//Handle failure result
})
```

Sending sms with flow 

```javascript
const sendSmsService = require('msg91-sdk').SendSmsService;
const sendSms = new sendSmsService("AUTH_KEY", "SENDER_ID", "ROUTE_ID");
sendSms.senderId

const mobileNumber = "91988448XXXXX" // mobile number of the user
const templateId = "TEMPLATE_ID" // Template created in msg91 platform 

//Template Message in msg91 ->  Hi All, Welcome you all##COMPANY_NAME## 
/**
 * const params = {COMPANY_NAME:"MSG91-SDK"}
 **/

const params = {
    param_one: "COMPANY_NAME",
    param_two: "Welcome Message",
}


sendSms.sendSMSFlow(mobileNumber, templateId, params).then(() => {
//Handle success result
}).catch(() => {
//Handle failure result
})
```
 
 ## Utilities
 
 Checking balance of the route type

```javascript
require('msg91-sdk').getBalance("AUTH_KEY", "ROUTE_ID").then(() => {
//Handle success result
}).catch(() => {
//Handle failure result
})
```

## Buy Me a Coffee

<a href="https://www.buymeacoffee.com/naveenkumarn2" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: auto !important;width: auto !important;" ></a>

## License
[MIT License](https://opensource.org/licenses/MIT)
```licsene
Copyright (c) 2020 Naveen Kumar Kuppan

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```


