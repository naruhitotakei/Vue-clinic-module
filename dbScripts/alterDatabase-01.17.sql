--############################################################
--# filling table clients_prm_client_bridge with values
--############################################################

INSERT INTO clients_prm_client_bridge (clients_id, prm_client_id) VALUES 
(10, 1), (23, 1), (27,1), (25, 2), (30, 2), (21, 2), (28, 2), (22, 2), (1, 2), (5, 2), (19, 2);

--############################################################
--# changing foreign keys in invoice_item to INT type
--############################################################

ALTER TABLE invoice_item ALTER COLUMN invoice_id TYPE INT;
ALTER TABLE invoice_item ALTER COLUMN product_id TYPE INT;

--############################################################
--# removing premise_label column from prm_company_premise
--############################################################

ALTER TABLE prm_company_premise DROP COLUMN premise_label;

--############################################################
--# dropping not null constraints from prm_company
--############################################################

ALTER TABLE prm_company
ALTER COLUMN company_name DROP NOT NULL,
ALTER COLUMN company_address_line_1 DROP NOT NULL,
ALTER COLUMN company_post_code DROP NOT NULL,
ALTER COLUMN company_city DROP NOT NULL,
ALTER COLUMN company_country_code DROP NOT NULL,
ALTER COLUMN company_iban DROP NOT NULL,
ALTER COLUMN company_tax_registration_number DROP NOT NULL,
ALTER COLUMN company_vat_number DROP NOT NULL,
ALTER COLUMN company_legal_registration_identifier DROP NOT NULL,
ALTER COLUMN cert_file DROP NOT NULL,
ALTER COLUMN key_file DROP NOT NULL,
ALTER COLUMN pass_phrase DROP NOT NULL,
ALTER COLUMN company_subject DROP NOT NULL,
ALTER COLUMN company_issuer DROP NOT NULL,
ALTER COLUMN company_serial DROP NOT NULL;

--############################################################
--# Adding "developer" role
--############################################################

INSERT INTO prm_role (role_id, role_name) VALUES (11, 'Developer');

INSERT INTO prm_role_permission (role_permission_id, role_id, permission_id) VALUES (1101, 11, 11);
INSERT INTO prm_role_permission (role_permission_id, role_id, permission_id) VALUES (1102, 11, 21);
INSERT INTO prm_role_permission (role_permission_id, role_id, permission_id) VALUES (1103, 11, 31);
INSERT INTO prm_role_permission (role_permission_id, role_id, permission_id) VALUES (1104, 11, 41);
INSERT INTO prm_role_permission (role_permission_id, role_id, permission_id) VALUES (1105, 11, 51);
INSERT INTO prm_role_permission (role_permission_id, role_id, permission_id) VALUES (1106, 11, 61);
INSERT INTO prm_role_permission (role_permission_id, role_id, permission_id) VALUES (1107, 11, 71);
INSERT INTO prm_role_permission (role_permission_id, role_id, permission_id) VALUES (1108, 11, 81);
INSERT INTO prm_role_permission (role_permission_id, role_id, permission_id) VALUES (1109, 11, 91);
INSERT INTO prm_role_permission (role_permission_id, role_id, permission_id) VALUES (1110, 11, 101);
INSERT INTO prm_role_permission (role_permission_id, role_id, permission_id) VALUES (1111, 11, 111);
INSERT INTO prm_role_permission (role_permission_id, role_id, permission_id) VALUES (1112, 11, 121);
INSERT INTO prm_role_permission (role_permission_id, role_id, permission_id) VALUES (1113, 11, 131);
INSERT INTO prm_role_permission (role_permission_id, role_id, permission_id) VALUES (1114, 11, 141);
INSERT INTO prm_role_permission (role_permission_id, role_id, permission_id) VALUES (1115, 11, 151);
INSERT INTO prm_role_permission (role_permission_id, role_id, permission_id) VALUES (1116, 11, 161);
INSERT INTO prm_role_permission (role_permission_id, role_id, permission_id) VALUES (1117, 11, 171);
INSERT INTO prm_role_permission (role_permission_id, role_id, permission_id) VALUES (1118, 11, 181);
INSERT INTO prm_role_permission (role_permission_id, role_id, permission_id) VALUES (1119, 11, 191);
INSERT INTO prm_role_permission (role_permission_id, role_id, permission_id) VALUES (1120, 11, 201);
INSERT INTO prm_role_permission (role_permission_id, role_id, permission_id) VALUES (1121, 11, 211);
INSERT INTO prm_role_permission (role_permission_id, role_id, permission_id) VALUES (1122, 11, 221);
INSERT INTO prm_role_permission (role_permission_id, role_id, permission_id) VALUES (1123, 11, 231);
INSERT INTO prm_role_permission (role_permission_id, role_id, permission_id) VALUES (1124, 11, 241);
INSERT INTO prm_role_permission (role_permission_id, role_id, permission_id) VALUES (1125, 11, 251);
INSERT INTO prm_role_permission (role_permission_id, role_id, permission_id) VALUES (1126, 11, 261);
INSERT INTO prm_role_permission (role_permission_id, role_id, permission_id) VALUES (1127, 11, 271);
INSERT INTO prm_role_permission (role_permission_id, role_id, permission_id) VALUES (1128, 11, 281);
INSERT INTO prm_role_permission (role_permission_id, role_id, permission_id) VALUES (1129, 11, 291);
INSERT INTO prm_role_permission (role_permission_id, role_id, permission_id) VALUES (1130, 11, 301);
INSERT INTO prm_role_permission (role_permission_id, role_id, permission_id) VALUES (1131, 11, 311);
INSERT INTO prm_role_permission (role_permission_id, role_id, permission_id) VALUES (1132, 11, 321);
INSERT INTO prm_role_permission (role_permission_id, role_id, permission_id) VALUES (1133, 11, 331);
INSERT INTO prm_role_permission (role_permission_id, role_id, permission_id) VALUES (1134, 11, 341);

--############################################################
--# Removing company_vat_number from prm_company table
--############################################################

ALTER TABLE prm_company DROP COLUMN company_vat_number;

--############################################################
--# Renaming and altering payment_method 
--############################################################

ALTER TABLE payment_method RENAME TO payment_item;

--############################################################
--# Altering invoice table
--############################################################

ALTER TABLE invoice RENAME COLUMN invoice_status TO payment_status;
ALTER TABLE invoice ADD COLUMN verification_status VARCHAR(64);

--############################################################
--# Creating payment_method table
--############################################################

CREATE TABLE IF NOT EXISTS payment_method (
	id					SERIAL PRIMARY KEY,
	payment_item_id		INT CONSTRAINT payment_method_payment_item_fk REFERENCES payment_item (id),
	type				VARCHAR(128),
	created_at			DATE NOT NULL DEFAULT CURRENT_DATE
);

--############################################################
--# Creating payment_method_name table
--############################################################

CREATE TABLE IF NOT EXISTS payment_method_name (
	id						SERIAL PRIMARY KEY,
	payment_method_id		INT CONSTRAINT payment_method_name_payment_method_fk REFERENCES payment_method (id),
	language				VARCHAR(8),
	text					VARCHAR(128),
	created_at				DATE NOT NULL DEFAULT CURRENT_DATE
);

--############################################################
--# Creating appointments_label table
--############################################################

CREATE TABLE IF NOT EXISTS appointments_label (
	id					SERIAL PRIMARY KEY,
	appointment_id		INT CONSTRAINT appointments_appointments_label_fk REFERENCES appointments (id),
	type				VARCHAR(64),
	color				VARCHAR(64),
	created_at			DATE NOT NULL DEFAULT CURRENT_DATE
);

--############################################################
--# Altering invoice table
--############################################################

ALTER TABLE invoice ADD COLUMN payment_item_id INT
CONSTRAINT invoice_payment_item_fk REFERENCES payment_item (id);

--############################################################
--# Creating appointments_label_name table
--############################################################

CREATE TABLE IF NOT EXISTS appointments_label_name (
	id						SERIAL PRIMARY KEY,
	appointment_label_id	INT CONSTRAINT appointments_label_name_appointments_label_fk REFERENCES appointments_label (id),
	language				VARCHAR(8),
	text					VARCHAR(128),
	created_at				DATE NOT NULL DEFAULT CURRENT_DATE
);

--############################################################
--# Altering appoitments table
--############################################################

ALTER TABLE appointments
ADD COLUMN patient_attended BOOLEAN,
ADD COLUMN appointment_canceled_in_advance_by_clinic BOOLEAN DEFAULT 'f',
ADD COLUMN appointment_canceled_in_advance_by_patient BOOLEAN DEFAULT 'f';

--############################################################
--# Linking prm_product_group to appointments table
--############################################################

ALTER TABLE appointments ADD COLUMN product_group_id INT
CONSTRAINT appointments_prm_product_group_fk REFERENCES prm_product_group (product_group_id);

--############################################################
--# Adding 'first_name' and 'surname' columns to table
--# 'users' and filling them with values
--############################################################

ALTER TABLE users
ADD COLUMN first_name VARCHAR(128),
ADD COLUMN surname VARCHAR(128);

UPDATE users SET first_name = 'Emazing', surname = 'General' WHERE id = 4;
UPDATE users SET first_name = 'Valerija', surname = 'Fabjan' WHERE id = 7;
UPDATE users SET first_name = 'Gašper', surname = 'Fabjan' WHERE id = 13;
UPDATE users SET first_name = 'Amadej', surname = 'Lah' WHERE id = 17;
UPDATE users SET first_name = 'Andreja', surname = 'Kraševec' WHERE id = 18;
UPDATE users SET first_name = 'Rok', surname = 'Kržič' WHERE id = 24;
UPDATE users SET first_name = 'Matic', surname = 'Fabjan' WHERE id = 27;
UPDATE users SET first_name = 'Živa', surname = 'Fabjan' WHERE id = 28;
UPDATE users SET first_name = 'Marjan', surname = 'Fabjan' WHERE id = 29;
UPDATE users SET first_name = 'Mirjana', surname = 'Tavčar' WHERE id = 39;
UPDATE users SET first_name = 'Živa', surname = 'Fabjan' WHERE id = 50;
UPDATE users SET first_name = 'Tina', surname = 'Fabjan' WHERE id = 78;
UPDATE users SET first_name = 'Rene', surname = 'Male' WHERE id = 102;
UPDATE users SET first_name = 'Jasna', surname = 'Bordon' WHERE id = 130;
UPDATE users SET first_name = 'Zora', surname = 'Fabjan' WHERE id = 133;
UPDATE users SET first_name = 'Matej', surname = 'Lavrič' WHERE id = 137;
UPDATE users SET first_name = 'Manca', surname = 'Jeglič' WHERE id = 140;
UPDATE users SET first_name = 'Alen', surname = 'Dedić' WHERE id = 143;
UPDATE users SET first_name = 'Uroš', surname = 'Krmac' WHERE id = 147;
UPDATE users SET first_name = 'Gaja', surname = 'Bužan' WHERE id = 148;
UPDATE users SET first_name = 'Lea', surname = 'Žgur' WHERE id = 149;
UPDATE users SET first_name = 'Sestra', surname = 'Primadent' WHERE id = 150;
UPDATE users SET first_name = 'SuperSestra', surname = 'Primadent' WHERE id = 151;
UPDATE users SET first_name = 'Emazing', surname = 'Demo' WHERE id = 152;
UPDATE users SET first_name = 'Tomaž', surname = 'Lukanovič' WHERE id = 153;
UPDATE users SET first_name = 'Špela', surname = 'Rangus' WHERE id = 154;
UPDATE users SET first_name = 'Polona', surname = 'Šter' WHERE id = 155;
UPDATE users SET first_name = 'Gašper', surname = 'Fortuna' WHERE id = 156;
UPDATE users SET first_name = 'Žiga', surname = 'Kovačič' WHERE id = 157;

--############################################################
--# Dropping NOT NULL CONSTRAINT in table prm_product, field
--# field product_price, adding "advance payment" to prm_product
--############################################################

ALTER TABLE prm_product ALTER COLUMN product_price DROP NOT NULL;
INSERT INTO prm_product (product_type_id, product_group_id) VALUES (1, 2);
INSERT INTO prm_product_name (product_id, language, text) VALUES 
(659, 'sl', 'Avansni račun'), (659, 'en', 'Advance payment'), (659, 'it', 'Pagamento anticipato');

--############################################################
--# Updating business_premise_id in prm_company_premise and
--# electronic_device_id in prm_company_premise_device
--############################################################

UPDATE prm_company_premise SET business_premise_id = '5' WHERE premise_id = 5;
UPDATE prm_company_premise SET business_premise_id = '2' WHERE premise_id = 2;
UPDATE prm_company_premise SET business_premise_id = '3' WHERE premise_id = 3;
UPDATE prm_company_premise SET business_premise_id = '4' WHERE premise_id = 4;
UPDATE prm_company_premise SET business_premise_id = '1' WHERE premise_id = 1;

UPDATE prm_company_premise_device SET electronic_device_id = '1' WHERE device_id = 4;
UPDATE prm_company_premise_device SET electronic_device_id = '1' WHERE device_id = 1;
UPDATE prm_company_premise_device SET electronic_device_id = '2' WHERE device_id = 2;
UPDATE prm_company_premise_device SET electronic_device_id = '3' WHERE device_id = 3;

--############################################################
--# Adding columns to invoice table
--############################################################

ALTER TABLE invoice
ADD COLUMN invoice_number_furs VARCHAR(16),
ADD COLUMN reference_code VARCHAR(64),
ADD COLUMN reference_code_furs VARCHAR(64);

--############################################################
--# Updating users data
--############################################################

UPDATE users SET title = 'Dr.', specialization = 'dr. med., spec. spl. krg.' WHERE id = 17;
UPDATE users SET title = 'Dr.' WHERE id = 27;
UPDATE users SET title = 'Dr.', specialization = 'dr. med., spec. plast.' WHERE id = 28;
UPDATE users SET title = 'Dr.', specialization = 'dr. med., spec. plast.' WHERE id = 29;
UPDATE users SET first_name = 'Mojca', surname = 'Arnuga Erjavec' WHERE id = 30;
UPDATE users SET first_name = 'Tanja', surname = '(Fabjan)' WHERE id = 51;
UPDATE users SET title = 'Dr.', specialization = 'dr.med., spec.gin.por.', first_name = 'Mariusz', surname = 'Kosi' WHERE id = 62;
UPDATE users SET first_name = 'Mateja', surname = 'Mlinarič' WHERE id = 98;
UPDATE users SET title = 'Dr.', first_name = 'Miloš', surname = 'Petrović' WHERE id = 103;
UPDATE users SET title = 'Dr.', specialization = 'dr. med., spec. plast.', first_name = 'Viljem', surname = 'Topćić' WHERE id = 104;
UPDATE users SET title = 'Dr.', first_name = 'Tamara', surname = 'Levičnik' WHERE id = 105;
UPDATE users SET title = 'Dr.', first_name = 'Gregor', surname = 'Hvalc' WHERE id = 106;
UPDATE users SET title = 'Dr.', specialization = 'dr. med., spec. rentgenolog', first_name = 'Andreja', surname = 'Bohnec' WHERE id = 107;
UPDATE users SET title = 'Dr.', specialization = 'dr.med., spec.gin.por.', first_name = 'Jernej', surname = 'Bernik' WHERE id = 108;
UPDATE users SET first_name = 'Rebeka', surname = 'Celje - Medical' WHERE id = 110;
UPDATE users SET first_name = 'Suzana', surname = 'Pohar' WHERE id = 119;
UPDATE users SET first_name = 'Zobna', surname = 'Šenčur - Fabjan' WHERE id = 120;
UPDATE users SET title = 'Dr.', specialization = 'dr. med. spec. ginek.', first_name = 'Suzana', surname = 'Peternelj' WHERE id = 121;
UPDATE users SET first_name = 'Dermatologija', surname = 'Rogl-Fabjan' WHERE id = 125;
UPDATE users SET title = 'Dr.', specialization = 'dr. med., spec. radiolog', first_name = 'Mitja', surname = 'Četina' WHERE id = 126;
UPDATE users SET first_name = 'Jana', surname = 'Lieber' WHERE id = 129;
UPDATE users SET title = 'Dr.', specialization = 'dr. med., spec. plast. krg.', first_name = 'Rok', surname = 'Pavlič' WHERE id = 136;
UPDATE users SET title = 'Dr.', specialization = 'dr. med., spec. spl. krg.' WHERE id = 137;

--############################################################
--# adding parent_id and child_id fields to invoice
--############################################################

ALTER TABLE invoice ADD COLUMN parent_id INT REFERENCES invoice (invoice_id);
ALTER TABLE invoice ADD COLUMN child_id INT REFERENCES invoice (invoice_id);

--############################################################
--# Adding paid boolean field to payment_item table
--############################################################

ALTER TABLE payment_item ADD COLUMN paid BOOLEAN DEFAULT 'f';

--############################################################
--# Creating invoice_payment table
--############################################################

CREATE TABLE IF NOT EXISTS invoice_payment (
	id						SERIAL PRIMARY KEY,
	invoice_id				INT CONSTRAINT invoice_payment_invoice_fk REFERENCES invoice (invoice_id),
	advance_payment_id		INT CONSTRAINT invoice_payment_advance_payment_fk REFERENCES invoice (invoice_id),
	payment_type			VARCHAR(128),
	amount					NUMERIC(8,2),
	created_at				DATE NOT NULL DEFAULT CURRENT_DATE
);

--############################################################
--# Altering appointments table
--############################################################

ALTER TABLE appointments 
ALTER COLUMN patient_attended TYPE VARCHAR(32),
ADD COLUMN hours INT,
ADD COLUMN minutes INT;

--############################################################
--# Altering invoice table
--############################################################

ALTER TABLE invoice
ADD COLUMN service_date DATE DEFAULT CURRENT_DATE,
ADD COLUMN due_date DATE DEFAULT CURRENT DATE;

--############################################################
--# Altering payment_item table
--############################################################

ALTER TABLE payment_item
ADD COLUMN due_date DATE,
ADD COLUMN payment_date DATE;

--############################################################
--# Adding prm_client_id to users
--############################################################

UPDATE users SET prm_client_id = 1 
WHERE id IN (7, 13, 17, 18, 24, 27, 28, 29, 39, 50, 78, 102, 130, 133, 137, 140, 143, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157);

--############################################################
--# Altering users table
--############################################################

ALTER TABLE users ADD COLUMN position VARCHAR(128);

--############################################################
--# Giving role "administrator" permission to see patients
--############################################################

INSERT INTO prm_role_permission (role_permission_id, role_id, permission_id) VALUES (304, 3, 42);

--############################################################
--# Altering locations table
--############################################################

UPDATE locations SET prm_client_id = NULL WHERE id != 77;

UPDATE db_version SET version ='01.17', version_date=CURRENT_DATE WHERE resource='Tables';


COMMIT;
