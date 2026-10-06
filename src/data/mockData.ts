import { CatalogPhone, CustomerProfile, DeviceCondition } from '../types/kiosk';

// Import high-resolution studio product photos generated for the kiosk
import galaxyS24Img from '../assets/images/coppel_galaxy_s24_1791244689059.jpg';
import iphone15Img from '../assets/images/coppel_iphone_15_1791244698574.jpg';
import redmiNote13Img from '../assets/images/coppel_redmi_note13_1791244707261.jpg';
import motorolaEdgeImg from '../assets/images/coppel_motorola_edge_1791244716510.jpg';

export const CONDITION_MULTIPLIERS: Record<DeviceCondition, { multiplier: number; label: string; description: string }> = {
  excellent: {
    multiplier: 1.0,
    label: 'Excelente estado',
    description: 'Sin golpes ni rayones visibles, pantalla impecable, funcionamiento al 100%',
  },
  good: {
    multiplier: 0.85,
    label: 'Buen estado',
    description: 'Leves marcas de uso normal en bordes o tapa, pantalla sin roturas',
  },
  fair: {
    multiplier: 0.65,
    label: 'Con detalles de uso',
    description: 'Rayones perceptibles, desgaste en pintura exterior o batería reducida',
  },
};

export const MOCK_CUSTOMERS: CustomerProfile[] = [
  {
    id: 'cust-eligible-1',
    name: 'Juan Carlos Pérez Ortiz',
    coppelClientNumber: '48920184',
    phone: '667-234-8910',
    currentDevice: {
      brand: 'Samsung',
      model: 'Galaxy A53 5G',
      storage: '128 GB',
      color: 'Azul Celeste',
      purchaseDate: 'Mayo 2025',
      totalBiweeklyInstallments: 24,
      paidBiweeklyInstallments: 24,
      baseTradeInValue: 3200,
      monthlyPlanCost: 499,
      imeiSuffix: '8924',
    },
    eligibility: {
      isEligibleNow: true,
      monthsRemaining: 0,
      targetEligibleDate: 'Hoy mismo',
      creditStatus: 'al_corriente',
      maxCreditLimit: 25000,
    },
  },
  {
    id: 'cust-pending-3m',
    name: 'María Fernanda Morales',
    coppelClientNumber: '31094821',
    phone: '667-541-1192',
    currentDevice: {
      brand: 'Xiaomi',
      model: 'Redmi Note 11',
      storage: '128 GB',
      color: 'Gris Grafito',
      purchaseDate: 'Enero 2026',
      totalBiweeklyInstallments: 24,
      paidBiweeklyInstallments: 18,
      baseTradeInValue: 1800,
      monthlyPlanCost: 399,
      imeiSuffix: '4410',
    },
    eligibility: {
      isEligibleNow: false,
      monthsRemaining: 3,
      targetEligibleDate: '15 de Enero de 2027',
      creditStatus: 'al_corriente',
      maxCreditLimit: 18500,
    },
  },
  {
    id: 'cust-pending-9m',
    name: 'Roberto Sánchez Vega',
    coppelClientNumber: '77291034',
    phone: '667-889-4021',
    currentDevice: {
      brand: 'Motorola',
      model: 'Moto G52',
      storage: '128 GB',
      color: 'Negro Carbón',
      purchaseDate: 'Julio 2026',
      totalBiweeklyInstallments: 24,
      paidBiweeklyInstallments: 6,
      baseTradeInValue: 1400,
      monthlyPlanCost: 349,
      imeiSuffix: '1092',
    },
    eligibility: {
      isEligibleNow: false,
      monthsRemaining: 9,
      targetEligibleDate: '15 de Julio de 2027',
      creditStatus: 'al_corriente',
      maxCreditLimit: 16000,
    },
  },
];

export const CATALOG_PHONES: CatalogPhone[] = [
  {
    id: 'phone-galaxy-s24',
    brand: 'Samsung',
    model: 'Galaxy S24 5G',
    storage: '256 GB',
    colorName: 'Cobalt Violet',
    image: galaxyS24Img,
    originalPrice: 14999,
    biweeklyTerms: 24,
    specs: {
      screen: '6.2" Dynamic AMOLED 2X 120Hz',
      camera: '50 MP + 12 MP + 10 MP (Zoom 3x)',
      battery: '4,000 mAh · Carga 25W',
      network: '5G Telcel / Movistar / AT&T',
      chipset: 'Exynos 2400 Deca-Core / Galaxy AI',
      fastCharge: '25W Super Fast Charge',
    },
    highlightBadge: 'Más vendido en Coppel',
    popularityRank: 1,
  },
  {
    id: 'phone-iphone-15',
    brand: 'Apple',
    model: 'iPhone 15',
    storage: '128 GB',
    colorName: 'Azul Titanio',
    image: iphone15Img,
    originalPrice: 17499,
    biweeklyTerms: 24,
    specs: {
      screen: '6.1" Super Retina XDR OLED',
      camera: '48 MP Principal + 12 MP Ultra Gran Angular',
      battery: '3,349 mAh · Todo el día',
      network: '5G Ultra Wideband',
      chipset: 'A16 Bionic 6 núcleos',
      fastCharge: 'USB-C · Carga rápida 50% en 30m',
    },
    highlightBadge: 'Favorito Coppel Pay',
    popularityRank: 2,
  },
  {
    id: 'phone-redmi-note13-pro',
    brand: 'Xiaomi',
    model: 'Redmi Note 13 Pro+ 5G',
    storage: '256 GB',
    colorName: 'Midnight Black',
    image: redmiNote13Img,
    originalPrice: 9499,
    biweeklyTerms: 24,
    specs: {
      screen: '6.67" AMOLED Curva 1.5K 120Hz',
      camera: '200 MP con OIS Super Claridad',
      battery: '5,000 mAh · Carga Ultra 120W',
      network: '5G Doble SIM',
      chipset: 'MediaTek Dimensity 7200-Ultra',
      fastCharge: '120W HyperCharge (100% en 19 min)',
    },
    highlightBadge: 'Mejor relación calidad/precio',
    popularityRank: 3,
  },
  {
    id: 'phone-motorola-edge-50',
    brand: 'Motorola',
    model: 'Edge 50 Pro 5G',
    storage: '512 GB',
    colorName: 'Peach Fuzz Cuero Vegano',
    image: motorolaEdgeImg,
    originalPrice: 11999,
    biweeklyTerms: 24,
    specs: {
      screen: '6.7" pOLED Super HD 144Hz',
      camera: '50 MP con IA Pantone Validated',
      battery: '4,500 mAh · TurboPower 125W',
      network: '5G Ready',
      chipset: 'Snapdragon 7 Gen 3',
      fastCharge: '125W TurboPower incluido',
    },
    highlightBadge: 'Gran almacenamiento 512GB',
    popularityRank: 4,
  },
];

// Calculation helper for Coppel Bi-weekly payments
export function calculateSimulation(
  phone: CatalogPhone,
  baseTradeIn: number,
  condition: DeviceCondition
) {
  const multiplier = CONDITION_MULTIPLIERS[condition].multiplier;
  const estimatedTradeIn = Math.round(baseTradeIn * multiplier);
  const netPrice = Math.max(0, phone.originalPrice - estimatedTradeIn);

  // Coppel bi-weekly financing calculation (typical ~1.28 financing coefficient over 24 quincenas with Coppel Credit)
  const financingFactor = 1.25;
  const biweeklyWithoutTradeIn = Math.round((phone.originalPrice * financingFactor) / phone.biweeklyTerms);
  const biweeklyWithTradeIn = Math.round((netPrice * financingFactor) / phone.biweeklyTerms);
  const biweeklySavings = biweeklyWithoutTradeIn - biweeklyWithTradeIn;

  return {
    phone,
    originalPrice: phone.originalPrice,
    tradeInValue: estimatedTradeIn,
    netPrice,
    biweeklyPayment: biweeklyWithTradeIn,
    biweeklyPaymentWithoutTradeIn: biweeklyWithoutTradeIn,
    biweeklySavings,
    deviceCondition: condition,
  };
}

export function formatMXN(amount: number): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 0,
  }).format(amount);
}
