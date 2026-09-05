import React, { useState } from 'react';
import { BlockItem } from '../types';

interface CalendarScheduleViewProps {
  blocks: BlockItem[];
  onOpenDrawer: (blockId: string) => void;
  onSelectBlock: (blockId: string) => void;
}

export const CalendarScheduleView: React.FC<CalendarScheduleViewProps> = ({
  blocks,
  onOpenDrawer,
  onSelectBlock
}) => {
  const [viewRange, setViewRange] = useState<'7days' | '30days'>('7days');
  const [zoomLevel, setZoomLevel] = useState<'1x' | '2x' | '4x' | 'fit'>('2x');
  const [selectedDeptFilters, setSelectedDeptFilters] = useState({
    civil: true,
    signal: true,
    ohe: true
  });
  const [statusFilter, setStatusFilter] = useState<'All' | 'Proposed' | 'Approved' | 'InProgress'>('All');
  const [pinnedTooltipBlock, setPinnedTooltipBlock] = useState<string | null>('mb-104');

  const days7 = [
    { day: 'Wed', date: '11 Sep' },
    { day: 'Thu', date: '12 Sep' },
    { day: 'Fri', date: '13 Sep' },
    { day: 'Sat', date: '14 Sep' },
    { day: 'Sun', date: '15 Sep' },
    { day: 'Mon', date: '16 Sep' },
    { day: 'Tue', date: '17 Sep' }
  ];

  const sections = [
    { id: 'sec-a', name: 'BPL-ET Sec A (UP Main)', chainage: 'KM 810-825', speed: '130 km/h' },
    { id: 'sec-b', name: 'BPL-ET Sec B (DN Main)', chainage: 'KM 825-840', speed: '130 km/h' },
    { id: 'sec-c', name: 'ITR-BPL Sec C (3rd Line)', chainage: 'KM 840-855', speed: '100 km/h' },
    { id: 'sec-d', name: 'HBJ-MDDP Ghat Section', chainage: 'KM 855-870', speed: '75 km/h' },
    { id: 'sec-e', name: 'BPL-BIN Section 1 (UP)', chainage: 'KM 790-805', speed: '110 km/h' },
    { id: 'sec-f', name: 'BPL-BIN Section 2 (DN)', chainage: 'KM 805-820', speed: '110 km/h' },
    { id: 'sec-g', name: 'ET Yard Interlocking Throat', chainage: 'Pts 12A-18B', speed: '30 km/h' }
  ];

  return (
    <div className="flex flex-col gap-5 pb-12">
      {/* Header bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 bg-white p-4 rounded-lg border border-[#DCE3EA] shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-[11px] text-[#6B7280] font-mono">
            <span>Bhopal Division (WCR)</span>
            <span>&gt;</span>
            <span>Planning & SCADA Possession Matrix</span>
          </div>
          <h1 className="font-serif font-bold text-lg text-[#1C3F60] mt-0.5">
            Multi-Day Track Occupation Calendar
          </h1>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* 7 vs 30 Days Toggle */}
          <div className="flex items-center bg-[#F0F4F8] p-1 rounded border border-[#DCE3EA]">
            <button
              onClick={() => setViewRange('7days')}
              type="button"
              className={`px-3 py-1 rounded text-xs font-semibold cursor-pointer transition-all ${
                viewRange === '7days' ? 'bg-[#1C3F60] text-white shadow-2xs' : 'text-[#4B5563] hover:text-[#1F2937]'
              }`}
            >
              7 Days Horizon
            </button>
            <button
              onClick={() => setViewRange('30days')}
              type="button"
              className={`px-3 py-1 rounded text-xs font-semibold cursor-pointer transition-all ${
                viewRange === '30days' ? 'bg-[#1C3F60] text-white shadow-2xs' : 'text-[#4B5563] hover:text-[#1F2937]'
              }`}
            >
              30 Days Rolling
            </button>
          </div>

          {/* Zoom Steppers */}
          <div className="flex items-center bg-[#F0F4F8] p-1 rounded border border-[#DCE3EA] text-[11px] font-mono">
            {(['1x', '2x', '4x', 'fit'] as const).map((z) => (
              <button
                key={z}
                onClick={() => setZoomLevel(z)}
                type="button"
                className={`px-2 py-0.5 rounded cursor-pointer transition-all ${
                  zoomLevel === z ? 'bg-white text-[#1C3F60] font-bold shadow-2xs' : 'text-[#6B7280]'
                }`}
              >
                {z}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F7F9FB] border border-[#DCE3EA] rounded text-xs font-mono text-[#1F2937]">
            <span className="material-symbols-outlined text-[15px] text-[#1C3F60]">date_range</span>
            <span>11 Sep – 17 Sep 2024</span>
          </div>
        </div>
      </div>

      {/* Main Container: Matrix + Side Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left 8 Cols: The Multi-day Schedule Matrix Table */}
        <div className="lg:col-span-8 flex flex-col gap-3">
          <div className="bg-white rounded-lg border border-[#DCE3EA] shadow-xs overflow-hidden flex flex-col">
            <div className="p-3 bg-[#F7F9FB] border-b border-[#DCE3EA] flex items-center justify-between text-xs">
              <span className="font-serif font-bold text-[#1C3F60] uppercase tracking-wider">
                Corridor Track Possession Grid
              </span>
              <div className="flex items-center gap-4 text-[11px] font-mono text-[#6B7280]">
                <span className="flex items-center gap-1">
                  <span className="h-2.5 w-2.5 rounded-xs bg-[#1C3F60]" />
                  <span>Mega-Block (Combined)</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-2.5 w-2.5 rounded-xs bg-[#0284C7]" />
                  <span>Civil (P-Way)</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-2.5 w-2.5 rounded-xs bg-[#D97706]" />
                  <span>S&T Relay</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-2.5 w-2.5 rounded-xs bg-[#16A34A]" />
                  <span>OHE Traction</span>
                </span>
              </div>
            </div>

            {/* Matrix Table */}
            <div className="relative overflow-x-auto select-none min-w-[750px]">
              {/* Table Column Headers (Days) */}
              <div className="grid grid-cols-8 border-b border-[#DCE3EA] bg-[#F8FAFC] text-center font-mono text-xs text-[#1F2937] py-2.5">
                <div className="text-left pl-4 font-bold text-[#6B7280]">Section / Line</div>
                {days7.map((d, i) => (
                  <div key={d.day} className={`font-semibold ${i === 1 ? 'text-[#1C3F60] bg-[#E0F2FE]/40 py-0.5 rounded' : ''}`}>
                    <div>{d.day}</div>
                    <div className="text-[10px] text-[#6B7280]">{d.date}</div>
                  </div>
                ))}
              </div>

              {/* Rows */}
              <div className="divide-y divide-[#E5E7EB] text-xs">
                {sections.map((sec, rowIdx) => (
                  <div key={sec.id} className="grid grid-cols-8 h-20 items-center relative hover:bg-[#F9FAFB] transition-colors">
                    {/* Section Label */}
                    <div className="pl-3 pr-2 flex flex-col justify-center border-r border-[#E5E7EB] h-full bg-[#FAFCFE]">
                      <span className="font-semibold text-[#1C3F60] text-[11px] leading-tight truncate">
                        {sec.name}
                      </span>
                      <span className="text-[10px] font-mono text-[#6B7280]">{sec.chainage}</span>
                      <span className="text-[9px] font-mono text-[#9CA3AF]">{sec.speed}</span>
                    </div>

                    {/* 7 Day slots background */}
                    {days7.map((d, colIdx) => (
                      <div
                        key={d.day}
                        className={`h-full border-r border-[#E5E7EB] relative ${colIdx === 1 ? 'bg-[#F0F9FF]/20' : ''}`}
                      />
                    ))}

                    {/* Render specific blocks positioned across cells */}
                    {rowIdx === 0 && (
                      /* Mega Block MB-104 on Day 2 (Thu 12 Sep) */
                      <div
                        onClick={() => {
                          setPinnedTooltipBlock('mb-104');
                          onSelectBlock('mb-104');
                        }}
                        className="absolute left-[26%] w-[11.5%] h-14 top-3 rounded bg-[#1C3F60] text-white p-1.5 shadow-md flex flex-col justify-between cursor-pointer border border-[#002948] hover:bg-[#15314a] transition-all z-10"
                        title="Click to inspect MB-104"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[9px] font-bold">MB-104</span>
                          <span className="text-[8px] bg-white/20 px-1 rounded">Tri-Dept</span>
                        </div>
                        <span className="text-[9px] leading-tight font-sans text-slate-200 truncate">
                          14:00 – 16:30 (2.5h)
                        </span>
                      </div>
                    )}

                    {rowIdx === 0 && (
                      /* BL-4091 on Day 4 (Sat 14 Sep) */
                      <div
                        onClick={() => {
                          onSelectBlock('bl-4091');
                          onOpenDrawer('bl-4091');
                        }}
                        className="absolute left-[51%] w-[11%] h-12 top-4 rounded bg-[#E0F2FE] border border-[#0284C7] text-[#0369A1] p-1.5 shadow-xs flex flex-col justify-between cursor-pointer hover:brightness-95 transition-all z-10"
                      >
                        <span className="font-mono text-[9px] font-bold">BL-4091 Civil</span>
                        <span className="text-[8px] font-mono">08:30 – 11:30 (3h)</span>
                      </div>
                    )}

                    {rowIdx === 1 && (
                      /* BL-4122 on Day 1 (Wed 11 Sep) */
                      <div
                        onClick={() => {
                          onSelectBlock('bl-4122');
                          onOpenDrawer('bl-4122');
                        }}
                        className="absolute left-[13.5%] w-[11%] h-12 top-4 rounded bg-[#E0F2FE] border border-[#0284C7] text-[#0369A1] p-1.5 shadow-xs flex flex-col justify-between cursor-pointer hover:brightness-95 transition-all z-10"
                      >
                        <span className="font-mono text-[9px] font-bold">BL-4122 Tamping</span>
                        <span className="text-[8px] font-mono">11:00 – 15:00 (4h)</span>
                      </div>
                    )}

                    {rowIdx === 2 && (
                      /* BL-4130 on Day 3 (Fri 13 Sep) */
                      <div
                        onClick={() => {
                          onSelectBlock('bl-4130');
                          onOpenDrawer('bl-4130');
                        }}
                        className="absolute left-[38.5%] w-[11%] h-12 top-4 rounded bg-[#FEF3C7] border border-[#D97706] text-[#B45309] p-1.5 shadow-xs flex flex-col justify-between cursor-pointer hover:brightness-95 transition-all z-10"
                      >
                        <span className="font-mono text-[9px] font-bold">BL-4130 S&T</span>
                        <span className="text-[8px] font-mono">06:00 – 10:00 (4h)</span>
                      </div>
                    )}

                    {rowIdx === 3 && (
                      /* Ghat Section OHE block on Day 5 */
                      <div
                        onClick={() => {
                          onSelectBlock('bl-4115');
                          onOpenDrawer('bl-4115');
                        }}
                        className="absolute left-[63.5%] w-[11%] h-12 top-4 rounded bg-[#F0FDF4] border border-[#16A34A] text-[#15803D] p-1.5 shadow-xs flex flex-col justify-between cursor-pointer hover:brightness-95 transition-all z-10"
                      >
                        <span className="font-mono text-[9px] font-bold">BL-4115 OHE</span>
                        <span className="text-[8px] font-mono">01:00 – 04:30 (3.5h)</span>
                      </div>
                    )}

                    {rowIdx === 6 && (
                      /* ET Yard Throat Switch Point overhaul */
                      <div
                        onClick={() => {
                          onSelectBlock('bl-4180');
                          onOpenDrawer('bl-4180');
                        }}
                        className="absolute left-[76%] w-[11%] h-12 top-4 rounded bg-[#FCE8E6] border border-[#8B1E2F] text-[#8B1E2F] p-1.5 shadow-xs flex flex-col justify-between cursor-pointer hover:brightness-95 transition-all z-10"
                      >
                        <span className="font-mono text-[9px] font-bold">BL-4180 Pt 14B</span>
                        <span className="text-[8px] font-mono">01:00 – 04:00 (3h)</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Pinned Interactive Tooltip Card for MB-104 (from Image 2) */}
            {pinnedTooltipBlock === 'mb-104' && (
              <div className="p-4 bg-[#F0F4F8] border-t border-[#DCE3EA] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-[#1C3F60] text-white font-mono text-[10px] font-bold">
                      MB-104-BPL
                    </span>
                    <span className="font-serif font-bold text-xs text-[#1C3F60]">
                      Integrated 3-in-1 Mega-Block (Civil + S&T + OHE)
                    </span>
                    <span className="text-[10px] font-mono text-[#137333] font-semibold bg-[#E6F4EA] px-1.5 py-0.5 rounded">
                      SCADA Handshake Validated ✓
                    </span>
                  </div>
                  <div className="text-xs text-[#4B5563] flex items-center gap-3 font-mono">
                    <span>14:00 – 16:30 (2.5 hrs)</span>
                    <span>•</span>
                    <span>KM 810 – 825 UP Main</span>
                    <span>•</span>
                    <span className="text-[#1C3F60] font-semibold">3 Merged Requests</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setPinnedTooltipBlock(null)}
                    className="px-2.5 py-1 text-xs text-[#6B7280] hover:text-[#1F2937]"
                  >
                    Dismiss
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenDrawer('mb-104')}
                    className="px-3.5 py-1.5 bg-[#1C3F60] hover:bg-[#15314a] text-white text-xs font-semibold rounded shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[15px]">open_in_new</span>
                    <span>Review Full Dossier & Approvals</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Time Scrubber Minimap (from Image 3) */}
          <div className="bg-white p-3 rounded-lg border border-[#DCE3EA] shadow-xs flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-[11px] font-mono text-[#6B7280]">
              <span>Horizon Scrubber (30-Day Context)</span>
              <span>Viewport: Days 11 – 17 (Week 38)</span>
            </div>
            <div className="relative h-6 bg-[#F0F4F8] border border-[#DCE3EA] rounded overflow-hidden">
              <div className="absolute inset-0 grid grid-cols-30 divide-x divide-[#E2E8F0] opacity-40 pointer-events-none" />
              {/* Visualized active block indicators along the 30-day timeline */}
              <div className="absolute top-1 bottom-1 left-[10%] w-[3%] bg-[#1C3F60] rounded-xs" />
              <div className="absolute top-1 bottom-1 left-[25%] w-[4%] bg-[#0284C7] rounded-xs" />
              <div className="absolute top-1 bottom-1 left-[40%] w-[5%] bg-[#8B1E2F] rounded-xs" />
              <div className="absolute top-1 bottom-1 left-[60%] w-[3%] bg-[#D97706] rounded-xs" />
              <div className="absolute top-1 bottom-1 left-[75%] w-[4%] bg-[#16A34A] rounded-xs" />

              {/* Draggable Viewport highlight */}
              <div className="absolute top-0 bottom-0 left-[20%] w-[25%] border-2 border-[#1C3F60] bg-[#1C3F60]/10 rounded cursor-grab flex items-center justify-between px-1">
                <span className="h-3 w-1 bg-[#1C3F60] rounded-full" />
                <span className="h-3 w-1 bg-[#1C3F60] rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Right 4 Cols: Filters & Controls + Pending Approvals */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {/* Filter Card */}
          <div className="bg-white rounded-lg border border-[#DCE3EA] shadow-xs p-4 flex flex-col gap-3">
            <h2 className="font-serif font-bold text-xs text-[#1C3F60] uppercase tracking-wider border-b border-[#DCE3EA] pb-2">
              Filters & Disciplines
            </h2>

            <div className="flex flex-col gap-2 text-xs">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedDeptFilters.civil}
                  onChange={(e) => setSelectedDeptFilters({ ...selectedDeptFilters, civil: e.target.checked })}
                  className="rounded text-[#1C3F60] focus:ring-0"
                />
                <span className="font-medium text-[#1F2937]">Civil / Track Renewal (P-Way)</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedDeptFilters.signal}
                  onChange={(e) => setSelectedDeptFilters({ ...selectedDeptFilters, signal: e.target.checked })}
                  className="rounded text-[#1C3F60] focus:ring-0"
                />
                <span className="font-medium text-[#1F2937]">Signal & Telecom (S&T)</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedDeptFilters.ohe}
                  onChange={(e) => setSelectedDeptFilters({ ...selectedDeptFilters, ohe: e.target.checked })}
                  className="rounded text-[#1C3F60] focus:ring-0"
                />
                <span className="font-medium text-[#1F2937]">Overhead Electrification (TRD)</span>
              </label>
            </div>

            <div className="pt-2 border-t border-[#DCE3EA] flex items-center gap-1.5 flex-wrap">
              {(['All', 'Proposed', 'Approved', 'InProgress'] as const).map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setStatusFilter(st)}
                  className={`px-2.5 py-1 rounded text-[11px] font-mono cursor-pointer transition-all ${
                    statusFilter === st
                      ? 'bg-[#1C3F60] text-white font-bold shadow-2xs'
                      : 'bg-[#F0F4F8] text-[#6B7280] hover:text-[#1F2937]'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Pending Approvals (3 Action Needed items from Image 3) */}
          <div className="bg-white rounded-lg border border-[#DCE3EA] shadow-xs p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between border-b border-[#DCE3EA] pb-2">
              <span className="font-serif font-bold text-xs text-[#1C3F60] uppercase tracking-wider">
                Pending Approvals (3)
              </span>
              <span className="text-[10px] font-mono text-[#8B1E2F] font-bold bg-[#FCE8E6] px-2 py-0.5 rounded-full border border-[#8B1E2F]/20">
                Action Needed
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {/* Item 1 */}
              <div className="p-3 bg-[#F8FAFC] border border-[#DCE3EA] rounded-md text-xs flex flex-col gap-2 hover:border-[#1C3F60]/40 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="font-bold font-serif text-[#1C3F60]">Civil TR · Deep Screening</span>
                  <span className="text-[10px] font-mono bg-[#E0F2FE] text-[#0369A1] font-bold px-1.5 py-0.5 rounded">
                    2.5 hrs
                  </span>
                </div>
                <div className="text-[#4B5563] text-[11px]">
                  BCM-02 machine deployment at MDDP-HBJ section. Proposed window: 08:30 – 11:00 IST.
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] font-mono text-[#6B7280]">Risk: 78% (High)</span>
                  <button
                    type="button"
                    onClick={() => onOpenDrawer('bl-4091')}
                    className="px-2.5 py-1 bg-[#1C3F60] hover:bg-[#15314a] text-white rounded text-[11px] font-semibold transition-colors cursor-pointer"
                  >
                    Review Request
                  </button>
                </div>
              </div>

              {/* Item 2 */}
              <div className="p-3 bg-[#F8FAFC] border border-[#DCE3EA] rounded-md text-xs flex flex-col gap-2 hover:border-[#1C3F60]/40 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="font-bold font-serif text-[#1C3F60]">OHE Traction · Cantilever Insulator</span>
                  <span className="text-[10px] font-mono bg-[#E6F4EA] text-[#137333] font-bold px-1.5 py-0.5 rounded">
                    3.5 hrs
                  </span>
                </div>
                <div className="text-[#4B5563] text-[11px]">
                  25kV catenary bracket replacement at Barkhera Ghat (Mast 844/2-10). Night corridor.
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] font-mono text-[#6B7280]">Risk: 31% (Controlled)</span>
                  <button
                    type="button"
                    onClick={() => onOpenDrawer('bl-4115')}
                    className="px-2.5 py-1 bg-[#1C3F60] hover:bg-[#15314a] text-white rounded text-[11px] font-semibold transition-colors cursor-pointer"
                  >
                    Review Request
                  </button>
                </div>
              </div>

              {/* Item 3 */}
              <div className="p-3 bg-[#F8FAFC] border border-[#DCE3EA] rounded-md text-xs flex flex-col gap-2 hover:border-[#1C3F60]/40 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="font-bold font-serif text-[#1C3F60]">S&T Relay · Point #14B Overhaul</span>
                  <span className="text-[10px] font-mono bg-[#FEF3C7] text-[#B45309] font-bold px-1.5 py-0.5 rounded">
                    3.0 hrs
                  </span>
                </div>
                <div className="text-[#4B5563] text-[11px]">
                  Switch machine bearing inspection at Itarsi Junction throat points 12A-18B.
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] font-mono text-[#6B7280]">Risk: 68% (High)</span>
                  <button
                    type="button"
                    onClick={() => onOpenDrawer('bl-4180')}
                    className="px-2.5 py-1 bg-[#1C3F60] hover:bg-[#15314a] text-white rounded text-[11px] font-semibold transition-colors cursor-pointer"
                  >
                    Review Request
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
