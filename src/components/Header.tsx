import React from 'react';
import { NavView } from './Sidebar';

interface HeaderProps {
  currentView: NavView;
  pendingCount: number;
  onProposeBlock: () => void;
  onTogglePending: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  pendingCount,
  onProposeBlock,
  onTogglePending
}) => {
  const getMeta = (v: NavView): [string, string, string] => {
    switch (v) {
      case 'command':
        return [
          'Gwalior Junction (GWL) · Jhansi Division · North Central Railway',
          'Command Centre',
          'Built for Divisional Controllers'
        ];
      case 'simulator':
        return [
          'Corridor Optimization Engine · Illustrative Simulation',
          'AI Simulator',
          'Built for Controllers & Planning Engineers'
        ];
      case 'planning':
        return [
          'Gwalior Railway Area · Maintenance Requests & Possessions',
          'Block Planning',
          'Built for Divisional Controllers'
        ];
      case 'map':
        return [
          'Gwalior–Jhansi Corridor Schematic & Track Occupancy',
          'Railway Map',
          'Built for Section Controllers'
        ];
      case 'field':
        return [
          'Active Maintenance Gangs & Field Execution · Gwalior Section',
          'Field Ops',
          'Built for Maintenance Gangs'
        ];
      case 'impact':
        return [
          'Feasibility, Impact & Deployment Roadmap',
          'Impact & Rollout',
          'Built for Programme Sponsors & Reviewers'
        ];
      default:
        return [
          'Gwalior Junction (GWL) · Jhansi Division · North Central Railway',
          'Command Centre',
          'Built for Divisional Controllers'
        ];
    }
  };

  const [eyebrow, title, audience] = getMeta(currentView);

  return (
    <header
      id="topbar"
      className="fixed top-0 right-0 left-[246px] z-30 bg-[#F3F5F9]/90 backdrop-blur-md px-8 py-5 border-b border-[#E4E8F0] flex items-end justify-between gap-5 select-none"
    >
      <div>
        <div id="tb-eyebrow" className="text-[11.5px] text-[#8A94A6] font-semibold mb-1">
          {eyebrow}
        </div>
        <h2 id="tb-title" className="text-[22px] font-extrabold text-[#0F172A] tracking-tight leading-none">
          {title}
        </h2>
        <div
          id="tb-audience"
          className="inline-flex items-center gap-1.5 text-[11.5px] text-[#1D4ED8] font-semibold bg-[#EAF0FE] border border-[#C6D8FC] px-2.5 py-0.5 rounded-full mt-2"
        >
          {audience}
        </div>
      </div>

      <div className="flex items-center gap-2.5 shrink-0">
        {/* Pending Requests Button */}
        <button
          id="notifBtn"
          type="button"
          onClick={onTogglePending}
          className="border border-[#E4E8F0] bg-white text-[#0F172A] text-[13px] font-bold px-3.5 py-2 rounded-lg inline-flex items-center gap-2 transition-all hover:border-[#C7CFDB] hover:bg-[#FAFBFD] cursor-pointer shadow-xs"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <span>{pendingCount} Pending</span>
        </button>

        {/* Propose Block Button */}
        <button
          id="proposeBtn"
          type="button"
          onClick={onProposeBlock}
          className="bg-[#1D4ED8] border border-[#1D4ED8] text-white text-[13px] font-bold px-3.5 py-2 rounded-lg inline-flex items-center gap-2 transition-all hover:bg-[#1743B0] cursor-pointer shadow-xs"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
            <path d="M12 5v14M5 12h14" />
          </svg>
          <span>Propose Block</span>
        </button>

        {/* Note: The login(SC) avatar was explicitly removed per user request */}
      </div>
    </header>
  );
};
