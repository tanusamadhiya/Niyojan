import React from 'react';
import { BlockItem } from '../types';

interface PendingRequestsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  blocks: BlockItem[];
  onApproveBlock: (blockId: string) => void;
  onSelectBlock: (blockId: string) => void;
  onApproveAllMega: () => void;
}

export const PendingRequestsDrawer: React.FC<PendingRequestsDrawerProps> = ({
  isOpen,
  onClose,
  blocks,
  onApproveBlock,
  onSelectBlock,
  onApproveAllMega
}) => {
  if (!isOpen) return null;

  const pendingBlocks = blocks.filter((b) => b.status === 'Proposed');

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end select-none">
      <div
        className="fixed inset-0 bg-[#0A1220]/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md bg-white h-full shadow-2xl z-10 flex flex-col justify-between border-l border-[#E4E8F0] overflow-y-auto animate-slide-left">
        <div>
          {/* Header */}
          <div className="p-4 px-5 border-b border-[#E4E8F0] bg-[#FAFBFD] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#B45309]" />
              <span className="font-extrabold text-[15px] text-[#0F172A]">
                Pending Maintenance Possessions ({pendingBlocks.length})
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

          {/* List */}
          <div className="p-4 flex flex-col gap-3">
            <div className="bg-[#EFEFFD] border border-[#D3D3FA] rounded-xl p-3 flex items-center justify-between">
              <div>
                <div className="text-[12px] font-bold text-[#4338CA]">
                  AI Auto-Clustering Ready
                </div>
                <div className="text-[11px] text-[#4B5768]">
                  3 overlapping requests can be merged into 1 Mega-Block.
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  onApproveAllMega();
                  onClose();
                }}
                className="bg-[#4338CA] hover:bg-[#3730A3] text-white text-[11.5px] font-bold px-2.5 py-1.5 rounded-lg shrink-0 cursor-pointer shadow-xs"
              >
                Bundle All
              </button>
            </div>

            {pendingBlocks.length === 0 ? (
              <div className="py-12 text-center text-[13px] text-[#8A94A6]">
                All block requests have been reviewed and approved!
              </div>
            ) : (
              pendingBlocks.map((b) => (
                <div
                  key={b.id}
                  className="bg-[#FAFBFD] border border-[#E4E8F0] rounded-xl p-3.5 flex flex-col gap-2 hover:border-[#CBD5E1] transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-[12px] text-[#0F172A]">
                        {b.code}
                      </span>
                      <span className="text-[11px] font-mono text-[#8A94A6]">
                        {b.section}
                      </span>
                    </div>
                    <span
                      className={`badge ${
                        b.department === 'Civil'
                          ? 'b-blue'
                          : b.department === 'Signal'
                          ? 'b-amber'
                          : b.department === 'Traction'
                          ? 'b-green'
                          : 'b-indigo'
                      }`}
                    >
                      {b.department}
                    </span>
                  </div>

                  <div className="text-[13px] font-bold text-[#0F172A]">
                    {b.title}
                  </div>

                  <div className="flex items-center justify-between text-[11.5px] text-[#4B5768]">
                    <span className="font-mono">Window: {b.startTime}–{b.endTime} ({b.durationHours}h)</span>
                    <span className="font-semibold text-[#B91C1C]">Priority: {b.riskLevel}</span>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#EDF0F5]">
                    <button
                      type="button"
                      onClick={() => {
                        onSelectBlock(b.id);
                        onClose();
                      }}
                      className="text-[12px] font-bold text-[#4B5768] hover:text-[#0F172A] px-2 py-1 cursor-pointer"
                    >
                      Inspect
                    </button>
                    <button
                      type="button"
                      onClick={() => onApproveBlock(b.id)}
                      className="bg-[#047857] hover:bg-[#065F46] text-white text-[12px] font-bold px-3 py-1 rounded-lg transition-colors cursor-pointer shadow-xs"
                    >
                      Approve
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="p-4 border-t border-[#E4E8F0] bg-white">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 border border-[#E4E8F0] text-[#4B5768] hover:bg-[#FAFBFD] rounded-lg text-[13px] font-bold transition-colors cursor-pointer text-center"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
