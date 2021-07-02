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
(366, 'en', 'Dental examination'), (366, 'it', 'Controllo dentistico 1'),
(367, 'en', 'Short dental examination'), (367, 'it', 'Controllo dentistico 2'),
(368, 'en', 'CRM dental examination'), (368, 'it', 'Controllo dentistico 3'),
(369, 'en', 'Removal of hard and soft plaque along the arch'), (369, 'it', 'Ablazione tartaro per arcata'),
(370, 'en', 'Sandblasting along the arch'), (370, 'it', 'Sabbiatura e lucidatura per arcata'),
(371, 'en', 'Erosion'), (371, 'it', 'Otturazione di V classe'),
(372, 'en', 'Filling on a single surface'), (372, 'it', 'Otturazione semplice'),
(373, 'en', 'Filling on two surfaces'), (373, 'it', 'Otturazione media'),
(374, 'en',  'Filling on three surfaces'), (374, 'it', 'Otturazione grande'),
(375, 'en', 'Tooth augmentation'), (375, 'it', 'Ricostruzione in composito'),
(376, 'en',  'Cofferdam'), (376, 'it', 'Koferdam'),
(377, 'en',  'Fissure filling'), (377, 'it', 'Sigillatura dei solchi e fosette per elemento'),
(378, 'en',  'Gangrene treatment and filling through the canal'), (378, 'it', 'Cura canalare per canale'),
(379, 'en', 'Re-treatment through the canal'), (379, 'it', 'Ritrattamento per canale'),
(380, 'en', 'Medicine with a provisional filling'), (380, 'it', 'Medicamento con otturazione provisoria'),
(381, 'en', 'Direct pulp coverage'), (381, 'it', 'Incappucciamento diretto/indiretto di polpa'),
(382, 'en', 'Pulp canal tremor'), (382, 'it', 'Trapanazione del dente'),
(383, 'en', 'Local anesthesia'), (383, 'it', 'Anestesia locale'),
(384, 'en',  'Loose tooth extraction'), (384, 'it', 'Estrazione semplice'),
(385, 'en', 'Single-root tooth extraction'), (385, 'it', 'Estrazione monoradiculare'),
(386, 'en',  'Multi-root tooth extraction'), (386, 'it', 'Estrazione puliradicolare o complessa'),
(387, 'en', 'Surgical extraction'), (387, 'it',  'Estrazione complessa'),
(388, 'en', 'Tooth extraction'), (388, 'it', 'Estrazione complessa 2'),
(389, 'en', 'Apicotomy of one root'), (389, 'it', 'Apicotomia - 1 radice'),
(390, 'en', 'Apicotomy of two roots'), (390, 'it', 'Apicotomia - 2 radici'),
(391, 'en', 'Apicotomy of three roots'), (391, 'it', 'Apicotomia - 3 radici'),
(392, 'en', 'Flap operation per quadrant'), (392, 'it', 'Cure parodontologiche'),
(393, 'en', 'Extension of the clinical crown'), (393, 'it', 'Estensione della corona'),
(394, 'en', 'Periodontal treatment'), (394, 'it', 'Cure parodontologice 2'),
(395, 'en', 'Periodontal treatment - laser'), (395, 'it', 'Cure parodontologice con laser'),
(396, 'en', 'Closed sinus lift'), (396, 'it', 'Sinus lift - chiuso'),
(397, 'en', 'Opened sinus lift'), (397, 'it', 'Sinus lift- aperto'),
(398, 'en', 'Minor upgrade with bone replacement'), (398, 'it', 'Sostituzione ossea minore'),
(399, 'en', 'Upgrading with bone replacement and membrane'), (399, 'it', 'Sostituzione ossea maggiore con membrana'),
(400, 'en', 'Bone implant'), (400, 'it', 'Transplanto osseo'),
(401, 'en',  'Implant insertion'), (401, 'it', 'Inserimento impianto'),
(402, 'en', 'Ceramic coating'), (402, 'it', 'Corona in ceramica'),
(403, 'en', 'Zirconium coating'), (403, 'it', 'Corona in zirconio'),
(404, 'en', 'Zirconium inlay'), (404, 'it', 'Intarsio in zirconio'),
(405, 'en', 'Ceramic inlay'), (405, 'it', 'Intarsio in ceramica'),
(406, 'en', 'Composite inlay'), (406, 'it', 'Intarsio in composito'),
(407, 'en', 'Zirconium veneer'), (407, 'it', 'Faccetta in zirconio'),
(408, 'en', 'Ceramic veneer'), (408, 'it', 'Faccetta in ceramica'),
(409, 'en', 'Composite veneer'), (409, 'it', 'Faccetta in composito'),
(410, 'en', 'Abutment + zirconium coating'), (410, 'it', 'Abutment + corona in zirconio'),
(411, 'en', '4 implants + zirconium bridge'), (411, 'it', '4 impianti + ponte in zirconio'),
(412, 'en', '5 implants + zirconium bridge'), (412, 'it', '5 impianti + ponte in zirconio'),
(413, 'en', '2 implants + total dentures'), (413, 'it', '2 impianti + protesi mobile'),
(414, 'en', '4 implants + total dentures'), (414, 'it', '4 impianti + protesi mobile'),
(415, 'en', '2 implants + 4 zirconium coatings + partial denture'), (415, 'it', '2 impianti + 4 corone in zirconia + protezi parciale'),
(416, 'en', 'Red ceramic per tooth'), (416, 'it', 'Ceramica rossa per dente'),
(417, 'en', NULL), (417, 'it', 'frc perno'),
(418, 'en', NULL), (418, 'it', 'Perno in zirconio'),
(419, 'en', 'Provisional coating'), (419, 'it', 'Corona provisoria'),
(420, 'en', 'Disassembly per tooth'), (420, 'it', 'Demontaggio di corona'),
(421, 'en', 'Total dentures'), (421, 'it', 'Protesi totale'),
(422, 'en', 'Partial denture with cast base'), (422, 'it', 'Protesi parciale scheletrata'),
(423, 'en', 'Indirect lining'), (423, 'it', 'Ribasatura indiretta'),
(424, 'en', 'Direct lining'), (424, 'it', 'Ribasatura diretta'),
(425, 'en', 'Basic repairs of denture'), (425, 'it', 'Riparazione semplice di protesi mobile'),
(426, 'en', 'Additional element'), (426, 'it', 'Modellamento di dente mancante'),
(427, 'en', 'Immediate denture'), (427, 'it', 'Protesi immediata'),
(428, 'en', 'Immediate denture with clasps'), (428, 'it', 'Protesi immediata 2'),
(429, 'en', NULL), (429, 'it', 'Protesi mobile, un dente'),
(430, 'en', 'Injection of hyaluronic acid 1 ml'), (430, 'it', 'Iniezione di acido ialuronico 1. sesione'),
(431, 'en', 'Teeth whitening without stencils 3x15 min'), (431, 'it', 'Sbiancamento'),
(432, 'en', 'Teeth whitening + stencils'), (432, 'it', 'Sbiancamento 2'),
(433, 'en', 'Splint'), (433, 'it', 'Stecca'),
(434, 'en', 'Mouthguard'), (434, 'it', 'Paradenti'),
(435, 'en', 'Cbct 1'), (435, 'it', 'Cbct 1'),
(436, 'en', 'Cbct 2'), (436, 'it', 'Cbct 2'),
(437, 'en', 'Cbct 3'), (437, 'it', 'Cbct 3'),
(438, 'en', 'X-Ray'), (438, 'it', 'Rtg panoramica'),
(439, 'en', 'X-Ray (local)'), (439, 'it', 'Rtg locale'),
(440, 'en', 'Hygiene - opalescence'), (440, 'it', 'Opalescence dentifricio'),
(441, 'en', 'Hygiene - bluem'), (441, 'it', 'Bluem'),
(442, 'en', 'Hygiene - corega'), (442, 'it', 'Corega'),
(443, 'en', 'Optragate'), (443, 'it', 'Optragate'),
(444, 'en', 'Wedge'), (444, 'it', 'Cuneo dentale sagomato'),
(445, 'en', 'Teflon replacement'), (445, 'it', 'Teflon'),
(446, 'en', 'Implant insertion, abutment zirconium coating'), (446, 'it', 'Inserimento impianto, abutment, corona in zirconio'),
(447, 'en', 'Imprint, function bucket, examination'), (447, 'it', 'Impronta'),
(448, 'en', 'Whitening of an individual tooth'), (448, 'it', 'Sbiancameto del dente'),
(449, 'en', 'Prescription'), (449, 'it', 'Ricetta'),
(450, 'en', 'Viscostat'), (450, 'it', 'Viscostat'),
(451, 'en', 'Opalescence 16%'), (451, 'it', 'Opalescence 16%'),
(452, 'en', 'Cleaning tartar on dentures'), (452, 'it', 'Ablazione del tartaro sulla protezi/apparecchio'),
(453, 'en', 'Pocket curettage per tooth'), (453, 'it', 'Pulizzia parodontologica per dente'),
(454, 'en', 'Penalties for unannounced absence'), (454, 'it', 'Penale'),
(455, 'en', 'Voltfast 50 mg - 3x powder'), (455, 'it', 'Voltfast 50 mg - 3 bustine'),
(456, 'en', 'Oki 80 mg granules - 2x powder'), (456, 'it', 'Oki 80 mg granule - 2 bustine'),
(457, 'en', 'Augmentin 875 / 125mg'), (457, 'it', 'Augmentin 875/125mg'),
(458, 'en', 'Sumamed 500mg'), (458, 'it', 'Sumamed 500mg'),
(459, 'en', 'Amoxiclav 1000mg tablet'), (459, 'it', 'Amoksiklav 1000 mg tavoletta'),
(460, 'en', 'Klimicin 300mg capsule'), (460, 'it', 'Klimicin 300 mg capsula'),
(461, 'en', 'GM key'), (461, 'it', 'GM chiave'),
(462, 'en', 'Examination + impression (braces)'), (462, 'it', 'Visita + impronta per l`apparecchio'),
(463, 'en', 'Invisalign splint'), (463, 'it', 'Invisalign stecca'),
(464, 'en', 'Removable plate'), (464, 'it', 'Apparecchio mobile'),
(465, 'en', 'Retainer'), (465, 'it', 'Retainer'),
(466, 'en', 'Retainer - bonding'), (466, 'it', 'Retainer - incollaggio'),
(467, 'en', 'Teeth whitening - 15 min'), (467, 'it', 'Sbiancamento - 15 min'),
(468, 'en', 'Temporary veneer 1'), (468, 'it', ' Dente provisorico 1'),
(469, 'en', 'Temporary veneer 2'), (469, 'it', ' Dente provisorico 2'),
(470, 'en', 'Removal of sutures per tooth'), (470, 'it', 'Punti ex'),
(471, 'en', 'Temporary Maryland bridge'), (471, 'it', 'Ponte Maryland provisorio'),
(472, 'en', 'Individual zirconium abutment'), (472, 'it', 'Abutment in zirconio'),
(473, 'en', 'Prescription Voltfast'), (473, 'it', 'Voltfast ricetta'),
(474, 'en', 'Gum treatment'), (474, 'it', 'Cure parodontologiche 3'),
(475, 'en', 'Dental jewelry'), (475, 'it', 'Diamante per i denti'),
(476, 'en', 'Material costs'), (476, 'it', 'Costo dei materiali'),
(477, 'en', 'Veneering'), (477, 'it', NULL),
(478, 'en', 'Cementation of old crowns / veneers'), (478, 'it', NULL),
(479, 'en', 'Teeth grinding (per tooth)'), (479, 'it', NULL),
(480, 'en', 'Removal of fixed braces (per tooth)'), (480, 'it', NULL),
(481, 'en', '6 implants + zirconium bridge'), (481, 'it', '6 impianti + ponte in zirconio'),
(482, 'en', 'Incision'), (482, 'it', 'Incizione'),
(483, 'en', 'Straumann implant insertion, abutment, zirconium coating'), (483, 'it', 'Inserimento impianto Straumann, abutment, corona in zirconio'),
(484, 'en', 'Straumann abutment + zirconium coating'), (484, 'it', 'Straumann abutment + corona in zirconio'),
(485, 'en', 'Straumann implant insertion'), (485, 'it', 'Inserimento impianto Straumann'),
(486, 'en', 'Straumann ind abutment + zirconium coating'), (486, 'it', 'Straumann ind abutment + corona in zirconio'),
(487, 'en', 'Zirconium coating + e-max'), (487, 'it', 'Corona in zirconio + e-max'),
(488, 'en', 'Stopping bleeding'), (488, 'it', 'Emostasi'),
(489, 'en', 'Straumann zirconium implant'), (489, 'it', 'Straumann impl in zirconio'),
(490, 'en', 'Laser therapy'), (490, 'it', 'Trattamento con laser'),
(491, 'en', 'Laser therapy (sulcus)'), (491, 'it', 'Trattamento del sulcus con laser'),
(492, 'en', 'Test Covid - 19'), (492, 'it', 'Test Covid - 19'),
(493, 'en', 'Provision on the implant'), (493, 'it', 'Provisorio sull impianto'),
(494, 'en', 'Oki powder - 30 bags'), (494, 'it', 'Oki granuli - 30 bustine'),
(495, 'en', '4 implants + composite bridge'), (495, 'it', '4 impianti + ponte in resina'),
(496, 'en', '5 implants + composite bridge'), (496, 'it', '5 impianti + ponte in resina'),
(497, 'en', '6 implants + composite bridge'), (497, 'it', '6 impianti + ponte in resina'),
(498, 'en', 'Slides in orthodontics'), (498, 'it', NULL),
(499, 'en', 'Orthodontic confection element - neck weight'), (499, 'it', NULL),
(500, 'en', 'Orthodontic confection element - facial arch'), (500, 'it', NULL),
(501, 'en', '3D function bucket'), (501, 'it', NULL),
(502, 'en', NULL), (502, 'it', NULL),
(503, 'en', '3D printed model'), (503, 'it', NULL),
(504, 'en', '3D printed splint'), (504, 'it', NULL),
(505, 'en', NULL), (505, 'it', NULL),
(506, 'en', 'Zirconium screw implant on T-Base'), (506, 'it', NULL),
(507, 'en', 'Zirconium screw implant on T-Base + e-max ceramic'), (507, 'it', NULL),
(508, 'en', 'Zirconium pin'), (508, 'it', NULL),
(509, 'en', 'Zirconium cap'), (509, 'it', NULL),
(510, 'en', 'Zirconium cap + ceramic baking'), (510, 'it', NULL),
(511, 'en', 'Zirconium veneer cut back'), (511, 'it', NULL),
(512, 'en', 'Added tooth to denture'), (512, 'it', NULL),
(513, 'en', 'Simple cast metal base (up to 3 anchors)'), (513, 'it', NULL),
(514, 'en', 'Aesthetic veneer'), (514, 'it', NULL),
(515, 'en', 'Aesthetic veneer with individual application'), (515, 'it', NULL),
(516, 'en', 'Faceted veneer nexco'), (516, 'it', NULL),
(517, 'en', 'Faceting of veneer'), (517, 'it', NULL),
(518, 'en', 'Beam'), (518, 'it', NULL),
(519, 'en', 'Biting stencils'), (519, 'it', NULL),
(520, 'en', 'Implant with full ceramic (zirconium)'), (520, 'it', NULL),
(521, 'en', 'Implant with full ceramic (e-max)'), (521, 'it', NULL),
(522, 'en', 'Indirect denture lining'), (522, 'it', NULL),
(523, 'en', 'Individual function bucket'), (523, 'it', NULL),
(524, 'en', 'Making a metal cast base'), (524, 'it', NULL),
(525, 'en', 'Making a cast base'), (525, 'it', NULL),
(526, 'en', 'Outpouring of the study model'), (526, 'it', NULL),
(527, 'en', 'Kennedy splint'), (527, 'it', NULL),
(528, 'en', 'Surgical forceps for implants'), (528, 'it', NULL),
(529, 'en', 'Complex cast base (sliders, milling, Richmond cap ..)'), (529, 'it', NULL),
(530, 'en', 'Nexco composite inlay'), (530, 'it', NULL),
(531, 'en', 'Metal porcelain veneer'), (531, 'it', NULL),
(532, 'en', 'Labor implant Ankylos'), (532, 'it', NULL),
(533, 'en', 'Labor implant Neodent'), (533, 'it', NULL),
(534, 'en', 'Soldering by element'), (534, 'it', NULL),
(535, 'en', 'Material - Slider (A)'), (535, 'it', NULL),
(536, 'en', 'Material - Slider (B)'), (536, 'it', NULL),
(537, 'en', 'Part modeling in the cast base'), (537, 'it', NULL),
(538, 'en', 'Installation of slides, joint ties'), (538, 'it', NULL),
(539, 'en', 'Grafting per element'), (539, 'it', NULL),
(540, 'en', NULL), (540, 'it', NULL),
(541, 'en', NULL), (541, 'it', NULL),
(542, 'en', 'Nexco on zirconium'), (542, 'it', NULL),
(543, 'en', 'Partial dentures'), (543, 'it', NULL),
(544, 'en', 'Baking of pink ceramic'), (544, 'it', NULL),
(545, 'en', 'Full ceramic veneers'), (545, 'it', NULL),
(546, 'en', 'Full composite veneers Nexco'), (546, 'it', NULL),
(547, 'en', 'Full metal veneers'), (547, 'it', NULL),
(548, 'en', 'Full zirconium on the abutment'), (548, 'it', NULL),
(549, 'en', 'Full zirconium veneers'), (549, 'it', NULL),
(550, 'en', 'Rebuilding the metal frame per cap'), (550, 'it', NULL),
(551, 'en', 'Re-glazing'), (551, 'it', NULL),
(552, 'en', 'Implant placement'), (552, 'it', NULL),
(553, 'en', 'Transferor made per abutment'), (553, 'it', NULL),
(554, 'en', 'Pressed ceramic cap + ceramic baking'), (554, 'it', NULL),
(555, 'en', 'Provisional veneer'), (555, 'it', NULL),
(556, 'en', 'Ref-line Polident per arch'), (556, 'it', NULL),
(557, 'en', 'Denture repair (fracture)'), (557, 'it', NULL),
(558, 'en', 'Abutment milling'), (558, 'it', NULL),
(559, 'en', 'Milling surfaces by element'), (559, 'it', NULL),
(560, 'en', 'Richmond cap without slips'), (560, 'it', NULL),
(561, 'en', 'Total Denture - simple'), (561, 'it', NULL),
(562, 'en', 'Installation of an individual element in the denture repair'), (562, 'it', NULL),
(563, 'en', 'Vizio line ivoclar per arch'), (563, 'it', NULL),
(564, 'en', NULL), (564, 'it', NULL),
(565, 'en', 'Back coating (Schulter mass)'), (565, 'it', NULL),
(566, 'en', NULL), (566, 'it', NULL),
(567, 'en', 'Faceted veneer'), (567, 'it', NULL),
(568, 'en', 'Complete denture 2'), (568, 'it', NULL),
(569, 'en', 'Interdental brushes CPS 06'), (569, 'it', 'Spazzolini inderdentali CPS 06'),
(570, 'en', 'Interdental brushes CPS 07'), (570, 'it', 'Spazzolini inderdentali CPS 07'),
(571, 'en', 'Interdental brushes CPS 08'), (571, 'it', 'Spazzolini inderdentali CPS 08'),
(572, 'en', 'Interdental brushes CPS 09'), (572, 'it', 'Spazzolini inderdentali CPS 09'),
(573, 'en', 'Interdental brushes CPS 011'), (573, 'it', 'Spazzolini inderdentali CPS 011'),
(574, 'en', 'Interdental brushes with holder CPS 405'), (574, 'it', 'Spazzolini inderdentali con manico CPS 405'),
(575, 'en', 'Interdental brushes with holder CPS 406'), (575, 'it', 'Spazzolini inderdentali con manico CPS 406'),
(576, 'en', 'Interdental brushes with holder CPS 408'), (576, 'it', 'Spazzolini inderdentali con manico CPS 408'),
(577, 'en', 'Interdental brushes with holder CPS 410'), (577, 'it', 'Spazzolini inderdentali con manico CPS 410'),
(578, 'en', 'Interdental refill X 12 CPS 06'), (578, 'it', 'Spazzolini inderdentali refill X 12 CPS 06'),
(579, 'en', 'Interdental refill X 12 CPS 07'), (579, 'it', 'Spazzolini inderdentali refill X 12 CPS 07'),
(580, 'en', 'Interdental refill X 12 CPS 08'), (580, 'it', 'Spazzolini inderdentali refill X 12 CPS 08'),
(581, 'en', 'Interdental refill X 12 CPS 09'), (581, 'it', 'Spazzolini inderdentali refill X 12 CPS 09'),
(582, 'en', 'Interdental refill X 12 CPS 011'), (582, 'it', 'Spazzolini inderdentali refill X 12 CPS 011'),
(583, 'en', 'Interdental pocket set 457'), (583, 'it', 'Spazzolini inderdentali pocket set 457'),
(584, 'en', 'Aluminum holder for interdental UHS 410'), (584, 'it', 'Manico alu. per spazzolini interdentali CPS 410'),
(585, 'en', 'Aluminum holder for interdental UHS 411'), (585, 'it', 'Manico alu. per spazzolini interdentali CPS 411'),
(586, 'en', 'Aluminum holder for interdental UHS 413'), (586, 'it', 'Manico alu. per spazzolini interdentali CPS 413'),
(587, 'en', 'Dental floss Curaprox teflon DF 820'), (587, 'it', 'Filo interdentale teflon DF 820'),
(588, 'en', 'Dental floss Jordan easy slide'), (588, 'it', 'Filo interdentale Jordan easy slide'),
(589, 'en', 'Dental floss Jordan expand'), (589, 'it', 'Filo interdentale Jordan expand'),
(590, 'en', 'Dental floss Jordan whitening'), (590, 'it', 'Filo interdentale Jordan whitening'),
(591, 'en', 'Dental floss Proxy soft 3 in 1'), (591, 'it', 'Filo interdentale Proxy soft 3 in 1'),
(592, 'en', 'Dental floss Proxy soft bridge and implant'), (592, 'it', 'Filo interdentale soft bridge and implant'),
(593, 'en', 'Dental floss Proxy soft periodontal'), (593, 'it', 'Filo interdentale soft periodontal'),
(594, 'en', 'Tongue scraper CTC 203'), (594, 'it', 'Pulisci lingua CTC 203'),
(595, 'en', 'Toothbrush Ultra soft CS 5460'), (595, 'it', 'Spazzolino da denti Ultra soft CS 5460'),
(596, 'en', 'Toothbrush Ultra soft CS 3960'), (596, 'it', 'Spazzolino da denti Ultra soft CS 3960'),
(597, 'en', 'Toothbrush soft CS 1560'), (597, 'it', 'Spazzolino da denti soft CS 1560'),
(598, 'en', 'Toothbrush 2 pac Ultra soft CS 5460'), (598, 'it', 'Spazzolino da denti 2 pac Ultra soft CS 5460'),
(599, 'en', 'Toothbrush 3 pac Ultra soft CS 5460'), (599, 'it', 'Spazzolino da denti 3 pac Ultra soft CS 5460'),
(600, 'en', 'Toothbrush 3 pac Super soft CS 3960'), (600, 'it', 'Spazzolino da denti 3 pac Super soft CS 3960'),
(601, 'en', 'Toothbrush 3 pac Soft CS 1560'), (601, 'it', 'Spazzolino da denti 3 pac Soft CS 1560'),
(602, 'en', 'Single brush CS 1006'), (602, 'it', 'Spazzolino Single CS 1006'),
(603, 'en', 'Tooth brush Smart'), (603, 'it', 'Spazzolino da denti Smart'),
(604, 'en', 'Toothbrush 3 pac Smart Ultra soft'), (604, 'it', 'Spazzolino da denti 3 pac Smart Ultra soft'),
(605, 'en', 'Mouthwash Perio +0.05 Balance'), (605, 'it', 'Coluttorio Perio +0.05 Balance'),
(606, 'en', 'Mouthwash Perio +0.09 Regenerate'), (606, 'it', 'Coluttorio Perio +0.09 Regenerate'),
(607, 'en', 'Mouthwash Perio +0.12 Protect'), (607, 'it', 'Coluttorio Perio +0.12 Protect'),
(608, 'en', 'Mouthwash Perio +0.20 Forte'), (608, 'it', 'Coluttorio Perio +0.20 Forte'),
(609, 'en', 'Mouthwash Perio +0.09 Support'), (609, 'it', 'Coluttorio Perio +0.09 Support'),
(610, 'en', 'Gel Perio + Focus 0,5'), (610, 'it', 'Gel Perio + Focus 0,5'),
(611, 'en', 'Mouthwash Bluem'), (611, 'it', 'Coluttorio Bluem'),
(612, 'en', 'Toothpaste Bluem'), (612, 'it', 'Dentifricio Bluem'),
(613, 'en', 'Set Perio + Regenerate'), (613, 'it', 'Set Perio + Regenerate'),
(614, 'en', 'Set Perio + Balance'), (614, 'it', 'Set Perio + Balance'),
(615, 'en', 'Set Perio + Forte'), (615, 'it', 'Set Perio + Forte'),
(616, 'en', 'Set Bluem mouthwash and toothpaste'), (616, 'it', 'Set Bluem colutorio e dentifricio'),
(617, 'en', 'Easy reach flossers 25pcs dental floss with holders (green)'), (617, 'it', 'Easy reach flossers 25 pezzi - verdi'),
(618, 'en', 'Miracle flosser mini dental floss with holders (blue)'), (618, 'it', 'Miracle flosser mimi BLU'),
(619, 'en', 'Easy clean Flosser holder + 5 refill'), (619, 'it', 'Easy clean Flosser + 5 refill'),
(620, 'en', 'Mask FFP2 - KN 95'), (620, 'it', 'Mascherina FFP2 - KN 95'),
(621, 'en', 'Mask FFP2 - KN 95 10x'), (621, 'it', 'Mascherina FFP2 - KN 95 10x'),
(622, 'en', 'Surgical mask'), (622, 'it', 'Mascherina chirurgica'),
(623, 'en', 'Opalescence toothpaste'), (623, 'it', 'Opalescence dentifricio sbiancante'),
(624, 'en', 'Remot toothpaste'), (624, 'it', 'Remot dentifricio sbiancante'),
(625, 'en', 'Curaprox Hydrosonic PRO - sonic toothbrush'), (625, 'it', 'Curaprox Hydrosonic PRO - spazzolino sonico'),
(626, 'en', 'Hydrosonic sensitive round - sonic brush head'), (626, 'it', 'Hydrosonic CHS 200 sensitive - testina spazzolino sonico'),
(627, 'en', 'Hydrosonic power round - sonic brush head'), (627, 'it', 'Hydrosonic CHS 200 power - testina spazzolino sonico'),
(628, 'en', 'Interdental brushes refill x 8 CPS 07'), (628, 'it', 'Spazzolini interdentali x 8 CPS 07'),
(629, 'en', 'Interdental brushes refill x 8 CPS 011'), (629, 'it', 'Spazzolini interdentali x 8 CPS 011'),
(630, 'en', 'Hydrosonic Smart Black is White 259 - sonic brush head'), (630, 'it', 'Hydrosonic Smart Black is White 259 - testina spazzolino sonico'),
(631, 'en', 'Curaprox Black is White - sonic toothbrush'), (631, 'it', 'Curaprox Black is White - spazzolino sonico'),
(632, 'en', 'Hydrosonic CHS 200 sensitive long - sonic brush head'), (632, 'it', 'Hydrosonic CHS 200 sensitive long- testina spazzolino sonico'),
(633, 'en', 'Hydrosonic CHS 300 power long - sonic brush head'), (633, 'it', 'Hydrosonic CHS 300 power long- testina spazzolino sonico'),
(634, 'en', 'Toothbrush Velvet CS 12460'), (634, 'it', 'Spazzolino da denti Velvet CS 12460'),
(635, 'en', 'Theodent Classic - toothpaste'), (635, 'it', 'Theodent Classic - dentifricio'),
(636, 'en', 'Theodent 300 - toothpaste'), (636, 'it', 'Theodent 300 - dentifricio'),
(637, 'en', 'Theodent Kids - toothpaste'), (637, 'it', 'Theodent Kids - dentifricio'),
(638, 'en', 'Kukident'), (638, 'it', 'Kukident'),
(639, 'en', 'Dental floss Thorton periodontal'), (639, 'it', 'Filo interdentale Thorton periodontal'), (639, 'sl', 'Zobna nitka Thorton periodontal'),
(640, 'en', 'Kids toothbrush Baby CS 4260'), (640, 'it', 'Spazzolino da denti Baby CS 4260'), (640, 'sl', 'Otroška zobna ščetka Baby CS 4260'),
(641, 'en', 'Sonicare protective clean 4100 (blue)'), (641, 'it', 'Sonicare protective clean 4100 (blu)'), (641, 'sl', 'Sonicare protective clean 4100 (modra)'),
(642, 'en', 'Sonicare clean 4500 (pink)'), (642, 'it', 'Sonicare clean 4500 (pink)'), (642, 'sl', 'Sonicare clean 4500 (roza)'),
(643, 'en', 'Sonicare protective clean 4500 (black)'), (643, 'it', 'Sonicare protective clean 4500 (nera)'), (643, 'sl', 'Sonicare protective clean 4500 (črna)'),
(644, 'en', 'Sonicare protective clean 5100 2 pac'), (644, 'it', 'Sonicare protective clean 5100 2 pac'), (644, 'sl', 'Sonicare protective clean 5100 2 pac'),
(645, 'en', 'Sonicare optimal white w2 (white)'), (645, 'it', 'Sonicare optimal white w2 (bianca)'), (645, 'sl', 'Sonicare optimal white w2 (bela)'),
(646, 'en', 'Sonicare optimal white w2 (black)'), (646, 'it', 'Sonicare optimal white w2 (nera)'), (646, 'sl', 'Sonicare optimal white w2 (črna)'),
(647, 'en', 'Sonicare proresults C1'), (647, 'it', 'Sonicare proresults C1'), (647, 'sl', 'Sonicare proresults C1'),
(648, 'en', 'AirFloss Ultra toothbrush'), (648, 'it', 'AirFloss'), (648, 'sl', 'Zobna prha AirFloss Ultra'),
(649, 'en', 'Toothbrush 2 pac Ultra soft CS 5460 Limited Edition'), (649, 'it', 'Spazzolino da denti 2 pac Ultra soft CS 5460 Limited Edition'), (649, 'sl', 'Zobna ščetka 2 pac Ultra soft CS 5460 Limited Edition'),
(650, 'en', 'Toothbrush 3 pac Ultra soft CS 5460 Limited Edition'), (650, 'it', 'Spazzolino da denti 3 pac Ultra soft CS 5460 Limited Edition'), (650, 'sl', 'Zobna ščetka 3 pac Ultra soft CS 5460 Limited Edition');

DELETE FROM prm_product_name WHERE id IN (1218, 1219, 1228, 1262, 1271);

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

INSERT INTO vat_tax_rate (vat_tax_rate, country_id, tax_rate_label) VALUES 
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
(1, 'en', 'Veneers'), (1, 'it', 'Faccette'),
(2, 'en', 'Consultation'), (2, 'it', 'Consulenza dentale'),
(3, 'en', 'Orthodontics'), (3, 'it', 'Ortodonzia'),
(4, 'en', 'Dental surgery'), (4, 'it', 'Chirurgia orale e axillo faciale'),
(5, 'en', 'Endodontics'), (5, 'it', 'Endodonzia'),
(6, 'en', 'Oral disease'), (6, 'it', 'Parodontologia'),
(7, 'en', 'Dental disease'), (7, 'it', 'Malattie dentali'),
(8, 'en', 'Dental implants'), (8, 'it', 'Impianti dentali'),
(9, 'en', 'Fixed prosthetics'), (9, 'it', 'Protesi dentarie'),
(10, 'en', 'Preventive care'), (10, 'it', 'Conservativa'),
(11, 'en', 'Removable prosthesis'), (11, 'it', 'Protesi mobili'),
(12, 'en', 'Teeth whitening'), (12, 'it', 'Sbiancamento dentale'),
(13, 'en', 'Image diagnostics'), (13, 'it', 'Diagnostica per immagine'),
(14, 'en', 'Medicine'), (14, 'it', 'Medicina'),
(15, 'en', 'Invisalign'), (15, 'it', 'Invisalign'),
(16, 'en', 'Tooth brilliant'), (16, 'it', 'Brillantino sul dente'),
(17, 'en', 'Bite'), (17, 'it', 'Bite'),
(18, 'en', 'Toothbrushes'), (18, 'it', 'Spazzolini da denti'),
(19, 'en', 'Interdental brushes'), (19, 'it', 'Fili interdali'),
(20, 'en', 'Dental floss'), (20, 'it', 'Spazzolini interdentali'),
(21, 'en', 'Mouthwash'), (21, 'it', 'Coluttori'),
(22, 'en', 'Toothpaste'), (22, 'it', 'Dentifrici');

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
(1, 'en', 'Consultation'), (1, 'it', 'Consulenza'),
(2, 'en', 'Aesthetic dentistry'), (2, 'it', 'Estetica dentale'),
(3, 'en', 'Implantology'), (3, 'it', 'Implantologia'),
(4, 'en', 'General dentistry'), (4, 'it', 'Odontoiatria generale'),
(5, 'en', 'Preventive dentistry'), (5, 'it', 'Prevenzione'),
(6, 'en', 'Image diagnostics'), (6, 'it', 'Diagnostica per immagine'),
(7, 'en', 'Pharmacological therapy'), (7, 'it', 'Terapia farmacologica'),
(8, 'en', 'Oral hygiene'), (8, 'it', 'Igiene orale');

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
--# Changing values in vat_tax_rate table, tax_rate_label columns
--############################################################

UPDATE vat_tax_rate SET tax_rate_label = 'Brez davka' WHERE vat_tax_id = 5;
UPDATE vat_tax_rate SET tax_rate_label = 'Nič' WHERE vat_tax_id = 6;
UPDATE vat_tax_rate SET tax_rate_label = 'Nižja stopnja' WHERE vat_tax_id = 7;
UPDATE vat_tax_rate SET tax_rate_label = 'Splošna stopnja' WHERE vat_tax_id = 8;

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