--############################################################
--# Create PRM client table
--############################################################
CREATE TABLE IF NOT EXISTS prm_client (
   client_id			  SERIAL UNIQUE,
   client_name			  VARCHAR(255),
   client_slug			  VARCHAR(255),
   client_deleted         BOOLEAN DEFAULT 'f',
   created_date           DATE NOT NULL DEFAULT CURRENT_DATE 
);
--############################################################
--# Fill PRM Client table
--############################################################ 
INSERT INTO prm_client (client_id, client_name, client_slug) VALUES (1, 'Primadent', 'primadent');
INSERT INTO prm_client (client_id, client_name, client_slug) VALUES (2, 'Fabjan', 'fabjan');
--############################################################
--# Fill PRM Client with Existing CRM Clients
--############################################################
SELECT clients.* FROM clients WHERE clients.id = 10 AND clients.id = 23 AND clients.id = 27
JOIN clients ON clients.id  = prm_client.client_id
WHERE prm_client.client_id = 1

SELECT clients.* FROM clients WHERE clients.id = 1 AND clients.id = 5 AND clients.id = 19 AND clients.id = 30
JOIN clients ON clients.id = prm_client.client_id
WHERE prm_client.client_id = 2
--############################################################
--# update version
--############################################################

UPDATE db_version SET version ='01.06', version_date=CURRENT_DATE WHERE resource='Tables';


COMMIT;