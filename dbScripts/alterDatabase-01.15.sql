--############################################################
--# Adding bridge tables between users and prm_client
--# and clients and prm_client
--############################################################

ALTER TABLE prm_client 
DROP COLUMN user_id
DROP COLUMN clients_id;

CREATE TABLE IF NOT EXISTS users_prm_client_bridge (
	id				SERIAL,
	users_id		INT NOT NULL CONSTRAINT users_prm_client_bridge_users_fk REFERENCES users (id),
	prm_client_id	INT NOT NULL CONSTRAINT users_prm_client_bridge_prm_client_fk REFERENCES prm_client (id),
	created_at		DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE IF NOT EXISTS clients_prm_client_bridge (
	id				SERIAL,
	clients_id		INT NOT NULL CONSTRAINT clients_prm_client_bridge_clients_fk REFERENCES clients (id),
	prm_client_id	INT NOT NULL CONSTRAINT clients_prm_client_bridge_prm_client_fk REFERENCES prm_client (id),
	created_at		DATE NOT NULL DEFAULT CURRENT_DATE
);

--############################################################
--# altering prm_company table
--############################################################

ALTER TABLE prm_company ADD COLUMN prm_client_id INT
CONSTRAINT prm_company_prm_client REFERENCES prm_client (id);

--############################################################
--# adding columns to users table
--############################################################

ALTER TABLE users
ADD COLUMN title VARCHAR(64),
ADD COLUMN specialization VARCHAR(256);

--############################################################
--# altering business_customers table
--############################################################

ALTER TABLE business_customer DROP COLUMN tax_number;
ALTER TABLE business_customer DROP COLUMN country_code;
ALTER TABLE business_customer ADD COLUMN country_id INT
CONSTRAINT business_customer_countries_fk REFERENCES countries (id);

--############################################################
--# altering users_prm_client
--############################################################

ALTER TABLE users_prm_client DROP COLUMN prm_company;

--############################################################
--# removing unnecessary NOT NULL constraint from invoice table
--############################################################

ALTER TABLE invoice
ALTER COLUMN invoice_type DROP NOT NULL,
ALTER COLUMN invoice_time DROP NOT NULL,
ALTER COLUMN invoice_number DROP NOT NULL,
ALTER COLUMN invoice_numbering_structure DROP NOT NULL,
ALTER COLUMN company_name DROP NOT NULL,
ALTER COLUMN company_address_line_1 DROP NOT NULL,
ALTER COLUMN company_post_code DROP NOT NULL,
ALTER COLUMN company_city DROP NOT NULL,
ALTER COLUMN company_country_code DROP NOT NULL,
ALTER COLUMN company_iban DROP NOT NULL,
ALTER COLUMN company_tax_registration_number DROP NOT NULL,
ALTER COLUMN company_vat_number DROP NOT NULL,
ALTER COLUMN company_legal_registration_identifier DROP NOT NULL,
ALTER COLUMN issued_in DROP NOT NULL,
ALTER COLUMN enquiries_name DROP NOT NULL,
ALTER COLUMN enquiries_last_name DROP NOT NULL,
ALTER COLUMN enquiries_address_line_1 DROP NOT NULL,
ALTER COLUMN enquiries_post_code DROP NOT NULL,
ALTER COLUMN enquiries_city DROP NOT NULL,
ALTER COLUMN enquiries_country_code DROP NOT NULL,
ALTER COLUMN enquiries_tax_registration_number DROP NOT NULL,
ALTER COLUMN enquiries_vat_number DROP NOT NULL,
ALTER COLUMN lines_sum DROP NOT NULL,
ALTER COLUMN discount_sum DROP NOT NULL,
ALTER COLUMN charges_sum DROP NOT NULL,
ALTER COLUMN total_without_vat DROP NOT NULL,
ALTER COLUMN total_vat_amount DROP NOT NULL,
ALTER COLUMN total_with_vat DROP NOT NULL,
ALTER COLUMN paid_amount DROP NOT NULL,
ALTER COLUMN amount_due_for_payment DROP NOT NULL,
ALTER COLUMN payment_method DROP NOT NULL,
ALTER COLUMN operator_name DROP NOT NULL,
ALTER COLUMN operator_tax_number DROP NOT NULL,
ALTER COLUMN zoi DROP NOT NULL,
ALTER COLUMN eor DROP NOT NULL;

ALTER TABLE invoice DROP COLUMN payment_method;
ALTER TABLE invoice DROP COLUMN item_id;

--############################################################
--# create payment_method table
--############################################################

CREATE TABLE IF NOT EXISTS payment_method (
	id				SERIAL PRIMARY KEY,
	invoice_id		INT CONSTRAINT payment_method_invoice_fk REFERENCES invoice (invoice_id),
	amount			NUMERIC(8,2),
	type			VARCHAR(128),
	created_at		DATE NOT NULL DEFAULT CURRENT_DATE
);

--############################################################
--# adding prm_locale column to the users table
--############################################################

ALTER TABLE users ADD COLUMN prm_locale VARCHAR(8) DEFAULT 'sl';

--############################################################
--# altering bridge tables
--############################################################

ALTER TABLE users_prm_client_bridge ADD CONSTRAINT users_prm_client_bridge_id PRIMARY KEY (id);
ALTER TABLE clients_prm_client_bridge ADD CONSTRAINT clients_prm_client_bridge_id PRIMARY KEY (id);

--############################################################
--# linking prm_premise_company_device to prm_company_premise
--############################################################

ALTER TABLE prm_company_premise_device ADD COLUMN company_premise_id INT
CONSTRAINT prm_company_premise_device_prm_company_premise_fk REFERENCES prm_company_premise (premise_id);

ALTER TABLE prm_company_premise DROP COLUMN device_id;

--############################################################
--# deleting users_prm_client table and adding function
--# column to users table
--############################################################

DROP TABLE users_prm_client;
ALTER TABLE users ADD COLUMN function TEXT[];

--############################################################
--# altering enquiries table
--############################################################

ALTER TABLE enquiries
DROP COLUMN prm_dentist_user_id,
DROP COLUMN prm_surgeon_user_id;

ALTER TABLE enquiries ADD COLUMN prm_dentist_user_id INT references users(id) on delete set null;
ALTER TABLE enquiries ADD COLUMN prm_surgeon_user_id INT references users(id) on delete set null;

--############################################################
--# renaming column in prm_company
--############################################################

ALTER TABLE prm_company 
RENAME COLUMN tax_payer TO vat_payer;

--############################################################
--# altering id types in tables and adding premise_label to
--# prm_company_premise
--############################################################

CREATE SEQUENCE prm_company_premise_premise_id_seq MINVALUE 6;
ALTER TABLE prm_company_premise ALTER COLUMN premise_id SET DEFAULT nextval('prm_company_premise_premise_id_seq');
ALTER SEQUENCE prm_company_premise_premise_id_seq OWNED BY prm_company_premise.premise_id;

ALTER TABLE prm_company_premise_device DROP COLUMN device_id CASCADE;
ALTER TABLE prm_company_premise_device ADD COLUMN device_id SERIAL PRIMARY KEY;
ALTER TABLE invoice DROP COLUMN device_id;
ALTER TABLE invoice ADD COLUMN device_id INT 
CONSTRAINT invoice_prm_company_premise_device_fk REFERENCES prm_company_premise_device (device_id);

ALTER TABLE prm_company_premise ADD COLUMN premise_label VARCHAR(20);

--############################################################
--# Updating users for SmartPRM
--############################################################

UPDATE users SET title = 'Dr.', specialization = 'dr. dent. med.', function = '{dentist}' WHERE id = 39; 
UPDATE users SET title = 'Dr.', specialization = 'dr. dent. med.', function = '{dentist}' WHERE id = 148;
UPDATE users SET title = 'Dr.', specialization = 'dr. dent. med.', function = '{dentist}' WHERE id = 149;
UPDATE users SET title = 'Dr.', specialization = 'dr. dent. med.', function = '{dentist}' WHERE id = 102;
INSERT INTO users (name, email, title, specialization, function) VALUES ('Tomaž Lukanovič', 'tomaz.lukanovic@primadent.si', 'Dr.', 'dr. dent. med.', '{dentist}');
UPDATE users SET name = 'Tina Fabjan', title = 'Dr.', specialization = 'dr. dent. med.', function = '{dentist}' WHERE id = 78;
INSERT INTO users (name, email, title, specialization, function) VALUES ('Špela Rangus', 'spela.rangus@primadent.si', 'Dr.', 'dr. dent. med.', '{dentist}');
INSERT INTO users (name, email, title, specialization, function) VALUES ('Polona Šter', 'polona.ster@primadent.si', 'Dr.', 'dr. dent. med.', '{dentist}');
INSERT INTO users (name, email, title, specialization, function) VALUES ('Gašper Fortuna', 'gasper.fortuna@primadent.si', 'Dr.', 'dr. dent. med., spec. oralne in maksilofacialne kirurgije', '{dentist,surgeon}');
INSERT INTO users (name, email, title, specialization, function) VALUES ('Žiga Kovačič', 'ziga.kovacic@primadent.si', 'Dr.', 'dr. dent. med., spec. oralne in maksilofacialne kirurgije', '{dentist,surgeon}');

--############################################################
--# Adding default value now() to created_at in notes table
--############################################################

ALTER TABLE notes ALTER COLUMN created_at SET DEFAULT CURRENT_TIMESTAMP;

UPDATE db_version SET version ='01.15', version_date=CURRENT_DATE WHERE resource='Tables';

COMMIT;