--############################################################
--# altering enquiries table and adding insurance fields
--############################################################

ALTER TABLE enquiries
ADD COLUMN insurance_no				INT,
ADD COLUMN insured_at				VARCHAR(128);

UPDATE db_version SET version ='01.09', version_date=CURRENT_DATE WHERE resource='Tables';


COMMIT;