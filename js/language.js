(function () {
  "use strict";
  var STORAGE_KEY = "lorenzo-portfolio-language";
  var translations = {
  "Home": "Home",
  "Over mij": "About me",
  "Expertise": "Expertise",
  "Projecten": "Projects",
  "Opleiding": "Education",
  "CV": "CV",
  "Certificaten": "Certificates",
  "Video's": "Videos",
  "Contact": "Contact",
  "| PLC & Industriële Automatisatie": "| PLC & Industrial Automation",
  "| PLC & Industriële Automatisatie.": "| PLC & Industrial Automation.",
  "← Terug naar home": "← Back to home",
  "← Terug naar Over mij": "← Back to About me",
  "← Terug naar projecten": "← Back to projects",
  "OB1 · Hoofdblok": "OB1 · Main block",
  "Technisch operator, op weg naar onderhoud & PLC-automatisatie": "Technical operator, progressing toward maintenance & PLC automation",
  "Tien jaar ervaring in een hooggeautomatiseerde productieomgeving bij Volvo Cars Gent: storingsanalyse, elektropneumatica en robotinteracties in een MIG/MAG-lasfabriek. Sinds 2025 gediplomeerd onderhoudstechnicus, nu verder in opleiding voor Siemens S7-1200 & TIA Portal.": "Ten years of experience in a highly automated production environment at Volvo Cars Ghent: fault analysis, electropneumatics and robot interactions in a MIG/MAG welding plant. Qualified as a maintenance technician since 2025 and currently continuing training in Siemens S7-1200 & TIA Portal.",
  "Download mijn cv": "Download my CV",
  "Technische details →": "Technical details →",
  "Neem contact op": "Contact me",
  "Typeplaatje": "Nameplate",
  "Functie": "Role",
  "Technisch operator — Volvo Cars Gent": "Technical operator — Volvo Cars Ghent",
  "Diploma": "Qualification",
  "Onderhoudstechnicus (2025)": "Maintenance technician (2025)",
  "In opleiding": "Currently training",
  "PLC & automatisatie — S7-1200 / TIA Portal V19": "PLC & automation — S7-1200 / TIA Portal V19",
  "Sinds": "Since",
  "Regio": "Region",
  "Gent, België": "Ghent, Belgium",
  "Status": "Status",
  "Beschikbaar voor nieuwe kansen": "Open to new opportunities",
  "Network 1 · Over mij": "Network 1 · About me",
  "Praktijkervaring gekoppeld aan permanente opleiding": "Practical experience combined with continuous training",
  "Mijn traject is opgebouwd rond technische groei: van machinebediening en storingsanalyse naar onderhoud, PLC-programmering, HMI-ontwikkeling en industriële netwerken.": "My path is built around technical growth: from machine operation and fault analysis to maintenance, PLC programming, HMI development and industrial networks.",
  "Industrie-ervaring": "Industrial experience",
  "Tien jaar ervaring in een hooggeautomatiseerde productieomgeving bij Volvo Cars Gent, in vaste nachtploeg.": "Ten years of experience in a highly automated production environment at Volvo Cars Ghent, working a permanent night shift.",
  "Probleemoplossend": "Problem-solving",
  "Storingen gestructureerd analyseren, oorzaken herleiden tot component- of programmaniveau en technisch correct ingrijpen.": "Systematically analyse faults, trace causes to component or program level and intervene in a technically correct manner.",
  "Leergierigheid": "Eagerness to learn",
  "Voortdurende opleiding naast het werk: PLC, elektriciteit, pneumatica en ICT — telkens met een concreet doel.": "Continuous training alongside work: PLC, electricity, pneumatics and ICT — always with a specific objective.",
  "Lees mijn motivatie": "Read my motivation",
  "Ontdek hoe mijn praktijkervaring, technische opleidingen en ambitie samenkomen in mijn verdere groei binnen industriële automatisatie.": "Discover how my practical experience, technical training and ambition come together in my continued growth within industrial automation.",
  "Network 2 · Expertise": "Network 2 · Expertise",
  "Vaardigheden en technologieën": "Skills and technologies",
  "HMI & faceplates": "HMI & faceplates",
  "Storingsanalyse": "Fault analysis",
  "Industriële elektriciteit": "Industrial electricity",
  "Pneumatica": "Pneumatics",
  "Elektropneumatica": "Electropneumatics",
  "Alarmbeheer": "Alarm management",
  "Industrie 4.0": "Industry 4.0",
  "Network 3 · Projecten": "Network 3 · Projects",
  "Smart Factory — Siemens TIA Portal V19 praktijkproject": "Smart Factory — Siemens TIA Portal V19 practical project",
  "Van een lege PLC-configuratie naar een volledig getest automatiseringssysteem.": "From an empty PLC configuration to a fully tested automation system.",
  "Fase 1 – Basis": "Phase 1 – Foundation",
  "PLC- en netwerkconfiguratie, UDT’s, Data Blocks, gebruikersbeheer en meertaligheid. De volledige projectstructuur werd vanaf nul opgebouwd in Siemens TIA Portal V19.": "PLC and network configuration, UDTs, Data Blocks, user management and multilingual operation. The entire project structure was built from scratch in Siemens TIA Portal V19.",
  "Bekijk project 1 →": "View project 1 →",
  "Fase 2 – HMI & Alarmbeheer": "Phase 2 – HMI & Alarm Management",
  "Ontwikkeling van proces- en parameterschermen, navigatie, meertalige bediening, herbruikbare faceplates en geïntegreerd alarmbeheer in WinCC Unified.": "Development of process and parameter screens, navigation, multilingual operation, reusable faceplates and integrated alarm management in WinCC Unified.",
  "Bekijk project 2 →": "View project 2 →",
  "Fase 3 – Integratie & Validatie": "Phase 3 – Integration & Validation",
  "Integratie van PLC, HMI, parameters, faceplates en alarmfuncties tot één volledig werkend systeem, gevolgd door functionele tests en einddemonstratie.": "Integration of PLC, HMI, parameters, faceplates and alarm functions into one fully operational system, followed by functional testing and a final demonstration.",
  "Bekijk project 3 →": "View project 3 →",
  "Bekijk alle projecten": "View all projects",
  "Network 4 · Opleiding": "Network 4 · Education",
  "Een technisch traject met duidelijke richting": "A technical path with a clear direction",
  "Onderhoudstechnicus": "Maintenance technician",
  "Diploma behaald in 2025, met focus op technisch onderhoud en storingsdiagnose.": "Qualification obtained in 2025, with a focus on technical maintenance and fault diagnosis.",
  "PLC Module 1 & 2": "PLC Modules 1 & 2",
  "Beide modules succesvol afgerond; Module 3 volgt in het opleidingsjaar 2026–2027.": "Both modules successfully completed; Module 3 follows in the 2026–2027 academic year.",
  "Aanvullende certificaten": "Additional certificates",
  "VCA Basis, BA4, industriële elektriciteit, pneumatica en elektropneumatica.": "VCA Basic, BA4, industrial electricity, pneumatics and electropneumatics.",
  "Bekijk mijn certificaten": "View my certificates",
  "Network 5 · Curriculum vitae": "Network 5 · Curriculum vitae",
  "CV downloaden": "Download CV",
  "Beschikbaar in drie talen, telkens als pdf.": "Available in three languages, each as a PDF.",
  "Nederlands": "Dutch",
  "Download": "Download",
  "Network 6 · Contact": "Network 6 · Contact",
  "Interesse in mijn technisch profiel?": "Interested in my technical profile?",
  "Neem gerust contact op voor een technische functie, samenwerkingsproject of professioneel gesprek.": "Feel free to contact me regarding a technical position, collaborative project or professional discussion.",
  "Stuur een e-mail": "Send an email",
  "© 2026 Lorenzo Bombello · Industriële automatisatie & technisch onderhoud": "© 2026 Lorenzo Bombello · Industrial automation & technical maintenance",
  "Network 1 · Mijn motivatie": "Network 1 · My motivation",
  "Technische groei als bewuste langetermijnkeuze": "Technical growth as a deliberate long-term choice",
  "Ik ben Lorenzo Bombello, technisch operator bij Volvo Cars Gent. Mijn loopbaan is opgebouwd vanuit praktijkervaring, verantwoordelijkheidszin en een blijvende interesse in de techniek achter geautomatiseerde productieprocessen.": "I am Lorenzo Bombello, a technical operator at Volvo Cars Ghent. My career has been built on practical experience, a strong sense of responsibility and a lasting interest in the technology behind automated production processes.",
  "Van productie-ervaring naar technisch inzicht": "From production experience to technical insight",
  "Sinds 2016 werk ik in de GA-lasfabriek van Volvo Cars Gent, in een vaste nachtploeg. In deze hooggeautomatiseerde productieomgeving werk ik dagelijks met installaties waarin robotica, elektropneumatica, sensoren, aandrijvingen en procesbewaking nauw samenwerken. Mijn taken omvatten onder meer een veilige machinebediening, het analyseren van storingen, interacties met robots en correctielassen met MIG/MAG.": "Since 2016, I have worked in the GA welding plant at Volvo Cars Ghent on a permanent night shift. In this highly automated production environment, I work daily with installations in which robotics, electropneumatics, sensors, drives and process monitoring work closely together. My duties include safe machine operation, fault analysis, robot interactions and corrective MIG/MAG welding.",
  "Deze ervaring heeft mij geleerd om technische problemen niet oppervlakkig te benaderen. Ik observeer het proces, verzamel relevante informatie en probeer de oorzaak systematisch te herleiden. Veiligheid en productiekwaliteit blijven daarbij altijd de eerste voorwaarden.": "This experience has taught me not to approach technical problems superficially. I observe the process, gather relevant information and systematically trace the cause. Safety and production quality always remain the primary conditions.",
  "Opleiding naast een voltijdse loopbaan": "Training alongside a full-time career",
  "Mijn technische ontwikkeling stopt niet aan het einde van een werkshift. Naast mijn job volg ik doelgericht opleidingen in onderhoud, industriële elektriciteit, pneumatica, elektropneumatica, ICT, PLC-programmering en automatisatie. In 2025 behaalde ik het diploma Onderhoudstechnicus. Vervolgens verdiepte ik mij verder in Siemens S7-1200, TIA Portal, HMI-ontwikkeling en gestructureerd programmeren.": "My technical development does not stop at the end of a work shift. Alongside my job, I pursue focused training in maintenance, industrial electricity, pneumatics, electropneumatics, ICT, PLC programming and automation. In 2025, I obtained the Maintenance Technician qualification. I then continued to deepen my knowledge of Siemens S7-1200, TIA Portal, HMI development and structured programming.",
  "Ik volg deze opleidingen niet om uitsluitend theorie te verzamelen. Mijn doel is om principes uit de opleiding te begrijpen, praktisch toe te passen en te verbinden met situaties die ik in een industriële omgeving herken.": "I do not take these courses merely to accumulate theory. My goal is to understand the principles, apply them in practice and connect them to situations I recognise in an industrial environment.",
  "Mijn visie op levenslang leren": "My view of lifelong learning",
  "Industriële technologie evolueert voortdurend. Installaties worden sterker geïntegreerd, diagnose wordt datagedreven en van technische medewerkers wordt steeds meer inzicht verwacht in de samenwerking tussen mechanica, elektriciteit en software. Daarom beschouw ik levenslang leren als een noodzakelijk onderdeel van professioneel vakmanschap.": "Industrial technology is constantly evolving. Installations are becoming more integrated, diagnostics are increasingly data-driven, and technical employees are expected to understand the interaction between mechanics, electricity and software. I therefore regard lifelong learning as an essential part of professional craftsmanship.",
  "Voor mij betekent leren: blijven doorvragen, fouten analyseren, documentatie raadplegen, nieuwe technieken oefenen en kennis stap voor stap omzetten in betrouwbaar technisch handelen. Die houding helpt mij om zelfstandig te groeien zonder het belang van samenwerking en ervaring van collega's uit het oog te verliezen.": "For me, learning means continuing to ask questions, analysing errors, consulting documentation, practising new techniques and gradually turning knowledge into reliable technical action. This attitude helps me grow independently without losing sight of the importance of collaboration and colleagues' experience.",
  "Ambitie binnen industriële automatisatie": "Ambition within industrial automation",
  "Mijn ambitie is om verder door te groeien naar een technische functie waarin storingsanalyse, onderhoud en industriële automatisatie samenkomen. Ik wil mijn productie-ervaring combineren met een steeds grondigere kennis van PLC-besturingen, HMI-systemen, industriële communicatie en gestructureerde diagnose.": "My ambition is to progress into a technical role that combines fault analysis, maintenance and industrial automation. I want to combine my production experience with increasingly thorough knowledge of PLC controls, HMI systems, industrial communication and structured diagnostics.",
  "Ik zoek geen snelle titel, maar een duurzame technische ontwikkeling. Mijn meerwaarde ligt in de combinatie van jarenlange praktijkervaring, kennis van de realiteit op de werkvloer en de discipline om mij naast mijn job verder te scholen. Zo wil ik uitgroeien tot een betrouwbare technische professional die veilig werkt, logisch redeneert en actief bijdraagt aan de beschikbaarheid en verbetering van industriële installaties.": "I am not seeking a quick title, but sustainable technical development. My added value lies in the combination of years of practical experience, knowledge of shop-floor reality and the discipline to continue training alongside my job. In this way, I aim to become a reliable technical professional who works safely, reasons logically and actively contributes to the availability and improvement of industrial installations.",
  "Profielstatus": "Profile status",
  "Praktijkgericht en in ontwikkeling": "Practical and continuously developing",
  "Industrie": "Industry",
  "Volvo Cars Gent sinds 2016": "Volvo Cars Ghent since 2016",
  "Omgeving": "Environment",
  "Geautomatiseerde GA-lasfabriek": "Automated GA welding plant",
  "Basis": "Foundation",
  "Diploma Onderhoudstechnicus": "Maintenance Technician qualification",
  "Verdieping": "Specialisation",
  "PLC, HMI en TIA Portal": "PLC, HMI and TIA Portal",
  "Werkwijze": "Working method",
  "Veilig, analytisch en leergierig": "Safe, analytical and eager to learn",
  "Richting": "Direction",
  "Industriële automatisatie": "Industrial automation",
  "Bekijk mijn projecten": "View my projects",
  "DB1 · Certificaten": "DB1 · Certificates",
  "Certificaten & diploma's": "Certificates & qualifications",
  "Een overzicht van mijn technische opleidingen, diploma's, certificaten en behaalde kwalificaties.": "An overview of my technical training, qualifications, certificates and achieved credentials.",
  "PLC & industriële automatisatie": "PLC & industrial automation",
  "Basis PLC en OP": "Basic PLC and OP",
  "Hard- en software — Syntra West Kortrijk": "Hardware and software — Syntra West Kortrijk",
  "Bekijken": "View",
  "Gestructureerd programmeren PLC": "Structured PLC programming",
  "PLC-programmering — Module 2": "PLC programming — Module 2",
  "Gestructureerd programmeren OP": "Structured OP programming",
  "Praktijkgerichte eindopdracht — Module 2": "Practice-oriented final assignment — Module 2",
  "Diploma's & professionele certificaten": "Qualifications & professional certificates",
  "Centrum voor Avondonderwijs — 2025": "Centre for Adult Education — 2025",
  "Download pdf": "Download PDF",
  "Machine Operator": "Machine Operator",
  "Volvo Cars Gent — interne certificering": "Volvo Cars Ghent — internal certification",
  "VCA Basis": "VCA Basic",
  "Veiligheid, gezondheid en milieu": "Safety, health and environment",
  "ICT-certificaat": "ICT certificate",
  "Digitale vaardigheden en portfolio": "Digital skills and portfolio",
  "Technische basisopleiding": "Basic technical training",
  "Basis Elektriciteit": "Basic Electricity",
  "Deelcertificaat 6919 — CVO ISBO": "Partial certificate 6919 — CVO ISBO",
  "Basis Metaal": "Basic Metalworking",
  "Deelcertificaat 6920 — CVO ISBO": "Partial certificate 6920 — CVO ISBO",
  "Elektrische Opbouwinstallaties 1": "Electrical Surface Installations 1",
  "Technische basisopleiding — CVO ISBO": "Basic technical training — CVO ISBO",
  "Elektrische Opbouwinstallaties 2": "Electrical Surface Installations 2",
  "Hersteller Witgoed BSO03": "Domestic Appliance Repairer BSO03",
  "Technische beroepsopleiding — 480 lestijden": "Technical vocational training — 480 teaching hours",
  "Smart Factory": "Smart Factory",
  "Eén geïntegreerd automatiseringsproject, opgebouwd in drie opeenvolgende fases binnen Siemens TIA Portal V19: van PLC-, hardware- en netwerkconfiguratie tot HMI-ontwikkeling, alarmbeheer en de uiteindelijke integratie en validatie van het volledige systeem.": "One integrated automation project, developed in three consecutive phases within Siemens TIA Portal V19: from PLC, hardware and network configuration to HMI development, alarm management and the final integration and validation of the complete system.",
  "Smart Factory Project — Basis": "Smart Factory Project — Foundation",
  "Volledige basisopbouw van het automatiseringsproject in Siemens TIA Portal V19, inclusief configuratie van de S7-1200 PLC, hardware, netwerkcommunicatie, UDT's, Data Blocks en gebruikersbeheer.": "Complete foundational setup of the automation project in Siemens TIA Portal V19, including configuration of the S7-1200 PLC, hardware, network communication, UDTs, Data Blocks and user management.",
  "UDT & Data Blocks": "UDT & Data Blocks",
  "Smart Factory Project — HMI & Alarmbeheer": "Smart Factory Project — HMI & Alarm Management",
  "Ontwikkeling van de operatorinterface in WinCC Unified met proces- en parameterschermen, navigatiestructuur, meertalige bediening, herbruikbare faceplates en geïntegreerd alarmbeheer.": "Development of the operator interface in WinCC Unified with process and parameter screens, navigation structure, multilingual operation, reusable faceplates and integrated alarm management.",
  "Smart Factory Project — Integratie & Validatie": "Smart Factory Project — Integration & Validation",
  "Integratie van PLC-besturing, HMI-bediening, parameters, faceplates en alarmfuncties tot één samenhangend automatiseringssysteem, volledig getest en gevalideerd.": "Integration of PLC control, HMI operation, parameters, faceplates and alarm functions into one coherent automation system, fully tested and validated.",
  "Systeemintegratie": "System integration",
  "Testen & validatie": "Testing & validation",
  "Network 3.1 · Project 1": "Network 3.1 · Project 1",
  "In deze eerste projectfase bouwde ik zelfstandig de volledige basisstructuur van een Smart Factory-project op in Siemens TIA Portal V19. Vanuit een lege projectomgeving configureerde ik de hardware, netwerkcommunicatie, datastructuren, gebruikersrechten en meertalige bediening.": "In this first project phase, I independently built the complete foundational structure of a Smart Factory project in Siemens TIA Portal V19. Starting from an empty project environment, I configured the hardware, network communication, data structures, user rights and multilingual operation.",
  "Projectinformatie": "Project information",
  "Software": "Software",
  "Hardware": "Hardware",
  "Doelstellingen": "Objectives",
  "Zelfstandig een gestructureerde projectbasis opbouwen met correcte hardware- en netwerkconfiguratie, herbruikbare datastructuren en toegangsbeheer als voorbereiding op de verdere HMI-ontwikkeling.": "Independently build a structured project foundation with correct hardware and network configuration, reusable data structures and access management in preparation for further HMI development.",
  "Technische vaardigheden": "Technical skills",
  "Hardwareconfiguratie, netwerkconfiguratie, PLC Data Types (UDT’s), Data Blocks, gebruikersbeheer, meertaligheid en HMI-projectstructuur.": "Hardware configuration, network configuration, PLC Data Types (UDTs), Data Blocks, user management, multilingual operation and HMI project structure.",
  "Projectdocumentatie": "Project documentation",
  "Deze screenshots tonen de belangrijkste onderdelen van het Smart Factory Project, ontwikkeld in Siemens TIA Portal V19.": "These screenshots show the key components of the Smart Factory Project, developed in Siemens TIA Portal V19.",
  "Configuratie van de netwerkverbinding tussen de Siemens S7-1200 PLC en het WinCC Unified HMI.": "Configuration of the network connection between the Siemens S7-1200 PLC and the WinCC Unified HMI.",
  "Hoofdprogramma waarin de PLC-cyclus wordt uitgevoerd en de functionele blokken worden aangestuurd.": "Main program in which the PLC cycle is executed and the functional blocks are controlled.",
  "UDT & Parameters": "UDT & Parameters",
  "Gestructureerde datasoorten en parameterblokken voor een overzichtelijke en herbruikbare PLC-applicatie.": "Structured data types and parameter blocks for a clear and reusable PLC application.",
  "Resultaat": "Result",
  "Een volledig gestructureerde projectbasis in Siemens TIA Portal V19, klaar voor de ontwikkeling van de HMI, faceplates en alarmfunctionaliteit in de volgende projectfase.": "A fully structured project foundation in Siemens TIA Portal V19, ready for the development of the HMI, faceplates and alarm functionality in the next project phase.",
  "Geleerde vaardigheden": "Skills acquired",
  "Dit project vormde de technische basis waarop alle volgende Smart Factory-fases werden opgebouwd.": "This project formed the technical foundation on which all subsequent Smart Factory phases were built.",
  "PLC-configuratie": "PLC configuration",
  "Netwerkconfiguratie": "Network configuration",
  "Gebruikersbeheer": "User management",
  "Network 3.2 · Project 2": "Network 3.2 · Project 2",
  "Voortbouwend op de basisconfiguratie van Project 1 werd de WinCC Unified HMI verder uitgebreid met procesvisualisatie, navigatie, configureerbare parameters, meertalige ondersteuning en herbruikbare faceplates. Daarnaast werd een alarmbeheersysteem ontwikkeld met foutmeldingen, statusindicaties en bevestiging (ACK) via de HMI.": "Building on the basic configuration of Project 1, the WinCC Unified HMI was expanded with process visualisation, navigation, configurable parameters, multilingual support and reusable faceplates. An alarm management system was also developed with fault messages, status indications and acknowledgement (ACK) through the HMI.",
  "Siemens TIA Portal V19 (WinCC Unified)": "Siemens TIA Portal V19 (WinCC Unified)",
  "HMI-schermen en navigatie opbouwen, herbruikbare faceplates ontwikkelen die gekoppeld zijn aan PLC-data, en een alarmbeheersysteem implementeren met foutdetectie en bevestiging.": "Build HMI screens and navigation, develop reusable faceplates linked to PLC data, and implement an alarm management system with fault detection and acknowledgement.",
  "HMI-schermontwerp, navigatiestructuur, meertalige interfaces, faceplates, alarmbeheer, koppeling PLC-HMI": "HMI screen design, navigation structure, multilingual interfaces, faceplates, alarm management, PLC-HMI connection",
  "Deze screenshots tonen de belangrijkste onderdelen van de WinCC Unified HMI: procesbediening, parameterinstellingen, alarmbeheer en gebruikersrechten.": "These screenshots show the key components of the WinCC Unified HMI: process operation, parameter settings, alarm management and user rights.",
  "Processcherm": "Process screen",
  "Hoofdscherm van de WinCC Unified HMI met motorbediening, proceswaarden, snelheidsregeling en geïntegreerde alarmindicaties.": "Main screen of the WinCC Unified HMI with motor control, process values, speed control and integrated alarm indications.",
  "Parameterscherm": "Parameter screen",
  "Parameterpagina voor het instellen van stroom- en spanningsgrenzen, inclusief minimum-, maximum- en alarmwaarden voor de procesbewaking.": "Parameter page for setting current and voltage limits, including minimum, maximum and alarm values for process monitoring.",
  "Alarmoverzicht": "Alarm overview",
  "Alarmoverzicht met alarmklassen, foutmeldingen en bevestigingsfuncties voor een veilige en gestructureerde procesbewaking.": "Alarm overview with alarm classes, fault messages and acknowledgement functions for safe and structured process monitoring.",
  "Configuratie van gebruikers, rollen en toegangsrechten met Administrator- en Operatorprofielen voor een veilige bediening.": "Configuration of users, roles and access rights with Administrator and Operator profiles for safe operation.",
  "Een volledig functionele WinCC Unified HMI ontwikkeld voor Siemens TIA Portal, met intuïtieve procesbediening, parameterconfiguratie, alarmbeheer, gebruikersauthenticatie en rolgebaseerde toegangsrechten. De HMI communiceert correct met de PLC en ondersteunt een veilige en overzichtelijke bediening van de installatie.": "A fully functional WinCC Unified HMI developed for Siemens TIA Portal, with intuitive process operation, parameter configuration, alarm management, user authentication and role-based access rights. The HMI communicates correctly with the PLC and supports safe and clear operation of the installation.",
  "Tijdens dit project lag de nadruk op het ontwerpen van een gebruiksvriendelijke en herbruikbare HMI. Door het toepassen van faceplates, meertaligheid en een geïntegreerd alarmbeheersysteem werd een onderhoudsvriendelijke en schaalbare gebruikersinterface ontwikkeld.": "This project focused on designing a user-friendly and reusable HMI. By applying faceplates, multilingual operation and an integrated alarm management system, a maintainable and scalable user interface was developed.",
  "HMI-schermontwerp": "HMI screen design",
  "Meertaligheid": "Multilingual operation",
  "Network 3.3 · Project 3": "Network 3.3 · Project 3",
  "Smart Factory Project — System Integration & Validation": "Smart Factory Project — System Integration & Validation",
  "In deze laatste projectfase werden alle ontwikkelde onderdelen geïntegreerd tot één volledig werkend Smart Factory-systeem. De PLC-logica, WinCC Unified HMI, faceplates en het alarmbeheersysteem werden samen getest, gevalideerd en gedemonstreerd in een volledige projectrun.": "In this final project phase, all developed components were integrated into one fully operational Smart Factory system. The PLC logic, WinCC Unified HMI, faceplates and alarm management system were tested, validated and demonstrated together in a complete project run.",
  "Het volledige systeem valideren, van hardwareconfiguratie tot HMI-bediening, en het eindresultaat demonstreren in een werkende opstelling.": "Validate the complete system, from hardware configuration to HMI operation, and demonstrate the final result in an operational setup.",
  "Systeemintegratie, testen & validatie, foutopsporing, projectdocumentatie, presenteren van technisch werk": "System integration, testing & validation, troubleshooting, project documentation, presentation of technical work",
  "PLC Programmastructuur": "PLC Program Structure",
  "Overzicht van de modulaire PLC-programmastructuur, ontwikkeld in Siemens TIA Portal V19. Het project is opgebouwd met functiebouwstenen (FB's), datablocks (DB's) en een duidelijke softwarearchitectuur voor een overzichtelijke, onderhoudsvriendelijke en schaalbare industriële automatiseringsoplossing.": "Overview of the modular PLC program structure developed in Siemens TIA Portal V19. The project is built with function blocks (FBs), data blocks (DBs) and a clear software architecture for a transparent, maintainable and scalable industrial automation solution.",
  "PLC Softwareverificatie": "PLC Software Verification",
  "Succesvolle compilatie van de volledige PLC-toepassing zonder fouten of waarschuwingen. Dit bevestigt dat de software correct is gevalideerd en klaar is voor simulatie, verdere testen en industriële toepassingen.": "Successful compilation of the complete PLC application without errors or warnings. This confirms that the software has been correctly validated and is ready for simulation, further testing and industrial applications.",
  "Softwarevalidatie": "Software validation",
  "De volledige PLC-applicatie werd succesvol gecompileerd in Siemens TIA Portal V19. De software werd gevalideerd met 0 fouten en 0 waarschuwingen, wat bevestigt dat de projectstructuur correct is opgebouwd en klaar is voor verdere testen en inbedrijfstelling.": "The complete PLC application was successfully compiled in Siemens TIA Portal V19. The software was validated with 0 errors and 0 warnings, confirming that the project structure is correctly built and ready for further testing and commissioning.",
  "Een volledig werkend Smart Factory-project, opgebouwd en getest van nul tot een werkende demonstratie: PLC-logica, HMI-bediening en alarmbeheer functioneren als één samenhangend systeem.": "A fully operational Smart Factory project, built and tested from scratch through to a working demonstration: PLC logic, HMI operation and alarm management function as one coherent system.",
  "Deze fase draaide om het geheel: onderdelen die apart goed werken, ook echt laten samenwerken, fouten opsporen tussen de verschillende lagen, en het resultaat overzichtelijk kunnen tonen en toelichten.": "This phase focused on the complete system: making components that work well separately function together, tracing faults between the different layers, and presenting and explaining the result clearly.",
  "Foutopsporing": "Troubleshooting",
  "Presenteren": "Presentation",
  "TIA PORTAL-PROJECTEN": "TIA PORTAL PROJECTS",
  "Van PLC-programmering tot HMI-ontwikkeling": "From PLC programming to HMI development",
  "In deze zes video's toon ik stap voor stap hoe ik een TIA Portal-project opbouw, programmeer, visualiseer en test. De video's staan overzichtelijk in twee rijen van drie.": "In these six videos, I show step by step how I build, program, visualise and test a TIA Portal project. The videos are arranged clearly in two rows of three.",
  "Video 1": "Video 1",
  "Projectopbouw – Deel 1": "Project setup – Part 1",
  "Start van het TIA Portal-project en de eerste technische configuratie.": "Start of the TIA Portal project and the initial technical configuration.",
  "Video 2": "Video 2",
  "Projectopbouw – Deel 2": "Project setup – Part 2",
  "Verdere uitwerking van de PLC-logica en de projectstructuur.": "Further development of the PLC logic and project structure.",
  "Video 3": "Video 3",
  "HMI en navigatie – Deel 3": "HMI and navigation – Part 3",
  "Opbouw van schermen, navigatie, parameters en meertaligheid.": "Development of screens, navigation, parameters and multilingual operation.",
  "Video 4": "Video 4",
  "Faceplates – Deel 4": "Faceplates – Part 4",
  "Herbruikbare HMI-faceplates opbouwen en koppelen aan PLC-data.": "Build reusable HMI faceplates and link them to PLC data.",
  "Video 5": "Video 5",
  "Alarmen – Deel 5": "Alarms – Part 5",
  "Alarmmeldingen, foutstatussen en bevestiging via de HMI uitwerken.": "Develop alarm messages, fault states and acknowledgement through the HMI.",
  "Video 6": "Video 6",
  "Eindresultaat – Deel 6": "Final result – Part 6",
  "Overzicht, test en demonstratie van het afgewerkte automatisatieproject.": "Overview, testing and demonstration of the completed automation project."
};
  var originalText = new WeakMap();

  function normalise(value) { return value.replace(/\s+/g, " ").trim(); }
  function translateTextNodes(language) {
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        var parent = node.parentElement;
        if (!parent || parent.closest("script, style, .language-switch")) return NodeFilter.FILTER_REJECT;
        return normalise(node.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    var nodes = []; while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(function (node) {
      if (!originalText.has(node)) originalText.set(node, node.nodeValue);
      var source = originalText.get(node);
      var key = normalise(source);
      if (language === "en" && translations[key]) {
        var leading = source.match(/^\s*/)[0], trailing = source.match(/\s*$/)[0];
        node.nodeValue = leading + translations[key] + trailing;
      } else { node.nodeValue = source; }
    });
  }
  function updateMetadata(language) {
    document.documentElement.lang = language;
    var title = document.querySelector("title");
    if (title) title.textContent = title.getAttribute(language === "en" ? "data-i18n-title-en" : "data-i18n-title-nl") || title.textContent;
    document.querySelectorAll("[data-i18n-content-nl]").forEach(function (el) {
      el.setAttribute("content", el.getAttribute(language === "en" ? "data-i18n-content-en" : "data-i18n-content-nl"));
    });
    document.querySelectorAll("[data-i18n-aria-nl]").forEach(function (el) {
      el.setAttribute("aria-label", el.getAttribute(language === "en" ? "data-i18n-aria-en" : "data-i18n-aria-nl"));
    });
    ["alt", "title", "aria-label"].forEach(function (attribute) {
      document.querySelectorAll("[data-i18n-" + attribute + "-nl]").forEach(function (el) {
        el.setAttribute(attribute, el.getAttribute("data-i18n-" + attribute + (language === "en" ? "-en" : "-nl")));
      });
    });
  }
  function updateButtons(language) {
    document.querySelectorAll(".language-button").forEach(function (button) {
      var active = button.getAttribute("data-lang") === language;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });
  }
  function applyLanguage(language) {
    var selected = language === "en" ? "en" : "nl";
    translateTextNodes(selected); updateMetadata(selected); updateButtons(selected);
    try { localStorage.setItem(STORAGE_KEY, selected); } catch (e) {}
    window.dispatchEvent(new CustomEvent("portfolioLanguageChanged", { detail: { language: selected } }));
  }
  document.addEventListener("DOMContentLoaded", function () {
    var saved = "nl"; try { saved = localStorage.getItem(STORAGE_KEY) || "nl"; } catch (e) {}
    document.querySelectorAll(".language-button").forEach(function (button) {
      button.addEventListener("click", function () { applyLanguage(button.getAttribute("data-lang")); });
    });
    applyLanguage(saved);
  });
}());
