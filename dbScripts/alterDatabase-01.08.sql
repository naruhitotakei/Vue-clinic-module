--############################################################
--# Creating link between prm_product_category and prm_product_group
--############################################################

ALTER TABLE prm_product_category ADD CONSTRAINT prm_product_category_pk PRIMARY KEY (category_id);

ALTER TABLE prm_product_group ADD COLUMN category_id SERIAL
CONSTRAINT product_group_product_category REFERENCES prm_product_category(category_id);

--############################################################
--# Linking prm_company_premise_device to invoice
--############################################################

ALTER TABLE prm_company_premise_device ADD CONSTRAINT prm_company_premise_device_pk PRIMARY KEY (device_id);

ALTER TABLE invoice ADD COLUMN device_id VARCHAR(20)
CONSTRAINT invoice_company_premise_device_fk REFERENCES prm_company_premise_device(device_id);

--############################################################
--# Linking prm_product table to invoice_line_item
--############################################################

ALTER TABLE prm_product ADD CONSTRAINT prm_product_pk PRIMARY KEY (product_id);

ALTER TABLE prm_invoice_item ADD COLUMN product_id SERIAL UNIQUE
CONSTRAINT invoiceitem_product_fk REFERENCES prm_product(product_id);

--############################################################
--# Linking users id to prm_client
--############################################################
ALTER TABLE prm_client ADD COLUMN user_id SERIAL 
CONSTRAINT client_users_fk REFERENCES users(id);

UPDATE db_version SET version ='01.08', version_date=CURRENT_DATE WHERE resource='Tables';


COMMIT;