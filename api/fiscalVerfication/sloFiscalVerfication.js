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
const ping = (certDescriptor) => {
    console.log("Environment " + env)

    var jsonRequest = {
        "EchoRequest":    "furs"
    }
    var data = JSON.stringify(jsonRequest)
    
    var pingOptions = getOptions("echo", data.length, certDescriptor);     
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

const registerPremises = (premises, certDescriptor) => {
    var checkStatus = checkPremises(premises)
    if (checkStatus != "OK") 
        return checkStatus;
    return issueDocument("invoices/register", premises, certDescriptor)
}

const issueInvoice = (invoice, certDescriptor) => {
    var checkStatus = checkInvoice(invoice)
    if (checkStatus != "OK") 
        return checkStatus;
    return issueDocument("invoices", invoice, certDescriptor)
}

///////////////////////////////////
//
// HELPER METHODES
//
///////////////////////////////////
const checkPremises = (premises) => {
    return "OK"
}

const checkInvoice = (invoice) => {
    return "OK"
}

const issueDocument = (service, doc, certDescriptor) => {
    var header = getHeaderBase64(certDescriptor)  
    var boddy = getBoddyBase64(doc)
    var signedToken = getSignedToken(header + "." + boddy, certDescriptor)
    var data = JSON.stringify({ "token": signedToken})
     
    var issueOptions = getOptions(service, data.length, certDescriptor);     
    const req = https.request(issueOptions, (res) => {
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

const getHeaderBase64 = (certDescriptor) => {
    var header = {
        "alg":          "RS256",
        "subject_name": certDescriptor.subject,
        "issuer_name":  certDescriptor.issuer,
        "serial":       certDescriptor.serial
    }
        
    var headerBytes = utf8.encode(JSON.stringify(header))
    var headerBase64 = base64url(headerBytes)
    return headerBase64
}

const getBoddyBase64 = (doc) => {
    var docBytes = utf8.encode(JSON.stringify(doc))
    var docBase64 = base64url(docBytes)
    return docBase64
}

const getOptions = (service, len, certDescriptor) => {
    var reqOptions = {
        method: 'POST',
        cert: fs.readFileSync(certDescriptor.certFile),
        key: fs.readFileSync(certDescriptor.keyFile),  
        passphrase: certDescriptor.passphrase,
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

const getSignedToken = (token, certDescriptor) => {
    var privateKey = getPrivateKey(certDescriptor.keyFile)
        
    var sign = crypto.createSign('sha256WithRSAEncryption');
    sign.write(token);
    sign.end();
    var signature = sign.sign(privateKey, 'hex');
    var base64Signature = base64url(parseHexString(signature))
    return token + "." + base64Signature
}

const getPrivateKey = (keyFile) => {
    var pemString = fs.readFileSync(keyFile);
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
  ping,
  registerPremises,
  issueInvoice
}