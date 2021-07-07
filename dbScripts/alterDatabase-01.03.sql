--############################################################
--# Create invoice table
--############################################################
CREATE TABLE IF NOT EXISTS prm_invoice (
   invoice_id								SERIAL,
   invoice_type								VARCHAR(32) NOT NULL,
   invoice_time								TIMESTAMP NOT NULL,
   invoice_number							VARCHAR(128) NOT NULL,
   invoice_numbering_structure			    CHAR[1] NOT NULL,
   company_id								INT CONSTRAINT invoice_company_fk REFERENCES prm_company (company_id),
   company_name								VARCHAR(128) NOT NULL,
   company_address_line_1					VARCHAR(128),
   company_post_code					    INT NOT NULL,
   company_city								VARCHAR(64) NOT NULL,
   company_country_code						VARCHAR(8) NOT NULL,
   company_IBAN								VARCHAR(64) NOT NULL,
   company_tax_registration_number			VARCHAR(64) NOT NULL,
   company_VAT_number						VARCHAR(64) NOT NULL,
   company_legal_registration_identifier	BIGINT NOT NULL,
   premises_business_premise_ID				VARCHAR(20) NOT NULL,
   premises_electronic_device_ID			VARCHAR(20) NOT NULL,
   issued_in								VARCHAR(64) NOT NULL,
   enquiries_id							    SERIAL CONSTRAINT invoice_enquiries_fk REFERENCES enquiries (id),
   enquiries_name						    VARCHAR(255) NOT NULL,
   enquiries_last_name					    VARCHAR(255) NOT NULL,
   enquiries_address_line_1					VARCHAR(128) NOT NULL,
   enquiries_post_code						INT NOT NULL,
   enquiries_city						    VARCHAR(64) NOT NULL,
   enquiries_country_code					TEXT NOT NULL,
   enquiries_tax_registration_number 		VARCHAR(32) NOT NULL,
   enquiries_VAT_number		 				VARCHAR(32) NOT NULL,
   lines_sum								NUMERIC(8,2) NOT NULL,
   discount_sum								NUMERIC(8,2),
   charges_sum								NUMERIC(8,2) NOT NULL,
   total_without_VAT						NUMERIC(8,2) NOT NULL,
   total_VAT_amount							NUMERIC(8,2),
   total_with_VAT							NUMERIC(8,2) NOT NULL,
   paid_amount								NUMERIC(8,2),
   amount_due_for_payment					NUMERIC(8,2) NOT NULL,
   payment_method							VARCHAR(64) NOT NULL,
   warranty									BOOLEAN DEFAULT 't',
   VAT_exemption_reason						TEXT,
   operator_name							VARCHAR(64) NOT NULL,
   operator_tax_number						VARCHAR(32) NOT NULL,
   ZOI										VARCHAR(64) NOT NULL,
   EOR										VARCHAR(64) NOT NULL,
   invoice_special_notes					TEXT,
   reverted									BOOLEAN DEFAULT 'f',
   created_date								DATE NOT NULL DEFAULT CURRENT_DATE 
);
--############################################################
--# add enquiries fields to enquiries table
--############################################################
ALTER TABLE enquiries 
ADD COLUMN address_line_1	          VARCHAR(128),
ADD COLUMN post_code                INT,
ADD COLUMN city                     VARCHAR(64),
ADD COLUMN country_code             TEXT,
ADD COLUMN tax_registration_number  VARCHAR(32),
ADD COLUMN VAT_number	              VARCHAR(32);
--############################################################
--# Create company table
--############################################################
CREATE TABLE IF NOT EXISTS prm_company (
   company_id								 SERIAL,
   company_name								 VARCHAR(128) NOT NULL,
   company_address_line_1					 VARCHAR(128) NOT NULL,
   company_post_code						 INT NOT NULL,
   company_city								 VARCHAR(64) NOT NULL,
   company_country_code						 VARCHAR(8) NOT NULL,
   company_IBAN								 VARCHAR(64) NOT NULL,
   company_tax_registration_number		     VARCHAR(64) NOT NULL,
   company_VAT_number					     VARCHAR(64) NOT NULL,
   company_legal_registration_identifier	 BIGINT NOT NULL,
   company_deleted								BOOLEAN DEFAULT 'f',
   cert_file                      VARCHAR(132) NOT NULL,
   key_file                       VARCHAR(132) NOT NULL,
   pass_phrase                    VARCHAR(64) NOT NULL,
   company_subject                VARCHAR(256) NOT NULL,
   company_issuer                 VARCHAR(64) NOT NULL,
   company_serial                 VARCHAR(64) NOT NULL,
   created_date							     DATE NOT NULL DEFAULT CURRENT_DATE 
);
--############################################################
--# Create invoice line items table
--############################################################
CREATE TABLE IF NOT EXISTS prm_invoice_item (
   invoice_item_id			SERIAL UNIQUE,
   invoice_id				SERIAL UNIQUE CONSTRAINT invoice_item_invoice_fk REFERENCES prm_invoice (invoice_id),
   product_id			    SERIAL UNIQUE CONSTRAINT invoice_item_product_fk REFERENCES prm_product (product_id),
   product_type_id		    SERIAL UNIQUE CONSTRAINT invoice_item_product_type_fk REFERENCES prm_product_type (product_type_id),
   product_name				VARCHAR(32) NOT NULL,
   product_price			MONEY NOT NULL,
   invoiced_quantity		INT, 
   discount					DECIMAL NOT NULL DEFAULT 0,
   product_VAT_tax_rate		DECIMAL,
   product_taxable_amount	MONEY,
   product_tax_amount		MONEY,
   net_amount				MONEY NOT NULL,
   created_date				DATE NOT NULL DEFAULT CURRENT_DATE 
);
--############################################################
--# Create product table
--############################################################
CREATE TABLE IF NOT EXISTS prm_product (
   product_id			SERIAL UNIQUE,
   product_type_id		INT CONSTRAINT product_product_type_fk REFERENCES prm_product_type (product_type_id),
   product_group_id		INT CONSTRAINT product_product_group_fk REFERENCES prm_product_group (product_group_id),
   product_name		    VARCHAR(32) NOT NULL,
   product_price		MONEY NOT NULL,
   VAT_tax_rate		    DECIMAL,
   taxable_amount	    MONEY,
   tax_amount		    MONEY,
   product_deleted		BOOLEAN DEFAULT 'f',
   created_date			DATE NOT NULL DEFAULT CURRENT_DATE 
);
--############################################################
--# Create product types table
--############################################################
CREATE TABLE IF NOT EXISTS prm_product_type (
   product_type_id			SERIAL UNIQUE,
   product_type				VARCHAR(64) NOT NULL,
   product_group_id			SERIAL UNIQUE CONSTRAINT product_type_product_group_fk REFERENCES prm_product_group (product_group_id),
   product_type_deleted     BOOLEAN DEFAULT 'f',
   created_date			    DATE NOT NULL DEFAULT CURRENT_DATE 
);
--############################################################
--# Create product groups table
--############################################################
CREATE TABLE IF NOT EXISTS prm_product_group (
   product_group_id     SERIAL UNIQUE,
   product_group	    VARCHAR(64) NOT NULL,
   created_date         DATE NOT NULL DEFAULT CURRENT_DATE 
);
--############################################################
--# Create premises table
--############################################################
CREATE TABLE IF NOT EXISTS prm_premise (
   premise_id									SERIAL,
   company_id									SERIAL UNIQUE CONSTRAINT premise_company_fk REFERENCES prm_company (company_id),
   company_name									VARCHAR(128) NOT NULL,
   company_tax_registration_number				VARCHAR(64) NOT NULL,
   premise_address_line_1						VARCHAR(128) NOT NULL,
   premise_house_number							INT NOT NULL,
   premise_house_number_additional			    VARCHAR(8) NOT NULL,
   premise_community							VARCHAR(64) NOT NULL,
   premise_post_code							INT NOT NULL,
   premise_city									VARCHAR(64) NOT NULL,
   premise_country_code							VARCHAR(8) NOT NULL,
   premise_business_premise_ID					VARCHAR(20) NOT NULL,
   premise_electronic_device_ID					VARCHAR(20) NOT NULL,
   premise_cadastral_number						INT NOT NULL,
   bulding_number								INT NOT NULL,
   building_section_number						INT NOT NULL,
   premises_validity_date						DATE NOT NULL,
   software_supplier_tax_registration_number	VARCHAR(64) NOT NULL,						
   premise_deleted								BOOLEAN DEFAULT 'f',
   premise_special_notes          TEXT,
   created_date									DATE NOT NULL DEFAULT CURRENT_DATE
);
--############################################################
--# update version
--############################################################

UPDATE db_version SET version ='01.03', version_date=CURRENT_DATE WHERE resource='Tables';


COMMIT;
