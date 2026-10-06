import React from 'react';
import { CatalogPhone, CustomerProfile, DeviceCondition } from '../types/kiosk';
import { CATALOG_PHONES, calculateSimulation, formatMXN } from '../data/mockData';
import { ArrowLeft, Check, Sparkles, ChevronRight, X, Scale } from 'lucide-react';
import { kioskAudio } from '../utils/audio';

interface Step5CompareProps {
  customer: CustomerProfile;
  selectedCondition: DeviceCondition;
  comparedPhoneIds: string[];
  onRemovePhone: (phoneId: string) => void;
  onSelectPhone: (phone: CatalogPhone) => void;
  onBackToCatalog: () => void;
}

export const Step5Compare: React.FC<Step5CompareProps> = ({
  customer,
  selectedCondition,
  comparedPhoneIds,
  onRemovePhone,
  onSelectPhone,
  onBackToCatalog,
}) => {
  const tradeInBase = customer.currentDevice.baseTradeInValue;

  // Determine phones to display: selected ones, or if less than 2, pick the top 3
  const phonesToDisplay = comparedPhoneIds.length >= 2
    ? CATALOG_PHONES.filter((p) => comparedPhoneIds.includes(p.id))
    : CATALOG_PHONES.slice(0, 3);

  return (
    <div className="flex-1 flex flex-col justify-between p-5 sm:p-8 max-w-6xl mx-auto w-full select-none overflow-y-auto">
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => {
              kioskAudio.playTap();
              onBackToCatalog();
            }}
            className="flex items-center gap-2 text-slate-700 hover:text-black font-bold text-xs sm:text-sm bg-white border border-slate-200 px-3.5 py-2 rounded-xl shadow-xs active:scale-95 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al catálogo</span>
          </button>

          <span className="text-xs font-bold text-[#005BAA] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Comparativa de Celulares
          </span>
        </div>

        <div className="text-center space-y-1 mb-6">
          <h2 className="text-2xl sm:text-3xl font-black text-[#0B2038]">
            Comparativa lado a lado con tu celular en canje
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm font-medium">
            Entregando tu {customer.currentDevice.brand} {customer.currentDevice.model}
          </p>
        </div>
      </div>

      {/* Comparison Grid Table */}
      <div className="bg-white border-2 border-slate-200 rounded-3xl p-4 sm:p-6 shadow-sm overflow-x-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 min-w-[640px]">
          {phonesToDisplay.map((phone) => {
            const sim = calculateSimulation(phone, tradeInBase, selectedCondition);

            return (
              <div
                key={phone.id}
                className="bg-slate-50/70 border border-slate-200/90 rounded-2xl p-4 flex flex-col justify-between relative shadow-xs"
              >
                {/* Remove button if user explicitly added */}
                {comparedPhoneIds.includes(phone.id) && comparedPhoneIds.length > 2 && (
                  <button
                    onClick={() => {
                      kioskAudio.playTap();
                      onRemovePhone(phone.id);
                    }}
                    className="absolute top-3 right-3 w-7 h-7 bg-white text-slate-400 hover:text-rose-600 rounded-full flex items-center justify-center border border-slate-200 shadow-xs cursor-pointer"
                    title="Quitar de comparador"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}

                {/* Top: Image & Name */}
                <div className="text-center pb-3 border-b border-slate-200">
                  <div className="h-36 flex items-center justify-center mb-2">
                    <img
                      src={phone.image}
                      alt={phone.model}
                      className="max-h-32 object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <span className="text-[11px] font-black uppercase text-[#005BAA]">
                    {phone.brand}
                  </span>
                  <h3 className="text-base font-black text-[#0B2038]">{phone.model}</h3>
                  <span className="text-xs text-slate-500 font-medium">
                    {phone.storage} · {phone.colorName}
                  </span>
                </div>

                {/* Pricing & Trade-In Breakdown */}
                <div className="py-3 border-b border-slate-200 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Precio normal:</span>
                    <span className="line-through text-slate-400 font-semibold tabular-nums">
                      {formatMXN(sim.originalPrice)}
                    </span>
                  </div>

                  <div className="flex justify-between text-emerald-700 font-bold bg-emerald-50 px-2 py-1 rounded">
                    <span>Tu celular usado:</span>
                    <span className="tabular-nums">-{formatMXN(sim.tradeInValue)}</span>
                  </div>

                  <div className="flex justify-between items-baseline pt-1">
                    <span className="font-bold text-slate-700">Precio estimado:</span>
                    <span className="text-lg font-black text-[#005BAA] tabular-nums">
                      {formatMXN(sim.netPrice)}
                    </span>
                  </div>

                  <div className="bg-[#005BAA]/5 p-2 rounded-xl border border-[#005BAA]/10 text-center">
                    <span className="text-[10px] uppercase font-bold text-slate-500 block">
                      En Crédito Coppel
                    </span>
                    <span className="text-base font-black text-[#0B2038] tabular-nums">
                      {formatMXN(sim.biweeklyPayment)} / quincena
                    </span>
                    <span className="text-[10px] text-emerald-600 font-bold block mt-0.5">
                      Ahorras {formatMXN(sim.biweeklySavings)}/quincena con tu canje
                    </span>
                  </div>
                </div>

                {/* Technical Specs Comparison */}
                <div className="py-3 space-y-2 text-xs text-slate-600">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Pantalla</span>
                    <span className="font-semibold text-slate-800">{phone.specs.screen}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Cámara</span>
                    <span className="font-semibold text-slate-800">{phone.specs.camera}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Batería & Carga</span>
                    <span className="font-semibold text-slate-800">{phone.specs.battery}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Procesador</span>
                    <span className="font-semibold text-slate-800">{phone.specs.chipset}</span>
                  </div>
                </div>

                {/* Primary CTA */}
                <div className="pt-3">
                  <button
                    onClick={() => {
                      kioskAudio.playSuccessChime();
                      onSelectPhone(phone);
                    }}
                    className="w-full bg-[#FFD100] hover:bg-[#F5C400] text-[#0B2038] font-black text-xs sm:text-sm py-3 px-3 rounded-xl shadow-xs active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Elegir este Celular</span>
                    <ChevronRight className="w-4 h-4 stroke-[3]" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer advice */}
      <div className="text-center pt-4">
        <p className="text-xs text-slate-500 font-medium">
          Selecciona tu modelo preferido para generar tu pase de atención prioritaria con un asesor Coppel.
        </p>
      </div>
    </div>
  );
};
