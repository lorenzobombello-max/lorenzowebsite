# Lokale AI Website Studio

Een production-ready React + Tailwind projectstructuur voor een professioneel AI SaaS-platform waarmee lokale zelfstandigen zelf websites kunnen bouwen, gratis previewen en pas na betaling publiceren.

## Features

- Premium SaaS landing page in pastelstijl
- Template gallery met 10 beroepen en meerdere layouts per beroep
- Editor met live preview en gratis preview mode
- Stripe billing voorbereiding voor abonnementen, bankkaart, Bancontact en QR-ready betaalflow
- Publish flow die publicatie blokkeert tot succesvolle betaling
- Domeinchecker voorbereiding en DNS-record flow
- Gebruikersdashboard met projectopslagstructuur
- Accountarchitectuur met providers, rollen en sessiestrategie
- Modulaire feature folders voor schaalbaarheid

## Scripts

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## Environment variables

```bash
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

## Productiepad

1. Implementeer backend endpoints voor authentication, projects, billing webhooks en domains.
2. Koppel `createCheckoutSession` aan Stripe Checkout subscriptions.
3. Verwerk Stripe webhooks om projectstatussen naar `published` te zetten.
4. Koppel domeinregistratie/DNS via registrar API of Vercel Domains API.
5. Voeg database-adapters toe voor projecten, gebruikers, abonnementen en domeinen.
