import React from 'react';
import { Volume2, VolumeX, RotateCcw, Clock, HelpCircle, ShieldCheck } from 'lucide-react';
import { KioskStep } from '../types/kiosk';
import { kioskAudio } from '../utils/audio';

interface KioskHeaderProps {
  currentStep: KioskStep;
  onReset: () => void;
  onOpenHelp: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  inactivitySeconds: number;
}

export const KioskHeader: React.FC<KioskHeaderProps> = ({
  currentStep,
  onReset,
  onOpenHelp,
  soundEnabled,
  onToggleSound,
  inactivitySeconds,
}) => {
  const steps: { id: KioskStep; label: string }[] = [
    { id: 'identify', label: '1. Tu Cuenta' },
    { id: 'eligibility', label: '2. Tu Celular' },
    { id: 'catalog', label: '3. Elige Equipo' },
    { id: 'ticket', label: '4. Asesoría' },
  ];

  return (
    <header className="relative w-full bg-[#FFD100] text-[#0B2038] shadow-sm select-none border-b border-[#E5BC00] shrink-0">
      {/* Top micro status bar */}
      <div className="flex items-center justify-between px-5 py-1.5 text-xs font-semibold bg-[#EBBF00]/60 border-b border-[#DDB300]/40">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
          <span>Kiosco Coppel Telefonía · Sucursal Centro</span>
        </div>
        <div className="flex items-center gap-4">
          {currentStep !== 'welcome' && (
            <div className="flex items-center gap-1.5 text-slate-800">
              <Clock className="w-3.5 h-3.5 text-slate-700" />
              <span>Inactividad: {inactivitySeconds}s</span>
            </div>
          )}
          <button
            onClick={() => {
              onToggleSound();
              kioskAudio.playTap();
            }}
            className="flex items-center gap-1 text-slate-800 hover:text-black py-0.5 px-1.5 rounded transition-colors"
            title={soundEnabled ? 'Silenciar sonidos' : 'Activar sonidos táctiles'}
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-3.5 h-3.5" />
                <span>Audio activo</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-slate-600" />
                <span>Silenciado</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Brand & Step Navigation */}
      <div className="flex items-center justify-between px-6 py-3.5">
        {/* Brand identity matching Coppel Totem photo */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-[#005BAA] text-white px-3 py-1.5 rounded-lg shadow-xs">
            {/* Coppel iconic key icon representation */}
            <div className="flex items-center">
              <svg className="w-6 h-6 fill-current text-[#FFD100]" viewBox="0 0 24 24">
                <path d="M7 14a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0-7a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm14 2h-9.14a6.96 6.96 0 0 0-1.86-3H21v3zm-4 4h4v3h-4v-3zm0 5h4v3h-4v-3z" />
              </svg>
            </div>
            <span className="text-xl font-black tracking-tight uppercase">Coppel</span>
          </div>

          <div className="flex flex-col">
            <span className="text-base font-extrabold text-[#0B2038] tracking-tight leading-tight">
              módulo cambio de celular
            </span>
            <span className="text-xs font-semibold text-slate-700">
              Autoservicio y Renovación de Telefonía
            </span>
          </div>
        </div>

        {/* Step Indicator (visible once customer starts) */}
        {currentStep !== 'welcome' ? (
          <div className="hidden sm:flex items-center gap-2">
            {steps.map((st, idx) => {
              const isCurrent = currentStep === st.id;
              const stepOrder = ['identify', 'eligibility', 'catalog', 'ticket'];
              const currentIndex = stepOrder.indexOf(currentStep);
              const thisIndex = stepOrder.indexOf(st.id);
              const isDone = thisIndex < currentIndex;

              return (
                <div
                  key={st.id}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold transition-all ${
                    isCurrent
                      ? 'bg-[#005BAA] text-white shadow-xs scale-105'
                      : isDone
                      ? 'bg-amber-400 text-slate-900'
                      : 'text-slate-700 opacity-60'
                  }`}
                >
                  {isDone ? (
                    <ShieldCheck className="w-3.5 h-3.5 text-slate-900" />
                  ) : (
                    <span>{idx + 1}</span>
                  )}
                  <span>{st.label.replace(/^\d+\.\s*/, '')}</span>
                </div>
              );
            })}
          </div>
        ) : null}

        {/* Header Actions */}
        <div className="flex items-center gap-2">
          {currentStep !== 'welcome' && (
            <button
              onClick={() => {
                kioskAudio.playTap();
                onReset();
              }}
              className="flex items-center gap-1.5 bg-white/90 hover:bg-white text-slate-800 px-3 py-2 rounded-lg text-xs font-bold shadow-xs active:scale-95 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-600" />
              <span>Inicio</span>
            </button>
          )}

          <button
            onClick={() => {
              kioskAudio.playTap();
              onOpenHelp();
            }}
            className="flex items-center gap-1 bg-[#005BAA] hover:bg-[#004787] text-white px-3.5 py-2 rounded-lg text-xs font-bold shadow-xs active:scale-95 transition-all"
          >
            <HelpCircle className="w-3.5 h-3.5 text-[#FFD100]" />
            <span>Ayuda</span>
          </button>
        </div>
      </div>
    </header>
  );
};
