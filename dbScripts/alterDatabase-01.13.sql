ALTER TABLE prm_invoice_item ADD CONSTRAINT prm_invoice_item_id PRIMARY KEY (id);

ALTER TABLE invoice ADD COLUMN item_id INT
CONSTRAINT invoice_prm_invoice_item_fk REFERENCES prm_invoice_item (id);

--############################################################
--# Renaming prm_invoice_item table
--############################################################

ALTER TABLE prm_invoice_item RENAME TO invoice_item;

--############################################################
--# Editing prm_product table
--############################################################

ALTER TABLE prm_product DROP COLUMN taxable_amount;

--############################################################
--# Creating prm_product_translation table
--############################################################

CREATE TABLE IF NOT EXISTS prm_product_translation (
	id SERIAL,
	product_id		INT CONSTRAINT prm_product_translations_prm_product REFERENCES prm_product (product_id),
	english			VARCHAR(256),
	italian			VARCHAR(256),
	german			VARCHAR(256),
	created_date	DATE NOT NULL DEFAULT CURRENT_DATE 
);

ALTER TABLE prm_product_translation ADD CONSTRAINT prm_product_translation_pk PRIMARY KEY (id);

ALTER TABLE prm_product_translation RENAME TO prm_product_name;
ALTER TABLE prm_product_name DROP COLUMN english;
ALTER TABLE prm_product_name DROP COLUMN italian;
ALTER TABLE prm_product_name DROP COLUMN german;
ALTER TABLE prm_product_name ADD COLUMN language VARCHAR(8);
ALTER TABLE prm_product_name ADD COLUMN text VARCHAR(128);

INSERT INTO prm_product_name (language, text, product_id) VALUES
('sl','Stomatološki pregled', (SELECT product_id FROM prm_product WHERE product_name='Stomatološki pregled')),                                                                                                                                     
('sl','Kratek stomatološki pregled', (SELECT product_id FROM prm_product WHERE product_name='Kratek stomatološki pregled')),                                                                                                                       
('sl','CRM pregled', (SELECT product_id FROM prm_product WHERE product_name='CRM pregled')),                                                                                                                                                       
('sl','Odstranitev trdih in mehkih oblog po loku', (SELECT product_id FROM prm_product WHERE product_name='Odstranitev trdih in mehkih oblog po loku')),                                                                                           
('sl','Peskanje po loku', (SELECT product_id FROM prm_product WHERE product_name='Peskanje po loku')),                                                                                                                                             
('sl','Erozija', (SELECT product_id FROM prm_product WHERE product_name='Erozija')),                                                                                                                                                               
('sl','Zalivka po eni ploskvi', (SELECT product_id FROM prm_product WHERE product_name='Zalivka po eni ploskvi')),                                                                                                                                 
('sl','Zalivka na dveh ploskvah', (SELECT product_id FROM prm_product WHERE product_name='Zalivka na dveh ploskvah')),                                                                                                                             
('sl','Zalivka na treh ploskvah', (SELECT product_id FROM prm_product WHERE product_name='Zalivka na treh ploskvah')),                                                                                                                             
('sl','Dograditev zoba', (SELECT product_id FROM prm_product WHERE product_name='Dograditev zoba')),                                                                                                                                               
('sl','Koferdam', (SELECT product_id FROM prm_product WHERE product_name='Koferdam')),                                                                                                                                                             
('sl','Zalitje fisur', (SELECT product_id FROM prm_product WHERE product_name='Zalitje fisur')),                                                                                                                                                   
('sl','Zdravljenje gangrene in polnitev po kanalu', (SELECT product_id FROM prm_product WHERE product_name='Zdravljenje gangrene in polnitev po kanalu')),                                                                                         
('sl','Ponovno zdravljenje po kanalu', (SELECT product_id FROM prm_product WHERE product_name='Ponovno zdravljenje po kanalu')),                                                                                                                   
('sl','Zdravilo s provizorično plombo', (SELECT product_id FROM prm_product WHERE product_name='Zdravilo s provizorično plombo')),                                                                                                                 
('sl','Direktno kritje pulpe', (SELECT product_id FROM prm_product WHERE product_name='Direktno kritje pulpe')),                                                                                                                                   
('sl','Trepanacija pulpnega kanala', (SELECT product_id FROM prm_product WHERE product_name='Trepanacija pulpnega kanala')),                                                                                                                       
('sl','Anestezija', (SELECT product_id FROM prm_product WHERE product_name='Anestezija')),                                                                                                                                                         
('sl','Ekstrakcija majavega zoba', (SELECT product_id FROM prm_product WHERE product_name='Ekstrakcija majavega zoba')),                                                                                                                           
('sl','Ekstrakcija enokoreninskega zoba', (SELECT product_id FROM prm_product WHERE product_name='Ekstrakcija enokoreninskega zoba')),                                                                                                             
('sl','Ekstrakcija večkoreninskega zoba', (SELECT product_id FROM prm_product WHERE product_name='Ekstrakcija večkoreninskega zoba')),                                                                                                             
('sl','Kirurška ekstrakcija', (SELECT product_id FROM prm_product WHERE product_name='Kirurška ekstrakcija')),                                                                                                                                     
('sl','Izkles zoba', (SELECT product_id FROM prm_product WHERE product_name='Izkles zoba')),                                                                                                                                                       
('sl','Apikotomija ene korenine', (SELECT product_id FROM prm_product WHERE product_name='Apikotomija ene korenine')),                                                                                                                             
('sl','Apikotomija dveh korenin', (SELECT product_id FROM prm_product WHERE product_name='Apikotomija dveh korenin')),                                                                                                                             
('sl','Apikotomija treh korenin', (SELECT product_id FROM prm_product WHERE product_name='Apikotomija treh korenin')),                                                                                                                             
('sl','Reženjska operacija kvadrant', (SELECT product_id FROM prm_product WHERE product_name='Reženjska operacija kvadrant')),                                                                                                                     
('sl','Podaljšanje klinične krone', (SELECT product_id FROM prm_product WHERE product_name='Podaljšanje klinične krone')),                                                                                                                         
('sl','Paradontološko zdravljenje', (SELECT product_id FROM prm_product WHERE product_name='Paradontološko zdravljenje')),                                                                                                                         
('sl','Paradontološko zdravljenje - laser', (SELECT product_id FROM prm_product WHERE product_name='Paradontološko zdravljenje - laser')),                                                                                                         
('sl','Zaprti dvig sinusa', (SELECT product_id FROM prm_product WHERE product_name='Zaprti dvig sinusa')),                                                                                                                                         
('sl','Odprti dvig sinusa', (SELECT product_id FROM prm_product WHERE product_name='Odprti dvig sinusa')),                                                                                                                                         
('sl','Manjša dograditev s kostnim nadomestkom', (SELECT product_id FROM prm_product WHERE product_name='Manjša dograditev s kostnim nadomestkom')),                                                                                               
('sl','Dograditev s kostnim nadomestkom in membrano', (SELECT product_id FROM prm_product WHERE product_name='Dograditev s kostnim nadomestkom in membrano')),                                                                                     
('sl','Prosti kostni transplantat', (SELECT product_id FROM prm_product WHERE product_name='Prosti kostni transplantat')),                                                                                                                               
('sl','Vstavitev implantata', (SELECT product_id FROM prm_product WHERE product_name='Vstavitev implantata')),                                                                                                                                   
('sl','Keramična prevleka', (SELECT product_id FROM prm_product WHERE product_name='Keramična prevleka')),                                                                                                                                         
('sl','Zirconijeva prevleka', (SELECT product_id FROM prm_product WHERE product_name='Zirconijeva prevleka')),                                                                                                                                     
('sl','Zirconijev inlay', (SELECT product_id FROM prm_product WHERE product_name='Zirconijev inlay')),                                                                                                                                             
('sl','Keramični inlay', (SELECT product_id FROM prm_product WHERE product_name='Keramični inlay')),                                                                                                                                               
('sl','Kompozitni inlay', (SELECT product_id FROM prm_product WHERE product_name='Kompozitni inlay')),                                                                                                                                             
('sl','Zirconijeva faseta', (SELECT product_id FROM prm_product WHERE product_name='Zirconijeva faseta')),                                                                                                                                         
('sl','Keramična faseta', (SELECT product_id FROM prm_product WHERE product_name='Keramična faseta')),                                                                                                                                             
('sl','Kompozitna faseta', (SELECT product_id FROM prm_product WHERE product_name='Kompozitna faseta')),                                                                                                                                           
('sl','Abutment + zirconijeva prevleka', (SELECT product_id FROM prm_product WHERE product_name='Abutment + zirconijeva prevleka')),                                                                                                               
('sl','4 implantati + zirconijev most', (SELECT product_id FROM prm_product WHERE product_name='4 implantati + zirconijev most')),                                                                                                                 
('sl','5 implantanov + zirconijev most', (SELECT product_id FROM prm_product WHERE product_name='5 implantanov + zirconijev most')),                                                                                                               
('sl','2 implantata + totalna proteza', (SELECT product_id FROM prm_product WHERE product_name='2 implantata + totalna proteza')),                                                                                                                 
('sl','4 implantanti + totalna proteza', (SELECT product_id FROM prm_product WHERE product_name='4 implantanti + totalna proteza')),                                                                                                               
('sl','2 implantata + 4 zirconijeve prevleke + parcialna proteza', (SELECT product_id FROM prm_product WHERE product_name='2 implantata + 4 zirconijeve prevleke + parcialna proteza')),                                                           
('sl','Rdeča keramika po zobu', (SELECT product_id FROM prm_product WHERE product_name='Rdeča keramika po zobu')),                                                                                                                                 
('sl','FRC nazidek', (SELECT product_id FROM prm_product WHERE product_name='FRC nazidek')),                                                                                                                                                       
('sl','Zirkonijev nazidek', (SELECT product_id FROM prm_product WHERE product_name='Zirkonijev nazidek')),                                                                                                                                         
('sl','Provizorična prevleka', (SELECT product_id FROM prm_product WHERE product_name='Provizorična prevleka')),                                                                                                                                   
('sl','Demontaža po zobu', (SELECT product_id FROM prm_product WHERE product_name='Demontaža po zobu')),                                                                                                                                           
('sl','Totalna proteza', (SELECT product_id FROM prm_product WHERE product_name='Totalna proteza')),                                                                                                                                               
('sl','Parcialna proteza z ulito bazo', (SELECT product_id FROM prm_product WHERE product_name='Parcialna proteza z ulito bazo')),                                                                                                                 
('sl','Indirektna podložitev', (SELECT product_id FROM prm_product WHERE product_name='Indirektna podložitev')),                                                                                                                                   
('sl','Direktna podložitev', (SELECT product_id FROM prm_product WHERE product_name='Direktna podložitev')),                                                                                                                                       
('sl','Osnovna reparatura', (SELECT product_id FROM prm_product WHERE product_name='Osnovna reparatura')),                                                                                                                                         
('sl','Dodatni element', (SELECT product_id FROM prm_product WHERE product_name='Dodatni element')),                                                                                                                                               
('sl','Imediatna proteza', (SELECT product_id FROM prm_product WHERE product_name='Imediatna proteza')),                                                                                                                                           
('sl','Imediatna proteza z zaponami', (SELECT product_id FROM prm_product WHERE product_name='Imediatna proteza z zaponami')),                                                                                                                     
('sl','Žabica', (SELECT product_id FROM prm_product WHERE product_name='Žabica')),                                                                                                                                                                 
('sl','Vbrizgavanje hialurona 1 ml', (SELECT product_id FROM prm_product WHERE product_name='Vbrizgavanje hialurona 1 ml')),                                                                                                                       
('sl','Beljenje zob brez šablon 3x15 min', (SELECT product_id FROM prm_product WHERE product_name='Beljenje zob brez šablon 3x15 min')),                                                                                                           
('sl','Beljenje zob + šablone', (SELECT product_id FROM prm_product WHERE product_name='Beljenje zob + šablone')),                                                                                                                                 
('sl','Opornica', (SELECT product_id FROM prm_product WHERE product_name='Opornica')),                                                                                                                                                             
('sl','Ščitnik', (SELECT product_id FROM prm_product WHERE product_name='Ščitnik')),                                                                                                                                                               
('sl','Cbct 1', (SELECT product_id FROM prm_product WHERE product_name='Cbct 1')),                                                                                                                                                                 
('sl','Cbct 2', (SELECT product_id FROM prm_product WHERE product_name='Cbct 2')),                                                                                                                                                                 
('sl','Cbct 3', (SELECT product_id FROM prm_product WHERE product_name='Cbct 3')),                                                                                                                                                                 
('sl','Ortopan', (SELECT product_id FROM prm_product WHERE product_name='Ortopan')),                                                                                                                                                               
('sl','Rtg lokalno', (SELECT product_id FROM prm_product WHERE product_name='Rtg lokalno')),                                                                                                                                                       
('sl','Higiena - opalescence', (SELECT product_id FROM prm_product WHERE product_name='Higiena - opalescence')),                                                                                                                                   
('sl','Higiena - bluem', (SELECT product_id FROM prm_product WHERE product_name='Higiena - bluem')),                                                                                                                                               
('sl','Higiena - corega', (SELECT product_id FROM prm_product WHERE product_name='Higiena - corega')),                                                                                                                                             
('sl','Optragate', (SELECT product_id FROM prm_product WHERE product_name='Optragate')),                                                                                                                                                           
('sl','Zagozda', (SELECT product_id FROM prm_product WHERE product_name='Zagozda')),                                                                                                                                                               
('sl','Menjava teflona', (SELECT product_id FROM prm_product WHERE product_name='Menjava teflona')),                                                                                                                                               
('sl','Vstavitev implanta, abutment zirconij prevleka', (SELECT product_id FROM prm_product WHERE product_name='Vstavitev implanta, abutment zirconij prevleka')),                                                                                 
('sl','Odtis, funkcijska žlica, pregled', (SELECT product_id FROM prm_product WHERE product_name='Odtis, funkcijska žlica, pregled')),                                                                                                             
('sl','Beljenje posameznega zoba', (SELECT product_id FROM prm_product WHERE product_name='Beljenje posameznega zoba')),                                                                                                                           
('sl','Recept', (SELECT product_id FROM prm_product WHERE product_name='Recept')),                                                                                                                                                                 
('sl','Viscostat', (SELECT product_id FROM prm_product WHERE product_name='Viscostat')),                                                                                                                                                           
('sl','Opalescence 16%', (SELECT product_id FROM prm_product WHERE product_name='Opalescence 16%')),                                                                                                                                               
('sl','Čiščenje kamna na protezi', (SELECT product_id FROM prm_product WHERE product_name='Čiščenje kamna na protezi')),                                                                                                                           
('sl','Kiretaža žepa po zobu', (SELECT product_id FROM prm_product WHERE product_name='Kiretaža žepa po zobu')),                                                                                                                                   
('sl','Penali za nejavljeno odsotnost', (SELECT product_id FROM prm_product WHERE product_name='Penali za nejavljeno odsotnost')),                                                                                                                 
('sl','Voltfast 50 mg - 3x prašek', (SELECT product_id FROM prm_product WHERE product_name='Voltfast 50 mg - 3x prašek')),                                                                                                                         
('sl','Oki 80 mg granule - 2x prašek', (SELECT product_id FROM prm_product WHERE product_name='Oki 80 mg granule - 2x prašek')),                                                                                                                   
('sl','Augmentin 875/125mg', (SELECT product_id FROM prm_product WHERE product_name='Augmentin 875/125mg')),                                                                                                                                       
('sl','Sumamed 500mg', (SELECT product_id FROM prm_product WHERE product_name='Sumamed 500mg')),                                                                                                                                                   
('sl','Amoksiklav 1000mg tbl', (SELECT product_id FROM prm_product WHERE product_name='Amoksiklav 1000mg tbl')),                                                                                                                                   
('sl','Klimicin 300mg kaps', (SELECT product_id FROM prm_product WHERE product_name='Klimicin 300mg kaps')),                                                                                                                                       
('sl','GM ključ', (SELECT product_id FROM prm_product WHERE product_name='GM ključ')),                                                                                                                                                             
('sl','Pregled + odtis zobni aparat', (SELECT product_id FROM prm_product WHERE product_name='Pregled + odtis zobni aparat')),                                                                                                                     
('sl','Opornica invisalign', (SELECT product_id FROM prm_product WHERE product_name='Opornica invisalign')),                                                                                                                                       
('sl','Snemna plošča', (SELECT product_id FROM prm_product WHERE product_name='Snemna plošča')),                                                                                                                                                   
('sl','Retencijska žička', (SELECT product_id FROM prm_product WHERE product_name='Retencijska žička')),                                                                                                                                           
('sl','Retencijska žička - leplenje', (SELECT product_id FROM prm_product WHERE product_name='Retencijska žička - leplenje')),                                                                                                                     
('sl','Beljenje 15 min', (SELECT product_id FROM prm_product WHERE product_name='Beljenje 15 min')),                                                                                                                                               
('sl','Provizorij 1', (SELECT product_id FROM prm_product WHERE product_name='Provizorij 1')),                                                                                                                                                     
('sl','Provizorij 2', (SELECT product_id FROM prm_product WHERE product_name='Provizorij 2')),                                                                                                                                                     
('sl','Odstranitev šivov po zobu', (SELECT product_id FROM prm_product WHERE product_name='Odstranitev šivov po zobu')),                                                                                                                           
('sl','Začasni maryland most', (SELECT product_id FROM prm_product WHERE product_name='Začasni maryland most')),                                                                                                                                   
('sl','Individualni zirkonijev abutment', (SELECT product_id FROM prm_product WHERE product_name='Individualni zirkonijev abutment')),                                                                                                             
('sl','Recept voltfast', (SELECT product_id FROM prm_product WHERE product_name='Recept voltfast')),                                                                                                                                               
('sl','Zdravljenje dlesni', (SELECT product_id FROM prm_product WHERE product_name='Zdravljenje dlesni')),                                                                                                                                         
('sl','Zobni nakit', (SELECT product_id FROM prm_product WHERE product_name='Zobni nakit')),                                                                                                                                                       
('sl','Materialni stroški', (SELECT product_id FROM prm_product WHERE product_name='Materialni stroški')),                                                                                                                                         
('sl','Fasetiranje', (SELECT product_id FROM prm_product WHERE product_name='Fasetiranje')),                                                                                                                                                       
('sl','Cementiranje starih kron/lusk', (SELECT product_id FROM prm_product WHERE product_name='Cementiranje starih kron/lusk')),                                                                                                                   
('sl','Brušenje zob (cena po zobu)', (SELECT product_id FROM prm_product WHERE product_name='Brušenje zob (cena po zobu)')),                                                                                                                       
('sl','Odstranjevanje fiksnega zobnega aparata (po zobu)', (SELECT product_id FROM prm_product WHERE product_name='Odstranjevanje fiksnega zobnega aparata (po zobu)')),                                                                           
('sl','6 implantov + zirconijev most', (SELECT product_id FROM prm_product WHERE product_name='6 implantov + zirconijev most')),                                                                                                                   
('sl','Incizija', (SELECT product_id FROM prm_product WHERE product_name='Incizija')),                                                                                                                                                             
('sl','Vstavitev strauman implantata, abutment, zirconijeva prevleka', (SELECT product_id FROM prm_product WHERE product_name='Vstavitev strauman implantata, abutment, zirconijeva prevleka')),                                                   
('sl','Strauman abutment + zirconijeva prevleka', (SELECT product_id FROM prm_product WHERE product_name='Strauman abutment + zirconijeva prevleka')),                                                                                             
('sl','Vstavitev strauman implantata', (SELECT product_id FROM prm_product WHERE product_name='Vstavitev strauman implantata')),                                                                                                                   
('sl','Strauman ind abutment + zirconijeva prevleka', (SELECT product_id FROM prm_product WHERE product_name='Strauman ind abutment + zirconijeva prevleka')),                                                                                     
('sl','Cirkonijeva prevleka + e-max', (SELECT product_id FROM prm_product WHERE product_name='Cirkonijeva prevleka + e-max')),                                                                                                                     
('sl','Zaustavitev krvavitve', (SELECT product_id FROM prm_product WHERE product_name='Zaustavitev krvavitve')),                                                                                                                                   
('sl','Strauman implantat zirconij', (SELECT product_id FROM prm_product WHERE product_name='Strauman implantat zirconij')),                                                                                                                       
('sl','Terapija z laserjem', (SELECT product_id FROM prm_product WHERE product_name='Terapija z laserjem')),                                                                                                                                       
('sl','Terapija (sulcusa) z laserjem', (SELECT product_id FROM prm_product WHERE product_name='Terapija (sulcusa) z laserjem')),                                                                                                                   
('sl','Test Covid - 19', (SELECT product_id FROM prm_product WHERE product_name='Test Covid - 19')),                                                                                                                                               
('sl','Provizorij na implantantu', (SELECT product_id FROM prm_product WHERE product_name='Provizorij na implantantu')),                                                                                                                           
('sl','Oki prašek - 30 vrečk', (SELECT product_id FROM prm_product WHERE product_name='Oki prašek - 30 vrečk')),                                                                                                                                   
('sl','4 implantanti + kompozitni most', (SELECT product_id FROM prm_product WHERE product_name='4 implantanti + kompozitni most')),                                                                                                               
('sl','5 implantov + kompozitni most', (SELECT product_id FROM prm_product WHERE product_name='5 implantov + kompozitni most')),                                                                                                                   
('sl','6 implantov + kompozitni most', (SELECT product_id FROM prm_product WHERE product_name='6 implantov + kompozitni most')),                                                                                                                   
('sl','Diapozitivi v ortodontiji', (SELECT product_id FROM prm_product WHERE product_name='Diapozitivi v ortodontiji')),                                                                                                                           
('sl','Ortod. konf. elem.- vratni teg', (SELECT product_id FROM prm_product WHERE product_name='Ortod. konf. elem.- vratni teg')),                                                                                                                 
('sl','Ortod. konf. elem.- obrazni lok', (SELECT product_id FROM prm_product WHERE product_name='Ortod. konf. elem.- obrazni lok')),                                                                                                               
('sl','3D funkcijska žlica', (SELECT product_id FROM prm_product WHERE product_name='3D funkcijska žlica')),                                                                                                                                       
('sl','3D printan krn', (SELECT product_id FROM prm_product WHERE product_name='3D printan krn')),                                                                                                                                                 
('sl','3D printan model', (SELECT product_id FROM prm_product WHERE product_name='3D printan model')),                                                                                                                                             
('sl','3D printana opornica', (SELECT product_id FROM prm_product WHERE product_name='3D printana opornica')),                                                                                                                                     
('sl','Cirkonijev nadzidek', (SELECT product_id FROM prm_product WHERE product_name='Cirkonijev nadzidek')),                                                                                                                                       
('sl','Cirkonijev vijačen implant na T-Base', (SELECT product_id FROM prm_product WHERE product_name='Cirkonijev vijačen implant na T-Base')),                                                                                                     
('sl','Cirkonijev vijačen implant na T-Base + e-max ceram', (SELECT product_id FROM prm_product WHERE product_name='Cirkonijev vijačen implant na T-Base + e-max ceram')),                                                                         
('sl','Cirkonijev zatiček', (SELECT product_id FROM prm_product WHERE product_name='Cirkonijev zatiček')),                                                                                                                                         
('sl','Cirkonijeva kapica', (SELECT product_id FROM prm_product WHERE product_name='Cirkonijeva kapica')),                                                                                                                                         
('sl','Cirkonijeva kapica + peka keramike', (SELECT product_id FROM prm_product WHERE product_name='Cirkonijeva kapica + peka keramike')),                                                                                                         
('sl','Cirkonijeva prevleka cut back', (SELECT product_id FROM prm_product WHERE product_name='Cirkonijeva prevleka cut back')),                                                                                                                   
('sl','Dodan zob v protezo', (SELECT product_id FROM prm_product WHERE product_name='Dodan zob v protezo')),                                                                                                                                       
('sl','Enostavna vlita kovinska baza (do 3 sidranj)', (SELECT product_id FROM prm_product WHERE product_name='Enostavna vlita kovinska baza (do 3 sidranj)')),                                                                                     
('sl','Estetska faseta', (SELECT product_id FROM prm_product WHERE product_name='Estetska faseta')),                                                                                                                                               
('sl','Estetska faseta z individualnim nanosom', (SELECT product_id FROM prm_product WHERE product_name='Estetska faseta z individualnim nanosom')),                                                                                               
('sl','Fasetirana prevleka nexco', (SELECT product_id FROM prm_product WHERE product_name='Fasetirana prevleka nexco')),                                                                                                                           
('sl','Fasetiranje prevleke', (SELECT product_id FROM prm_product WHERE product_name='Fasetiranje prevleke')),                                                                                                                                     
('sl','Gred', (SELECT product_id FROM prm_product WHERE product_name='Gred')),                                                                                                                                                                     
('sl','Grizna šablona', (SELECT product_id FROM prm_product WHERE product_name='Grizna šablona')),                                                                                                                    
('sl','Implant s polno keramiko (cirkonij)', (SELECT product_id FROM prm_product WHERE product_name='Implant s polno keramiko (cirkonij)')),                                                                                                       
('sl','Implant s polno keramiko (e-max)', (SELECT product_id FROM prm_product WHERE product_name='Implant s polno keramiko (e-max)')),                                                                                                             
('sl', 'Indirektna podložitev proteze', (SELECT product_id FROM prm_product WHERE product_name= 'Indirektna podložitev proteze')),                                                                                                                 
('sl','Individualna funkcijska žlica', (SELECT product_id FROM prm_product WHERE product_name='Individualna funkcijska žlica')),                                                                                                                   
('sl','Izgotovitev kovinske vlite baze', (SELECT product_id FROM prm_product WHERE product_name='Izgotovitev kovinske vlite baze')),                                                                                                               
('sl','Izgotovitev vlite baze', (SELECT product_id FROM prm_product WHERE product_name='Izgotovitev vlite baze')),                                                                                                                                 
('sl','Izlivanje študijskega modela', (SELECT product_id FROM prm_product WHERE product_name='Izlivanje študijskega modela')),                                                                                                                     
('sl','Kennedy zvezna opornica', (SELECT product_id FROM prm_product WHERE product_name='Kennedy zvezna opornica')),                                                                                                                               
('sl','Keramični inlay', (SELECT product_id FROM prm_product WHERE product_name='Keramični inlay')),                                                                                                                                               
('sl','Kirurško vodilo za implante', (SELECT product_id FROM prm_product WHERE product_name='Kirurško vodilo za implante')),                                                                                                                       
('sl','Komplicirana vlita baza (polzila, rezkanje, Richmond kapica..)', (SELECT product_id FROM prm_product WHERE product_name='Komplicirana vlita baza (polzila, rezkanje, Richmond kapica..)')),                                                 
('sl','Kompozitni inlay Nexco', (SELECT product_id FROM prm_product WHERE product_name='Kompozitni inlay Nexco')),                                                                                                                                 
('sl','Kovinsko porcelanska prevleka', (SELECT product_id FROM prm_product WHERE product_name='Kovinsko porcelanska prevleka')),                                                                                                                   
('sl','Labor impl Ankylos', (SELECT product_id FROM prm_product WHERE product_name='Labor impl Ankylos')),                                                                                                                                         
('sl','Labor impl Neodent', (SELECT product_id FROM prm_product WHERE product_name='Labor impl Neodent')),                                                                                                                                         
('sl','Lotanje po elementu', (SELECT product_id FROM prm_product WHERE product_name='Lotanje po elementu')),                                                                                                                                       
('sl','Material - Polzilo (A)', (SELECT product_id FROM prm_product WHERE product_name='Material - Polzilo (A)')),                                                                                                                                 
('sl','Material - Polzilo (B)', (SELECT product_id FROM prm_product WHERE product_name='Material - Polzilo (B)')),                                                                                                                                 
('sl','Modelacija ćlena v vliti bazi', (SELECT product_id FROM prm_product WHERE product_name='Modelacija ćlena v vliti bazi')),                                                                                                                   
('sl','Montaža polzil, sklepovnih vezi', (SELECT product_id FROM prm_product WHERE product_name='Montaža polzil, sklepovnih vezi')),                                                                                                               
('sl','Navosek po elementu', (SELECT product_id FROM prm_product WHERE product_name='Navosek po elementu')),                                                                                                                                       
('sl','Nazidek - direktna metoda', (SELECT product_id FROM prm_product WHERE product_name='Nazidek - direktna metoda')),                                                                                                                           
('sl','Nazidek - indirektna metoda', (SELECT product_id FROM prm_product WHERE product_name='Nazidek - indirektna metoda')),                                                                                                                       
('sl','Nexco na cirkonij', (SELECT product_id FROM prm_product WHERE product_name='Nexco na cirkonij')),                                                                                                                                           
('sl', 'Parcialna proteza', (SELECT product_id FROM prm_product WHERE product_name= 'Parcialna proteza')),                                                                                                                                         
('sl','Peka roza keramike', (SELECT product_id FROM prm_product WHERE product_name='Peka roza keramike')),                                                                                                                                         
('sl','Polna keramična prevleka', (SELECT product_id FROM prm_product WHERE product_name='Polna keramična prevleka')),                                                                                                                             
('sl','Polna kompozitna prevleka Nexco', (SELECT product_id FROM prm_product WHERE product_name='Polna kompozitna prevleka Nexco')),                                                                                                               
('sl','Polna kovinska prevleka', (SELECT product_id FROM prm_product WHERE product_name='Polna kovinska prevleka')),                                                                                                                               
('sl','Polni cirkonij na abatment', (SELECT product_id FROM prm_product WHERE product_name='Polni cirkonij na abatment')),                                                                                                                         
('sl','Polna cirkonijeva prevleka', (SELECT product_id FROM prm_product WHERE product_name='Polna cirkonijeva prevleka')),                                                                                                                         
('sl','Ponovna izdelava kovinskega ogrodja po kapici', (SELECT product_id FROM prm_product WHERE product_name='Ponovna izdelava kovinskega ogrodja po kapici')),                                                                                   
('sl','Ponovno glaziranje', (SELECT product_id FROM prm_product WHERE product_name='Ponovno glaziranje')),                                                                                                                                         
('sl','Postavitev implanta', (SELECT product_id FROM prm_product WHERE product_name='Postavitev implanta')),                                                                                                                                       
('sl','Prenosnik izdelan po abutmentu', (SELECT product_id FROM prm_product WHERE product_name='Prenosnik izdelan po abutmentu')),                                                                                                                 
('sl','Prešana keramična kapica + peka keramike', (SELECT product_id FROM prm_product WHERE product_name='Prešana keramična kapica + peka keramike')),                                                                                             
('sl','Provizorij prevleka', (SELECT product_id FROM prm_product WHERE product_name='Provizorij prevleka')),                                                                                                                                       
('sl','Ref-line Polident po loku', (SELECT product_id FROM prm_product WHERE product_name='Ref-line Polident po loku')),                                                                                                                           
('sl','Reparatura proteze (prelom)', (SELECT product_id FROM prm_product WHERE product_name='Reparatura proteze (prelom)')),                                                                                                                       
('sl','Rezkanje abutmenta', (SELECT product_id FROM prm_product WHERE product_name='Rezkanje abutmenta')),                                                                                                                                         
('sl','Rezkanje površin po elementu', (SELECT product_id FROM prm_product WHERE product_name='Rezkanje površin po elementu')),                                                                                                                     
('sl','Richmond kapica brez polzila', (SELECT product_id FROM prm_product WHERE product_name='Richmond kapica brez polzila')),                                                                                                                     
('sl','Totalna proteza', (SELECT product_id FROM prm_product WHERE product_name='Totalna proteza')),                                                                                                                                               
('sl','Totalna proteza - enostavna', (SELECT product_id FROM prm_product WHERE product_name='Totalna proteza - enostavna')),                                                                                                                       
('sl','Vgraditev posameznega elementa v reparaturi proteze', (SELECT product_id FROM prm_product WHERE product_name='Vgraditev posameznega elementa v reparaturi proteze')),                                                                       
('sl','Vizio line ivoclar po loku', (SELECT product_id FROM prm_product WHERE product_name='Vizio line ivoclar po loku')),                                                                                                                         
('sl','Vlita zapona', (SELECT product_id FROM prm_product WHERE product_name='Vlita zapona')),                                                                                                                                                     
('sl','Vratni nanos (Schulter masa)', (SELECT product_id FROM prm_product WHERE product_name='Vratni nanos (Schulter masa)')),                                                                                                                     
('sl','Žabica (postavitev do 4 zaporednih zob z zaponami)', (SELECT product_id FROM prm_product WHERE product_name='Žabica (postavitev do 4 zaporednih zob z zaponami)')),                                                                         
('sl','Fasetirana prevleka', (SELECT product_id FROM prm_product WHERE product_name='Fasetirana prevleka')),                                                                                                                                       
('sl','Totalna proteza 2', (SELECT product_id FROM prm_product WHERE product_name='Totalna proteza 2')),                                                                                                                                           
('sl','Medzobne ščetke CPS 06', (SELECT product_id FROM prm_product WHERE product_name='Medzobne ščetke CPS 06')),                                                                                                                                 
('sl','Medzobne ščetke CPS 07', (SELECT product_id FROM prm_product WHERE product_name='Medzobne ščetke CPS 07')),                                                                                                                                 
('sl','Medzobne ščetke CPS 08', (SELECT product_id FROM prm_product WHERE product_name='Medzobne ščetke CPS 08')),                                                                                                                                 
('sl','Medzobne ščetke CPS 09', (SELECT product_id FROM prm_product WHERE product_name='Medzobne ščetke CPS 09')),                                                                                                                                 
('sl','Medzobne ščetke CPS 011', (SELECT product_id FROM prm_product WHERE product_name='Medzobne ščetke CPS 011')),                                                                                                                               
('sl','Medzobne ščetke z držalom CPS 405', (SELECT product_id FROM prm_product WHERE product_name='Medzobne ščetke z držalom CPS 405')),                                                                                                           
('sl','Medzobne ščetke z držalom CPS 406', (SELECT product_id FROM prm_product WHERE product_name='Medzobne ščetke z držalom CPS 406')),                                                                                                           
('sl','Medzobne ščetke z držalom CPS 408', (SELECT product_id FROM prm_product WHERE product_name='Medzobne ščetke z držalom CPS 408')),                                                                                                           
('sl','Medzobne ščetke z držalom CPS 410', (SELECT product_id FROM prm_product WHERE product_name='Medzobne ščetke z držalom CPS 410')),                                                                                                           
('sl','Medzobne refill X 12 CPS 06', (SELECT product_id FROM prm_product WHERE product_name='Medzobne refill X 12 CPS 06')),                                                                                                                       
('sl','Medzobne refill X 12 CPS 07', (SELECT product_id FROM prm_product WHERE product_name='Medzobne refill X 12 CPS 07')),                                                                                                                       
('sl','Medzobne refill X 12 CPS 08', (SELECT product_id FROM prm_product WHERE product_name='Medzobne refill X 12 CPS 08')),                                                                                                                       
('sl','Medzobne refill X 12 CPS 09', (SELECT product_id FROM prm_product WHERE product_name='Medzobne refill X 12 CPS 09')),                                                                                                                       
('sl','Medzobne refill X 12 CPS 011', (SELECT product_id FROM prm_product WHERE product_name='Medzobne refill X 12 CPS 011')),                                                                                                                     
('sl','Medzobne pocket set 457', (SELECT product_id FROM prm_product WHERE product_name='Medzobne pocket set 457')),                                                                                                                               
('sl','Držalo alu. za medzobne UHS 410', (SELECT product_id FROM prm_product WHERE product_name='Držalo alu. za medzobne UHS 410')),                                                                                                               
('sl','Držalo alu. za medzobne UHS 411', (SELECT product_id FROM prm_product WHERE product_name='Držalo alu. za medzobne UHS 411')),                                                                                                               
('sl','Držalo alu. za medzobne UHS 413', (SELECT product_id FROM prm_product WHERE product_name='Držalo alu. za medzobne UHS 413')),                                                                                                               
('sl','Zobna nitka Curaprox teflon DF 820', (SELECT product_id FROM prm_product WHERE product_name='Zobna nitka Curaprox teflon DF 820')),                                                                                                         
('sl','Zobna nitka Jordan easy slide', (SELECT product_id FROM prm_product WHERE product_name='Zobna nitka Jordan easy slide')),                                                                                                                   
('sl','Zobna nitka Jordan expand', (SELECT product_id FROM prm_product WHERE product_name='Zobna nitka Jordan expand')),                                                                                                                           
('sl','Zobna nitka Jordan whitening', (SELECT product_id FROM prm_product WHERE product_name='Zobna nitka Jordan whitening')),                                                                                                                     
('sl','Zobna nitka Proxy soft 3 in 1', (SELECT product_id FROM prm_product WHERE product_name='Zobna nitka Proxy soft 3 in 1')),                                                                                                                   
('sl','Zobna nitka Proxy soft bridge & implant', (SELECT product_id FROM prm_product WHERE product_name='Zobna nitka Proxy soft bridge & implant')),                                                                                               
('sl','Zobna nitka Proxy soft periodontal', (SELECT product_id FROM prm_product WHERE product_name='Zobna nitka Proxy soft periodontal')),                                                                                                         
('sl','Strgalo za jezik CTC 203', (SELECT product_id FROM prm_product WHERE product_name='Strgalo za jezik CTC 203')),                                                                                                                             
('sl','Zobna ščetka Ultra soft CS 5460', (SELECT product_id FROM prm_product WHERE product_name='Zobna ščetka Ultra soft CS 5460')),                                                                                                               
('sl','Zobna ščetka Ultra soft CS 3960', (SELECT product_id FROM prm_product WHERE product_name='Zobna ščetka Ultra soft CS 3960')),                                                                                                               
('sl','Zobna ščetka Soft CS 1560', (SELECT product_id FROM prm_product WHERE product_name='Zobna ščetka Soft CS 1560')),                                                                                                                           
('sl','Zobna ščetka 2 pac Ultra soft CS 5460', (SELECT product_id FROM prm_product WHERE product_name='Zobna ščetka 2 pac Ultra soft CS 5460')),                                                                                                   
('sl','Zobna ščetka 3 pac Ultra soft CS 5460', (SELECT product_id FROM prm_product WHERE product_name='Zobna ščetka 3 pac Ultra soft CS 5460')),                                                                                                   
('sl','Zobna ščetka 3 pac Super soft CS 3960', (SELECT product_id FROM prm_product WHERE product_name='Zobna ščetka 3 pac Super soft CS 3960')),                                                                                                   
('sl','Zobna ščetka 3 pac Soft CS 1560', (SELECT product_id FROM prm_product WHERE product_name='Zobna ščetka 3 pac Soft CS 1560')),                                                                                                               
('sl','Single krtačka CS 1006', (SELECT product_id FROM prm_product WHERE product_name='Single krtačka CS 1006')),                                                                                                                                 
('sl','Zobna ščetka smart', (SELECT product_id FROM prm_product WHERE product_name='Zobna ščetka smart')),                                                                                                                                         
('sl','Zobna ščetka 3 pac Smart Ultra soft - manjše', (SELECT product_id FROM prm_product WHERE product_name='Zobna ščetka 3 pac Smart Ultra soft - manjše')),                                                                                     
('sl','Ustna voda Perio +0,05 Balance', (SELECT product_id FROM prm_product WHERE product_name='Ustna voda Perio +0,05 Balance')),                                                                                                                 
('sl','Ustna voda Perio +0,09 Regenerate', (SELECT product_id FROM prm_product WHERE product_name='Ustna voda Perio +0,09 Regenerate')),                                                                                                           
('sl','Ustna voda Perio +0,12 Protect', (SELECT product_id FROM prm_product WHERE product_name='Ustna voda Perio +0,12 Protect')),                                                                                                                 
('sl','Ustna voda Perio +0,20 Forte', (SELECT product_id FROM prm_product WHERE product_name='Ustna voda Perio +0,20 Forte')),                                                                                                                     
('sl','Zobna pasta Perio + Support 0,09', (SELECT product_id FROM prm_product WHERE product_name='Zobna pasta Perio + Support 0,09')),                                                                                                             
('sl','Gel Perio + Focus 0,5', (SELECT product_id FROM prm_product WHERE product_name='Gel Perio + Focus 0,5')),                                                                                                                                   
('sl','Ustna voda Bluem', (SELECT product_id FROM prm_product WHERE product_name='Ustna voda Bluem')),                                                                                                                                             
('sl','Zobna pasta Bluem', (SELECT product_id FROM prm_product WHERE product_name='Zobna pasta Bluem')),                                                                                                                                           
('sl','Set Perio + Regenerate', (SELECT product_id FROM prm_product WHERE product_name='Set Perio + Regenerate')),                                                                                                                                 
('sl','Set Perio + Balance', (SELECT product_id FROM prm_product WHERE product_name='Set Perio + Balance')),                                                                                                                                       
('sl','Set Perio + Forte', (SELECT product_id FROM prm_product WHERE product_name='Set Perio + Forte')),                                                                                                                                           
('sl','Set Bluem voda in pasta', (SELECT product_id FROM prm_product WHERE product_name='Set Bluem voda in pasta')),                                                                                                                               
('sl','Easy reach flossers 25kom zobne nitke z držali (zelene)', (SELECT product_id FROM prm_product WHERE product_name='Easy reach flossers 25kom zobne nitke z držali (zelene)')),                                                               
('sl','Miracle flosser mini zobne nitke z držali (modre)', (SELECT product_id FROM prm_product WHERE product_name='Miracle flosser mini zobne nitke z držali (modre)')),                                                                           
('sl','Easy clean Flosser držalo + 5 refil', (SELECT product_id FROM prm_product WHERE product_name='Easy clean Flosser držalo + 5 refil')),                                                                                                       
('sl','Maska FFP2 - KN 95', (SELECT product_id FROM prm_product WHERE product_name='Maska FFP2 - KN 95')),                                                                                                                                         
('sl','Maska FFP2 - KN 95 10x', (SELECT product_id FROM prm_product WHERE product_name='Maska FFP2 - KN 95 10x')),                                                                                                                                 
('sl','Kirurška maska', (SELECT product_id FROM prm_product WHERE product_name='Kirurška maska')),                                                                                                                                                 
('sl','Opalescence zobna pasta', (SELECT product_id FROM prm_product WHERE product_name='Opalescence zobna pasta')),                                                                                                                               
('sl','Remot zobna pasta', (SELECT product_id FROM prm_product WHERE product_name='Remot zobna pasta')),                                                                                                                                           
('sl','Curaprox Hydrosonic PRO - sonična zobna ščetka', (SELECT product_id FROM prm_product WHERE product_name='Curaprox Hydrosonic PRO - sonična zobna ščetka')),                                                                                 
('sl','Hydrosonic sensitive round - glava sonične ščetke', (SELECT product_id FROM prm_product WHERE product_name='Hydrosonic sensitive round - glava sonične ščetke')),                                                                           
('sl','Hydrosonic power round - glava sonične ščetke', (SELECT product_id FROM prm_product WHERE product_name='Hydrosonic power round - glava sonične ščetke')),                                                                                   
('sl','Medzobne ščetke refill x 8 CPS 07', (SELECT product_id FROM prm_product WHERE product_name='Medzobne ščetke refill x 8 CPS 07')),                                                                                                           
('sl','Medzobne ščetke refill x 8 CPS 011', (SELECT product_id FROM prm_product WHERE product_name='Medzobne ščetke refill x 8 CPS 011')),                                                                                                         
('sl','Hydrosonic Smart Black is White 259 - glava sonične ščetke', (SELECT product_id FROM prm_product WHERE product_name='Hydrosonic Smart Black is White 259 - glava sonične ščetke')),                                                         
('sl','Curaprox Black is White - sonična zobna ščetka', (SELECT product_id FROM prm_product WHERE product_name='Curaprox Black is White - sonična zobna ščetka')),                                                                                 
('sl','Hydrosonic CHS 200 sensitive long - glava sonične ščetke', (SELECT product_id FROM prm_product WHERE product_name='Hydrosonic CHS 200 sensitive long - glava sonične ščetke')),                                                             
('sl','Hydrosonic CHS 300 power long - glava sonične ščetke', (SELECT product_id FROM prm_product WHERE product_name='Hydrosonic CHS 300 power long - glava sonične ščetke')),                                                                     
('sl','Zobna ščetka Velvet CS 12460', (SELECT product_id FROM prm_product WHERE product_name='Zobna ščetka Velvet CS 12460')),                                                                                                                     
('sl','Theodent Classic - zobna pasta', (SELECT product_id FROM prm_product WHERE product_name='Theodent Classic - zobna pasta')),                                                                                                                 
('sl','Theodent 300 - zobna pasta', (SELECT product_id FROM prm_product WHERE product_name='Theodent 300 - zobna pasta')),                                                                                                                         
('sl','Theodent Kids - zobna pasta', (SELECT product_id FROM prm_product WHERE product_name='Theodent Kids - zobna pasta')),                                                                                                                       
('sl','Kukident', (SELECT product_id FROM prm_product WHERE product_name='Kukident'));                                                                                                                                                             


--############################################################
--# Filling values into prm_product_name table
--############################################################

INSERT INTO prm_product_name (product_id, language, text) VALUES
((SELECT product_id FROM prm_product WHERE product_name='Stomatološki pregled'), 'en', 'Dental examination'), ((SELECT product_id FROM prm_product WHERE product_name='Stomatološki pregled'), 'it', 'Controllo dentistico 1'),
((SELECT product_id FROM prm_product WHERE product_name='Kratek stomatološki pregled'), 'en', 'Short dental examination'), ((SELECT product_id FROM prm_product WHERE product_name='Kratek stomatološki pregled'), 'it', 'Controllo dentistico 2'),
((SELECT product_id FROM prm_product WHERE product_name='CRM pregled'), 'en', 'CRM dental examination'), ((SELECT product_id FROM prm_product WHERE product_name='CRM pregled'), 'it', 'Controllo dentistico 3'),
((SELECT product_id FROM prm_product WHERE product_name='Odstranitev trdih in mehkih oblog po loku'), 'en', 'Removal of hard and soft plaque along the arch'), ((SELECT product_id FROM prm_product WHERE product_name='Odstranitev trdih in mehkih oblog po loku'), 'it', 'Ablazione tartaro per arcata'),
((SELECT product_id FROM prm_product WHERE product_name='Peskanje po loku'), 'en', 'Sandblasting along the arch'), ((SELECT product_id FROM prm_product WHERE product_name='Peskanje po loku'), 'it', 'Sabbiatura e lucidatura per arcata'),
((SELECT product_id FROM prm_product WHERE product_name='Erozija'), 'en', 'Erosion'), ((SELECT product_id FROM prm_product WHERE product_name='Erozija'), 'it', 'Otturazione di V classe'),
((SELECT product_id FROM prm_product WHERE product_name='Zalivka po eni ploskvi'), 'en', 'Filling on a single surface'), ((SELECT product_id FROM prm_product WHERE product_name='Zalivka po eni ploskvi'), 'it', 'Otturazione semplice'),
((SELECT product_id FROM prm_product WHERE product_name='Zalivka na dveh ploskvah'), 'en', 'Filling on two surfaces'), ((SELECT product_id FROM prm_product WHERE product_name='Zalivka na dveh ploskvah'), 'it', 'Otturazione media'),
((SELECT product_id FROM prm_product WHERE product_name='Zalivka na treh ploskvah'), 'en',  'Filling on three surfaces'), ((SELECT product_id FROM prm_product WHERE product_name='Zalivka na treh ploskvah'), 'it', 'Otturazione grande'),
((SELECT product_id FROM prm_product WHERE product_name='Dograditev zoba'), 'en', 'Tooth augmentation'), ((SELECT product_id FROM prm_product WHERE product_name='Dograditev zoba'), 'it', 'Ricostruzione in composito'),
((SELECT product_id FROM prm_product WHERE product_name='Koferdam'), 'en',  'Cofferdam'), ((SELECT product_id FROM prm_product WHERE product_name='Koferdam'), 'it', 'Koferdam'),
((SELECT product_id FROM prm_product WHERE product_name='Zalitje fisur'), 'en',  'Fissure filling'), ((SELECT product_id FROM prm_product WHERE product_name='Zalitje fisur'), 'it', 'Sigillatura dei solchi e fosette per elemento'),
((SELECT product_id FROM prm_product WHERE product_name='Zdravljenje gangrene in polnitev po kanalu'), 'en',  'Gangrene treatment and filling through the canal'), ((SELECT product_id FROM prm_product WHERE product_name='Zdravljenje gangrene in polnitev po kanalu'), 'it', 'Cura canalare per canale'),
((SELECT product_id FROM prm_product WHERE product_name='Ponovno zdravljenje po kanalu'), 'en', 'Re-treatment through the canal'), ((SELECT product_id FROM prm_product WHERE product_name='Ponovno zdravljenje po kanalu'), 'it', 'Ritrattamento per canale'),
((SELECT product_id FROM prm_product WHERE product_name='Zdravilo s provizorično plombo'), 'en', 'Medicine with a provisional filling'), ((SELECT product_id FROM prm_product WHERE product_name='Zdravilo s provizorično plombo'), 'it', 'Medicamento con otturazione provisoria'),
((SELECT product_id FROM prm_product WHERE product_name='Direktno kritje pulpe'), 'en', 'Direct pulp coverage'), ((SELECT product_id FROM prm_product WHERE product_name='Direktno kritje pulpe'), 'it', 'Incappucciamento diretto/indiretto di polpa'),
((SELECT product_id FROM prm_product WHERE product_name='Trepanacija pulpnega kanala'), 'en', 'Pulp canal tremor'), ((SELECT product_id FROM prm_product WHERE product_name='Trepanacija pulpnega kanala'), 'it', 'Trapanazione del dente'),
((SELECT product_id FROM prm_product WHERE product_name='Anestezija'), 'en', 'Local anesthesia'), ((SELECT product_id FROM prm_product WHERE product_name='Anestezija'), 'it', 'Anestesia locale'),
((SELECT product_id FROM prm_product WHERE product_name='Ekstrakcija majavega zoba'), 'en',  'Loose tooth extraction'), ((SELECT product_id FROM prm_product WHERE product_name='Ekstrakcija majavega zoba'), 'it', 'Estrazione semplice'),
((SELECT product_id FROM prm_product WHERE product_name='Ekstrakcija enokoreninskega zoba'), 'en', 'Single-root tooth extraction'), ((SELECT product_id FROM prm_product WHERE product_name='Ekstrakcija enokoreninskega zoba'), 'it', 'Estrazione monoradiculare'),
((SELECT product_id FROM prm_product WHERE product_name='Ekstrakcija večkoreninskega zoba'), 'en',  'Multi-root tooth extraction'), ((SELECT product_id FROM prm_product WHERE product_name='Ekstrakcija večkoreninskega zoba'), 'it', 'Estrazione puliradicolare o complessa'),
((SELECT product_id FROM prm_product WHERE product_name='Kirurška ekstrakcija'), 'en', 'Surgical extraction'), ((SELECT product_id FROM prm_product WHERE product_name='Kirurška ekstrakcija'), 'it',  'Estrazione complessa'),
((SELECT product_id FROM prm_product WHERE product_name='Izkles zoba'), 'en', 'Tooth extraction'), ((SELECT product_id FROM prm_product WHERE product_name='Izkles zoba'), 'it', 'Estrazione complessa 2'),
((SELECT product_id FROM prm_product WHERE product_name='Apikotomija ene korenine'), 'en', 'Apicotomy of one root'), ((SELECT product_id FROM prm_product WHERE product_name='Apikotomija ene korenine'), 'it', 'Apicotomia - 1 radice'),
((SELECT product_id FROM prm_product WHERE product_name='Apikotomija dveh korenin'), 'en', 'Apicotomy of two roots'), ((SELECT product_id FROM prm_product WHERE product_name='Apikotomija dveh korenin'), 'it', 'Apicotomia - 2 radici'),
((SELECT product_id FROM prm_product WHERE product_name='Apikotomija treh korenin'), 'en', 'Apicotomy of three roots'), ((SELECT product_id FROM prm_product WHERE product_name='Apikotomija treh korenin'), 'it', 'Apicotomia - 3 radici'),
((SELECT product_id FROM prm_product WHERE product_name='Reženjska operacija kvadrant'), 'en', 'Flap operation per quadrant'), ((SELECT product_id FROM prm_product WHERE product_name='Reženjska operacija kvadrant'), 'it', 'Cure parodontologiche'),
((SELECT product_id FROM prm_product WHERE product_name='Podaljšanje klinične krone'), 'en', 'Extension of the clinical crown'), ((SELECT product_id FROM prm_product WHERE product_name='Podaljšanje klinične krone'), 'it', 'Estensione della corona'),
((SELECT product_id FROM prm_product WHERE product_name='Paradontološko zdravljenje'), 'en', 'Periodontal treatment'), ((SELECT product_id FROM prm_product WHERE product_name='Paradontološko zdravljenje'), 'it', 'Cure parodontologice 2'),
((SELECT product_id FROM prm_product WHERE product_name='Paradontološko zdravljenje - laser'), 'en', 'Periodontal treatment - laser'), ((SELECT product_id FROM prm_product WHERE product_name='Paradontološko zdravljenje - laser'), 'it', 'Cure parodontologice con laser'),
((SELECT product_id FROM prm_product WHERE product_name='Zaprti dvig sinusa'), 'en', 'Closed sinus lift'), ((SELECT product_id FROM prm_product WHERE product_name='Zaprti dvig sinusa'), 'it', 'Sinus lift - chiuso'),
((SELECT product_id FROM prm_product WHERE product_name='Odprti dvig sinusa'), 'en', 'Opened sinus lift'), ((SELECT product_id FROM prm_product WHERE product_name='Odprti dvig sinusa'), 'it', 'Sinus lift- aperto'),
((SELECT product_id FROM prm_product WHERE product_name='Manjša dograditev s kostnim nadomestkom'), 'en', 'Minor upgrade with bone replacement'), ((SELECT product_id FROM prm_product WHERE product_name='Manjša dograditev s kostnim nadomestkom'), 'it', 'Sostituzione ossea minore'),
((SELECT product_id FROM prm_product WHERE product_name='Dograditev s kostnim nadomestkom in membrano'), 'en', 'Upgrading with bone replacement and membrane'), ((SELECT product_id FROM prm_product WHERE product_name='Dograditev s kostnim nadomestkom in membrano'), 'it', 'Sostituzione ossea maggiore con membrana'),
((SELECT product_id FROM prm_product WHERE product_name='Prosti kostni transplantat'), 'en', 'Bone implant'), ((SELECT product_id FROM prm_product WHERE product_name='Prosti kostni transplantat'), 'it', 'Transplanto osseo'),
((SELECT product_id FROM prm_product WHERE product_name='Vstavitev implantata'), 'en',  'Implant insertion'), ((SELECT product_id FROM prm_product WHERE product_name='Vstavitev implantata'), 'it', 'Inserimento impianto'),
((SELECT product_id FROM prm_product WHERE product_name='Keramična prevleka'), 'en', 'Ceramic coating'), ((SELECT product_id FROM prm_product WHERE product_name='Keramična prevleka'), 'it', 'Corona in ceramica'),
((SELECT product_id FROM prm_product WHERE product_name='Zirconijeva prevleka'), 'en', 'Zirconium coating'), ((SELECT product_id FROM prm_product WHERE product_name='Zirconijeva prevleka'), 'it', 'Corona in zirconio'),
((SELECT product_id FROM prm_product WHERE product_name='Zirconijev inlay'), 'en', 'Zirconium inlay'), ((SELECT product_id FROM prm_product WHERE product_name='Zirconijev inlay'), 'it', 'Intarsio in zirconio'),
((SELECT product_id FROM prm_product WHERE product_name='Keramični inlay'), 'en', 'Ceramic inlay'), ((SELECT product_id FROM prm_product WHERE product_name='Keramični inlay'), 'it', 'Intarsio in ceramica'),
((SELECT product_id FROM prm_product WHERE product_name='Kompozitni inlay'), 'en', 'Composite inlay'), ((SELECT product_id FROM prm_product WHERE product_name='Kompozitni inlay'), 'it', 'Intarsio in composito'),
((SELECT product_id FROM prm_product WHERE product_name='Zirconijeva faseta'), 'en', 'Zirconium veneer'), ((SELECT product_id FROM prm_product WHERE product_name='Zirconijeva faseta'), 'it', 'Faccetta in zirconio'),
((SELECT product_id FROM prm_product WHERE product_name='Keramična faseta'), 'en', 'Ceramic veneer'), ((SELECT product_id FROM prm_product WHERE product_name='Keramična faseta'), 'it', 'Faccetta in ceramica'),
((SELECT product_id FROM prm_product WHERE product_name='Kompozitna faseta'), 'en', 'Composite veneer'), ((SELECT product_id FROM prm_product WHERE product_name='Kompozitna faseta'), 'it', 'Faccetta in composito'),
((SELECT product_id FROM prm_product WHERE product_name='Abutment + zirconijeva prevleka'), 'en', 'Abutment + zirconium coating'), ((SELECT product_id FROM prm_product WHERE product_name='Abutment + zirconijeva prevleka'), 'it', 'Abutment + corona in zirconio'),
((SELECT product_id FROM prm_product WHERE product_name='4 implantati + zirconijev most'), 'en', '4 implants + zirconium bridge'), ((SELECT product_id FROM prm_product WHERE product_name='4 implantati + zirconijev most'), 'it', '4 impianti + ponte in zirconio'),
((SELECT product_id FROM prm_product WHERE product_name='5 implantanov + zirconijev most'), 'en', '5 implants + zirconium bridge'), ((SELECT product_id FROM prm_product WHERE product_name='5 implantanov + zirconijev most'), 'it', '5 impianti + ponte in zirconio'),
((SELECT product_id FROM prm_product WHERE product_name='2 implantata + totalna proteza'), 'en', '2 implants + total dentures'), ((SELECT product_id FROM prm_product WHERE product_name='2 implantata + totalna proteza'), 'it', '2 impianti + protesi mobile'),
((SELECT product_id FROM prm_product WHERE product_name='4 implantanti + totalna proteza'), 'en', '4 implants + total dentures'), ((SELECT product_id FROM prm_product WHERE product_name='4 implantanti + totalna proteza'), 'it', '4 impianti + protesi mobile'),
((SELECT product_id FROM prm_product WHERE product_name='2 implantata + 4 zirconijeve prevleke + parcialna proteza'), 'en', '2 implants + 4 zirconium coatings + partial denture'), ((SELECT product_id FROM prm_product WHERE product_name='2 implantata + 4 zirconijeve prevleke + parcialna proteza'), 'it', '2 impianti + 4 corone in zirconia + protezi parciale'),
((SELECT product_id FROM prm_product WHERE product_name='Rdeča keramika po zobu'), 'en', 'Red ceramic per tooth'), ((SELECT product_id FROM prm_product WHERE product_name='Rdeča keramika po zobu'), 'it', 'Ceramica rossa per dente'),
((SELECT product_id FROM prm_product WHERE product_name='FRC nazidek'), 'en', NULL), ((SELECT product_id FROM prm_product WHERE product_name='FRC nazidek'), 'it', 'frc perno'),
((SELECT product_id FROM prm_product WHERE product_name='Zirkonijev nazidek'), 'en', NULL), ((SELECT product_id FROM prm_product WHERE product_name='Zirkonijev nazidek'), 'it', 'Perno in zirconio'),
((SELECT product_id FROM prm_product WHERE product_name='Provizorična prevleka'), 'en', 'Provisional coating'), ((SELECT product_id FROM prm_product WHERE product_name='Provizorična prevleka'), 'it', 'Corona provisoria'),
((SELECT product_id FROM prm_product WHERE product_name='Demontaža po zobu'), 'en', 'Disassembly per tooth'), ((SELECT product_id FROM prm_product WHERE product_name='Demontaža po zobu'), 'it', 'Demontaggio di corona'),
((SELECT product_id FROM prm_product WHERE product_name='Totalna proteza'), 'en', 'Total dentures'), ((SELECT product_id FROM prm_product WHERE product_name='Totalna proteza'), 'it', 'Protesi totale'),
((SELECT product_id FROM prm_product WHERE product_name='Parcialna proteza z ulito bazo'), 'en', 'Partial denture with cast base'), ((SELECT product_id FROM prm_product WHERE product_name='Parcialna proteza z ulito bazo'), 'it', 'Protesi parciale scheletrata'),
((SELECT product_id FROM prm_product WHERE product_name='Indirektna podložitev'), 'en', 'Indirect lining'), ((SELECT product_id FROM prm_product WHERE product_name='Indirektna podložitev'), 'it', 'Ribasatura indiretta'),
((SELECT product_id FROM prm_product WHERE product_name='Direktna podložitev'), 'en', 'Direct lining'), ((SELECT product_id FROM prm_product WHERE product_name='Direktna podložitev'), 'it', 'Ribasatura diretta'),
((SELECT product_id FROM prm_product WHERE product_name='Osnovna reparatura'), 'en', 'Basic repairs of denture'), ((SELECT product_id FROM prm_product WHERE product_name='Osnovna reparatura'), 'it', 'Riparazione semplice di protesi mobile'),
((SELECT product_id FROM prm_product WHERE product_name='Dodatni element'), 'en', 'Additional element'), ((SELECT product_id FROM prm_product WHERE product_name='Dodatni element'), 'it', 'Modellamento di dente mancante'),
((SELECT product_id FROM prm_product WHERE product_name='Imediatna proteza'), 'en', 'Immediate denture'), ((SELECT product_id FROM prm_product WHERE product_name='Imediatna proteza'), 'it', 'Protesi immediata'),
((SELECT product_id FROM prm_product WHERE product_name='Imediatna proteza z zaponami'), 'en', 'Immediate denture with clasps'), ((SELECT product_id FROM prm_product WHERE product_name='Imediatna proteza z zaponami'), 'it', 'Protesi immediata 2'),
((SELECT product_id FROM prm_product WHERE product_name='Žabica'), 'en', NULL), ((SELECT product_id FROM prm_product WHERE product_name='Žabica'), 'it', 'Protesi mobile, un dente'),
((SELECT product_id FROM prm_product WHERE product_name='Vbrizgavanje hialurona 1 ml'), 'en', 'Injection of hyaluronic acid 1 ml'), ((SELECT product_id FROM prm_product WHERE product_name='Vbrizgavanje hialurona 1 ml'), 'it', 'Iniezione di acido ialuronico 1. sesione'),
((SELECT product_id FROM prm_product WHERE product_name='Beljenje zob brez šablon 3x15 min'), 'en', 'Teeth whitening without stencils 3x15 min'), ((SELECT product_id FROM prm_product WHERE product_name='Beljenje zob brez šablon 3x15 min'), 'it', 'Sbiancamento'),
((SELECT product_id FROM prm_product WHERE product_name='Beljenje zob + šablone'), 'en', 'Teeth whitening + stencils'), ((SELECT product_id FROM prm_product WHERE product_name='Beljenje zob + šablone'), 'it', 'Sbiancamento 2'),
((SELECT product_id FROM prm_product WHERE product_name='Opornica'), 'en', 'Splint'), ((SELECT product_id FROM prm_product WHERE product_name='Opornica'), 'it', 'Stecca'),
((SELECT product_id FROM prm_product WHERE product_name='Ščitnik'), 'en', 'Mouthguard'), ((SELECT product_id FROM prm_product WHERE product_name='Ščitnik'), 'it', 'Paradenti'),
((SELECT product_id FROM prm_product WHERE product_name='Cbct 1'), 'en', 'Cbct 1'), ((SELECT product_id FROM prm_product WHERE product_name='Cbct 1'), 'it', 'Cbct 1'),
((SELECT product_id FROM prm_product WHERE product_name='Cbct 2'), 'en', 'Cbct 2'), ((SELECT product_id FROM prm_product WHERE product_name='Cbct 2'), 'it', 'Cbct 2'),
((SELECT product_id FROM prm_product WHERE product_name='Cbct 3'), 'en', 'Cbct 3'), ((SELECT product_id FROM prm_product WHERE product_name='Cbct 3'), 'it', 'Cbct 3'),
((SELECT product_id FROM prm_product WHERE product_name='Ortopan'), 'en', 'X-Ray'), ((SELECT product_id FROM prm_product WHERE product_name='Ortopan'), 'it', 'Rtg panoramica'),
((SELECT product_id FROM prm_product WHERE product_name='Rtg lokalno'), 'en', 'X-Ray (local)'), ((SELECT product_id FROM prm_product WHERE product_name='Rtg lokalno'), 'it', 'Rtg locale'),
((SELECT product_id FROM prm_product WHERE product_name='Higiena - opalescence'), 'en', 'Hygiene - opalescence'), ((SELECT product_id FROM prm_product WHERE product_name='Higiena - opalescence'), 'it', 'Opalescence dentifricio'),
((SELECT product_id FROM prm_product WHERE product_name='Higiena - bluem'), 'en', 'Hygiene - bluem'), ((SELECT product_id FROM prm_product WHERE product_name='Higiena - bluem'), 'it', 'Bluem'),
((SELECT product_id FROM prm_product WHERE product_name='Higiena - corega'), 'en', 'Hygiene - corega'), ((SELECT product_id FROM prm_product WHERE product_name='Higiena - corega'), 'it', 'Corega'),
((SELECT product_id FROM prm_product WHERE product_name='Optragate'), 'en', 'Optragate'), ((SELECT product_id FROM prm_product WHERE product_name='Optragate'), 'it', 'Optragate'),
((SELECT product_id FROM prm_product WHERE product_name='Zagozda'), 'en', 'Wedge'), ((SELECT product_id FROM prm_product WHERE product_name='Zagozda'), 'it', 'Cuneo dentale sagomato'),
((SELECT product_id FROM prm_product WHERE product_name='Menjava teflona'), 'en', 'Teflon replacement'), ((SELECT product_id FROM prm_product WHERE product_name='Menjava teflona'), 'it', 'Teflon'),
((SELECT product_id FROM prm_product WHERE product_name='Vstavitev implanta, abutment zirconij prevleka'), 'en', 'Implant insertion, abutment zirconium coating'), ((SELECT product_id FROM prm_product WHERE product_name='Vstavitev implanta, abutment zirconij prevleka'), 'it', 'Inserimento impianto, abutment, corona in zirconio'),
((SELECT product_id FROM prm_product WHERE product_name='Odtis, funkcijska žlica, pregled'), 'en', 'Imprint, function bucket, examination'), ((SELECT product_id FROM prm_product WHERE product_name='Odtis, funkcijska žlica, pregled'), 'it', 'Impronta'),
((SELECT product_id FROM prm_product WHERE product_name='Beljenje posameznega zoba'), 'en', 'Whitening of an individual tooth'), ((SELECT product_id FROM prm_product WHERE product_name='Beljenje posameznega zoba'), 'it', 'Sbiancameto del dente'),
((SELECT product_id FROM prm_product WHERE product_name='Recept'), 'en', 'Prescription'), ((SELECT product_id FROM prm_product WHERE product_name='Recept'), 'it', 'Ricetta'),
((SELECT product_id FROM prm_product WHERE product_name='Viscostat'), 'en', 'Viscostat'), ((SELECT product_id FROM prm_product WHERE product_name='Viscostat'), 'it', 'Viscostat'),
((SELECT product_id FROM prm_product WHERE product_name='Opalescence 16%'), 'en', 'Opalescence 16%'), ((SELECT product_id FROM prm_product WHERE product_name='Opalescence 16%'), 'it', 'Opalescence 16%'),
((SELECT product_id FROM prm_product WHERE product_name='Čiščenje kamna na protezi'), 'en', 'Cleaning tartar on dentures'), ((SELECT product_id FROM prm_product WHERE product_name='Čiščenje kamna na protezi'), 'it', 'Ablazione del tartaro sulla protezi/apparecchio'),
((SELECT product_id FROM prm_product WHERE product_name='Kiretaža žepa po zobu'), 'en', 'Pocket curettage per tooth'), ((SELECT product_id FROM prm_product WHERE product_name='Kiretaža žepa po zobu'), 'it', 'Pulizzia parodontologica per dente'),
((SELECT product_id FROM prm_product WHERE product_name='Penali za nejavljeno odsotnost'), 'en', 'Penalties for unannounced absence'), ((SELECT product_id FROM prm_product WHERE product_name='Penali za nejavljeno odsotnost'), 'it', 'Penale'),
((SELECT product_id FROM prm_product WHERE product_name='Voltfast 50 mg - 3x prašek'), 'en', 'Voltfast 50 mg - 3x powder'), ((SELECT product_id FROM prm_product WHERE product_name='Voltfast 50 mg - 3x prašek'), 'it', 'Voltfast 50 mg - 3 bustine'),
((SELECT product_id FROM prm_product WHERE product_name='Oki 80 mg granule - 2x prašek'), 'en', 'Oki 80 mg granules - 2x powder'), ((SELECT product_id FROM prm_product WHERE product_name='Oki 80 mg granule - 2x prašek'), 'it', 'Oki 80 mg granule - 2 bustine'),
((SELECT product_id FROM prm_product WHERE product_name='Augmentin 875/125mg'), 'en', 'Augmentin 875 / 125mg'), ((SELECT product_id FROM prm_product WHERE product_name='Augmentin 875/125mg'), 'it', 'Augmentin 875/125mg'),
((SELECT product_id FROM prm_product WHERE product_name='Sumamed 500mg'), 'en', 'Sumamed 500mg'), ((SELECT product_id FROM prm_product WHERE product_name='Sumamed 500mg'), 'it', 'Sumamed 500mg'),
((SELECT product_id FROM prm_product WHERE product_name='Amoksiklav 1000mg tbl'), 'en', 'Amoxiclav 1000mg tablet'), ((SELECT product_id FROM prm_product WHERE product_name='Amoksiklav 1000mg tbl'), 'it', 'Amoksiklav 1000 mg tavoletta'),
((SELECT product_id FROM prm_product WHERE product_name='Klimicin 300mg kaps'), 'en', 'Klimicin 300mg capsule'), ((SELECT product_id FROM prm_product WHERE product_name='Klimicin 300mg kaps'), 'it', 'Klimicin 300 mg capsula'),
((SELECT product_id FROM prm_product WHERE product_name='GM ključ'), 'en', 'GM key'), ((SELECT product_id FROM prm_product WHERE product_name='GM ključ'), 'it', 'GM chiave'),
((SELECT product_id FROM prm_product WHERE product_name='Pregled + odtis zobni aparat'), 'en', 'Examination + impression (braces)'), ((SELECT product_id FROM prm_product WHERE product_name='Pregled + odtis zobni aparat'), 'it', 'Visita + impronta per l`apparecchio'),
((SELECT product_id FROM prm_product WHERE product_name='Opornica invisalign'), 'en', 'Invisalign splint'), ((SELECT product_id FROM prm_product WHERE product_name='Opornica invisalign'), 'it', 'Invisalign stecca'),
((SELECT product_id FROM prm_product WHERE product_name='Snemna plošča'), 'en', 'Removable plate'), ((SELECT product_id FROM prm_product WHERE product_name='Snemna plošča'), 'it', 'Apparecchio mobile'),
((SELECT product_id FROM prm_product WHERE product_name='Retencijska žička'), 'en', 'Retainer'), ((SELECT product_id FROM prm_product WHERE product_name='Retencijska žička'), 'it', 'Retainer'),
((SELECT product_id FROM prm_product WHERE product_name='Retencijska žička - leplenje'), 'en', 'Retainer - bonding'), ((SELECT product_id FROM prm_product WHERE product_name='Retencijska žička - leplenje'), 'it', 'Retainer - incollaggio'),
((SELECT product_id FROM prm_product WHERE product_name='Beljenje 15 min'), 'en', 'Teeth whitening - 15 min'), ((SELECT product_id FROM prm_product WHERE product_name='Beljenje 15 min'), 'it', 'Sbiancamento - 15 min'),
((SELECT product_id FROM prm_product WHERE product_name='Provizorij 1'), 'en', 'Temporary veneer 1'), ((SELECT product_id FROM prm_product WHERE product_name='Provizorij 1'), 'it', ' Dente provisorico 1'),
((SELECT product_id FROM prm_product WHERE product_name='Provizorij 2'), 'en', 'Temporary veneer 2'), ((SELECT product_id FROM prm_product WHERE product_name='Provizorij 2'), 'it', ' Dente provisorico 2'),
((SELECT product_id FROM prm_product WHERE product_name='Odstranitev šivov po zobu'), 'en', 'Removal of sutures per tooth'), ((SELECT product_id FROM prm_product WHERE product_name='Odstranitev šivov po zobu'), 'it', 'Punti ex'),
((SELECT product_id FROM prm_product WHERE product_name='Začasni maryland most'), 'en', 'Temporary Maryland bridge'), ((SELECT product_id FROM prm_product WHERE product_name='Začasni maryland most'), 'it', 'Ponte Maryland provisorio'),
((SELECT product_id FROM prm_product WHERE product_name='Individualni zirkonijev abutment'), 'en', 'Individual zirconium abutment'), ((SELECT product_id FROM prm_product WHERE product_name='Individualni zirkonijev abutment'), 'it', 'Abutment in zirconio'),
((SELECT product_id FROM prm_product WHERE product_name='Recept voltfast'), 'en', 'Prescription Voltfast'), ((SELECT product_id FROM prm_product WHERE product_name='Recept voltfast'), 'it', 'Voltfast ricetta'),
((SELECT product_id FROM prm_product WHERE product_name='Zdravljenje dlesni'), 'en', 'Gum treatment'), ((SELECT product_id FROM prm_product WHERE product_name='Zdravljenje dlesni'), 'it', 'Cure parodontologiche 3'),
((SELECT product_id FROM prm_product WHERE product_name='Zobni nakit'), 'en', 'Dental jewelry'), ((SELECT product_id FROM prm_product WHERE product_name='Zobni nakit'), 'it', 'Diamante per i denti'),
((SELECT product_id FROM prm_product WHERE product_name='Materialni stroški'), 'en', 'Material costs'), ((SELECT product_id FROM prm_product WHERE product_name='Materialni stroški'), 'it', 'Costo dei materiali'),
((SELECT product_id FROM prm_product WHERE product_name='Fasetiranje'), 'en', 'Veneering'), ((SELECT product_id FROM prm_product WHERE product_name='Fasetiranje'), 'it', NULL),
((SELECT product_id FROM prm_product WHERE product_name='Cementiranje starih kron/lusk'), 'en', 'Cementation of old crowns / veneers'), ((SELECT product_id FROM prm_product WHERE product_name='Cementiranje starih kron/lusk'), 'it', NULL),
((SELECT product_id FROM prm_product WHERE product_name='Brušenje zob (cena po zobu)'), 'en', 'Teeth grinding (per tooth)'), ((SELECT product_id FROM prm_product WHERE product_name='Brušenje zob (cena po zobu)'), 'it', NULL),
((SELECT product_id FROM prm_product WHERE product_name='Odstranjevanje fiksnega zobnega aparata (po zobu)'), 'en', 'Removal of fixed braces (per tooth)'), ((SELECT product_id FROM prm_product WHERE product_name='Odstranjevanje fiksnega zobnega aparata (po zobu)'), 'it', NULL),
((SELECT product_id FROM prm_product WHERE product_name='6 implantov + zirconijev most'), 'en', '6 implants + zirconium bridge'), ((SELECT product_id FROM prm_product WHERE product_name='6 implantov + zirconijev most'), 'it', '6 impianti + ponte in zirconio'),
((SELECT product_id FROM prm_product WHERE product_name='Incizija'), 'en', 'Incision'), ((SELECT product_id FROM prm_product WHERE product_name='Incizija'), 'it', 'Incizione'),
((SELECT product_id FROM prm_product WHERE product_name='Vstavitev strauman implantata, abutment, zirconijeva prevleka'), 'en', 'Straumann implant insertion, abutment, zirconium coating'), ((SELECT product_id FROM prm_product WHERE product_name='Vstavitev strauman implantata, abutment, zirconijeva prevleka'), 'it', 'Inserimento impianto Straumann, abutment, corona in zirconio'),
((SELECT product_id FROM prm_product WHERE product_name='Strauman abutment + zirconijeva prevleka'), 'en', 'Straumann abutment + zirconium coating'), ((SELECT product_id FROM prm_product WHERE product_name='Strauman abutment + zirconijeva prevleka'), 'it', 'Straumann abutment + corona in zirconio'),
((SELECT product_id FROM prm_product WHERE product_name='Vstavitev strauman implantata'), 'en', 'Straumann implant insertion'), ((SELECT product_id FROM prm_product WHERE product_name='Vstavitev strauman implantata'), 'it', 'Inserimento impianto Straumann'),
((SELECT product_id FROM prm_product WHERE product_name='Strauman ind abutment + zirconijeva prevleka'), 'en', 'Straumann ind abutment + zirconium coating'), ((SELECT product_id FROM prm_product WHERE product_name='Strauman ind abutment + zirconijeva prevleka'), 'it', 'Straumann ind abutment + corona in zirconio'),
((SELECT product_id FROM prm_product WHERE product_name='Cirkonijeva prevleka + e-max'), 'en', 'Zirconium coating + e-max'), ((SELECT product_id FROM prm_product WHERE product_name='Cirkonijeva prevleka + e-max'), 'it', 'Corona in zirconio + e-max'),
((SELECT product_id FROM prm_product WHERE product_name='Zaustavitev krvavitve'), 'en', 'Stopping bleeding'), ((SELECT product_id FROM prm_product WHERE product_name='Zaustavitev krvavitve'), 'it', 'Emostasi'),
((SELECT product_id FROM prm_product WHERE product_name='Strauman implantat zirconij'), 'en', 'Straumann zirconium implant'), ((SELECT product_id FROM prm_product WHERE product_name='Strauman implantat zirconij'), 'it', 'Straumann impl in zirconio'),
((SELECT product_id FROM prm_product WHERE product_name='Terapija z laserjem'), 'en', 'Laser therapy'), ((SELECT product_id FROM prm_product WHERE product_name='Terapija z laserjem'), 'it', 'Trattamento con laser'),
((SELECT product_id FROM prm_product WHERE product_name='Terapija (sulcusa) z laserjem'), 'en', 'Laser therapy (sulcus)'), ((SELECT product_id FROM prm_product WHERE product_name='Terapija (sulcusa) z laserjem'), 'it', 'Trattamento del sulcus con laser'),
((SELECT product_id FROM prm_product WHERE product_name='Test Covid - 19'), 'en', 'Test Covid - 19'), ((SELECT product_id FROM prm_product WHERE product_name='Test Covid - 19'), 'it', 'Test Covid - 19'),
((SELECT product_id FROM prm_product WHERE product_name='Provizorij na implantantu'), 'en', 'Provision on the implant'), ((SELECT product_id FROM prm_product WHERE product_name='Provizorij na implantantu'), 'it', 'Provisorio sull impianto'),
((SELECT product_id FROM prm_product WHERE product_name='Oki prašek - 30 vrečk'), 'en', 'Oki powder - 30 bags'), ((SELECT product_id FROM prm_product WHERE product_name='Oki prašek - 30 vrečk'), 'it', 'Oki granuli - 30 bustine'),
((SELECT product_id FROM prm_product WHERE product_name='4 implantanti + kompozitni most'), 'en', '4 implants + composite bridge'), ((SELECT product_id FROM prm_product WHERE product_name='4 implantanti + kompozitni most'), 'it', '4 impianti + ponte in resina'),
((SELECT product_id FROM prm_product WHERE product_name='5 implantov + kompozitni most'), 'en', '5 implants + composite bridge'), ((SELECT product_id FROM prm_product WHERE product_name='5 implantov + kompozitni most'), 'it', '5 impianti + ponte in resina'),
((SELECT product_id FROM prm_product WHERE product_name='6 implantov + kompozitni most'), 'en', '6 implants + composite bridge'), ((SELECT product_id FROM prm_product WHERE product_name='6 implantov + kompozitni most'), 'it', '6 impianti + ponte in resina'),
((SELECT product_id FROM prm_product WHERE product_name='Diapozitivi v ortodontiji'), 'en', 'Slides in orthodontics'), ((SELECT product_id FROM prm_product WHERE product_name='Diapozitivi v ortodontiji'), 'it', NULL),
((SELECT product_id FROM prm_product WHERE product_name='Ortod. konf. elem.- vratni teg'), 'en', 'Orthodontic confection element - neck weight'), ((SELECT product_id FROM prm_product WHERE product_name='Ortod. konf. elem.- vratni teg'), 'it', NULL),
((SELECT product_id FROM prm_product WHERE product_name='Ortod. konf. elem.- obrazni lok'), 'en', 'Orthodontic confection element - facial arch'), ((SELECT product_id FROM prm_product WHERE product_name='Ortod. konf. elem.- obrazni lok'), 'it', NULL),
((SELECT product_id FROM prm_product WHERE product_name='3D funkcijska žlica'), 'en', '3D function bucket'), ((SELECT product_id FROM prm_product WHERE product_name='3D funkcijska žlica'), 'it', NULL),
((SELECT product_id FROM prm_product WHERE product_name='3D printan krn'), 'en', NULL), ((SELECT product_id FROM prm_product WHERE product_name='3D printan krn'), 'it', NULL),
((SELECT product_id FROM prm_product WHERE product_name='3D printan model'), 'en', '3D printed model'), ((SELECT product_id FROM prm_product WHERE product_name='3D printan model'), 'it', NULL),
((SELECT product_id FROM prm_product WHERE product_name='3D printana opornica'), 'en', '3D printed splint'), ((SELECT product_id FROM prm_product WHERE product_name='3D printana opornica'), 'it', NULL),
((SELECT product_id FROM prm_product WHERE product_name='Cirkonijev nadzidek'), 'en', NULL), ((SELECT product_id FROM prm_product WHERE product_name='Cirkonijev nadzidek'), 'it', NULL),
((SELECT product_id FROM prm_product WHERE product_name='Cirkonijev vijačen implant na T-Base'), 'en', 'Zirconium screw implant on T-Base'), ((SELECT product_id FROM prm_product WHERE product_name='Cirkonijev vijačen implant na T-Base'), 'it', NULL),
((SELECT product_id FROM prm_product WHERE product_name='Cirkonijev vijačen implant na T-Base + e-max ceram'), 'en', 'Zirconium screw implant on T-Base + e-max ceramic'), ((SELECT product_id FROM prm_product WHERE product_name='Cirkonijev vijačen implant na T-Base + e-max ceram'), 'it', NULL),
((SELECT product_id FROM prm_product WHERE product_name='Cirkonijev zatiček'), 'en', 'Zirconium pin'), ((SELECT product_id FROM prm_product WHERE product_name='Cirkonijev zatiček'), 'it', NULL),
((SELECT product_id FROM prm_product WHERE product_name='Cirkonijeva kapica'), 'en', 'Zirconium cap'), ((SELECT product_id FROM prm_product WHERE product_name='Cirkonijeva kapica'), 'it', NULL),
((SELECT product_id FROM prm_product WHERE product_name='Cirkonijeva kapica + peka keramike'), 'en', 'Zirconium cap + ceramic baking'), ((SELECT product_id FROM prm_product WHERE product_name='Cirkonijeva kapica + peka keramike'), 'it', NULL),
((SELECT product_id FROM prm_product WHERE product_name='Cirkonijeva prevleka cut back'), 'en', 'Zirconium veneer cut back'), ((SELECT product_id FROM prm_product WHERE product_name='Cirkonijeva prevleka cut back'), 'it', NULL),
((SELECT product_id FROM prm_product WHERE product_name='Dodan zob v protezo'), 'en', 'Added tooth to denture'), ((SELECT product_id FROM prm_product WHERE product_name='Dodan zob v protezo'), 'it', NULL),
((SELECT product_id FROM prm_product WHERE product_name='Enostavna vlita kovinska baza (do 3 sidranj)'), 'en', 'Simple cast metal base (up to 3 anchors)'), ((SELECT product_id FROM prm_product WHERE product_name='Enostavna vlita kovinska baza (do 3 sidranj)'), 'it', NULL),
((SELECT product_id FROM prm_product WHERE product_name='Estetska faseta'), 'en', 'Aesthetic veneer'), ((SELECT product_id FROM prm_product WHERE product_name='Estetska faseta'), 'it', NULL),
((SELECT product_id FROM prm_product WHERE product_name='Estetska faseta z individualnim nanosom'), 'en', 'Aesthetic veneer with individual application'), ((SELECT product_id FROM prm_product WHERE product_name='Estetska faseta z individualnim nanosom'), 'it', NULL),
((SELECT product_id FROM prm_product WHERE product_name='Fasetirana prevleka nexco'), 'en', 'Faceted veneer nexco'), ((SELECT product_id FROM prm_product WHERE product_name='Fasetirana prevleka nexco'), 'it', NULL),
((SELECT product_id FROM prm_product WHERE product_name='Fasetiranje prevleke'), 'en', 'Faceting of veneer'), ((SELECT product_id FROM prm_product WHERE product_name='Fasetiranje prevleke'), 'it', NULL),
((SELECT product_id FROM prm_product WHERE product_name='Gred'), 'en', 'Beam'), ((SELECT product_id FROM prm_product WHERE product_name='Gred'), 'it', NULL),
((SELECT product_id FROM prm_product WHERE product_name='Grizna šablona'), 'en', 'Biting stencils'), ((SELECT product_id FROM prm_product WHERE product_name='Grizna šablona'), 'it', NULL),
((SELECT product_id FROM prm_product WHERE product_name='Implant s polno keramiko (cirkonij)'), 'en', 'Implant with full ceramic (zirconium)'), ((SELECT product_id FROM prm_product WHERE product_name='Implant s polno keramiko (cirkonij)'), 'it', NULL),
((SELECT product_id FROM prm_product WHERE product_name='Implant s polno keramiko (e-max)'), 'en', 'Implant with full ceramic (e-max)'), ((SELECT product_id FROM prm_product WHERE product_name='Implant s polno keramiko (e-max)'), 'it', NULL),
((SELECT product_id FROM prm_product WHERE product_name= 'Indirektna podložitev proteze'), 'en', 'Indirect denture lining'), ((SELECT product_id FROM prm_product WHERE product_name= 'Indirektna podložitev proteze'), 'it', NULL),
((SELECT product_id FROM prm_product WHERE product_name='Individualna funkcijska žlica'), 'en', 'Individual function bucket'), ((SELECT product_id FROM prm_product WHERE product_name='Individualna funkcijska žlica'), 'it', NULL),
((SELECT product_id FROM prm_product WHERE product_name='Izgotovitev kovinske vlite baze'), 'en', 'Making a metal cast base'), ((SELECT product_id FROM prm_product WHERE product_name='Izgotovitev kovinske vlite baze'), 'it', NULL),
((SELECT product_id FROM prm_product WHERE product_name='Izgotovitev vlite baze'), 'en', 'Making a cast base'), ((SELECT product_id FROM prm_product WHERE product_name='Izgotovitev vlite baze'), 'it', NULL),
((SELECT product_id FROM prm_product WHERE product_name='Izlivanje študijskega modela'), 'en', 'Outpouring of the study model'), ((SELECT product_id FROM prm_product WHERE product_name='Izlivanje študijskega modela'), 'it', NULL),
((SELECT product_id FROM prm_product WHERE product_name='Kennedy zvezna opornica'), 'en', 'Kennedy splint'), ((SELECT product_id FROM prm_product WHERE product_name='Kennedy zvezna opornica'), 'it', NULL),
((SELECT product_id FROM prm_product WHERE product_name='Kirurško vodilo za implante'), 'en', 'Surgical forceps for implants'), ((SELECT product_id FROM prm_product WHERE product_name='Kirurško vodilo za implante'), 'it', NULL),
((SELECT product_id FROM prm_product WHERE product_name='Komplicirana vlita baza (polzila, rezkanje, Richmond kapica..)'), 'en', 'Complex cast base (sliders, milling, Richmond cap ..)'), ((SELECT product_id FROM prm_product WHERE product_name='Komplicirana vlita baza (polzila, rezkanje, Richmond kapica..)'), 'it', NULL),
((SELECT product_id FROM prm_product WHERE product_name='Kompozitni inlay Nexco'), 'en', 'Nexco composite inlay'), ((SELECT product_id FROM prm_product WHERE product_name='Kompozitni inlay Nexco'), 'it', NULL),
((SELECT product_id FROM prm_product WHERE product_name='Kovinsko porcelanska prevleka'), 'en', 'Metal porcelain veneer'), ((SELECT product_id FROM prm_product WHERE product_name='Kovinsko porcelanska prevleka'), 'it', NULL),
((SELECT product_id FROM prm_product WHERE product_name='Labor impl Ankylos'), 'en', 'Labor implant Ankylos'), ((SELECT product_id FROM prm_product WHERE product_name='Labor impl Ankylos'), 'it', NULL),
((SELECT product_id FROM prm_product WHERE product_name='Labor impl Neodent'), 'en', 'Labor implant Neodent'), ((SELECT product_id FROM prm_product WHERE product_name='Labor impl Neodent'), 'it', NULL),
((SELECT product_id FROM prm_product WHERE product_name='Lotanje po elementu'), 'en', 'Soldering by element'), ((SELECT product_id FROM prm_product WHERE product_name='Lotanje po elementu'), 'it', NULL),
((SELECT product_id FROM prm_product WHERE product_name='Material - Polzilo (A)'), 'en', 'Material - Slider (A)'), ((SELECT product_id FROM prm_product WHERE product_name='Material - Polzilo (A)'), 'it', NULL),
((SELECT product_id FROM prm_product WHERE product_name='Material - Polzilo (B)'), 'en', 'Material - Slider (B)'), ((SELECT product_id FROM prm_product WHERE product_name='Material - Polzilo (B)'), 'it', NULL),
((SELECT product_id FROM prm_product WHERE product_name='Modelacija ćlena v vliti bazi'), 'en', 'Part modeling in the cast base'), ((SELECT product_id FROM prm_product WHERE product_name='Modelacija ćlena v vliti bazi'), 'it', NULL),
((SELECT product_id FROM prm_product WHERE product_name='Montaža polzil, sklepovnih vezi'), 'en', 'Installation of slides, joint ties'), ((SELECT product_id FROM prm_product WHERE product_name='Montaža polzil, sklepovnih vezi'), 'it', NULL),
((SELECT product_id FROM prm_product WHERE product_name='Navosek po elementu'), 'en', 'Grafting per element'), ((SELECT product_id FROM prm_product WHERE product_name='Navosek po elementu'), 'it', NULL),
((SELECT product_id FROM prm_product WHERE product_name='Nazidek - direktna metoda'), 'en', NULL), ((SELECT product_id FROM prm_product WHERE product_name='Nazidek - direktna metoda'), 'it', NULL),
((SELECT product_id FROM prm_product WHERE product_name='Nazidek - indirektna metoda'), 'en', NULL), ((SELECT product_id FROM prm_product WHERE product_name='Nazidek - indirektna metoda'), 'it', NULL),
((SELECT product_id FROM prm_product WHERE product_name='Nexco na cirkonij'), 'en', 'Nexco on zirconium'), ((SELECT product_id FROM prm_product WHERE product_name='Nexco na cirkonij'), 'it', NULL),
((SELECT product_id FROM prm_product WHERE product_name= 'Parcialna proteza'), 'en', 'Partial dentures'), ((SELECT product_id FROM prm_product WHERE product_name= 'Parcialna proteza'), 'it', NULL),
((SELECT product_id FROM prm_product WHERE product_name='Peka roza keramike'), 'en', 'Baking of pink ceramic'), ((SELECT product_id FROM prm_product WHERE product_name='Peka roza keramike'), 'it', NULL),
((SELECT product_id FROM prm_product WHERE product_name='Polna keramična prevleka'), 'en', 'Full ceramic veneers'), ((SELECT product_id FROM prm_product WHERE product_name='Polna keramična prevleka'), 'it', NULL),
((SELECT product_id FROM prm_product WHERE product_name='Polna kompozitna prevleka Nexco'), 'en', 'Full composite veneers Nexco'), ((SELECT product_id FROM prm_product WHERE product_name='Polna kompozitna prevleka Nexco'), 'it', NULL),
((SELECT product_id FROM prm_product WHERE product_name='Polna kovinska prevleka'), 'en', 'Full metal veneers'), ((SELECT product_id FROM prm_product WHERE product_name='Polna kovinska prevleka'), 'it', NULL),
((SELECT product_id FROM prm_product WHERE product_name='Polni cirkonij na abatment'), 'en', 'Full zirconium on the abutment'), ((SELECT product_id FROM prm_product WHERE product_name='Polni cirkonij na abatment'), 'it', NULL),
((SELECT product_id FROM prm_product WHERE product_name='Polna cirkonijeva prevleka'), 'en', 'Full zirconium veneers'), ((SELECT product_id FROM prm_product WHERE product_name='Polna cirkonijeva prevleka'), 'it', NULL),
((SELECT product_id FROM prm_product WHERE product_name='Ponovna izdelava kovinskega ogrodja po kapici'), 'en', 'Rebuilding the metal frame per cap'), ((SELECT product_id FROM prm_product WHERE product_name='Ponovna izdelava kovinskega ogrodja po kapici'), 'it', NULL),
((SELECT product_id FROM prm_product WHERE product_name='Ponovno glaziranje'), 'en', 'Re-glazing'), ((SELECT product_id FROM prm_product WHERE product_name='Ponovno glaziranje'), 'it', NULL),
((SELECT product_id FROM prm_product WHERE product_name='Postavitev implanta'), 'en', 'Implant placement'), ((SELECT product_id FROM prm_product WHERE product_name='Postavitev implanta'), 'it', NULL),
((SELECT product_id FROM prm_product WHERE product_name='Prenosnik izdelan po abutmentu'), 'en', 'Transferor made per abutment'), ((SELECT product_id FROM prm_product WHERE product_name='Prenosnik izdelan po abutmentu'), 'it', NULL),
((SELECT product_id FROM prm_product WHERE product_name='Prešana keramična kapica + peka keramike'), 'en', 'Pressed ceramic cap + ceramic baking'), ((SELECT product_id FROM prm_product WHERE product_name='Prešana keramična kapica + peka keramike'), 'it', NULL),
((SELECT product_id FROM prm_product WHERE product_name='Provizorij prevleka'), 'en', 'Provisional veneer'), ((SELECT product_id FROM prm_product WHERE product_name='Provizorij prevleka'), 'it', NULL),
((SELECT product_id FROM prm_product WHERE product_name='Ref-line Polident po loku'), 'en', 'Ref-line Polident per arch'), ((SELECT product_id FROM prm_product WHERE product_name='Ref-line Polident po loku'), 'it', NULL),
((SELECT product_id FROM prm_product WHERE product_name='Reparatura proteze (prelom)'), 'en', 'Denture repair (fracture)'), ((SELECT product_id FROM prm_product WHERE product_name='Reparatura proteze (prelom)'), 'it', NULL),
((SELECT product_id FROM prm_product WHERE product_name='Rezkanje abutmenta'), 'en', 'Abutment milling'), ((SELECT product_id FROM prm_product WHERE product_name='Rezkanje abutmenta'), 'it', NULL),
((SELECT product_id FROM prm_product WHERE product_name='Rezkanje površin po elementu'), 'en', 'Milling surfaces by element'), ((SELECT product_id FROM prm_product WHERE product_name='Rezkanje površin po elementu'), 'it', NULL),
((SELECT product_id FROM prm_product WHERE product_name='Richmond kapica brez polzila'), 'en', 'Richmond cap without slips'), ((SELECT product_id FROM prm_product WHERE product_name='Richmond kapica brez polzila'), 'it', NULL),
((SELECT product_id FROM prm_product WHERE product_name='Totalna proteza - enostavna'), 'en', 'Total Denture - simple'), ((SELECT product_id FROM prm_product WHERE product_name='Totalna proteza - enostavna'), 'it', NULL),
((SELECT product_id FROM prm_product WHERE product_name='Vgraditev posameznega elementa v reparaturi proteze'), 'en', 'Installation of an individual element in the denture repair'), ((SELECT product_id FROM prm_product WHERE product_name='Vgraditev posameznega elementa v reparaturi proteze'), 'it', NULL),
((SELECT product_id FROM prm_product WHERE product_name='Vizio line ivoclar po loku'), 'en', 'Vizio line ivoclar per arch'), ((SELECT product_id FROM prm_product WHERE product_name='Vizio line ivoclar po loku'), 'it', NULL),
((SELECT product_id FROM prm_product WHERE product_name='Vlita zapona'), 'en', NULL), ((SELECT product_id FROM prm_product WHERE product_name='Vlita zapona'), 'it', NULL),
((SELECT product_id FROM prm_product WHERE product_name='Vratni nanos (Schulter masa)'), 'en', 'Back coating (Schulter mass)'), ((SELECT product_id FROM prm_product WHERE product_name='Vratni nanos (Schulter masa)'), 'it', NULL),
((SELECT product_id FROM prm_product WHERE product_name='Žabica (postavitev do 4 zaporednih zob z zaponami)'), 'en', NULL), ((SELECT product_id FROM prm_product WHERE product_name='Žabica (postavitev do 4 zaporednih zob z zaponami)'), 'it', NULL),
((SELECT product_id FROM prm_product WHERE product_name='Fasetirana prevleka'), 'en', 'Faceted veneer'), ((SELECT product_id FROM prm_product WHERE product_name='Fasetirana prevleka'), 'it', NULL),
((SELECT product_id FROM prm_product WHERE product_name='Totalna proteza 2'), 'en', 'Complete denture 2'), ((SELECT product_id FROM prm_product WHERE product_name='Totalna proteza 2'), 'it', NULL),
((SELECT product_id FROM prm_product WHERE product_name='Medzobne ščetke CPS 06'), 'en', 'Interdental brushes CPS 06'), ((SELECT product_id FROM prm_product WHERE product_name='Medzobne ščetke CPS 06'), 'it', 'Spazzolini inderdentali CPS 06'),
((SELECT product_id FROM prm_product WHERE product_name='Medzobne ščetke CPS 07'), 'en', 'Interdental brushes CPS 07'), ((SELECT product_id FROM prm_product WHERE product_name='Medzobne ščetke CPS 07'), 'it', 'Spazzolini inderdentali CPS 07'),
((SELECT product_id FROM prm_product WHERE product_name='Medzobne ščetke CPS 08'), 'en', 'Interdental brushes CPS 08'), ((SELECT product_id FROM prm_product WHERE product_name='Medzobne ščetke CPS 08'), 'it', 'Spazzolini inderdentali CPS 08'),
((SELECT product_id FROM prm_product WHERE product_name='Medzobne ščetke CPS 09'), 'en', 'Interdental brushes CPS 09'), ((SELECT product_id FROM prm_product WHERE product_name='Medzobne ščetke CPS 09'), 'it', 'Spazzolini inderdentali CPS 09'),
((SELECT product_id FROM prm_product WHERE product_name='Medzobne ščetke CPS 011'), 'en', 'Interdental brushes CPS 011'), ((SELECT product_id FROM prm_product WHERE product_name='Medzobne ščetke CPS 011'), 'it', 'Spazzolini inderdentali CPS 011'),
((SELECT product_id FROM prm_product WHERE product_name='Medzobne ščetke z držalom CPS 405'), 'en', 'Interdental brushes with holder CPS 405'), ((SELECT product_id FROM prm_product WHERE product_name='Medzobne ščetke z držalom CPS 405'), 'it', 'Spazzolini inderdentali con manico CPS 405'),
((SELECT product_id FROM prm_product WHERE product_name='Medzobne ščetke z držalom CPS 406'), 'en', 'Interdental brushes with holder CPS 406'), ((SELECT product_id FROM prm_product WHERE product_name='Medzobne ščetke z držalom CPS 406'), 'it', 'Spazzolini inderdentali con manico CPS 406'),
((SELECT product_id FROM prm_product WHERE product_name='Medzobne ščetke z držalom CPS 408'), 'en', 'Interdental brushes with holder CPS 408'), ((SELECT product_id FROM prm_product WHERE product_name='Medzobne ščetke z držalom CPS 408'), 'it', 'Spazzolini inderdentali con manico CPS 408'),
((SELECT product_id FROM prm_product WHERE product_name='Medzobne ščetke z držalom CPS 410'), 'en', 'Interdental brushes with holder CPS 410'), ((SELECT product_id FROM prm_product WHERE product_name='Medzobne ščetke z držalom CPS 410'), 'it', 'Spazzolini inderdentali con manico CPS 410'),
((SELECT product_id FROM prm_product WHERE product_name='Medzobne refill X 12 CPS 06'), 'en', 'Interdental refill X 12 CPS 06'), ((SELECT product_id FROM prm_product WHERE product_name='Medzobne refill X 12 CPS 06'), 'it', 'Spazzolini inderdentali refill X 12 CPS 06'),
((SELECT product_id FROM prm_product WHERE product_name='Medzobne refill X 12 CPS 07'), 'en', 'Interdental refill X 12 CPS 07'), ((SELECT product_id FROM prm_product WHERE product_name='Medzobne refill X 12 CPS 07'), 'it', 'Spazzolini inderdentali refill X 12 CPS 07'),
((SELECT product_id FROM prm_product WHERE product_name='Medzobne refill X 12 CPS 08'), 'en', 'Interdental refill X 12 CPS 08'), ((SELECT product_id FROM prm_product WHERE product_name='Medzobne refill X 12 CPS 08'), 'it', 'Spazzolini inderdentali refill X 12 CPS 08'),
((SELECT product_id FROM prm_product WHERE product_name='Medzobne refill X 12 CPS 09'), 'en', 'Interdental refill X 12 CPS 09'), ((SELECT product_id FROM prm_product WHERE product_name='Medzobne refill X 12 CPS 09'), 'it', 'Spazzolini inderdentali refill X 12 CPS 09'),
((SELECT product_id FROM prm_product WHERE product_name='Medzobne refill X 12 CPS 011'), 'en', 'Interdental refill X 12 CPS 011'), ((SELECT product_id FROM prm_product WHERE product_name='Medzobne refill X 12 CPS 011'), 'it', 'Spazzolini inderdentali refill X 12 CPS 011'),
((SELECT product_id FROM prm_product WHERE product_name='Medzobne pocket set 457'), 'en', 'Interdental pocket set 457'), ((SELECT product_id FROM prm_product WHERE product_name='Medzobne pocket set 457'), 'it', 'Spazzolini inderdentali pocket set 457'),
((SELECT product_id FROM prm_product WHERE product_name='Držalo alu. za medzobne UHS 410'), 'en', 'Aluminum holder for interdental UHS 410'), ((SELECT product_id FROM prm_product WHERE product_name='Držalo alu. za medzobne UHS 410'), 'it', 'Manico alu. per spazzolini interdentali CPS 410'),
((SELECT product_id FROM prm_product WHERE product_name='Držalo alu. za medzobne UHS 411'), 'en', 'Aluminum holder for interdental UHS 411'), ((SELECT product_id FROM prm_product WHERE product_name='Držalo alu. za medzobne UHS 411'), 'it', 'Manico alu. per spazzolini interdentali CPS 411'),
((SELECT product_id FROM prm_product WHERE product_name='Držalo alu. za medzobne UHS 413'), 'en', 'Aluminum holder for interdental UHS 413'), ((SELECT product_id FROM prm_product WHERE product_name='Držalo alu. za medzobne UHS 413'), 'it', 'Manico alu. per spazzolini interdentali CPS 413'),
((SELECT product_id FROM prm_product WHERE product_name='Zobna nitka Curaprox teflon DF 820'), 'en', 'Dental floss Curaprox teflon DF 820'), ((SELECT product_id FROM prm_product WHERE product_name='Zobna nitka Curaprox teflon DF 820'), 'it', 'Filo interdentale teflon DF 820'),
((SELECT product_id FROM prm_product WHERE product_name='Zobna nitka Jordan easy slide'), 'en', 'Dental floss Jordan easy slide'), ((SELECT product_id FROM prm_product WHERE product_name='Zobna nitka Jordan easy slide'), 'it', 'Filo interdentale Jordan easy slide'),
((SELECT product_id FROM prm_product WHERE product_name='Zobna nitka Jordan expand'), 'en', 'Dental floss Jordan expand'), ((SELECT product_id FROM prm_product WHERE product_name='Zobna nitka Jordan expand'), 'it', 'Filo interdentale Jordan expand'),
((SELECT product_id FROM prm_product WHERE product_name='Zobna nitka Jordan whitening'), 'en', 'Dental floss Jordan whitening'), ((SELECT product_id FROM prm_product WHERE product_name='Zobna nitka Jordan whitening'), 'it', 'Filo interdentale Jordan whitening'),
((SELECT product_id FROM prm_product WHERE product_name='Zobna nitka Proxy soft 3 in 1'), 'en', 'Dental floss Proxy soft 3 in 1'), ((SELECT product_id FROM prm_product WHERE product_name='Zobna nitka Proxy soft 3 in 1'), 'it', 'Filo interdentale Proxy soft 3 in 1'),
((SELECT product_id FROM prm_product WHERE product_name='Zobna nitka Proxy soft bridge & implant'), 'en', 'Dental floss Proxy soft bridge and implant'), ((SELECT product_id FROM prm_product WHERE product_name='Zobna nitka Proxy soft bridge & implant'), 'it', 'Filo interdentale soft bridge and implant'),
((SELECT product_id FROM prm_product WHERE product_name='Zobna nitka Proxy soft periodontal'), 'en', 'Dental floss Proxy soft periodontal'), ((SELECT product_id FROM prm_product WHERE product_name='Zobna nitka Proxy soft periodontal'), 'it', 'Filo interdentale soft periodontal'),
((SELECT product_id FROM prm_product WHERE product_name='Strgalo za jezik CTC 203'), 'en', 'Tongue scraper CTC 203'), ((SELECT product_id FROM prm_product WHERE product_name='Strgalo za jezik CTC 203'), 'it', 'Pulisci lingua CTC 203'),
((SELECT product_id FROM prm_product WHERE product_name='Zobna ščetka Ultra soft CS 5460'), 'en', 'Toothbrush Ultra soft CS 5460'), ((SELECT product_id FROM prm_product WHERE product_name='Zobna ščetka Ultra soft CS 5460'), 'it', 'Spazzolino da denti Ultra soft CS 5460'),
((SELECT product_id FROM prm_product WHERE product_name='Zobna ščetka Ultra soft CS 3960'), 'en', 'Toothbrush Ultra soft CS 3960'), ((SELECT product_id FROM prm_product WHERE product_name='Zobna ščetka Ultra soft CS 3960'), 'it', 'Spazzolino da denti Ultra soft CS 3960'),
((SELECT product_id FROM prm_product WHERE product_name='Zobna ščetka Soft CS 1560'), 'en', 'Toothbrush soft CS 1560'), ((SELECT product_id FROM prm_product WHERE product_name='Zobna ščetka Soft CS 1560'), 'it', 'Spazzolino da denti soft CS 1560'),
((SELECT product_id FROM prm_product WHERE product_name='Zobna ščetka 2 pac Ultra soft CS 5460'), 'en', 'Toothbrush 2 pac Ultra soft CS 5460'), ((SELECT product_id FROM prm_product WHERE product_name='Zobna ščetka 2 pac Ultra soft CS 5460'), 'it', 'Spazzolino da denti 2 pac Ultra soft CS 5460'),
((SELECT product_id FROM prm_product WHERE product_name='Zobna ščetka 3 pac Ultra soft CS 5460'), 'en', 'Toothbrush 3 pac Ultra soft CS 5460'), ((SELECT product_id FROM prm_product WHERE product_name='Zobna ščetka 3 pac Ultra soft CS 5460'), 'it', 'Spazzolino da denti 3 pac Ultra soft CS 5460'),
((SELECT product_id FROM prm_product WHERE product_name='Zobna ščetka 3 pac Super soft CS 3960'), 'en', 'Toothbrush 3 pac Super soft CS 3960'), ((SELECT product_id FROM prm_product WHERE product_name='Zobna ščetka 3 pac Super soft CS 3960'), 'it', 'Spazzolino da denti 3 pac Super soft CS 3960'),
((SELECT product_id FROM prm_product WHERE product_name='Zobna ščetka 3 pac Soft CS 1560'), 'en', 'Toothbrush 3 pac Soft CS 1560'), ((SELECT product_id FROM prm_product WHERE product_name='Zobna ščetka 3 pac Soft CS 1560'), 'it', 'Spazzolino da denti 3 pac Soft CS 1560'),
((SELECT product_id FROM prm_product WHERE product_name='Single krtačka CS 1006'), 'en', 'Single brush CS 1006'), ((SELECT product_id FROM prm_product WHERE product_name='Single krtačka CS 1006'), 'it', 'Spazzolino Single CS 1006'),
((SELECT product_id FROM prm_product WHERE product_name='Zobna ščetka smart'), 'en', 'Tooth brush Smart'), ((SELECT product_id FROM prm_product WHERE product_name='Zobna ščetka smart'), 'it', 'Spazzolino da denti Smart'),
((SELECT product_id FROM prm_product WHERE product_name='Zobna ščetka 3 pac Smart Ultra soft - manjše'), 'en', 'Toothbrush 3 pac Smart Ultra soft'), ((SELECT product_id FROM prm_product WHERE product_name='Zobna ščetka 3 pac Smart Ultra soft - manjše'), 'it', 'Spazzolino da denti 3 pac Smart Ultra soft'),
((SELECT product_id FROM prm_product WHERE product_name='Ustna voda Perio +0,05 Balance'), 'en', 'Mouthwash Perio +0.05 Balance'), ((SELECT product_id FROM prm_product WHERE product_name='Ustna voda Perio +0,05 Balance'), 'it', 'Coluttorio Perio +0.05 Balance'),
((SELECT product_id FROM prm_product WHERE product_name='Ustna voda Perio +0,09 Regenerate'), 'en', 'Mouthwash Perio +0.09 Regenerate'), ((SELECT product_id FROM prm_product WHERE product_name='Ustna voda Perio +0,09 Regenerate'), 'it', 'Coluttorio Perio +0.09 Regenerate'),
((SELECT product_id FROM prm_product WHERE product_name='Ustna voda Perio +0,12 Protect'), 'en', 'Mouthwash Perio +0.12 Protect'), ((SELECT product_id FROM prm_product WHERE product_name='Ustna voda Perio +0,12 Protect'), 'it', 'Coluttorio Perio +0.12 Protect'),
((SELECT product_id FROM prm_product WHERE product_name='Ustna voda Perio +0,20 Forte'), 'en', 'Mouthwash Perio +0.20 Forte'), ((SELECT product_id FROM prm_product WHERE product_name='Ustna voda Perio +0,20 Forte'), 'it', 'Coluttorio Perio +0.20 Forte'),
((SELECT product_id FROM prm_product WHERE product_name='Zobna pasta Perio + Support 0,09'), 'en', 'Mouthwash Perio +0.09 Support'), ((SELECT product_id FROM prm_product WHERE product_name='Zobna pasta Perio + Support 0,09'), 'it', 'Coluttorio Perio +0.09 Support'),
((SELECT product_id FROM prm_product WHERE product_name='Gel Perio + Focus 0,5'), 'en', 'Gel Perio + Focus 0,5'), ((SELECT product_id FROM prm_product WHERE product_name='Gel Perio + Focus 0,5'), 'it', 'Gel Perio + Focus 0,5'),
((SELECT product_id FROM prm_product WHERE product_name='Ustna voda Bluem'), 'en', 'Mouthwash Bluem'), ((SELECT product_id FROM prm_product WHERE product_name='Ustna voda Bluem'), 'it', 'Coluttorio Bluem'),
((SELECT product_id FROM prm_product WHERE product_name='Zobna pasta Bluem'), 'en', 'Toothpaste Bluem'), ((SELECT product_id FROM prm_product WHERE product_name='Zobna pasta Bluem'), 'it', 'Dentifricio Bluem'),
((SELECT product_id FROM prm_product WHERE product_name='Set Perio + Regenerate'), 'en', 'Set Perio + Regenerate'), ((SELECT product_id FROM prm_product WHERE product_name='Set Perio + Regenerate'), 'it', 'Set Perio + Regenerate'),
((SELECT product_id FROM prm_product WHERE product_name='Set Perio + Balance'), 'en', 'Set Perio + Balance'), ((SELECT product_id FROM prm_product WHERE product_name='Set Perio + Balance'), 'it', 'Set Perio + Balance'),
((SELECT product_id FROM prm_product WHERE product_name='Set Perio + Forte'), 'en', 'Set Perio + Forte'), ((SELECT product_id FROM prm_product WHERE product_name='Set Perio + Forte'), 'it', 'Set Perio + Forte'),
((SELECT product_id FROM prm_product WHERE product_name='Set Bluem voda in pasta'), 'en', 'Set Bluem mouthwash and toothpaste'), ((SELECT product_id FROM prm_product WHERE product_name='Set Bluem voda in pasta'), 'it', 'Set Bluem colutorio e dentifricio'),
((SELECT product_id FROM prm_product WHERE product_name='Easy reach flossers 25kom zobne nitke z držali (zelene)'), 'en', 'Easy reach flossers 25pcs dental floss with holders (green)'), ((SELECT product_id FROM prm_product WHERE product_name='Easy reach flossers 25kom zobne nitke z držali (zelene)'), 'it', 'Easy reach flossers 25 pezzi - verdi'),
((SELECT product_id FROM prm_product WHERE product_name='Miracle flosser mini zobne nitke z držali (modre)'), 'en', 'Miracle flosser mini dental floss with holders (blue)'), ((SELECT product_id FROM prm_product WHERE product_name='Miracle flosser mini zobne nitke z držali (modre)'), 'it', 'Miracle flosser mimi BLU'),
((SELECT product_id FROM prm_product WHERE product_name='Easy clean Flosser držalo + 5 refil'), 'en', 'Easy clean Flosser holder + 5 refill'), ((SELECT product_id FROM prm_product WHERE product_name='Easy clean Flosser držalo + 5 refil'), 'it', 'Easy clean Flosser + 5 refill'),
((SELECT product_id FROM prm_product WHERE product_name='Maska FFP2 - KN 95'), 'en', 'Mask FFP2 - KN 95'), ((SELECT product_id FROM prm_product WHERE product_name='Maska FFP2 - KN 95'), 'it', 'Mascherina FFP2 - KN 95'),
((SELECT product_id FROM prm_product WHERE product_name='Maska FFP2 - KN 95 10x'), 'en', 'Mask FFP2 - KN 95 10x'), ((SELECT product_id FROM prm_product WHERE product_name='Maska FFP2 - KN 95 10x'), 'it', 'Mascherina FFP2 - KN 95 10x'),
((SELECT product_id FROM prm_product WHERE product_name='Kirurška maska'), 'en', 'Surgical mask'), ((SELECT product_id FROM prm_product WHERE product_name='Kirurška maska'), 'it', 'Mascherina chirurgica'),
((SELECT product_id FROM prm_product WHERE product_name='Opalescence zobna pasta'), 'en', 'Opalescence toothpaste'), ((SELECT product_id FROM prm_product WHERE product_name='Opalescence zobna pasta'), 'it', 'Opalescence dentifricio sbiancante'),
((SELECT product_id FROM prm_product WHERE product_name='Remot zobna pasta'), 'en', 'Remot toothpaste'), ((SELECT product_id FROM prm_product WHERE product_name='Remot zobna pasta'), 'it', 'Remot dentifricio sbiancante'),
((SELECT product_id FROM prm_product WHERE product_name='Curaprox Hydrosonic PRO - sonična zobna ščetka'), 'en', 'Curaprox Hydrosonic PRO - sonic toothbrush'), ((SELECT product_id FROM prm_product WHERE product_name='Curaprox Hydrosonic PRO - sonična zobna ščetka'), 'it', 'Curaprox Hydrosonic PRO - spazzolino sonico'),
((SELECT product_id FROM prm_product WHERE product_name='Hydrosonic sensitive round - glava sonične ščetke'), 'en', 'Hydrosonic sensitive round - sonic brush head'), ((SELECT product_id FROM prm_product WHERE product_name='Hydrosonic sensitive round - glava sonične ščetke'), 'it', 'Hydrosonic CHS 200 sensitive - testina spazzolino sonico'),
((SELECT product_id FROM prm_product WHERE product_name='Hydrosonic power round - glava sonične ščetke'), 'en', 'Hydrosonic power round - sonic brush head'), ((SELECT product_id FROM prm_product WHERE product_name='Hydrosonic power round - glava sonične ščetke'), 'it', 'Hydrosonic CHS 200 power - testina spazzolino sonico'),
((SELECT product_id FROM prm_product WHERE product_name='Medzobne ščetke refill x 8 CPS 07'), 'en', 'Interdental brushes refill x 8 CPS 07'), ((SELECT product_id FROM prm_product WHERE product_name='Medzobne ščetke refill x 8 CPS 07'), 'it', 'Spazzolini interdentali x 8 CPS 07'),
((SELECT product_id FROM prm_product WHERE product_name='Medzobne ščetke refill x 8 CPS 011'), 'en', 'Interdental brushes refill x 8 CPS 011'), ((SELECT product_id FROM prm_product WHERE product_name='Medzobne ščetke refill x 8 CPS 011'), 'it', 'Spazzolini interdentali x 8 CPS 011'),
((SELECT product_id FROM prm_product WHERE product_name='Hydrosonic Smart Black is White 259 - glava sonične ščetke'), 'en', 'Hydrosonic Smart Black is White 259 - sonic brush head'), ((SELECT product_id FROM prm_product WHERE product_name='Hydrosonic Smart Black is White 259 - glava sonične ščetke'), 'it', 'Hydrosonic Smart Black is White 259 - testina spazzolino sonico'),
((SELECT product_id FROM prm_product WHERE product_name='Curaprox Black is White - sonična zobna ščetka'), 'en', 'Curaprox Black is White - sonic toothbrush'), ((SELECT product_id FROM prm_product WHERE product_name='Curaprox Black is White - sonična zobna ščetka'), 'it', 'Curaprox Black is White - spazzolino sonico'),
((SELECT product_id FROM prm_product WHERE product_name='Hydrosonic CHS 200 sensitive long - glava sonične ščetke'), 'en', 'Hydrosonic CHS 200 sensitive long - sonic brush head'), ((SELECT product_id FROM prm_product WHERE product_name='Hydrosonic CHS 200 sensitive long - glava sonične ščetke'), 'it', 'Hydrosonic CHS 200 sensitive long- testina spazzolino sonico'),
((SELECT product_id FROM prm_product WHERE product_name='Hydrosonic CHS 300 power long - glava sonične ščetke'), 'en', 'Hydrosonic CHS 300 power long - sonic brush head'), ((SELECT product_id FROM prm_product WHERE product_name='Hydrosonic CHS 300 power long - glava sonične ščetke'), 'it', 'Hydrosonic CHS 300 power long- testina spazzolino sonico'),
((SELECT product_id FROM prm_product WHERE product_name='Zobna ščetka Velvet CS 12460'), 'en', 'Toothbrush Velvet CS 12460'), ((SELECT product_id FROM prm_product WHERE product_name='Zobna ščetka Velvet CS 12460'), 'it', 'Spazzolino da denti Velvet CS 12460'),
((SELECT product_id FROM prm_product WHERE product_name='Theodent Classic - zobna pasta'), 'en', 'Theodent Classic - toothpaste'), ((SELECT product_id FROM prm_product WHERE product_name='Theodent Classic - zobna pasta'), 'it', 'Theodent Classic - dentifricio'),
((SELECT product_id FROM prm_product WHERE product_name='Theodent 300 - zobna pasta'), 'en', 'Theodent 300 - toothpaste'), ((SELECT product_id FROM prm_product WHERE product_name='Theodent 300 - zobna pasta'), 'it', 'Theodent 300 - dentifricio'),
((SELECT product_id FROM prm_product WHERE product_name='Theodent Kids - zobna pasta'), 'en', 'Theodent Kids - toothpaste'), ((SELECT product_id FROM prm_product WHERE product_name='Theodent Kids - zobna pasta'), 'it', 'Theodent Kids - dentifricio'),
((SELECT product_id FROM prm_product WHERE product_name='Kukident'), 'en', 'Kukident'), ((SELECT product_id FROM prm_product WHERE product_name='Kukident'), 'it', 'Kukident'),
((SELECT product_id FROM prm_product WHERE product_name='Zobna nitka Thorton periodontal'), 'en', 'Dental floss Thorton periodontal'), ((SELECT product_id FROM prm_product WHERE product_name='Zobna nitka Thorton periodontal'), 'it', 'Filo interdentale Thorton periodontal'), ((SELECT product_id FROM prm_product WHERE product_name='Zobna nitka Thorton periodontal'), 'sl', 'Zobna nitka Thorton periodontal'),
((SELECT product_id FROM prm_product WHERE product_name='Otroška zobna ščetka Baby CS 4260'), 'en', 'Kids toothbrush Baby CS 4260'), ((SELECT product_id FROM prm_product WHERE product_name='Otroška zobna ščetka Baby CS 4260'), 'it', 'Spazzolino da denti Baby CS 4260'), ((SELECT product_id FROM prm_product WHERE product_name='Otroška zobna ščetka Baby CS 4260'), 'sl', 'Otroška zobna ščetka Baby CS 4260'),
((SELECT product_id FROM prm_product WHERE product_name='Sonicare protective clean 4100 (modra)'), 'en', 'Sonicare protective clean 4100 (blue)'), ((SELECT product_id FROM prm_product WHERE product_name='Sonicare protective clean 4100 (modra)'), 'it', 'Sonicare protective clean 4100 (blu)'), ((SELECT product_id FROM prm_product WHERE product_name='Sonicare protective clean 4100 (modra)'), 'sl', 'Sonicare protective clean 4100 (modra)'),
((SELECT product_id FROM prm_product WHERE product_name='Sonicare clean 4500 (roza)'), 'en', 'Sonicare clean 4500 (pink)'), ((SELECT product_id FROM prm_product WHERE product_name='Sonicare clean 4500 (roza)'), 'it', 'Sonicare clean 4500 (pink)'), ((SELECT product_id FROM prm_product WHERE product_name='Sonicare clean 4500 (roza)'), 'sl', 'Sonicare clean 4500 (roza)'),
((SELECT product_id FROM prm_product WHERE product_name='Sonicare clean 4500 (črna)'), 'en', 'Sonicare protective clean 4500 (black)'), ((SELECT product_id FROM prm_product WHERE product_name='Sonicare clean 4500 (črna)'), 'it', 'Sonicare protective clean 4500 (nera)'), ((SELECT product_id FROM prm_product WHERE product_name='Sonicare clean 4500 (črna)'), 'sl', 'Sonicare protective clean 4500 (črna)'),
((SELECT product_id FROM prm_product WHERE product_name='Sonicare protective clean 5100 2 pac'), 'en', 'Sonicare protective clean 5100 2 pac'), ((SELECT product_id FROM prm_product WHERE product_name='Sonicare protective clean 5100 2 pac'), 'it', 'Sonicare protective clean 5100 2 pac'), ((SELECT product_id FROM prm_product WHERE product_name='Sonicare protective clean 5100 2 pac'), 'sl', 'Sonicare protective clean 5100 2 pac'),
((SELECT product_id FROM prm_product WHERE product_name='Sonicare optimal white w2 (bela)'), 'en', 'Sonicare optimal white w2 (white)'), ((SELECT product_id FROM prm_product WHERE product_name='Sonicare optimal white w2 (bela)'), 'it', 'Sonicare optimal white w2 (bianca)'), ((SELECT product_id FROM prm_product WHERE product_name='Sonicare optimal white w2 (bela)'), 'sl', 'Sonicare optimal white w2 (bela)'),
((SELECT product_id FROM prm_product WHERE product_name='Sonicare optimal white w2 (črna)'), 'en', 'Sonicare optimal white w2 (black)'), ((SELECT product_id FROM prm_product WHERE product_name='Sonicare optimal white w2 (črna)'), 'it', 'Sonicare optimal white w2 (nera)'), ((SELECT product_id FROM prm_product WHERE product_name='Sonicare optimal white w2 (črna)'), 'sl', 'Sonicare optimal white w2 (črna)'),
((SELECT product_id FROM prm_product WHERE product_name='Sonicare proresults C1'), 'en', 'Sonicare proresults C1'), ((SELECT product_id FROM prm_product WHERE product_name='Sonicare proresults C1'), 'it', 'Sonicare proresults C1'), ((SELECT product_id FROM prm_product WHERE product_name='Sonicare proresults C1'), 'sl', 'Sonicare proresults C1'),
((SELECT product_id FROM prm_product WHERE product_name='Zobna prha AirFloss Ultra'), 'en', 'AirFloss Ultra toothbrush'), ((SELECT product_id FROM prm_product WHERE product_name='Zobna prha AirFloss Ultra'), 'it', 'AirFloss'), ((SELECT product_id FROM prm_product WHERE product_name='Zobna prha AirFloss Ultra'), 'sl', 'Zobna prha AirFloss Ultra'),
((SELECT product_id FROM prm_product WHERE product_name='Zobna ščetka 2 pac Ultra soft CS 5460 Limited Edition'), 'en', 'Toothbrush 2 pac Ultra soft CS 5460 Limited Edition'), ((SELECT product_id FROM prm_product WHERE product_name='Zobna ščetka 2 pac Ultra soft CS 5460 Limited Edition'), 'it', 'Spazzolino da denti 2 pac Ultra soft CS 5460 Limited Edition'), ((SELECT product_id FROM prm_product WHERE product_name='Zobna ščetka 2 pac Ultra soft CS 5460 Limited Edition'), 'sl', 'Zobna ščetka 2 pac Ultra soft CS 5460 Limited Edition'),
((SELECT product_id FROM prm_product WHERE product_name='Zobna ščetka 3 pac Ultra soft CS 5460 Limited Edition'), 'en', 'Toothbrush 3 pac Ultra soft CS 5460 Limited Edition'), ((SELECT product_id FROM prm_product WHERE product_name='Zobna ščetka 3 pac Ultra soft CS 5460 Limited Edition'), 'it', 'Spazzolino da denti 3 pac Ultra soft CS 5460 Limited Edition'), ((SELECT product_id FROM prm_product WHERE product_name='Zobna ščetka 3 pac Ultra soft CS 5460 Limited Edition'), 'sl', 'Zobna ščetka 3 pac Ultra soft CS 5460 Limited Edition');

--############################################################
--# Linking prm_client with clients table
--############################################################

ALTER TABLE prm_client RENAME COLUMN client_id TO id;

ALTER TABLE prm_client ADD COLUMN clients_id SERIAL
CONSTRAINT prm_client_clients_fk REFERENCES clients (id);

--############################################################
--# Altering vat_tax_amount table
--############################################################

ALTER TABLE vat_tax_amount RENAME TO vat_tax_rate;

ALTER TABLE vat_tax_rate 
RENAME COLUMN vat_tax_amount TO vat_tax_rate;

ALTER TABLE vat_tax_rate 
RENAME COLUMN vat_tax_amount_id TO vat_tax_id;

ALTER TABLE vat_tax_rate
ADD COLUMN tax_rate_label VARCHAR(32);

ALTER TABLE vat_tax_rate 
RENAME COLUMN vat_tax_rate TO tax_rate;

DELETE FROM vat_tax_rate;

INSERT INTO vat_tax_rate (tax_rate, country_id, tax_rate_label) VALUES 
(NULL, 1, 'Not taxable'), (0, 1, '0'), (9.5, 1, '9.5'), (22, 1, '22');

--############################################################
--# Deleting product_name from prm_product
--############################################################

ALTER TABLE prm_product DROP COLUMN product_name;

--############################################################
--# Link users to prm_company_id table
--############################################################

ALTER TABLE users ADD COLUMN prm_company_id INT 
CONSTRAINT users_prm_company_fk REFERENCES prm_company (company_id);

--############################################################
--# Altering, creating translation tables and filling them with values
--############################################################

CREATE TABLE IF NOT EXISTS prm_product_group_name (
	id					SERIAL PRIMARY KEY,
	product_group_id	INT CONSTRAINT prm_product_group_name_prm_product_group REFERENCES prm_product_group (product_group_id),
	language			VARCHAR(8),
	text				VARCHAR(128),
	created_date		DATE NOT NULL DEFAULT CURRENT_DATE 
);

INSERT INTO prm_product_group_name (language, text, product_group_id) VALUES
('sl', 'Zobne luske', (SELECT product_group_id FROM prm_product_group WHERE product_group_name='Zobne luske')),
('sl', 'Pregled', (SELECT product_group_id FROM prm_product_group WHERE product_group_name='Pregled')),
('sl', 'Ortodontija', (SELECT product_group_id FROM prm_product_group WHERE product_group_name='Ortodontija')),
('sl', 'Oralna kirurgija', (SELECT product_group_id FROM prm_product_group WHERE product_group_name='Oralna kirurgija')),
('sl', 'Endodontsko zdravljenje', (SELECT product_group_id FROM prm_product_group WHERE product_group_name='Endodontsko zdravljenje')),
('sl', 'Parodontologija', (SELECT product_group_id FROM prm_product_group WHERE product_group_name='Parodontologija')),
('sl', 'Zobne bolezni', (SELECT product_group_id FROM prm_product_group WHERE product_group_name='Zobne bolezni')),
('sl', 'Zobni vsadki', (SELECT product_group_id FROM prm_product_group WHERE product_group_name='Zobni vsadki')),
('sl', 'Fiksna protetika', (SELECT product_group_id FROM prm_product_group WHERE product_group_name='Fiksna protetika')),
('sl', 'Preventiva', (SELECT product_group_id FROM prm_product_group WHERE product_group_name='Preventiva')),
('sl', 'Snemna protetika', (SELECT product_group_id FROM prm_product_group WHERE product_group_name='Snemna protetika')),
('sl', 'Beljenje zob', (SELECT product_group_id FROM prm_product_group WHERE product_group_name='Beljenje zob')),
('sl', 'Slikovna diagnostika', (SELECT product_group_id FROM prm_product_group WHERE product_group_name='Slikovna diagnostika')),
('sl', 'Zdravilo', (SELECT product_group_id FROM prm_product_group WHERE product_group_name='Zdravilo')),
('sl', 'Invisalign', (SELECT product_group_id FROM prm_product_group WHERE product_group_name='Invisalign')),
('sl', 'Zobni nakit', (SELECT product_group_id FROM prm_product_group WHERE product_group_name='Zobni nakit')),
('sl', 'Ugriz', (SELECT product_group_id FROM prm_product_group WHERE product_group_name='Ugriz')),
('sl', 'Zobne ščetke', (SELECT product_group_id FROM prm_product_group WHERE product_group_name='Zobne ščetke')),
('sl', 'Zobne nitke', (SELECT product_group_id FROM prm_product_group WHERE product_group_name='Zobne nitke')),
('sl', 'Medzobne ščetke', (SELECT product_group_id FROM prm_product_group WHERE product_group_name='Medzobne ščetke')),
('sl', 'Ustne vode', (SELECT product_group_id FROM prm_product_group WHERE product_group_name='Ustne vode')),
('sl', 'Zobne paste', (SELECT product_group_id FROM prm_product_group WHERE product_group_name='Zobne paste'));

INSERT INTO prm_product_group_name (product_group_id, language, text) VALUES
((SELECT product_group_id FROM prm_product_group WHERE product_group_name='Zobne luske'), 'en', 'Veneers'), ((SELECT product_group_id FROM prm_product_group WHERE product_group_name='Zobne luske'), 'it', 'Faccette'),
((SELECT product_group_id FROM prm_product_group WHERE product_group_name='Pregled'), 'en', 'Consultation'), ((SELECT product_group_id FROM prm_product_group WHERE product_group_name='Pregled'), 'it', 'Consulenza dentale'),
((SELECT product_group_id FROM prm_product_group WHERE product_group_name='Ortodontija'), 'en', 'Orthodontics'), ((SELECT product_group_id FROM prm_product_group WHERE product_group_name='Ortodontija'), 'it', 'Ortodonzia'),
((SELECT product_group_id FROM prm_product_group WHERE product_group_name='Oralna kirurgija'), 'en', 'Dental surgery'), ((SELECT product_group_id FROM prm_product_group WHERE product_group_name='Oralna kirurgija'), 'it', 'Chirurgia orale e axillo faciale'),
((SELECT product_group_id FROM prm_product_group WHERE product_group_name='Endodontsko zdravljenje'), 'en', 'Endodontics'), ((SELECT product_group_id FROM prm_product_group WHERE product_group_name='Endodontsko zdravljenje'), 'it', 'Endodonzia'),
((SELECT product_group_id FROM prm_product_group WHERE product_group_name='Parodontologija'), 'en', 'Oral disease'), ((SELECT product_group_id FROM prm_product_group WHERE product_group_name='Parodontologija'), 'it', 'Parodontologia'),
((SELECT product_group_id FROM prm_product_group WHERE product_group_name='Zobne bolezni'), 'en', 'Dental disease'), ((SELECT product_group_id FROM prm_product_group WHERE product_group_name='Zobne bolezni'), 'it', 'Malattie dentali'),
((SELECT product_group_id FROM prm_product_group WHERE product_group_name='Zobni vsadki'), 'en', 'Dental implants'), ((SELECT product_group_id FROM prm_product_group WHERE product_group_name='Zobni vsadki'), 'it', 'Impianti dentali'),
((SELECT product_group_id FROM prm_product_group WHERE product_group_name='Fiksna protetika'), 'en', 'Fixed prosthetics'), ((SELECT product_group_id FROM prm_product_group WHERE product_group_name='Fiksna protetika'), 'it', 'Protesi dentarie'),
((SELECT product_group_id FROM prm_product_group WHERE product_group_name='Preventiva'), 'en', 'Preventive care'), ((SELECT product_group_id FROM prm_product_group WHERE product_group_name='Preventiva'), 'it', 'Conservativa'),
((SELECT product_group_id FROM prm_product_group WHERE product_group_name='Snemna protetika'), 'en', 'Removable prosthesis'), ((SELECT product_group_id FROM prm_product_group WHERE product_group_name='Snemna protetika'), 'it', 'Protesi mobili'),
((SELECT product_group_id FROM prm_product_group WHERE product_group_name='Beljenje zob'), 'en', 'Teeth whitening'), ((SELECT product_group_id FROM prm_product_group WHERE product_group_name='Beljenje zob'), 'it', 'Sbiancamento dentale'),
((SELECT product_group_id FROM prm_product_group WHERE product_group_name='Slikovna diagnostika'), 'en', 'Image diagnostics'), ((SELECT product_group_id FROM prm_product_group WHERE product_group_name='Slikovna diagnostika'), 'it', 'Diagnostica per immagine'),
((SELECT product_group_id FROM prm_product_group WHERE product_group_name='Zdravilo'), 'en', 'Medicine'), ((SELECT product_group_id FROM prm_product_group WHERE product_group_name='Zdravilo'), 'it', 'Medicina'),
((SELECT product_group_id FROM prm_product_group WHERE product_group_name='Invisalign'), 'en', 'Invisalign'), ((SELECT product_group_id FROM prm_product_group WHERE product_group_name='Invisalign'), 'it', 'Invisalign'),
((SELECT product_group_id FROM prm_product_group WHERE product_group_name='Zobni nakit'), 'en', 'Tooth brilliant'), ((SELECT product_group_id FROM prm_product_group WHERE product_group_name='Zobni nakit'), 'it', 'Brillantino sul dente'),
((SELECT product_group_id FROM prm_product_group WHERE product_group_name='Ugriz'), 'en', 'Bite'), ((SELECT product_group_id FROM prm_product_group WHERE product_group_name='Ugriz'), 'it', 'Bite'),
((SELECT product_group_id FROM prm_product_group WHERE product_group_name='Zobne ščetke'), 'en', 'Toothbrushes'), ((SELECT product_group_id FROM prm_product_group WHERE product_group_name='Zobne ščetke'), 'it', 'Spazzolini da denti'),
((SELECT product_group_id FROM prm_product_group WHERE product_group_name='Medzobne ščetke'), 'en', 'Interdental brushes'), ((SELECT product_group_id FROM prm_product_group WHERE product_group_name='Medzobne ščetke'), 'it', 'Fili interdali'),
((SELECT product_group_id FROM prm_product_group WHERE product_group_name='Zobne nitke'), 'en', 'Dental floss'), ((SELECT product_group_id FROM prm_product_group WHERE product_group_name='Zobne nitke'), 'it', 'Spazzolini interdentali'),
((SELECT product_group_id FROM prm_product_group WHERE product_group_name='Ustne vode'), 'en', 'Mouthwash'), ((SELECT product_group_id FROM prm_product_group WHERE product_group_name='Ustne vode'), 'it', 'Coluttori'),
((SELECT product_group_id FROM prm_product_group WHERE product_group_name='Zobne paste'), 'en', 'Toothpaste'), ((SELECT product_group_id FROM prm_product_group WHERE product_group_name='Zobne paste'), 'it', 'Dentifrici');

ALTER TABLE prm_product_group DROP COLUMN product_group_name;

CREATE TABLE IF NOT EXISTS prm_product_category_name (
	id						SERIAL PRIMARY KEY,
	product_category_id		INT CONSTRAINT prm_product_category_name_prm_product_category REFERENCES prm_product_category (category_id),
	language				VARCHAR(8),
	text					VARCHAR(128),
	created_date			DATE NOT NULL DEFAULT CURRENT_DATE 
);

ALTER TABLE prm_product_category_name
RENAME COLUMN product_category_id TO category_id;

INSERT INTO prm_product_category_name (language, text, category_id) VALUES
('sl', 'Pregled', (SELECT category_id FROM prm_product_category WHERE category_name='Pregled')),
('sl', 'Lepotno Zobozdravstvo', (SELECT category_id FROM prm_product_category WHERE category_name='Lepotno Zobozdravstvo')),
('sl', 'Implantologija', (SELECT category_id FROM prm_product_category WHERE category_name='Implantologija')),
('sl', 'Splošno zobozdravstvo', (SELECT category_id FROM prm_product_category WHERE category_name='Splošno zobozdravstvo')),
('sl', 'Preventivno zobozdravstvo', (SELECT category_id FROM prm_product_category WHERE category_name='Preventivno zobozdravstvo')),
('sl', 'Slikovna diagnostika', (SELECT category_id FROM prm_product_category WHERE category_name='Slikovna diagnostika')),
('sl', 'Farmakološka terapija', (SELECT category_id FROM prm_product_category WHERE category_name='Farmakološka terapija')),
('sl', 'Ustna higiena', (SELECT category_id FROM prm_product_category WHERE category_name='Ustna higiena'));

INSERT INTO prm_product_category_name (category_id, language, text) VALUES
((SELECT category_id FROM prm_product_category WHERE category_name='Pregled'), 'en', 'Consultation'), ((SELECT category_id FROM prm_product_category WHERE category_name='Pregled'), 'it', 'Consulenza'),
((SELECT category_id FROM prm_product_category WHERE category_name='Lepotno Zobozdravstvo'), 'en', 'Aesthetic dentistry'), ((SELECT category_id FROM prm_product_category WHERE category_name='Lepotno Zobozdravstvo'), 'it', 'Estetica dentale'),
((SELECT category_id FROM prm_product_category WHERE category_name='Implantologija'), 'en', 'Implantology'), ((SELECT category_id FROM prm_product_category WHERE category_name='Implantologija'), 'it', 'Implantologia'),
((SELECT category_id FROM prm_product_category WHERE category_name='Splošno zobozdravstvo'), 'en', 'General dentistry'), ((SELECT category_id FROM prm_product_category WHERE category_name='Splošno zobozdravstvo'), 'it', 'Odontoiatria generale'),
((SELECT category_id FROM prm_product_category WHERE category_name='Preventivno zobozdravstvo'), 'en', 'Preventive dentistry'), ((SELECT category_id FROM prm_product_category WHERE category_name='Preventivno zobozdravstvo'), 'it', 'Prevenzione'),
((SELECT category_id FROM prm_product_category WHERE category_name='Slikovna diagnostika'), 'en', 'Image diagnostics'), ((SELECT category_id FROM prm_product_category WHERE category_name='Slikovna diagnostika'), 'it', 'Diagnostica per immagine'),
((SELECT category_id FROM prm_product_category WHERE category_name='Farmakološka terapija'), 'en', 'Pharmacological therapy'), ((SELECT category_id FROM prm_product_category WHERE category_name='Farmakološka terapija'), 'it', 'Terapia farmacologica'),
((SELECT category_id FROM prm_product_category WHERE category_name='Ustna higiena'), 'en', 'Oral hygiene'), ((SELECT category_id FROM prm_product_category WHERE category_name='Ustna higiena'), 'it', 'Igiene orale');

ALTER TABLE prm_product_category DROP COLUMN category_name;

--############################################################
--# Creating business_customer table and linking it to invoice
--############################################################

CREATE TABLE IF NOT EXISTS business_customer (
	id					SERIAL,
	name				VARCHAR(128),
	address_line_1		VARCHAR(128),
	email				VARCHAR(64),
	post_code			INT,
	city				VARCHAR (64),
	country_code		VARCHAR(8),
	tax_number			VARCHAR(32),
	vat_number			VARCHAR(32),
	created_date		DATE NOT NULL DEFAULT CURRENT_DATE 
);

ALTER TABLE business_customer ADD CONSTRAINT business_customer_pk PRIMARY KEY (id);

ALTER TABLE invoice ADD COLUMN business_customer_id INT
CONSTRAINT invoice_business_customer REFERENCES business_customer (id);

--############################################################
--# Add invoice_status to invoice table
--############################################################

ALTER TABLE invoice ADD COLUMN invoice_status VARCHAR(32);

--############################################################
--# Add tax_payer to prm_company table
--############################################################

ALTER TABLE prm_company ADD COLUMN tax_payer BOOLEAN DEFAULT 't';

--############################################################
--# Drop column "product_taxable_amount" from invoice_item
--############################################################

ALTER TABLE invoice_item DROP COLUMN product_taxable_amount;



UPDATE db_version SET version ='01.13', version_date=CURRENT_DATE WHERE resource='Tables';


COMMIT;