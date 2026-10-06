import React from 'react';
import { Smartphone, ScanLine, ArrowRight, Sparkles, CheckCircle2, QrCode, CreditCard, Shield, Clock } from 'lucide-react';
import { CustomerProfile } from '../types/kiosk';
import { kioskAudio } from '../utils/audio';

interface Step1WelcomeProps {
  onStart: () => void;
  onSelectQuickPersona: (profile: CustomerProfile) => void;
  demoProfiles: CustomerProfile[];
}

export const Step1Welcome: React.FC<Step1WelcomeProps> = ({
  onStart,
  onSelectQuickPersona,
  demoProfiles,
}) => {
  return (
    <div className="flex-1 flex flex-col justify-between p-6 sm:p-10 max-w-5xl mx-auto w-full select-none">
      {/* Top Banner / Value Proposition */}
      <div className="text-center space-y-4 pt-2">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-[#005BAA] border border-blue-200/80 px-4 py-1.5 rounded-full text-xs font-bold shadow-xs">
          <Sparkles className="w-4 h-4 text-[#FFD100] fill-[#FFD100]" />
          <span>Programa de Renovación y Canje Telefonía Coppel</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-[#0B2038] tracking-tight leading-tight">
          Consulta tu renovación <br className="hidden sm:inline" />
          <span className="text-[#005BAA]">de equipo celular</span>
        </h1>

        <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto font-medium">
          Descubre en segundos si ya puedes estrenar un nuevo teléfono, conoce el valor estimado
          de tu equipo actual y compara opciones con tu crédito Coppel.
        </p>
      </div>

      {/* Main McDonald's-style Large Interactive Action Area */}
      <div className="my-6 grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
        {/* Left: Huge Touch Button to Start */}
        <div className="md:col-span-7 flex flex-col justify-between bg-gradient-to-br from-[#005BAA] to-[#004280] text-white p-7 sm:p-9 rounded-3xl shadow-xl shadow-blue-900/10 border border-blue-400/20 relative overflow-hidden group">
          {/* Subtle decorative glow */}
          <div className="absolute -right-12 -top-12 w-48 h-48 bg-[#FFD100]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-3.5 py-1.5 rounded-xl text-xs font-bold text-white">
              <Smartphone className="w-4 h-4 text-[#FFD100]" />
              <span>Autoservicio Rápido en Tienda</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug">
              ¿Listo para saber si puedes cambiar tu celular?
            </h2>

            <p className="text-blue-100 text-sm font-normal leading-relaxed">
              No necesitas esperar a un vendedor. Escanea tu tarjeta, ticket o ingresa tus datos
              para ver tu saldo y opciones de cambio en pantalla.
            </p>
          </div>

          <div className="pt-8 relative z-10">
            <button
              onClick={() => {
                kioskAudio.playTap();
                onStart();
              }}
              className="w-full bg-[#FFD100] hover:bg-[#F5C400] text-[#0B2038] font-black text-lg sm:text-xl py-5 px-6 rounded-2xl shadow-lg shadow-black/15 flex items-center justify-center gap-3 transition-all transform active:scale-95 group-hover:shadow-2xl cursor-pointer"
            >
              <span>Comenzar mi Consulta</span>
              <ArrowRight className="w-6 h-6 stroke-[3] group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-center text-xs text-blue-200 mt-2 font-medium">
              Toca la pantalla para identificarte
            </p>
          </div>
        </div>

        {/* Right: Realistic Scan Zone Illustration */}
        <div className="md:col-span-5 bg-white border-2 border-slate-200/80 rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-sm">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Zona de Identificación
              </span>
              <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                Lector Activo
              </span>
            </div>

            {/* Visual Scanner Bay Preview */}
            <div className="bg-slate-50 border-2 border-dashed border-[#005BAA]/30 rounded-2xl p-5 text-center relative overflow-hidden group hover:border-[#005BAA] transition-colors">
              <div className="w-20 h-20 mx-auto bg-blue-50 text-[#005BAA] rounded-2xl flex items-center justify-center shadow-inner relative mb-3">
                <ScanLine className="w-10 h-10 animate-pulse text-[#005BAA]" />
                <div className="absolute inset-x-2 top-1/2 h-0.5 bg-red-500 shadow-sm animate-bounce" />
              </div>
              <p className="text-sm font-bold text-slate-800">
                Lector de Tarjeta y Código
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Coloca tu Tarjeta Coppel, el código de tu ticket o el QR de tu App Coppel
              </p>
            </div>
          </div>

          {/* Quick identification options */}
          <div className="space-y-2 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-2.5 text-xs text-slate-700 font-semibold">
              <CreditCard className="w-4 h-4 text-[#005BAA]" />
              <span>Tarjeta Coppel física o digital</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-slate-700 font-semibold">
              <QrCode className="w-4 h-4 text-[#005BAA]" />
              <span>Código QR de App Coppel</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-slate-700 font-semibold">
              <Smartphone className="w-4 h-4 text-[#005BAA]" />
              <span>Número de cliente o teléfono registrado</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Core Value Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 my-2">
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex flex-col items-center text-center gap-2 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#005BAA] flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div className="w-full text-center">
            <h4 className="text-xs font-bold text-slate-900 text-center">Elegibilidad Inmediata</h4>
            <p className="text-xs text-slate-500 mt-0.5 text-center">
              Conoce si ya puedes renovar o los meses exactos que faltan.
            </p>
          </div>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex flex-col items-center text-center gap-2 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 text-amber-600" />
          </div>
          <div className="w-full text-center">
            <h4 className="text-xs font-bold text-slate-900 text-center">Programa de Canje</h4>
            <p className="text-xs text-slate-500 mt-0.5 text-center">
              Tu celular actual tiene valor y se descuenta del precio de tu nuevo equipo.
            </p>
          </div>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex flex-col items-center text-center gap-2 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
            <Shield className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="w-full text-center">
            <h4 className="text-xs font-bold text-slate-900 text-center">Sin Compromiso</h4>
            <p className="text-xs text-slate-500 mt-0.5 text-center">
              Simula libremente tus pagos quincenales antes de pasar con un asesor.
            </p>
          </div>
        </div>
      </div>

      {/* Evaluator / Demo Quick Selector Bar */}
      <div className="bg-slate-100/90 border border-slate-200 rounded-2xl p-3.5 mt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700">
              Demo Interactiva · Casos de prueba:
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {demoProfiles.map((p) => {
              const isEligible = p.eligibility.isEligibleNow;
              return (
                <button
                  key={p.id}
                  onClick={() => {
                    kioskAudio.playTap();
                    onSelectQuickPersona(p);
                  }}
                  className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95 ${
                    isEligible
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-800 hover:bg-emerald-100'
                      : 'bg-amber-50 border-amber-300 text-amber-900 hover:bg-amber-100'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${isEligible ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                  <span>{p.name.split(' ')[0]}</span>
                  <span className="text-[11px] font-medium opacity-80">
                    ({isEligible ? '¡Elegible hoy!' : `Faltan ${p.eligibility.monthsRemaining}m`})
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
