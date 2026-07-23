import type { Project, SubscriptionPlan } from '../types/platform';

export const demoProjects: Project[] = [
  {
    id: 'proj_101',
    name: 'Electro Vermeulen',
    profession: 'electricien',
    status: 'preview',
    updatedAt: 'Vandaag, 09:42',
    domain: 'electrovermeulen.be',
  },
  {
    id: 'proj_102',
    name: 'Bakkerij De Morgen',
    profession: 'bakker',
    status: 'billing_required',
    updatedAt: 'Gisteren, 17:18',
  },
  {
    id: 'proj_103',
    name: 'Studio Noor Fotografie',
    profession: 'fotograaf',
    status: 'published',
    updatedAt: '15 mei, 12:05',
    domain: 'studionoor.be',
  },
];

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: '€29/mnd',
    description: 'Voor zelfstandigen die snel professioneel online willen gaan.',
    stripeLookupKey: 'lokale_ai_starter_monthly',
    features: ['AI sitegenerator', 'Gratis preview', '1 gepubliceerde website', 'SSL & hosting voorbereid', 'QR-betaalflow voorbereid'],
  },
  {
    id: 'growth',
    name: 'Growth',
    price: '€59/mnd',
    description: 'Voor lokale ondernemers die leads en boekingen willen automatiseren.',
    stripeLookupKey: 'lokale_ai_growth_monthly',
    highlighted: true,
    features: ['Alles in Starter', 'Online afspraken', 'Eigen domeinkoppeling', 'Stripe abonnementen', 'Projectopslag & versies', 'Prioritaire support'],
  },
  {
    id: 'agency',
    name: 'Studio',
    price: '€149/mnd',
    description: 'Voor teams die meerdere lokale websites beheren.',
    stripeLookupKey: 'lokale_ai_studio_monthly',
    features: ['10 actieve websites', 'White-label preview links', 'Teamrollen', 'Bulk domeinbeheer', 'Geavanceerde analytics'],
  },
];
