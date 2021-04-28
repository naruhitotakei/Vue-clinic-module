--############################################################
--# Altering and linking some tables
--############################################################

ALTER TABLE invoice ADD COLUMN item_id INT
CONSTRAINT invoice_prm_invoice_item_fk REFERENCES prm_invoice_item (item_id);

ALTER TABLE prm_invoice_item DROP COLUMN product_id;

ALTER TABLE prm_invoice_item ADD COLUMN product_id SERIAL
CONSTRAINT prm_invoice_item_prm_product_fk REFERENCES prm_product (product_id);

ALTER TABLE prm_company_premise DROP COLUMN company_id;

ALTER TABLE prm_company_premise ADD COLUMN company_id INT
CONSTRAINT prm_company_premise_prm_company_fk REFERENCES prm_company (company_id);

UPDATE db_version SET version ='01.11', version_date=CURRENT_DATE WHERE resource='Tables';


COMMIT;