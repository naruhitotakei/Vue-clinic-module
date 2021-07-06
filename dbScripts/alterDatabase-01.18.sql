--############################################################
--# Arranging users data for Primadent
--############################################################

UPDATE users SET prm_client_id = NULL WHERE id IN (7, 13, 17, 18, 24, 27, 28, 29, 50, 78, 102, 133, 137, 143, 155);

INSERT INTO users (name, email, prm_role_id, prm_client_id, first_name, surname, prm_password_hash) VALUES
('Barbara Hrga', 'barbara.hrga@primadent.si', 9, 1, 'Barbara', 'Hrga', '$2b$12$zHk/lqjgGOaYmzWU9Gtw1usL7oSFp7up91PvgmNdp/dzJ7mWS8wha'),
('Ivana Matošević', 'ivana.matosevic@primadent.si', 9, 1, 'Ivana', 'Matošević', '$2b$12$zHk/lqjgGOaYmzWU9Gtw1usL7oSFp7up91PvgmNdp/dzJ7mWS8wha'),
('Tina Grmek', 'tina.grmek@primadent.si', 3, 1, 'Tina', 'Grmek', '$2b$12$zHk/lqjgGOaYmzWU9Gtw1usL7oSFp7up91PvgmNdp/dzJ7mWS8wha'),
('Aleksandra Jerman', 'aleksandra.jerman@primadent.si', 8, 1, 'Aleksandra', 'Jerman', '$2b$12$zHk/lqjgGOaYmzWU9Gtw1usL7oSFp7up91PvgmNdp/dzJ7mWS8wha'),
('Alen Pugelj', 'alen.pugelj@primadent.si', 8, 1, 'Alen', 'Pugelj', '$2b$12$zHk/lqjgGOaYmzWU9Gtw1usL7oSFp7up91PvgmNdp/dzJ7mWS8wha'),
('Ivana Nikolić', 'ivana.nikolic@primadent.si', 8, 1, 'Ivana', 'Nikolić', '$2b$12$zHk/lqjgGOaYmzWU9Gtw1usL7oSFp7up91PvgmNdp/dzJ7mWS8wha');

INSERT INTO users (name, email, prm_role_id, first_name, surname, prm_password_hash) VALUES
('Stela Dolinšek', 'stela.dolinsek@primadent.si', 3, 'Stela', 'Dolinšek', '$2b$12$zHk/lqjgGOaYmzWU9Gtw1usL7oSFp7up91PvgmNdp/dzJ7mWS8wha'),
('Ksenija Žunić', 'ksenija.zunic@primadent.si', 9, 'Ksenija', 'Žunić', '$2b$12$zHk/lqjgGOaYmzWU9Gtw1usL7oSFp7up91PvgmNdp/dzJ7mWS8wha'),
('Mateja Mijač', 'mateja.mijac@primadent.si', 8, 'Mateja', 'Mijač', '$2b$12$zHk/lqjgGOaYmzWU9Gtw1usL7oSFp7up91PvgmNdp/dzJ7mWS8wha'),
('Jana Strgar', 'jana.strgar@primadent.si', 9, 'Jana', 'Strgar', '$2b$12$zHk/lqjgGOaYmzWU9Gtw1usL7oSFp7up91PvgmNdp/dzJ7mWS8wha');

INSERT INTO users (name, email, prm_role_id, first_name, surname, title, specialization, function, prm_password_hash) VALUES
('Eneja Lukanović', 'eneja.lukanovic@primadent.si', 6, 'Eneja', 'Lukanović', 'Dr.', 'dr. dent. med.', '{dentist}', '$2b$12$zHk/lqjgGOaYmzWU9Gtw1usL7oSFp7up91PvgmNdp/dzJ7mWS8wha'),
('Primož Arko', 'primoz.arko@primadent.si', 6, 'Primož', 'Arko', 'Dr.', 'dr. dent. med.', '{dentist}', '$2b$12$zHk/lqjgGOaYmzWU9Gtw1usL7oSFp7up91PvgmNdp/dzJ7mWS8wha');

UPDATE users SET prm_role_id = 7 WHERE id = 39;
UPDATE users SET email = 'gaja.buzan@primadent.si', prm_password_hash = '$2b$12$zHk/lqjgGOaYmzWU9Gtw1usL7oSFp7up91PvgmNdp/dzJ7mWS8wha', prm_role_id = 6 WHERE id = 148;
UPDATE users SET email = 'lea.zgur@primadent.si', prm_role_id = 6, prm_password_hash = '$2b$12$zHk/lqjgGOaYmzWU9Gtw1usL7oSFp7up91PvgmNdp/dzJ7mWS8wha' WHERE id = 149;
UPDATE users SET prm_role_id = 7, prm_password_hash = '$2b$12$zHk/lqjgGOaYmzWU9Gtw1usL7oSFp7up91PvgmNdp/dzJ7mWS8wha' WHERE id = 153;
UPDATE users SET prm_role_id = 6, prm_password_hash = '$2b$12$zHk/lqjgGOaYmzWU9Gtw1usL7oSFp7up91PvgmNdp/dzJ7mWS8wha' WHERE id = 156;
UPDATE users SET prm_role_id = 6, prm_password_hash = '$2b$12$zHk/lqjgGOaYmzWU9Gtw1usL7oSFp7up91PvgmNdp/dzJ7mWS8wha' WHERE id = 157;
UPDATE users SET prm_role_id = 5 WHERE id = 130;
UPDATE users SET prm_role_id = 4 WHERE id = 140;

UPDATE users SET prm_client_id = NULL WHERE id IN (1, 53, 130, 140, 150, 151, 153, 154, 157);

UPDATE users SET function = NULL WHERE id IN (78, 102, 154, 155);

--############################################################
--# Adding prm_client FK to enquiry table
--############################################################

ALTER TABLE enquiries ADD COLUMN prm_client_id INT
CONSTRAINT enquiries_prm_client_fk REFERENCES prm_client (id);

--############################################################
--# Adding next_visit and last_visit fields to enquiry table
--############################################################

ALTER TABLE enquiries
ADD COLUMN last_visit DATE,
ADD COLUMN next_visit DATE;

--############################################################
--# Assigning enquiries their proper prm_client_id
--############################################################

UPDATE enquiries SET prm_client_id = 1 WHERE client_id IN (10, 23);

--############################################################
--# adding ON DELETE CASCADE constraints
--############################################################

ALTER TABLE payment_item
DROP CONSTRAINT payment_method_invoice_fk,
ADD CONSTRAINT payment_item_invoice_id_fk 
FOREIGN KEY (invoice_id)
REFERENCES invoice (invoice_id) ON DELETE CASCADE;

ALTER TABLE invoice_item
DROP CONSTRAINT invoice_item_invoice_fk,
ADD CONSTRAINT invoice_item_invoice_id_fk
FOREIGN KEY (invoice_id)
REFERENCES invoice (invoice_id) ON DELETE CASCADE;

--############################################################
--# update version
--############################################################

UPDATE db_version SET version ='01.18', version_date=CURRENT_DATE WHERE resource='Tables';


COMMIT;