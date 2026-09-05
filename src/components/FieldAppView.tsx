import React, { useState } from 'react';

interface GangItem {
  id: string;
  dept: 'Engineering' | 'Signal' | 'Traction' | 'Joint';
  deptBadgeClass: string;
  borderColor: string;
  status: 'In Progress' | 'Assigned' | 'Completed' | 'Scheduled';
  statusBadgeClass: string;
  task: string;
  location: string;
  crewName: string;
  timeWindow: string;
}

interface FieldAppViewProps {
  onShowToast?: (msg: string) => void;
}

export const FieldAppView: React.FC<FieldAppViewProps> = ({ onShowToast }) => {
  const [gangs, setGangs] = useState<GangItem[]>([
    {
      id: 'g-04',
      dept: 'Engineering',
      deptBadgeClass: 'b-blue',
      borderColor: '#1D4ED8',
      status: 'In Progress',
      statusBadgeClass: 'b-blue',
      task: 'Track Inspection & Ballast Tamping',
      location: '📍 Gwalior Yard · KM 1215–1218',
      crewName: 'Gang #04 (PW-I/GWL)',
      timeWindow: '09:00–11:30'
    },
    {
      id: 'g-sig',
      dept: 'Signal',
      deptBadgeClass: 'b-amber',
      borderColor: '#B45309',
      status: 'Assigned',
      statusBadgeClass: 'b-amber',
      task: 'Point Machine #14B Overhaul',
      location: '📍 Sithouli Station · KM 1222.8',
      crewName: 'Signal Maint. Team A',
      timeWindow: '13:00–14:00'
    },
    {
      id: 'g-trd',
      dept: 'Traction',
      deptBadgeClass: 'b-green',
      borderColor: '#047857',
      status: 'Completed',
      statusBadgeClass: 'b-green',
      task: '25kV OHE Catenary Wire Check',
      location: '📍 Dabra Section · KM 1256.4',
      crewName: 'TRD Tower Wagon 02',
      timeWindow: '06:00–07:30'
    },
    {
      id: 'g-usfd',
      dept: 'Joint',
      deptBadgeClass: 'b-indigo',
      borderColor: '#4338CA',
      status: 'Scheduled',
      statusBadgeClass: 'b-slate',
      task: 'Ultrasonic Rail Flaw Detection',
      location: '📍 GWL–DBA · KM 1230–1245',
      crewName: 'USFD Specialist Unit',
      timeWindow: '15:00–18:00'
    }
  ]);

  const [phoneTaskStage, setPhoneTaskStage] = useState<number>(0);

  const handleCompleteTaskInPhone = () => {
    if (phoneTaskStage === 0) {
      setPhoneTaskStage(1);
      setGangs((prev) =>
        prev.map((g) =>
          g.id === 'g-04'
            ? { ...g, status: 'Completed', statusBadgeClass: 'b-green' }
            : g.id === 'g-usfd'
            ? { ...g, status: 'In Progress', statusBadgeClass: 'b-blue' }
            : g
        )
      );
      if (onShowToast) {
        onShowToast('✓ Gang #04: Track Inspection & Tamping marked Complete on Ground Crew App');
      }
    } else if (phoneTaskStage === 1) {
      setPhoneTaskStage(2);
      setGangs((prev) =>
        prev.map((g) =>
          g.id === 'g-usfd'
            ? { ...g, status: 'Completed', statusBadgeClass: 'b-green' }
            : g
        )
      );
      if (onShowToast) {
        onShowToast('✓ Gang #04: USFD Rail Flaw Detection Completed!');
      }
    } else {
      setPhoneTaskStage(0);
      setGangs((prev) =>
        prev.map((g) =>
          g.id === 'g-04'
            ? { ...g, status: 'In Progress', statusBadgeClass: 'b-blue' }
            : g.id === 'g-usfd'
            ? { ...g, status: 'Scheduled', statusBadgeClass: 'b-slate' }
            : g
        )
      );
      if (onShowToast) {
        onShowToast('Shift reset for demonstration.');
      }
    }
  };

  return (
    <div className="flex flex-col gap-5 max-w-[1240px] mx-auto w-full">
      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] items-stretch gap-4">
        {/* Left Card: Field Status */}
        <div className="bg-white border border-[#E4E8F0] rounded-xl p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3.5">
              <div>
                <div className="text-[13px] font-extrabold text-[#0F172A]">
                  Field Status — Gwalior Section
                </div>
                <div className="text-[12px] text-[#8A94A6] mt-0.5">
                  Active railway maintenance gangs &amp; execution progress
                </div>
              </div>
              <span className="badge b-green">4 Gangs Deployed</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {gangs.map((gang) => (
                <div
                  key={gang.id}
                  className="bg-[#FAFBFD] border border-[#E4E8F0] rounded-xl p-3.5 shadow-2xs border-l-4 transition-all"
                  style={{ borderLeftColor: gang.borderColor }}
                >
                  <div className="flex items-center justify-between">
                    <span className={`badge ${gang.deptBadgeClass}`}>{gang.dept}</span>
                    <span className={`badge ${gang.statusBadgeClass}`}>{gang.status}</span>
                  </div>
                  <div className="text-[13.5px] font-bold text-[#0F172A] mt-2 leading-tight">
                    {gang.task}
                  </div>
                  <div className="text-[11.5px] text-[#8A94A6] mt-1 flex items-center gap-1">
                    {gang.location}
                  </div>
                  <div className="flex items-center justify-between mt-2.5 pt-2.5 border-t border-[#EDF0F5] text-[11.5px] text-[#4B5768]">
                    <span className="font-medium">{gang.crewName}</span>
                    <span className="font-mono font-bold">{gang.timeWindow}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#EDF0F5] text-[11.5px] text-[#8A94A6]">
            <span>Last telemetry sync: <strong>Just now</strong></span>
            <span>GPS Tracking: <strong>4 of 4 Active</strong></span>
          </div>
        </div>

        {/* Right Card: Ground Crew App Mockup */}
        <div className="bg-white border border-[#E4E8F0] rounded-xl p-5 flex flex-col items-center justify-between shadow-2xs">
          <div className="w-full text-left">
            <div className="text-[13px] font-extrabold text-[#0F172A]">
              Ground Crew App
            </div>
            <div className="text-[12px] text-[#8A94A6] mt-0.5 mb-3.5">
              Built for maintenance gangs — offline-first, low-bandwidth
            </div>
          </div>

          {/* Phone Frame */}
          <div className="bg-[#0A1220] rounded-[26px] p-3 shadow-xl w-full max-w-[240px] my-1">
            <div className="bg-[#0F1B30] rounded-[16px] p-3.5 text-white min-h-[300px] flex flex-col justify-between">
              <div>
                <div className="text-[10px] text-[#8FA1C4] font-bold tracking-wider mb-2.5">
                  TODAY'S ASSIGNMENT · GANG #04
                </div>

                {/* Task 1 */}
                <div
                  className={`rounded-lg p-2.5 mb-2 transition-all ${
                    phoneTaskStage >= 1
                      ? 'bg-[#047857]/20 border border-[#047857]/40'
                      : 'bg-[#182642]'
                  }`}
                >
                  <div className="text-[11.5px] font-bold text-white flex items-center justify-between">
                    <span>Track Tamping — Gwalior Yard</span>
                    {phoneTaskStage >= 1 && <span className="text-[10px] text-[#86EFAC]">✓</span>}
                  </div>
                  <div className="text-[10px] text-[#8FA1C4] mt-0.5">
                    09:00–11:30 · Mega-Block MB-104
                  </div>
                </div>

                {/* Task 2 */}
                <div
                  className={`rounded-lg p-2.5 mb-2 transition-all ${
                    phoneTaskStage >= 2
                      ? 'bg-[#047857]/20 border border-[#047857]/40'
                      : phoneTaskStage === 1
                      ? 'bg-[#1D4ED8]/25 border border-[#2563EB]/40'
                      : 'bg-[#182642]'
                  }`}
                >
                  <div className="text-[11.5px] font-bold text-white flex items-center justify-between">
                    <span>USFD — GWL–DBA section</span>
                    {phoneTaskStage >= 2 && <span className="text-[10px] text-[#86EFAC]">✓</span>}
                  </div>
                  <div className="text-[10px] text-[#8FA1C4] mt-0.5">
                    15:00–18:00 · {phoneTaskStage === 1 ? 'in progress' : 'awaiting start'}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={handleCompleteTaskInPhone}
                className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[11px] font-bold text-center rounded-lg py-2.5 w-full cursor-pointer transition-colors shadow-xs active:scale-95"
              >
                {phoneTaskStage === 0 && '✓ Mark Task Complete'}
                {phoneTaskStage === 1 && '✓ Mark USFD Complete'}
                {phoneTaskStage === 2 && '↻ Reset Demo Shift'}
              </button>
            </div>
          </div>

          <div className="text-[11px] text-[#8A94A6] text-center mt-2">
            Click the button above to simulate live field reporting.
          </div>
        </div>
      </div>
    </div>
  );
};
