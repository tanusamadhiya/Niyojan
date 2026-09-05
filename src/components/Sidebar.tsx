import React from 'react';

export type NavView = 'command' | 'simulator' | 'planning' | 'map' | 'field' | 'impact';

interface SidebarProps {
  currentView: NavView;
  onNavigate: (view: NavView) => void;
  pendingRequestsCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  pendingRequestsCount = 8
}) => {
  return (
    <aside
      id="sidebar"
      className="w-[246px] shrink-0 bg-[#0A1220] text-white flex flex-col fixed top-0 left-0 h-screen border-r border-[#000000] z-40 select-none"
    >
      {/* Brand Header */}
      <div
        id="brand"
        className="p-[22px_20px_18px] flex items-center gap-2.5 border-b border-[#25334F]"
      >
        <div className="w-[34px] h-[34px] rounded-lg bg-gradient-to-b from-[#2563EB] to-[#1D4ED8] flex items-center justify-center shrink-0 shadow-sm">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="3" width="16" height="13" rx="4" />
            <path d="M8 21l1.5-4M16 21l-1.5-4M4 11h16" />
          </svg>
        </div>
        <div className="flex flex-col min-w-0">
          <h1 className="text-[15.5px] font-extrabold text-white leading-tight">
            Rail Niyojan-AI
          </h1>
          <span className="text-[11px] text-[#8FA1C4] font-medium">
            AI-Powered Block Planning
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-[14px_12px] flex flex-col gap-1 flex-1 overflow-y-auto no-scrollbar">
        {/* Command Centre */}
        <button
          id="nav-btn-command"
          type="button"
          onClick={() => onNavigate('command')}
          className={`relative flex items-center gap-[11px] p-[10px_12px] rounded-lg text-[13.5px] font-semibold text-left w-full transition-colors cursor-pointer ${
            currentView === 'command'
              ? 'bg-[#1B2A46] text-white before:content-[""] before:absolute before:-left-[12px] before:top-[8px] before:bottom-[8px] before:w-[3px] before:bg-[#3B6BF0] before:rounded-r'
              : 'text-[#B7C3DA] hover:bg-[#101B30] hover:text-white'
          }`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 opacity-85">
            <rect x="3" y="3" width="7" height="9" rx="1.5" />
            <rect x="14" y="3" width="7" height="5" rx="1.5" />
            <rect x="14" y="12" width="7" height="9" rx="1.5" />
            <rect x="3" y="16" width="7" height="5" rx="1.5" />
          </svg>
          <span>Command Centre</span>
        </button>

        {/* AI Simulator */}
        <button
          id="nav-btn-simulator"
          type="button"
          onClick={() => onNavigate('simulator')}
          className={`relative flex items-center gap-[11px] p-[10px_12px] rounded-lg text-[13.5px] font-semibold text-left w-full transition-colors cursor-pointer ${
            currentView === 'simulator'
              ? 'bg-[#1B2A46] text-white before:content-[""] before:absolute before:-left-[12px] before:top-[8px] before:bottom-[8px] before:w-[3px] before:bg-[#3B6BF0] before:rounded-r'
              : 'text-[#B7C3DA] hover:bg-[#101B30] hover:text-white'
          }`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 opacity-85">
            <path d="M13 2 4 14h6l-1 8 9-12h-6z" />
          </svg>
          <span>AI Simulator</span>
          <span className="ml-auto text-[9px] font-extrabold tracking-wider text-[#7CD8A6] border border-[#1F5C41] bg-[#0F2A1F] px-1.5 py-0.5 rounded">
            CORE
          </span>
        </button>

        {/* Block Planning */}
        <button
          id="nav-btn-planning"
          type="button"
          onClick={() => onNavigate('planning')}
          className={`relative flex items-center gap-[11px] p-[10px_12px] rounded-lg text-[13.5px] font-semibold text-left w-full transition-colors cursor-pointer ${
            currentView === 'planning'
              ? 'bg-[#1B2A46] text-white before:content-[""] before:absolute before:-left-[12px] before:top-[8px] before:bottom-[8px] before:w-[3px] before:bg-[#3B6BF0] before:rounded-r'
              : 'text-[#B7C3DA] hover:bg-[#101B30] hover:text-white'
          }`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 opacity-85">
            <path d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01" />
          </svg>
          <span>Block Planning</span>
          <span className="ml-auto bg-[#3B6BF0] text-white text-[10.5px] font-bold px-2 py-0.5 rounded-full font-mono">
            {pendingRequestsCount}
          </span>
        </button>

        {/* Railway Map */}
        <button
          id="nav-btn-map"
          type="button"
          onClick={() => onNavigate('map')}
          className={`relative flex items-center gap-[11px] p-[10px_12px] rounded-lg text-[13.5px] font-semibold text-left w-full transition-colors cursor-pointer ${
            currentView === 'map'
              ? 'bg-[#1B2A46] text-white before:content-[""] before:absolute before:-left-[12px] before:top-[8px] before:bottom-[8px] before:w-[3px] before:bg-[#3B6BF0] before:rounded-r'
              : 'text-[#B7C3DA] hover:bg-[#101B30] hover:text-white'
          }`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 opacity-85">
            <path d="M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4z" />
            <path d="M8 2v16M16 6v16" />
          </svg>
          <span>Railway Map</span>
        </button>

        {/* Field Ops */}
        <button
          id="nav-btn-field"
          type="button"
          onClick={() => onNavigate('field')}
          className={`relative flex items-center gap-[11px] p-[10px_12px] rounded-lg text-[13.5px] font-semibold text-left w-full transition-colors cursor-pointer ${
            currentView === 'field'
              ? 'bg-[#1B2A46] text-white before:content-[""] before:absolute before:-left-[12px] before:top-[8px] before:bottom-[8px] before:w-[3px] before:bg-[#3B6BF0] before:rounded-r'
              : 'text-[#B7C3DA] hover:bg-[#101B30] hover:text-white'
          }`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 opacity-85">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          <span>Field Ops</span>
        </button>

        {/* Divider */}
        <div className="h-[1px] bg-[#25334F] my-2 mx-1" />

        {/* Impact & Rollout */}
        <button
          id="nav-btn-impact"
          type="button"
          onClick={() => onNavigate('impact')}
          className={`relative flex items-center gap-[11px] p-[10px_12px] rounded-lg text-[13.5px] font-semibold text-left w-full transition-colors cursor-pointer ${
            currentView === 'impact'
              ? 'bg-[#1B2A46] text-white before:content-[""] before:absolute before:-left-[12px] before:top-[8px] before:bottom-[8px] before:w-[3px] before:bg-[#3B6BF0] before:rounded-r'
              : 'text-[#B7C3DA] hover:bg-[#101B30] hover:text-white'
          }`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 opacity-85">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
          <span>Impact &amp; Rollout</span>
        </button>
      </nav>

      {/* Sidefoot Context Card */}
      <div id="sidefoot" className="p-[14px_16px_18px] border-t border-[#25334F]">
        <div className="bg-[#101B30] border border-[#25334F] rounded-[10px] p-[11px_12px]">
          <div className="text-[12.5px] font-bold text-white leading-tight">
            Gwalior Junction · GWL
          </div>
          <div className="text-[11px] text-[#8FA1C4] mt-0.5">
            Jhansi Division, North Central Railway
          </div>
          <div className="flex items-center gap-1.5 mt-2.5">
            <span className="pulse-dot" />
            <span className="text-[11px] text-[#9FB0CB] font-semibold">
              AI Engine Active — synced 2 min ago
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};
