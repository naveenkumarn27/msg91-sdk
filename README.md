# msg91-sdk
This is used to handle msg91 apis such as send otp, sms and sms flow.

How to implement 
----------------
Install node module package in your project

```npm
npm install msg91-sdk --save
```

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
