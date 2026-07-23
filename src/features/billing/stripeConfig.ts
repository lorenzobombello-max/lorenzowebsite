import { loadStripe } from '@stripe/stripe-js';

const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

export const stripePromise = publishableKey ? loadStripe(publishableKey) : Promise.resolve(null);

export interface CheckoutPayload {
  projectId: string;
  lookupKey: string;
  successUrl: string;
  cancelUrl: string;
  paymentMethods: Array<'card' | 'bancontact' | 'ideal'>;
}

export async function createCheckoutSession(payload: CheckoutPayload) {
  return {
    endpoint: '/api/billing/create-checkout-session',
    payload,
    notes: 'Backend endpoint verwacht Stripe Checkout subscriptions met card, Bancontact en iDEAL/QR-compatibele betaalmethodes.',
  };
}
