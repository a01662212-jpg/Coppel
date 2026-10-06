import React from 'react';
import { X, HelpCircle, BellRing, Smartphone, ShieldCheck, Sparkles, PhoneCall } from 'lucide-react';
import { kioskAudio } from '../utils/audio';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRequestAdvisor: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({
  isOpen,
  onClose,
  onRequestAdvisor,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-slide-up space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#005BAA] flex items-center justify-center">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-[#0B2038]">Ayuda en Kiosco</h3>
              <p className="text-xs text-slate-500">Módulo Cambio de Celular Coppel</p>
            </div>
          </div>

          <button
            onClick={() => {
              kioskAudio.playTap();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3.5 text-xs text-slate-600">
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
            <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
              <Smartphone className="w-4 h-4 text-[#005BAA]" />
              ¿Cómo funciona el cambio de celular?
            </h4>
            <p>
              Entregas tu teléfono actual en el mostrador de telefonía y su valor estimado se descuenta directamente del precio de tu nuevo equipo o de tu crédito Coppel.
            </p>
          </div>

          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
            <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              ¿El valor del celular está 100% garantizado?
            </h4>
            <p>
              El monto en pantalla es un <strong>valor estimado</strong>. El valor final depende de la condición física real (pantalla, cámaras, batería) evaluada por el asesor en tienda.
            </p>
          </div>

          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
            <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              ¿Qué necesito para renovar hoy?
            </h4>
            <p>
              Tener tu Crédito Coppel al corriente, identificación oficial (INE) y llevar tu equipo actual limpio para inspección física.
            </p>
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
          <button
            onClick={() => {
              kioskAudio.playTap();
              onRequestAdvisor();
              onClose();
            }}
            className="flex-1 bg-[#005BAA] hover:bg-[#004787] text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-95 transition-all"
          >
            <BellRing className="w-4 h-4 text-[#FFD100]" />
            <span>Solicitar Asesor en Persona</span>
          </button>

          <button
            onClick={() => {
              kioskAudio.playTap();
              onClose();
            }}
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 px-4 rounded-xl text-xs cursor-pointer active:scale-95 transition-all"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
