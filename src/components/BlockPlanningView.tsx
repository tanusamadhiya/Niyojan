import React, { useState } from 'react';
import { BlockItem } from '../types';

interface BlockPlanningViewProps {
  blocks: BlockItem[];
  onSelectBlock: (blockId: string) => void;
  onOpenDrawer: (blockId: string) => void;
  onProposeBlock: () => void;
  initialFilter?: string;
}

export const BlockPlanningView: React.FC<BlockPlanningViewProps> = ({
  blocks,
  onOpenDrawer,
  onProposeBlock,
  initialFilter = 'all'
}) => {
  const [activeDept, setActiveDept] = useState<string>(initialFilter);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Map internal department to display department
  const getDeptCategory = (block: BlockItem): 'Engineering' | 'Signal' | 'Traction' | 'Mega-Block' => {
    if (block.department === 'MegaBlock' || block.code.startsWith('MB-')) return 'Mega-Block';
    if (block.department === 'Civil') return 'Engineering';
    if (block.department === 'Signal') return 'Signal';
    if (block.department === 'Traction') return 'Traction';
    return 'Engineering';
  };

  const filteredBlocks = blocks.filter((b) => {
    const deptCat = getDeptCategory(b);
    const matchesDept =
      activeDept === 'all' ||
      deptCat.toLowerCase() === activeDept.toLowerCase() ||
      (activeDept === 'Engineering' && (b.department === 'Civil' || deptCat === 'Engineering'));

    const matchesSearch =
      b.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.section.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesDept && matchesSearch;
  });

  const getDeptBadge = (category: string) => {
    switch (category) {
      case 'Engineering':
        return <span className="badge b-blue">Engineering</span>;
      case 'Signal':
        return <span className="badge b-amber">Signal</span>;
      case 'Traction':
        return <span className="badge b-green">Traction</span>;
      case 'Mega-Block':
        return <span className="badge b-indigo">Mega-Block</span>;
      default:
        return <span className="badge b-slate">{category}</span>;
    }
  };

  const getPriorityBadge = (riskLevel: string) => {
    switch (riskLevel) {
      case 'High':
        return <span className="badge b-red">High</span>;
      case 'Medium':
        return <span className="badge b-amber">Medium</span>;
      case 'Low':
      default:
        return <span className="badge b-slate">Low</span>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Approved':
      case 'Completed':
        return <span className="badge b-green">{status}</span>;
      case 'InProgress':
        return <span className="badge b-blue">In Progress</span>;
      case 'Pending':
        return <span className="badge b-amber">Pending</span>;
      case 'Proposed':
      default:
        return <span className="badge b-slate">Proposed</span>;
    }
  };

  return (
    <div className="flex flex-col gap-4 max-w-[1240px] mx-auto w-full">
      {/* Filters Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => setActiveDept('all')}
            className={`border text-[12px] font-bold px-3.5 py-1.5 rounded-full transition-colors cursor-pointer ${
              activeDept === 'all'
                ? 'bg-[#0A1220] border-[#0A1220] text-white'
                : 'border-[#E4E8F0] bg-white text-[#4B5768] hover:border-[#CBD5E1]'
            }`}
          >
            All Requests ({blocks.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveDept('Engineering')}
            className={`border text-[12px] font-bold px-3.5 py-1.5 rounded-full transition-colors cursor-pointer ${
              activeDept === 'Engineering'
                ? 'bg-[#0A1220] border-[#0A1220] text-white'
                : 'border-[#E4E8F0] bg-white text-[#4B5768] hover:border-[#CBD5E1]'
            }`}
          >
            Engineering
          </button>
          <button
            type="button"
            onClick={() => setActiveDept('Signal')}
            className={`border text-[12px] font-bold px-3.5 py-1.5 rounded-full transition-colors cursor-pointer ${
              activeDept === 'Signal'
                ? 'bg-[#0A1220] border-[#0A1220] text-white'
                : 'border-[#E4E8F0] bg-white text-[#4B5768] hover:border-[#CBD5E1]'
            }`}
          >
            Signal
          </button>
          <button
            type="button"
            onClick={() => setActiveDept('Traction')}
            className={`border text-[12px] font-bold px-3.5 py-1.5 rounded-full transition-colors cursor-pointer ${
              activeDept === 'Traction'
                ? 'bg-[#0A1220] border-[#0A1220] text-white'
                : 'border-[#E4E8F0] bg-white text-[#4B5768] hover:border-[#CBD5E1]'
            }`}
          >
            Traction
          </button>
          <button
            type="button"
            onClick={() => setActiveDept('Mega-Block')}
            className={`border text-[12px] font-bold px-3.5 py-1.5 rounded-full transition-colors cursor-pointer ${
              activeDept === 'Mega-Block'
                ? 'bg-[#0A1220] border-[#0A1220] text-white'
                : 'border-[#E4E8F0] bg-white text-[#4B5768] hover:border-[#CBD5E1]'
            }`}
          >
            Mega-Block
          </button>
        </div>

        <div className="flex items-center gap-2.5">
          <input
            type="text"
            placeholder="Search block code, section, or task…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-[#E4E8F0] bg-white text-[12px] px-3 py-1.5 rounded-lg focus:outline-none focus:border-[#1D4ED8] w-64 text-[#0F172A]"
          />
          <button
            type="button"
            onClick={onProposeBlock}
            className="bg-[#1D4ED8] hover:bg-[#1743B0] text-white text-[12px] font-bold px-3 py-1.5 rounded-lg inline-flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 5v14M5 12h14" />
            </svg>
            <span>Add Block</span>
          </button>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white border border-[#E4E8F0] rounded-xl overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-[13px]">
            <thead>
              <tr className="border-b border-[#E4E8F0] bg-[#FAFBFD]">
                <th className="text-[10.5px] font-bold text-[#8A94A6] uppercase tracking-wider py-3 px-4">
                  Block ID
                </th>
                <th className="text-[10.5px] font-bold text-[#8A94A6] uppercase tracking-wider py-3 px-4">
                  Section
                </th>
                <th className="text-[10.5px] font-bold text-[#8A94A6] uppercase tracking-wider py-3 px-4">
                  Department
                </th>
                <th className="text-[10.5px] font-bold text-[#8A94A6] uppercase tracking-wider py-3 px-4">
                  Maintenance Task
                </th>
                <th className="text-[10.5px] font-bold text-[#8A94A6] uppercase tracking-wider py-3 px-4">
                  Window
                </th>
                <th className="text-[10.5px] font-bold text-[#8A94A6] uppercase tracking-wider py-3 px-4">
                  Duration
                </th>
                <th className="text-[10.5px] font-bold text-[#8A94A6] uppercase tracking-wider py-3 px-4">
                  Priority
                </th>
                <th className="text-[10.5px] font-bold text-[#8A94A6] uppercase tracking-wider py-3 px-4">
                  Status
                </th>
                <th className="py-3 px-4 text-right"></th>
              </tr>
            </thead>
            <tbody>
              {filteredBlocks.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-[13px] text-[#8A94A6]">
                    No maintenance blocks found matching the current filter.
                  </td>
                </tr>
              ) : (
                filteredBlocks.map((b) => {
                  const deptCat = getDeptCategory(b);
                  const isMega = deptCat === 'Mega-Block';
                  return (
                    <tr
                      key={b.id}
                      onClick={() => onOpenDrawer(b.id)}
                      className={`border-b border-[#EDF0F5] last:border-b-0 cursor-pointer transition-colors ${
                        isMega
                          ? 'bg-[#EFEFFD] hover:bg-[#E6E6FA]'
                          : 'hover:bg-[#FAFBFD]'
                      }`}
                    >
                      <td className="py-3 px-4 font-mono font-bold text-[#0F172A]">
                        {b.code}
                      </td>
                      <td className="py-3 px-4 font-mono text-[12.5px] text-[#4B5768]">
                        {b.section}
                      </td>
                      <td className="py-3 px-4">
                        {getDeptBadge(deptCat)}
                      </td>
                      <td className="py-3 px-4 font-bold text-[#0F172A] text-[13px]">
                        {b.title}
                        {b.hasConflict && (
                          <span className="ml-2 text-[10px] text-[#B91C1C] font-semibold bg-[#FCECEC] px-1.5 py-0.5 rounded border border-[#F4C6C6]">
                            ⚠ Conflict
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 font-mono text-[12.5px] text-[#4B5768]">
                        {b.startTime}–{b.endTime}
                      </td>
                      <td className="py-3 px-4 font-mono font-semibold text-[#4B5768]">
                        {b.durationHours.toFixed(1)}h
                      </td>
                      <td className="py-3 px-4">
                        {getPriorityBadge(b.riskLevel)}
                      </td>
                      <td className="py-3 px-4">
                        {getStatusBadge(b.status)}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenDrawer(b.id);
                          }}
                          className="text-[#1D4ED8] font-bold text-[12.5px] hover:underline cursor-pointer"
                        >
                          View &rarr;
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
