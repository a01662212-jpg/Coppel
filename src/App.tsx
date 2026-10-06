import React, { useState, useEffect, useCallback } from 'react';
import { KioskStep, CustomerProfile, DeviceCondition, CatalogPhone } from './types/kiosk';
import { MOCK_CUSTOMERS, CATALOG_PHONES } from './data/mockData';
import { KioskHeader } from './components/KioskHeader';
import { TotemFrame } from './components/TotemFrame';
import { Step1Welcome } from './components/Step1Welcome';
import { Step2Identification } from './components/Step2Identification';
import { Step3Eligibility } from './components/Step3Eligibility';
import { Step4Catalog } from './components/Step4Catalog';
import { Step5Compare } from './components/Step5Compare';
import { Step6TicketAdvisor } from './components/Step6TicketAdvisor';
import { HelpModal } from './components/HelpModal';
import { kioskAudio } from './utils/audio';
import { BellRing, Check } from 'lucide-react';

export default function App() {
  // Current navigation step
  const [currentStep, setCurrentStep] = useState<KioskStep>('welcome');

  // Customer Profile active in session
  const [customer, setCustomer] = useState<CustomerProfile>(MOCK_CUSTOMERS[0]);

  // Selected device condition for trade-in valuation
  const [selectedCondition, setSelectedCondition] = useState<DeviceCondition>('excellent');

  // Selected phone for final ticket / trade-in proposal
  const [selectedPhone, setSelectedPhone] = useState<CatalogPhone>(CATALOG_PHONES[0]);

  // Phone IDs active in comparison tool
  const [comparedPhoneIds, setComparedPhoneIds] = useState<string[]>([
    CATALOG_PHONES[0].id,
    CATALOG_PHONES[2].id,
  ]);

  // Display mode: Totem frame (physical hardware view) vs Full-screen Touch display
  const [isKioskView, setIsKioskView] = useState<boolean>(true);

  // Sound effects toggle
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Help Modal state
  const [helpOpen, setHelpOpen] = useState<boolean>(false);

  // Global advisor call toast notification
  const [advisorToast, setAdvisorToast] = useState<boolean>(false);

  // Kiosk Inactivity auto-reset timer (resets after 60s of inactivity if customer walked away)
  const [inactivityTimer, setInactivityTimer] = useState<number>(60);

  // Reset inactivity timer on any interaction
  const handleUserActivity = useCallback(() => {
    setInactivityTimer(60);
  }, []);

  useEffect(() => {
    // Add global activity listeners
    window.addEventListener('pointerdown', handleUserActivity);
    window.addEventListener('keydown', handleUserActivity);

    return () => {
      window.removeEventListener('pointerdown', handleUserActivity);
      window.removeEventListener('keydown', handleUserActivity);
    };
  }, [handleUserActivity]);

  // Countdown effect
  useEffect(() => {
    if (currentStep === 'welcome') return;

    const interval = setInterval(() => {
      setInactivityTimer((prev) => {
        if (prev <= 1) {
          // Time expired: return to welcome attract screen for next customer
          setCurrentStep('welcome');
          return 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentStep]);

  // Reset entire kiosk session
  const handleResetKiosk = () => {
    setCurrentStep('welcome');
    setCustomer(MOCK_CUSTOMERS[0]);
    setSelectedCondition('excellent');
    setSelectedPhone(CATALOG_PHONES[0]);
    setComparedPhoneIds([CATALOG_PHONES[0].id, CATALOG_PHONES[2].id]);
    setInactivityTimer(60);
  };

  // Toggle sound
  const handleToggleSound = () => {
    const nextVal = !soundEnabled;
    setSoundEnabled(nextVal);
    kioskAudio.soundEnabled = nextVal;
  };

  // Handle hardware scanner bay click in Totem View
  const handleTriggerScannerBay = () => {
    if (currentStep === 'welcome' || currentStep === 'identify') {
      // Instantly identify Juan Perez (default eligible profile)
      setCustomer(MOCK_CUSTOMERS[0]);
      setCurrentStep('eligibility');
      kioskAudio.playSuccessChime();
    }
  };

  // Toggle phone in comparison
  const handleToggleCompare = (phoneId: string) => {
    setComparedPhoneIds((prev) => {
      if (prev.includes(phoneId)) {
        return prev.filter((id) => id !== phoneId);
      } else {
        if (prev.length >= 3) {
          return [...prev.slice(1), phoneId];
        }
        return [...prev, phoneId];
      }
    });
  };

  const handleRequestAdvisorGlobal = () => {
    setAdvisorToast(true);
    kioskAudio.playSuccessChime();
    setTimeout(() => {
      setAdvisorToast(false);
    }, 4500);
  };

  return (
    <TotemFrame
      isKioskView={isKioskView}
      onToggleView={() => setIsKioskView(!isKioskView)}
      onTriggerScannerBay={handleTriggerScannerBay}
    >
      <div className="flex flex-col h-full min-h-[660px] bg-slate-50 relative select-none">
        {/* Advisor Calling Toast */}
        {advisorToast && (
          <div className="absolute top-20 inset-x-4 z-50 bg-[#005BAA] text-white p-3.5 rounded-2xl shadow-2xl flex items-center justify-between border-2 border-[#FFD100] animate-bounce">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#FFD100] text-[#0B2038] flex items-center justify-center font-bold">
                <BellRing className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-black">Asesor Coppel Solicitado</p>
                <p className="text-[11px] text-blue-100">
                  Un compañero del área de telefonía se dirige al kiosco.
                </p>
              </div>
            </div>
            <span className="text-xs bg-white/20 px-2.5 py-1 rounded-lg font-bold">
              Turno T-042
            </span>
          </div>
        )}

        {/* Global Kiosk Header with Coppel branding and step breadcrumbs */}
        <KioskHeader
          currentStep={currentStep}
          onReset={handleResetKiosk}
          onOpenHelp={() => setHelpOpen(true)}
          soundEnabled={soundEnabled}
          onToggleSound={handleToggleSound}
          inactivitySeconds={inactivityTimer}
        />

        {/* Active Screen Step Switcher */}
        <main className="flex-1 flex flex-col overflow-y-auto">
          {currentStep === 'welcome' && (
            <Step1Welcome
              onStart={() => setCurrentStep('identify')}
              onSelectQuickPersona={(profile) => {
                setCustomer(profile);
                setCurrentStep('eligibility');
              }}
              demoProfiles={MOCK_CUSTOMERS}
            />
          )}

          {currentStep === 'identify' && (
            <Step2Identification
              onBack={() => setCurrentStep('welcome')}
              onIdentifySuccess={(profile) => {
                setCustomer(profile);
                setCurrentStep('eligibility');
              }}
              availableProfiles={MOCK_CUSTOMERS}
            />
          )}

          {currentStep === 'eligibility' && (
            <Step3Eligibility
              customer={customer}
              selectedCondition={selectedCondition}
              onConditionChange={(cond) => setSelectedCondition(cond)}
              onProceedToCatalog={() => setCurrentStep('catalog')}
              onBack={() => setCurrentStep('identify')}
            />
          )}

          {currentStep === 'catalog' && (
            <Step4Catalog
              customer={customer}
              selectedCondition={selectedCondition}
              comparedPhoneIds={comparedPhoneIds}
              onToggleCompare={handleToggleCompare}
              onSelectPhoneForTicket={(phone) => {
                setSelectedPhone(phone);
                setCurrentStep('ticket');
              }}
              onGoToCompare={() => setCurrentStep('compare')}
              onBack={() => setCurrentStep('eligibility')}
            />
          )}

          {currentStep === 'compare' && (
            <Step5Compare
              customer={customer}
              selectedCondition={selectedCondition}
              comparedPhoneIds={comparedPhoneIds}
              onRemovePhone={handleToggleCompare}
              onSelectPhone={(phone) => {
                setSelectedPhone(phone);
                setCurrentStep('ticket');
              }}
              onBackToCatalog={() => setCurrentStep('catalog')}
            />
          )}

          {currentStep === 'ticket' && (
            <Step6TicketAdvisor
              customer={customer}
              selectedPhone={selectedPhone}
              selectedCondition={selectedCondition}
              onFinish={handleResetKiosk}
              onBackToCatalog={() => setCurrentStep('catalog')}
            />
          )}
        </main>

        {/* Help Modal */}
        <HelpModal
          isOpen={helpOpen}
          onClose={() => setHelpOpen(false)}
          onRequestAdvisor={handleRequestAdvisorGlobal}
        />
      </div>
    </TotemFrame>
  );
}
