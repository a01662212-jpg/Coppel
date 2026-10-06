import React, { useState } from 'react';
import { CreditCard, QrCode, Phone, ArrowLeft, ArrowRight, Scan, Sparkles, AlertCircle, CheckCircle2, Delete } from 'lucide-react';
import { CustomerProfile } from '../types/kiosk';
import { kioskAudio } from '../utils/audio';

interface Step2IdentificationProps {
  onBack: () => void;
  onIdentifySuccess: (profile: CustomerProfile) => void;
  availableProfiles: CustomerProfile[];
}

export const Step2Identification: React.FC<Step2IdentificationProps> = ({
  onBack,
  onIdentifySuccess,
  availableProfiles,
}) => {
  const [activeMethod, setActiveMethod] = useState<'scan' | 'manual'>('scan');
  const [inputVal, setInputVal] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isScanning, setIsScanning] = useState<boolean>(false);

  // Keypad handler for on-screen tactile typing
  const handleKeyPress = (num: string) => {
    kioskAudio.playTap();
    setErrorMsg('');
    if (inputVal.length < 10) {
      setInputVal((prev) => prev + num);
    }
  };

  const handleBackspace = () => {
    kioskAudio.playTap();
    setErrorMsg('');
    setInputVal((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    kioskAudio.playTap();
    setErrorMsg('');
    setInputVal('');
  };

  // Submit manual identification
  const handleManualSubmit = () => {
    kioskAudio.playTap();
    if (!inputVal || inputVal.length < 8) {
      setErrorMsg('Por favor ingresa un número de cliente (8 dígitos) o teléfono (10 dígitos) válido.');
      return;
    }

    // Match with available demo profiles or fall back to first one for smooth kiosk test
    const matched = availableProfiles.find(
      (p) =>
        p.coppelClientNumber === inputVal ||
        p.phone.replace(/\D/g, '').includes(inputVal)
    );

    if (matched) {
      kioskAudio.playSuccessChime();
      onIdentifySuccess(matched);
    } else {
      // For testing convenience, if custom digits were entered, create an active test profile
      const fallback = availableProfiles[0];
      kioskAudio.playSuccessChime();
      onIdentifySuccess({
        ...fallback,
        coppelClientNumber: inputVal.length === 8 ? inputVal : '48920184',
        name: 'Cliente Coppel',
      });
    }
  };

  // Trigger simulated scanning animation
  const handleSimulateScan = (profile: CustomerProfile) => {
    kioskAudio.playTap();
    setIsScanning(true);
    setErrorMsg('');

    setTimeout(() => {
      kioskAudio.playScanBeep();
      setTimeout(() => {
        kioskAudio.playSuccessChime();
        setIsScanning(false);
        onIdentifySuccess(profile);
      }, 500);
    }, 900);
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-6 sm:p-10 max-w-5xl mx-auto w-full select-none">
      {/* Top Header & Method Tabs */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => {
              kioskAudio.playTap();
              onBack();
            }}
            className="flex items-center gap-2 text-slate-700 hover:text-black font-bold text-sm bg-white border border-slate-200 px-4 py-2.5 rounded-xl shadow-xs active:scale-95 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al inicio</span>
          </button>

          <span className="text-xs font-bold text-[#005BAA] bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100">
            Paso 1 de 4: Identificación Segura
          </span>
        </div>

        <div className="text-center space-y-1 mb-6">
          <h2 className="text-2xl sm:text-4xl font-black text-[#0B2038]">
            Identifícate para consultar tu equipo
          </h2>
          <p className="text-slate-500 text-sm sm:text-base font-medium">
            Elige el método que te sea más fácil y rápido
          </p>
        </div>

        {/* Large McDonald's-style Method Switcher Tabs */}
        <div className="grid grid-cols-2 gap-3 max-w-xl mx-auto mb-6">
          <button
            onClick={() => {
              kioskAudio.playTap();
              setActiveMethod('scan');
            }}
            className={`flex items-center justify-center gap-2.5 py-4 px-4 rounded-2xl font-extrabold text-sm sm:text-base transition-all border-2 cursor-pointer ${
              activeMethod === 'scan'
                ? 'bg-[#005BAA] text-white border-[#005BAA] shadow-md shadow-blue-900/10'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Scan className="w-5 h-5" />
            <span>Escanear Tarjeta / QR</span>
          </button>

          <button
            onClick={() => {
              kioskAudio.playTap();
              setActiveMethod('manual');
            }}
            className={`flex items-center justify-center gap-2.5 py-4 px-4 rounded-2xl font-extrabold text-sm sm:text-base transition-all border-2 cursor-pointer ${
              activeMethod === 'manual'
                ? 'bg-[#005BAA] text-white border-[#005BAA] shadow-md shadow-blue-900/10'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <CreditCard className="w-5 h-5" />
            <span>Ingresar Número</span>
          </button>
        </div>
      </div>

      {/* Method 1: Scan Cradle Simulation */}
      {activeMethod === 'scan' && (
        <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-8 max-w-2xl mx-auto w-full shadow-sm">
          <div className="text-center space-y-2 mb-6">
            <h3 className="text-lg font-bold text-slate-900">
              Coloca tu tarjeta o código en la bahía de escaneo
            </h3>
            <p className="text-xs text-slate-500">
              El escáner del kiosco (ubicado debajo de esta pantalla) leerá automáticamente tus datos.
            </p>
          </div>

          {/* Animated Physical Bay Simulation */}
          <div className="relative bg-slate-900 rounded-2xl p-8 text-center text-white overflow-hidden shadow-inner border border-slate-800">
            {/* LED Glow border mimicking kiosk photo */}
            <div className={`absolute inset-0 border-4 rounded-2xl transition-all duration-300 ${
              isScanning ? 'border-emerald-400 shadow-[0_0_30px_rgba(52,211,153,0.8)]' : 'border-blue-400/50 shadow-[0_0_15px_rgba(96,165,250,0.3)]'
            }`} />

            <div className="relative z-10 flex flex-col items-center justify-center space-y-4">
              <div className="relative w-28 h-28 bg-slate-800/80 rounded-2xl flex items-center justify-center border border-slate-700">
                <Scan className={`w-14 h-14 ${isScanning ? 'text-emerald-400 animate-spin' : 'text-blue-400 animate-pulse'}`} />
                {isScanning && (
                  <div className="absolute inset-x-2 top-0 h-1 bg-emerald-400 shadow-[0_0_10px_#34d399] animate-bounce" />
                )}
              </div>

              <div>
                <p className="text-base font-bold">
                  {isScanning ? 'Leyendo código de barras...' : 'Esperando detección en escáner...'}
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Compatible con código de barras de Tarjeta Coppel, App móvil o ticket de abono
                </p>
              </div>
            </div>
          </div>

          {/* Quick Simulated Scan Action Buttons */}
          <div className="mt-6 space-y-3">
            <span className="block text-center text-xs font-bold uppercase tracking-wider text-slate-400">
              Toca para simular escaneo de tarjeta o app:
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                disabled={isScanning}
                onClick={() => handleSimulateScan(availableProfiles[0])}
                className="bg-blue-50 hover:bg-blue-100 border border-blue-200 text-[#005BAA] p-3 rounded-xl text-left transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-1">
                  <CreditCard className="w-4 h-4 text-[#005BAA]" />
                  <span className="text-xs font-bold">Tarjeta Coppel</span>
                </div>
                <p className="text-[11px] text-slate-600 font-semibold truncate">Juan Pérez</p>
                <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100 px-1.5 py-0.5 rounded">
                  Elegible hoy
                </span>
              </button>

              <button
                disabled={isScanning}
                onClick={() => handleSimulateScan(availableProfiles[1])}
                className="bg-blue-50 hover:bg-blue-100 border border-blue-200 text-[#005BAA] p-3 rounded-xl text-left transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-1">
                  <QrCode className="w-4 h-4 text-[#005BAA]" />
                  <span className="text-xs font-bold">QR App Coppel</span>
                </div>
                <p className="text-[11px] text-slate-600 font-semibold truncate">María Morales</p>
                <span className="text-[10px] text-amber-700 font-bold bg-amber-100 px-1.5 py-0.5 rounded">
                  Faltan 3 meses
                </span>
              </button>

              <button
                disabled={isScanning}
                onClick={() => handleSimulateScan(availableProfiles[2])}
                className="bg-blue-50 hover:bg-blue-100 border border-blue-200 text-[#005BAA] p-3 rounded-xl text-left transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-1">
                  <CreditCard className="w-4 h-4 text-[#005BAA]" />
                  <span className="text-xs font-bold">Ticket de Abono</span>
                </div>
                <p className="text-[11px] text-slate-600 font-semibold truncate">Roberto Sánchez</p>
                <span className="text-[10px] text-amber-700 font-bold bg-amber-100 px-1.5 py-0.5 rounded">
                  Faltan 9 meses
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Method 2: Touch Keypad Input */}
      {activeMethod === 'manual' && (
        <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-8 max-w-xl mx-auto w-full shadow-sm">
          {/* Display input */}
          <div className="mb-4">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 text-center">
              Número de Cliente Coppel o Teléfono Celular
            </label>
            <div className="flex items-center justify-between bg-slate-50 border-2 border-[#005BAA] rounded-2xl px-5 py-4 text-center">
              <span className="text-2xl sm:text-3xl font-black tracking-widest text-[#0B2038] w-full text-center">
                {inputVal ? inputVal : <span className="text-slate-300 font-normal">_ _ _ _ _ _ _ _</span>}
              </span>
              {inputVal && (
                <button
                  onClick={handleClear}
                  className="text-xs font-bold text-slate-400 hover:text-slate-600 px-2"
                >
                  Limpiar
                </button>
              )}
            </div>

            {errorMsg && (
              <div className="flex items-center gap-2 text-xs font-bold text-rose-600 mt-2 justify-center">
                <AlertCircle className="w-4 h-4" />
                <span>{errorMsg}</span>
              </div>
            )}
          </div>

          {/* McDonald's style Large Touch Keypad (min 60px buttons) */}
          <div className="grid grid-cols-3 gap-3 my-4">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
              <button
                key={digit}
                onClick={() => handleKeyPress(digit)}
                className="h-16 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-2xl font-black text-[#0B2038] rounded-2xl shadow-xs active:bg-[#005BAA] active:text-white transition-colors cursor-pointer"
              >
                {digit}
              </button>
            ))}

            <button
              onClick={handleClear}
              className="h-16 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-bold text-slate-700 rounded-2xl active:scale-95 transition-all cursor-pointer"
            >
              BORRAR
            </button>

            <button
              onClick={() => handleKeyPress('0')}
              className="h-16 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-2xl font-black text-[#0B2038] rounded-2xl shadow-xs active:bg-[#005BAA] active:text-white transition-colors cursor-pointer"
            >
              0
            </button>

            <button
              onClick={handleBackspace}
              className="h-16 bg-slate-100 hover:bg-slate-200 border border-slate-200 flex items-center justify-center text-slate-700 rounded-2xl active:scale-95 transition-all cursor-pointer"
            >
              <Delete className="w-6 h-6" />
            </button>
          </div>

          {/* Action button */}
          <button
            onClick={handleManualSubmit}
            disabled={inputVal.length < 8}
            className="w-full bg-[#FFD100] hover:bg-[#F5C400] disabled:bg-slate-200 disabled:text-slate-400 text-[#0B2038] font-black text-lg py-4 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            <span>Continuar Consulta</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Security notice */}
      <div className="text-center text-xs text-slate-400 font-medium pt-4">
        Protección de datos garantizada · Consulta segura en tienda Coppel
      </div>
    </div>
  );
};
