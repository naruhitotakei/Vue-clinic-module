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
    if (invoice.invoice_number) statement += "invoice_number,"
    if (invoice.invoice_number_furs) statement += "invoice_number_furs,"
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
    if (invoice.verification_status) statement += "verification_status,"
    if (invoice.payment_status) statement += "payment_status,"
    if (invoice.service_date) statement += "service_date,"
    if (invoice.due_date) statement += "due_date,"
    if (invoice.reference_code) statement += "reference_code,"
    if (invoice.reference_code_furs) statement += "reference_code_furs,"
    statement = statement.slice(0, -1)
    statement+= ") VALUES ("
    if (invoice.invoice_type) statement += "'" + invoice.invoice_type + "',"
    if (invoice.invoice_time) statement += "NOW(),"
    if (invoice.invoice_number) statement += "'" + invoice.invoice_number + "',"
    if (invoice.invoice_number_furs) statement += "'" + invoice.invoice_number_furs + "',"
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
    if (invoice.verification_status) statement += "'" + invoice.verification_status + "',"
    if (invoice.payment_status) statement += "'" + invoice.payment_status + "',"
    if (invoice.service_date) statement += "'" + invoice.service_date + "',"
    if (invoice.due_date) statement += "'" + invoice.due_date + "',"
    if (invoice.reference_code) statement += "'" + invoice.reference_code + "',"
    if (invoice.reference_code_furs) statement += "'" + invoice.reference_code_furs + "',"
    statement = statement.slice(0, -1)
    statement += ") RETURNING invoice_id"
    pool.query(statement, (error, results) => {
        if (error) {
            throw error
        }
        var invoiceId = results.rows[0].invoice_id;
        var shouldSaveTeethAndSurface = invoice.verification_status === 'invoice.issued'
        if (invoice.invoiceItems.length > 0) {
            invoice.invoiceItems.forEach(item => {
                createInoviceItem(item, invoiceId, invoice.id, shouldSaveTeethAndSurface)
            });
        }
        if (invoice.payment_methods.length > 0) {
            invoice.payment_methods.forEach(item => {
                createPaymentMethod(invoiceId, item.type, item.amount, item.paid)
            });
        }
        response.status(200).json(invoiceId)
    })
}

const updateInvoices = (request, response, id, invoice) => {
    let statement = "UPDATE invoice SET "
    if (invoice.invoice_type) statement += "invoice_type='" + invoice.invoice_type + "',"
    if (invoice.invoice_time) statement += "invoice_time='" + invoice.invoice_time + "',"
    if (invoice.invoice_number) statement += "invoice_number='" + invoice.invoice_number + "',"
    if (invoice.invoice_number_furs) statement += "invoice_number_furs='" + invoice.invoice_number_furs + "',"
    if (invoice.issued_in) statement += "issued_in='" + invoice.issued_in + "',"
    if (invoice.company_id) statement += "company_id='" + invoice.company_id + "',"
    if (invoice.company_name) statement += "company_name='" + invoice.company_name + "',"
    if (invoice.company_address_line_1) statement += "company_address_line_1='" + invoice.company_address_line_1 + "',"
    if (invoice.company_post_code) statement += "company_post_code='" + invoice.company_post_code + "',"
    if (invoice.company_city) statement += "company_city='" + invoice.company_city + "',"
    if (invoice.company_country_code) statement += "company_country_code='" + invoice.company_country_code + "',"
    if (invoice.company_iban) statement += "company_iban='" + invoice.company_iban + "',"
    if (invoice.company_vat_number) statement += "company_vat_number='" + invoice.company_vat_number + "',"
    if (invoice.company_tax_registration_number) statement += "company_tax_registration_number='" + invoice.company_tax_registration_number + "',"
    if (invoice.company_legal_registration_identifier) statement += "company_legal_registration_identifier='" + invoice.company_legal_registration_identifier + "',"
    if (invoice.id) statement += "enquiries_id='" + invoice.id + "',"
    if (invoice.name) statement += "enquiries_name='" + invoice.name + "',"
    if (invoice.last_name) statement += "enquiries_last_name='" + invoice.last_name + "',"
    if (invoice.address_line_1) statement += "enquiries_address_line_1='" + invoice.address_line_1 + "',"
    if (invoice.post_code) statement += "enquiries_post_code='" + invoice.post_code + "',"
    if (invoice.city) statement += "enquiries_city='" + invoice.city + "',"
    if (invoice.country_code) statement += "enquiries_country_code='" + invoice.country_code + "',"
    if (invoice.tax_registration_number) statement += "enquiries_tax_registration_number='" + invoice.tax_registration_number + "',"
    if (invoice.vat_number) statement += "enquiries_vat_number='" + invoice.vat_number + "',"
    if (invoice.lines_sum) statement += "lines_sum='" + invoice.lines_sum + "',"
    if (invoice.discount_sum) statement += "discount_sum='" + invoice.discount_sum + "',"
    if (invoice.charges_sum) statement += "charges_sum='" + invoice.charges_sum + "',"
    if (invoice.total_without_vat) statement += "total_without_vat='" + invoice.total_without_vat + "',"
    if (invoice.total_vat_amount) statement += "total_vat_amount='" + invoice.total_vat_amount + "',"
    if (invoice.total_with_vat) statement += "total_with_vat='" + invoice.total_with_vat + "',"
    if (invoice.paid_amount) statement += "paid_amount='" + invoice.paid_amount + "',"
    if (invoice.amount_due_for_payment) statement += "amount_due_for_payment='" + invoice.amount_due_for_payment + "',"
    if (invoice.warranty) statement += "warranty='" + invoice.warranty + "',"
    if (invoice.vat_exemption_reason) statement += "vat_exemption_reason='" + invoice.vat_exemption_reason + "',"
    if (invoice.operator_name) statement += "operator_name='" + invoice.operator_name + "',"
    if (invoice.operator_tax_number) statement += "operator_tax_number='" + invoice.operator_tax_number + "',"
    if (invoice.zoi) statement += "zoi='" + invoice.zoi + "',"
    if (invoice.eor) statement += "eor='" + invoice.eor + "',"
    if (invoice.invoice_special_notes) statement += "invoice_special_notes='" + invoice.invoice_special_notes + "',"
    if (invoice.reverted) statement += "reverted='" + invoice.reverted + "',"
    if (invoice.device_id) statement += "device_id='" + invoice.device_id + "',"
    if (invoice.premise_id) statement += "premise_id='" + invoice.premise_id + "',"
    if (invoice.business_customer_id) statement += "business_customer_id='" + invoice.business_customer_id + "',"
    if (invoice.verification_status) statement += "verification_status='" + invoice.verification_status + "',"
    if (invoice.payment_status) statement += "payment_status='" + invoice.payment_status + "',"
    if (invoice.service_date) statement += "service_date='" + invoice.service_date + "',"
    if (invoice.due_date) statement += "due_date='" + invoice.due_date + "',"
    if (invoice.reference_code) statement += "reference_code='" + invoice.reference_code + "',"
    if (invoice.reference_code_furs) statement += "reference_code_furs='" + invoice.reference_code_furs + "',"
    statement = statement.slice(0, -1)
    statement += " WHERE invoice_id = " + id
    
    pool.query(statement, (error, results) => {
        if (error) {
            throw error
        }
        
        response.status(200).json(invoice.verification_status)
    })
    var shouldSaveTeethAndSurface = invoice.verification_status === 'invoice.issued'
    if (invoice.invoiceItems.length > 0) {
        invoice.invoiceItems.forEach(item => {
            if (item.id) {
                updateInoviceItem(item, item.id, invoice.id, shouldSaveTeethAndSurface)
            } else {
                createInoviceItem(item, id, invoice.id, shouldSaveTeethAndSurface)
            }
        });
    }
    if (invoice.payment_methods.length > 0) {
        invoice.payment_methods.forEach(item => {
            if (item.id) {
                updatePaymentMethod(item.id, item.type, item.amount, item.paid)
            } else {
                createPaymentMethod(id, item.type, item.amount, item.paid)
            }
        });
    }
}

const createPaymentMethod = (invoiceId, paymentMethod, amount, paid) => {
    let statement = "INSERT INTO payment_item(invoice_id, amount, type, paid, created_at"
    statement+= ") VALUES (" + invoiceId + "," + amount + ",'" + paymentMethod + "'," + paid + ",NOW())"
    pool.query(statement, (error, results) => {
        if (error) {
            throw error
        } 
    })
}

const updatePaymentMethod = (id, paymentMethod, amount, paid) => {
    let statement = "UPDATE payment_item SET paid=" + paid + ","
    if (paymentMethod) statement += "type='" + paymentMethod + "',"
    if (amount) statement += "amount='" + amount + "',"
    statement = statement.slice(0, -1)
    statement += " WHERE id = " + id
    pool.query(statement, (error, results) => {
        if (error) {
            throw error
        } 
    })
}

const createInoviceItem = (item, invoiceId, enquiryId, shouldSaveTeethAndSurface) => {
    let net_amount = item.item.tax_amount ? parseFloat(item.item.product_price) + parseFloat(item.item.tax_amount) : parseFloat(item.item.product_price)
    let teeth = item.teeth.toString()
    let surfaces = item.surfaces.toString()
    let statement = "INSERT INTO invoice_item(invoice_id, product_id, product_name, product_price, invoiced_quantity, discount, product_vat_tax_rate, product_tax_amount, net_amount, teeth, surfaces, comment, created_date) VALUES (" + invoiceId + "," + item.item.product_id + ",'" + item.item.product_name + "'," + item.item.product_price + "," + item.quantity + ","+ item.discount + "," + item.item.tax_rate + "," + item.item.tax_amount + "," + net_amount + ",'" + teeth + "','" + surfaces + "','" + item.comment + "',NOW()) RETURNING id"
    pool.query(statement, (error, results) => {
        if (error) {
            throw error
        }
        var invoiceItemId = results.rows[0].id;

        if( shouldSaveTeethAndSurface) {
            item.teeth.forEach(tooth => {
                createTooth(tooth, enquiryId, invoiceItemId, item.surfaces, item.comment)
            })
        }
    })
}

const updateInoviceItem = (item, invoiceItemId, enquiryId, shouldSaveTeethAndSurface) => {
    let net_amount = item.item.tax_amount ? parseFloat(item.item.product_price) + parseFloat(item.item.tax_amount) : parseFloat(item.item.product_price)

    let statement = "UPDATE invoice_item SET "
    if (item.item.product_id) statement += "product_id='" + item.item.product_id + "',"
    if (item.item.product_name) statement += "product_name='" + item.item.product_name + "',"
    if (item.item.product_price) statement += "product_price='" + item.item.product_price + "',"
    if (item.invoiced_quantity) statement += "invoiced_quantity='" + item.invoiced_quantity + "',"
    if (item.discount) statement += "discount='" + item.discount + "',"
    if (item.teeth) statement += "teeth='" + item.teeth.toString() + "',"
    if (item.surfaces) statement += "surfaces='" + item.surfaces.toString() + "',"
    if (item.comment) statement += "comment='" + item.comment + "',"
    if (item.item.tax_rate) statement += "product_vat_tax_rate='" + item.item.tax_rate + "',"
    if (item.item.tax_amount) statement += "product_tax_amount='" + item.item.tax_amount + "',"
    statement += "net_amount='" + net_amount + "' WHERE id = " + invoiceItemId
    pool.query(statement, (error, results) => {
        if (error) {
            throw error
        } 

        if( shouldSaveTeethAndSurface) {
            item.teeth.forEach(tooth => {
                createTooth(tooth, enquiryId, invoiceItemId, item.surfaces, item.comment)
            })
        }
    })
}

const createTooth = (tooth, enquiryId, invoiceItemId, surfaces, comment) => {
    let statement = "INSERT INTO enquiry_teeth(enquiry_id, number, created_at) VALUES (" + enquiryId + ", " + tooth + ", NOW()) RETURNING id"
    pool.query(statement, (error, results) => {
        if (error) {
            throw error
        }
        var toothId = results.rows[0].id;

        createInvoiceItemTooth(toothId, invoiceItemId, surfaces, comment)
        createToothLog(toothId, surfaces, comment)
    })
}

const createToothLog = (toothId, surfaces, comment) => {
    let statement = "INSERT INTO tooth_log(enquiry_teeth_id, comment, date, created_at,"
    if (surfaces.includes('O')) statement += "occlusal,"
    if (surfaces.includes('M')) statement += "mesial,"
    if (surfaces.includes('D')) statement += "distal,"
    if (surfaces.includes('B')) statement += "buccal,"
    if (surfaces.includes('L')) statement += "lingual,"
    statement = statement.slice(0, -1)
    statement+= ") VALUES (" + toothId + ", '" + comment + "', NOW(), NOW(),"
    if (surfaces.includes('O')) statement += "true,"
    if (surfaces.includes('M')) statement += "true,"
    if (surfaces.includes('D')) statement += "true,"
    if (surfaces.includes('B')) statement += "true,"
    if (surfaces.includes('L')) statement += "true,"
    statement = statement.slice(0, -1)
    statement += ")"
    pool.query(statement, (error, results) => {
        if (error) {
            throw error
        }
    })
}

const createInvoiceItemTooth = (toothId, invoiceItemId, surfaces, comment) => {
    let statement = "INSERT INTO teeth_invoice_item(enquiry_teeth_id, invoice_item_id, comment, created_at,"
    if (surfaces.includes('O')) statement += "occlusal,"
    if (surfaces.includes('M')) statement += "mesial,"
    if (surfaces.includes('D')) statement += "distal,"
    if (surfaces.includes('B')) statement += "buccal,"
    if (surfaces.includes('L')) statement += "lingual,"
    statement = statement.slice(0, -1)
    statement+= ") VALUES (" + toothId + ", " + invoiceItemId + ", '" + comment + "', NOW(),"
    if (surfaces.includes('O')) statement += "true,"
    if (surfaces.includes('M')) statement += "true,"
    if (surfaces.includes('D')) statement += "true,"
    if (surfaces.includes('B')) statement += "true,"
    if (surfaces.includes('L')) statement += "true,"
    statement = statement.slice(0, -1)
    statement += ")"
    pool.query(statement, (error, results) => {
        if (error) {
            throw error
        }
    })
}

const getInvoices = (request, response, user_id, accessible_user_ids, prm_client_id, scope) => {
    let statement = "SELECT DISTINCT ON (invoice_id) * FROM invoice "
    statement += "LEFT JOIN enquiries ON invoice.enquiries_id = enquiries.id "
    statement += "LEFT JOIN users ON enquiries.prm_dentist_user_id = users.id OR enquiries.prm_surgeon_user_id = users.id "
    statement += "LEFT JOIN prm_client ON enquiries.prm_client_id = prm_client.id "
    statement += "WHERE invoice_type = 'Invoice' "
    statement += "AND prm_client.client_deleted IS FALSE "
    if (scope == 'All') {
    } else if (scope == 'PrmClient') {
        statement += "AND enquiries.prm_client_id=" + prm_client_id;
    } else if (scope == 'Self') {
        statement += "AND (enquiries.prm_dentist_user_id = " + user_id + " OR enquiries.prm_surgeon_user_id = " + user_id + ")";
    } else if (scope === 'Self&LinkedUsers') {
        statement += "AND (enquiries.prm_dentist_user_id = " + user_id + " OR enquiries.prm_surgeon_user_id = " + user_id;
        if (accessible_user_ids) {
            for (const acc_id in accessible_user_ids) {
                statement += " OR enquiries.prm_dentist_user_id = " + accessible_user_ids[acc_id] + " OR enquiries.prm_surgeon_user_id = " + accessible_user_ids[acc_id]
            }
        }
        statement += ") ";
    }
    pool.query(statement, (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getInvoiceById = (request, response, id) => {
    pool.query("SELECT invoice.*,enquiries.email,enquiries.phone, countries.name as country FROM invoice LEFT JOIN enquiries ON invoice.enquiries_id = enquiries.id LEFT JOIN countries ON invoice.enquiries_country_code = countries.code WHERE invoice.invoice_id = $1", [id] , (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getItemsOfInvoiceById = (request, response, id) => {
    let statement = "SELECT * FROM invoice_item WHERE invoice_id = " + id
    pool.query(statement, (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getPaymentItemsOfInvoiceById = (request, response, id) => {
    let statement = "SELECT * FROM payment_item WHERE invoice_id = " + id
    pool.query(statement, (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getConsecutiveInvoiceNumberForCompany = (request, response, id) => {
    pool.query("SELECT COUNT(company_id) FROM invoice WHERE company_id = $1", [id] , (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getSerialForInvoiceNumberBasedOnType = (request, response, data) => {
    let statement = "SELECT COUNT(invoice_number) FROM invoice WHERE invoice_type !='Offer' and invoice_number !='" + data.draft + "'"
    pool.query(statement, (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getSerialForFursInvoiceNumberBasedOnType = (request, response, data) => {
    let statement = "SELECT COUNT(invoice_number_furs) FROM invoice WHERE invoice_type !='Offer' AND invoice_number_furs LIKE '" + data.business_premise_id + "%'"
    pool.query(statement, (error, results) => {
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
    getItemsOfInvoiceById,
    updateInvoices,
    getConsecutiveInvoiceNumberForCompany,
    getPaymentItemsOfInvoiceById,
    getSerialForInvoiceNumberBasedOnType,
    getSerialForFursInvoiceNumberBasedOnType
}