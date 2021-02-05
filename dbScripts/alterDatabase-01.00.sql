############################################################
# Create version table
############################################################
CREATE TABLE IF NOT EXISTS db_version (
   resource               VARCHAR(64) UNIQUE NOT NULL,
   version                VARCHAR(16) NOT NULL,
   version_date           DATE NOT NULL DEFAULT CURRENT_DATE 
);

INSERT INTO db_version (resource, version) VALUES ('Tables', '01.00', CURRENT_DATE);

############################################################
# Create lead_owner table and add FK to enquiries
############################################################
CREATE TABLE IF NOT EXISTS lead_owner (
   lead_owner_id          INT UNIQUE NOT NULL,
   lead_owner             VARCHAR(16) NOT NULL,
   lead_owner_description VARCHAR(256) NOT NULL,
   date_created           DATE NOT NULL DEFAULT CURRENT_DATE  
);

INSERT INTO lead_owner (lead_owner_id, lead_owner) VALUES (0,'Undefined');

ALTER TABLE enquiries ADD COLUMN lead_owner_id INT NOT NULL DEFAULT 0,
CONSTRAINT enquiries_leadowner_fk REFERENCES lead_owner (lead_owner_id)
ON UPDATE CASCADE ON DELETE CASCADE;
