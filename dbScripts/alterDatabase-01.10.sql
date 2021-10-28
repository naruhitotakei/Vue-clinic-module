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

INSERT INTO prm_product_group (product_group_code, product_group_name, category_id) VALUES ('PG0001', 'Zobne luske', (SELECT category_id FROM prm_product_category WHERE category_code = 'PC0002'));
INSERT INTO prm_product_group (product_group_code, product_group_name, category_id) VALUES ('PG0002', 'Pregled', (SELECT category_id FROM prm_product_category WHERE category_code = 'PC0001'));
INSERT INTO prm_product_group (product_group_code, product_group_name, category_id) VALUES ('PG0003', 'Ortodontija', (SELECT category_id FROM prm_product_category WHERE category_code = 'PC0004'));
INSERT INTO prm_product_group (product_group_code, product_group_name, category_id) VALUES ('PG0004', 'Oralna kirurgija', (SELECT category_id FROM prm_product_category WHERE category_code = 'PC0004'));
INSERT INTO prm_product_group (product_group_code, product_group_name, category_id) VALUES ('PG0005', 'Endodontsko zdravljenje', (SELECT category_id FROM prm_product_category WHERE category_code = 'PC0004'));
INSERT INTO prm_product_group (product_group_code, product_group_name, category_id) VALUES ('PG0006', 'Parodontologija', (SELECT category_id FROM prm_product_category WHERE category_code = 'PC0004'));
INSERT INTO prm_product_group (product_group_code, product_group_name, category_id) VALUES ('PG0007', 'Zobne bolezni', (SELECT category_id FROM prm_product_category WHERE category_code = 'PC0004'));
INSERT INTO prm_product_group (product_group_code, product_group_name, category_id) VALUES ('PG0008', 'Zobni vsadki', (SELECT category_id FROM prm_product_category WHERE category_code = 'PC0003'));
INSERT INTO prm_product_group (product_group_code, product_group_name, category_id) VALUES ('PG0009', 'Fiksna protetika', (SELECT category_id FROM prm_product_category WHERE category_code = 'PC0004'));
INSERT INTO prm_product_group (product_group_code, product_group_name, category_id) VALUES ('PG0010', 'Preventiva', (SELECT category_id FROM prm_product_category WHERE category_code = 'PC0005'));
INSERT INTO prm_product_group (product_group_code, product_group_name, category_id) VALUES ('PG0011', 'Snemna protetika', (SELECT category_id FROM prm_product_category WHERE category_code = 'PC0004'));
INSERT INTO prm_product_group (product_group_code, product_group_name, category_id) VALUES ('PG0012', 'Beljenje zob', (SELECT category_id FROM prm_product_category WHERE category_code = 'PC0002'));
INSERT INTO prm_product_group (product_group_code, product_group_name, category_id) VALUES ('PG0013', 'Slikovna diagnostika', (SELECT category_id FROM prm_product_category WHERE category_code = 'PC0006'));
INSERT INTO prm_product_group (product_group_code, product_group_name, category_id) VALUES ('PG0014', 'Zdravilo', (SELECT category_id FROM prm_product_category WHERE category_code = 'PC0007'));
INSERT INTO prm_product_group (product_group_code, product_group_name, category_id) VALUES ('PG0015', 'Invisalign', (SELECT category_id FROM prm_product_category WHERE category_code = 'PC0002'));
INSERT INTO prm_product_group (product_group_code, product_group_name, category_id) VALUES ('PG0016', 'Zobni nakit', (SELECT category_id FROM prm_product_category WHERE category_code = 'PC0002'));
INSERT INTO prm_product_group (product_group_code, product_group_name, category_id) VALUES ('PG0017', 'Ugriz', (SELECT category_id FROM prm_product_category WHERE category_code = 'PC0004'));
INSERT INTO prm_product_group (product_group_code, product_group_name, category_id) VALUES ('PG0018', 'Zobne ščetke', (SELECT category_id FROM prm_product_category WHERE category_code = 'PC0008'));
INSERT INTO prm_product_group (product_group_code, product_group_name, category_id) VALUES ('PG0019', 'Zobne nitke', (SELECT category_id FROM prm_product_category WHERE category_code = 'PC0008'));
INSERT INTO prm_product_group (product_group_code, product_group_name, category_id) VALUES ('PG0020', 'Medzobne ščetke', (SELECT category_id FROM prm_product_category WHERE category_code = 'PC0008'));
INSERT INTO prm_product_group (product_group_code, product_group_name, category_id) VALUES ('PG0021', 'Ustne vode', (SELECT category_id FROM prm_product_category WHERE category_code = 'PC0008'));
INSERT INTO prm_product_group (product_group_code, product_group_name, category_id) VALUES ('PG0022', 'Zobne paste', (SELECT category_id FROM prm_product_category WHERE category_code = 'PC0008'));

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

ALTER TABLE prm_product 
ALTER COLUMN product_name TYPE VARCHAR(128),
ALTER COLUMN product_price TYPE NUMERIC(8,2),
ALTER COLUMN taxable_amount TYPE NUMERIC(8,2),
ALTER COLUMN tax_amount TYPE NUMERIC(8,2);

ALTER TABLE prm_product ADD COLUMN product_code VARCHAR(8);

INSERT INTO prm_product (product_type_id, product_group_id, product_code, product_name, product_price) VALUES
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0002'), 'N001', 'Stomatološki pregled', 35.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0002'), 'N002', 'Kratek stomatološki pregled', 30.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0002'), 'N003', 'CRM pregled', 35.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0010'), 'N004', 'Odstranitev trdih in mehkih oblog po loku', 40.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0010'), 'N005', 'Peskanje po loku', 40.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0007'), 'N006', 'Erozija', 55.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0007'), 'N007', 'Zalivka po eni ploskvi', 65.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0007'), 'N008', 'Zalivka na dveh ploskvah', 75.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0007'), 'N009', 'Zalivka na treh ploskvah', 85.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0007'), 'N010', 'Dograditev zoba', 110.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0007'), 'N011', 'Koferdam', 20.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0007'), 'N012', 'Zalitje fisur', 30.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0005'), 'N013', 'Zdravljenje gangrene in polnitev po kanalu', 120.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0005'), 'N014', 'Ponovno zdravljenje po kanalu', 140.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0007'), 'N015', 'Zdravilo s provizorično plombo', 50.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0007'), 'N016', 'Direktno kritje pulpe', 20.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0007'), 'N017', 'Trepanacija pulpnega kanala', 35.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0014'), 'N018', 'Anestezija', 15.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0007'), 'N019', 'Ekstrakcija majavega zoba', 60.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0007'), 'N020', 'Ekstrakcija enokoreninskega zoba', 80.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0007'), 'N021', 'Ekstrakcija večkoreninskega zoba', 100.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0007'), 'N022', 'Kirurška ekstrakcija', 130.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0007'), 'N023', 'Izkles zoba', 240.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0004'), 'N024', 'Apikotomija ene korenine', 240.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0004'), 'N025', 'Apikotomija dveh korenin', 300.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0004'), 'N026', 'Apikotomija treh korenin', 360.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0006'), 'N027', 'Reženjska operacija kvadrant', 200.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0006'), 'N028', 'Podaljšanje klinične krone', 160.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0006'), 'N029', 'Paradontološko zdravljenje', 400.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0006'), 'N030', 'Paradontološko zdravljenje - laser', 500.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0004'), 'N031', 'Zaprti dvig sinusa', 250.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0004'), 'N032', 'Odprti dvig sinusa', 550.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0004'), 'N033', 'Manjša dograditev s kostnim nadomestkom', 150.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0004'), 'N034', 'Dograditev s kostnim nadomestkom in membrano', 300.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0004'), 'N035', 'Prosti kostni transplantat', 400.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0004'), 'N036', 'Vstavitev implantata', 800.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0009'), 'N037', 'Keramična prevleka', 500.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0009'), 'N038', 'Zirconijeva prevleka', 450.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0009'), 'N039', 'Zirconijev inlay', 425.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0009'), 'N040', 'Keramični inlay', 450.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0009'), 'N041', 'Kompozitni inlay', 350.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0001'), 'N042', 'Zirconijeva faseta', 425.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0001'), 'N043', 'Keramična faseta', 450.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0001'), 'N044', 'Kompozitna faseta', 350.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0008'), 'N045', 'Abutment + zirconijeva prevleka', 800.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0008'), 'N046', '4 implantati + zirconijev most', 8650.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0008'), 'N047', '5 implantanov + zirconijev most', 9800.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0008'), 'N048', '2 implantata + totalna proteza', 3900.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0008'), 'N049', '4 implantanti + totalna proteza', 5900.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0008'), 'N050', '2 implantata + 4 zirconijeve prevleke + parcialna proteza', 6700.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0009'), 'N051', 'Rdeča keramika po zobu', 60.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0009'), 'N052', 'FRC nazidek', 120.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0009'), 'N053', 'Zirkonijev nazidek', 150.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0009'), 'N054', 'Provizorična prevleka', 60.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0009'), 'N055', 'Demontaža po zobu', 30.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0011'), 'N056', 'Totalna proteza', 1250.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0011'), 'N057', 'Parcialna proteza z ulito bazo', 1700.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0011'), 'N058', 'Indirektna podložitev', 150.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0011'), 'N059', 'Direktna podložitev', 100.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0011'), 'N060', 'Osnovna reparatura', 80.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0009'), 'N061', 'Dodatni element', 35.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0011'), 'N062', 'Imediatna proteza', 350.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0011'), 'N063', 'Imediatna proteza z zaponami', 370.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0011'), 'N064', 'Žabica', 250.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0011'), 'N065', 'Vbrizgavanje hialurona 1 ml', 350.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0012'), 'N066', 'Beljenje zob brez šablon 3x15 min', 350.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0012'), 'N067', 'Beljenje zob + šablone', 450.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0017'), 'N068', 'Opornica', 170.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0017'), 'N069', 'Ščitnik', 170.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0013'), 'N070', 'Cbct 1', 45.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0013'), 'N071', 'Cbct 2', 80.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0013'), 'N072', 'Cbct 3', 100.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0013'), 'N073', 'Ortopan', 35.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0013'), 'N074', 'Rtg lokalno', 15.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0010'), 'N076', 'Higiena - opalescence', 20.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0010'), 'N077', 'Higiena - bluem', 15.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0010'), 'N078', 'Higiena - corega', 10.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0010'), 'N079', 'Optragate', 3.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0010'), 'N080', 'Zagozda', 2.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0010'), 'N081', 'Menjava teflona', 35.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0008'), 'N082', 'Vstavitev implanta, abutment zirconij prevleka', 1600.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0009'), 'N083', 'Odtis, funkcijska žlica, pregled', 120.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0012'), 'N084', 'Beljenje posameznega zoba', 100.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0014'), 'N086', 'Recept', 10.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0014'), 'N087', 'Viscostat', 2.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0012'), 'N088', 'Opalescence 16%', 30.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0011'), 'N089', 'Čiščenje kamna na protezi', 80.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0006'), 'N090', 'Kiretaža žepa po zobu', 30.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0002'), 'N091', 'Penali za nejavljeno odsotnost', 50.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0014'), 'N092', 'Voltfast 50 mg - 3x prašek', 3.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0014'), 'N093', 'Oki 80 mg granule - 2x prašek', 2.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0014'), 'N094', 'Augmentin 875/125mg', 15.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0014'), 'N095', 'Sumamed 500mg', 12.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0014'), 'N096', 'Amoksiklav 1000mg tbl', 20.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0014'), 'N097', 'Klimicin 300mg kaps', 12.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0014'), 'N098', 'GM ključ', 60.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0003'), 'N100', 'Pregled + odtis zobni aparat', 120.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0015'), 'N101', 'Opornica invisalign', 180.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0003'), 'N102', 'Snemna plošča', 450.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0003'), 'N103', 'Retencijska žička', 170.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0003'), 'N104', 'Retencijska žička - leplenje', 80.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0003'), 'N105', 'Beljenje 15 min', 60.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0011'), 'N106', 'Provizorij 1', 20.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0011'), 'N107', 'Provizorij 2', 12.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0004'), 'N108', 'Odstranitev šivov po zobu', 15.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0011'), 'N110', 'Začasni maryland most', 300.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0008'), 'N111', 'Individualni zirkonijev abutment', 280.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0014'), 'N112', 'Recept voltfast', 18.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0006'), 'N113', 'Zdravljenje dlesni', 50.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0016'), 'N114', 'Zobni nakit', 80.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0002'), 'N116', 'Materialni stroški', 100.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0001'), 'N117', 'Fasetiranje', 90.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0009'), 'N118', 'Cementiranje starih kron/lusk', 70.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0009'), 'N119', 'Brušenje zob (cena po zobu)', 100.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0003'), 'N120', 'Odstranjevanje fiksnega zobnega aparata (po zobu)', 10.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0008'), 'N121', '6 implantov + zirconijev most', 10900.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0004'), 'N122', 'Incizija', 25.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0008'), 'N123', 'Vstavitev strauman implantata, abutment, zirconijeva prevleka', 1930.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0008'), 'N124', 'Strauman abutment + zirconijeva prevleka', 930.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0008'), 'N125', 'Vstavitev strauman implantata', 1000.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0008'), 'N126', 'Strauman ind abutment + zirconijeva prevleka', 1400.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0009'), 'N127', 'Cirkonijeva prevleka + e-max', 600.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0014'), 'N128', 'Zaustavitev krvavitve', 70.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0008'), 'N129', 'Strauman implantat zirconij', 2875.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0007'), 'N130', 'Terapija z laserjem', 25.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0007'), 'N131', 'Terapija (sulcusa) z laserjem', 10.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0010'), 'N132', 'Test Covid - 19', 25.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0008'), 'N133', 'Provizorij na implantantu', 85.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0014'), 'N134', 'Oki prašek - 30 vrečk', 18.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0008'), 'N135', '4 implantanti + kompozitni most', 6900.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0008'), 'N136', '5 implantov + kompozitni most', 7750.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0008'), 'N137', '6 implantov + kompozitni most', 8550.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0013'), 'Q0002', 'Diapozitivi v ortodontiji', 1.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0013'), 'Q0003', 'Ortod. konf. elem.- vratni teg', 2.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0013'), 'Q0004', 'Ortod. konf. elem.- obrazni lok', 3.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0013'), 'ZLAB01', '3D funkcijska žlica', 35.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0013'), 'ZLAB02', '3D printan krn', 3.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0013'), 'ZLAB03', '3D printan model', 20.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0013'), 'ZLAB04', '3D printana opornica', 55.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0009'), 'ZLAB05', 'Cirkonijev nadzidek', 55.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0009'), 'ZLAB06', 'Cirkonijev vijačen implant na T-Base', 165.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0009'), 'ZLAB07', 'Cirkonijev vijačen implant na T-Base + e-max ceram', 185.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0009'), 'ZLAB08', 'Cirkonijev zatiček', 55.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0009'), 'ZLAB09', 'Cirkonijeva kapica', 58.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0009'), 'ZLAB10', 'Cirkonijeva kapica + peka keramike', 150.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0009'), 'ZLAB11', 'Cirkonijeva prevleka cut back', 130.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0011'), 'ZLAB12', 'Dodan zob v protezo', 15.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0001'), 'ZLAB13', 'Enostavna vlita kovinska baza (do 3 sidranj)', 165.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0001'), 'ZLAB14', 'Estetska faseta', 150.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0001'), 'ZLAB15', 'Estetska faseta z individualnim nanosom', 165.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0009'), 'ZLAB16', 'Fasetirana prevleka nexco', 90.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0009'), 'ZLAB17', 'Fasetiranje prevleke', 40.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0009'), 'ZLAB18', 'Gred', 55.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0017'), 'ZLAB19', 'Grizna šablona', 30.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0008'), 'ZLAB22', 'Implant s polno keramiko (cirkonij)', 165.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0008'), 'ZLAB23', 'Implant s polno keramiko (e-max)', 170.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0011'), 'ZLAB24', 'Indirektna podložitev proteze', 55.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0009'), 'ZLAB25', 'Individualna funkcijska žlica', 30.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0009'), 'ZLAB26', 'Izgotovitev kovinske vlite baze', 140.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0009'), 'ZLAB27', 'Izgotovitev vlite baze', 55.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0009'), 'ZLAB28', 'Izlivanje študijskega modela', 15.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0009'), 'ZLAB29', 'Kennedy zvezna opornica', 30.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0008'), 'ZLAB31', 'Kirurško vodilo za implante', 80.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0009'), 'ZLAB32', 'Komplicirana vlita baza (polzila, rezkanje, Richmond kapica..)', 185.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0009'), 'ZLAB33', 'Kompozitni inlay Nexco', 100.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0009'), 'ZLAB34', 'Kovinsko porcelanska prevleka', 110.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0008'), 'ZLAB35', 'Labor impl Ankylos', 50.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0008'), 'ZLAB36', 'Labor impl Neodent', 25.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0008'), 'ZLAB37', 'Lotanje po elementu', 40.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0008'), 'ZLAB38', 'Material - Polzilo (A)', 20.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0008'), 'ZLAB39', 'Material - Polzilo (B)', 10.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0008'), 'ZLAB40', 'Modelacija ćlena v vliti bazi', 35.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0008'), 'ZLAB41', 'Montaža polzil, sklepovnih vezi', 55.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0008'), 'ZLAB42', 'Navosek po elementu', 30.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0008'), 'ZLAB43', 'Nazidek - direktna metoda', 40.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0008'), 'ZLAB44', 'Nazidek - indirektna metoda', 50.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0009'), 'ZLAB45', 'Nexco na cirkonij', 100.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0011'), 'ZLAB46', 'Parcialna proteza', 260.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0009'), 'ZLAB47', 'Peka roza keramike', 25.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0009'), 'ZLAB48', 'Polna keramična prevleka', 130.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0009'), 'ZLAB49', 'Polna kompozitna prevleka Nexco', 100.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0009'), 'ZLAB50', 'Polna kovinska prevleka', 60.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0009'), 'ZLAB51', 'Polni cirkonij na abatment', 150.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0009'), 'ZLAB52', 'Polna cirkonijeva prevleka', 110.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0009'), 'ZLAB53', 'Ponovna izdelava kovinskega ogrodja po kapici', 28.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0009'), 'ZLAB54', 'Ponovno glaziranje', 30.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0008'), 'ZLAB55', 'Postavitev implanta', 50.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0008'), 'ZLAB56', 'Prenosnik izdelan po abutmentu', 20.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0009'), 'ZLAB57', 'Prešana keramična kapica + peka keramike', 165.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0011'), 'ZLAB58', 'Provizorij prevleka', 30.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0011'), 'ZLAB59', 'Ref-line Polident po loku', 60.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0011'), 'ZLAB60', 'Reparatura proteze (prelom)', 40.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0008'), 'ZLAB61', 'Rezkanje abutmenta', 70.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0008'), 'ZLAB62', 'Rezkanje površin po elementu', 35.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0009'), 'ZLAB63', 'Richmond kapica brez polzila', 60.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0011'), 'ZLAB65', 'Totalna proteza - enostavna', 140.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0011'), 'ZLAB66', 'Vgraditev posameznega elementa v reparaturi proteze', 15.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0011'), 'ZLAB67', 'Vizio line ivoclar po loku', 70.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0011'), 'ZLAB68', 'Vlita zapona', 20.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0011'), 'ZLAB69', 'Vratni nanos (Schulter masa)', 25.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0011'), 'ZLAB70', 'Žabica (postavitev do 4 zaporednih zob z zaponami)', 100.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0009'), 'ZLAB71', 'Fasetirana prevleka', 60.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Service'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0009'), 'ZLAB72', 'Totalna proteza 2', 220.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Product'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0020'), 'I001', 'Medzobne ščetke CPS 06', 7.70),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Product'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0020'), 'I002', 'Medzobne ščetke CPS 07', 7.70),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Product'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0020'), 'I003', 'Medzobne ščetke CPS 08', 7.70),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Product'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0020'), 'I004', 'Medzobne ščetke CPS 09', 7.70),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Product'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0020'), 'I005', 'Medzobne ščetke CPS 011', 7.70),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Product'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0020'), 'I006', 'Medzobne ščetke z držalom CPS 405', 7.70),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Product'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0020'), 'I007', 'Medzobne ščetke z držalom CPS 406', 7.70),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Product'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0020'), 'I008', 'Medzobne ščetke z držalom CPS 408', 7.70),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Product'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0020'), 'I009', 'Medzobne ščetke z držalom CPS 410', 7.70),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Product'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0020'), 'I010', 'Medzobne refill X 12 CPS 06', 15.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Product'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0020'), 'I011', 'Medzobne refill X 12 CPS 07', 15.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Product'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0020'), 'I012', 'Medzobne refill X 12 CPS 08', 15.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Product'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0020'), 'I013', 'Medzobne refill X 12 CPS 09', 15.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Product'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0020'), 'I014', 'Medzobne refill X 12 CPS 011', 15.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Product'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0020'), 'I015', 'Medzobne pocket set 457', 9.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Product'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0020'), 'I016', 'Držalo alu. za medzobne UHS 410', 8.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Product'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0020'), 'I017', 'Držalo alu. za medzobne UHS 411', 8.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Product'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0020'), 'I018', 'Držalo alu. za medzobne UHS 413', 8.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Product'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0019'), 'I019', 'Zobna nitka Curaprox teflon DF 820', 7.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Product'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0019'), 'I020', 'Zobna nitka Jordan easy slide', 4.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Product'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0019'), 'I021', 'Zobna nitka Jordan expand', 4.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Product'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0019'), 'I022', 'Zobna nitka Jordan whitening', 5.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Product'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0019'), 'I023', 'Zobna nitka Proxy soft 3 in 1', 9.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Product'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0019'), 'I024', 'Zobna nitka Proxy soft bridge & implant', 12.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Product'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0019'), 'I025', 'Zobna nitka Proxy soft periodontal', 14.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Product'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0010'), 'I027', 'Strgalo za jezik CTC 203', 6.50),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Product'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0018'), 'I028', 'Zobna ščetka Ultra soft CS 5460', 6.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Product'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0018'), 'I029', 'Zobna ščetka Ultra soft CS 3960', 6.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Product'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0018'), 'I030', 'Zobna ščetka Soft CS 1560', 6.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Product'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0018'), 'I031', 'Zobna ščetka 2 pac Ultra soft CS 5460', 10.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Product'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0018'), 'I032', 'Zobna ščetka 3 pac Ultra soft CS 5460', 13.50),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Product'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0018'), 'I033', 'Zobna ščetka 3 pac Super soft CS 3960', 13.50),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Product'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0018'), 'I034', 'Zobna ščetka 3 pac Soft CS 1560', 13.50),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Product'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0018'), 'I035', 'Single krtačka CS 1006', 6.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Product'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0018'), 'I036', 'Zobna ščetka smart', 6.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Product'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0018'), 'I037', 'Zobna ščetka 3 pac Smart Ultra soft - manjše', 13.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Product'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0021'), 'I039', 'Ustna voda Perio +0,05 Balance', 10.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Product'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0021'), 'I040', 'Ustna voda Perio +0,09 Regenerate', 10.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Product'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0021'), 'I041', 'Ustna voda Perio +0,12 Protect', 10.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Product'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0021'), 'I042', 'Ustna voda Perio +0,20 Forte', 10.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Product'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0022'), 'I043', 'Zobna pasta Perio + Support 0,09', 8.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Product'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0022'), 'I044', 'Gel Perio + Focus 0,5', 6.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Product'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0021'), 'I045', 'Ustna voda Bluem', 15.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Product'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0022'), 'I046', 'Zobna pasta Bluem', 12.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Product'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0021'), 'I047', 'Set Perio + Regenerate', 18.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Product'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0021'), 'I048', 'Set Perio + Balance', 18.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Product'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0021'), 'I049', 'Set Perio + Forte', 24.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Product'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0021'), 'I050', 'Set Bluem voda in pasta', 28.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Product'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0019'), 'I059', 'Easy reach flossers 25kom zobne nitke z držali (zelene)', 3.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Product'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0019'), 'I060', 'Miracle flosser mini zobne nitke z držali (modre)', 6.50),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Product'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0019'), 'I061', 'Easy clean Flosser držalo + 5 refil', 5.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Product'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0010'), 'I063', 'Maska FFP2 - KN 95', 6.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Product'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0010'), 'I064', 'Maska FFP2 - KN 95 10x', 55.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Product'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0010'), 'I065', 'Kirurška maska', 1.20),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Product'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0022'), 'I067', 'Opalescence zobna pasta', 20.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Product'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0022'), 'I068', 'Remot zobna pasta', 40.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Product'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0018'), 'I069', 'Curaprox Hydrosonic PRO - sonična zobna ščetka', 180.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Product'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0018'), 'I070', 'Hydrosonic sensitive round - glava sonične ščetke', 20.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Product'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0018'), 'I071', 'Hydrosonic power round - glava sonične ščetke', 20.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Product'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0020'), 'I072', 'Medzobne ščetke refill x 8 CPS 07', 10.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Product'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0020'), 'I073', 'Medzobne ščetke refill x 8 CPS 011', 10.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Product'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0020'), 'I076', 'Hydrosonic Smart Black is White 259 - glava sonične ščetke', 20.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Product'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0018'), 'I077', 'Curaprox Black is White - sonična zobna ščetka', 170.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Product'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0018'), 'I081', 'Hydrosonic CHS 200 sensitive long - glava sonične ščetke', 15.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Product'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0018'), 'I082', 'Hydrosonic CHS 300 power long - glava sonične ščetke', 15.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Product'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0018'), 'I083', 'Zobna ščetka Velvet CS 12460', 7.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Product'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0022'), 'I084', 'Theodent Classic - zobna pasta', 30.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Product'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0022'), 'I085', 'Theodent 300 - zobna pasta', 130.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Product'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0022'), 'I086', 'Theodent Kids - zobna pasta', 30.00),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Product'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0011'), 'I087', 'Kukident', 10.00);

--############################################################
--# Altering prm_product table and inserting products with VAT
--############################################################

ALTER TABLE prm_product 
ALTER COLUMN vat_tax_rate TYPE DECIMAL(5,2);

INSERT INTO prm_product (product_type_id, product_group_id, product_code, product_name, product_price, vat_tax_rate, taxable_amount, tax_amount) VALUES
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Product'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0019'), 'I025', 'Zobna nitka Thorton periodontal', 14.00, 22.00, 11.48, 2.52),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Product'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0018'), 'I038', 'Otroška zobna ščetka Baby CS 4260', 6.00, 22.00, 4.92, 1.08),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Product'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0018'), 'I051', 'Sonicare protective clean 4100 (modra)', 90.00, 22.00, 73.77, 16.23),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Product'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0018'), 'I052', 'Sonicare clean 4500 (roza)', 100.00, 22.00, 81.97, 18.03),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Product'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0018'), 'I053', 'Sonicare protective clean 4500 (črna)', 100.00, 22.00, 81.97, 18.03),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Product'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0018'), 'I054', 'Sonicare protective clean 5100 2 pac', 200.00, 22.00, 163.93, 36.07),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Product'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0018'), 'I055', 'Sonicare optimal white w2 (bela)', 30.00, 22.00, 24.59, 5.41),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Product'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0018'), 'I056', 'Sonicare optimal white w2 (črna)', 30.00, 22.00, 24.59, 5.41),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Product'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0018'), 'I057', 'Sonicare proresults C1', 26.00, 22.00, 21.31, 4.69),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Product'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0018'), 'I058', 'Zobna prha AirFloss Ultra', 100.00, 22.00, 81.97, 18.03),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Product'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0018'), 'I074', 'Zobna ščetka 2 pac Ultra soft CS 5460 Limited Edition', 9.50, 22.00, 7.79, 1.71),
((SELECT product_type_id FROM prm_product_type WHERE product_type_name = 'Product'), (SELECT product_group_id FROM prm_product_group WHERE product_group_code = 'PG0018'), 'I075', 'Zobna ščetka 3 pac Ultra soft CS 5460 Limited Edition', 13.00, 22.00, 10.66, 2.34);


UPDATE db_version SET version ='01.10', version_date=CURRENT_DATE WHERE resource='Tables';


COMMIT;