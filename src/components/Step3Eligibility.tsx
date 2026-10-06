import React from 'react';
import { CustomerProfile, DeviceCondition } from '../types/kiosk';
import { CONDITION_MULTIPLIERS, formatMXN } from '../data/mockData';
import { 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  ArrowLeft, 
  Smartphone, 
  Sparkles, 
  AlertCircle, 
  ShieldCheck, 
  Coins, 
  Info,
  Calendar
} from 'lucide-react';
import { kioskAudio } from '../utils/audio';

interface Step3EligibilityProps {
  customer: CustomerProfile;
  selectedCondition: DeviceCondition;
  onConditionChange: (condition: DeviceCondition) => void;
  onProceedToCatalog: () => void;
  onBack: () => void;
}

export const Step3Eligibility: React.FC<Step3EligibilityProps> = ({
  customer,
  selectedCondition,
  onConditionChange,
  onProceedToCatalog,
  onBack,
}) => {
  const { eligibility, currentDevice } = customer;
  const isEligible = eligibility.isEligibleNow;

  // Calculate progress percentage of payments
  const progressPercent = Math.min(
    100,
    Math.round((currentDevice.paidBiweeklyInstallments / currentDevice.totalBiweeklyInstallments) * 100)
  );

  // Dynamic trade-in valuation based on condition
  const conditionData = CONDITION_MULTIPLIERS[selectedCondition];
  const dynamicTradeInValue = Math.round(currentDevice.baseTradeInValue * conditionData.multiplier);

  return (
    <div className="flex-1 flex flex-col justify-between p-5 sm:p-8 max-w-5xl mx-auto w-full select-none overflow-y-auto">
      {/* Top navigation & greeting */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => {
              kioskAudio.playTap();
              onBack();
            }}
            className="flex items-center gap-2 text-slate-700 hover:text-black font-bold text-xs sm:text-sm bg-white border border-slate-200 px-3.5 py-2 rounded-xl shadow-xs active:scale-95 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver</span>
          </button>

          <div className="text-right">
            <span className="text-xs font-bold text-slate-500">Cliente Coppel</span>
            <p className="text-sm font-black text-[#0B2038]">{customer.name}</p>
          </div>
        </div>

        {/* Big visual eligibility banner */}
        <div
          className={`p-6 sm:p-7 rounded-3xl border-2 shadow-sm transition-all ${
            isEligible
              ? 'bg-gradient-to-r from-emerald-50 via-teal-50/60 to-white border-emerald-300'
              : 'bg-gradient-to-r from-amber-50/80 via-orange-50/40 to-white border-amber-300'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
                  isEligible
                    ? 'bg-emerald-600 text-white'
                    : 'bg-amber-500 text-white'
                }`}
              >
                {isEligible ? (
                  <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
                ) : (
                  <Clock className="w-8 h-8 stroke-[2.5]" />
                )}
              </div>

              <div>
                <span
                  className={`text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full inline-block mb-1 ${
                    isEligible
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-900'
                  }`}
                >
                  {isEligible ? 'Estatus: Elegible para Renovación' : 'Estatus: Renovación en Proceso'}
                </span>

                <h1 className="text-2xl sm:text-3xl font-black text-[#0B2038] tracking-tight">
                  {isEligible ? (
                    '¡Tu equipo está listo para renovación!'
                  ) : (
                    `Faltan ${eligibility.monthsRemaining} meses para tu próximo cambio de equipo`
                  )}
                </h1>

                <p className="text-slate-600 text-xs sm:text-sm font-medium mt-1">
                  {isEligible
                    ? 'Has completado el financiamiento de tu celular. Ya puedes solicitar un nuevo modelo entregando tu equipo actual.'
                    : `Tu fecha estimada de renovación completa es ${eligibility.targetEligibleDate}. ¡Aún así puedes consultar el catálogo y valor estimado!`}
                </p>
              </div>
            </div>

            {/* Quick numeric metric */}
            <div className="sm:text-right bg-white/80 backdrop-blur-xs p-3.5 rounded-2xl border border-slate-200/80 shrink-0">
              <span className="text-xs font-bold text-slate-500 block">Quincenas cubiertas</span>
              <span className="text-2xl font-black text-[#0B2038] tabular-nums">
                {currentDevice.paidBiweeklyInstallments} / {currentDevice.totalBiweeklyInstallments}
              </span>
              <span className="text-xs font-semibold text-emerald-600 block mt-0.5">
                Crédito Coppel al corriente
              </span>
            </div>
          </div>

          {/* Visual Progress Bar (Prominently featured per prompt) */}
          <div className="mt-6 pt-4 border-t border-slate-200/60">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#005BAA]" />
                Progreso hacia tu renovación de equipo
              </span>
              <span className="tabular-nums font-black text-[#005BAA]">{progressPercent}%</span>
            </div>

            <div className="w-full h-4 bg-slate-200/80 rounded-full overflow-hidden p-0.5">
              <div
                className={`h-full rounded-full transition-all duration-1000 ${
                  isEligible
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500'
                    : 'bg-gradient-to-r from-amber-400 to-[#005BAA]'
                }`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="flex justify-between items-center text-[11px] font-semibold text-slate-400 mt-1.5">
              <span>Inicio de contrato ({currentDevice.purchaseDate})</span>
              <span>
                {isEligible ? 'Completado al 100%' : `Próximo cambio: ${eligibility.targetEligibleDate}`}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Center Section: Current Phone Details + Trade-in Program Valuation */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 my-5">
        {/* Left: Current Device Summary */}
        <div className="md:col-span-5 bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Smartphone className="w-4 h-4 text-[#005BAA]" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Tu teléfono actual registrado
              </h3>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 mb-4">
              <p className="text-xs font-bold text-[#005BAA]">{currentDevice.brand}</p>
              <h4 className="text-xl font-black text-[#0B2038]">{currentDevice.model}</h4>
              <div className="flex items-center gap-2 text-xs text-slate-600 font-semibold mt-1">
                <span>{currentDevice.storage}</span>
                <span>·</span>
                <span>{currentDevice.color}</span>
                <span>·</span>
                <span>IMEI ***{currentDevice.imeiSuffix}</span>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Fecha de compra:</span>
                <span className="font-bold text-slate-800">{currentDevice.purchaseDate}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Financiamiento:</span>
                <span className="font-bold text-slate-800">{currentDevice.totalBiweeklyInstallments} quincenas</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Estatus de cuenta:</span>
                <span className="font-bold text-emerald-600">Al corriente sin atrasos</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-400">
            Dispositivo asociado a tu crédito Coppel vigente.
          </div>
        </div>

        {/* Right: TRADE-IN PROGRAM & DYNAMIC VALUATION CALCULATOR */}
        <div className="md:col-span-7 bg-gradient-to-br from-blue-900 to-[#005BAA] text-white rounded-3xl p-6 sm:p-7 shadow-lg shadow-blue-950/20 relative overflow-hidden flex flex-col justify-between">
          {/* Subtle background graphic */}
          <div className="absolute right-0 bottom-0 translate-x-8 translate-y-8 opacity-10 pointer-events-none">
            <Coins className="w-56 h-56 text-[#FFD100]" />
          </div>

          <div className="relative z-10 space-y-4">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-1.5 bg-[#FFD100] text-[#0B2038] px-3 py-1 rounded-full text-xs font-black shadow-xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Programa Cambio de Equipo Coppel</span>
              </div>

              <span className="text-[11px] font-semibold text-blue-200">
                Paso Clave
              </span>
            </div>

            <div>
              <p className="text-blue-100 text-xs font-medium">
                Tu celular usado puede ser considerado como dinero directo para estrenar el siguiente:
              </p>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-xs sm:text-sm font-semibold text-blue-200">
                  Valor estimado de tu equipo:
                </span>
                <span className="text-3xl sm:text-4xl font-black text-[#FFD100] tracking-tight tabular-nums">
                  {formatMXN(dynamicTradeInValue)}
                </span>
              </div>
            </div>

            {/* Condition selector - Allows user to preview value */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3.5 border border-white/15">
              <label className="block text-xs font-bold text-blue-100 mb-2">
                ¿En qué estado se encuentra tu celular hoy?
              </label>

              <div className="grid grid-cols-3 gap-2">
                {(['excellent', 'good', 'fair'] as DeviceCondition[]).map((cond) => {
                  const info = CONDITION_MULTIPLIERS[cond];
                  const isSelected = selectedCondition === cond;
                  return (
                    <button
                      key={cond}
                      onClick={() => {
                        kioskAudio.playTap();
                        onConditionChange(cond);
                      }}
                      className={`p-2.5 rounded-xl text-center flex flex-col items-center justify-center transition-all border cursor-pointer ${
                        isSelected
                          ? 'bg-[#FFD100] text-[#0B2038] border-[#FFD100] font-black shadow-md'
                          : 'bg-white/10 hover:bg-white/20 text-white border-white/20 font-medium'
                      }`}
                    >
                      <span className="block text-xs font-bold text-center">{info.label}</span>
                      <span className="block text-[11px] opacity-90 mt-0.5 tabular-nums text-center">
                        {formatMXN(Math.round(currentDevice.baseTradeInValue * info.multiplier))}
                      </span>
                    </button>
                  );
                })}
              </div>

              <p className="text-[11px] text-blue-200 mt-2 font-medium">
                {conditionData.description}
              </p>
            </div>
          </div>

          {/* Mandatory Disclaimers per user instructions */}
          <div className="mt-4 pt-3 border-t border-white/15 relative z-10">
            <div className="flex items-start gap-2 text-[11px] text-blue-100 leading-snug">
              <Info className="w-4 h-4 text-[#FFD100] shrink-0 mt-0.5" />
              <span>
                <strong>Aviso importante:</strong> El valor mostrado es un <em>valor estimado de tu equipo</em>. El valor final puede depender de la condición física del dispositivo tras la revisión en el módulo de telefonía. Consulta con un asesor para completar tu renovación.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA: Proceed to catalog with calculated trade-in credit */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="text-center sm:text-left">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
            Siguiente paso:
          </span>
          <p className="text-sm sm:text-base font-extrabold text-[#0B2038]">
            Descubre los celulares que puedes comprar aprovechando tus {formatMXN(dynamicTradeInValue)}
          </p>
        </div>

        <button
          onClick={() => {
            kioskAudio.playSuccessChime();
            onProceedToCatalog();
          }}
          className="w-full sm:w-auto bg-[#FFD100] hover:bg-[#F5C400] text-[#0B2038] font-black text-base sm:text-lg py-4 px-8 rounded-2xl shadow-md flex items-center justify-center gap-3 cursor-pointer active:scale-95 transition-all whitespace-nowrap"
        >
          <span>Ver Catálogo con mi Descuento</span>
          <ArrowRight className="w-5 h-5 stroke-[3]" />
        </button>
      </div>
    </div>
  );
};
