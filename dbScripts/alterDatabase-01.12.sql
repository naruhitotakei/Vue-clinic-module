--############################################################
--# Alter prm_company_premise table
--############################################################

ALTER TABLE prm_company_premise RENAME COLUMN software_supplier_tax_registration_number TO software_supplier_tax_number;

ALTER TABLE prm_company_premise RENAME COLUMN premise_address_line_1 TO premise_street;

ALTER TABLE prm_company_premise RENAME COLUMN bulding_number TO building_number;

ALTER TABLE prm_company_premise
ALTER COLUMN premise_id TYPE INT,
ALTER COLUMN premise_house_number TYPE VARCHAR(8),
ALTER COLUMN premise_post_code TYPE VARCHAR(8),
ALTER COLUMN premise_cadastral_number TYPE VARCHAR(8),
ALTER COLUMN building_number TYPE VARCHAR(8),
ALTER COLUMN building_section_number TYPE VARCHAR(8),
ALTER COLUMN premise_house_number_additional DROP NOT NULL;

ALTER TABLE prm_company_premise
ADD COLUMN company_tax_number VARCHAR(32);

ALTER TABLE prm_company_premise
ADD COLUMN special_notes TEXT;

ALTER TABLE prm_company_premise
ALTER COLUMN premise_electronic_device_id DROP NOT NULL;

ALTER TABLE prm_company_premise
ALTER COLUMN premises_validity_date SET DEFAULT now();

ALTER TABLE prm_company_premise
DROP COLUMN company_id;

ALTER TABLE prm_company_premise DROP COLUMN premise_id CASCADE;

ALTER TABLE prm_company_premise ADD COLUMN premise_id INT;

ALTER TABLE prm_company_premise ADD COLUMN device_id VARCHAR(20)
CONSTRAINT prm_company_premise_prm_company_premise_device REFERENCES prm_company_premise_device (device_id);

ALTER TABLE prm_company_premise
DROP COLUMN premise_business_premise_id,
DROP COLUMN premise_electronic_device_id;

ALTER TABLE prm_company_premise RENAME COLUMN company_name TO premise_name;

ALTER TABLE prm_company_premise ADD COLUMN company_id INT
CONSTRAINT prm_company_premise_prm_company_fk REFERENCES prm_company (company_id);

ALTER TABLE prm_company_premise DROP COLUMN software_supplier_tax_number;

ALTER TABLE prm_company_premise DROP COLUMN company_tax_number;

ALTER TABLE prm_company_premise RENAME COLUMN premises_validity_date TO validity_date;

--############################################################
--# Alter prm_invoice_item table
--############################################################

ALTER TABLE prm_invoice_item
DROP COLUMN product_type_id;

--############################################################
--# Establish a link between prm_company_premise and invoice
--############################################################

ALTER TABLE prm_company_premise ADD CONSTRAINT prm_company_premise_pk PRIMARY KEY (premise_id);

ALTER TABLE invoice ADD COLUMN premise_id INT
CONSTRAINT invoice_prm_company_premise_fk REFERENCES prm_company_premise (premise_id);

--############################################################
--# Add fee column into prm_product_group
--############################################################

ALTER TABLE prm_product_group
ADD COLUMN fee NUMERIC;

--############################################################
--# Create vat_tax_amount table and fill it with values
--############################################################

CREATE TABLE IF NOT EXISTS vat_tax_amount (
	vat_tax_amount_id SERIAL,
	vat_tax_amount NUMERIC,
	country_id INT NOT NULL CONSTRAINT vat_tax_amount_countries_fk REFERENCES countries (id),
	active BOOLEAN DEFAULT 't',
	created_date DATE NOT NULL DEFAULT CURRENT_DATE
);

INSERT INTO vat_tax_amount (vat_tax_amount, country_id) VALUES 
(NULL, 1), (0, 1), (9.5, 1), (22,1);

DROP TABLE prm_invoice_item CASCADE;

ALTER TABLE invoice ADD CONSTRAINT invoice_invoice_id PRIMARY KEY (invoice_id);

CREATE TABLE IF NOT EXISTS prm_invoice_item (
	id SERIAL,
	invoice_id SERIAL CONSTRAINT invoice_item_invoice_fk REFERENCES invoice (invoice_id),
	product_id SERIAL CONSTRAINT invoice_item_prm_product_fk REFERENCES prm_product (product_id),
	product_name VARCHAR(64) NOT NULL,
	product_price NUMERIC(8,2) NOT NULL,
	invoiced_quantity INT NOT NULL,
	discount NUMERIC(8,2),
	product_vat_tax_rate NUMERIC,
	product_taxable_amount NUMERIC(8,2) NOT NULL,
	product_tax_amount NUMERIC(8,2),
	net_amount NUMERIC(8,2) NOT NULL,
	created_date DATE NOT NULL DEFAULT CURRENT_DATE
);

ALTER TABLE invoice DROP COLUMN item_id;

ALTER TABLE prm_invoice_item ADD CONSTRAINT prm_invoice_item_id PRIMARY KEY (id);

ALTER TABLE invoice ADD COLUMN item_id INT
CONSTRAINT invoice_prm_invoice_item_fk REFERENCES prm_invoice_item (id);



UPDATE db_version SET version ='01.12', version_date=CURRENT_DATE WHERE resource='Tables';


COMMIT;