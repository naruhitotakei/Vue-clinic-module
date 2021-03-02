const fiscalVerfication = require('../fiscalVerfication/sloFiscalVerfication')

const fs = require('fs');

const testInvoiceRaw = fs.readFileSync('./test/fiscalVerificationPatterns/invoice.json');
const testInvoice = JSON.parse(testInvoiceRaw);

const assert = require('assert');describe('Test Ping', () => {
    it('should respond to a ping', () => {
        fiscalVerfication.ping('./fiscalVerfication/ssl/cert.pem', './fiscalVerfication/ssl/key.pem', 'password');
    });
    it('should sign', () => {
        fiscalVerfication.getSignedToken('123.345');
    });    
});
