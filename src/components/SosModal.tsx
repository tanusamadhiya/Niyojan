import React, { useState } from 'react';

interface SosModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmSos: () => void;
}

export const SosModal: React.FC<SosModalProps> = ({ isOpen, onClose, onConfirmSos }) => {
  const [sosDispatched, setSosDispatched] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = () => {
    setSosDispatched(true);
    onConfirmSos();
    setTimeout(() => {
      setSosDispatched(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 select-none">
      <div className="bg-white rounded-2xl max-w-md w-full border-2 border-[#8B1E2F] shadow-2xl overflow-hidden animate-scale-up">
        <div className="p-6 flex flex-col items-center text-center gap-3">
          <div className="h-16 w-16 rounded-full bg-[#FCE8E6] text-[#8B1E2F] flex items-center justify-center border border-[#8B1E2F]/20">
            <span className="material-symbols-outlined text-[36px] animate-pulse">warning</span>
          </div>

          <h3 className="font-serif font-bold text-xl text-[#8B1E2F]">
            Send SOS Emergency Alert?
          </h3>

          <p className="text-xs text-[#4B5563] leading-relaxed">
            This will immediately notify the Divisional Control Room, transmit an automatic Kavach brake order to oncoming trains, and dispatch the local emergency response gang. Proceed only for immediate track hazard, obstruction, or life-threatening situation.
          </p>

          {sosDispatched && (
            <div className="w-full p-3 bg-[#E6F4EA] border border-[#137333]/30 rounded-lg text-xs font-mono text-[#137333] font-bold">
              ✓ SOS Alert Transmitted: Gwalior Control Desk & Kavach Safety Engine Triggered
            </div>
          )}

          <div className="flex items-center gap-3 w-full mt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={sosDispatched}
              className="flex-1 py-2.5 border border-[#DCE3EA] hover:bg-[#F0F4F8] text-[#4B5563] rounded-lg text-xs font-semibold transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleConfirm}
              disabled={sosDispatched}
              className="flex-1 py-2.5 bg-[#8B1E2F] hover:bg-[#731725] text-white rounded-lg text-xs font-bold transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">crisis_alert</span>
              <span>Confirm SOS Alert</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
