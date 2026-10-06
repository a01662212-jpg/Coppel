import React, { useState } from 'react';
import { CatalogPhone, CustomerProfile, DeviceCondition } from '../types/kiosk';
import { CATALOG_PHONES, calculateSimulation, formatMXN } from '../data/mockData';
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Plus, 
  Minus, 
  Sparkles, 
  Scale, 
  CheckCircle, 
  Layers, 
  Info,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';
import { kioskAudio } from '../utils/audio';

interface Step4CatalogProps {
  customer: CustomerProfile;
  selectedCondition: DeviceCondition;
  comparedPhoneIds: string[];
  onToggleCompare: (phoneId: string) => void;
  onSelectPhoneForTicket: (phone: CatalogPhone) => void;
  onGoToCompare: () => void;
  onBack: () => void;
}

export const Step4Catalog: React.FC<Step4CatalogProps> = ({
  customer,
  selectedCondition,
  comparedPhoneIds,
  onToggleCompare,
  onSelectPhoneForTicket,
  onGoToCompare,
  onBack,
}) => {
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'recommended' | 'price_low' | 'payment_low'>('recommended');

  const tradeInBase = customer.currentDevice.baseTradeInValue;

  // Filter phones by brand
  const filteredPhones = CATALOG_PHONES.filter((p) => {
    if (selectedBrand === 'all') return true;
    return p.brand.toLowerCase() === selectedBrand.toLowerCase();
  }).sort((a, b) => {
    if (sortBy === 'price_low') return a.originalPrice - b.originalPrice;
    if (sortBy === 'payment_low') {
      const simA = calculateSimulation(a, tradeInBase, selectedCondition);
      const simB = calculateSimulation(b, tradeInBase, selectedCondition);
      return simA.biweeklyPayment - simB.biweeklyPayment;
    }
    return a.popularityRank - b.popularityRank;
  });

  return (
    <div className="flex-1 flex flex-col justify-between p-5 sm:p-8 max-w-6xl mx-auto w-full select-none overflow-y-auto">
      {/* Top Bar: Return, Title & Trade-in Reminder */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <button
            onClick={() => {
              kioskAudio.playTap();
              onBack();
            }}
            className="self-start flex items-center gap-2 text-slate-700 hover:text-black font-bold text-xs sm:text-sm bg-white border border-slate-200 px-3.5 py-2 rounded-xl shadow-xs active:scale-95 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver a mi diagnóstico</span>
          </button>

          {/* Trade-in floating budget chip */}
          <div className="bg-[#005BAA] text-white px-4 py-2 rounded-2xl flex items-center gap-2.5 shadow-sm">
            <span className="text-xs font-semibold text-blue-200">
              Descuento por tu {customer.currentDevice.model}:
            </span>
            <span className="text-base font-black text-[#FFD100] tabular-nums">
              {formatMXN(
                calculateSimulation(CATALOG_PHONES[0], tradeInBase, selectedCondition).tradeInValue
              )}
            </span>
          </div>
        </div>

        {/* Section Heading */}
        <div className="mb-5">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#005BAA]">
                Paso 3 de 4 · Catálogo de Renovación
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0B2038]">
                ¿Qué celular puedes comprar si entregas el tuyo?
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
                Todos los precios ya reflejan el beneficio estimado por tu equipo usado.
              </p>
            </div>

            {/* Quick Filter buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              {['all', 'Samsung', 'Apple', 'Xiaomi', 'Motorola'].map((brand) => (
                <button
                  key={brand}
                  onClick={() => {
                    kioskAudio.playTap();
                    setSelectedBrand(brand);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    selectedBrand === brand
                      ? 'bg-[#005BAA] text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {brand === 'all' ? 'Todos los equipos' : brand}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Large Visual Cards (McDonald's self-serve clarity) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-2">
        {filteredPhones.map((phone) => {
          const sim = calculateSimulation(phone, tradeInBase, selectedCondition);
          const isCompared = comparedPhoneIds.includes(phone.id);

          return (
            <div
              key={phone.id}
              className={`bg-white border-2 rounded-3xl p-5 sm:p-6 transition-all shadow-sm hover:shadow-md flex flex-col justify-between relative ${
                isCompared ? 'border-[#005BAA] ring-2 ring-[#005BAA]/20' : 'border-slate-200/90'
              }`}
            >
              {/* Top Card Bar: Brand & Highlight Badge */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-[#005BAA]">
                    {phone.brand}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-[#0B2038] tracking-tight">
                    {phone.model}
                  </h3>
                  <span className="text-xs font-semibold text-slate-500">
                    {phone.storage} · Color {phone.colorName}
                  </span>
                </div>

                {phone.highlightBadge && (
                  <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[11px] font-extrabold px-2.5 py-1 rounded-full whitespace-nowrap">
                    {phone.highlightBadge}
                  </span>
                )}
              </div>

              {/* Center layout: Clean Studio Photography + Key Specs */}
              <div className="grid grid-cols-12 gap-4 items-center my-2">
                <div className="col-span-5 flex items-center justify-center p-2 bg-slate-50 rounded-2xl border border-slate-100/80">
                  <img
                    src={phone.image}
                    alt={`${phone.brand} ${phone.model}`}
                    className="w-full h-44 object-contain transition-transform duration-300 hover:scale-105"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                </div>

                <div className="col-span-7 space-y-2 text-xs">
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <span className="text-slate-400 block text-[10px] font-bold uppercase">Pantalla</span>
                    <span className="font-bold text-slate-800">{phone.specs.screen}</span>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <span className="text-slate-400 block text-[10px] font-bold uppercase">Cámara</span>
                    <span className="font-bold text-slate-800">{phone.specs.camera}</span>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <span className="text-slate-400 block text-[10px] font-bold uppercase">Batería & Carga</span>
                    <span className="font-bold text-slate-800">{phone.specs.battery}</span>
                  </div>
                </div>
              </div>

              {/* Economic Calculation Breakdown Box (Crucial User Requirement) */}
              <div className="bg-gradient-to-br from-blue-50/70 via-indigo-50/40 to-slate-50 border border-blue-200/80 rounded-2xl p-4 my-3 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-600 font-medium">Precio normal Coppel:</span>
                  <span className="text-slate-500 line-through tabular-nums font-semibold">
                    {formatMXN(sim.originalPrice)}
                  </span>
                </div>

                <div className="flex justify-between items-center text-xs bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-200 text-emerald-800 font-bold">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    Valor estimado de tu equipo actual:
                  </span>
                  <span className="tabular-nums">-{formatMXN(sim.tradeInValue)}</span>
                </div>

                <div className="pt-2 border-t border-blue-200/70 flex justify-between items-baseline">
                  <div>
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide block">
                      Precio estimado con cambio:
                    </span>
                    <span className="text-2xl font-black text-[#005BAA] tabular-nums tracking-tight">
                      {formatMXN(sim.netPrice)}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[11px] font-bold text-slate-500 block">
                      En tu Crédito Coppel:
                    </span>
                    <span className="text-lg font-black text-[#0B2038] tabular-nums">
                      {formatMXN(sim.biweeklyPayment)}
                    </span>
                    <span className="text-[10px] font-bold text-slate-500 block">
                      / quincena ({phone.biweeklyTerms} quincenas)
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Actions: Compare & Select */}
              <div className="grid grid-cols-12 gap-2 pt-2">
                <button
                  onClick={() => {
                    kioskAudio.playTap();
                    onToggleCompare(phone.id);
                  }}
                  className={`col-span-4 flex items-center justify-center gap-1.5 py-3 px-2 rounded-xl text-xs font-bold transition-all border cursor-pointer active:scale-95 ${
                    isCompared
                      ? 'bg-blue-100 text-[#005BAA] border-[#005BAA]'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <Scale className="w-3.5 h-3.5" />
                  <span>{isCompared ? 'Comparando' : 'Comparar'}</span>
                </button>

                <button
                  onClick={() => {
                    kioskAudio.playSuccessChime();
                    onSelectPhoneForTicket(phone);
                  }}
                  className="col-span-8 bg-[#FFD100] hover:bg-[#F5C400] text-[#0B2038] font-black py-3 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer"
                >
                  <span>Quiero Renovar con Este</span>
                  <ChevronRight className="w-4 h-4 stroke-[3]" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating comparison trigger bar if user selected 1+ phones */}
      {comparedPhoneIds.length > 0 && (
        <div className="sticky bottom-2 z-20 bg-slate-900 text-white p-4 rounded-2xl shadow-xl flex items-center justify-between gap-4 border border-slate-700 animate-slide-up mt-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#005BAA] flex items-center justify-center text-white">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold">
                {comparedPhoneIds.length} {comparedPhoneIds.length === 1 ? 'equipo seleccionado' : 'equipos seleccionados'} para comparar
              </p>
              <p className="text-[11px] text-slate-400">
                Revisa lado a lado precios con canje, cámaras y pagos quincenales.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              kioskAudio.playTap();
              onGoToCompare();
            }}
            className="bg-[#FFD100] hover:bg-[#F5C400] text-[#0B2038] font-black text-xs sm:text-sm py-2.5 px-5 rounded-xl flex items-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer whitespace-nowrap"
          >
            <span>Ver Comparativa Lado a Lado</span>
            <ArrowRight className="w-4 h-4 stroke-[3]" />
          </button>
        </div>
      )}

      {/* Legal footnote */}
      <p className="text-center text-[11px] text-slate-400 font-medium pt-4">
        * El valor final de tu equipo usado está sujeto a revisión física por parte del asesor en tienda.
      </p>
    </div>
  );
};
