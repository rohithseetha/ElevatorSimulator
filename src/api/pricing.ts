export interface PricingTier {
  name: string;
  requestLimit: number;
  pricePerMonth: number;
  features: string[];
}

export const pricingTiers: PricingTier[] = [
  {
    name: 'Basic',
    requestLimit: 1000,
    pricePerMonth: 49,
    features: [
      'Basic elevator control',
      'Status monitoring',
      'Standard support',
    ],
  },
  {
    name: 'Professional',
    requestLimit: 10000,
    pricePerMonth: 199,
    features: [
      'Advanced elevator control',
      'Real-time monitoring',
      'Priority support',
      'Analytics dashboard',
      'Multiple building support',
    ],
  },
  {
    name: 'Enterprise',
    requestLimit: 100000,
    pricePerMonth: 999,
    features: [
      'Unlimited elevator control',
      'Advanced analytics',
      '24/7 premium support',
      'Custom integration options',
      'SLA guarantees',
      'Dedicated account manager',
    ],
  },
];