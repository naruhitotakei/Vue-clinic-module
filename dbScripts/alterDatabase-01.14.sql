--############################################################
--# Changing values in vat_tax_rate table, tax_rate_label columns
--############################################################

UPDATE vat_tax_rate SET tax_rate_label = 'Brez davka' WHERE tax_rate_label = 'Not taxable';
UPDATE vat_tax_rate SET tax_rate_label = 'Nič' WHERE tax_rate_label = '0';
UPDATE vat_tax_rate SET tax_rate_label = 'Nižja stopnja' WHERE tax_rate_label = '9.5';
UPDATE vat_tax_rate SET tax_rate_label = 'Splošna stopnja' WHERE tax_rate_label = '22';

--############################################################
--# Inserting Primadent into prm_company
--############################################################

ALTER TABLE prm_company ADD COLUMN prm_client_id INT
CONSTRAINT prm_company_prm_client_fk REFERENCES prm_client (id);

ALTER TABLE prm_company RENAME COLUMN company_vat_number TO company_tax_registration_number;

ALTER TABLE prm_company
ALTER COLUMN cert_file DROP NOT NULL,
ALTER COLUMN key_file DROP NOT NULL,
ALTER COLUMN pass_phrase DROP NOT NULL,
ALTER COLUMN company_subject DROP NOT NULL,
ALTER COLUMN company_issuer DROP NOT NULL,
ALTER COLUMN company_serial DROP NOT NULL;

INSERT INTO prm_company (company_name, company_address_line_1, company_post_code, company_country_code, company_city,
company_iban, company_tax_registration_number, company_legal_registration_identifier, prm_client_id) VALUES 
('Primadent d.o.o.', 'Spodnje Škofije 147', 6281, 'sl', 'Škofije', 'SI56 1010 0005 6606 867', 'SI 49184075', 8158584000, 1);


--############################################################
--# Inserting values into prm_company_premise
--############################################################

INSERT INTO prm_company_premise (premise_id, company_id, premise_name, premise_street, premise_house_number,
premise_community, premise_post_code, premise_city, premise_country_code, premise_cadastral_number, building_number,
building_section_number) VALUES
(1, (SELECT company_id FROM prm_company WHERE company_name = 'Primadent d.o.o.'), 'Zobna ambulanta Primadent Škofije', 'Spodnje Škofije', '147', '/', '6281', 'Škofije', 'SI', '2595', '142', '1');

--############################################################
--# Small alteration to invoice table
--############################################################

ALTER TABLE invoice DROP COLUMN premises_business_premise_id;

--############################################################
--# Adding tax_number column to users table
--############################################################

ALTER TABLE users ADD COLUMN tax_number VARCHAR(32);

--############################################################
--# Inserting "SuperCaller" role into prm_role and 
--# entering key relations between users
--############################################################

INSERT INTO prm_role (role_id, role_name) VALUES (9, 'SuperCaller');

UPDATE users SET prm_role_id = 9 WHERE email = 'jasna.bordon@emazing.si';
UPDATE users SET prm_role_id = 5 WHERE email = 'mirjana.tavcar@siol.net';
UPDATE users SET prm_role_id = 3 WHERE email = 'manca.jeglic@emazing.si';

INSERT INTO users (name, email, prm_role_id) VALUES
('Uroš Krmac', 'uros.krmac@gmail.com', 1),
('Gaja Bužan', 'gaja.buzan@gmail.com', 4),
('Lea Žgur', 'lea.zgur@gmail.com', 4),
('Sestra Primadent', 'NursePrimadent@gmail.com', 7),
('SuperSestra Primadent', 'SuperNursePrimadent@gmail.com', 8);

UPDATE users SET roles = '{doctor}' WHERE email = 'gaja.buzan@primadent.si';
UPDATE users SET roles = '{doctor}' WHERE email = 'lea.zgur@primadent.si';

UPDATE users SET accessible_user_ids = '{148, 149}' WHERE email = 'mirjana.tavcar@siol.net';
UPDATE users SET accessible_user_ids = '{38}' WHERE email = 'NursePrimadent@gmail.com';
UPDATE users SET accessible_user_ids = '{17,27,28,29,30,51,62,98,103,104,105,106,107,108,110,119,120,121,125,126,129,136,137,148,149}' WHERE email = 'SuperNursePrimadent@gmail.com';

ALTER TABLE users ADD COLUMN prm_client_id INT 
CONSTRAINT users_prm_client_fk REFERENCES prm_client (id);

CREATE TABLE IF NOT EXISTS users_prm_client (
	id					SERIAL PRIMARY KEY,
	user_id				INT CONSTRAINT users_prm_client_users_pk REFERENCES users (id),
	prm_client_id		INT CONSTRAINT users_prm_client_prm_client_pk REFERENCES prm_client (id),
	name				VARCHAR(128) NOT NULL,
	email				VARCHAR(128),
	phone				VARCHAR(128),
	title				VARCHAR(64),
	specialization		VARCHAR(256),
	role				TEXT[],
	active				BOOLEAN DEFAULT 't',
	created_at			DATE NOT NULL DEFAULT CURRENT_DATE,
	updated_at			DATE
);

ALTER TABLE enquiries DROP COLUMN prm_dentist_user_id;
ALTER TABLE enquiries DROP COLUMN prm_surgeon_user_id;

ALTER TABLE enquiries ADD COLUMN prm_dentist_user_id INT references users_prm_client (id) on delete set null;
ALTER TABLE enquiries ADD COLUMN prm_surgeon_user_id INT references users_prm_client (id) on delete set null;

ALTER TABLE users_prm_client 
ADD COLUMN accessible_user_ids TEXT[],
ADD COLUMN prm_company_premise INT CONSTRAINT users_prm_client_prm_company_premise_fk REFERENCES prm_company_premise (premise_id),
ADD COLUMN prm_company INT CONSTRAINT users_prm_client_prm_company_fk REFERENCES prm_company (company_id);

--############################################################
--# Adding name column to prm_company_premise_device
--############################################################

ALTER TABLE prm_company_premise_device ADD COLUMN device_name VARCHAR(128);

--############################################################
--# Adding name column in locations table and updating values
--############################################################

ALTER TABLE locations ADD COLUMN name VARCHAR(256);
ALTER TABLE locations ADD COLUMN prm_client_id INT
CONSTRAINT locations_prm_client_fk REFERENCES prm_client (id);

UPDATE locations SET name = 'Klinika Primadent Šenčur', prm_client_id = 1 WHERE id = 64;
UPDATE locations SET name = 'Klinika Primadent Šenčur', prm_client_id = 1 WHERE id = 65;
UPDATE locations SET name = 'Klinika Primadent Šenčur', prm_client_id = 1 WHERE id = 66;
UPDATE locations SET name = 'Maribor', prm_client_id = 1 WHERE id = 67;
UPDATE locations SET name = 'Klinika Primadent Celje', prm_client_id = 1 WHERE id = 68;
UPDATE locations SET name = 'Klinika Primadent Ljubljana', prm_client_id = 1 WHERE id = 69;
UPDATE locations SET name = 'Klinika Primadent Ljubljana', prm_client_id = 1 WHERE id = 71;
UPDATE locations SET name = 'Klinika Primadent Šenčur', prm_client_id = 1 WHERE id = 72;
UPDATE locations SET name = 'Klinika Primadent Šenčur', prm_client_id = 1 WHERE id = 73;
UPDATE locations SET name = 'Klinika Primadent Šenčur', prm_client_id = 1 WHERE id = 74;
UPDATE locations SET name = 'Maribor', prm_client_id = 1 WHERE id = 75;
UPDATE locations SET name = 'Klinika Primadent Škofije', prm_client_id = 1 WHERE id = 77;
UPDATE locations SET name = 'Klinika Primadent Škofije', prm_client_id = 1 WHERE id = 78;
UPDATE locations SET name = 'Celje', prm_client_id = 1 WHERE id = 100;
UPDATE locations SET name = 'Ljubljana', prm_client_id = 1 WHERE id = 101;
UPDATE locations SET name = 'Klinika Primadent Celje', prm_client_id = 1 WHERE id = 103;
UPDATE locations SET name = 'Ljubljana (Tina)', prm_client_id = 1 WHERE id = 107;

UPDATE db_version SET version ='01.14', version_date=CURRENT_DATE WHERE resource='Tables';


COMMIT;
