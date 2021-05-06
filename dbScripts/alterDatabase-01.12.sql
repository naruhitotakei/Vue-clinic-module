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

UPDATE db_version SET version ='01.12', version_date=CURRENT_DATE WHERE resource='Tables';


COMMIT;