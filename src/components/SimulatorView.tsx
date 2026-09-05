import React, { useState } from 'react';

interface SimulatorViewProps {
  onDispatched?: () => void;
}

export const SimulatorView: React.FC<SimulatorViewProps> = ({ onDispatched }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>('Ready to optimize');
  const [showResult, setShowResult] = useState<boolean>(false);
  const [selectedCorridor, setSelectedCorridor] = useState<string>('GWL-DBA');
  const [algorithmMode, setAlgorithmMode] = useState<'genetic' | 'simulated_annealing' | 'integer_prog'>('genetic');
  const [headwayBuffer, setHeadwayBuffer] = useState<number>(18);

  const steps = [
    {
      num: 1,
      title: 'Ingest Requests',
      desc: 'Pulls independent requests from TMS, SMMS & TDMS plus the COA timetable.'
    },
    {
      num: 2,
      title: 'Predict Risk (ML)',
      desc: 'XGBoost scores true failure risk & urgency from historical defect data.'
    },
    {
      num: 3,
      title: 'Cluster & Optimize',
      desc: 'Genetic Algorithm searches for an overlap-free merge window.'
    },
    {
      num: 4,
      title: 'Mega-Block Formed',
      desc: 'Single synchronized possession, guaranteed conflict-free with live trains.'
    },
    {
      num: 5,
      title: 'Dispatch',
      desc: 'Pushed to the Controller Dashboard and the Ground Crew mobile app.'
    }
  ];

  const handleRunOptimization = () => {
    if (isRunning) return;
    setIsRunning(true);
    setShowResult(false);
    setCurrentStep(1);

    const labels = [
      'Ingesting maintenance requests…',
      'Scoring failure risk (ML)…',
      'Running Genetic Algorithm clustering…',
      'Synthesizing mega-block…',
      'Dispatching to dashboards…'
    ];

    let i = 0;
    const interval = setInterval(() => {
      i++;
      if (i <= 5) {
        setCurrentStep(i);
        setStatusMessage(labels[i - 1]);
      } else {
        clearInterval(interval);
        setStatusMessage('Optimization complete');
        setIsRunning(false);
        setShowResult(true);
      }
    }, 450);
  };

  return (
    <div className="flex flex-col gap-5 max-w-[1240px] mx-auto w-full">
      {/* 5-Step Pipeline */}
      <div className="grid grid-cols-1 md:grid-cols-5 border border-[#E4E8F0] rounded-[10px] overflow-hidden bg-white shadow-2xs">
        {steps.map((step) => {
          const isDone = currentStep > step.num || showResult;
          const isCurrent = currentStep === step.num && isRunning;
          return (
            <div
              key={step.num}
              className={`p-4 md:border-r border-b md:border-b-0 border-[#E4E8F0] last:border-r-0 transition-colors ${
                isCurrent
                  ? 'bg-[#EFEFFD]'
                  : isDone
                  ? 'bg-[#E6F5EE]'
                  : 'bg-white'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full text-[12px] font-extrabold flex items-center justify-center mb-2.5 transition-colors ${
                  isCurrent
                    ? 'bg-[#4338CA] text-white'
                    : isDone
                    ? 'bg-[#047857] text-white'
                    : 'bg-[#F1F3F7] text-[#8A94A6]'
                }`}
              >
                {isDone ? '✓' : step.num}
              </div>
              <h4 className="text-[12.5px] font-extrabold text-[#0F172A] mb-1">
                {step.title}
              </h4>
              <p className="text-[11px] text-[#8A94A6] leading-relaxed">
                {step.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* Scenario Parameters Bar */}
      <div className="bg-white border border-[#E4E8F0] rounded-xl p-3.5 px-4.5 flex flex-wrap items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-[11.5px] font-bold text-[#4B5768]">Corridor Section:</span>
          <select
            value={selectedCorridor}
            onChange={(e) => setSelectedCorridor(e.target.value)}
            className="border border-[#E4E8F0] bg-[#FAFBFD] text-[12.5px] font-semibold text-[#0F172A] rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-[#1D4ED8]"
          >
            <option value="GWL-DBA">GWL–DBA (UP Main Line · KM 1215–1256)</option>
            <option value="GWL-JHS">GWL–JHS (Quad Track Corridor · KM 1215–1318)</option>
            <option value="STLI-AEH">STLI–AEH (Sithouli Curve · KM 1222–1235)</option>
          </select>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-[11.5px] font-bold text-[#4B5768]">Algorithm:</span>
          <div className="flex border border-[#E4E8F0] rounded-lg overflow-hidden text-[11px] font-semibold">
            <button
              type="button"
              onClick={() => setAlgorithmMode('genetic')}
              className={`px-2.5 py-1 transition-colors ${
                algorithmMode === 'genetic' ? 'bg-[#0A1220] text-white' : 'bg-white text-[#4B5768]'
              }`}
            >
              Genetic Algorithm
            </button>
            <button
              type="button"
              onClick={() => setAlgorithmMode('simulated_annealing')}
              className={`px-2.5 py-1 transition-colors ${
                algorithmMode === 'simulated_annealing' ? 'bg-[#0A1220] text-white' : 'bg-white text-[#4B5768]'
              }`}
            >
              Simulated Annealing
            </button>
          </div>

          <div className="flex items-center gap-1.5 text-[11.5px] text-[#4B5768]">
            <span>Headway:</span>
            <span className="font-mono font-bold text-[#0F172A]">{headwayBuffer}m</span>
          </div>
        </div>
      </div>

      {/* Demonstration Scenario Card */}
      <div className="bg-white border border-[#E4E8F0] rounded-xl p-5 shadow-2xs">
        <div className="text-[13px] font-extrabold text-[#0F172A]">
          Demonstration Scenario — Gwalior Corridor
        </div>
        <div className="text-[12px] text-[#8A94A6] mt-0.5">
          A railway section near Gwalior has three independent maintenance requests scheduled for today.
        </div>

        {/* 3 Department Request Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 my-3.5">
          <div className="bg-[#FAFBFD] border border-[#E4E8F0] rounded-xl p-3.5">
            <div className="text-[11px] font-bold text-[#1D4ED8]">ENGINEERING</div>
            <div className="text-[14px] font-extrabold text-[#0F172A] mt-1">Track Tamping &amp; Lining</div>
            <div className="text-[18px] font-extrabold font-mono text-[#0F172A] mt-1.5">2.0h</div>
          </div>

          <div className="bg-[#FAFBFD] border border-[#E4E8F0] rounded-xl p-3.5">
            <div className="text-[11px] font-bold text-[#B45309]">SIGNAL</div>
            <div className="text-[14px] font-extrabold text-[#0F172A] mt-1">Point Machine Overhaul</div>
            <div className="text-[18px] font-extrabold font-mono text-[#0F172A] mt-1.5">1.0h</div>
          </div>

          <div className="bg-[#FAFBFD] border border-[#E4E8F0] rounded-xl p-3.5">
            <div className="text-[11px] font-bold text-[#047857]">TRACTION</div>
            <div className="text-[14px] font-extrabold text-[#0F172A] mt-1">OHE Catenary Wire Check</div>
            <div className="text-[18px] font-extrabold font-mono text-[#0F172A] mt-1.5">1.5h</div>
          </div>
        </div>

        {/* Warning Line */}
        <div className="flex items-center gap-2 bg-[#FCECEC] text-[#B91C1C] rounded-lg p-2.5 px-3 text-[12px] font-semibold mt-1.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="shrink-0">
            <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <path d="M12 9v4M12 17h.01" />
          </svg>
          <span>Standard execution needs 3 separate track possessions — 4.5h cumulative closure, high risk of train delays.</span>
        </div>

        {/* Run Controls */}
        <div className="flex items-center justify-between mt-4 pt-3.5 border-t border-[#EDF0F5]">
          <span className="text-[12px] text-[#8A94A6] font-semibold font-mono">
            {statusMessage}
          </span>
          <button
            type="button"
            id="runBtn"
            disabled={isRunning}
            onClick={handleRunOptimization}
            className={`bg-[#1D4ED8] hover:bg-[#1743B0] text-white text-[13px] font-bold px-4 py-2 rounded-lg inline-flex items-center gap-2 transition-all cursor-pointer shadow-xs ${
              isRunning ? 'opacity-60 cursor-not-allowed' : ''
            }`}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M13 2 4 14h6l-1 8 9-12h-6z" />
            </svg>
            <span>{isRunning ? 'Optimizing Corridor…' : 'Run AI Optimization'}</span>
          </button>
        </div>
      </div>

      {/* Result Wrap */}
      {showResult && (
        <div className="animate-fade-in">
          <div className="border border-[#BCE4D2] bg-gradient-to-b from-[#F3FBF7] to-white rounded-xl p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="badge b-green">✓ OPTIMIZED MEGA-BLOCK</span>
              <span className="text-[11px] text-[#8A94A6] font-semibold">Illustrative simulation</span>
            </div>

            <div className="mt-3.5">
              <h3 className="text-[16px] font-extrabold text-[#0F172A]">
                Engineering + Signal + Traction — Coordinated
              </h3>
              <p className="text-[12.5px] text-[#4B5768] mt-1 leading-relaxed">
                All 3 tasks executed in parallel within the safe inter-train headway window (14:00–16:00). Train #12002 Shatabdi and Freight BCN-44 proceed with zero speed restrictions.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3.5">
              <div className="bg-white border border-[#E4E8F0] rounded-xl p-3 px-3.5 shadow-2xs">
                <div className="text-[11px] text-[#8A94A6] font-semibold">Total Duration</div>
                <div className="text-[17px] font-extrabold text-[#047857] mt-1 font-mono">
                  2.0 hours
                </div>
              </div>

              <div className="bg-white border border-[#E4E8F0] rounded-xl p-3 px-3.5 shadow-2xs">
                <div className="text-[11px] text-[#8A94A6] font-semibold">Train Conflicts</div>
                <div className="text-[17px] font-extrabold text-[#047857] mt-1 font-mono">
                  None
                </div>
              </div>

              <div className="bg-white border border-[#E4E8F0] rounded-xl p-3 px-3.5 shadow-2xs">
                <div className="text-[11px] text-[#8A94A6] font-semibold">Closures Reduced</div>
                <div className="text-[17px] font-extrabold text-[#0F172A] mt-1 font-mono">
                  3 &rarr; 1
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-4 pt-3 border-t border-[#BCE4D2]/60">
              <button
                type="button"
                onClick={() => {
                  if (onDispatched) onDispatched();
                }}
                className="bg-[#047857] hover:bg-[#065F46] text-white text-[12.5px] font-bold px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer shadow-xs inline-flex items-center gap-1.5"
              >
                <span>Dispatch to Ground Crew &rarr;</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
