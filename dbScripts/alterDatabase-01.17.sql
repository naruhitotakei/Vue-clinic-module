--############################################################
--# filling table clients_prm_client_bridge with values
--############################################################

INSERT INTO clients_prm_client_bridge (clients_id, prm_client_id) VALUES 
(10, 1), (23, 1), (27,1), (25, 2), (30, 2), (21, 2), (28, 2), (22, 2), (1, 2), (5, 2), (19, 2);

--############################################################
--# changing company_id in prm_company to SERIAL
--############################################################

CREATE SEQUENCE prm_company_company_id_seq MINVALUE 2;
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

UPDATE db_version SET version ='01.17', version_date=CURRENT_DATE WHERE resource='Tables';


COMMIT;
