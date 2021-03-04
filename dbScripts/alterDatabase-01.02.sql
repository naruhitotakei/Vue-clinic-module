--############################################################
--# add PRM passowrd
--############################################################
ALTER TABLE users ADD COLUMN prm_password_hash VARCHAR(256);

--############################################################
--# update version
--############################################################
UPDATE db_version SET version ='01.02' WHERE resource='Tables';


COMMIT;