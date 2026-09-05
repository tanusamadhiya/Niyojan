import React, { useState } from 'react';

export const ImpactRolloutView: React.FC = () => {
  const [monthlyBlocks, setMonthlyBlocks] = useState<number>(45);
  const [trainDelayMinutesSavedPerBlock, setTrainDelayMinutesSavedPerBlock] = useState<number>(38);

  const annualHoursSaved = (monthlyBlocks * 2.5 * 12).toFixed(0);
  const annualTrainDelayMinutesSaved = (monthlyBlocks * trainDelayMinutesSavedPerBlock * 12).toLocaleString();
  const estimatedSavingsCr = ((monthlyBlocks * 2.2 * 12) / 100).toFixed(2);

  return (
    <div className="flex flex-col gap-5 max-w-[1240px] mx-auto w-full">
      {/* 4 Impact Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-[#E4E8F0] rounded-xl p-4 px-4.5 shadow-2xs">
          <div className="text-[24px] font-extrabold font-mono text-[#047857]">
            2.5h
          </div>
          <div className="text-[11.5px] text-[#8A94A6] font-semibold mt-1">
            Closure hours saved per mega-block
          </div>
        </div>

        <div className="bg-white border border-[#E4E8F0] rounded-xl p-4 px-4.5 shadow-2xs">
          <div className="text-[24px] font-extrabold font-mono text-[#4338CA]">
            3 &rarr; 1
          </div>
          <div className="text-[11.5px] text-[#8A94A6] font-semibold mt-1">
            Redundant possessions eliminated
          </div>
        </div>

        <div className="bg-white border border-[#E4E8F0] rounded-xl p-4 px-4.5 shadow-2xs">
          <div className="text-[24px] font-extrabold font-mono text-[#1D4ED8]">
            100%
          </div>
          <div className="text-[11.5px] text-[#8A94A6] font-semibold mt-1">
            Overlap-free schedule guarantee
          </div>
        </div>

        <div className="bg-white border border-[#E4E8F0] rounded-xl p-4 px-4.5 shadow-2xs">
          <div className="text-[24px] font-extrabold font-mono text-[#B45309]">
            SDG 9 · 11
          </div>
          <div className="text-[11.5px] text-[#8A94A6] font-semibold mt-1">
            Industry &amp; sustainable infrastructure
          </div>
        </div>
      </div>

      {/* Case Card: Bhopal / Gwalior Division */}
      <div className="bg-[#0A1220] text-white rounded-xl p-5 flex items-start gap-4.5 shadow-xs">
        <div className="w-[38px] h-[38px] rounded-[9px] bg-[#1B2A46] flex items-center justify-center shrink-0">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8FB4FF" strokeWidth="2">
            <path d="M13 2 4 14h6l-1 8 9-12h-6z" />
          </svg>
        </div>
        <div>
          <h4 className="text-[12.5px] text-[#8FB4FF] font-extrabold uppercase tracking-wider mb-1.5">
            USE CASE — BHOPAL &amp; GWALIOR DIVISIONS
          </h4>
          <p className="text-[13px] text-[#D6DEEE] leading-relaxed">
            A track section has a defect (Engineering: 2h), a faulty signal (Signal: 1h) and overhead wire maintenance (Traction: 1.5h). Traditionally, that's <strong className="text-white font-bold">3 separate block requests across different days</strong>. Rail Niyojan-AI detects the geographic overlap and clusters them into <strong className="text-white font-bold">one 2.5-hour mega-block</strong> inside a natural gap in the train timetable. <strong className="text-white font-bold">Outcome: track downtime is cut in half, zero trains delayed.</strong>
          </p>
        </div>
      </div>

      {/* Interactive Annual ROI Calculator */}
      <div className="bg-white border border-[#E4E8F0] rounded-xl p-5 shadow-2xs">
        <div className="text-[13px] font-extrabold text-[#0F172A] mb-1">
          Division Benefit Simulator (ROI Calculator)
        </div>
        <div className="text-[12px] text-[#8A94A6] mb-4">
          Estimate capacity recovery and punctuality impact for your division.
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="flex flex-col gap-4">
            <div>
              <div className="flex justify-between text-[12px] font-bold text-[#4B5768] mb-1">
                <span>Monthly Mega-Block Possessions:</span>
                <span className="font-mono text-[#1D4ED8]">{monthlyBlocks} blocks/mo</span>
              </div>
              <input
                type="range"
                min="10"
                max="120"
                value={monthlyBlocks}
                onChange={(e) => setMonthlyBlocks(Number(e.target.value))}
                className="w-full accent-[#1D4ED8]"
              />
            </div>

            <div>
              <div className="flex justify-between text-[12px] font-bold text-[#4B5768] mb-1">
                <span>Est. Train Delay Avoided per Block:</span>
                <span className="font-mono text-[#047857]">{trainDelayMinutesSavedPerBlock} mins</span>
              </div>
              <input
                type="range"
                min="15"
                max="90"
                value={trainDelayMinutesSavedPerBlock}
                onChange={(e) => setTrainDelayMinutesSavedPerBlock(Number(e.target.value))}
                className="w-full accent-[#047857]"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 bg-[#FAFBFD] border border-[#E4E8F0] rounded-xl p-4 text-center">
            <div>
              <div className="text-[18px] font-extrabold font-mono text-[#047857]">
                {annualHoursSaved}h
              </div>
              <div className="text-[10.5px] text-[#8A94A6] font-semibold mt-1">
                Annual Closure Saved
              </div>
            </div>

            <div>
              <div className="text-[18px] font-extrabold font-mono text-[#1D4ED8]">
                {annualTrainDelayMinutesSaved}m
              </div>
              <div className="text-[10.5px] text-[#8A94A6] font-semibold mt-1">
                Punctuality Recovered
              </div>
            </div>

            <div>
              <div className="text-[18px] font-extrabold font-mono text-[#4338CA]">
                ₹{estimatedSavingsCr} Cr
              </div>
              <div className="text-[10.5px] text-[#8A94A6] font-semibold mt-1">
                Throughput Value
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Deployment Roadmap */}
      <div>
        <div className="text-[13px] font-extrabold text-[#0F172A] mb-2.5">
          Deployment Roadmap
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          <div className="bg-white border border-[#E4E8F0] rounded-xl p-4 shadow-2xs">
            <div className="w-[26px] h-[26px] rounded-full bg-[#0A1220] text-white text-[12px] font-extrabold flex items-center justify-center mb-2.5">
              1
            </div>
            <h4 className="text-[13px] font-extrabold text-[#0F172A]">Pilot — Single Division</h4>
            <p className="text-[11.5px] text-[#8A94A6] mt-1 leading-relaxed">
              Launch in Bhopal / Jhansi division with hands-on training for section engineers &amp; controllers.
            </p>
          </div>

          <div className="bg-white border border-[#E4E8F0] rounded-xl p-4 shadow-2xs">
            <div className="w-[26px] h-[26px] rounded-full bg-[#0A1220] text-white text-[12px] font-extrabold flex items-center justify-center mb-2.5">
              2
            </div>
            <h4 className="text-[13px] font-extrabold text-[#0F172A]">Zonal Rollout</h4>
            <p className="text-[11.5px] text-[#8A94A6] mt-1 leading-relaxed">
              Extend across North Central Railway zone once pilot metrics validate downtime reduction.
            </p>
          </div>

          <div className="bg-white border border-[#E4E8F0] rounded-xl p-4 shadow-2xs">
            <div className="w-[26px] h-[26px] rounded-full bg-[#0A1220] text-white text-[12px] font-extrabold flex items-center justify-center mb-2.5">
              3
            </div>
            <h4 className="text-[13px] font-extrabold text-[#0F172A]">National Scale</h4>
            <p className="text-[11.5px] text-[#8A94A6] mt-1 leading-relaxed">
              Deploy across all zonal railways via standard Ministry of Railways IT budgets — no new funding track.
            </p>
          </div>
        </div>
      </div>

      {/* Feasibility */}
      <div>
        <div className="text-[13px] font-extrabold text-[#0F172A] mb-2.5">
          Feasibility
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          <div className="bg-white border border-[#E4E8F0] rounded-xl p-4 shadow-2xs">
            <h4 className="text-[12.5px] font-extrabold mb-2 flex items-center gap-2">
              <span className="badge b-blue">Technical</span>
            </h4>
            <p className="text-[12px] text-[#4B5768] leading-relaxed">
              C++ optimization engine, Python ML, React dashboards. Integrates with existing TMS/COA databases via REST APIs.
            </p>
          </div>

          <div className="bg-white border border-[#E4E8F0] rounded-xl p-4 shadow-2xs">
            <h4 className="text-[12.5px] font-extrabold mb-2 flex items-center gap-2">
              <span className="badge b-amber">Operational</span>
            </h4>
            <p className="text-[12px] text-[#4B5768] leading-relaxed">
              Phased rollout with a lightweight offline-first mobile app for ground crews and manual override for controllers.
            </p>
          </div>

          <div className="bg-white border border-[#E4E8F0] rounded-xl p-4 shadow-2xs">
            <h4 className="text-[12.5px] font-extrabold mb-2 flex items-center gap-2">
              <span className="badge b-green">Financial</span>
            </h4>
            <p className="text-[12px] text-[#4B5768] leading-relaxed">
              Funded through standard IT budgets. ROI from eliminating redundant blocks &amp; avoiding train-delay penalties.
            </p>
          </div>
        </div>
      </div>

      {/* Key Challenges & How We Solve Them */}
      <div>
        <div className="text-[13px] font-extrabold text-[#0F172A] mb-2.5">
          Key Challenges &amp; How We Solve Them
        </div>
        <div className="bg-white border border-[#E4E8F0] rounded-xl overflow-hidden shadow-2xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 p-2.5 px-4 text-[10.5px] font-extrabold text-[#8A94A6] uppercase tracking-wider border-b border-[#E4E8F0] bg-[#FAFBFD]">
            <span>Challenge</span>
            <span>Our Solution</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 border-b border-[#EDF0F5]">
            <div className="p-3.5 px-4 text-[12.5px] text-[#B91C1C] font-bold bg-[#FEFBFB]">
              Departmental silos &amp; trust
            </div>
            <div className="p-3.5 px-4 text-[12.5px] text-[#4B5768] leading-relaxed">
              Transparent unified dashboard proves how Mega-Blocks reduce every department's own workload.
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 border-b border-[#EDF0F5]">
            <div className="p-3.5 px-4 text-[12.5px] text-[#B91C1C] font-bold bg-[#FEFBFB]">
              Safety of AI-scheduled possessions
            </div>
            <div className="p-3.5 px-4 text-[12.5px] text-[#4B5768] leading-relaxed">
              Hard mathematical constraints in the C++ engine guarantee 100% overlap-free schedules, plus manual override.
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2">
            <div className="p-3.5 px-4 text-[12.5px] text-[#B91C1C] font-bold bg-[#FEFBFB]">
              Fragmented legacy data (TMS/SMMS/TDMS)
            </div>
            <div className="p-3.5 px-4 text-[12.5px] text-[#4B5768] leading-relaxed">
              Automated ingestion pipelines standardize defect logs into one unified schema.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
