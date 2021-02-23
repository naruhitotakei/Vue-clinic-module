const https = require('https')
const base64url = require('base64url');
const utf8 = require('utf8');
const fs = require('fs');
const env = require('get-env')();

const testUrl = 'blagajne-test.fu.gov.si'
const testPort = 9002
const prodUrl = 'blagajne.fu.gov.si'
const prodPort = 9003

const options = {
  hostname: testUrl,
  port: testPort,
  path: '/v1/cash_registers/...',
  method: 'POST',
  key: fs.readFileSync('./fiscalVerfication/ssl/key.pem'),
  cert: fs.readFileSync('./fiscalVerfication/ssl/cert.pem'),
  ca: fs.readFileSync('./fiscalVerfication/ssl/blagajne-test.fu.gov.si.cer'),  
  passphrase: 'password',
  headers: {
  }
}

const ping = () => {
    console.log("Environment " + env)

    var jsonRequest = {
        "EchoRequest":    "furs"
    }
    var data = JSON.stringify(jsonRequest)
    
    var pingOptions = getOptions("echo", data.length);     
    const req = https.request(pingOptions, (res) => {
        console.log(`statusCode: ${res.statusCode}`)
        res.on('data', (d) => {
            process.stdout.write(d)
        })
    })
    req.on('error', (error) => {
        console.error(error)
    })

    req.write(data)
    req.end()
}

const issueInvoice = (invoice) => {
    var header = getHeader()  
    var boddy = getBoddy(invoice)      
    var signedToken = getSignedToken(header + "." + boddy)
     
    var data = JSON.stringify({"token" : signedToken})
    console.log(data)
    
    return 3;
}

const getOptions = (service, len) => {
    var reqOptions = options
    if (env == 'prod') {
        reqOptions.hostname = prodUrl
        reqOptions.port = prodPort
    }
    reqOptions.path = '/v1/cash_registers/' + service
    reqOptions.headers = {
        'Content-Type': 'application/json; charset=UTF-8',
        'Content-Length': len
    }
    return reqOptions
} 

const getHeader = () => {
    var header = {
        "alg":          "RS256",
        "subject_name": "subject name",
        "issuer_name":  "issuer name",
        "serial":       "serial"
    }
    var headerBytes = utf8.encode(JSON.stringify(header))
    var headerBase64 = base64url(headerBytes)
    return headerBase64
}

const getBoddy = (invoice) => {
    return 123
}

const getSignedToken = (token) => {
    return token + "." + 234
}

module.exports = {
  ping,
  issueInvoice,
}