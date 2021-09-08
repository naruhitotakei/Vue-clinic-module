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
--# Rearranging the appointments_label table
--############################################################

DELETE FROM appointments_label;

ALTER TABLE appointments_label DROP COLUMN appointment_id;
ALTER TABLE appointments_label ADD COLUMN prm_client_id INT
CONSTRAINT appointments_label_prm_client_fk REFERENCES prm_client (id);

ALTER TABLE appointments ADD COLUMN label_id INT
CONSTRAINT appointments_appointments_label_fk REFERENCES appointments_label (id);

INSERT INTO appointments_label (type, color, prm_client_id) VALUES 
('Default', '#64D6E8', 1), ('Label 1', '#F54E65', 1), ('Label 2', '#9E1729', 1),
('Label 3', '#148A9C', 1), ('Label 4','#E8C007', 1), ('Label 5', '#9E8205', 1);

--############################################################
--# Altering appointments table
--############################################################

ALTER TABLE appointments ADD COLUMN end_time VARCHAR(128);

--############################################################
--# Assigning Developer role to Emazing Demo user
--############################################################

UPDATE users SET prm_role_id = 11 WHERE id = 152;

--############################################################
--# Rearranging invoice table
--############################################################

ALTER TABLE invoice
DROP CONSTRAINT invoice_enquiries_fk,
ADD CONSTRAINT invoice_enquiries_fk 
FOREIGN KEY (id)
REFERENCES enquiries (id) ON DELETE CASCADE;

--############################################################
--# Inserting Slovenian towns in municipalities table
--############################################################

INSERT INTO regions (country_id, name) VALUES
(1, 'Goriška regija'),
(1, 'Primorsko-notranjska regija');

INSERT INTO municipalities (region_id, name) VALUES
(1, 'Apače'), (1, 'Beltinci'), (1, 'Cankova'), (1, 'Črešnovci'), (1, 'Dobrovnik'), (1, 'Gornja Radgona'), (1, 'Gornji Petrovci'), (1, 'Grad'),
(1, 'Hodoš'), (1, 'Kobilje'), (1, 'Križevci'), (1, 'Kuzma'), (1, 'Lendava'), (1, 'Ljutomer'), (1, 'Moravske Toplice'), (1, 'Murska Sobota'),
(1, 'Odranci'), (1, 'Puconci'), (1, 'Radenci'), (1, 'Razkrižje'), (1, 'Rogašovci'), (1, 'Sveti Jurij ob Ščanvovci'), (1, 'Šalovci'), (1, 'Tišina'),
(1, 'Turnišče'), (1, 'Velika Polana'), (1, 'Veržej'), (2, 'Benedikt'), (2, 'Cerkvenjak'), (2, 'Cirkulane'), (2, 'Destrnik'), (2, 'Dornava'),
(2, 'Duplek'), (2, 'Gorišnica'), (2, 'Hajdina'), (2, 'Hoče - Slivnica'), (2, 'Kidričevo'), (2, 'Kungota'), (2, 'Lenart'), (2, 'Lovrenc na Pohorju'),
(2, 'Majšperk'), (2, 'Makole'), (2, 'Maribor'), (2, 'Markovci'), (2, 'Oplotnica'), (2, 'Ormož'), (2, 'Pesnica'), (2, 'Podlehnik'), (2, 'Poljčane'),
(2, 'Ptuj'), (2, 'Rače - Fram'), (2, 'Ruše'), (2, 'Selnica ob Dravi'), (2, 'Slovenska Bistrica'), (2, 'Središče ob Dravi'), (2, 'Starše'),
(2, 'Sveta Ana'), (2, 'Sveta Trojica v Slov. goricah'), (2, 'Sveti Andraž v Slov. goricah'), (2, 'Sveti Tomaž'), (2, 'Šentilj'), (2, 'Trnovska vas'),
(2, 'Videm'), (2, 'Zavrč'), (2, 'Žetale'), (3, 'Črna na Koroškem'), (3, 'Dravograd'), (3, 'Mežica'), (3, 'Mislinja'), (3, 'Muta'),
(3, 'Podvelka'), (3, 'Prevalje'), (3, 'Radlje ob Dravi'), (3, 'Ravne na Koroškem'), (3, 'Ribnica na Pohorju'), (3, 'Slovenj Gradec'),
(3, 'Vuzenica'), (4, 'Braslovče'), (4, 'Celje'), (4, 'Dobje'), (4, 'Dobrna'), (4, 'Gornji Grad'), (4, 'Kozje'), (4, 'Laško'),
(4, 'Ljubno'), (4, 'Luče'), (4, 'Mozirje'), (4, 'Nazarje'), (4, 'Podčetrtek'), (4, 'Polzela'), (4, 'Rečica ob Savinji'),
(4, 'Rogaška Slatina'), (4, 'Rogatec'), (4, 'Slovenske Konjice'), (4, 'Solčava'), (4, 'Šentjur'), (4, 'Šmarje pri Jelšah'),
(4, 'Šmartno ob Paki'), (4, 'Šoštanj'), (4, 'Štore'), (4, 'Tabor'), (4, 'Velenje'), (4, 'Vitanje'), (4, 'Vojnik'),
(4, 'Vransko'), (4, 'Zreče'), (5, 'Hrastnik'), (5, 'Litija'), (5, 'Trbovlje'),(5, 'Zagorje ob Savi'), (6, 'Bistrica ob Sotli'),
(6, 'Brežice'), (6, 'Kostanjevica na Krki'), (6, 'Krško'), (6, 'Radeče'), (6, 'Sevnica'), (7, 'Črnomelj'), (7, 'Dolenjske Toplice'),
(7, 'Kočevje'), (7, 'Kostel'), (7, 'Loški Potok'), (7, 'Metlika'), (7, 'Mirna'), (7, 'Mirna Peč'), (7, 'Mokronog - Trebelno'),
(7, 'Novo mesto'), (7, 'Osilnica'), (7, 'Ribnica'), (7, 'Semič'), (7, 'Sodražica'), (7, 'Straža'), (7, 'Šentjernej'),
(7, 'Šentrupert'), (7, 'Škocjan'), (7, 'Šmarješke Toplice'), (7, 'Trebnje'), (7, 'Žužemberk'), (8, 'Borovnica'),
(8, 'Brezovica'), (8, 'Dobrepolje'), (8, 'Dobrova - Polhov Gradec'), (8, 'Dol pri Ljubljani'), (8, 'Domžale'),
(8, 'Grosuplje'), (8, 'Horjul'), (8, 'Ig'), (8, 'Ivančna Gorica'), (8, 'Kamnik'), (8, 'Komenda'), (8, 'Ljubljana'),
(8, 'Log - Dragomer'), (8, 'Logatec'), (8, 'Lukovica'), (8, 'Medvode'), (8, 'Mengeš'), (8, 'Moravče'),
(8, 'Škofljica'), (8, 'Šmartno pri Litiji'), (8, 'Trzin'), (8, 'Velike Lašče'), (8, 'Vodice'), (8, 'Vrhnika'), (9, 'Bled'),
(9, 'Bohinj'), (9, 'Cerklje na Gorenjskem'), (9, 'Gorenja vas - Poljane'), (9, 'Gorje'), (9, 'Jesenice'), (9, 'Jezersko'), (9, 'Kranj'),
(9, 'Kranjska Gora'), (9, 'Naklo'), (9, 'Preddvor'), (9, 'Radovljica'), (9, 'Šenčur'), (9, 'Škofja Loka'), (9, 'Tržič'), (9, 'Železniki'),
(9, 'Žiri'), (9, 'Žirovnica'), (10, 'Ankaran'), (10, 'Divača'), (10, 'Hrpelje - Kozina'), (10, 'Izola'), (10, 'Komen'), (10, 'Koper'),
(10, 'Piran'), (32, 'Ajdovščina'), (32, 'Bovec'), (32, 'Brda'), (32, 'Cerkno'), (32, 'Idrija'), (32, 'Kanal'), (32, 'Kobarid'), (32, 'Miren - Kostanjevica'),
(32, 'Nova Gorica'), (32, 'Renče - Vogrsko'), (32, 'Šempeter - Vrtojba'), (32, 'Tolmin'), (32, 'Vipava'), (33, 'Bloke'), 
(33, 'Cerknica'), (33, 'Ilirska Bistrica'), (33, 'Loška dolina'), (33, 'Pivka'), (33, 'Postojna');

--############################################################
--# Altering users table by adding entries prm_client_id
--############################################################

UPDATE users SET prm_client_id = 1 WHERE id IN (130, 140);

--############################################################
--# Altering appointments table
--############################################################

ALTER TABLE appointments
DROP COLUMN hours,
DROP COLUMN minutes;

--############################################################
--# Assigning prm_company_id to users for the purposes
--# of issuing invoices
--############################################################

UPDATE users SET prm_company_id = 1 WHERE id IN (39, 147, 148, 149, 151, 152, 156, 158, 159, 160, 161, 162, 163);

--############################################################
--# Removed invoice_numbering_structure from invoice table
--############################################################

ALTER TABLE invoice DROP COLUMN invoice_numbering_structure;

--############################################################
--# Naming appointment labels
--############################################################

INSERT INTO appointments_label_name (appointment_label_id, language, text) VALUES
(136, 'sl', 'Običajna'), (136, 'en', 'Default'), (136, 'it', 'Di solito'),
(137, 'sl', 'Oznaka 1'), (137, 'en', 'Label 1'), (137, 'it', 'Etichetta 1'),
(138, 'sl', 'Oznaka 2'), (138, 'en', 'Label 2'), (138, 'it', 'Etichetta 2'),
(139, 'sl', 'Oznaka 3'), (139, 'en', 'Label 3'), (139, 'it', 'Etichetta 3'),
(140, 'sl', 'Oznaka 4'), (140, 'en', 'Label 4'), (140, 'it', 'Etichetta 4'),
(141, 'sl', 'Oznaka 5'), (141, 'en', 'Label 5'), (141, 'it', 'Etichetta 5');

--############################################################
--# Adding prm_client_id column to appointment_slots table
--# and assigning proper prm_client_id to the slots
--############################################################

ALTER TABLE appointment_slots ADD COLUMN prm_client_id INT
CONSTRAINT appointment_slots_prm_client_fk REFERENCES prm_client (id);

UPDATE TABLE appointment_slots SET prm_client_id = 1 WHERE client_id IN (10, 23);

--############################################################
--# Adding starts_at and ends_at column to appointments table
--############################################################

ALTER TABLE appointments
ADD COLUMN starts_at TIMESTAMP,
ADD COLUMN ends_at TIMESTAMP;

--############################################################
--# update version
--############################################################

UPDATE db_version SET version ='01.18', version_date=CURRENT_DATE WHERE resource='Tables';


COMMIT;