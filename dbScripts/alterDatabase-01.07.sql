--############################################################
--# Drop tax number column from prm_company
--############################################################

ALTER TABLE prm_company DROP COLUMN company_tax_registration_number;

--############################################################
--# renaming prm_premises table and altering columns
--############################################################

ALTER TABLE prm_premise RENAME TO prm_company_premise;
ALTER TABLE prm_company_premise DROP COLUMN company_tax_registration_number;

--############################################################
--# renaming prm_invoice table and altering columns
--############################################################

ALTER TABLE prm_invoice RENAME TO invoice;
ALTER TABLE invoice DROP COLUMN premises_electronic_device_id;

--############################################################
--# removing link of prm_product_type with prm_product_group
--############################################################

ALTER TABLE prm_product_type DROP COLUMN product_group_id;

--############################################################
--# Create table prm_category
--############################################################

CREATE TABLE IF NOT EXISTS prm_product_category (
	category_id			SERIAL,
	category_name		VARCHAR(64) NOT NULL,
	category_deleted	BOOLEAN DEFAULT 'f',
	created_at			TIMESTAMP,
	updated_at			TIMESTAMP
);

--############################################################
--# altering table and adding columns to enquiries
--############################################################

ALTER TABLE enquiries 
ADD COLUMN general_notes			TEXT,
ADD COLUMN general_notes_updated_at TIMESTAMP,
ADD COLUMN allergies				TEXT,
ADD COLUMN allergies_updated_at		TIMESTAMP;
ADD COLUMN prm_surgeon_user_id		INT REFERENCES users(id) ON DELETE SET NULL;

--############################################################
--# Create table prm_company_premise_device 
--############################################################

CREATE TABLE IF NOT EXISTS prm_company_premise_device (
	device_id			VARCHAR(20) NOT NULL,
	device_deleted		BOOLEAN DEFAULT 'f',
	deleted_at			TIMESTAMP,
	created_at			TIMESTAMP
);

UPDATE db_version SET version ='01.07', version_date=CURRENT_DATE WHERE resource='Tables';


COMMIT;