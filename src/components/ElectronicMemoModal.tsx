import React from 'react';
import { BlockItem } from '../types';

interface ElectronicMemoModalProps {
  block: BlockItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ElectronicMemoModal: React.FC<ElectronicMemoModalProps> = ({ block, isOpen, onClose }) => {
  if (!isOpen || !block) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 select-none">
      <div className="bg-white rounded-xl max-w-2xl w-full border border-[#DCE3EA] shadow-2xl overflow-hidden animate-scale-up flex flex-col">
        {/* Modal Header */}
        <div className="p-4 bg-[#1C3F60] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[20px]">verified</span>
            <span className="font-serif font-bold text-sm">Official Line Block Memo (Form T/409)</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded hover:bg-white/20 transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Memo Paper Container */}
        <div className="p-6 overflow-y-auto max-h-[75vh] flex flex-col gap-5 font-mono text-xs bg-[#FAFBFD] border-x border-[#E2E8F0]">
          {/* Institution Header */}
          <div className="text-center border-b-2 border-[#1C3F60] pb-4">
            <h2 className="font-serif font-bold text-base text-[#1C3F60] tracking-wide uppercase">
              Indian Railways · North Central Railway
            </h2>
            <div className="text-[11px] text-[#4B5563] mt-0.5">
              Office of the Divisional Railway Manager (Operating) · Jhansi Division · Gwalior Sector
            </div>
            <div className="mt-2 inline-block px-3 py-1 bg-[#1C3F60] text-white font-bold text-xs tracking-wider rounded">
              ELECTRONIC LINE BLOCK MEMO (FORM NO. T/409)
            </div>
          </div>

          {/* Memo Metadata */}
          <div className="grid grid-cols-2 gap-3 p-3 bg-white border border-[#DCE3EA] rounded-md">
            <div>
              <span className="text-[#6B7280] block text-[10px]">MEMO REFERENCE NO:</span>
              <strong className="text-[#1C3F60]">WCR-BPL-LBM-2024-9482</strong>
            </div>
            <div>
              <span className="text-[#6B7280] block text-[10px]">DATE & TIMESTAMP:</span>
              <strong>{new Date().toLocaleDateString('en-GB')} | {new Date().toLocaleTimeString()} IST</strong>
            </div>
            <div>
              <span className="text-[#6B7280] block text-[10px]">SECTION & TRACK:</span>
              <strong>{block.section} ({block.trackLine})</strong>
            </div>
            <div>
              <span className="text-[#6B7280] block text-[10px]">CHAINAGE SPAN:</span>
              <strong>{block.chainage}</strong>
            </div>
          </div>

          {/* Authorized Window */}
          <div className="p-3 bg-[#E6F4EA] border border-[#137333]/30 rounded-md flex items-center justify-between text-[#137333]">
            <div>
              <span className="text-[10px] block uppercase font-bold">Authorized Possession Duration:</span>
              <strong className="text-sm font-bold">{block.startTime} to {block.endTime} IST ({block.durationHours} Hours)</strong>
            </div>
            <span className="material-symbols-outlined text-[24px]">lock</span>
          </div>

          {/* Machine & Interlocking Token */}
          <div className="flex flex-col gap-2 text-[11px]">
            <div className="flex justify-between border-b border-[#E5E7EB] py-1">
              <span className="text-[#6B7280]">Machinery / Work Force:</span>
              <span className="font-bold">{block.machine || 'Designated P-Way Work Gang'}</span>
            </div>
            <div className="flex justify-between border-b border-[#E5E7EB] py-1">
              <span className="text-[#6B7280]">Station Master Handshake Token:</span>
              <span className="font-bold text-[#1C3F60]">{block.token || 'Token #BPL-DOWN-02'}</span>
            </div>
            <div className="flex justify-between border-b border-[#E5E7EB] py-1">
              <span className="text-[#6B7280]">25kV OHE Isolation Permit:</span>
              <span className="font-bold text-[#137333]">PTW-940-TRD Verified</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-[#6B7280]">Adjacent Track Protection:</span>
              <span className="font-bold">Banner Flags at 600m · Detonators at 1200m</span>
            </div>
          </div>

          {/* Cryptographic Signature Stamp */}
          <div className="p-3 bg-white border border-[#DCE3EA] rounded-md flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[24px] text-[#1C3F60]">fingerprint</span>
              <div>
                <span className="text-[10px] text-[#6B7280] block">DIGITALLY COUNTERSIGNED:</span>
                <span className="font-bold text-xs">Divisional Block Control Desk · Gwalior (NCR/JHS)</span>
              </div>
            </div>
            <div className="text-right text-[10px] text-[#6B7280]">
              <div>SHA-256: 7f8a92b1...3e41</div>
              <div className="text-[#137333] font-bold">SCADA Cryptographically Bound</div>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="p-4 bg-[#F8FAFC] border-t border-[#DCE3EA] flex items-center justify-between">
          <span className="text-xs text-[#6B7280]">
            Valid under General & Subsidiary Rules (G&SR Para 4.19)
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                window.print();
              }}
              className="px-3.5 py-1.5 bg-white border border-[#DCE3EA] hover:border-[#1C3F60] text-[#1C3F60] text-xs font-semibold rounded shadow-2xs transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[15px]">print</span>
              <span>Print Memo</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 bg-[#1C3F60] hover:bg-[#15314a] text-white text-xs font-semibold rounded shadow-xs transition-colors cursor-pointer"
            >
              Close & Return
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
