import React, { useState } from 'react';
import { ConflictAlert } from '../types';

interface AlertsViewProps {
  alerts: ConflictAlert[];
  onAutoResolveConflict: (alertId: string) => void;
  onMergeOpportunity: (alertId: string) => void;
  onSimulateConflict: () => void;
}

export const AlertsView: React.FC<AlertsViewProps> = ({
  alerts,
  onAutoResolveConflict,
  onMergeOpportunity,
  onSimulateConflict
}) => {
  const [filterType, setFilterType] = useState<string>('All');
  const [selectedAlertId, setSelectedAlertId] = useState<string>(alerts[0]?.id || '');

  const filteredAlerts = alerts.filter((a) => {
    if (filterType === 'All') return true;
    if (filterType === 'Active') return !a.resolved;
    if (filterType === 'Resolved') return a.resolved;
    if (filterType === 'Critical') return a.type === 'Critical';
    if (filterType === 'Opportunity') return a.type === 'Opportunity';
    return true;
  });

  const activeAlert = alerts.find((a) => a.id === selectedAlertId) || alerts[0];

  return (
    <div className="flex flex-col gap-5 pb-12">
      {/* Header Banner */}
      <div className="bg-white rounded-xl border border-[#DCE3EA] p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-[#64748B]">
            <span className="font-bold text-[#0F2E5A]">NCR · Jhansi Division</span>
            <span>/</span>
            <span>Gwalior Operational Safety Desk</span>
          </div>
          <h1 className="font-serif font-bold text-xl text-[#0F2E5A] mt-1">
            Real-Time Operational Alerts & Route Clash Matrix
          </h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Continuous GNSS-Kavach headway clearance monitoring and prescriptive AI conflict mitigation.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-center shrink-0">
          <button
            type="button"
            onClick={onSimulateConflict}
            className="px-3.5 py-2 bg-[#FCE8E6] hover:bg-[#fadad7] text-[#8B1E2F] border border-[#8B1E2F]/30 rounded-lg text-xs font-semibold transition-all shadow-2xs cursor-pointer flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">flash_on</span>
            <span>Simulate Route Clash</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 flex-wrap">
        {[
          { id: 'All', label: 'All Alerts' },
          { id: 'Active', label: 'Active Unresolved' },
          { id: 'Critical', label: 'Critical Clashes' },
          { id: 'Opportunity', label: 'Mega-Block Opportunities' },
          { id: 'Resolved', label: 'Resolved History' }
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setFilterType(tab.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-sans transition-all cursor-pointer ${
              filterType === tab.id
                ? 'bg-[#0F2E5A] text-white font-semibold shadow-xs'
                : 'bg-white border border-[#DCE3EA] text-[#475569] hover:bg-[#F8FAFC]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Split Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left List */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          {filteredAlerts.map((alert) => {
            const isSelected = activeAlert?.id === alert.id;
            return (
              <div
                key={alert.id}
                onClick={() => setSelectedAlertId(alert.id)}
                className={`p-4 rounded-xl border text-xs flex flex-col gap-2.5 transition-all cursor-pointer shadow-xs ${
                  isSelected
                    ? 'border-2 border-[#0F2E5A] bg-white ring-2 ring-[#0F2E5A]/10'
                    : 'bg-white border-[#DCE3EA] hover:border-[#CBD5E1]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-bold font-serif">
                    <span
                      className={`material-symbols-outlined text-[18px] ${
                        alert.resolved
                          ? 'text-[#16A34A]'
                          : alert.type === 'Critical'
                          ? 'text-[#8B1E2F]'
                          : alert.type === 'Warning'
                          ? 'text-[#D97706]'
                          : 'text-[#0284C7]'
                      }`}
                    >
                      {alert.resolved
                        ? 'check_circle'
                        : alert.type === 'Critical'
                        ? 'report'
                        : alert.type === 'Warning'
                        ? 'schedule'
                        : 'hub'}
                    </span>
                    <span
                      className={
                        alert.type === 'Critical'
                          ? 'text-[#8B1E2F]'
                          : alert.type === 'Warning'
                          ? 'text-[#92400E]'
                          : 'text-[#0369A1]'
                      }
                    >
                      {alert.title}
                    </span>
                  </div>

                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${
                      alert.resolved
                        ? 'bg-[#F0FDF4] text-[#15803D] border border-[#16A34A]/20'
                        : 'bg-[#F1F5F9] text-[#475569]'
                    }`}
                  >
                    {alert.resolved ? 'RESOLVED ✓' : alert.timeRemaining}
                  </span>
                </div>

                <p className="text-[#475569] text-[11px] leading-relaxed line-clamp-2">
                  {alert.description}
                </p>

                <div className="flex items-center justify-between pt-1 border-t border-[#F1F5F9] text-[10px] font-mono text-[#64748B]">
                  <span>{alert.location}</span>
                  <span className="text-[#0F2E5A] font-semibold">Impact: {alert.delayImpact}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Detail Pane */}
        <div className="lg:col-span-7">
          {activeAlert ? (
            <div className="bg-white rounded-xl border border-[#DCE3EA] shadow-xs p-6 flex flex-col gap-4 sticky top-20">
              <div className="flex items-start justify-between border-b border-[#E2E8F0] pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-mono font-bold px-2 py-0.5 rounded uppercase ${
                        activeAlert.type === 'Critical'
                          ? 'bg-[#FCE8E6] text-[#8B1E2F]'
                          : activeAlert.type === 'Warning'
                          ? 'bg-[#FEF3C7] text-[#B45309]'
                          : 'bg-[#E0F2FE] text-[#0369A1]'
                      }`}
                    >
                      {activeAlert.type} Incident
                    </span>
                    <span className="text-xs font-mono text-[#64748B]">{activeAlert.location}</span>
                  </div>
                  <h2 className="font-serif font-bold text-lg text-[#0F172A] mt-1">
                    {activeAlert.title}
                  </h2>
                </div>

                <div className="text-right">
                  <div className="text-xs font-mono text-[#64748B]">Resolution Index</div>
                  <div className="font-serif font-bold text-lg text-[#15803D]">
                    {activeAlert.recoverySuccess}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold text-[#0F2E5A] uppercase font-mono">
                  Telemetry Incident Report:
                </span>
                <p className="text-xs text-[#334155] leading-relaxed bg-[#F8FAFC] p-3.5 rounded-lg border border-[#E2E8F0]">
                  {activeAlert.description}
                </p>
              </div>

              {/* AI Prescriptive Recommendation */}
              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold text-[#0F2E5A] uppercase font-mono">
                  AI Prescriptive Mitigation:
                </span>
                <div className="p-3.5 bg-[#F0F9FF] border border-[#0284C7]/20 rounded-lg text-xs text-[#0F172A] leading-relaxed">
                  {activeAlert.prescriptiveAction}
                </div>
              </div>

              {/* Delay impact & status */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg">
                  <span className="text-[10px] font-mono text-[#64748B] uppercase">Schedule Deviation</span>
                  <div className="font-mono font-bold text-sm text-[#8B1E2F] mt-0.5">
                    {activeAlert.delayImpact}
                  </div>
                </div>
                <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg">
                  <span className="text-[10px] font-mono text-[#64748B] uppercase">Interlocking Status</span>
                  <div className="font-mono font-bold text-sm text-[#15803D] mt-0.5">
                    {activeAlert.resolved ? 'Cleared & Released' : 'Held at Signal #S-14'}
                  </div>
                </div>
              </div>

              {/* Resolution Button */}
              <div className="pt-2 border-t border-[#E2E8F0] flex items-center justify-end">
                {!activeAlert.resolved ? (
                  activeAlert.type === 'Opportunity' ? (
                    <button
                      type="button"
                      onClick={() => onMergeOpportunity(activeAlert.id)}
                      className="px-4 py-2 bg-[#0F2E5A] hover:bg-[#091E3B] text-white rounded-lg text-xs font-bold shadow-xs cursor-pointer"
                    >
                      Consolidate into Mega-Block
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onAutoResolveConflict(activeAlert.id)}
                      className="px-4 py-2 bg-[#8B1E2F] hover:bg-[#701625] text-white rounded-lg text-xs font-bold shadow-xs cursor-pointer flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined text-[16px]">auto_fix_high</span>
                      <span>Execute AI Route Diversion</span>
                    </button>
                  )
                ) : (
                  <div className="flex items-center gap-2 text-xs font-mono text-[#15803D] font-bold">
                    <span className="material-symbols-outlined text-[18px]">verified</span>
                    <span>Conflict Successfully Mitigated · Route Cleared</span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-[#DCE3EA] p-8 text-center text-[#64748B] text-xs">
              Select an alert from the left to view details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
