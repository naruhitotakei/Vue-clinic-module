--############################################################
--# Adding prm_product_group_id FK to the products table
--# and adding values
--############################################################

ALTER TABLE products ADD COLUMN prm_product_group_id INT
CONSTRAINT products_prm_product_group_fk REFERENCES prm_product_group (product_group_id);

UPDATE products SET prm_product_group_id = (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0001') WHERE name = 'Zobne Luske';
UPDATE products SET prm_product_group_id = (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0001') WHERE name = 'Zobne luske';

UPDATE products SET prm_product_group_id = (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0002') WHERE products.group = 'Preventive care';

UPDATE products SET prm_product_group_id = (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0003') WHERE name = 'Ortodontija';

UPDATE products SET prm_product_group_id = (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0004') WHERE products.group = 'Dental surgery';

UPDATE products SET prm_product_group_id = (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0005') WHERE name = 'Endodontsko zdravljenje';
UPDATE products SET prm_product_group_id = (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0005') WHERE name = 'Endodontic treatment';

UPDATE products SET prm_product_group_id = (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0006') WHERE products.group = 'Oral diseas (paradontology)';

UPDATE products SET prm_product_group_id = (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0007') WHERE name = 'Zobozdravljenje';
UPDATE products SET prm_product_group_id = (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0007') WHERE name = 'Zalivka | Plomba';
UPDATE products SET prm_product_group_id = (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0007') WHERE name = 'Ekstrakcija zoba';
UPDATE products SET prm_product_group_id = (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0007') WHERE name = 'Aesthetic fillings';

UPDATE products SET prm_product_group_id = (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0008') WHERE products.group = 'Dental implants';

UPDATE products SET prm_product_group_id = (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0009') WHERE products.group = 'Fixed prosthetics (dental bridge, dental crowns)';

UPDATE products SET prm_product_group_id = (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0010') WHERE products.group = 'Preventive care';

UPDATE products SET prm_product_group_id = (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0011') WHERE products.group = 'Removable prosthetics';

UPDATE products SET prm_product_group_id = (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0012') WHERE products.group = 'Teeth Whitening';

UPDATE products SET prm_product_group_id = (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0015') WHERE name = 'Invisalign';

UPDATE products SET prm_product_group_id = (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0016') WHERE name = 'Zobna estetika';

INSERT INTO products (name, "group", category, client_id, fee, price_adjustment, fee_type) VALUES ('Slikanje', 'Image diagnostics', 'General dentistry', 10, 15.00, 0, 'RELATIVE');
INSERT INTO products (name, "group", category, client_id, fee, price_adjustment, fee_type) VALUES ('Slikanje', 'Image diagnostics', 'General dentistry', 23, 15.00, 0, 'RELATIVE');
INSERT INTO products (name, "group", category, client_id, fee, price_adjustment, fee_type) VALUES ('Slikanje', 'Image diagnostics', 'General dentistry', 27, 15.00, 0, 'RELATIVE');

UPDATE products SET prm_product_group_id = (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0013') WHERE products.group = 'Image diagnostics';

--############################################################
--# Adding doctor_id (FK to users.id) to appointment_slots
--############################################################

ALTER TABLE appointment_slots ADD COLUMN doctor_id INT
CONSTRAINT appointment_slots_users_fk REFERENCES users (id);

--############################################################
--# Creating tables online_booking_service, online_booking
--# _service_name, and bridges to users and prm_premise
--############################################################

CREATE TABLE IF NOT EXISTS online_booking_service (
	id						SERIAL PRIMARY KEY,
	default_duration		INT DEFAULT 30,
	default_online_price	NUMERIC(8,2),
	product_group_id		INT CONSTRAINT online_booking_service_prm_product_group_fk REFERENCES prm_product_group (product_group_id),
	service_code			VARCHAR(16),
	trashed					BOOLEAN DEFAULT 'f',
	created_at				DATE NOT NULL DEFAULT CURRENT_DATE,
	updated_at				DATE
);

CREATE TABLE IF NOT EXISTS online_booking_service_name (
   id							SERIAL PRIMARY KEY,
   online_booking_service_id	INT CONSTRAINT online_booking_service_name_online_booking_service_fk REFERENCES online_booking_service (id),
   language						VARCHAR(8),
   text							VARCHAR(256),
   created_at					DATE NOT NULL DEFAULT CURRENT_DATE,
   updated_at					DATE
);

CREATE TABLE IF NOT EXISTS online_booking_users_bridge (
    id						SERIAL PRIMARY KEY,
	online_booking_id       INT CONSTRAINT online_booking_users_bridge_online_booking_service_fk REFERENCES online_booking_service (id),
	doctor_id				INT CONSTRAINT online_booking_users_bridge_users_fk REFERENCES users (id),
    created_at				DATE NOT NULL DEFAULT CURRENT_DATE,
    updated_at				DATE
);

CREATE TABLE IF NOT EXISTS online_booking_premise_bridge (
    id						SERIAL PRIMARY KEY,
	online_booking_id       INT CONSTRAINT online_booking_premise_bridge_online_booking_service_fk REFERENCES online_booking_service (id),
	premise_id				INT CONSTRAINT online_booking_premise_bridge_prm_company_premise_fk REFERENCES prm_company_premise (premise_id),
	created_at				DATE NOT NULL DEFAULT CURRENT_DATE,
    updated_at				DATE
);

--############################################################
--# Filling out last_sign_in_at column in the users table
--############################################################

UPDATE users SET created_at = NOW() WHERE created_at IS NULL;
UPDATE users SET last_sign_in_at = created_at WHERE last_sign_in_at IS NULL;

--############################################################
--# Filling out data for online_booking_services for staging
--############################################################

INSERT INTO online_booking_service (default_online_price, product_group_id, service_code) VALUES 
(40.00, (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0007'), 'SC0001'), 
(30.00, (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0002'), 'SC0002'), 
(2000.00, (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0015'), 'SC0003'), 
(350.00, (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0012'), 'SC0004');

INSERT INTO online_booking_service_name (online_booking_service_id, language, text) VALUES
((SELECT id FROM online_booking_service WHERE service_code = 'SC0001'), 'sl', 'Zalivka'),
((SELECT id FROM online_booking_service WHERE service_code = 'SC0001'), 'en', 'Dental filling'),
((SELECT id FROM online_booking_service WHERE service_code = 'SC0002'), 'sl', 'Pregled'),
((SELECT id FROM online_booking_service WHERE service_code = 'SC0002'), 'en', 'Examination'),
((SELECT id FROM online_booking_service WHERE service_code = 'SC0003'), 'sl', 'Invisalign'),
((SELECT id FROM online_booking_service WHERE service_code = 'SC0003'), 'en', 'Invisalign'),
((SELECT id FROM online_booking_service WHERE service_code = 'SC0004'), 'sl', 'Beljenje zob'),
((SELECT id FROM online_booking_service WHERE service_code = 'SC0004'), 'en', 'Teeth whitening');

INSERT INTO online_booking_users_bridge (online_booking_id, doctor_id) VALUES
((SELECT id FROM online_booking_service WHERE service_code = 'SC0001'), (SELECT id FROM users WHERE email = 'mirjana.tavcar@siol.net')),
((SELECT id FROM online_booking_service WHERE service_code = 'SC0002'), (SELECT id FROM users WHERE email = 'mirjana.tavcar@siol.net')),
((SELECT id FROM online_booking_service WHERE service_code = 'SC0002'), (SELECT id FROM users WHERE email = 'lea.zgur@primadent.si')),
((SELECT id FROM online_booking_service WHERE service_code = 'SC0002'), (SELECT id FROM users WHERE email = 'gaja.buzan@primadent.si')),
((SELECT id FROM online_booking_service WHERE service_code = 'SC0003'), (SELECT id FROM users WHERE email = 'lea.zgur@primadent.si')),
((SELECT id FROM online_booking_service WHERE service_code = 'SC0004'), (SELECT id FROM users WHERE email = 'gaja.buzan@primadent.si'));

INSERT INTO online_booking_premise_bridge (online_booking_id, premise_id) VALUES
((SELECT id FROM online_booking_service WHERE service_code = 'SC0001'), (SELECT premise_id FROM prm_company_premise WHERE premise_name = 'Zobna ambulanta Primadent Škofije')),
((SELECT id FROM online_booking_service WHERE service_code = 'SC0001'), (SELECT premise_id FROM prm_company_premise WHERE premise_name = 'Zobna ambulanta Primadent Ljubljana')),
((SELECT id FROM online_booking_service WHERE service_code = 'SC0002'), (SELECT premise_id FROM prm_company_premise WHERE premise_name = 'Zobna ambulanta Primadent Ljubljana')),
((SELECT id FROM online_booking_service WHERE service_code = 'SC0002'), (SELECT premise_id FROM prm_company_premise WHERE premise_name = 'Zobna ambulanta Primadent Maribor')),
((SELECT id FROM online_booking_service WHERE service_code = 'SC0003'), (SELECT premise_id FROM prm_company_premise WHERE premise_name = 'Zobna ambulanta Primadent Maribor')),
((SELECT id FROM online_booking_service WHERE service_code = 'SC0003'), (SELECT premise_id FROM prm_company_premise WHERE premise_name = 'Zobna ambulanta Primadent Ljubljana')),
((SELECT id FROM online_booking_service WHERE service_code = 'SC0003'), (SELECT premise_id FROM prm_company_premise WHERE premise_name = 'Zobna ambulanta Primadent Škofije')),
((SELECT id FROM online_booking_service WHERE service_code = 'SC0004'), (SELECT premise_id FROM prm_company_premise WHERE premise_name = 'Zobna ambulanta Primadent Škofije'));

--############################################################
--# Creating location - prm_company_premise bridge table
--# and filling in data + adding FK prm_premise to appointments
--# table
--############################################################

CREATE TABLE IF NOT EXISTS locations_prm_company_premise_bridge (
    id						SERIAL PRIMARY KEY,
	location_id				INT CONSTRAINT locations_prm_company_premise_bridge_locations_fk REFERENCES locations (id),
	premise_id				INT CONSTRAINT locations_prm_company_premise_bridge_prm_company_premise_fk REFERENCES prm_company_premise (premise_id),
	created_at				DATE NOT NULL DEFAULT CURRENT_DATE,
    updated_at				DATE
);

INSERT INTO locations_prm_company_premise_bridge (location_id, premise_id) VALUES
((select id from locations where address = 'Cesta Zore Perello - Godina 1, 6000 Koper'), (select premise_id from prm_company_premise where premise_name = 'Zobna ambulanta Primadent Škofije')),
((select id from locations where address = 'Cesta Zore Perello - Godina 1, 6000 Koper Capodistria'), (select premise_id from prm_company_premise where premise_name = 'Zobna ambulanta Primadent Škofije')),
((SELECT id FROM locations WHERE city = 'Spodnje Škofije - Scoffie di Sotto' AND client_id = 10), (SELECT premise_id FROM prm_company_premise WHERE premise_name = 'Zobna ambulanta Primadent Škofije')),
((SELECT id FROM locations WHERE city = 'Spodnje Škofije - Scoffie di Sotto' AND client_id = 23), (SELECT premise_id FROM prm_company_premise WHERE premise_name = 'Zobna ambulanta Primadent Škofije'));

ALTER TABLE appointments ADD COLUMN premise_id INT 
CONSTRAINT appointments_prm_company_premise_fk REFERENCES prm_company_premise (premise_id);

--############################################################
--# Assigning login credentials to users
--############################################################

UPDATE users SET prm_password_hash = '$2b$12$zHk/lqjgGOaYmzWU9Gtw1usL7oSFp7up91PvgmNdp/dzJ7mWS8wha' WHERE prm_password_hash IS NULL;
UPDATE users SET prm_role_id = 11 WHERE email = 'info@emazing.si';
UPDATE users SET prm_role_id = 1 WHERE email = 'uros.krmac@gmail.com';
UPDATE users SET prm_role_id = 7 WHERE email = 'mirjana.tavcar@siol.net';
UPDATE users SET prm_client_id = (SELECT id FROM prm_client WHERE client_name = 'Primadent') WHERE prm_client_id IS NULL;
UPDATE users SET email = 'uros.krmac@primadent.si' WHERE email = 'uros.krmac@gmail.com';

--############################################################
--# Security for page settings/online-booking
--# 1. Manager 2. SuperCaller 3. SuperDoctor 4. Developer
--############################################################

INSERT INTO prm_permission (permission_id, resource_name, scope_id) VALUES (351, 'Online Booking', 1);
INSERT INTO prm_permission (permission_id, resource_name, scope_id) VALUES (352, 'Online Booking', 2);
INSERT INTO prm_permission (permission_id, resource_name, scope_id) VALUES (353, 'Online Booking', 3);
INSERT INTO prm_permission (permission_id, resource_name, scope_id) VALUES (354, 'Online Booking', 4);

INSERT INTO prm_role_permission (role_permission_id, role_id, permission_id) VALUES (135, 1, 352);
INSERT INTO prm_role_permission (role_permission_id, role_id, permission_id) VALUES (535, 5, 352);
INSERT INTO prm_role_permission (role_permission_id, role_id, permission_id) VALUES (735, 7, 352);
INSERT INTO prm_role_permission (role_permission_id, role_id, permission_id) VALUES (1135, 11, 351);

--############################################################
--# Updating users
--############################################################

UPDATE users SET title = 'Dr.', first_name = 'Gaja', surname = 'Bužan', email = 'gaja.buzan@primadent.si' WHERE email = 'gaja.buzan@gmail.com';
UPDATE users SET title = 'Dr.', first_name = 'Lea', surname = 'Žgur', email = 'lea.zgur@primadent.si' WHERE email = 'lea.zgur@gmail.com';

--############################################################
--# update version
--############################################################

UPDATE db_version SET version ='01.19', version_date=CURRENT_DATE WHERE resource='Tables';


COMMIT;