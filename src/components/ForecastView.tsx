import React, { useState } from 'react';
import { WEEKLY_FORECASTS } from '../data/mockData';

interface ForecastViewProps {
  onLoadOptimizer: () => void;
}

export const ForecastView: React.FC<ForecastViewProps> = ({ onLoadOptimizer }) => {
  const [selectedWeek, setSelectedWeek] = useState<string>('Week 39');
  const activeForecast = WEEKLY_FORECASTS.find(w => w.week === selectedWeek) || WEEKLY_FORECASTS[1];

  return (
    <div className="flex flex-col gap-5 pb-12">
      {/* Forecast Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 bg-white p-4 rounded-lg border border-[#DCE3EA] shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-[11px] text-[#6B7280] font-mono">
            <span>Capacity Analytics Engine</span>
            <span>&gt;</span>
            <span className="text-[#1C3F60] font-semibold">30-Day Rolling Maintenance Horizon</span>
          </div>
          <h1 className="font-serif font-bold text-lg text-[#1C3F60] mt-0.5">
            30-Day Capacity Forecast & Bottleneck Predictor
          </h1>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F0FDF4] border border-[#16A34A]/20 rounded text-xs font-mono text-[#15803D]">
            <span className="h-2 w-2 rounded-full bg-[#16A34A] animate-pulse" />
            <span>AI Predictive Model: 94.6% Confidence</span>
          </div>

          <button
            type="button"
            onClick={onLoadOptimizer}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#1C3F60] hover:bg-[#15314a] text-white rounded text-xs font-semibold shadow-xs transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[15px]">tune</span>
            <span>Simulate Pre-Clustering</span>
          </button>
        </div>
      </div>

      {/* Main Stacked Bar Chart & Ceiling Breach Banner */}
      <div className="bg-white rounded-lg border border-[#DCE3EA] shadow-xs p-6 flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#DCE3EA] pb-3">
          <div>
            <h2 className="font-serif font-bold text-base text-[#1C3F60]">
              Weekly Track Possession Hours vs Safe Capacity Ceiling (35.0h)
            </h2>
            <p className="text-xs text-[#6B7280]">
              Stacked breakdown by Engineering (Civil), Signal & Telecom (S&T), and Traction (OHE).
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-xs bg-[#1C3F60]" />
              <span>Civil P-Way</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-xs bg-[#D97706]" />
              <span>Signal & Telecom</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-xs bg-[#16A34A]" />
              <span>Traction OHE</span>
            </span>
            <span className="flex items-center gap-1.5 text-[#8B1E2F]">
              <span className="h-0.5 w-4 border-t-2 border-dashed border-[#8B1E2F]" />
              <span>Ceiling Limit (35h)</span>
            </span>
          </div>
        </div>

        {/* Stacked Chart Canvas */}
        <div className="relative h-80 w-full pt-8 pb-8 px-4 flex flex-col justify-end select-none">
          {/* Safe Capacity Ceiling Line at 35h (approx 70% height) */}
          <div className="absolute top-[30%] left-0 right-0 border-b-2 border-dashed border-[#8B1E2F] z-10 pointer-events-none flex items-center justify-end pr-4">
            <span className="bg-[#FCE8E6] text-[#8B1E2F] text-[10px] font-mono font-bold px-2 py-0.5 rounded shadow-2xs">
              Safe Capacity Ceiling: 35.0 hrs / week
            </span>
          </div>

          {/* Gridlines */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
            <div className="border-b border-[#64748B]" />
            <div className="border-b border-[#64748B]" />
            <div className="border-b border-[#64748B]" />
            <div className="border-b border-[#64748B]" />
          </div>

          {/* 5 Week Columns */}
          <div className="grid grid-cols-5 gap-6 h-full items-end z-20">
            {WEEKLY_FORECASTS.map((fc) => {
              const isSelected = selectedWeek === fc.week;
              // max scale = 50h
              const maxScale = 50;
              const totalPct = (fc.totalHours / maxScale) * 100;
              const civilPct = (fc.civilHours / fc.totalHours) * 100;
              const signalPct = (fc.signalHours / fc.totalHours) * 100;
              const tractionPct = (fc.tractionHours / fc.totalHours) * 100;

              return (
                <div
                  key={fc.week}
                  onClick={() => setSelectedWeek(fc.week)}
                  className="flex flex-col items-center h-full justify-end group cursor-pointer"
                >
                  {/* Top value bubble */}
                  <div className="mb-2 flex flex-col items-center">
                    {fc.isBreach && (
                      <span className="mb-1 bg-[#8B1E2F] text-white text-[9px] font-mono font-bold px-1.5 py-0.5 rounded animate-bounce shadow-xs">
                        +7.0h Over Limit
                      </span>
                    )}
                    <span className={`font-mono text-xs font-bold ${fc.isBreach ? 'text-[#8B1E2F]' : 'text-[#1C3F60]'}`}>
                      {fc.totalHours.toFixed(1)}h
                    </span>
                  </div>

                  {/* The Bar Stack */}
                  <div
                    className={`w-full max-w-[80px] rounded-t-md overflow-hidden flex flex-col-reverse shadow-md transition-all ${
                      fc.isBreach
                        ? 'ring-3 ring-[#8B1E2F] shadow-lg'
                        : isSelected
                        ? 'ring-2 ring-[#1C3F60]'
                        : 'hover:brightness-95'
                    }`}
                    style={{ height: `${totalPct}%` }}
                  >
                    {/* Civil */}
                    <div
                      className="bg-[#1C3F60] w-full transition-all"
                      style={{ height: `${civilPct}%` }}
                      title={`Civil: ${fc.civilHours}h`}
                    />
                    {/* Signal */}
                    <div
                      className="bg-[#D97706] w-full transition-all"
                      style={{ height: `${signalPct}%` }}
                      title={`Signal: ${fc.signalHours}h`}
                    />
                    {/* Traction */}
                    <div
                      className="bg-[#16A34A] w-full transition-all"
                      style={{ height: `${tractionPct}%` }}
                      title={`Traction: ${fc.tractionHours}h`}
                    />
                  </div>

                  {/* Week Label */}
                  <div className="mt-3 text-center">
                    <span className={`font-serif text-xs font-bold block ${isSelected ? 'text-[#1C3F60]' : 'text-[#4B5563]'}`}>
                      {fc.week}
                    </span>
                    <span className="font-mono text-[10px] text-[#6B7280] block">
                      {fc.dateRange}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Breach Alert Ribbon */}
        {activeForecast.isBreach && (
          <div className="p-3.5 bg-[#FDF2F2] border border-[#8B1E2F]/40 rounded-lg flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[20px] text-[#8B1E2F]">emergency_home</span>
              <div>
                <span className="font-serif font-bold text-[#8B1E2F]">
                  Ceiling Breach Detected in {activeForecast.week} ({activeForecast.totalHours} Hours Demanded)
                </span>
                <p className="text-[#4B5563] text-[11px] mt-0.5">
                  Civil P-Way track renewals and S&T maintenance requests exceed corridor safety limits by 7.0 hours. High probability of freight gridlock at Itarsi.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onLoadOptimizer}
              className="px-3 py-1.5 bg-[#8B1E2F] hover:bg-[#731725] text-white rounded font-semibold text-xs transition-colors shadow-2xs cursor-pointer shrink-0"
            >
              Resolve in Optimizer
            </button>
          </div>
        )}
      </div>

      {/* 3 Prescriptive Insight Cards (from Image 5) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Peak Bottleneck */}
        <div className="bg-white rounded-lg border border-[#DCE3EA] shadow-xs p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-[#8B1E2F]">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider">
                Peak Bottleneck
              </span>
              <span className="material-symbols-outlined text-[18px]">trending_up</span>
            </div>
            <h3 className="font-serif font-bold text-sm text-[#1F2937] mt-1.5">
              Week of 22 Sep (Week 39)
            </h3>
            <p className="text-xs text-[#4B5563] mt-2 leading-relaxed">
              42.0 total maintenance hours demanded across the division (120% of safe corridor ceiling). Heavy concentration in Barkhera – Budni ghat section.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-[#E5E7EB] flex items-center justify-between text-xs font-mono">
            <span className="text-[#6B7280]">Excess Over Ceiling:</span>
            <span className="text-[#8B1E2F] font-bold">+7.0 Hours</span>
          </div>
        </div>

        {/* Card 2: Corridor Exposure */}
        <div className="bg-white rounded-lg border border-[#DCE3EA] shadow-xs p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-[#D97706]">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider">
                Corridor Exposure
              </span>
              <span className="material-symbols-outlined text-[18px]">speed</span>
            </div>
            <h3 className="font-serif font-bold text-sm text-[#1F2937] mt-1.5">
              HBJ-MDDP Ghat Section
            </h3>
            <p className="text-xs text-[#4B5563] mt-2 leading-relaxed">
              14.5 hours planned in single-line ghat section with 1:100 steep gradient. High vulnerability to catch-siding overruns during slow-speed machine transit.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-[#E5E7EB] flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[#6B7280]">Risk Index:</span>
              <span className="text-[#D97706] font-bold">82% High Risk</span>
            </div>
            <div className="h-1.5 w-full bg-[#E5E7EB] rounded-full overflow-hidden">
              <div className="h-full bg-[#D97706] w-[82%]" />
            </div>
          </div>
        </div>

        {/* Card 3: AI Prescriptive Recommendation */}
        <div className="bg-white rounded-lg border border-[#DCE3EA] shadow-xs p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-[#137333]">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider">
                AI Prescriptive Action
              </span>
              <span className="material-symbols-outlined text-[18px]">auto_fix_high</span>
            </div>
            <h3 className="font-serif font-bold text-sm text-[#1F2937] mt-1.5">
              Pre-Cluster Mega-Blocks
            </h3>
            <p className="text-xs text-[#4B5563] mt-2 leading-relaxed">
              Pre-clustering Civil track renewals and OHE catenary works into shared weekend blocks can flatten Week 39 peak to 29.5 hours (well below 35h ceiling).
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-[#E5E7EB]">
            <button
              type="button"
              onClick={onLoadOptimizer}
              className="w-full py-1.5 bg-[#1C3F60] hover:bg-[#15314a] text-white rounded text-xs font-semibold shadow-2xs transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Load Cluster Simulation in Optimizer</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
