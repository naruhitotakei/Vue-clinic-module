--############################################################
--# Create PRM client table
--############################################################
CREATE TABLE IF NOT EXISTS prm_client (
   client_id			  SERIAL UNIQUE,
   client_name			  VARCHAR(255),
   client_slug			  VARCHAR(255),
   client_blueprint       VARCHAR(255),
   client_deleted         BOOLEAN DEFAULT 'f',
   created_date           DATE NOT NULL DEFAULT CURRENT_DATE 
);
--############################################################
--# Fill PRM Client table
--############################################################ 
INSERT INTO prm_client (client_id, client_name, client_slug, client_blueprint) VALUES (1, 'Primadent', 'primadent', 'primadent');
INSERT INTO prm_client (client_id, client_name, client_slug, client_blueprint) VALUES (2, 'Fabjan', 'fabjan', 'fabjan');

--############################################################
--# update version
--############################################################

UPDATE db_version SET version ='01.06', version_date=CURRENT_DATE WHERE resource='Tables';


COMMIT;