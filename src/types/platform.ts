export type ProfessionKey =
  | 'lunapark'
  | 'electricien'
  | 'lasser'
  | 'kapper'
  | 'bakker'
  | 'tuinaannemer'
  | 'loodgieter'
  | 'kinesist'
  | 'restaurant'
  | 'fotograaf';

export type LayoutStyle = 'premium' | 'local' | 'booking';

export interface ProfessionTemplate {
  id: ProfessionKey;
  title: string;
  tagline: string;
  description: string;
  accent: string;
  pastel: string;
  gradient: string;
  previewImage: string;
  layouts: TemplateLayout[];
  sections: string[];
  conversionGoal: string;
}

export interface TemplateLayout {
  id: string;
  name: string;
  style: LayoutStyle;
  features: string[];
}

export interface Project {
  id: string;
  name: string;
  profession: ProfessionKey;
  status: 'draft' | 'preview' | 'billing_required' | 'published';
  updatedAt: string;
  domain?: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  stripeLookupKey: string;
  highlighted?: boolean;
}
