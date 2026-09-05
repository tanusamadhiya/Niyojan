import React from 'react';
import { BlockItem } from '../types';

interface CommandCentreViewProps {
  blocks: BlockItem[];
  onNavigateToSimulator: () => void;
  onNavigateToPlanning: (dept?: string) => void;
  onOpenDrawer: (blockId: string) => void;
  onApproveMegaBlock: () => void;
  megaBlockApproved: boolean;
}

export const CommandCentreView: React.FC<CommandCentreViewProps> = ({
  blocks,
  onNavigateToSimulator,
  onNavigateToPlanning,
  onOpenDrawer,
  onApproveMegaBlock,
  megaBlockApproved
}) => {
  const activeBlocksCount = blocks.filter((b) => b.status === 'InProgress' || b.status === 'Approved').length || 12;
  const pendingBlocksCount = blocks.filter((b) => b.status === 'Proposed').length;
  const megaBlocksCount = blocks.filter((b) => b.department === 'MegaBlock' || b.id.startsWith('mb')).length || 3;

  return (
    <div className="flex flex-col gap-5 max-w-[1240px] mx-auto w-full">
      {/* Problem Strip */}
      <div className="flex items-center gap-3.5 bg-[#0A1220] rounded-xl p-3.5 px-4.5 text-white">
        <div className="w-[34px] h-[34px] rounded-lg bg-[#7C2D2D]/30 border border-[#B91C1C]/40 flex items-center justify-center shrink-0">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#F87171" strokeWidth="2">
            <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <path d="M12 9v4M12 17h.01" />
          </svg>
        </div>
        <p className="text-[13px] text-[#CBD5E8] leading-relaxed flex-1">
          <strong className="text-white font-bold">The problem:</strong> Engineering, Signal &amp; Traction teams request track possessions independently — fragmenting a <strong className="text-white font-bold">4.5-hour</strong> corridor closure that could safely run in <strong className="text-white font-bold">2 hours</strong>, with real risk of clashing with live trains.
        </p>
        <button
          type="button"
          onClick={onNavigateToSimulator}
          className="text-[#8FB4FF] hover:text-white font-bold text-[12.5px] whitespace-nowrap transition-colors cursor-pointer shrink-0"
        >
          See how AI fixes this &rarr;
        </button>
      </div>

      {/* KPI Row (5 columns) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Active Blocks */}
        <div className="bg-white border border-[#E4E8F0] rounded-xl p-4 px-4.5 shadow-2xs hover:border-[#CBD5E1] transition-all">
          <div className="text-[11.5px] text-[#8A94A6] font-semibold">Active Blocks</div>
          <div className="text-[26px] font-extrabold font-mono mt-1.5 tracking-tight text-[#0F172A]">
            {activeBlocksCount < 10 ? `0${activeBlocksCount}` : activeBlocksCount}
          </div>
          <div className="text-[11px] text-[#B7BFCB] mt-0.5">Simulated · corridor-wide today</div>
        </div>

        {/* Track Availability */}
        <div className="bg-white border border-[#E4E8F0] rounded-xl p-4 px-4.5 shadow-2xs hover:border-[#CBD5E1] transition-all">
          <div className="text-[11.5px] text-[#8A94A6] font-semibold">Track Availability</div>
          <div className="text-[26px] font-extrabold font-mono mt-1.5 tracking-tight text-[#0F172A]">
            94.2%
          </div>
          <div className="text-[11px] text-[#B7BFCB] mt-0.5">GWL Main Line throughput</div>
        </div>

        {/* Mega-Blocks Formed */}
        <div className="bg-white border border-[#E4E8F0] rounded-xl p-4 px-4.5 shadow-2xs hover:border-[#CBD5E1] transition-all">
          <div className="text-[11.5px] text-[#8A94A6] font-semibold">Mega-Blocks Formed</div>
          <div className="text-[26px] font-extrabold font-mono mt-1.5 tracking-tight text-[#047857]">
            {megaBlocksCount < 10 ? `0${megaBlocksCount}` : megaBlocksCount}
          </div>
          <div className="text-[11px] text-[#B7BFCB] mt-0.5">This week · tri-dept windows</div>
        </div>

        {/* Closure Hours Saved */}
        <div className="bg-white border border-[#E4E8F0] rounded-xl p-4 px-4.5 shadow-2xs hover:border-[#CBD5E1] transition-all">
          <div className="text-[11.5px] text-[#8A94A6] font-semibold">Closure Hours Saved</div>
          <div className="text-[26px] font-extrabold font-mono mt-1.5 tracking-tight text-[#047857]">
            {megaBlockApproved ? '21.0h' : '18.5h'}
          </div>
          <div className="text-[11px] text-[#B7BFCB] mt-0.5">vs. fragmented planning</div>
        </div>

        {/* Pending Requests */}
        <div className="bg-white border border-[#E4E8F0] rounded-xl p-4 px-4.5 shadow-2xs hover:border-[#CBD5E1] transition-all col-span-2 sm:col-span-1">
          <div className="text-[11.5px] text-[#8A94A6] font-semibold">Pending Requests</div>
          <div className="text-[26px] font-extrabold font-mono mt-1.5 tracking-tight text-[#0F172A]">
            {pendingBlocksCount < 10 ? `0${pendingBlocksCount}` : pendingBlocksCount}
          </div>
          <div className="text-[11px] text-[#B7BFCB] mt-0.5">Awaiting AI coordination</div>
        </div>
      </div>

      {/* Core Concept — Multi-Department Mega-Block Coordination Header */}
      <div>
        <div className="text-[13px] font-extrabold text-[#0F172A] flex items-center gap-2">
          Core Concept — Multi-Department Mega-Block Coordination
        </div>
      </div>

      {/* Before / After Hero Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] items-stretch gap-4">
        {/* Left: Before (Manual Planning) */}
        <div className="bg-gradient-to-b from-[#FEF7F7] to-white border border-[#F4C6C6] rounded-xl p-5 flex flex-col gap-3 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="badge b-red">3 SEPARATE BLOCKS</span>
            <span className="text-[11px] text-[#8A94A6] font-semibold">Manual planning</span>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="w-24 shrink-0 text-[12px] font-semibold text-[#4B5768]">Engineering</span>
            <div className="flex-1 h-[22px] bg-[#F1F3F7] rounded overflow-hidden">
              <div className="h-full rounded bg-[#1D4ED8] flex items-center justify-end pr-2 text-[10px] text-white font-mono font-bold" style={{ width: '80%' }}>
                2.0h
              </div>
            </div>
            <span className="w-9 shrink-0 text-right text-[11.5px] font-bold font-mono text-[#4B5768]">2.0h</span>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="w-24 shrink-0 text-[12px] font-semibold text-[#4B5768]">Signal</span>
            <div className="flex-1 h-[22px] bg-[#F1F3F7] rounded overflow-hidden">
              <div className="h-full rounded bg-[#B45309] flex items-center justify-end pr-2 text-[10px] text-white font-mono font-bold" style={{ width: '40%' }}>
                1.0h
              </div>
            </div>
            <span className="w-9 shrink-0 text-right text-[11.5px] font-bold font-mono text-[#4B5768]">1.0h</span>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="w-24 shrink-0 text-[12px] font-semibold text-[#4B5768]">Traction</span>
            <div className="flex-1 h-[22px] bg-[#F1F3F7] rounded overflow-hidden">
              <div className="h-full rounded bg-[#047857] flex items-center justify-end pr-2 text-[10px] text-white font-mono font-bold" style={{ width: '60%' }}>
                1.5h
              </div>
            </div>
            <span className="w-9 shrink-0 text-right text-[11.5px] font-bold font-mono text-[#4B5768]">1.5h</span>
          </div>

          <div className="flex items-center gap-2 text-[12px] font-semibold p-2 px-2.5 rounded-lg bg-[#FCECEC] text-[#B91C1C] mt-1">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="shrink-0">
              <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <path d="M12 9v4M12 17h.01" />
            </svg>
            <span>4.5h total closure · clashes with Shatabdi #12002</span>
          </div>
        </div>

        {/* Center: AI Match Engine */}
        <div className="flex flex-col items-center justify-center gap-2 px-4 py-2 lg:py-0">
          <div className="w-[52px] h-[52px] rounded-full bg-[#4338CA] flex items-center justify-center shadow-lg shadow-[#4338CA]/30">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
              <path d="M13 2 4 14h6l-1 8 9-12h-6z" />
            </svg>
          </div>
          <div className="text-[10.5px] text-[#8A94A6] font-bold text-center w-[90px] leading-tight">
            AI Match Engine merges &amp; optimizes
          </div>
        </div>

        {/* Right: After (Rail Niyojan-AI) */}
        <div className="bg-gradient-to-b from-[#F3FBF7] to-white border border-[#BCE4D2] rounded-xl p-5 flex flex-col gap-3 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="badge b-green">1 MEGA-BLOCK</span>
            <span className="text-[11px] text-[#8A94A6] font-semibold">Rail Niyojan-AI</span>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="w-24 shrink-0 text-[12px] font-semibold text-[#4B5768]">Eng + Sig + Trac</span>
            <div className="flex-1 h-[22px] bg-[#F1F3F7] rounded overflow-hidden">
              <div
                className="h-full rounded flex items-center justify-end pr-2 text-[10px] text-white font-mono font-bold"
                style={{
                  width: '100%',
                  background: 'linear-gradient(90deg, #1D4ED8 0%, #B45309 50%, #047857 100%)'
                }}
              >
                Synchronized 2.0h
              </div>
            </div>
            <span className="w-9 shrink-0 text-right text-[11.5px] font-bold font-mono text-[#047857]">2.0h</span>
          </div>

          <div className="flex-1 min-h-[36px]" />

          <div className="flex items-center gap-2 text-[12px] font-semibold p-2 px-2.5 rounded-lg bg-[#E6F5EE] text-[#047857] mt-1">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="shrink-0">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <path d="m22 4-10 10-3-3" />
            </svg>
            <span>Zero train conflicts · fits the 14:00–16:00 traffic gap</span>
          </div>
        </div>
      </div>

      {/* Impact Strip */}
      <div className="bg-[#4338CA] text-white rounded-[10px] p-3 px-4 flex items-center gap-2.5 text-[13px] font-semibold shadow-xs">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" className="shrink-0">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
        <span>
          Saves <strong className="font-extrabold text-white">2.5 hours</strong> of track closure and frees the corridor for <strong className="font-extrabold text-white">1 additional freight path</strong> today.
        </span>
      </div>

      {/* Two Column Split: Timeline + Recommendation */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] items-start gap-4">
        {/* Left: Today's Block Plan — Gwalior Section */}
        <div className="bg-white border border-[#E4E8F0] rounded-xl p-4.5 shadow-2xs">
          <div className="text-[13px] font-extrabold text-[#0F172A]">
            Today's Block Plan — Gwalior Section
          </div>
          <div className="text-[12px] text-[#8A94A6] mt-0.5 mb-3">
            Click any block bar to inspect possession schedule
          </div>

          {/* Row 1: Engineering */}
          <div className="grid grid-cols-[96px_1fr] items-center gap-2.5 py-2.5 border-b border-[#EDF0F5]">
            <span className="text-[12px] font-bold text-[#4B5768]">Engineering</span>
            <div className="relative h-[26px] bg-[#F7F8FB] rounded-md overflow-hidden">
              <button
                type="button"
                onClick={() => onOpenDrawer('bl-4091')}
                title="Tamping (BLK-001) 2.5h - Click to view"
                className="absolute top-[3px] bottom-[3px] rounded bg-[#1D4ED8] hover:brightness-110 transition-all flex items-center px-2 text-[10.5px] font-bold text-white whitespace-nowrap cursor-pointer"
                style={{ left: '2%', width: '22%' }}
              >
                Tamping (BLK-001) 2.5h
              </button>
            </div>
          </div>

          {/* Row 2: Signal */}
          <div className="grid grid-cols-[96px_1fr] items-center gap-2.5 py-2.5 border-b border-[#EDF0F5]">
            <span className="text-[12px] font-bold text-[#4B5768]">Signal</span>
            <div className="relative h-[26px] bg-[#F7F8FB] rounded-md overflow-hidden">
              <button
                type="button"
                onClick={() => onOpenDrawer('bl-4102')}
                title="Point OH 1.5h - Click to view"
                className="absolute top-[3px] bottom-[3px] rounded bg-[#B45309] hover:brightness-110 transition-all flex items-center px-2 text-[10.5px] font-bold text-white whitespace-nowrap cursor-pointer"
                style={{ left: '55%', width: '13%' }}
              >
                Point OH 1.5h
              </button>
            </div>
          </div>

          {/* Row 3: Traction */}
          <div className="grid grid-cols-[96px_1fr] items-center gap-2.5 py-2.5 border-b border-[#EDF0F5]">
            <span className="text-[12px] font-bold text-[#4B5768]">Traction</span>
            <div className="relative h-[26px] bg-[#F7F8FB] rounded-md overflow-hidden">
              <button
                type="button"
                onClick={() => onOpenDrawer('bl-4115')}
                title="OHE Check 2.0h - Click to view"
                className="absolute top-[3px] bottom-[3px] rounded bg-[#047857] hover:brightness-110 transition-all flex items-center px-2 text-[10.5px] font-bold text-white whitespace-nowrap cursor-pointer"
                style={{ left: '8%', width: '16%' }}
              >
                OHE Check 2.0h
              </button>
            </div>
          </div>

          {/* Row 4: Mega-Block */}
          <div className="grid grid-cols-[96px_1fr] items-center gap-2.5 py-2.5">
            <span className="text-[12px] font-bold text-[#4338CA]">Mega-Block</span>
            <div className="relative h-[26px] bg-[#EFEFFD] rounded-md overflow-hidden">
              <button
                type="button"
                onClick={() => onOpenDrawer('mb-104')}
                title="MB-104 Synchronized Mega-Block 2.0h - Click to view"
                className="absolute top-[3px] bottom-[3px] rounded bg-[#4338CA] hover:brightness-110 transition-all flex items-center px-2 text-[10.5px] font-bold text-white whitespace-nowrap cursor-pointer shadow-xs"
                style={{ left: '55%', width: '17%' }}
              >
                MB-104 2.0h
              </button>
            </div>
          </div>

          {/* Axis */}
          <div className="grid grid-cols-[96px_1fr] text-[10px] text-[#B7BFCB] font-mono mt-1 pt-1 border-t border-[#EDF0F5]">
            <span />
            <div className="flex justify-between px-1">
              <span>08:00</span>
              <span>12:00</span>
              <span>16:00</span>
              <span>20:00</span>
            </div>
          </div>
        </div>

        {/* Right: AI Recommendation */}
        <div className="bg-white border border-[#E4E8F0] rounded-xl p-4.5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[13px] font-extrabold text-[#0F172A]">AI Recommendation</span>
              <span className="badge b-amber">Overlap Detected</span>
            </div>

            <p className="text-[12.5px] text-[#4B5768] leading-relaxed">
              3 maintenance requests overlap in the same section between Gwalior and Dabra, on the same day.
            </p>

            <div className="flex gap-1.5 flex-wrap my-3">
              <button
                type="button"
                onClick={() => onNavigateToPlanning('Civil')}
                className="badge b-blue hover:opacity-85 cursor-pointer"
              >
                Engineering
              </button>
              <button
                type="button"
                onClick={() => onNavigateToPlanning('Signal')}
                className="badge b-amber hover:opacity-85 cursor-pointer"
              >
                Signal
              </button>
              <button
                type="button"
                onClick={() => onNavigateToPlanning('Traction')}
                className="badge b-green hover:opacity-85 cursor-pointer"
              >
                Traction
              </button>
            </div>

            <p className="text-[12.5px] text-[#4B5768] leading-relaxed">
              Merging into a single synchronized possession removes 2 redundant closures and cuts total downtime by 56%.
            </p>
          </div>

          <div className="flex items-center justify-between mt-3.5 pt-3.5 border-t border-[#EDF0F5]">
            <div>
              <div className="text-[11px] text-[#8A94A6] font-semibold">Recommended</div>
              <div className="text-[20px] font-extrabold text-[#0F172A]">1 Mega-Block</div>
            </div>

            <button
              type="button"
              id="btn-approve-mega"
              onClick={onApproveMegaBlock}
              className="bg-[#1D4ED8] hover:bg-[#1743B0] text-white text-[13px] font-bold px-4 py-2 rounded-lg transition-colors cursor-pointer shadow-xs"
            >
              {megaBlockApproved ? '✓ Mega-Block Active' : 'Review & Approve \u2192'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
