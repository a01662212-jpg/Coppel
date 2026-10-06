import React from 'react';
import { Scan, Smartphone, CreditCard, Sparkles, Monitor, Maximize2, Shield } from 'lucide-react';
import { kioskAudio } from '../utils/audio';

interface TotemFrameProps {
  children: React.ReactNode;
  isKioskView: boolean;
  onToggleView: () => void;
  onTriggerScannerBay: () => void;
}

export const TotemFrame: React.FC<TotemFrameProps> = ({
  children,
  isKioskView,
  onToggleView,
  onTriggerScannerBay,
}) => {
  if (!isKioskView) {
    // Full screen touchscreen mode
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-start relative">
        {/* Floating view toggle bar */}
        <div className="fixed top-2 right-4 z-40 bg-white/95 backdrop-blur-md border border-slate-300 rounded-full px-3 py-1.5 shadow-md flex items-center gap-2 text-xs font-bold text-slate-800">
          <span className="text-slate-500">Vista:</span>
          <button
            onClick={() => {
              kioskAudio.playTap();
              onToggleView();
            }}
            className="flex items-center gap-1.5 bg-[#005BAA] text-white px-2.5 py-1 rounded-full hover:bg-[#004787] transition-all cursor-pointer"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Ver Tótem Físico Coppel</span>
          </button>
        </div>

        <div className="w-full min-h-screen flex flex-col bg-slate-50 max-w-[1280px] shadow-2xl border-x border-slate-200">
          {children}
        </div>
      </div>
    );
  }

  // Physical Totem Casing Mode (Accurate recreation of uploaded image)
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-200 via-slate-300 to-slate-400 py-6 px-3 flex flex-col items-center justify-center relative overflow-x-hidden">
      {/* View Switcher Header Bar */}
      <div className="w-full max-w-4xl flex items-center justify-between mb-4 bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-sm border border-slate-300">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-extrabold text-[#0B2038]">
            Simulador de Kiosco Físico · Telefonía Coppel
          </span>
        </div>

        <button
          onClick={() => {
            kioskAudio.playTap();
            onToggleView();
          }}
          className="flex items-center gap-1.5 bg-[#005BAA] hover:bg-[#004787] text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-xs transition-all cursor-pointer"
        >
          <Maximize2 className="w-3.5 h-3.5" />
          <span>Expandir a Pantalla Completa</span>
        </button>
      </div>

      {/* Realistic Coppel Totem Hardware Enclosure */}
      <div className="relative flex flex-col items-center w-full max-w-[560px] animate-fade-in">
        {/* Upper Kiosk Head with Bezel & Glow */}
        <div className="w-full bg-gradient-to-b from-[#F7F9FC] via-[#EEF2F6] to-[#E2E8F0] p-4 sm:p-5 rounded-[42px] border-[5px] border-[#D0D7DE] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.4),0_0_20px_rgba(255,255,255,0.8)_inset] relative">
          {/* Subtle perimeter LED ambient glow around the bezel */}
          <div className="absolute inset-0 rounded-[38px] border-2 border-white/80 pointer-events-none shadow-[0_0_12px_rgba(255,255,255,0.7)]" />

          {/* Top Hardware Bezel: Camera & Light Sensor */}
          <div className="flex items-center justify-center pb-3 pt-1">
            <div className="w-3.5 h-3.5 rounded-full bg-slate-900 border-2 border-slate-500 flex items-center justify-center shadow-inner">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500/80" />
            </div>
          </div>

          {/* Touchscreen Glass Area (9:16 Portrait Aspect Ratio Container) */}
          <div className="w-full rounded-[26px] overflow-hidden bg-white border-2 border-slate-900 shadow-2xl flex flex-col min-h-[660px] max-h-[780px]">
            {children}
          </div>

          {/* Lower Hardware Module (Per uploaded photo):
              - Illuminated Scanner Cradle Bay (Left)
              - Magnetic / NFC Card Pinpad Terminal (Right)
              - Illuminated separation accent line
          */}
          <div className="mt-4 pt-2 border-t-2 border-slate-300/80 flex items-center justify-between gap-4 px-2">
            {/* Left: Glowing Scanner Bay (Interactive) */}
            <div
              onClick={() => {
                kioskAudio.playScanBeep();
                onTriggerScannerBay();
              }}
              className="flex-1 bg-slate-900 rounded-2xl p-3 border-2 border-amber-300 shadow-[0_0_15px_rgba(255,209,0,0.4)] flex flex-col items-center justify-center cursor-pointer group hover:border-[#FFD100] transition-all relative overflow-hidden"
              title="Toca para simular escaneo en la bahía física"
            >
              <div className="absolute -top-1 inset-x-0 h-1 bg-[#FFD100] animate-pulse" />
              <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                <Scan className="w-6 h-6 text-[#FFD100]" />
              </div>
              <span className="text-[10px] font-extrabold uppercase text-[#FFD100] tracking-wider">
                Bahía de Escaneo
              </span>
              <span className="text-[9px] text-slate-400 font-medium">
                Toca para leer tarjeta
              </span>
            </div>

            {/* Center: Receipt / Ticket Slot */}
            <div className="w-14 flex flex-col items-center justify-center">
              <div className="w-12 h-1.5 bg-slate-800 rounded-full shadow-inner mb-1" />
              <span className="text-[8px] font-bold text-slate-500 uppercase">Ticket</span>
            </div>

            {/* Right: Card PIN-pad POS Terminal */}
            <div className="w-28 bg-slate-800 rounded-2xl p-2.5 border border-slate-700 shadow-md flex flex-col items-center">
              {/* Terminal Screen */}
              <div className="w-full bg-cyan-900/80 border border-cyan-500/30 rounded p-1 text-center mb-2">
                <span className="text-[8px] font-mono text-cyan-200 block truncate">
                  COPPEL PAY
                </span>
                <span className="text-[7px] font-mono text-cyan-400 block">
                  INSERTE / ACERQUE
                </span>
              </div>

              {/* Pinpad keys */}
              <div className="grid grid-cols-3 gap-1 w-full px-1">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((k) => (
                  <div key={k} className="h-2 bg-slate-700 rounded-xs" />
                ))}
              </div>

              {/* Colored status keys */}
              <div className="flex gap-1.5 mt-1.5 w-full px-1">
                <div className="flex-1 h-1.5 bg-rose-600 rounded-xs" />
                <div className="flex-1 h-1.5 bg-amber-500 rounded-xs" />
                <div className="flex-1 h-1.5 bg-emerald-500 rounded-xs" />
              </div>
            </div>
          </div>
        </div>

        {/* Lower Brushed Aluminum Pedestal Base (per uploaded photo) */}
        <div className="w-[380px] h-40 bg-gradient-to-b from-[#D4D8DD] via-[#B8BEC5] to-[#9CA4AC] rounded-b-2xl border-x-2 border-b-2 border-slate-400 shadow-2xl relative flex flex-col justify-end items-center">
          {/* Subtle vertical brush reflections */}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.4)_50%,transparent_100%)] pointer-events-none" />

          {/* Coppel embossed lower brand stamp */}
          <div className="pb-6 text-slate-600 font-extrabold text-xs tracking-widest uppercase opacity-70">
            Telefonía Coppel
          </div>

          {/* Curved Floor Base Plate */}
          <div className="w-[480px] h-5 bg-gradient-to-r from-slate-400 via-slate-200 to-slate-400 rounded-t-lg shadow-xl border-t border-white/60" />
        </div>
      </div>
    </div>
  );
};
