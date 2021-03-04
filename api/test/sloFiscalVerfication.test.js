const fiscalVerfication = require('../fiscalVerfication/sloFiscalVerfication')
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const certDescriptor = {
    certFile: './fiscalVerfication/ssl/cert.pem',
    keyFile:  './fiscalVerfication/ssl/key.pem',
    passphrase:'password',
    subject:  'CN=TESTNO PODJETJE 1580,2.5.4.5=#130131,OU=10563369,OU=DavPotRacTEST,O=state-institutions,C=SI',
    issuer:   'CN=Tax CA Test, O=state-institutions, C=SI',
    serial:   '6582329214307630886'
}

const premises = {
    "BusinessPremiseRequest": {
        "Header": {
            "MessageID": uuidv4(),
             "DateTime": "2015-03-02T08:09:06"      // now
        },
        "BusinessPremise": {
            "TaxNumber": 10563369,                 // must be the same as tax number in certificate
            "BusinessPremiseID": "36CF",           // alphanumeric 1-20 characters unique for specific tax number
            "BPIdentifier": {
                "RealEstateBP": {
                    "PropertyID": {                // register nepremičnin:
                        "CadastralNumber": 228,    // katastrska občina
                        "BuildingNumber": 123,     // št. stavbe
                        "BuildingSectionNumber": 5 // št. dela stavbe
                     },
                     "Address": {
                         "Street": "Dolenjska ceta",
                         "HouseNumber": "5",
                         "HouseNumberAdditional": "A",
                         "Community": "Kranj",
                         "City": "Kranj",
                         "PostalCode": "3221"
                     }
                 }
             },
            "ValidityDate": "2020-01-22",        // premise valid from date  
            "SoftwareSupplier": [{"TaxNumber":58912258}],
            "SpecialNotes":"To je poljuben string dolg najvec 1000 znakov. Sicer ni verjetno, da ga bo ko bral, ampak vseeno"
        }
    }
}

const assert = require('assert');describe('Test Fiscal Verification', () => {
    it('should respond to a ping', () => {
        fiscalVerfication.ping(certDescriptor);
    });
    it('should register premises', () => {
        fiscalVerfication.registerPremises(premises, certDescriptor);
    });    
});
