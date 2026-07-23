import type { Language } from './language';

export type TranslationKey = keyof typeof translations;

export const translations = {
  brand: {
    nl: 'Lokale AI Website Studio',
    en: 'Local AI Website Studio',
  },
  brandSubtitle: {
    nl: 'SaaS builder',
    en: 'SaaS builder',
  },
  navTemplates: {
    nl: 'Templates',
    en: 'Templates',
  },
  navEditor: {
    nl: 'Editor',
    en: 'Editor',
  },
  navPricing: {
    nl: 'Prijzen',
    en: 'Pricing',
  },
  navDashboard: {
    nl: 'Dashboard',
    en: 'Dashboard',
  },
  loginButton: {
    nl: 'Login / Start gratis',
    en: 'Log in / Start free',
  },
  premiumBadge: {
    nl: 'Premium AI SaaS voor lokale zelfstandigen',
    en: 'Premium AI SaaS for local self-employed professionals',
  },
  heroTitle: {
    nl: 'Bouw, preview en publiceer professionele websites per beroep.',
    en: 'Build, preview and publish professional websites by trade.',
  },
  heroDescription: {
    nl: 'Een schaalbare website-builder voor lokale ondernemers: grote template previews, live editor, gratis preview mode, Stripe abonnementen en automatische domeinkoppeling voorbereid.',
    en: 'A scalable website builder for local businesses: large template previews, live editor, free preview mode, Stripe subscriptions and automatic domain linking prepared.',
  },
  ctaStart: {
    nl: 'Start met AI template',
    en: 'Start with AI template',
  },
  ctaDashboard: {
    nl: 'Bekijk dashboard',
    en: 'View dashboard',
  },
  statWorkshops: {
    nl: 'beroepen inbegrepen',
    en: 'trades included',
  },
  statLayouts: {
    nl: 'layout varianten',
    en: 'layout variants',
  },
  statPreview: {
    nl: 'preview vóór publicatie',
    en: 'preview before publication',
  },
  liveBuilder: {
    nl: 'Live builder',
    en: 'Live builder',
  },
  previewActive: {
    nl: 'Preview actief',
    en: 'Preview active',
  },
  electrician: {
    nl: 'Elektricien',
    en: 'Electrician',
  },
  publishStatus: {
    nl: 'Publicatie status',
    en: 'Publication status',
  },
  waitStripe: {
    nl: 'Wacht op Stripe Checkout',
    en: 'Waiting for Stripe Checkout',
  },
  architectureSectionEyebrow: {
    nl: 'Professionele architectuur',
    en: 'Professional architecture',
  },
  architectureSectionTitle: {
    nl: 'Gebouwd als een schaalbaar AI SaaS-platform, niet als simpele demo.',
    en: 'Built as a scalable AI SaaS platform, not just a simple demo.',
  },
  architectureSectionDescription: {
    nl: 'De codebase bevat duidelijke feature-modules voor templates, editor, billing, publicatie, domeinen, accounts en dashboardbeheer.',
    en: 'The codebase contains clear feature modules for templates, editor, billing, publishing, domains, accounts and dashboard management.',
  },
  footerTagline: {
    nl: 'Premium AI websites voor lokale zelfstandigen.',
    en: 'Premium AI websites for local self-employed professionals.',
  },
  footerTech: {
    nl: 'React',
    en: 'React',
  },
  footerTailwind: {
    nl: 'Tailwind',
    en: 'Tailwind',
  },
  footerStripe: {
    nl: 'Stripe-ready',
    en: 'Stripe-ready',
  },
  footerDomain: {
    nl: 'Domain-ready',
    en: 'Domain-ready',
  },
  statusLabels: {
    nl: {
      draft: 'Concept',
      preview: 'Gratis preview',
      billing_required: 'Betaling nodig',
      published: 'Gepubliceerd',
    },
    en: {
      draft: 'Draft',
      preview: 'Free preview',
      billing_required: 'Payment required',
      published: 'Published',
    },
  },
  templateTitles: {
    nl: {
      lunapark: 'Lunapark & Arcade',
      electricien: 'Elektricien',
      lasser: 'Lasser & Metaalbewerker',
      kapper: 'Kapper & Beauty Salon',
      bakker: 'Bakkerij & Patisserie',
      tuinaannemer: 'Tuinaannemer',
      loodgieter: 'Loodgieter',
      kinesist: 'Kinesist & Praktijk',
      restaurant: 'Restaurant & Brasserie',
      fotograaf: 'Fotograaf',
    },
    en: {
      lunapark: 'Amusement Park & Arcade',
      electricien: 'Electrician',
      lasser: 'Welder & Metalworker',
      kapper: 'Hairdresser & Beauty Salon',
      bakker: 'Bakery & Pastry Shop',
      tuinaannemer: 'Gardener',
      loodgieter: 'Plumber',
      kinesist: 'Kinesiologist & Practice',
      restaurant: 'Restaurant & Brasserie',
      fotograaf: 'Photographer',
    },
  },
  templateTaglines: {
    nl: {
      lunapark: 'Meer bezoekers voor attracties, events en kermisdagen.',
      electricien: 'Betrouwbare interventies, keuringen en renovaties.',
      lasser: 'Sterke portfolio’s voor maatwerk, constructie en herstel.',
      kapper: 'Boekingen, stijlen en social proof in één elegante flow.',
      bakker: 'Dagverse producten, bestellingen en seizoensacties.',
      tuinaannemer: 'Van eerste schets tot onderhoudscontract.',
      loodgieter: 'Spoed, herstellingen en badkamerrenovaties zonder frictie.',
      kinesist: 'Professionele zorgcommunicatie met duidelijke trajecten.',
      restaurant: 'Menu, reservaties en sfeerbeelden die tafels vullen.',
      fotograaf: 'Portfolio’s die aanvragen voor shoots verhogen.',
    },
    en: {
      lunapark: 'More visitors for attractions, events and fair days.',
      electricien: 'Reliable interventions, inspections and renovations.',
      lasser: 'Strong portfolios for custom work, construction and repairs.',
      kapper: 'Bookings, styles and social proof in one elegant flow.',
      bakker: 'Fresh products, orders and seasonal promotions.',
      tuinaannemer: 'From first sketch to maintenance contract.',
      loodgieter: 'Urgency, repairs and bathroom renovations without friction.',
      kinesist: 'Professional care communication with clear pathways.',
      restaurant: 'Menu, reservations and atmosphere that fill tables.',
      fotograaf: 'Portfolios that increase shoot requests.',
    },
  },
  templateDescriptions: {
    nl: {
      lunapark: 'Een speelse, premium landingspagina met openingsuren, attracties, arrangementen en party-aanvragen.',
      electricien: 'Conversiegerichte site voor dringende oproepen, offertes en certificeringen.',
      lasser: 'Robuuste layouts met case studies, materiaaltypes en offertewizard.',
      kapper: 'Zachte pastelervaring met behandelingen, team, prijslijst en online afspraken.',
      bakker: 'Warme template voor brood, taarten, ontbijtmanden en afhaalbestellingen.',
      tuinaannemer: 'Visuele projectsite voor aanleg, onderhoud, terrassen en tuinadvies.',
      loodgieter: 'Betrouwbare servicewebsite met noodoproep, diagnoseflow en onderhoudsplannen.',
      kinesist: 'Rustige praktijkwebsite voor specialisaties, afspraken en intakeformulieren.',
      restaurant: 'Culinaire website met menu, reservaties, events en cadeaubonnen.',
      fotograaf: 'Visuele portfolio-ervaring met pakketten, galleries en intakeflow.',
    },
    en: {
      lunapark: 'A playful, premium landing page with opening hours, attractions, packages and party requests.',
      electricien: 'Conversion-focused site for urgent calls, quotes and certifications.',
      lasser: 'Robust layouts with case studies, material types and a quote wizard.',
      kapper: 'A soft pastel experience with treatments, team, price list and online bookings.',
      bakker: 'Warm template for bread, cakes, breakfast boxes and takeaway orders.',
      tuinaannemer: 'A visual project site for landscaping, maintenance, terraces and garden advice.',
      loodgieter: 'Reliable service website with emergency call, diagnostic flow and maintenance plans.',
      kinesist: 'Calm practice website for specialisations, appointments and intake forms.',
      restaurant: 'Culinary website with menu, reservations, events and gift vouchers.',
      fotograaf: 'Visual portfolio experience with packages, galleries and intake flow.',
    },
  },
  templateSections: {
    nl: {
      lunapark: ['Hero met promotie', 'Attractiekaarten', 'Openingsuren', 'Groepsformules', 'Route & parking'],
      electricien: ['Spoedknop', 'Diensten', 'Certificaten', 'Projectfoto’s', 'Offerteformulier'],
      lasser: ['Portfolio', 'Materiaaltypes', 'Werkplaats', 'Veiligheid', 'Aanvraagwizard'],
      kapper: ['Lookbook', 'Prijslijst', 'Team', 'Online boeking', 'Instagram feed'],
      bakker: ['Producten', 'Dagmenu', 'Taart op maat', 'Afhaaluren', 'Bestelformulier'],
      tuinaannemer: ['Projecten', 'Diensten', 'Onderhoudsplannen', 'Werkwijze', 'Offerte'],
      loodgieter: ['Noodknop', 'Probleemdiagnose', 'Diensten', 'Servicegebied', 'Plan onderhoud'],
      kinesist: ['Specialisaties', 'Therapeuten', 'Trajecten', 'Verwijzing', 'Afspraken'],
      restaurant: ['Menu', 'Reservaties', 'Events', 'Chef story', 'Cadeaubonnen'],
      fotograaf: ['Portfolio', 'Pakketten', 'Werkwijze', 'Testimonials', 'Intake'],
    },
    en: {
      lunapark: ['Promo hero', 'Attraction cards', 'Opening hours', 'Group offers', 'Route & parking'],
      electricien: ['Emergency button', 'Services', 'Certificates', 'Project photos', 'Quote form'],
      lasser: ['Portfolio', 'Material types', 'Workshop', 'Safety', 'Request wizard'],
      kapper: ['Lookbook', 'Price list', 'Team', 'Online booking', 'Instagram feed'],
      bakker: ['Products', 'Daily menu', 'Custom cake', 'Pickup hours', 'Order form'],
      tuinaannemer: ['Projects', 'Services', 'Maintenance plans', 'Workflow', 'Quote'],
      loodgieter: ['Emergency button', 'Problem diagnosis', 'Services', 'Service area', 'Maintenance plan'],
      kinesist: ['Specialisations', 'Therapists', 'Trajectories', 'Referral', 'Appointments'],
      restaurant: ['Menu', 'Reservations', 'Events', 'Chef story', 'Gift vouchers'],
      fotograaf: ['Portfolio', 'Packages', 'Workflow', 'Testimonials', 'Intake'],
    },
  },
  templateLayoutNames: {
    nl: {
      'funfair-glow': 'Glow Festival',
      'arcade-clean': 'Arcade Clean',
      'party-booking': 'Party Booking',
      'spark-pro': 'Spark Pro',
      'keuringsflow': 'Keuringsflow',
      'renovatie-local': 'Renovatie Local',
      'steel-studio': 'Steel Studio',
      'constructie-grid': 'Constructie Grid',
      'repair-fast': 'Repair Fast',
      'salon-luxe': 'Salon Luxe',
      'beauty-book': 'Beauty Book',
      'local-chair': 'Local Chair',
      'artisan-warm': 'Artisan Warm',
      'pickup-fast': 'Pickup Fast',
      'market-local': 'Market Local',
      'garden-atlas': 'Garden Atlas',
      'green-local': 'Green Local',
      'yard-booking': 'Yard Booking',
      'flow-service': 'Flow Service',
      'bathroom-pro': 'Bathroom Pro',
      'repair-slot': 'Repair Slot',
      'care-calm': 'Care Calm',
      'practice-local': 'Practice Local',
      'rehab-booking': 'Rehab Booking',
      'table-luxe': 'Table Luxe',
      'brasserie-local': 'Brasserie Local',
      'reserve-flow': 'Reserve Flow',
      'lens-editorial': 'Lens Editorial',
      'studio-local': 'Studio Local',
      'shoot-booking': 'Shoot Booking',
    },
    en: {
      'funfair-glow': 'Glow Festival',
      'arcade-clean': 'Arcade Clean',
      'party-booking': 'Party Booking',
      'spark-pro': 'Spark Pro',
      'keuringsflow': 'Inspection Flow',
      'renovatie-local': 'Renovation Local',
      'steel-studio': 'Steel Studio',
      'constructie-grid': 'Construction Grid',
      'repair-fast': 'Repair Fast',
      'salon-luxe': 'Salon Luxe',
      'beauty-book': 'Beauty Book',
      'local-chair': 'Local Chair',
      'artisan-warm': 'Artisan Warm',
      'pickup-fast': 'Pickup Fast',
      'market-local': 'Market Local',
      'garden-atlas': 'Garden Atlas',
      'green-local': 'Green Local',
      'yard-booking': 'Yard Booking',
      'flow-service': 'Flow Service',
      'bathroom-pro': 'Bathroom Pro',
      'repair-slot': 'Repair Slot',
      'care-calm': 'Care Calm',
      'practice-local': 'Practice Local',
      'rehab-booking': 'Rehab Booking',
      'table-luxe': 'Table Luxe',
      'brasserie-local': 'Brasserie Local',
      'reserve-flow': 'Reserve Flow',
      'lens-editorial': 'Lens Editorial',
      'studio-local': 'Studio Local',
      'shoot-booking': 'Shoot Booking',
    },
  },
  templateLayoutFeatures: {
    nl: {
      'funfair-glow': ['Neon CTA', 'Eventkalender', 'Arrangementen'],
      'arcade-clean': ['Scores', 'Prijspakketten', 'Reviews'],
      'party-booking': ['Reservatieflow', 'QR-tickets', 'Aanbetalingen'],
      'spark-pro': ['Spoedbanner', 'Trust badges', 'Projectgrid'],
      'keuringsflow': ['Keuring kiezen', 'Tijdslot', 'Documentupload'],
      'renovatie-local': ['Regio’s', 'Werkwijze', 'FAQ'],
      'steel-studio': ['Case studies', 'Before/after', 'Maatwerk CTA'],
      'constructie-grid': ['Werkzones', 'Machinepark', 'Referenties'],
      'repair-fast': ['Foto upload', 'Snelle prijsindicatie', 'Planning'],
      'salon-luxe': ['Lookbook', 'VIP pakketten', 'Reviews'],
      'beauty-book': ['Behandeling kiezen', 'Stylist kiezen', 'Reminder'],
      'local-chair': ['Buurt SEO', 'Promoties', 'Openingsuren'],
      'artisan-warm': ['Productverhaal', 'Seizoensbanner', 'Galerij'],
      'pickup-fast': ['Bestelmodule', 'Afhaalslot', 'QR-betaling'],
      'market-local': ['Weekaanbiedingen', 'Route', 'Reviews'],
      'garden-atlas': ['Projectslider', 'Onderhoudsplannen', 'Lead wizard'],
      'green-local': ['Regiopagina’s', 'Seizoentips', 'Reviews'],
      'yard-booking': ['Tuincheck', 'Afspraak', 'Foto upload'],
      'flow-service': ['Nood CTA', 'Diagnosewizard', 'Garanties'],
      'bathroom-pro': ['Renovatiecases', 'Materialen', 'Offerte'],
      'repair-slot': ['Tijdslot', 'Foto upload', 'Status updates'],
      'care-calm': ['Trajectkaarten', 'Teamprofielen', 'Veilige intake'],
      'practice-local': ['Bereikbaarheid', 'Mutualiteit info', 'FAQ'],
      'rehab-booking': ['Afspraaktype', 'Beschikbaarheid', 'Intakeformulier'],
      'table-luxe': ['Chef verhaal', 'Menu cards', 'Wine pairing'],
      'brasserie-local': ['Dagschotel', 'Openingsuren', 'Reviews'],
      'reserve-flow': ['Tafel boeken', 'Groepen', 'Aanbetaling'],
      'lens-editorial': ['Fullscreen gallery', 'Pakketten', 'Storytelling'],
      'studio-local': ['Regio SEO', 'Mini sessions', 'Reviews'],
      'shoot-booking': ['Datum kiezen', 'Locatiebriefing', 'Aanbetaling'],
    },
    en: {
      'funfair-glow': ['Neon CTA', 'Event calendar', 'Packages'],
      'arcade-clean': ['Scores', 'Price packages', 'Reviews'],
      'party-booking': ['Reservation flow', 'QR tickets', 'Deposits'],
      'spark-pro': ['Urgency banner', 'Trust badges', 'Project grid'],
      'keuringsflow': ['Choose inspection', 'Time slot', 'Document upload'],
      'renovatie-local': ['Regions', 'Workflow', 'FAQ'],
      'steel-studio': ['Case studies', 'Before/after', 'Custom CTA'],
      'constructie-grid': ['Work zones', 'Machinery', 'References'],
      'repair-fast': ['Photo upload', 'Quick quote', 'Planning'],
      'salon-luxe': ['Lookbook', 'VIP packages', 'Reviews'],
      'beauty-book': ['Choose treatment', 'Choose stylist', 'Reminder'],
      'local-chair': ['Local SEO', 'Promotions', 'Opening hours'],
      'artisan-warm': ['Product story', 'Seasonal banner', 'Gallery'],
      'pickup-fast': ['Order module', 'Pickup slot', 'QR payment'],
      'market-local': ['Weekly offers', 'Route', 'Reviews'],
      'garden-atlas': ['Project slider', 'Maintenance plans', 'Lead wizard'],
      'green-local': ['Region pages', 'Seasonal tips', 'Reviews'],
      'yard-booking': ['Garden check', 'Appointment', 'Photo upload'],
      'flow-service': ['Emergency CTA', 'Diagnosis wizard', 'Guarantees'],
      'bathroom-pro': ['Renovation cases', 'Materials', 'Quote'],
      'repair-slot': ['Time slot', 'Photo upload', 'Status updates'],
      'care-calm': ['Trajectory cards', 'Team profiles', 'Secure intake'],
      'practice-local': ['Accessibility', 'Mutuality info', 'FAQ'],
      'rehab-booking': ['Appointment type', 'Availability', 'Intake form'],
      'table-luxe': ['Chef story', 'Menu cards', 'Wine pairing'],
      'brasserie-local': ['Dish of the day', 'Opening hours', 'Reviews'],
      'reserve-flow': ['Book a table', 'Groups', 'Deposit'],
      'lens-editorial': ['Fullscreen gallery', 'Packages', 'Storytelling'],
      'studio-local': ['Local SEO', 'Mini sessions', 'Reviews'],
      'shoot-booking': ['Choose date', 'Location briefing', 'Deposit'],
    },
  },
  templateConversionGoals: {
    nl: {
      lunapark: 'Feestje reserveren',
      electricien: 'Offerte aanvragen',
      lasser: 'Project bespreken',
      kapper: 'Afspraak boeken',
      bakker: 'Bestelling plaatsen',
      tuinaannemer: 'Tuinanalyse aanvragen',
      loodgieter: 'Dringende hulp vragen',
      kinesist: 'Intake plannen',
      restaurant: 'Tafel reserveren',
      fotograaf: 'Shoot aanvragen',
    },
    en: {
      lunapark: 'Reserve a party',
      electricien: 'Request a quote',
      lasser: 'Discuss a project',
      kapper: 'Book an appointment',
      bakker: 'Place an order',
      tuinaannemer: 'Request a garden analysis',
      loodgieter: 'Request urgent help',
      kinesist: 'Plan intake',
      restaurant: 'Reserve a table',
      fotograaf: 'Request a shoot',
    },
  },
  templateLayoutsLabel: {
    nl: 'layouts',
    en: 'layouts',
  },
  templateSelect: {
    nl: 'Kies {template}',
    en: 'Choose {template}',
  },
  templateSectionTitle: {
    nl: 'Template gallery',
    en: 'Template gallery',
  },
  templateSectionDescription: {
    nl: 'Kies een AI-design voor jouw volgende website.',
    en: 'Choose an AI design for your next website.',
  },
  templateSectionSubText: {
    nl: 'Bekijk alle beschikbare beroeps-templates en start met het juiste ontwerp voor jouw klant.',
    en: 'View all available profession templates and start with the right design for your client.',
  },
  templateSectionPrompt: {
    nl: 'Klik op een template om direct naar de editor te gaan en jouw website aan te passen.',
    en: 'Click a template to go straight to the editor and adjust your website.',
  },
  backToHomepage: {
    nl: 'Terug naar startpagina',
    en: 'Back to homepage',
  },
  editorEyebrow: {
    nl: 'AI editor',
    en: 'AI editor',
  },
  editorTitle: {
    nl: 'Bewerk jouw website met intelligente secties en live preview.',
    en: 'Edit your website with smart sections and live preview.',
  },
  editorDescription: {
    nl: 'Kies een beroep, selecteer een layout en bekijk meteen hoe jouw website er uitziet in de preview.',
    en: 'Choose a trade, select a layout and instantly see how your website looks in the preview.',
  },
  editorPrompt: {
    nl: 'Je kunt hier meteen een demo-template selecteren en de preview voor jouw website bekijken.',
    en: 'You can select a demo template here right away and view the preview for your website.',
  },
  previewFree: {
    nl: 'Preview gratis',
    en: 'Preview for free',
  },
  publishAfterPayment: {
    nl: 'Publiceer na betaling',
    en: 'Publish after payment',
  },
  professionLabel: {
    nl: 'Beroep',
    en: 'Profession',
  },
  layoutsLabel: {
    nl: 'Layouts',
    en: 'Layouts',
  },
  previewModeLabel: {
    nl: 'Preview mode:',
    en: 'Preview mode:',
  },
  previewModeText: {
    nl: 'onbeperkt testen met share-link. Publiceren, domein activeren en automatische verlenging starten pas na Stripe betaling.',
    en: 'unlimited testing with a share link. Publishing, activating the domain and automatic renewal only start after Stripe payment.',
  },
  aiGeneratedWebsite: {
    nl: 'AI gegenereerde website',
    en: 'AI generated website',
  },
  premiumLocalWebsite: {
    nl: 'Premium lokale website',
    en: 'Premium local website',
  },
  websiteScore: {
    nl: 'Website score',
    en: 'Website score',
  },
  billingEyebrow: {
    nl: 'Stripe billing',
    en: 'Stripe billing',
  },
  billingTitle: {
    nl: 'Kies een abonnement en activeer betalingen.',
    en: 'Choose a subscription and activate payments.',
  },
  billingDescription: {
    nl: 'Onze structuur ondersteunt veilige abonnementen, éénmalige betalingen en automatische verlenging via Stripe.',
    en: 'Our structure supports secure subscriptions, one-time payments and automatic renewal via Stripe.',
  },
  billingPrompt: {
    nl: 'Bekijk de plannen, kies een pakket en ga verder met de publicatie flow.',
    en: 'Review the plans, choose a package and continue with the publication flow.',
  },
  startStripeCheckout: {
    nl: 'Start Stripe Checkout',
    en: 'Start Stripe Checkout',
  },
  popular: {
    nl: 'Populair',
    en: 'Popular',
  },
  paymentReady: {
    nl: 'Bankkaart, Bancontact en QR-ready flow.',
    en: 'Card, Bancontact and QR-ready flow.',
  },
  dashboardEyebrow: {
    nl: 'Gebruikersdashboard',
    en: 'User dashboard',
  },
  dashboardTitle: {
    nl: 'Beheer projecten, domeinen en facturatie vanuit één plek.',
    en: 'Manage projects, domains and billing from one place.',
  },
  dashboardDescription: {
    nl: 'Een overzichtelijk dashboard voor concepten, preview-shares en betaalde publicaties.',
    en: 'A clear dashboard for drafts, preview shares and paid publications.',
  },
  newAiProject: {
    nl: 'Nieuw AI project',
    en: 'New AI project',
  },
  projectsStored: {
    nl: 'Projecten opgeslagen',
    en: 'Projects saved',
  },
  previewShares: {
    nl: 'Preview shares',
    en: 'Preview shares',
  },
  activeDomains: {
    nl: 'Actieve domeinen',
    en: 'Active domains',
  },
  mrrManaged: {
    nl: 'MRR beheerd',
    en: 'MRR managed',
  },
  domainPending: {
    nl: 'Domein nog niet gekoppeld',
    en: 'Domain not linked yet',
  },
  lastUpdated: {
    nl: 'Laatst bijgewerkt',
    en: 'Last updated',
  },
  openEditor: {
    nl: 'Open editor',
    en: 'Open editor',
  },
  publishFlowEyebrow: {
    nl: 'Publish flow',
    en: 'Publish flow',
  },
  publishFlowTitle: {
    nl: 'Van preview naar betaalde publicatie met domein en verlenging.',
    en: 'From preview to paid publication with domain and renewal.',
  },
  publishFlowDescription: {
    nl: 'De flow is voorbereid op productie: Stripe webhooks, subscriptions, DNS-activatie en lifecycle beheer.',
    en: 'The flow is prepared for production: Stripe webhooks, subscriptions, DNS activation and lifecycle management.',
  },
  templateGalleryEyebrow: {
    nl: 'Template gallery',
    en: 'Template gallery',
  },
  templateGalleryTitle: {
    nl: 'Grote previews per beroep met meerdere commerciële layouts.',
    en: 'Large previews by trade with multiple commercial layouts.',
  },
  templateGalleryDescription: {
    nl: 'Van lunapark tot elektricien en lasser: elk beroep krijgt eigen secties, CTA’s en conversieflow.',
    en: 'From amusement park to electrician and welder: each trade gets its own sections, CTAs and conversion flow.',
  },
  editorPreviewEyebrow: {
    nl: 'Editor + live preview',
    en: 'Editor + live preview',
  },
  editorPreviewTitle: {
    nl: 'Gratis previewen, pas betalen bij publicatie.',
    en: 'Preview for free, pay only at publication.',
  },
  editorPreviewDescription: {
    nl: 'Een premium builder-ervaring met realtime selectie van beroep, layout en websiteblokken.',
    en: 'A premium builder experience with real-time selection of trade, layout and website blocks.',
  },
  pricingEyebrow: {
    nl: 'Stripe billing',
    en: 'Stripe billing',
  },
  pricingTitle: {
    nl: 'Abonnementen voorbereid voor bankkaart, Bancontact en QR-code flow.',
    en: 'Subscriptions prepared for card, Bancontact and QR-code flow.',
  },
  pricingDescription: {
    nl: 'Publicatie wordt geblokkeerd tot betaling succesvol is; abonnementen en automatische verlenging zijn voorbereid in de billinglaag.',
    en: 'Publishing is blocked until payment is successful; subscriptions and automatic renewal are prepared in the billing layer.',
  },
  dashboardFeatureTitle: {
    nl: 'Projecten, abonnementen en domeinen centraal',
    en: 'Projects, subscriptions and domains centrally managed',
  },
  architectureBlockTitle: {
    nl: 'Template engine',
    en: 'Template engine',
  },
  architectureBlockText1: {
    nl: 'Tien beroepen met meerdere layouts, secties en conversiedoelen.',
    en: 'Ten trades with multiple layouts, sections and conversion goals.',
  },
  architectureBlockText2: {
    nl: 'Modulaire editor met live preview, contentblokken en gratis preview mode.',
    en: 'Modular editor with live preview, content blocks and free preview mode.',
  },
  architectureBlockText3: {
    nl: 'Stripe Checkout voorbereidingen voor abonnementen, bankkaart, Bancontact en QR.',
    en: 'Stripe Checkout preparations for subscriptions, bank cards, Bancontact and QR.',
  },
  architectureBlockText4: {
    nl: 'Domeinchecker en DNS-record voorbereiding voor automatische koppeling.',
    en: 'Domain checker and DNS record preparation for automatic linking.',
  },
  architectureBlockText5: {
    nl: 'Structuur voor opgeslagen projecten, statussen, revisies en dashboardbeheer.',
    en: 'Structure for saved projects, statuses, revisions and dashboard management.',
  },
  architectureBlockText6: {
    nl: 'Architectuur voor magic links, OAuth, rollen en veilige sessies.',
    en: 'Architecture for magic links, OAuth, roles and secure sessions.',
  },
  notFoundEyebrow: {
    nl: 'Pagina niet gevonden',
    en: 'Page not found',
  },
  notFoundTitle: {
    nl: 'Oeps, deze pagina bestaat niet.',
    en: 'Oops, this page does not exist.',
  },
  notFoundDescription: {
    nl: 'Ga terug naar de startpagina en kies een bestaande sectie of pagina.',
    en: 'Return to the homepage and choose an existing section or page.',
  },
} as const;

export const templateIds = Object.keys(translations.templateTitles.nl) as Array<keyof typeof translations.templateTitles.nl>;

export function getText(key: TranslationKey, language: Language): string {
  return String((translations[key] as Record<Language, string>)[language]);
}

export function getTemplateText<T extends Record<string, string>>(key: keyof typeof translations, value: string, language: Language): string {
  return String(((translations[key] as unknown) as Record<Language, T>)[language][value] ?? value);
}
