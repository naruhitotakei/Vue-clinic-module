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
    let statement = "INSERT INTO invoice(invoice_type, invoice_time, invoice_numbering_structure, invoice_number, company_id, company_name, company_address_line_1, company_post_code, company_city, company_country_code, company_iban, company_tax_registration_number, company_vat_number," + 
    "company_legal_registration_identifier, issued_in, enquiries_id, enquiries_name, enquiries_last_name, enquiries_address_line_1, enquiries_post_code, enquiries_city, enquiries_country_code, enquiries_tax_registration_number, enquiries_vat_number, lines_sum, discount_sum," + 
    "charges_sum, total_without_vat, total_vat_amount, total_with_vat, paid_amount, amount_due_for_payment, payment_method, warranty, vat_exemption_reason, operator_name, operator_tax_number, zoi, eor, invoice_special_notes, reverted, created_date, device_id, premise_id," +
    "business_customer_id, invoice_status) VALUES ("
    statement += "'" + invoice.invoice_type + "', '" + invoice.invoice_time + "', '" + invoice.invoice_numbering_structure + "', '" + invoice.invoice_number + "', " + invoice.company_id + ", '" + invoice.company_name + "'," +
     "'" + invoice.company_address_line_1 + "', " + invoice.company_post_code + ", '" + invoice.company_city + "', '" + invoice.company_country_code + "', '" + invoice.company_iban + "', '" + invoice.company_tax_registration_number + "', '" + invoice.company_vat_number + "'," + 
    invoice.company_legal_registration_identifier + ", '" + invoice.issued_in + "', " + invoice.id + ", '" + invoice.name + "', '" + invoice.last_name + "', '" + invoice.address_line_1 + "', " + invoice.post_code + ", '" + invoice.city + "', '" + invoice.country_code + "', '" + invoice.tax_registration_number + "', '" + invoice.vat_number + "'," + 
    + invoice.lines_sum + ", " + invoice.discount_sum + ", " + invoice.charges_sum + ", " + invoice.total_without_vat + ", " + invoice.total_vat_amount + ", " + invoice.total_with_vat + ", " + invoice.paid_amount + ", " + invoice.amount_due_for_payment + ",'" + invoice.payment_method + "', " + invoice.warranty + ", '" + invoice.vat_exemption_reason + "', '" + invoice.operator_name + "', '" + invoice.operator_tax_number + "'," + 
     "'" + invoice.zoi + "', '" + invoice.eor + "', '" + invoice.invoice_special_notes + "', " + invoice.reverted + "," +
     "NOW()," + invoice.device_id + ", " + invoice.premise_id + ", " + invoice.business_customer_id + ", '" + invoice.invoice_status + "') RETURNING invoice_id"
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
        response.status(200).json("OK")
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
    pool.query("SELECT invoice.*,enquiries.email,enquiries.phone, countries.name as country FROM invoice left join enquiries on invoice.enquiries_id = enquiries.id left join countries on invoice.enquiries_country_code = countries.code WHERE invoice.invoice_number = $1", [id] , (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

module.exports = {
    createInvoices,
    getInvoices,
    getInvoiceById
}