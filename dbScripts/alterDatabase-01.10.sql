--############################################################
--# Add category_code column to prm_product_category table and insert values
--############################################################

ALTER TABLE prm_product_category
ADD COLUMN category_code VARCHAR(8);

INSERT INTO prm_product_category (category_code, category_name) VALUES
('PC0001', 'Pregled'), ('PC0002', 'Lepotno Zobozdravstvo'), ('PC0003', 'Implantologija'),
('PC0004', 'Splošno zobozdravstvo'), ('PC0005', 'Preventivno zobozdravstvo'), ('PC0006', 'Slikovna diagnostika'), 
('PC0007', 'Farmakološka terapija'), ('PC0008', 'Ustna higiena');

--############################################################
--# Alter prm_product_group table and insert values
--############################################################

ALTER TABLE prm_product_group 
RENAME COLUMN product_group TO product_group_name;

ALTER TABLE prm_product_group
ADD COLUMN product_group_code VARCHAR(8);

INSERT INTO prm_product_group (product_group_code, product_group_name, category_id) VALUES ('PG0001', 'Zobne luske', 2);
INSERT INTO prm_product_group (product_group_code, product_group_name, category_id) VALUES ('PG0002', 'Pregled', 1);
INSERT INTO prm_product_group (product_group_code, product_group_name, category_id) VALUES ('PG0003', 'Ortodontija', 4);
INSERT INTO prm_product_group (product_group_code, product_group_name, category_id) VALUES ('PG0004', 'Oralna kirurgija', 4);
INSERT INTO prm_product_group (product_group_code, product_group_name, category_id) VALUES ('PG0005', 'Endodontsko zdravljenje', 4);
INSERT INTO prm_product_group (product_group_code, product_group_name, category_id) VALUES ('PG0006', 'Parodontologija', 4);
INSERT INTO prm_product_group (product_group_code, product_group_name, category_id) VALUES ('PG0007', 'Zobne bolezni', 4);
INSERT INTO prm_product_group (product_group_code, product_group_name, category_id) VALUES ('PG0008', 'Zobni vsadki', 3);
INSERT INTO prm_product_group (product_group_code, product_group_name, category_id) VALUES ('PG0009', 'Fiksna protetika', 4);
INSERT INTO prm_product_group (product_group_code, product_group_name, category_id) VALUES ('PG0010', 'Preventiva', 5);
INSERT INTO prm_product_group (product_group_code, product_group_name, category_id) VALUES ('PG0011', 'Snemna protetika', 4);
INSERT INTO prm_product_group (product_group_code, product_group_name, category_id) VALUES ('PG0012', 'Beljenje zob', 2);
INSERT INTO prm_product_group (product_group_code, product_group_name, category_id) VALUES ('PG0013', 'Slikovna diagnostika', 6);
INSERT INTO prm_product_group (product_group_code, product_group_name, category_id) VALUES ('PG0014', 'Zdravilo', 7);
INSERT INTO prm_product_group (product_group_code, product_group_name, category_id) VALUES ('PG0015', 'Invisalign', 2);
INSERT INTO prm_product_group (product_group_code, product_group_name, category_id) VALUES ('PG0016', 'Zobni nakit', 2);
INSERT INTO prm_product_group (product_group_code, product_group_name, category_id) VALUES ('PG0017', 'Ugriz', 4);
INSERT INTO prm_product_group (product_group_code, product_group_name, category_id) VALUES ('PG0018', 'Zobne ščetke', 8);
INSERT INTO prm_product_group (product_group_code, product_group_name, category_id) VALUES ('PG0019', 'Zobne nitke', 8);
INSERT INTO prm_product_group (product_group_code, product_group_name, category_id) VALUES ('PG0020', 'Medzobne ščetke', 8);
INSERT INTO prm_product_group (product_group_code, product_group_name, category_id) VALUES ('PG0021', 'Ustne vode', 8);
INSERT INTO prm_product_group (product_group_code, product_group_name, category_id) VALUES ('PG0022', 'Zobne paste', 8);

--############################################################
--# Alter prm_product_type table and insert values
--############################################################

ALTER TABLE prm_product_type 
RENAME COLUMN product_type TO product_type_name;

INSERT INTO prm_product_type (product_type_name) VALUES ('Service');
INSERT INTO prm_product_type (product_type_name) VALUES ('Product');


--############################################################
--# Alter prm_product table and insert values
--############################################################

ALTER TABLE prm_product DROP CONSTRAINT prm_product_product_group_id_key;
ALTER TABLE prm_product DROP CONSTRAINT prm_product_product_type_id_key;

ALTER TABLE prm_product 
ALTER COLUMN product_name TYPE VARCHAR(128),
ALTER COLUMN product_price TYPE NUMERIC(8,2),
ALTER COLUMN taxable_amount TYPE NUMERIC(8,2),
ALTER COLUMN tax_amount TYPE NUMERIC(8,2);

ALTER TABLE prm_product ADD COLUMN product_code VARCHAR(8);

INSERT INTO prm_product (product_type_id, product_group_id, product_code, product_name, product_price) VALUES
(1, 2, 'N001', 'Stomatološki pregled', 35.00),
(1, 2, 'N002', 'Kratek stomatološki pregled', 30.00),
(1, 2, 'N003', 'CRM pregled', 35.00),
(1, 10, 'N004', 'Odstranitev trdih in mehkih oblog po loku', 40.00),
(1, 10, 'N005', 'Peskanje po loku', 40.00),
(1, 7, 'N006', 'Erozija', 55.00),
(1, 7, 'N007', 'Zalivka po eni ploskvi', 65.00),
(1, 7, 'N008', 'Zalivka na dveh ploskvah', 75.00),
(1, 7, 'N009', 'Zalivka na treh ploskvah', 85.00),
(1, 7, 'N010', 'Dograditev zoba', 110.00),
(1, 7, 'N011', 'Koferdam', 20.00),
(1, 7, 'N012', 'Zalitje fisur', 30.00),
(1, 5, 'N013', 'Zdravljenje gangrene in polnitev po kanalu', 120.00),
(1, 5, 'N014', 'Ponovno zdravljenje po kanalu', 140.00),
(1, 7, 'N015', 'Zdravilo s provizorično plombo', 50.00),
(1, 7, 'N016', 'Direktno kritje pulpe', 20.00),
(1, 7, 'N017', 'Trepanacija pulpnega kanala', 35.00),
(1, 14, 'N018', 'Anestezija', 15.00),
(1, 7, 'N019', 'Ekstrakcija majavega zoba', 60.00),
(1, 7, 'N020', 'Ekstrakcija enokoreninskega zoba', 80.00),
(1, 7, 'N021', 'Ekstrakcija večkoreninskega zoba', 100.00),
(1, 7, 'N022', 'Kirurška ekstrakcija', 130.00),
(1, 7, 'N023', 'Izkles zoba', 240.00),
(1, 4, 'N024', 'Apikotomija ene korenine', 240.00),
(1, 4, 'N025', 'Apikotomija dveh korenin', 300.00),
(1, 4, 'N026', 'Apikotomija treh korenin', 360.00),
(1, 6, 'N027', 'Reženjska operacija kvadrant', 200.00),
(1, 6, 'N028', 'Podaljšanje klinične krone', 160.00),
(1, 6, 'N029', 'Paradontološko zdravljenje', 400.00),
(1, 6, 'N030', 'Paradontološko zdravljenje - laser', 500.00),
(1, 4, 'N031', 'Zaprti dvig sinusa', 250.00),
(1, 4, 'N032', 'Odprti dvig sinusa', 550.00),
(1, 4, 'N033', 'Manjša dograditev s kostnim nadomestkom', 150.00),
(1, 4, 'N034', 'Dograditev s kostnim nadomestkom in membrano', 300.00),
(1, 4, 'N035', 'Prosti kostni transplantat', 400.00),
(1, 4, 'N036', 'Vstavitev implantata', 800.00),
(1, 9, 'N037', 'Keramična prevleka', 500.00),
(1, 9, 'N038', 'Zirconijeva prevleka', 450.00),
(1, 9, 'N039', 'Zirconijev inlay', 425.00),
(1, 9, 'N040', 'Keramični inlay', 450.00),
(1, 9, 'N041', 'Kompozitni inlay', 350.00),
(1, 1, 'N042', 'Zirconijeva faseta', 425.00),
(1, 1, 'N043', 'Keramična faseta', 450.00),
(1, 1, 'N044', 'Kompozitna faseta', 350.00),
(1, 8, 'N045', 'Abutment + zirconijeva prevleka', 800.00),
(1, 8, 'N046', '4 implantati + zirconijev most', 8650.00),
(1, 8, 'N047', '5 implantanov + zirconijev most', 9800.00),
(1, 8, 'N048', '2 implantata + totalna proteza', 3900.00),
(1, 8, 'N049', '4 implantanti + totalna proteza', 5900.00),
(1, 8, 'N050', '2 implantata + 4 zirconijeve prevleke + parcialna proteza', 6700.00),
(1, 9, 'N051', 'Rdeča keramika po zobu', 60.00),
(1, 9, 'N052', 'FRC nazidek', 120.00),
(1, 9, 'N053', 'Zirkonijev nazidek', 150.00),
(1, 9, 'N054', 'Provizorična prevleka', 60.00),
(1, 9, 'N055', 'Demontaža po zobu', 30.00),
(1, 11, 'N056', 'Totalna proteza', 1250.00),
(1, 11, 'N057', 'Parcialna proteza z ulito bazo', 1700.00),
(1, 11, 'N058', 'Indirektna podložitev', 150.00),
(1, 11, 'N059', 'Direktna podložitev', 100.00),
(1, 11, 'N060', 'Osnovna reparatura', 80.00),
(1, 9, 'N061', 'Dodatni element', 35.00),
(1, 11, 'N062', 'Imediatna proteza', 350.00),
(1, 11, 'N063', 'Imediatna proteza z zaponami', 370.00),
(1, 11, 'N064', 'Žabica', 250.00),
(1, 11, 'N065', 'Vbrizgavanje hialurona 1 ml', 350.00),
(1, 12, 'N066', 'Beljenje zob brez šablon 3x15 min', 350.00),
(1, 12, 'N067', 'Beljenje zob + šablone', 450.00),
(1, 17, 'N068', 'Opornica', 170.00),
(1, 17, 'N069', 'Ščitnik', 170.00),
(1, 13, 'N070', 'Cbct 1', 45.00),
(1, 13, 'N071', 'Cbct 2', 80.00),
(1, 13, 'N072', 'Cbct 3', 100.00),
(1, 13, 'N073', 'Ortopan', 35.00),
(1, 13, 'N074', 'Rtg lokalno', 15.00),
(1, 10, 'N076', 'Higiena - opalescence', 20.00),
(1, 10, 'N077', 'Higiena - bluem', 15.00),
(1, 10, 'N078', 'Higiena - corega', 10.00),
(1, 10, 'N079', 'Optragate', 3.00),
(1, 10, 'N080', 'Zagozda', 2.00),
(1, 10, 'N081', 'Menjava teflona', 35.00),
(1, 8, 'N082', 'Vstavitev implanta, abutment zirconij prevleka', 1600.00),
(1, 9, 'N083', 'Odtis, funkcijska žlica, pregled', 120.00),
(1, 12, 'N084', 'Beljenje posameznega zoba', 100.00),
(1, 14, 'N086', 'Recept', 10.00),
(1, 14, 'N087', 'Viscostat', 2.00),
(1, 12, 'N088', 'Opalescence 16%', 30.00),
(1, 11, 'N089', 'Čiščenje kamna na protezi', 80.00),
(1, 6, 'N090', 'Kiretaža žepa po zobu', 30.00),
(1, 2, 'N091', 'Penali za nejavljeno odsotnost', 50.00),
(1, 14, 'N092', 'Voltfast 50 mg - 3x prašek', 3.00),
(1, 14, 'N093', 'Oki 80 mg granule - 2x prašek', 2.00),
(1, 14, 'N094', 'Augmentin 875/125mg', 15.00),
(1, 14, 'N095', 'Sumamed 500mg', 12.00),
(1, 14, 'N096', 'Amoksiklav 1000mg tbl', 20.00),
(1, 14, 'N097', 'Klimicin 300mg kaps', 12.00),
(1, 14, 'N098', 'GM ključ', 60.00),
(1, 3, 'N100', 'Pregled + odtis zobni aparat', 120.00),
(1, 15, 'N101', 'Opornica invisalign', 180.00),
(1, 3, 'N102', 'Snemna plošča', 450.00),
(1, 3, 'N103', 'Retencijska žička', 170.00),
(1, 3, 'N104', 'Retencijska žička - leplenje', 80.00),
(1, 3, 'N105', 'Beljenje 15 min', 60.00),
(1, 11, 'N106', 'Provizorij 1', 20.00),
(1, 11, 'N107', 'Provizorij 2', 12.00),
(1, 4, 'N108', 'Odstranitev šivov po zobu', 15.00),
(1, 11, 'N110', 'Začasni maryland most', 300.00),
(1, 8, 'N111', 'Individualni zirkonijev abutment', 280.00),
(1, 14, 'N112', 'Recept voltfast', 18.00),
(1, 6, 'N113', 'Zdravljenje dlesni', 50.00),
(1, 16, 'N114', 'Zobni nakit', 80.00),
(1, 2, 'N116', 'Materialni stroški', 100.00),
(1, 1, 'N117', 'Fasetiranje', 90.00),
(1, 9, 'N118', 'Cementiranje starih kron/lusk', 70.00),
(1, 9, 'N119', 'Brušenje zob (cena po zobu)', 100.00),
(1, 3, 'N120', 'Odstranjevanje fiksnega zobnega aparata (po zobu)', 10.00),
(1, 8, 'N121', '6 implantov + zirconijev most', 10900.00),
(1, 4, 'N122', 'Incizija', 25.00),
(1, 8, 'N123', 'Vstavitev strauman implantata, abutment, zirconijeva prevleka', 1930.00),
(1, 8, 'N124', 'Strauman abutment + zirconijeva prevleka', 930.00),
(1, 8, 'N125', 'Vstavitev strauman implantata', 1000.00),
(1, 8, 'N126', 'Strauman ind abutment + zirconijeva prevleka', 1400.00),
(1, 9, 'N127', 'Cirkonijeva prevleka + e-max', 600.00),
(1, 14, 'N128', 'Zaustavitev krvavitve', 70.00),
(1, 8, 'N129', 'Strauman implantat zirconij', 2875.00),
(1, 7, 'N130', 'Terapija z laserjem', 25.00),
(1, 7, 'N131', 'Terapija (sulcusa) z laserjem', 10.00),
(1, 10, 'N132', 'Test Covid - 19', 25.00),
(1, 8, 'N133', 'Provizorij na implantantu', 85.00),
(1, 14, 'N134', 'Oki prašek - 30 vrečk', 18.00),
(1, 8, 'N135', '4 implantanti + kompozitni most', 6900.00),
(1, 8, 'N136', '5 implantov + kompozitni most', 7750.00),
(1, 8, 'N137', '6 implantov + kompozitni most', 8550.00),
(1, 13, 'Q0002', 'Diapozitivi v ortodontiji', 1.00),
(1, 13, 'Q0003', 'Ortod. konf. elem.- vratni teg', 2.00),
(1, 13, 'Q0004', 'Ortod. konf. elem.- obrazni lok', 3.00),
(1, 13, 'ZLAB01', '3D funkcijska žlica', 35.00),
(1, 13, 'ZLAB02', '3D printan krn', 3.00),
(1, 13, 'ZLAB03', '3D printan model', 20.00),
(1, 13, 'ZLAB04', '3D printana opornica', 55.00),
(1, 9, 'ZLAB05', 'Cirkonijev nadzidek', 55.00),
(1, 9, 'ZLAB06', 'Cirkonijev vijačen implant na T-Base', 165.00),
(1, 9, 'ZLAB07', 'Cirkonijev vijačen implant na T-Base + e-max ceram', 185.00),
(1, 9, 'ZLAB08', 'Cirkonijev zatiček', 55.00),
(1, 9, 'ZLAB09', 'Cirkonijeva kapica', 58.00),
(1, 9, 'ZLAB10', 'Cirkonijeva kapica + peka keramike', 150.00),
(1, 9, 'ZLAB11', 'Cirkonijeva prevleka cut back', 130.00),
(1, 11, 'ZLAB12', 'Dodan zob v protezo', 15.00),
(1, 1, 'ZLAB13', 'Enostavna vlita kovinska baza (do 3 sidranj)', 165.00),
(1, 1, 'ZLAB14', 'Estetska faseta', 150.00),
(1, 1, 'ZLAB15', 'Estetska faseta z individualnim nanosom', 165.00),
(1, 9, 'ZLAB16', 'Fasetirana prevleka nexco', 90.00),
(1, 9, 'ZLAB17', 'Fasetiranje prevleke', 40.00),
(1, 9, 'ZLAB18', 'Gred', 55.00),
(1, 17, 'ZLAB19', 'Grizna šablona', 30.00),
(1, 8, 'ZLAB22', 'Implant s polno keramiko (cirkonij)', 165.00),
(1, 8, 'ZLAB23', 'Implant s polno keramiko (e-max)', 170.00),
(1, 11, 'ZLAB24', 'Indirektna podložitev proteze', 55.00),
(1, 9, 'ZLAB25', 'Individualna funkcijska žlica', 30.00),
(1, 9, 'ZLAB26', 'Izgotovitev kovinske vlite baze', 140.00),
(1, 9, 'ZLAB27', 'Izgotovitev vlite baze', 55.00),
(1, 9, 'ZLAB28', 'Izlivanje študijskega modela', 15.00),
(1, 9, 'ZLAB29', 'Kennedy zvezna opornica', 30.00),
(1, 8, 'ZLAB31', 'Kirurško vodilo za implante', 80.00),
(1, 9, 'ZLAB32', 'Komplicirana vlita baza (polzila, rezkanje, Richmond kapica..)', 185.00),
(1, 9, 'ZLAB33', 'Kompozitni inlay Nexco', 100.00),
(1, 9, 'ZLAB34', 'Kovinsko porcelanska prevleka', 110.00),
(1, 8, 'ZLAB35', 'Labor impl Ankylos', 50.00),
(1, 8, 'ZLAB36', 'Labor impl Neodent', 25.00),
(1, 8, 'ZLAB37', 'Lotanje po elementu', 40.00),
(1, 8, 'ZLAB38', 'Material - Polzilo (A)', 20.00),
(1, 8, 'ZLAB39', 'Material - Polzilo (B)', 10.00),
(1, 8, 'ZLAB40', 'Modelacija ćlena v vliti bazi', 35.00),
(1, 8, 'ZLAB41', 'Montaža polzil, sklepovnih vezi', 55.00),
(1, 8, 'ZLAB42', 'Navosek po elementu', 30.00),
(1, 8, 'ZLAB43', 'Nazidek - direktna metoda', 40.00),
(1, 8, 'ZLAB44', 'Nazidek - indirektna metoda', 50.00),
(1, 9, 'ZLAB45', 'Nexco na cirkonij', 100.00),
(1, 11, 'ZLAB46', 'Parcialna proteza', 260.00),
(1, 9, 'ZLAB47', 'Peka roza keramike', 25.00),
(1, 9, 'ZLAB48', 'Polna keramična prevleka', 130.00),
(1, 9, 'ZLAB49', 'Polna kompozitna prevleka Nexco', 100.00),
(1, 9, 'ZLAB50', 'Polna kovinska prevleka', 60.00),
(1, 9, 'ZLAB51', 'Polni cirkonij na abatment', 150.00),
(1, 9, 'ZLAB52', 'Polna cirkonijeva prevleka', 110.00),
(1, 9, 'ZLAB53', 'Ponovna izdelava kovinskega ogrodja po kapici', 28.00),
(1, 9, 'ZLAB54', 'Ponovno glaziranje', 30.00),
(1, 8, 'ZLAB55', 'Postavitev implanta', 50.00),
(1, 8, 'ZLAB56', 'Prenosnik izdelan po abutmentu', 20.00),
(1, 9, 'ZLAB57', 'Prešana keramična kapica + peka keramike', 165.00),
(1, 11, 'ZLAB58', 'Provizorij prevleka', 30.00),
(1, 11, 'ZLAB59', 'Ref-line Polident po loku', 60.00),
(1, 11, 'ZLAB60', 'Reparatura proteze (prelom)', 40.00),
(1, 8, 'ZLAB61', 'Rezkanje abutmenta', 70.00),
(1, 8, 'ZLAB62', 'Rezkanje površin po elementu', 35.00),
(1, 9, 'ZLAB63', 'Richmond kapica brez polzila', 60.00),
(1, 11, 'ZLAB65', 'Totalna proteza - enostavna', 140.00),
(1, 11, 'ZLAB66', 'Vgraditev posameznega elementa v reparaturi proteze', 15.00),
(1, 11, 'ZLAB67', 'Vizio line ivoclar po loku', 70.00),
(1, 11, 'ZLAB68', 'Vlita zapona', 20.00),
(1, 11, 'ZLAB69', 'Vratni nanos (Schulter masa)', 25.00),
(1, 11, 'ZLAB70', 'Žabica (postavitev do 4 zaporednih zob z zaponami)', 100.00),
(1, 9, 'ZLAB71', 'Fasetirana prevleka', 60.00),
(1, 9, 'ZLAB72', 'Totalna proteza 2', 220.00),
(2, 20, 'I001', 'Medzobne ščetke CPS 06', 7.70),
(2, 20, 'I002', 'Medzobne ščetke CPS 07', 7.70),
(2, 20, 'I003', 'Medzobne ščetke CPS 08', 7.70),
(2, 20, 'I004', 'Medzobne ščetke CPS 09', 7.70),
(2, 20, 'I005', 'Medzobne ščetke CPS 011', 7.70),
(2, 20, 'I006', 'Medzobne ščetke z držalom CPS 405', 7.70),
(2, 20, 'I007', 'Medzobne ščetke z držalom CPS 406', 7.70),
(2, 20, 'I008', 'Medzobne ščetke z držalom CPS 408', 7.70),
(2, 20, 'I009', 'Medzobne ščetke z držalom CPS 410', 7.70),
(2, 20, 'I010', 'Medzobne refill X 12 CPS 06', 15.00),
(2, 20, 'I011', 'Medzobne refill X 12 CPS 07', 15.00),
(2, 20, 'I012', 'Medzobne refill X 12 CPS 08', 15.00),
(2, 20, 'I013', 'Medzobne refill X 12 CPS 09', 15.00),
(2, 20, 'I014', 'Medzobne refill X 12 CPS 011', 15.00),
(2, 20, 'I015', 'Medzobne pocket set 457', 9.00),
(2, 20, 'I016', 'Držalo alu. za medzobne UHS 410', 8.00),
(2, 20, 'I017', 'Držalo alu. za medzobne UHS 411', 8.00),
(2, 20, 'I018', 'Držalo alu. za medzobne UHS 413', 8.00),
(2, 19, 'I019', 'Zobna nitka Curaprox teflon DF 820', 7.00),
(2, 19, 'I020', 'Zobna nitka Jordan easy slide', 4.00),
(2, 19, 'I021', 'Zobna nitka Jordan expand', 4.00),
(2, 19, 'I022', 'Zobna nitka Jordan whitening', 5.00),
(2, 19, 'I023', 'Zobna nitka Proxy soft 3 in 1', 9.00),
(2, 19, 'I024', 'Zobna nitka Proxy soft bridge & implant', 12.00),
(2, 19, 'I025', 'Zobna nitka Proxy soft periodontal', 14.00),
(2, 10, 'I027', 'Strgalo za jezik CTC 203', 6.50),
(2, 18, 'I028', 'Zobna ščetka Ultra soft CS 5460', 6.00),
(2, 18, 'I029', 'Zobna ščetka Ultra soft CS 3960', 6.00),
(2, 18, 'I030', 'Zobna ščetka Soft CS 1560', 6.00),
(2, 18, 'I031', 'Zobna ščetka 2 pac Ultra soft CS 5460', 10.00),
(2, 18, 'I032', 'Zobna ščetka 3 pac Ultra soft CS 5460', 13.50),
(2, 18, 'I033', 'Zobna ščetka 3 pac Super soft CS 3960', 13.50),
(2, 18, 'I034', 'Zobna ščetka 3 pac Soft CS 1560', 13.50),
(2, 18, 'I035', 'Single krtačka CS 1006', 6.00),
(2, 18, 'I036', 'Zobna ščetka smart', 6.00),
(2, 18, 'I037', 'Zobna ščetka 3 pac Smart Ultra soft - manjše', 13.00),
(2, 21, 'I039', 'Ustna voda Perio +0,05 Balance', 10.00),
(2, 21, 'I040', 'Ustna voda Perio +0,09 Regenerate', 10.00),
(2, 21, 'I041', 'Ustna voda Perio +0,12 Protect', 10.00),
(2, 21, 'I042', 'Ustna voda Perio +0,20 Forte', 10.00),
(2, 22, 'I043', 'Zobna pasta Perio + Support 0,09', 8.00),
(2, 22, 'I044', 'Gel Perio + Focus 0,5', 6.00),
(2, 21, 'I045', 'Ustna voda Bluem', 15.00),
(2, 22, 'I046', 'Zobna pasta Bluem', 12.00),
(2, 21, 'I047', 'Set Perio + Regenerate', 18.00),
(2, 21, 'I048', 'Set Perio + Balance', 18.00),
(2, 21, 'I049', 'Set Perio + Forte', 24.00),
(2, 21, 'I050', 'Set Bluem voda in pasta', 28.00),
(2, 19, 'I059', 'Easy reach flossers 25kom zobne nitke z držali (zelene)', 3.00),
(2, 19, 'I060', 'Miracle flosser mini zobne nitke z držali (modre)', 6.50),
(2, 19, 'I061', 'Easy clean Flosser držalo + 5 refil', 5.00),
(2, 10, 'I063', 'Maska FFP2 - KN 95', 6.00),
(2, 10, 'I064', 'Maska FFP2 - KN 95 10x', 55.00),
(2, 10, 'I065', 'Kirurška maska', 1.20),
(2, 22, 'I067', 'Opalescence zobna pasta', 20.00),
(2, 22, 'I068', 'Remot zobna pasta', 40.00),
(2, 18, 'I069', 'Curaprox Hydrosonic PRO - sonična zobna ščetka', 180.00),
(2, 18, 'I070', 'Hydrosonic sensitive round - glava sonične ščetke', 20.00),
(2, 18, 'I071', 'Hydrosonic power round - glava sonične ščetke', 20.00),
(2, 20, 'I072', 'Medzobne ščetke refill x 8 CPS 07', 10.00),
(2, 20, 'I073', 'Medzobne ščetke refill x 8 CPS 011', 10.00),
(2, 20, 'I076', 'Hydrosonic Smart Black is White 259 - glava sonične ščetke', 20.00),
(2, 18, 'I077', 'Curaprox Black is White - sonična zobna ščetka', 170.00),
(2, 18, 'I081', 'Hydrosonic CHS 200 sensitive long - glava sonične ščetke', 15.00),
(2, 18, 'I082', 'Hydrosonic CHS 300 power long - glava sonične ščetke', 15.00),
(2, 18, 'I083', 'Zobna ščetka Velvet CS 12460', 7.00),
(2, 22, 'I084', 'Theodent Classic - zobna pasta', 30.00),
(2, 22, 'I085', 'Theodent 300 - zobna pasta', 130.00),
(2, 22, 'I086', 'Theodent Kids - zobna pasta', 30.00),
(2, 11, 'I087', 'Kukident', 10.00);

--############################################################
--# Altering prm_product table and inserting products with VAT
--############################################################

ALTER TABLE prm_product 
ALTER COLUMN vat_tax_rate TYPE DECIMAL(5,2);

INSERT INTO prm_product (product_type_id, product_group_id, product_code, product_name, product_price, vat_tax_rate, taxable_amount, tax_amount) VALUES
(2, 19, 'I025', 'Zobna nitka Thorton periodontal', 14.00, 22.00, 11.48, 2.52),
(2, 18, 'I038', 'Otroška zobna ščetka Baby CS 4260', 6.00, 22.00, 4.92, 1.08),
(2, 18, 'I051', 'Sonicare protective clean 4100 (modra)', 90.00, 22.00, 73.77, 16.23),
(2, 18, 'I052', 'Sonicare clean 4500 (roza)', 100.00, 22.00, 81.97, 18.03),
(2, 18, 'I053', 'Sonicare protective clean 4500 (črna)', 100.00, 22.00, 81.97, 18.03),
(2, 18, 'I054', 'Sonicare protective clean 5100 2 pac', 200.00, 22.00, 163.93, 36.07),
(2, 18, 'I055', 'Sonicare optimal white w2 (bela)', 30.00, 22.00, 24.59, 5.41),
(2, 18, 'I056', 'Sonicare optimal white w2 (črna)', 30.00, 22.00, 24.59, 5.41),
(2, 18, 'I057', 'Sonicare proresults C1', 26.00, 22.00, 21.31, 4.69),
(2, 18, 'I058', 'Zobna prha AirFloss Ultra', 100.00, 22.00, 81.97, 18.03),
(2, 18, 'I074', 'Zobna ščetka 2 pac Ultra soft CS 5460 Limited Edition', 9.50, 22.00, 7.79, 1.71),
(2, 18, 'I075', 'Zobna ščetka 3 pac Ultra soft CS 5460 Limited Edition', 13.00, 22.00, 10.66, 2.34);


UPDATE db_version SET version ='01.10', version_date=CURRENT_DATE WHERE resource='Tables';


COMMIT;