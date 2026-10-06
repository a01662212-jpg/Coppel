export type KioskStep = 
  | 'welcome' 
  | 'identify' 
  | 'eligibility' 
  | 'catalog' 
  | 'compare' 
  | 'ticket';

export type DeviceCondition = 'excellent' | 'good' | 'fair';

export interface CustomerProfile {
  id: string;
  name: string;
  coppelClientNumber: string;
  phone: string;
  currentDevice: {
    brand: string;
    model: string;
    storage: string;
    color: string;
    purchaseDate: string;
    totalBiweeklyInstallments: number; // e.g. 24
    paidBiweeklyInstallments: number;  // e.g. 24 or 18
    baseTradeInValue: number; // e.g. 3500
    monthlyPlanCost?: number;
    imeiSuffix: string;
  };
  eligibility: {
    isEligibleNow: boolean;
    monthsRemaining: number;
    targetEligibleDate?: string;
    creditStatus: 'al_corriente' | 'en_revision' | 'excelente';
    maxCreditLimit: number;
  };
}

export interface CatalogPhone {
  id: string;
  brand: 'Samsung' | 'Apple' | 'Xiaomi' | 'Motorola' | 'Honor';
  model: string;
  storage: string;
  colorName: string;
  image: string;
  originalPrice: number;
  biweeklyTerms: number; // e.g. 24 quincenas
  specs: {
    screen: string;
    camera: string;
    battery: string;
    network: string;
    chipset: string;
    fastCharge: string;
  };
  highlightBadge?: string;
  popularityRank: number;
}

export interface SimulationResult {
  phone: CatalogPhone;
  originalPrice: number;
  tradeInValue: number;
  netPrice: number;
  biweeklyPayment: number;
  biweeklyPaymentWithoutTradeIn: number;
  biweeklySavings: number;
  deviceCondition: DeviceCondition;
}
