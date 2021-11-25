--############################################################
--# Arranging users data for Primadent
--############################################################

UPDATE users SET prm_client_id = NULL WHERE email IN ('valerija.fabjan@siol.net', 'fabjan.gasper@siol.net', 'amadej.lah@gmail.com', 'krasevecandreja@gmail.com', 
'rokkrzic@gmail.com', 'dr.matic@fabjan.si', 'dr.ziva.fabjan@gmail.com', 'marjan.fabjan@gmail.com', 'dr.ziva-fabjan@gmail.com', 
'info@medicalfabjan.si', 'info@renemale.com', 'zora.fabjan.crm@gmail.com', 'lavricmatej@yahoo.com', 'alen.dedic@emazing.si', 'polona.ster@primadent.si');

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

UPDATE users SET prm_role_id = 7 WHERE email = 'mirjana.tavcar@siol.net';
UPDATE users SET email = 'gaja.buzan@primadent.si', prm_password_hash = '$2b$12$zHk/lqjgGOaYmzWU9Gtw1usL7oSFp7up91PvgmNdp/dzJ7mWS8wha', prm_role_id = 6 WHERE email = 'gaja.buzan@primadent.si';
UPDATE users SET email = 'lea.zgur@primadent.si', prm_role_id = 6, prm_password_hash = '$2b$12$zHk/lqjgGOaYmzWU9Gtw1usL7oSFp7up91PvgmNdp/dzJ7mWS8wha' WHERE email = 'lea.zgur@primadent.si';
UPDATE users SET prm_role_id = 7, prm_password_hash = '$2b$12$zHk/lqjgGOaYmzWU9Gtw1usL7oSFp7up91PvgmNdp/dzJ7mWS8wha' WHERE email = 'tomaz.lukanovic@primadent.si';
UPDATE users SET prm_role_id = 6, prm_password_hash = '$2b$12$zHk/lqjgGOaYmzWU9Gtw1usL7oSFp7up91PvgmNdp/dzJ7mWS8wha' WHERE email = 'gasper.fortuna@primadent.si';
UPDATE users SET prm_role_id = 6, prm_password_hash = '$2b$12$zHk/lqjgGOaYmzWU9Gtw1usL7oSFp7up91PvgmNdp/dzJ7mWS8wha' WHERE email = 'ziga.kovacic@primadent.si';
UPDATE users SET prm_role_id = 5 WHERE email = 'jasna.bordon@emazing.si';
UPDATE users SET prm_role_id = 4 WHERE email = 'manca.jeglic@emazing.si';

UPDATE users SET function = NULL WHERE email IN ('info@medicalfabjan.si', 'info@renemale.com', 'spela.rangus@primadent.si', 'polona.ster@primadent.si');

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

UPDATE users SET prm_role_id = 11 WHERE email = 'demo@emazing.si';

--############################################################
--# Inserting Slovenian towns in municipalities table
--############################################################

INSERT INTO regions (country_id, name) VALUES
(1, 'Goriška regija'),
(1, 'Primorsko-notranjska regija');

INSERT INTO municipalities (region_id, name) VALUES
((SELECT id FROM regions WHERE name = 'Pomurska regija'), 'Apače'), ((SELECT id FROM regions WHERE name = 'Pomurska regija'), 'Beltinci'), ((SELECT id FROM regions WHERE name = 'Pomurska regija'), 'Cankova'), ((SELECT id FROM regions WHERE name = 'Pomurska regija'), 'Črešnovci'), ((SELECT id FROM regions WHERE name = 'Pomurska regija'), 'Dobrovnik'), ((SELECT id FROM regions WHERE name = 'Pomurska regija'), 'Gornja Radgona'), ((SELECT id FROM regions WHERE name = 'Pomurska regija'), 'Gornji Petrovci'), ((SELECT id FROM regions WHERE name = 'Pomurska regija'), 'Grad'),
((SELECT id FROM regions WHERE name = 'Pomurska regija'), 'Hodoš'), ((SELECT id FROM regions WHERE name = 'Pomurska regija'), 'Kobilje'), ((SELECT id FROM regions WHERE name = 'Pomurska regija'), 'Križevci'), ((SELECT id FROM regions WHERE name = 'Pomurska regija'), 'Kuzma'), ((SELECT id FROM regions WHERE name = 'Pomurska regija'), 'Lendava'), ((SELECT id FROM regions WHERE name = 'Pomurska regija'), 'Ljutomer'), ((SELECT id FROM regions WHERE name = 'Pomurska regija'), 'Moravske Toplice'), ((SELECT id FROM regions WHERE name = 'Pomurska regija'), 'Murska Sobota'),
((SELECT id FROM regions WHERE name = 'Pomurska regija'), 'Odranci'), ((SELECT id FROM regions WHERE name = 'Pomurska regija'), 'Puconci'), ((SELECT id FROM regions WHERE name = 'Pomurska regija'), 'Radenci'), ((SELECT id FROM regions WHERE name = 'Pomurska regija'), 'Razkrižje'), ((SELECT id FROM regions WHERE name = 'Pomurska regija'), 'Rogašovci'), ((SELECT id FROM regions WHERE name = 'Pomurska regija'), 'Sveti Jurij ob Ščanvovci'), ((SELECT id FROM regions WHERE name = 'Pomurska regija'), 'Šalovci'), ((SELECT id FROM regions WHERE name = 'Pomurska regija'), 'Tišina'),
((SELECT id FROM regions WHERE name = 'Pomurska regija'), 'Turnišče'), ((SELECT id FROM regions WHERE name = 'Pomurska regija'), 'Velika Polana'), ((SELECT id FROM regions WHERE name = 'Pomurska regija'), 'Veržej'), ((SELECT id FROM regions WHERE name = 'Podravska regija'), 'Benedikt'), ((SELECT id FROM regions WHERE name = 'Podravska regija'), 'Cerkvenjak'), ((SELECT id FROM regions WHERE name = 'Podravska regija'), 'Cirkulane'), ((SELECT id FROM regions WHERE name = 'Podravska regija'), 'Destrnik'), ((SELECT id FROM regions WHERE name = 'Podravska regija'), 'Dornava'),
((SELECT id FROM regions WHERE name = 'Podravska regija'), 'Duplek'), ((SELECT id FROM regions WHERE name = 'Podravska regija'), 'Gorišnica'), ((SELECT id FROM regions WHERE name = 'Podravska regija'), 'Hajdina'), ((SELECT id FROM regions WHERE name = 'Podravska regija'), 'Hoče - Slivnica'), ((SELECT id FROM regions WHERE name = 'Podravska regija'), 'Kidričevo'), ((SELECT id FROM regions WHERE name = 'Podravska regija'), 'Kungota'), ((SELECT id FROM regions WHERE name = 'Podravska regija'), 'Lenart'), ((SELECT id FROM regions WHERE name = 'Podravska regija'), 'Lovrenc na Pohorju'),
((SELECT id FROM regions WHERE name = 'Podravska regija'), 'Majšperk'), ((SELECT id FROM regions WHERE name = 'Podravska regija'), 'Makole'), ((SELECT id FROM regions WHERE name = 'Podravska regija'), 'Maribor'), ((SELECT id FROM regions WHERE name = 'Podravska regija'), 'Markovci'), ((SELECT id FROM regions WHERE name = 'Podravska regija'), 'Oplotnica'), ((SELECT id FROM regions WHERE name = 'Podravska regija'), 'Ormož'), ((SELECT id FROM regions WHERE name = 'Podravska regija'), 'Pesnica'), ((SELECT id FROM regions WHERE name = 'Podravska regija'), 'Podlehnik'), ((SELECT id FROM regions WHERE name = 'Podravska regija'), 'Poljčane'),
((SELECT id FROM regions WHERE name = 'Podravska regija'), 'Ptuj'), ((SELECT id FROM regions WHERE name = 'Podravska regija'), 'Rače - Fram'), ((SELECT id FROM regions WHERE name = 'Podravska regija'), 'Ruše'), ((SELECT id FROM regions WHERE name = 'Podravska regija'), 'Selnica ob Dravi'), ((SELECT id FROM regions WHERE name = 'Podravska regija'), 'Slovenska Bistrica'), ((SELECT id FROM regions WHERE name = 'Podravska regija'), 'Središče ob Dravi'), ((SELECT id FROM regions WHERE name = 'Podravska regija'), 'Starše'),
((SELECT id FROM regions WHERE name = 'Podravska regija'), 'Sveta Ana'), ((SELECT id FROM regions WHERE name = 'Podravska regija'), 'Sveta Trojica v Slov. goricah'), ((SELECT id FROM regions WHERE name = 'Podravska regija'), 'Sveti Andraž v Slov. goricah'), ((SELECT id FROM regions WHERE name = 'Podravska regija'), 'Sveti Tomaž'), ((SELECT id FROM regions WHERE name = 'Podravska regija'), 'Šentilj'), ((SELECT id FROM regions WHERE name = 'Podravska regija'), 'Trnovska vas'),
((SELECT id FROM regions WHERE name = 'Podravska regija'), 'Videm'), ((SELECT id FROM regions WHERE name = 'Podravska regija'), 'Zavrč'), ((SELECT id FROM regions WHERE name = 'Podravska regija'), 'Žetale'), ((SELECT id FROM regions WHERE name = 'Koroška regija'), 'Črna na Koroškem'), ((SELECT id FROM regions WHERE name = 'Koroška regija'), 'Dravograd'), ((SELECT id FROM regions WHERE name = 'Koroška regija'), 'Mežica'), ((SELECT id FROM regions WHERE name = 'Koroška regija'), 'Mislinja'), ((SELECT id FROM regions WHERE name = 'Koroška regija'), 'Muta'),
((SELECT id FROM regions WHERE name = 'Koroška regija'), 'Podvelka'), ((SELECT id FROM regions WHERE name = 'Koroška regija'), 'Prevalje'), ((SELECT id FROM regions WHERE name = 'Koroška regija'), 'Radlje ob Dravi'), ((SELECT id FROM regions WHERE name = 'Koroška regija'), 'Ravne na Koroškem'), ((SELECT id FROM regions WHERE name = 'Koroška regija'), 'Ribnica na Pohorju'), ((SELECT id FROM regions WHERE name = 'Koroška regija'), 'Slovenj Gradec'),
((SELECT id FROM regions WHERE name = 'Koroška regija'), 'Vuzenica'), ((SELECT id FROM regions WHERE name = 'Savinjska regija'), 'Braslovče'), ((SELECT id FROM regions WHERE name = 'Savinjska regija'), 'Celje'), ((SELECT id FROM regions WHERE name = 'Savinjska regija'), 'Dobje'), ((SELECT id FROM regions WHERE name = 'Savinjska regija'), 'Dobrna'), ((SELECT id FROM regions WHERE name = 'Savinjska regija'), 'Gornji Grad'), ((SELECT id FROM regions WHERE name = 'Savinjska regija'), 'Kozje'), ((SELECT id FROM regions WHERE name = 'Savinjska regija'), 'Laško'),
((SELECT id FROM regions WHERE name = 'Savinjska regija'), 'Ljubno'), ((SELECT id FROM regions WHERE name = 'Savinjska regija'), 'Luče'), ((SELECT id FROM regions WHERE name = 'Savinjska regija'), 'Mozirje'), ((SELECT id FROM regions WHERE name = 'Savinjska regija'), 'Nazarje'), ((SELECT id FROM regions WHERE name = 'Savinjska regija'), 'Podčetrtek'), ((SELECT id FROM regions WHERE name = 'Savinjska regija'), 'Polzela'), ((SELECT id FROM regions WHERE name = 'Savinjska regija'), 'Rečica ob Savinji'),
((SELECT id FROM regions WHERE name = 'Savinjska regija'), 'Rogaška Slatina'), ((SELECT id FROM regions WHERE name = 'Savinjska regija'), 'Rogatec'), ((SELECT id FROM regions WHERE name = 'Savinjska regija'), 'Slovenske Konjice'), ((SELECT id FROM regions WHERE name = 'Savinjska regija'), 'Solčava'), ((SELECT id FROM regions WHERE name = 'Savinjska regija'), 'Šentjur'), ((SELECT id FROM regions WHERE name = 'Savinjska regija'), 'Šmarje pri Jelšah'),
((SELECT id FROM regions WHERE name = 'Savinjska regija'), 'Šmartno ob Paki'), ((SELECT id FROM regions WHERE name = 'Savinjska regija'), 'Šoštanj'), ((SELECT id FROM regions WHERE name = 'Savinjska regija'), 'Štore'), ((SELECT id FROM regions WHERE name = 'Savinjska regija'), 'Tabor'), ((SELECT id FROM regions WHERE name = 'Savinjska regija'), 'Velenje'), ((SELECT id FROM regions WHERE name = 'Savinjska regija'), 'Vitanje'), ((SELECT id FROM regions WHERE name = 'Savinjska regija'), 'Vojnik'),
((SELECT id FROM regions WHERE name = 'Savinjska regija'), 'Vransko'), ((SELECT id FROM regions WHERE name = 'Savinjska regija'), 'Zreče'), ((SELECT id FROM regions WHERE name = 'Zasavska regija'), 'Hrastnik'), ((SELECT id FROM regions WHERE name = 'Zasavska regija'), 'Litija'), ((SELECT id FROM regions WHERE name = 'Zasavska regija'), 'Trbovlje'),((SELECT id FROM regions WHERE name = 'Zasavska regija'), 'Zagorje ob Savi'), ((SELECT id FROM regions WHERE name = 'Posavska regija'), 'Bistrica ob Sotli'),
((SELECT id FROM regions WHERE name = 'Posavska regija'), 'Brežice'), ((SELECT id FROM regions WHERE name = 'Posavska regija'), 'Kostanjevica na Krki'), ((SELECT id FROM regions WHERE name = 'Posavska regija'), 'Krško'), ((SELECT id FROM regions WHERE name = 'Posavska regija'), 'Radeče'), ((SELECT id FROM regions WHERE name = 'Posavska regija'), 'Sevnica'), ((SELECT id FROM regions WHERE name = 'Jugovzhodna Slovenija'), 'Črnomelj'), ((SELECT id FROM regions WHERE name = 'Jugovzhodna Slovenija'), 'Dolenjske Toplice'),
((SELECT id FROM regions WHERE name = 'Jugovzhodna Slovenija'), 'Kočevje'), ((SELECT id FROM regions WHERE name = 'Jugovzhodna Slovenija'), 'Kostel'), ((SELECT id FROM regions WHERE name = 'Jugovzhodna Slovenija'), 'Loški Potok'), ((SELECT id FROM regions WHERE name = 'Jugovzhodna Slovenija'), 'Metlika'), ((SELECT id FROM regions WHERE name = 'Jugovzhodna Slovenija'), 'Mirna'), ((SELECT id FROM regions WHERE name = 'Jugovzhodna Slovenija'), 'Mirna Peč'), ((SELECT id FROM regions WHERE name = 'Jugovzhodna Slovenija'), 'Mokronog - Trebelno'),
((SELECT id FROM regions WHERE name = 'Jugovzhodna Slovenija'), 'Novo mesto'), ((SELECT id FROM regions WHERE name = 'Jugovzhodna Slovenija'), 'Osilnica'), ((SELECT id FROM regions WHERE name = 'Jugovzhodna Slovenija'), 'Ribnica'), ((SELECT id FROM regions WHERE name = 'Jugovzhodna Slovenija'), 'Semič'), ((SELECT id FROM regions WHERE name = 'Jugovzhodna Slovenija'), 'Sodražica'), ((SELECT id FROM regions WHERE name = 'Jugovzhodna Slovenija'), 'Straža'), ((SELECT id FROM regions WHERE name = 'Jugovzhodna Slovenija'), 'Šentjernej'),
((SELECT id FROM regions WHERE name = 'Jugovzhodna Slovenija'), 'Šentrupert'), ((SELECT id FROM regions WHERE name = 'Jugovzhodna Slovenija'), 'Škocjan'), ((SELECT id FROM regions WHERE name = 'Jugovzhodna Slovenija'), 'Šmarješke Toplice'), ((SELECT id FROM regions WHERE name = 'Jugovzhodna Slovenija'), 'Trebnje'), ((SELECT id FROM regions WHERE name = 'Jugovzhodna Slovenija'), 'Žužemberk'), ((SELECT id FROM regions WHERE name = 'Osrednjeslovenska regija'), 'Borovnica'),
((SELECT id FROM regions WHERE name = 'Osrednjeslovenska regija'), 'Brezovica'), ((SELECT id FROM regions WHERE name = 'Osrednjeslovenska regija'), 'Dobrepolje'), ((SELECT id FROM regions WHERE name = 'Osrednjeslovenska regija'), 'Dobrova - Polhov Gradec'), ((SELECT id FROM regions WHERE name = 'Osrednjeslovenska regija'), 'Dol pri Ljubljani'), ((SELECT id FROM regions WHERE name = 'Osrednjeslovenska regija'), 'Domžale'),
((SELECT id FROM regions WHERE name = 'Osrednjeslovenska regija'), 'Grosuplje'), ((SELECT id FROM regions WHERE name = 'Osrednjeslovenska regija'), 'Horjul'), ((SELECT id FROM regions WHERE name = 'Osrednjeslovenska regija'), 'Ig'), ((SELECT id FROM regions WHERE name = 'Osrednjeslovenska regija'), 'Ivančna Gorica'), ((SELECT id FROM regions WHERE name = 'Osrednjeslovenska regija'), 'Kamnik'), ((SELECT id FROM regions WHERE name = 'Osrednjeslovenska regija'), 'Komenda'), ((SELECT id FROM regions WHERE name = 'Osrednjeslovenska regija'), 'Ljubljana'),
((SELECT id FROM regions WHERE name = 'Osrednjeslovenska regija'), 'Log - Dragomer'), ((SELECT id FROM regions WHERE name = 'Osrednjeslovenska regija'), 'Logatec'), ((SELECT id FROM regions WHERE name = 'Osrednjeslovenska regija'), 'Lukovica'), ((SELECT id FROM regions WHERE name = 'Osrednjeslovenska regija'), 'Medvode'), ((SELECT id FROM regions WHERE name = 'Osrednjeslovenska regija'), 'Mengeš'), ((SELECT id FROM regions WHERE name = 'Osrednjeslovenska regija'), 'Moravče'),
((SELECT id FROM regions WHERE name = 'Osrednjeslovenska regija'), 'Škofljica'), ((SELECT id FROM regions WHERE name = 'Osrednjeslovenska regija'), 'Šmartno pri Litiji'), ((SELECT id FROM regions WHERE name = 'Osrednjeslovenska regija'), 'Trzin'), ((SELECT id FROM regions WHERE name = 'Osrednjeslovenska regija'), 'Velike Lašče'), ((SELECT id FROM regions WHERE name = 'Osrednjeslovenska regija'), 'Vodice'), ((SELECT id FROM regions WHERE name = 'Osrednjeslovenska regija'), 'Vrhnika'), ((SELECT id FROM regions WHERE name = 'Gorenjska regija'), 'Bled'),
((SELECT id FROM regions WHERE name = 'Gorenjska regija'), 'Bohinj'), ((SELECT id FROM regions WHERE name = 'Gorenjska regija'), 'Cerklje na Gorenjskem'), ((SELECT id FROM regions WHERE name = 'Gorenjska regija'), 'Gorenja vas - Poljane'), ((SELECT id FROM regions WHERE name = 'Gorenjska regija'), 'Gorje'), ((SELECT id FROM regions WHERE name = 'Gorenjska regija'), 'Jesenice'), ((SELECT id FROM regions WHERE name = 'Gorenjska regija'), 'Jezersko'), ((SELECT id FROM regions WHERE name = 'Gorenjska regija'), 'Kranj'),
((SELECT id FROM regions WHERE name = 'Gorenjska regija'), 'Kranjska Gora'), ((SELECT id FROM regions WHERE name = 'Gorenjska regija'), 'Naklo'), ((SELECT id FROM regions WHERE name = 'Gorenjska regija'), 'Preddvor'), ((SELECT id FROM regions WHERE name = 'Gorenjska regija'), 'Radovljica'), ((SELECT id FROM regions WHERE name = 'Gorenjska regija'), 'Šenčur'), ((SELECT id FROM regions WHERE name = 'Gorenjska regija'), 'Škofja Loka'), ((SELECT id FROM regions WHERE name = 'Gorenjska regija'), 'Tržič'), ((SELECT id FROM regions WHERE name = 'Gorenjska regija'), 'Železniki'),
((SELECT id FROM regions WHERE name = 'Gorenjska regija'), 'Žiri'), ((SELECT id FROM regions WHERE name = 'Gorenjska regija'), 'Žirovnica'), ((SELECT id FROM regions WHERE name = 'Obalno-kraška regija'), 'Ankaran'), ((SELECT id FROM regions WHERE name = 'Obalno-kraška regija'), 'Divača'), ((SELECT id FROM regions WHERE name = 'Obalno-kraška regija'), 'Hrpelje - Kozina'), ((SELECT id FROM regions WHERE name = 'Obalno-kraška regija'), 'Izola'), ((SELECT id FROM regions WHERE name = 'Obalno-kraška regija'), 'Komen'), ((SELECT id FROM regions WHERE name = 'Obalno-kraška regija'), 'Koper'),
((SELECT id FROM regions WHERE name = 'Obalno-kraška regija'), 'Piran'), ((SELECT id FROM regions WHERE name = 'Goriška regija'), 'Ajdovščina'), ((SELECT id FROM regions WHERE name = 'Goriška regija'), 'Bovec'), ((SELECT id FROM regions WHERE name = 'Goriška regija'), 'Brda'), ((SELECT id FROM regions WHERE name = 'Goriška regija'), 'Cerkno'), ((SELECT id FROM regions WHERE name = 'Goriška regija'), 'Idrija'), ((SELECT id FROM regions WHERE name = 'Goriška regija'), 'Kanal'), ((SELECT id FROM regions WHERE name = 'Goriška regija'), 'Kobarid'), ((SELECT id FROM regions WHERE name = 'Goriška regija'), 'Miren - Kostanjevica'),
((SELECT id FROM regions WHERE name = 'Goriška regija'), 'Nova Gorica'), ((SELECT id FROM regions WHERE name = 'Goriška regija'), 'Renče - Vogrsko'), ((SELECT id FROM regions WHERE name = 'Goriška regija'), 'Šempeter - Vrtojba'), ((SELECT id FROM regions WHERE name = 'Goriška regija'), 'Tolmin'), ((SELECT id FROM regions WHERE name = 'Goriška regija'), 'Vipava'), ((SELECT id FROM regions WHERE name = 'Primorsko-notranjska regija'), 'Bloke'), 
((SELECT id FROM regions WHERE name = 'Primorsko-notranjska regija'), 'Cerknica'), ((SELECT id FROM regions WHERE name = 'Primorsko-notranjska regija'), 'Ilirska Bistrica'), ((SELECT id FROM regions WHERE name = 'Primorsko-notranjska regija'), 'Loška dolina'), ((SELECT id FROM regions WHERE name = 'Primorsko-notranjska regija'), 'Pivka'), ((SELECT id FROM regions WHERE name = 'Primorsko-notranjska regija'), 'Postojna');

--############################################################
--# Altering users table by adding entries prm_client_id
--############################################################

UPDATE users SET prm_client_id = 1 WHERE email IN ('jasna.bordon@emazing.si', 'manca.jeglic@emazing.si');

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

UPDATE users SET prm_company_id = (SELECT company_id FROM prm_company WHERE company_name = 'Primadent d.o.o.')  WHERE email IN ('mirjana.tavcar@siol.net', 'uros.krmac@primadent.si', 'gaja.buzan@primadent.si', 'lea.zgur@primadent.si', 
'SuperNursePrimadent@gmail.com', 'demo@emazing.si', 'gasper.fortuna@primadent.si', 'barbara.hrga@primadent.si', 
'ivana.matosevic@primadent.si', 'tina.grmek@primadent.si', 'aleksandra.jerman@primadent.si', 'alen.pugelj@primadent.si', 'ivana.nikolic@primadent.si');

--############################################################
--# Removed invoice_numbering_structure from invoice table
--############################################################

ALTER TABLE invoice DROP COLUMN invoice_numbering_structure;

--############################################################
--# Naming appointment labels
--############################################################

INSERT INTO appointments_label_name (appointment_label_id, language, text) VALUES
((SELECT id FROM appointments_label WHERE type = 'Default'), 'sl', 'Običajna'), ((SELECT id FROM appointments_label WHERE type = 'Default'), 'en', 'Default'), ((SELECT id FROM appointments_label WHERE type = 'Default'), 'it', 'Di solito'),
((SELECT id FROM appointments_label WHERE type = 'Label 1'), 'sl', 'Oznaka 1'), ((SELECT id FROM appointments_label WHERE type = 'Label 1'), 'en', 'Label 1'), ((SELECT id FROM appointments_label WHERE type = 'Label 1'), 'it', 'Etichetta 1'),
((SELECT id FROM appointments_label WHERE type = 'Label 2'), 'sl', 'Oznaka 2'), ((SELECT id FROM appointments_label WHERE type = 'Label 2'), 'en', 'Label 2'), ((SELECT id FROM appointments_label WHERE type = 'Label 2'), 'it', 'Etichetta 2'),
((SELECT id FROM appointments_label WHERE type = 'Label 3'), 'sl', 'Oznaka 3'), ((SELECT id FROM appointments_label WHERE type = 'Label 3'), 'en', 'Label 3'), ((SELECT id FROM appointments_label WHERE type = 'Label 3'), 'it', 'Etichetta 3'),
((SELECT id FROM appointments_label WHERE type = 'Label 4'), 'sl', 'Oznaka 4'), ((SELECT id FROM appointments_label WHERE type = 'Label 4'), 'en', 'Label 4'), ((SELECT id FROM appointments_label WHERE type = 'Label 4'), 'it', 'Etichetta 4'),
((SELECT id FROM appointments_label WHERE type = 'Label 5'), 'sl', 'Oznaka 5'), ((SELECT id FROM appointments_label WHERE type = 'Label 5'), 'en', 'Label 5'), ((SELECT id FROM appointments_label WHERE type = 'Label 5'), 'it', 'Etichetta 5');

--############################################################
--# Adding prm_client_id column to appointment_slots table
--# and assigning proper prm_client_id to the slots
--############################################################

ALTER TABLE appointment_slots ADD COLUMN prm_client_id INT
CONSTRAINT appointment_slots_prm_client_fk REFERENCES prm_client (id);

UPDATE appointment_slots SET prm_client_id = 1 WHERE client_id IN (10, 23);

--############################################################
--# Adding starts_at and ends_at column to appointments table
--# and transfering values from "date" and "time" to "starts_at"
--# whilst dropping "end_time" column
--############################################################

ALTER TABLE appointments
ADD COLUMN starts_at TIMESTAMP,
ADD COLUMN ends_at TIMESTAMP;

UPDATE appointments SET starts_at = date + cast(time as time) WHERE time IS NOT NULL AND date > CURRENT_DATE - INTERVAL '3 months';

ALTER TABLE appointments DROP COLUMN end_time;

--############################################################
--# Removing "last_visit" and "next_visit" columns from enquiries
--############################################################

ALTER TABLE enquiries 
DROP COLUMN last_visit,
DROP COLUMN next_visit;

--############################################################
--# settings "ends_at" to "starts_at" value + 15 minutes
--# in the appointments table
--############################################################

UPDATE appointments SET ends_at = starts_at + interval'15 minutes' WHERE ends_at IS NULL;

--############################################################
--# Filling in location and doctor_name in appointments
--# table where empty
--############################################################

UPDATE appointments SET location = 'Spodnje Škofije - Scoffie di Sotto' WHERE location IS NULL;
UPDATE appointments SET doctor_name = 'Mirjana Tavčar' WHERE doctor_name IS NULL;

--############################################################
--# Adding doctor_id (FK to users table) to appointments table
--# And filling in data
--############################################################

ALTER TABLE appointments ADD COLUMN doctor_id INT
CONSTRAINT appointments_users_fk REFERENCES users (id);

UPDATE appointments SET doctor_id = (SELECT id FROM users WHERE email = 'mirjana.tavcar@siol.net') WHERE doctor_name::text LIKE '%Tavčar%';
UPDATE appointments SET doctor_id = (SELECT id FROM users WHERE email = 'gaja.buzan@primadent.si') WHERE doctor_name::text LIKE '%Gaja%';
UPDATE appointments SET doctor_id = (SELECT id FROM users WHERE email = 'eneja.lukanovic@primadent.si') WHERE doctor_name::text LIKE '%Eneja%';
UPDATE appointments SET doctor_id = (SELECT id FROM users WHERE email = 'primoz.arko@primadent.si') WHERE doctor_name::text LIKE '%Arko%';
UPDATE appointments SET doctor_id = (SELECT id FROM users WHERE email = 'gasper.fortuna@primadent.si') WHERE doctor_name::text LIKE '%Fortuna%';
UPDATE appointments SET doctor_id = (SELECT id FROM users WHERE email = 'lea.zgur@primadent.si') WHERE doctor_name::text LIKE '%Žgur%';
UPDATE appointments SET doctor_id = (SELECT id FROM users WHERE email = 'ziga.kovacic@primadent.si') WHERE doctor_name::text LIKE '%Žiga%';
UPDATE appointments SET doctor_id = (SELECT id FROM users WHERE email = 'tomaz.lukanovic@primadent.si') WHERE doctor_name::text LIKE '%Tomaž%';

--############################################################
--# update version
--############################################################

UPDATE db_version SET version ='01.18', version_date=CURRENT_DATE WHERE resource='Tables';


COMMIT;