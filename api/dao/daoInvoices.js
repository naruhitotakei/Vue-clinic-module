require('dotenv').config();

const Pool = require('pg').Pool
const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT || 5432,
})

const createInvoices = (request, response, invoice) => {
    let statement = "INSERT INTO invoice("
    if (invoice.invoice_type) statement += "invoice_type,"
    if (invoice.invoice_time) statement += "invoice_time,"
    if (invoice.invoice_numbering_structure) statement += "invoice_numbering_structure,"
    if (invoice.invoice_number) statement += "invoice_number,"
    if (invoice.issued_in) statement += "issued_in,"
    if (invoice.company_id) statement += "company_id,"
    if (invoice.company_name) statement += "company_name,"
    if (invoice.company_address_line_1) statement += "company_address_line_1,"
    if (invoice.company_post_code) statement += "company_post_code,"
    if (invoice.company_city) statement += "company_city,"
    if (invoice.company_country_code) statement += "company_country_code,"
    if (invoice.company_iban) statement += "company_iban,"
    if (invoice.company_vat_number) statement += "company_vat_number,"
    if (invoice.company_tax_registration_number) statement += "company_tax_registration_number,"
    if (invoice.company_legal_registration_identifier) statement += "company_legal_registration_identifier,"
    if (invoice.id) statement += "enquiries_id,"
    if (invoice.name) statement += "enquiries_name,"
    if (invoice.last_name) statement += "enquiries_last_name,"
    if (invoice.address_line_1) statement += "enquiries_address_line_1,"
    if (invoice.post_code) statement += "enquiries_post_code,"
    if (invoice.city) statement += "enquiries_city,"
    if (invoice.country_code) statement += "enquiries_country_code,"
    if (invoice.tax_registration_number) statement += "enquiries_tax_registration_number,"
    if (invoice.vat_number) statement += "enquiries_vat_number,"
    if (invoice.lines_sum) statement += "lines_sum,"
    if (invoice.discount_sum) statement += "discount_sum,"
    if (invoice.charges_sum) statement += "charges_sum,"
    if (invoice.total_without_vat) statement += "total_without_vat,"
    if (invoice.total_vat_amount) statement += "total_vat_amount,"
    if (invoice.total_with_vat) statement += "total_with_vat,"
    if (invoice.paid_amount) statement += "paid_amount,"
    if (invoice.amount_due_for_payment) statement += "amount_due_for_payment,"
    if (invoice.warranty) statement += "warranty,"
    if (invoice.vat_exemption_reason) statement += "vat_exemption_reason,"
    if (invoice.operator_name) statement += "operator_name,"
    if (invoice.operator_tax_number) statement += "operator_tax_number,"
    if (invoice.zoi) statement += "zoi,"
    if (invoice.eor) statement += "eor,"
    if (invoice.invoice_special_notes) statement += "invoice_special_notes,"
    if (invoice.reverted) statement += "reverted,"
    if (invoice.created_date) statement += "created_date,"
    if (invoice.device_id) statement += "device_id,"
    if (invoice.premise_id) statement += "premise_id,"
    if (invoice.business_customer_id) statement += "business_customer_id,"
    if (invoice.invoice_status) statement += "invoice_status"
    statement+= ") VALUES ("
    if (invoice.invoice_type) statement += "'" + invoice.invoice_type + "',"
    if (invoice.invoice_time) statement += "'" + invoice.invoice_time + "',"
    if (invoice.invoice_numbering_structure) statement += "'" + invoice.invoice_numbering_structure + "',"
    if (invoice.invoice_number) statement += "'" + invoice.invoice_number + "',"
    if (invoice.issued_in) statement += "'" + invoice.issued_in + "',"
    if (invoice.company_id) statement += "'" + invoice.company_id + "',"
    if (invoice.company_name) statement += "'" + invoice.company_name + "',"
    if (invoice.company_address_line_1) statement += "'" + invoice.company_address_line_1 + "',"
    if (invoice.company_post_code) statement += "'" + invoice.company_post_code + "',"
    if (invoice.company_city) statement += "'" + invoice.company_city + "',"
    if (invoice.company_country_code) statement += "'" + invoice.company_country_code + "',"
    if (invoice.company_iban) statement += "'" + invoice.company_iban + "',"
    if (invoice.company_vat_number) statement += "'" + invoice.company_vat_number + "',"
    if (invoice.company_tax_registration_number) statement += "'" + invoice.company_tax_registration_number + "',"
    if (invoice.company_legal_registration_identifier) statement += "'" + invoice.company_legal_registration_identifier + "',"
    if (invoice.id) statement += "'" + invoice.id + "',"
    if (invoice.name) statement += "'" + invoice.name + "',"
    if (invoice.last_name) statement += "'" + invoice.last_name + "',"
    if (invoice.address_line_1) statement += "'" + invoice.address_line_1 + "',"
    if (invoice.post_code) statement += "'" + invoice.post_code + "',"
    if (invoice.city) statement += "'" + invoice.city + "',"
    if (invoice.country_code) statement += "'" + invoice.country_code + "',"
    if (invoice.tax_registration_number) statement += "'" + invoice.tax_registration_number + "',"
    if (invoice.vat_number) statement += "'" + invoice.vat_number + "',"
    if (invoice.lines_sum) statement += "'" + invoice.lines_sum + "',"
    if (invoice.discount_sum) statement += "'" + invoice.discount_sum + "',"
    if (invoice.charges_sum) statement += "'" + invoice.charges_sum + "',"
    if (invoice.total_without_vat) statement += "'" + invoice.total_without_vat + "',"
    if (invoice.total_vat_amount) statement += "'" + invoice.total_vat_amount + "',"
    if (invoice.total_with_vat) statement += "'" + invoice.total_with_vat + "',"
    if (invoice.paid_amount) statement += "'" + invoice.paid_amount + "',"
    if (invoice.amount_due_for_payment) statement += "'" + invoice.amount_due_for_payment + "',"
    if (invoice.warranty) statement += "'" + invoice.warranty + "',"
    if (invoice.vat_exemption_reason) statement += "'" + invoice.vat_exemption_reason + "',"
    if (invoice.operator_name) statement += "'" + invoice.operator_name + "',"
    if (invoice.operator_tax_number) statement += "'" + invoice.operator_tax_number + "',"
    if (invoice.zoi) statement += "'" + invoice.zoi + "',"
    if (invoice.eor) statement += "'" + invoice.eor + "',"
    if (invoice.invoice_special_notes) statement += "'" + invoice.invoice_special_notes + "',"
    if (invoice.reverted) statement += "'" + invoice.reverted + "',"
    if (invoice.created_date) statement += "NOW(),"
    if (invoice.device_id) statement += "'" + invoice.device_id + "',"
    if (invoice.premise_id) statement += "'" + invoice.premise_id + "',"
    if (invoice.business_customer_id) statement += "'" + invoice.business_customer_id + "',"
    if (invoice.invoice_status) statement += "'" + invoice.invoice_status + "',"
    statement = statement.slice(0, -1)
    statement += ") RETURNING invoice_id"
    
    console.log(statement)
    pool.query(statement, (error, results) => {
        if (error) {
            throw error
        }
        var invoiceId = results.rows[0].invoice_id;
        if (invoice.invoiceItems.length > 0) {
            invoice.invoiceItems.forEach(item => {
                createInoviceItem(item, invoiceId)
            });
        }
        let isAdvPayment = invoice.invoice_type === 'Advance payment'
        createPaymentMethod(invoiceId, invoice.payment_method, invoice.lines_sum, isAdvPayment)
        response.status(200).json("OK")
    })
}

const createPaymentMethod = (invoiceId, paymentMethod, amount, isAdvPayment) => {
    let statement = "INSERT INTO payment_method(invoice_id, amount, type, created_at"
    if (isAdvPayment) statement+= ",adv_payment_id"
    statement+= ") VALUES (" + invoiceId + "," + amount + ",'" + paymentMethod + "',NOW()"
    if (isAdvPayment) statement+= "," + invoiceId
    statement+= ")"
    console.log(statement)
    pool.query(statement, (error, results) => {
        if (error) {
            throw error
        } 
    })
}

const createInoviceItem = (item, id) => {
    let net_amount = parseFloat(item.item.product_price) + parseFloat(item.item.tax_amount)
    let statement = "INSERT INTO invoice_item(invoice_id, product_id, product_name, product_price, invoiced_quantity, discount, product_vat_tax_rate, product_tax_amount, net_amount, created_date) VALUES (" + id + "," + item.item.product_id + ",'" + item.item.product_name + "'," + item.item.product_price + "," + item.quantity + ","+ item.discount + "," + item.item.tax_rate + "," + item.item.tax_amount + "," + net_amount + ",NOW())"
    console.log(statement)
    pool.query(statement, (error, results) => {
        if (error) {
            throw error
        } 
    })
}

const getInvoices = (request, response) => {
    pool.query("SELECT * FROM invoice WHERE invoice_type = 'Invoice'", (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getInvoiceById = (request, response, id) => {
    pool.query("SELECT invoice.*,enquiries.email,enquiries.phone, countries.name as country, p.type as payment_method FROM invoice LEFT JOIN enquiries ON invoice.enquiries_id = enquiries.id LEFT JOIN countries ON invoice.enquiries_country_code = countries.code LEFT JOIN payment_method p ON invoice.invoice_id = p.invoice_id WHERE invoice.invoice_number = $1", [id] , (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getItemsOfInvoiceById = (request, response, id) => {
    pool.query("SELECT * FROM invoice_item WHERE invoice_id = $1", [id] , (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

module.exports = {
    createInvoices,
    getInvoices,
    getInvoiceById,
    getItemsOfInvoiceById
}