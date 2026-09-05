import React, { useState } from 'react';

interface CctvModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CctvModal: React.FC<CctvModalProps> = ({ isOpen, onClose }) => {
  const [thermalMode, setThermalMode] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 select-none">
      <div className="bg-[#0F172A] rounded-2xl max-w-2xl w-full border border-slate-700 shadow-2xl overflow-hidden animate-scale-up flex flex-col text-white">
        {/* Header */}
        <div className="p-3.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="font-serif font-bold text-sm">
              Live Drone Feeds · UAV-BPL-04 (Mandideep Section)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setThermalMode(!thermalMode)}
              className={`px-2.5 py-1 rounded text-xs font-mono font-semibold transition-colors cursor-pointer ${
                thermalMode ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'
              }`}
            >
              {thermalMode ? 'Thermal: ON' : 'Thermal: OFF'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-white"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        </div>

        {/* Video Canvas / HUD */}
        <div className="relative aspect-video bg-black overflow-hidden flex items-center justify-center">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwRB9rBLBKSjUDb3oNs4qe8yEOE7MRVKKNQlwGs3xHPYlwKsLL_g0emWcYCaZohM_31i2E-RBRAIxzYYz-KRDlfZxiMPkI1Xo8_kkrkdbR_n0NfTHiVveOmlYa2uCh7TZUyqCIOvIeVuzitXDvEAL47FGpJXRFtoCm0GE6j9MR3XYhbyqN2PgNlcE5vloYsQivLF-i9duozpoVfNWLei_Aqj_CcNinPHbZgh3asEQo-vknOTPlfigX"
            alt="Track Live Feed"
            className={`w-full h-full object-cover opacity-85 transition-all ${
              thermalMode ? 'hue-rotate-180 contrast-125' : ''
            }`}
          />

          {/* HUD Crosshairs & telemetry */}
          <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between font-mono text-[11px] text-emerald-400">
            <div className="flex justify-between">
              <div>
                <div>UAV-04 · ALT: 45m · SPD: 0.0 km/h</div>
                <div className="text-slate-400">LAT: 23.0642° N · LON: 77.5268° E</div>
              </div>
              <div className="text-right">
                <div className="text-rose-400 font-bold">● REC [1080p 60fps]</div>
                <div>SIGNAL: 98% · BATT: 82%</div>
              </div>
            </div>

            {/* Target Reticle on track */}
            <div className="self-center flex flex-col items-center">
              <div className="w-24 h-24 border-2 border-emerald-400/80 rounded-sm flex items-center justify-center relative">
                <div className="h-2 w-2 bg-emerald-400 rounded-full" />
                <span className="absolute -top-4 text-[9px] bg-slate-900/80 px-1 rounded text-emerald-300">
                  CSM-09 · GANG #04 DETECTED
                </span>
              </div>
            </div>

            <div className="flex justify-between items-end">
              <div>
                <span>TARGET: KM 818/02 · UP MAIN LINE</span>
                <div className="text-slate-300">WORKERS DETECTED: 8 PERSONS (ALL IN PPE)</div>
              </div>
              <div className="text-amber-400 font-bold">
                NO TRACK INCURSIONS DETECTED
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Encrypted RailNet Video Stream · CRIS Interlinked</span>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded font-medium cursor-pointer"
          >
            Close Feed
          </button>
        </div>
      </div>
    </div>
  );
};
