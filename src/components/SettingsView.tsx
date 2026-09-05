import React, { useState } from 'react';

export const SettingsView: React.FC = () => {
  const [division, setDivision] = useState('Bhopal Division (WCR)');
  const [telemetryFrequency, setTelemetryFrequency] = useState('14ms (High-Frequency)');
  const [autoConflictDetection, setAutoConflictDetection] = useState(true);
  const [kavachSync, setKavachSync] = useState(true);
  const [audioAlerts, setAudioAlerts] = useState(true);
  const [safetyMarginMinutes, setSafetyMarginMinutes] = useState(25);

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="flex flex-col gap-5 pb-12 select-none">
      <div className="bg-white p-4 rounded-lg border border-[#DCE3EA] shadow-xs flex items-center justify-between">
        <div>
          <h1 className="font-serif font-bold text-lg text-[#1C3F60]">
            Divisional Control & SCADA Parameters
          </h1>
          <p className="text-xs text-[#6B7280]">
            Configure signaling telemetry thresholds, RTIS feeds, and automated conflict criteria for West Central Railway.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          className="px-4 py-2 bg-[#1C3F60] hover:bg-[#15314a] text-white rounded text-xs font-semibold shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
        >
          <span className="material-symbols-outlined text-[16px]">save</span>
          <span>Save Parameters</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-3 bg-[#E6F4EA] border border-[#137333]/30 text-[#137333] font-mono text-xs rounded-lg flex items-center gap-2">
          <span className="material-symbols-outlined text-[16px]">check_circle</span>
          <span>Parameters successfully committed to SCADA Central Controller.</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Card 1 */}
        <div className="bg-white p-5 rounded-lg border border-[#DCE3EA] shadow-xs flex flex-col gap-4 text-xs">
          <h2 className="font-serif font-bold text-sm text-[#1C3F60] border-b border-[#DCE3EA] pb-2">
            CRIS & Telemetry Synchronization
          </h2>

          <div>
            <label className="block font-semibold text-[#4B5563] mb-1">Assigned Division</label>
            <select
              value={division}
              onChange={(e) => setDivision(e.target.value)}
              className="w-full bg-[#F8FAFC] border border-[#DCE3EA] rounded p-2 text-[#1F2937]"
            >
              <option>Bhopal Division (WCR)</option>
              <option>Jabalpur Division (WCR)</option>
              <option>Kota Division (WCR)</option>
              <option>Nagpur Division (CR)</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-[#4B5563] mb-1">RTIS GNSS Ping Frequency</label>
            <select
              value={telemetryFrequency}
              onChange={(e) => setTelemetryFrequency(e.target.value)}
              className="w-full bg-[#F8FAFC] border border-[#DCE3EA] rounded p-2 text-[#1F2937]"
            >
              <option>14ms (High-Frequency)</option>
              <option>50ms (Balanced)</option>
              <option>200ms (Low Bandwidth)</option>
            </select>
          </div>

          <label className="flex items-center gap-3 cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={kavachSync}
              onChange={(e) => setKavachSync(e.target.checked)}
              className="rounded text-[#1C3F60]"
            />
            <div>
              <span className="font-semibold block text-[#1F2937]">Kavach Automatic Train Protection Sync</span>
              <span className="text-[#6B7280] text-[11px]">Direct interlocking with on-loco Kavach computer units.</span>
            </div>
          </label>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-5 rounded-lg border border-[#DCE3EA] shadow-xs flex flex-col gap-4 text-xs">
          <h2 className="font-serif font-bold text-sm text-[#1C3F60] border-b border-[#DCE3EA] pb-2">
            Safety Headway & Conflict Rules
          </h2>

          <div>
            <label className="block font-semibold text-[#4B5563] mb-1">
              Minimum Safe Headway Buffer: {safetyMarginMinutes} Minutes
            </label>
            <input
              type="range"
              min={10}
              max={45}
              value={safetyMarginMinutes}
              onChange={(e) => setSafetyMarginMinutes(Number(e.target.value))}
              className="w-full accent-[#1C3F60]"
            />
            <div className="flex justify-between text-[10px] text-[#6B7280] font-mono mt-1">
              <span>10m (Tight)</span>
              <span>25m (Recommended)</span>
              <span>45m (Conservative)</span>
            </div>
          </div>

          <label className="flex items-center gap-3 cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={autoConflictDetection}
              onChange={(e) => setAutoConflictDetection(e.target.checked)}
              className="rounded text-[#1C3F60]"
            />
            <div>
              <span className="font-semibold block text-[#1F2937]">Autonomous AI Conflict Prescriptions</span>
              <span className="text-[#6B7280] text-[11px]">Proactively suggest loop routing and speed restrictions.</span>
            </div>
          </label>

          <label className="flex items-center gap-3 cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={audioAlerts}
              onChange={(e) => setAudioAlerts(e.target.checked)}
              className="rounded text-[#1C3F60]"
            />
            <div>
              <span className="font-semibold block text-[#1F2937]">Audio VHF Bell on Red Overlap</span>
              <span className="text-[#6B7280] text-[11px]">Chime alert when fouling overlap risk exceeds 70%.</span>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};
