--############################################################
--# Adding bridge tables between users and prm_client
--# and clients and prm_client
--############################################################

ALTER TABLE prm_client 
DROP COLUMN user_id
DROP COLUMN clients_id;

CREATE TABLE IF NOT EXISTS users_prm_client_bridge (
	id				SERIAL,
	users_id		INT NOT NULL CONSTRAINT users_prm_client_bridge_users_fk REFERENCES users (id),
	prm_client_id	INT NOT NULL CONSTRAINT users_prm_client_bridge_prm_client_fk REFERENCES prm_client (id),
	created_at		DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE IF NOT EXISTS clients_prm_client_bridge (
	id				SERIAL,
	clients_id		INT NOT NULL CONSTRAINT clients_prm_client_bridge_clients_fk REFERENCES clients (id),
	prm_client_id	INT NOT NULL CONSTRAINT clients_prm_client_bridge_prm_client_fk REFERENCES prm_client (id),
	created_at		DATE NOT NULL DEFAULT CURRENT_DATE
);

--############################################################
--# altering prm_company table
--############################################################

ALTER TABLE prm_company ADD COLUMN prm_client_id INT
CONSTRAINT prm_company_prm_client REFERENCES prm_client (id);

--############################################################
--# adding columns to users table
--############################################################

ALTER TABLE users
ADD COLUMN title VARCHAR(64),
ADD COLUMN specialization VARCHAR(256);

--############################################################
--# altering users_prm_client
--############################################################

ALTER TABLE users_prm_client DROP COLUMN prm_company;

UPDATE db_version SET version ='01.14', version_date=CURRENT_DATE WHERE resource='Tables';

COMMIT;