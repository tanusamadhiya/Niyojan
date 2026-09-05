import React from 'react';
import { BlockItem } from '../types';

interface BlockDetailDrawerProps {
  block: BlockItem;
  isOpen: boolean;
  onClose: () => void;
  onApprove: (blockId: string) => void;
  onOptimize: (blockId: string) => void;
  onReject: (blockId: string) => void;
}

export const BlockDetailDrawer: React.FC<BlockDetailDrawerProps> = ({
  block,
  isOpen,
  onClose,
  onApprove,
  onOptimize,
  onReject
}) => {
  if (!isOpen) return null;

  const getDeptBadge = (dept: string) => {
    switch (dept) {
      case 'Civil':
      case 'Engineering':
        return <span className="badge b-blue">Engineering</span>;
      case 'Signal':
        return <span className="badge b-amber">Signal</span>;
      case 'Traction':
        return <span className="badge b-green">Traction</span>;
      case 'MegaBlock':
        return <span className="badge b-indigo">Mega-Block</span>;
      default:
        return <span className="badge b-slate">{dept}</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end select-none">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0A1220]/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Container */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl z-10 flex flex-col justify-between border-l border-[#E4E8F0] overflow-y-auto animate-slide-left">
        <div>
          {/* Header */}
          <div className="p-4 px-5 border-b border-[#E4E8F0] bg-[#FAFBFD] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-mono font-extrabold text-[13px] text-[#0F172A] bg-white border border-[#E4E8F0] px-2 py-0.5 rounded-md">
                {block.code}
              </span>
              <span className="font-extrabold text-[15px] text-[#0F172A]">
                Block Details
              </span>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded text-[#8A94A6] hover:text-[#0F172A] text-[18px] leading-none transition-colors cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* Details Body */}
          <div className="p-5 flex flex-col gap-4 text-xs">
            {/* Section & Department */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-[#FAFBFD] rounded-xl border border-[#E4E8F0]">
                <span className="text-[10.5px] font-mono text-[#8A94A6] uppercase font-bold">
                  Section
                </span>
                <div className="font-bold text-[#0F172A] text-[13px] mt-0.5 font-mono">
                  {block.section}
                </div>
              </div>

              <div className="p-3 bg-[#FAFBFD] rounded-xl border border-[#E4E8F0]">
                <span className="text-[10.5px] font-mono text-[#8A94A6] uppercase font-bold">
                  Department
                </span>
                <div className="mt-1">
                  {getDeptBadge(block.department)}
                </div>
              </div>
            </div>

            {/* Maintenance Task */}
            <div className="p-3.5 bg-[#FAFBFD] rounded-xl border border-[#E4E8F0] flex flex-col gap-1">
              <span className="text-[10.5px] font-mono text-[#8A94A6] uppercase font-bold">
                Maintenance Task
              </span>
              <div className="font-extrabold text-[#0F172A] text-[14px]">
                {block.title}
              </div>
              <p className="text-[#4B5768] text-[12.5px] mt-1 leading-relaxed">
                {block.description || 'Routine scheduled track infrastructure maintenance and safety regulation.'}
              </p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-3 gap-2.5 text-center">
              <div className="p-2.5 bg-[#FAFBFD] rounded-xl border border-[#E4E8F0]">
                <span className="text-[10.5px] font-mono text-[#8A94A6] uppercase font-bold">
                  Duration
                </span>
                <div className="font-mono font-extrabold text-[#0F172A] text-[15px] mt-0.5">
                  {block.durationHours.toFixed(1)}h
                </div>
              </div>

              <div className="p-2.5 bg-[#FAFBFD] rounded-xl border border-[#E4E8F0]">
                <span className="text-[10.5px] font-mono text-[#8A94A6] uppercase font-bold">
                  Priority
                </span>
                <div className="mt-1">
                  <span
                    className={`badge ${
                      block.riskLevel === 'High'
                        ? 'b-red'
                        : block.riskLevel === 'Medium'
                        ? 'b-amber'
                        : 'b-slate'
                    }`}
                  >
                    {block.riskLevel}
                  </span>
                </div>
              </div>

              <div className="p-2.5 bg-[#FAFBFD] rounded-xl border border-[#E4E8F0]">
                <span className="text-[10.5px] font-mono text-[#8A94A6] uppercase font-bold">
                  Risk Score
                </span>
                <div className="font-mono font-extrabold text-[#0F172A] text-[15px] mt-0.5">
                  {block.riskFactor}/100
                </div>
              </div>
            </div>

            {/* Recommended Time & Train Conflict */}
            <div className="p-3.5 bg-[#FAFBFD] rounded-xl border border-[#E4E8F0] flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#4B5768]">
                  Schedule Window
                </span>
                <span className="font-mono font-extrabold text-[#0F172A] text-[13px]">
                  {block.startTime} – {block.endTime}
                </span>
              </div>

              <div className="flex items-center justify-between border-t border-[#EDF0F5] pt-2.5">
                <span className="text-[11px] font-bold text-[#4B5768]">
                  Train Conflict Check
                </span>
                {block.hasConflict ? (
                  <span className="badge b-red">
                    ⚠ Conflict Detected
                  </span>
                ) : (
                  <span className="badge b-green">
                    ✓ Clear Headway
                  </span>
                )}
              </div>
              {block.conflictDetails && (
                <div className="text-[11.5px] text-[#B91C1C] bg-[#FCECEC] p-2 rounded-lg leading-relaxed">
                  {block.conflictDetails}
                </div>
              )}
            </div>

            {/* AI Recommendation Box */}
            <div className="p-3.5 bg-[#EFEFFD] border border-[#D3D3FA] rounded-xl flex flex-col gap-1.5">
              <div className="flex items-center gap-1.5 text-[#4338CA] font-extrabold">
                <span>AI Recommendation</span>
              </div>
              <p className="text-[#4B5768] text-[12px] leading-relaxed">
                Combine with nearby Signal and Traction maintenance requests into an integrated Mega-Block window between 14:00 and 16:00 to eliminate redundant possession overhead.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons: Approve, Optimize, Reject */}
        <div className="p-4 border-t border-[#E4E8F0] bg-white flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => onApprove(block.id)}
            className="flex-1 py-2.5 bg-[#047857] hover:bg-[#065F46] text-white rounded-lg text-[12.5px] font-bold transition-colors cursor-pointer text-center shadow-xs"
          >
            Approve Block
          </button>
          <button
            type="button"
            onClick={() => onOptimize(block.id)}
            className="flex-1 py-2.5 bg-[#1D4ED8] hover:bg-[#1743B0] text-white rounded-lg text-[12.5px] font-bold transition-colors cursor-pointer text-center shadow-xs"
          >
            Optimize
          </button>
          <button
            type="button"
            onClick={() => onReject(block.id)}
            className="px-3.5 py-2.5 border border-[#E4E8F0] text-[#8A94A6] hover:text-[#B91C1C] hover:bg-[#FCECEC] rounded-lg text-[12.5px] font-bold transition-colors cursor-pointer text-center"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};
