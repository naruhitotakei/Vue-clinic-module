ALTER TABLE enquiries ADD COLUMN prm_dentist_user_id INT references users(id) on delete set null;

--############################################################
--# update version
--############################################################
UPDATE db_version SET version ='01.05', version_date=CURRENT_DATE WHERE resource='Tables';


COMMIT;