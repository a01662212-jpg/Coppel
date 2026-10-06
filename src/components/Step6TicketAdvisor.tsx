import React, { useState } from 'react';
import { CatalogPhone, CustomerProfile, DeviceCondition } from '../types/kiosk';
import { calculateSimulation, formatMXN } from '../data/mockData';
import { 
  Printer, 
  Send, 
  UserCheck, 
  CheckCircle2, 
  AlertCircle, 
  QrCode, 
  Barcode, 
  Phone, 
  Sparkles, 
  RotateCcw,
  BellRing,
  Info,
  Calendar,
  Check
} from 'lucide-react';
import { kioskAudio } from '../utils/audio';

interface Step6TicketAdvisorProps {
  customer: CustomerProfile;
  selectedPhone: CatalogPhone;
  selectedCondition: DeviceCondition;
  onFinish: () => void;
  onBackToCatalog: () => void;
}

export const Step6TicketAdvisor: React.FC<Step6TicketAdvisorProps> = ({
  customer,
  selectedPhone,
  selectedCondition,
  onFinish,
  onBackToCatalog,
}) => {
  const [ticketPrinted, setTicketPrinted] = useState<boolean>(false);
  const [advisorCalled, setAdvisorCalled] = useState<boolean>(false);
  const [sentWhatsapp, setSentWhatsapp] = useState<boolean>(false);

  const sim = calculateSimulation(
    selectedPhone,
    customer.currentDevice.baseTradeInValue,
    selectedCondition
  );

  const turnNumber = 'T-042';

  const handlePrint = () => {
    kioskAudio.playTap();
    setTicketPrinted(true);
    setTimeout(() => {
      kioskAudio.playSuccessChime();
    }, 400);
  };

  const handleCallAdvisor = () => {
    kioskAudio.playTap();
    setAdvisorCalled(true);
    kioskAudio.playSuccessChime();
  };

  const handleSendWhatsapp = () => {
    kioskAudio.playTap();
    setSentWhatsapp(true);
    kioskAudio.playSuccessChime();
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-5 sm:p-8 max-w-4xl mx-auto w-full select-none overflow-y-auto">
      {/* Top Banner */}
      <div className="text-center space-y-2 mb-4">
        <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3.5 py-1 rounded-full text-xs font-bold">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>¡Propuesta de Renovación Lista!</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-[#0B2038]">
          Pase de Asesoría Telefonía Coppel
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm max-w-lg mx-auto font-medium">
          Muestra este turno al asesor en el mostrador para revisar la condición de tu equipo y tramitar tu nuevo celular sin hacer filas.
        </p>
      </div>

      {/* Main Ticket Card (Clean Physical Receipt Look) */}
      <div className="bg-white border-2 border-slate-300 rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden my-2 max-w-2xl mx-auto w-full">
        {/* Ticket Header & Turn */}
        <div className="flex items-center justify-between border-b-2 border-dashed border-slate-200 pb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#005BAA] flex items-center justify-center text-white">
              <svg className="w-6 h-6 fill-current text-[#FFD100]" viewBox="0 0 24 24">
                <path d="M7 14a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0-7a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm14 2h-9.14a6.96 6.96 0 0 0-1.86-3H21v3zm-4 4h4v3h-4v-3zm0 5h4v3h-4v-3z" />
              </svg>
            </div>
            <div>
              <span className="text-xs font-extrabold uppercase tracking-tight text-[#005BAA]">
                Coppel Telefonía
              </span>
              <p className="text-xs text-slate-500 font-semibold">Atención Preferencial</p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Tu Turno Asignado</span>
            <span className="text-3xl font-black text-[#005BAA] tracking-wider font-mono">
              {turnNumber}
            </span>
          </div>
        </div>

        {/* Customer & Phones summary */}
        <div className="py-4 border-b border-slate-200 space-y-4">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500">Titular de cuenta:</span>
            <span className="font-extrabold text-[#0B2038]">{customer.name}</span>
          </div>

          {/* New phone selected */}
          <div className="bg-blue-50/70 p-3.5 rounded-2xl border border-blue-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={selectedPhone.image}
                alt={selectedPhone.model}
                className="w-12 h-12 object-contain"
                referrerPolicy="no-referrer"
              />
              <div>
                <span className="text-[10px] uppercase font-bold text-[#005BAA]">Equipo Nuevo Elegido</span>
                <h4 className="text-sm font-extrabold text-slate-900">{selectedPhone.model}</h4>
                <span className="text-xs text-slate-500">{selectedPhone.storage} · {selectedPhone.colorName}</span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs text-slate-400 line-through tabular-nums block">
                {formatMXN(sim.originalPrice)}
              </span>
              <span className="text-sm font-black text-[#005BAA] tabular-nums">
                {formatMXN(sim.netPrice)}
              </span>
            </div>
          </div>

          {/* Old phone trade-in breakdown */}
          <div className="bg-emerald-50/70 p-3.5 rounded-2xl border border-emerald-100 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-800 block">
                  Equipo a Entregar (Canje)
                </span>
                <span className="font-bold text-slate-800">
                  {customer.currentDevice.brand} {customer.currentDevice.model}
                </span>
                <span className="text-[11px] text-slate-500 block">
                  Estado reportado: {selectedCondition === 'excellent' ? 'Excelente' : selectedCondition === 'good' ? 'Bueno' : 'Con detalles'}
                </span>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-emerald-700 font-bold block">Valor Estimado:</span>
                <span className="text-base font-black text-emerald-700 tabular-nums">
                  -{formatMXN(sim.tradeInValue)}
                </span>
              </div>
            </div>
          </div>

          {/* Biweekly payment with Coppel Credit */}
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 flex justify-between items-center">
            <div>
              <span className="text-xs font-bold text-slate-700">Abono quincenal estimado:</span>
              <span className="text-[11px] text-slate-500 block">Plazo de 24 quincenas con Crédito Coppel</span>
            </div>
            <div className="text-right">
              <span className="text-xl font-black text-[#0B2038] tabular-nums">
                {formatMXN(sim.biweeklyPayment)}
              </span>
              <span className="text-[10px] text-slate-500 block">/ quincena</span>
            </div>
          </div>
        </div>

        {/* Barcode & QR for Advisor */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-100 rounded-xl border border-slate-200">
              <QrCode className="w-12 h-12 text-slate-800" />
            </div>
            <div className="space-y-0.5">
              <span className="text-[10px] uppercase font-mono font-bold text-slate-400">
                Folio Digital: COP-REN-2026-0892
              </span>
              <p className="text-xs text-slate-600 font-semibold">
                Escanéalo en el punto de venta
              </p>
            </div>
          </div>

          {/* Status of Advisor */}
          <div>
            {advisorCalled ? (
              <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-full animate-pulse">
                <BellRing className="w-3.5 h-3.5 text-emerald-700" />
                Asesor Notificado en Tienda
              </span>
            ) : (
              <button
                onClick={handleCallAdvisor}
                className="bg-[#005BAA] hover:bg-[#004787] text-white text-xs font-bold py-2 px-3.5 rounded-xl shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
              >
                <BellRing className="w-3.5 h-3.5 text-[#FFD100]" />
                <span>Solicitar Asesor al Kiosco</span>
              </button>
            )}
          </div>
        </div>

        {/* Mandatory Transparency Disclaimer */}
        <div className="mt-5 p-3 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-2.5 text-amber-900 text-[11px] leading-relaxed">
          <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <strong>Transparencia Coppel:</strong> Valor estimado de tu equipo. El valor final puede depender de la condición del dispositivo tras la inspección física. Consulta con un asesor para completar tu renovación.
          </div>
        </div>
      </div>

      {/* Action Buttons for Customer (McDonald's self-serve ease) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-3">
        <button
          onClick={handlePrint}
          className={`py-3.5 px-4 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 border transition-all cursor-pointer active:scale-95 ${
            ticketPrinted
              ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
              : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50 shadow-xs'
          }`}
        >
          {ticketPrinted ? (
            <>
              <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
              <span>Ticket Impreso en Ranura</span>
            </>
          ) : (
            <>
              <Printer className="w-4 h-4 text-[#005BAA]" />
              <span>Imprimir Pase Físico</span>
            </>
          )}
        </button>

        <button
          onClick={handleSendWhatsapp}
          className={`py-3.5 px-4 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 border transition-all cursor-pointer active:scale-95 ${
            sentWhatsapp
              ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
              : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50 shadow-xs'
          }`}
        >
          {sentWhatsapp ? (
            <>
              <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
              <span>Enviado a tu Celular</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4 text-[#005BAA]" />
              <span>Enviar por WhatsApp / SMS</span>
            </>
          )}
        </button>

        <button
          onClick={() => {
            kioskAudio.playTap();
            onFinish();
          }}
          className="bg-[#FFD100] hover:bg-[#F5C400] text-[#0B2038] font-black text-xs sm:text-sm py-3.5 px-4 rounded-2xl shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Finalizar Consulta</span>
        </button>
      </div>

      <div className="text-center">
        <button
          onClick={() => {
            kioskAudio.playTap();
            onBackToCatalog();
          }}
          className="text-xs font-bold text-slate-500 hover:text-slate-800 py-1"
        >
          ← Cambiar de celular o explorar más modelos
        </button>
      </div>
    </div>
  );
};
