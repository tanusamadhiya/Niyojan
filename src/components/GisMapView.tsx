import React, { useState } from 'react';

interface StationInfo {
  code: string;
  name: string;
  km: string;
  desc: string;
  activeBlocks: number;
  nearbyMaintenance: number;
}

const STATIONS: Record<string, StationInfo> = {
  GWL: {
    code: 'GWL',
    name: 'Gwalior Junction',
    km: 'KM 1215.2',
    desc: 'Primary division hub with 6 platform lines, electric loco trip shed, and yard interlocking.',
    activeBlocks: 2,
    nearbyMaintenance: 4
  },
  STL: {
    code: 'STL',
    name: 'Sithouli',
    km: 'KM 1222.8',
    desc: "Signal & engineering possession point inside today's coordinated mega-block window — civil, S&T and traction bundled.",
    activeBlocks: 3,
    nearbyMaintenance: 5
  },
  DBA: {
    code: 'DBA',
    name: 'Dabra',
    km: 'KM 1256.4',
    desc: 'Down-line block hut; adjoining section for the proposed mega-block extension.',
    activeBlocks: 1,
    nearbyMaintenance: 2
  },
  DAA: {
    code: 'DAA',
    name: 'Datia',
    km: 'KM 1292.6',
    desc: 'Intermediate crossing station on the quad-track corridor with loop lines.',
    activeBlocks: 1,
    nearbyMaintenance: 3
  },
  JHS: {
    code: 'JHS',
    name: 'Jhansi Junction',
    km: 'KM 1318.0',
    desc: 'Divisional boundary and major interchange, VGLB routes converge here.',
    activeBlocks: 4,
    nearbyMaintenance: 6
  }
};

export const GisMapView: React.FC = () => {
  const [selectedStationCode, setSelectedStationCode] = useState<string>('GWL');
  const [isTrainMoving, setIsTrainMoving] = useState<boolean>(true);
  const [filterTrack, setFilterTrack] = useState<'ALL' | 'UP' | 'DOWN'>('ALL');

  const selectedStation = STATIONS[selectedStationCode] || STATIONS.GWL;

  return (
    <div className="flex flex-col gap-5 max-w-[1240px] mx-auto w-full">
      {/* 4 Quick Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-[#E4E8F0] border-l-4 border-l-[#1D4ED8] rounded-xl p-3.5 px-4 shadow-2xs">
          <div className="text-[10.5px] text-[#8A94A6] font-bold">WHERE IS MAINTENANCE?</div>
          <div className="text-[13.5px] font-bold text-[#0F172A] mt-1">KM 1220–1224 (Sithouli)</div>
        </div>

        <div className="bg-white border border-[#E4E8F0] border-l-4 border-l-[#047857] rounded-xl p-3.5 px-4 shadow-2xs">
          <div className="text-[10.5px] text-[#8A94A6] font-bold">WHERE IS THE TRAIN?</div>
          <div className="text-[13.5px] font-bold text-[#0F172A] mt-1">#12002 Shatabdi · KM 1242</div>
        </div>

        <div className="bg-white border border-[#E4E8F0] border-l-4 border-l-[#B91C1C] rounded-xl p-3.5 px-4 shadow-2xs">
          <div className="text-[10.5px] text-[#8A94A6] font-bold">WHERE IS THE CONFLICT?</div>
          <div className="text-[13.5px] font-bold text-[#0F172A] mt-1">UP Line fouling gap</div>
        </div>

        <div className="bg-white border border-[#E4E8F0] border-l-4 border-l-[#4338CA] rounded-xl p-3.5 px-4 shadow-2xs">
          <div className="text-[10.5px] text-[#8A94A6] font-bold">MEGA-BLOCK OPPORTUNITY</div>
          <div className="text-[13.5px] font-bold text-[#4338CA] mt-1">Gwalior–Dabra (3-in-1)</div>
        </div>
      </div>

      {/* Main Map Card */}
      <div className="bg-white border border-[#E4E8F0] rounded-xl p-6 relative shadow-2xs">
        {/* Top Controls & Legend */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-bold text-[#0F172A]">Track Display:</span>
            <div className="flex border border-[#E4E8F0] rounded-lg overflow-hidden text-[11px] font-semibold">
              <button
                type="button"
                onClick={() => setFilterTrack('ALL')}
                className={`px-2.5 py-1 ${filterTrack === 'ALL' ? 'bg-[#0A1220] text-white' : 'bg-white text-[#4B5768]'}`}
              >
                Both Tracks
              </button>
              <button
                type="button"
                onClick={() => setFilterTrack('UP')}
                className={`px-2.5 py-1 ${filterTrack === 'UP' ? 'bg-[#0A1220] text-white' : 'bg-white text-[#4B5768]'}`}
              >
                UP Main
              </button>
              <button
                type="button"
                onClick={() => setFilterTrack('DOWN')}
                className={`px-2.5 py-1 ${filterTrack === 'DOWN' ? 'bg-[#0A1220] text-white' : 'bg-white text-[#4B5768]'}`}
              >
                DOWN Main
              </button>
            </div>

            <button
              type="button"
              onClick={() => setIsTrainMoving(!isTrainMoving)}
              className="ml-2 text-[11px] font-bold text-[#1D4ED8] bg-[#EAF0FE] border border-[#C6D8FC] px-2.5 py-1 rounded-lg hover:bg-[#D9E6FE]"
            >
              {isTrainMoving ? '● Live Telemetry RTIS Active' : '○ RTIS Paused'}
            </button>
          </div>

          {/* Map Legend */}
          <div className="flex items-center gap-3.5 text-[11px] font-semibold text-[#8A94A6]">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#0A1220]" />
              <span>Station</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#1D4ED8]" />
              <span>Maintenance</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#047857]" />
              <span>Train</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#B91C1C]" />
              <span>Conflict</span>
            </div>
          </div>
        </div>

        {/* SVG Railway Schematic */}
        <div className="w-full overflow-x-auto py-2">
          <svg viewBox="0 0 1000 230" className="w-full min-w-[760px] overflow-visible">
            {/* Background Grid Lines / Track Guides */}
            <line x1="60" y1="120" x2="940" y2="120" stroke="#D8DEE9" strokeWidth="3" />

            {/* Mega-Block Shaded Zone */}
            <rect
              x="230"
              y="65"
              width="220"
              height="115"
              rx="10"
              fill="#EFEFFD"
              stroke="#D3D3FA"
              strokeDasharray="4 3"
            />
            <text
              x="340"
              y="55"
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fill="#4338CA"
              fontFamily="IBM Plex Mono, monospace"
            >
              MEGA-BLOCK ZONE · 2.0h
            </text>

            {/* Gwalior Junction (GWL) */}
            <g
              className="cursor-pointer group"
              onClick={() => setSelectedStationCode('GWL')}
            >
              <circle
                cx="80"
                cy="120"
                r={selectedStationCode === 'GWL' ? 12 : 9}
                fill={selectedStationCode === 'GWL' ? '#1D4ED8' : '#0A1220'}
                className="transition-all"
              />
              <text x="80" y="146" textAnchor="middle" fontSize="11" fontWeight="800" fontFamily="IBM Plex Mono, monospace" fill="#0F172A">
                GWL
              </text>
              <text x="80" y="160" textAnchor="middle" fontSize="9" fill="#8A94A6" fontFamily="IBM Plex Mono, monospace">
                1215.2
              </text>
            </g>

            {/* Sithouli (STL) */}
            <g
              className="cursor-pointer group"
              onClick={() => setSelectedStationCode('STL')}
            >
              <circle
                cx="340"
                cy="120"
                r={selectedStationCode === 'STL' ? 12 : 9}
                fill={selectedStationCode === 'STL' ? '#1D4ED8' : '#0A1220'}
                className="transition-all"
              />
              <text x="340" y="146" textAnchor="middle" fontSize="11" fontWeight="800" fontFamily="IBM Plex Mono, monospace" fill="#0F172A">
                STL
              </text>
              <text x="340" y="160" textAnchor="middle" fontSize="9" fill="#8A94A6" fontFamily="IBM Plex Mono, monospace">
                1222.8
              </text>

              {/* Maintenance & Warning Tags */}
              <g transform="translate(300,75)">
                <rect width="26" height="26" rx="6" fill="#EAF0FE" stroke="#C6D8FC" />
                <text x="13" y="18" textAnchor="middle" fontSize="13">🔧</text>
              </g>
              <g transform="translate(354,75)">
                <rect width="26" height="26" rx="6" fill="#FDF1E1" stroke="#F3DBAE" />
                <text x="13" y="18" textAnchor="middle" fontSize="13">⚠</text>
              </g>
            </g>

            {/* Dabra (DBA) */}
            <g
              className="cursor-pointer group"
              onClick={() => setSelectedStationCode('DBA')}
            >
              <circle
                cx="590"
                cy="120"
                r={selectedStationCode === 'DBA' ? 12 : 9}
                fill={selectedStationCode === 'DBA' ? '#1D4ED8' : '#0A1220'}
                className="transition-all"
              />
              {/* Moving Train marker near KM 1242 */}
              <circle
                cx={isTrainMoving ? 540 : 560}
                cy="98"
                r="7"
                fill="#047857"
                stroke="#fff"
                strokeWidth="2"
              >
                <animate attributeName="opacity" values="1;0.6;1" dur="2s" repeatCount="indefinite" />
              </circle>
              <text x="540" y="85" textAnchor="middle" fontSize="9" fontWeight="700" fill="#047857" fontFamily="IBM Plex Mono, monospace">
                #12002
              </text>
              <text x="590" y="146" textAnchor="middle" fontSize="11" fontWeight="800" fontFamily="IBM Plex Mono, monospace" fill="#0F172A">
                DBA
              </text>
              <text x="590" y="160" textAnchor="middle" fontSize="9" fill="#8A94A6" fontFamily="IBM Plex Mono, monospace">
                1256.4
              </text>
            </g>

            {/* Datia (DAA) */}
            <g
              className="cursor-pointer group"
              onClick={() => setSelectedStationCode('DAA')}
            >
              <circle
                cx="760"
                cy="120"
                r={selectedStationCode === 'DAA' ? 12 : 9}
                fill={selectedStationCode === 'DAA' ? '#1D4ED8' : '#0A1220'}
                className="transition-all"
              />
              <text x="760" y="146" textAnchor="middle" fontSize="11" fontWeight="800" fontFamily="IBM Plex Mono, monospace" fill="#0F172A">
                DAA
              </text>
              <text x="760" y="160" textAnchor="middle" fontSize="9" fill="#8A94A6" fontFamily="IBM Plex Mono, monospace">
                1292.6
              </text>
            </g>

            {/* Jhansi Junction (JHS) */}
            <g
              className="cursor-pointer group"
              onClick={() => setSelectedStationCode('JHS')}
            >
              <circle
                cx="920"
                cy="120"
                r={selectedStationCode === 'JHS' ? 12 : 9}
                fill={selectedStationCode === 'JHS' ? '#1D4ED8' : '#0A1220'}
                className="transition-all"
              />
              <text x="920" y="146" textAnchor="middle" fontSize="11" fontWeight="800" fontFamily="IBM Plex Mono, monospace" fill="#0F172A">
                JHS
              </text>
              <text x="920" y="160" textAnchor="middle" fontSize="9" fill="#8A94A6" fontFamily="IBM Plex Mono, monospace">
                1318.0
              </text>
            </g>

            {/* Track Label Tracks */}
            <text
              x="500"
              y="110"
              textAnchor="middle"
              fontSize="9"
              fill="#B7BFCB"
              fontFamily="IBM Plex Mono, monospace"
            >
              UP MAIN (GWL &rarr; JHS)
            </text>
            <text
              x="500"
              y="200"
              textAnchor="middle"
              fontSize="9"
              fill="#B7BFCB"
              fontFamily="IBM Plex Mono, monospace"
            >
              DOWN MAIN (JHS &rarr; GWL)
            </text>
          </svg>
        </div>

        {/* Dynamic Station Detail Card */}
        <div
          id="stationDetail"
          className="bg-[#FAFBFD] border border-[#E4E8F0] rounded-xl p-4 px-4.5 mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all"
        >
          <div>
            <div className="text-[14px] font-extrabold text-[#0F172A] flex items-center gap-2">
              <span>{selectedStation.name}</span>
              <span className="badge b-slate font-mono">{selectedStation.code}</span>
              <span className="font-mono text-[11px] text-[#8A94A6] font-semibold">{selectedStation.km}</span>
            </div>
            <div className="text-[12px] text-[#8A94A6] mt-1 max-w-xl">
              {selectedStation.desc}
            </div>
          </div>

          <div className="flex items-center gap-6 shrink-0">
            <div className="text-right">
              <div className="font-mono text-[16px] font-extrabold text-[#0F172A]">
                {selectedStation.activeBlocks}
              </div>
              <div className="text-[10.5px] text-[#8A94A6] font-semibold">Active Blocks</div>
            </div>

            <div className="text-right">
              <div className="font-mono text-[16px] font-extrabold text-[#0F172A]">
                {selectedStation.nearbyMaintenance}
              </div>
              <div className="text-[10.5px] text-[#8A94A6] font-semibold">Nearby Maintenance</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
