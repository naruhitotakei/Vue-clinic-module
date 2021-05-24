--############################################################
--# Inserting values into prm_company_premise
--############################################################

INSERT INTO prm_company_premise (premise_id, company_id, premise_name, premise_street, premise_house_number,
premise_community, premise_post_code, premise_city, premise_country_code, premise_cadastral_number, building_number,
building_section_number) VALUES
(1, 1, 'Zobna ambulanta Primadent Ljubljana', 'Ulica bratov Učakar', '64', 'Četrtna skupnost Šiška', '1000', 'Ljubljana', 'SI', '1739', '1064', '1'),
(2, 1, 'Zobna ambulanta Primadent Maribor', 'Gospejna ulica', '11', 'Center', '2000', 'Maribor', 'SI', '657', '1619', '1'),
(3, 1, 'Zobna ambulanta Primadent Celje', 'Aškerčeva ulica', '14', 'Center', '3000', 'Celje', 'SI', '1077', '3086', '1'),
(4, 1, 'Zobna ambulanta Primadent Šenčur', 'Poslovna cona A', '32', '/', '4208', 'Šenčur', 'SI', '2119', '1575', '1'),
(5, 1, 'Zobna ambulanta Primadent Škofije', 'Spodnje Škofije', '147', '/', '6281', 'Škofije', 'SI', '2595', '142', '1');

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

UPDATE users SET prm_role_id = 9 WHERE id = 130;
UPDATE users SET prm_role_id = 5 WHERE id = 39;
UPDATE users SET prm_role_id = 3 WHERE id = 140;

INSERT INTO users (name, email, prm_role_id) VALUES
('Uroš Krmac', 'uros.krmac@gmail.com', 1),
('Gaja Bužan', 'gaja.buzan@gmail.com', 4),
('Lea Žgur', 'lea.zgur@gmail.com', 4),
('Sestra Primadent', 'NursePrimadent@gmail.com', 7),
('SuperSestra Primadent', 'SuperNursePrimadent@gmail.com', 8);

UPDATE users SET roles = '{doctor}' WHERE id = 148;
UPDATE users SET roles = '{doctor}' WHERE id = 149;

UPDATE users SET accessible_user_ids = '{38, 148, 149}' WHERE id = 39;
UPDATE users SET accessible_user_ids = '{38}' WHERE id = 150;
UPDATE users SET accessible_user_ids = '{17,27,28,29,30,51,62,98,103,104,105,106,107,108,110,119,120,121,125,126,129,136,137,148,149}' WHERE id = 151;

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

ALTER TABLE users ADD COLUMN prm_company_id INT 
CONSTRAINT users_prm_company_fk REFERENCES prm_company (company_id);

ALTER TABLE locations ADD COLUMN name VARCHAR(256);

UPDATE locations SET name = 'Klinika Primadent Šenčur' WHERE id = 64;
UPDATE locations SET name = 'Klinika Primadent Šenčur' WHERE id = 65;
UPDATE locations SET name = 'Klinika Primadent Šenčur' WHERE id = 66;
UPDATE locations SET name = 'Maribor' WHERE id = 67;
UPDATE locations SET name = 'Klinika Primadent Celje' WHERE id = 68;
UPDATE locations SET name = 'Klinika Primadent Ljubljana' WHERE id = 69;
UPDATE locations SET name = 'Klinika Primadent Ljubljana' WHERE id = 71;
UPDATE locations SET name = 'Klinika Primadent Šenčur' WHERE id = 72;
UPDATE locations SET name = 'Klinika Primadent Šenčur' WHERE id = 73;
UPDATE locations SET name = 'Klinika Primadent Šenčur' WHERE id = 74;
UPDATE locations SET name = 'Maribor' WHERE id = 75;
UPDATE locations SET name = 'Klinika Primadent Škofije' WHERE id = 77;
UPDATE locations SET name = 'Klinika Primadent Škofije' WHERE id = 78;
UPDATE locations SET name = 'Celje' WHERE id = 100;
UPDATE locations SET name = 'Ljubljana' WHERE id = 101;
UPDATE locations SET name = 'Klinika Primadent Celje' WHERE id = 103;
UPDATE locations SET name = 'Ljubljana (Tina)' WHERE id = 107;

UPDATE db_version SET version ='01.14', version_date=CURRENT_DATE WHERE resource='Tables';


COMMIT;