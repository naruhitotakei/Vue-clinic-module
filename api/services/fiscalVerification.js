const fiscalVerfication = require('slo-fiscal-verification')
const { v4: uuidv4 } = require('uuid');

const premises = {
    "BusinessPremiseRequest": {
        "Header": {
            "MessageID": uuidv4(),
             "DateTime": "2021-03-09T09:11:33"
        },
        "BusinessPremise": {
            "TaxNumber": 10563369,                 // must be the same as tax number in certificate
            "BusinessPremiseID": null,             // alphanumeric 1-20 characters unique for specific tax number
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
            "ValidityDate": "2021-03-09T09:11:33",        // premise valid from date  
            "SoftwareSupplier": [{"TaxNumber":58912258}]
        }
    }
}

const registerPremises = async (premiseId) => {
    p = premises
    p.BusinessPremiseRequest.BusinessPremise.BusinessPremiseID = premiseId;
      const certDescriptor = {
    }
    rv = await fiscalVerfication.registerPremises(premises, certDescriptor)
}

module.exports = {
  registerPremises
}