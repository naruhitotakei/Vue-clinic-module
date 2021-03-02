const https = require('https')
const base64url = require('base64url');
const crypto = require('crypto');
const pki = require('node-forge').pki;
const utf8 = require('utf8');
const fs = require('fs');
const env = require('get-env')();

const testUrl = 'blagajne-test.fu.gov.si'
const testPort = 9002
const prodUrl = 'blagajne.fu.gov.si'
const prodPort = 9003

///////////////////////////////////
//
// API METHODES
//
///////////////////////////////////
const ping = (certPath, keyPath, passphrase) => {
    console.log("Environment " + env)

    var jsonRequest = {
        "EchoRequest":    "furs"
    }
    var data = JSON.stringify(jsonRequest)
    
    var pingOptions = getOptions("echo", data.length, certPath, keyPath, passphrase);     
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

const issueInvoice = (invoice, certPath, keyPath, passphrase) => {
    var checkStatus = checkInvoice(invoice)
    if (checkStatus != "OK") 
        return checkStatus;
    return issueDocument(invoice, certPath, keyPath, passphrase)
}

///////////////////////////////////
//
// HELPER METHODES
//
///////////////////////////////////
const checkInvoice = (invoice) => {
    return "OK"
}

const issueDocument = (doc, certPath, keyPath, passphrase) => {
    var header = getHeaderBase64(certPath)  
    var boddy = getBoddy(doc)      
    var signedToken = getSignedToken(header + "." + boddy)
     
    var data = JSON.stringify({"token" : signedToken})
    console.log(data)
}

const getHeaderBase64 = (certPath) => {
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

const getOptions = (service, len, certPath, keyPath, passphrase) => {
    var reqOptions = {
        method: 'POST',
        cert: fs.readFileSync(certPath),
        key: fs.readFileSync(keyPath),  
        passphrase: passphrase,
        headers: {}
    }
    if (env == 'prod') {
        reqOptions.hostname = prodUrl
        reqOptions.port = prodPort
        reqOptions.ca = fs.readFileSync('./fiscalVerfication/ssl/blagajne.fu.gov.si.cer')
    } else {
        reqOptions.hostname = testUrl
        reqOptions.port = testPort
        reqOptions.ca = fs.readFileSync('./fiscalVerfication/ssl/blagajne-test.fu.gov.si.cer')    
    }
    reqOptions.path = '/v1/cash_registers/' + service
    reqOptions.headers = {
        'Content-Type': 'application/json; charset=UTF-8',
        'Content-Length': len
    }
    return reqOptions
} 

const getBoddy = (invoice) => {
    return 123
}

const getSignedToken = (token) => {
    var privateKey = getPrivateKey('./fiscalVerfication/ssl/key.pem')
        
    var sign = crypto.createSign('sha256WithRSAEncryption');
    sign.write(token);
    sign.end();
    var signature = sign.sign(privateKey, 'hex');
    var base64Signature = base64url(parseHexString(signature))
    console.log("B Signature: " + token + "." + base64Signature)
    return token + "." + base64Signature
}

const getPrivateKey = (keyFile) => {
    var pemString = fs.readFileSync(keyFile);
    console.log("Sign key:" + pemString)
    var privateKey = crypto.createPrivateKey({
        'key': pemString,
        'format': 'pem',
        'type': 'pkcs8',
        'cipher': 'aes-256-cbc',
        'passphrase': 'password'
    });

    return privateKey
}

const parseHexString = (str) => { 
    var result = [];
    while (str.length >= 2) { 
        result.push(parseInt(str.substring(0, 2), 16));
        str = str.substring(2, str.length);
    }

    return result;
}

///////////////////////////////////
//
// EXPORTS
//
///////////////////////////////////
module.exports = {
  getSignedToken,
  ping,
  issueInvoice,
}