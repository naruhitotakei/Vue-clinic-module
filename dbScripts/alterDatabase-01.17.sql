--############################################################
--# filling table clients_prm_client_bridge with values
--############################################################

INSERT INTO clients_prm_client_bridge (clients_id, prm_client_id) VALUES 
(10, 1), (23, 1), (27,1), (25, 2), (30, 2), (21, 2), (28, 2), (22, 2), (1, 2), (5, 2), (19, 2);

--############################################################
--# changing company_id in prm_company to SERIAL
--############################################################

CREATE SEQUENCE prm_company_company_id_seq MINVALUE 8;
ALTER TABLE prm_company ALTER COLUMN company_id SET DEFAULT nextval('prm_company_premise_premise_id_seq');
ALTER SEQUENCE prm_company_company_id_seq OWNED BY prm_company.company_id;

--############################################################
--# changing foreign keys in invoice_item to INT type
--############################################################

ALTER TABLE invoice_item ALTER COLUMN invoice_id TYPE INT;
ALTER TABLE invoice_item ALTER COLUMN product_id TYPE INT;

--############################################################
--# changing foreign keys in prm tables to INT type
--############################################################

ALTER TABLE prm_product ALTER COLUMN product_type_id TYPE INT;
ALTER TABLE prm_product ALTER COLUMN product_group_id TYPE INT;

ALTER TABLE prm_product_group ALTER COLUMN category_id TYPE INT;

ALTER TABLE prm_product_category_name ALTER COLUMN category_id TYPE INT;

ALTER TABLE prm_product_name ALTER COLUMN product_id TYPE INT;

ALTER TABLE prm_product_group_name ALTER COLUMN product_group_id TYPE INT;

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


UPDATE db_version SET version ='01.17', version_date=CURRENT_DATE WHERE resource='Tables';


COMMIT;
