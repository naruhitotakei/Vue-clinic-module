--############################################################
--# Create role table
--############################################################
CREATE TABLE IF NOT EXISTS prm_role (
   role_id                INT UNIQUE NOT NULL,
   role_name              VARCHAR(32) NOT NULL 
);

--############################################################
--# Create scope table
--############################################################
CREATE TABLE IF NOT EXISTS prm_scope (
   scope_id               INT UNIQUE NOT NULL,
   scope_name             VARCHAR(32) NOT NULL
);

--############################################################
--# Create permission table
--############################################################
CREATE TABLE IF NOT EXISTS prm_permission (
   permission_id          INT UNIQUE NOT NULL,
   resource_name          VARCHAR(32) NOT NULL,
   scope_id               INT CONSTRAINT permission_scope_fk REFERENCES prm_scope (scope_id) 
);

--############################################################
--# Create role_permission table
--############################################################
CREATE TABLE IF NOT EXISTS prm_role_permission (
   role_permission_id     INT UNIQUE NOT NULL,
   role_id                INT NOT NULL CONSTRAINT role_permission_role_fk REFERENCES prm_role (role_id),
   permission_id          INT NOT NULL CONSTRAINT role_permission_permission_fk REFERENCES prm_permission (permission_id)
);

--############################################################
--# add prm_role to  users
--############################################################
ALTER TABLE users ADD COLUMN prm_role_id INT
CONSTRAINT users_prm_role_fk REFERENCES prm_role (role_id);

--############################################################
--# fill tables
--############################################################
INSERT INTO prm_role (role_id, role_name) VALUES (1, 'Manager');
INSERT INTO prm_role (role_id, role_name) VALUES (2, 'Admin');
INSERT INTO prm_role (role_id, role_name) VALUES (3, 'Caller');
INSERT INTO prm_role (role_id, role_name) VALUES (4, 'Doctor');
INSERT INTO prm_role (role_id, role_name) VALUES (5, 'Superdoctor');
INSERT INTO prm_role (role_id, role_name) VALUES (6, 'Technician');
INSERT INTO prm_role (role_id, role_name) VALUES (7, 'Nurse');
INSERT INTO prm_role (role_id, role_name) VALUES (8, 'SuperNurse');

INSERT INTO prm_scope (scope_id, scope_name) VALUES (1, 'All');
INSERT INTO prm_scope (scope_id, scope_name) VALUES (2, 'Client');
INSERT INTO prm_scope (scope_id, scope_name) VALUES (3, 'Assigned');
INSERT INTO prm_scope (scope_id, scope_name) VALUES (4, 'Self');
INSERT INTO prm_scope (scope_id, scope_name) VALUES (5, 'AllNurses');

INSERT INTO prm_permission (permission_id, resource_name, scope_id) VALUES (11, 'Home', 1);
INSERT INTO prm_permission (permission_id, resource_name, scope_id) VALUES (12, 'Home', 2);
INSERT INTO prm_permission (permission_id, resource_name, scope_id) VALUES (13, 'Home', 3);
INSERT INTO prm_permission (permission_id, resource_name, scope_id) VALUES (14, 'Home', 4);
INSERT INTO prm_permission (permission_id, resource_name, scope_id) VALUES (15, 'Home', 5);
INSERT INTO prm_permission (permission_id, resource_name, scope_id) VALUES (21, 'Calendar', 1);
INSERT INTO prm_permission (permission_id, resource_name, scope_id) VALUES (22, 'Calendar', 2);
INSERT INTO prm_permission (permission_id, resource_name, scope_id) VALUES (23, 'Calendar', 3);
INSERT INTO prm_permission (permission_id, resource_name, scope_id) VALUES (24, 'Calendar', 4);
INSERT INTO prm_permission (permission_id, resource_name, scope_id) VALUES (25, 'Calendar', 5);
INSERT INTO prm_permission (permission_id, resource_name, scope_id) VALUES (31, 'Enquiries', 1);
INSERT INTO prm_permission (permission_id, resource_name, scope_id) VALUES (32, 'Enquiries', 2);
INSERT INTO prm_permission (permission_id, resource_name, scope_id) VALUES (33, 'Enquiries', 3);
INSERT INTO prm_permission (permission_id, resource_name, scope_id) VALUES (34, 'Enquiries', 4);
INSERT INTO prm_permission (permission_id, resource_name, scope_id) VALUES (35, 'Enquiries', 5);
INSERT INTO prm_permission (permission_id, resource_name, scope_id) VALUES (41, 'Invoices', 1);
INSERT INTO prm_permission (permission_id, resource_name, scope_id) VALUES (42, 'Invoices', 2);
INSERT INTO prm_permission (permission_id, resource_name, scope_id) VALUES (43, 'Invoices', 3);
INSERT INTO prm_permission (permission_id, resource_name, scope_id) VALUES (44, 'Invoices', 4);
INSERT INTO prm_permission (permission_id, resource_name, scope_id) VALUES (45, 'Invoices', 5);
INSERT INTO prm_permission (permission_id, resource_name, scope_id) VALUES (51, 'Offers', 1);
INSERT INTO prm_permission (permission_id, resource_name, scope_id) VALUES (52, 'Offers', 2);
INSERT INTO prm_permission (permission_id, resource_name, scope_id) VALUES (53, 'Offers', 3);
INSERT INTO prm_permission (permission_id, resource_name, scope_id) VALUES (54, 'Offers', 4);
INSERT INTO prm_permission (permission_id, resource_name, scope_id) VALUES (55, 'Offers', 5);
INSERT INTO prm_permission (permission_id, resource_name, scope_id) VALUES (61, 'AdvInvoices', 1);
INSERT INTO prm_permission (permission_id, resource_name, scope_id) VALUES (62, 'AdvInvoices', 2);
INSERT INTO prm_permission (permission_id, resource_name, scope_id) VALUES (63, 'AdvInvoices', 3);
INSERT INTO prm_permission (permission_id, resource_name, scope_id) VALUES (64, 'AdvInvoices', 4);
INSERT INTO prm_permission (permission_id, resource_name, scope_id) VALUES (65, 'AdvInvoices', 5);
INSERT INTO prm_permission (permission_id, resource_name, scope_id) VALUES (71, 'Assignments', 1);
INSERT INTO prm_permission (permission_id, resource_name, scope_id) VALUES (72, 'Assignments', 2);
INSERT INTO prm_permission (permission_id, resource_name, scope_id) VALUES (73, 'Assignments', 3);
INSERT INTO prm_permission (permission_id, resource_name, scope_id) VALUES (74, 'Assignments', 4);
INSERT INTO prm_permission (permission_id, resource_name, scope_id) VALUES (75, 'Assignments', 5);
INSERT INTO prm_permission (permission_id, resource_name, scope_id) VALUES (81, 'StatisticsClinic', 1);
INSERT INTO prm_permission (permission_id, resource_name, scope_id) VALUES (82, 'StatisticsClinic', 2);
INSERT INTO prm_permission (permission_id, resource_name, scope_id) VALUES (83, 'StatisticsClinic', 3);
INSERT INTO prm_permission (permission_id, resource_name, scope_id) VALUES (84, 'StatisticsClinic', 4);
INSERT INTO prm_permission (permission_id, resource_name, scope_id) VALUES (85, 'StatisticsClinic', 5);
INSERT INTO prm_permission (permission_id, resource_name, scope_id) VALUES (91, 'StatisticsPerson', 1);
INSERT INTO prm_permission (permission_id, resource_name, scope_id) VALUES (92, 'StatisticsPerson', 2);
INSERT INTO prm_permission (permission_id, resource_name, scope_id) VALUES (93, 'StatisticsPerson', 3);
INSERT INTO prm_permission (permission_id, resource_name, scope_id) VALUES (94, 'StatisticsPerson', 4);
INSERT INTO prm_permission (permission_id, resource_name, scope_id) VALUES (95, 'StatisticsPerson', 5);
INSERT INTO prm_permission (permission_id, resource_name, scope_id) VALUES (101, 'AccountingEmazing', 1);
INSERT INTO prm_permission (permission_id, resource_name, scope_id) VALUES (102, 'AccountingEmazing', 2);
INSERT INTO prm_permission (permission_id, resource_name, scope_id) VALUES (103, 'AccountingEmazing', 3);
INSERT INTO prm_permission (permission_id, resource_name, scope_id) VALUES (104, 'AccountingEmazing', 4);
INSERT INTO prm_permission (permission_id, resource_name, scope_id) VALUES (105, 'AccountingEmazing', 5);
INSERT INTO prm_permission (permission_id, resource_name, scope_id) VALUES (111, 'AccountingDoctor', 1);
INSERT INTO prm_permission (permission_id, resource_name, scope_id) VALUES (112, 'AccountingDoctor', 2);
INSERT INTO prm_permission (permission_id, resource_name, scope_id) VALUES (113, 'AccountingDoctor', 3);
INSERT INTO prm_permission (permission_id, resource_name, scope_id) VALUES (114, 'AccountingDoctor', 4);
INSERT INTO prm_permission (permission_id, resource_name, scope_id) VALUES (115, 'AccountingDoctor', 5);
INSERT INTO prm_permission (permission_id, resource_name, scope_id) VALUES (121, 'ServicesProducts', 1);
INSERT INTO prm_permission (permission_id, resource_name, scope_id) VALUES (122, 'ServicesProducts', 2);
INSERT INTO prm_permission (permission_id, resource_name, scope_id) VALUES (123, 'ServicesProducts', 3);
INSERT INTO prm_permission (permission_id, resource_name, scope_id) VALUES (124, 'ServicesProducts', 4);
INSERT INTO prm_permission (permission_id, resource_name, scope_id) VALUES (125, 'ServicesProducts', 5);
INSERT INTO prm_permission (permission_id, resource_name, scope_id) VALUES (131, 'Users', 1);
INSERT INTO prm_permission (permission_id, resource_name, scope_id) VALUES (132, 'Users', 2);
INSERT INTO prm_permission (permission_id, resource_name, scope_id) VALUES (133, 'Users', 3);
INSERT INTO prm_permission (permission_id, resource_name, scope_id) VALUES (134, 'Users', 4);
INSERT INTO prm_permission (permission_id, resource_name, scope_id) VALUES (135, 'Users', 5);

-- Manager - all resources all
INSERT INTO prm_role_permission (role_permission_id, role_id, permission_id) VALUES (101, 1, 11);
INSERT INTO prm_role_permission (role_permission_id, role_id, permission_id) VALUES (102, 1, 21);
INSERT INTO prm_role_permission (role_permission_id, role_id, permission_id) VALUES (103, 1, 31);
INSERT INTO prm_role_permission (role_permission_id, role_id, permission_id) VALUES (104, 1, 41);
INSERT INTO prm_role_permission (role_permission_id, role_id, permission_id) VALUES (105, 1, 51);
INSERT INTO prm_role_permission (role_permission_id, role_id, permission_id) VALUES (106, 1, 61);
INSERT INTO prm_role_permission (role_permission_id, role_id, permission_id) VALUES (107, 1, 71);
INSERT INTO prm_role_permission (role_permission_id, role_id, permission_id) VALUES (108, 1, 81);
INSERT INTO prm_role_permission (role_permission_id, role_id, permission_id) VALUES (109, 1, 91);
INSERT INTO prm_role_permission (role_permission_id, role_id, permission_id) VALUES (110, 1, 101);
INSERT INTO prm_role_permission (role_permission_id, role_id, permission_id) VALUES (111, 1, 111);
INSERT INTO prm_role_permission (role_permission_id, role_id, permission_id) VALUES (112, 1, 121);
INSERT INTO prm_role_permission (role_permission_id, role_id, permission_id) VALUES (113, 1, 131);
-- Admin - services, users all
INSERT INTO prm_role_permission (role_permission_id, role_id, permission_id) VALUES (202, 2, 121);
INSERT INTO prm_role_permission (role_permission_id, role_id, permission_id) VALUES (203, 2, 131);
-- Caller
INSERT INTO prm_role_permission (role_permission_id, role_id, permission_id) VALUES (301, 3, 11);
INSERT INTO prm_role_permission (role_permission_id, role_id, permission_id) VALUES (302, 3, 21);
INSERT INTO prm_role_permission (role_permission_id, role_id, permission_id) VALUES (303, 3, 31);
-- Doctor
INSERT INTO prm_role_permission (role_permission_id, role_id, permission_id) VALUES (401, 4, 11);
INSERT INTO prm_role_permission (role_permission_id, role_id, permission_id) VALUES (402, 4, 21);
INSERT INTO prm_role_permission (role_permission_id, role_id, permission_id) VALUES (403, 4, 31);
INSERT INTO prm_role_permission (role_permission_id, role_id, permission_id) VALUES (404, 4, 44);
INSERT INTO prm_role_permission (role_permission_id, role_id, permission_id) VALUES (405, 4, 54);
INSERT INTO prm_role_permission (role_permission_id, role_id, permission_id) VALUES (406, 4, 64);
INSERT INTO prm_role_permission (role_permission_id, role_id, permission_id) VALUES (407, 4, 74);
INSERT INTO prm_role_permission (role_permission_id, role_id, permission_id) VALUES (409, 4, 91);
INSERT INTO prm_role_permission (role_permission_id, role_id, permission_id) VALUES (411, 4, 114);
INSERT INTO prm_role_permission (role_permission_id, role_id, permission_id) VALUES (412, 4, 121);
-- SuperDoctor
INSERT INTO prm_role_permission (role_permission_id, role_id, permission_id) VALUES (501, 5, 11);
INSERT INTO prm_role_permission (role_permission_id, role_id, permission_id) VALUES (502, 5, 21);
INSERT INTO prm_role_permission (role_permission_id, role_id, permission_id) VALUES (503, 5, 31);
INSERT INTO prm_role_permission (role_permission_id, role_id, permission_id) VALUES (504, 5, 44);
INSERT INTO prm_role_permission (role_permission_id, role_id, permission_id) VALUES (505, 5, 54);
INSERT INTO prm_role_permission (role_permission_id, role_id, permission_id) VALUES (506, 5, 64);
INSERT INTO prm_role_permission (role_permission_id, role_id, permission_id) VALUES (507, 5, 71);
INSERT INTO prm_role_permission (role_permission_id, role_id, permission_id) VALUES (509, 5, 91);
INSERT INTO prm_role_permission (role_permission_id, role_id, permission_id) VALUES (511, 5, 114);
INSERT INTO prm_role_permission (role_permission_id, role_id, permission_id) VALUES (512, 5, 121);
-- Technician
INSERT INTO prm_role_permission (role_permission_id, role_id, permission_id) VALUES (601, 6, 11);
INSERT INTO prm_role_permission (role_permission_id, role_id, permission_id) VALUES (603, 6, 34);
INSERT INTO prm_role_permission (role_permission_id, role_id, permission_id) VALUES (607, 6, 74);
-- Nurse
INSERT INTO prm_role_permission (role_permission_id, role_id, permission_id) VALUES (701, 7, 11);
INSERT INTO prm_role_permission (role_permission_id, role_id, permission_id) VALUES (702, 7, 21);
INSERT INTO prm_role_permission (role_permission_id, role_id, permission_id) VALUES (703, 7, 31);
INSERT INTO prm_role_permission (role_permission_id, role_id, permission_id) VALUES (707, 7, 74);
-- SuperNurse
INSERT INTO prm_role_permission (role_permission_id, role_id, permission_id) VALUES (801, 8, 11);
INSERT INTO prm_role_permission (role_permission_id, role_id, permission_id) VALUES (802, 8, 21);
INSERT INTO prm_role_permission (role_permission_id, role_id, permission_id) VALUES (803, 8, 31);
INSERT INTO prm_role_permission (role_permission_id, role_id, permission_id) VALUES (804, 8, 41);
INSERT INTO prm_role_permission (role_permission_id, role_id, permission_id) VALUES (805, 8, 51);
INSERT INTO prm_role_permission (role_permission_id, role_id, permission_id) VALUES (806, 8, 61);
INSERT INTO prm_role_permission (role_permission_id, role_id, permission_id) VALUES (807, 8, 75);


--############################################################
--# update version
--############################################################
UPDATE db_version SET version ='01.01' WHERE resource='Tables';


COMMIT;
