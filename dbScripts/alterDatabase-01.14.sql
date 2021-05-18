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


UPDATE db_version SET version ='01.14', version_date=CURRENT_DATE WHERE resource='Tables';


COMMIT;