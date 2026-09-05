import React, { useState } from 'react';
import { BlockItem, Department } from '../types';

interface ProposeBlockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitBlock: (block: BlockItem) => void;
}

export const ProposeBlockModal: React.FC<ProposeBlockModalProps> = ({
  isOpen,
  onClose,
  onSubmitBlock
}) => {
  const [department, setDepartment] = useState<'Civil' | 'Signal' | 'Traction'>('Civil');
  const [section, setSection] = useState<string>('GWL–DBA (Gwalior – Dabra)');
  const [trackLine, setTrackLine] = useState<string>('UP Main Line');
  const [startTime, setStartTime] = useState<string>('14:00');
  const [endTime, setEndTime] = useState<string>('16:00');
  const [description, setDescription] = useState<string>(
    'Track geometry rectification & ultrasonic flaw detection.'
  );
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>('High');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `blk-${Date.now().toString().slice(-4)}`;
    const randomCodeNum = Math.floor(100 + Math.random() * 900);
    const code = `BLK-${randomCodeNum}`;

    // calculate duration
    const [startH, startM] = startTime.split(':').map(Number);
    const [endH, endM] = endTime.split(':').map(Number);
    let diffHours = (endH * 60 + endM - (startH * 60 + startM)) / 60;
    if (diffHours <= 0) diffHours = 2.0;

    const newBlock: BlockItem = {
      id,
      code,
      title: description.slice(0, 48),
      section: section.split(' ')[0],
      trackLine,
      chainage: 'KM 1224/00 – 1230/00',
      startTime,
      endTime,
      durationHours: Number(diffHours.toFixed(1)),
      department: department as Department,
      status: 'Proposed',
      riskFactor: priority === 'High' ? 65 : priority === 'Medium' ? 40 : 20,
      riskLevel: priority,
      description,
      interlocked: false
    };

    onSubmitBlock(newBlock);
    onClose();
  };

  return (
    <div
      id="overlay"
      className="fixed inset-0 bg-[#0A1220]/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        id="modal"
        className="bg-white rounded-[14px] w-[460px] max-w-[94vw] p-5.5 shadow-2xl border border-[#E4E8F0] animate-scale-up"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[15px] font-extrabold text-[#0F172A]">
            Propose Maintenance Block
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-[#8A94A6] hover:text-[#0F172A] text-[18px] leading-none cursor-pointer p-1"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          {/* Department Segments */}
          <div>
            <label className="text-[11.5px] font-bold text-[#4B5768] block mb-1.5">
              Department
            </label>
            <div className="flex gap-1.5" id="deptSeg">
              <button
                type="button"
                onClick={() => setDepartment('Civil')}
                className={`flex-1 py-2 rounded-lg text-[12.5px] font-bold transition-colors cursor-pointer border ${
                  department === 'Civil'
                    ? 'bg-[#0A1220] border-[#0A1220] text-white'
                    : 'bg-white border-[#E4E8F0] text-[#4B5768] hover:border-[#CBD5E1]'
                }`}
              >
                Civil (Engg)
              </button>
              <button
                type="button"
                onClick={() => setDepartment('Signal')}
                className={`flex-1 py-2 rounded-lg text-[12.5px] font-bold transition-colors cursor-pointer border ${
                  department === 'Signal'
                    ? 'bg-[#0A1220] border-[#0A1220] text-white'
                    : 'bg-white border-[#E4E8F0] text-[#4B5768] hover:border-[#CBD5E1]'
                }`}
              >
                Signal
              </button>
              <button
                type="button"
                onClick={() => setDepartment('Traction')}
                className={`flex-1 py-2 rounded-lg text-[12.5px] font-bold transition-colors cursor-pointer border ${
                  department === 'Traction'
                    ? 'bg-[#0A1220] border-[#0A1220] text-white'
                    : 'bg-white border-[#E4E8F0] text-[#4B5768] hover:border-[#CBD5E1]'
                }`}
              >
                Traction
              </button>
            </div>
          </div>

          {/* Corridor Section */}
          <div>
            <label className="text-[11.5px] font-bold text-[#4B5768] block mb-1.5">
              Corridor Section
            </label>
            <select
              value={section}
              onChange={(e) => setSection(e.target.value)}
              className="w-full border border-[#E4E8F0] rounded-lg p-2 px-3 text-[13px] text-[#0F172A] bg-white focus:outline-none focus:border-[#1D4ED8]"
            >
              <option value="GWL–DBA (Gwalior – Dabra)">GWL–DBA (Gwalior – Dabra)</option>
              <option value="GWL–JHS (Gwalior – Jhansi)">GWL–JHS (Gwalior – Jhansi)</option>
              <option value="STLI–AEH (Sithouli – Antri)">STLI–AEH (Sithouli – Antri)</option>
            </select>
          </div>

          {/* Track Line & Time Window Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11.5px] font-bold text-[#4B5768] block mb-1.5">
                Track Line
              </label>
              <select
                value={trackLine}
                onChange={(e) => setTrackLine(e.target.value)}
                className="w-full border border-[#E4E8F0] rounded-lg p-2 px-3 text-[13px] text-[#0F172A] bg-white focus:outline-none focus:border-[#1D4ED8]"
              >
                <option value="UP Main Line">UP Main Line</option>
                <option value="DN Main Line">DN Main Line</option>
                <option value="Both Lines (Full Corridor)">Both Lines</option>
              </select>
            </div>

            <div>
              <label className="text-[11.5px] font-bold text-[#4B5768] block mb-1.5">
                Time Window
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full border border-[#E4E8F0] rounded-lg p-2 text-[12.5px] text-[#0F172A] font-mono bg-white focus:outline-none focus:border-[#1D4ED8]"
                />
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full border border-[#E4E8F0] rounded-lg p-2 text-[12.5px] text-[#0F172A] font-mono bg-white focus:outline-none focus:border-[#1D4ED8]"
                />
              </div>
            </div>
          </div>

          {/* Priority */}
          <div>
            <label className="text-[11.5px] font-bold text-[#4B5768] block mb-1.5">
              Priority Urgency
            </label>
            <div className="flex gap-2">
              {(['Low', 'Medium', 'High'] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriority(p)}
                  className={`flex-1 py-1.5 rounded-lg text-[12px] font-bold border transition-colors cursor-pointer ${
                    priority === p
                      ? p === 'High'
                        ? 'bg-[#B91C1C] border-[#B91C1C] text-white'
                        : p === 'Medium'
                        ? 'bg-[#B45309] border-[#B45309] text-white'
                        : 'bg-[#4B5768] border-[#4B5768] text-white'
                      : 'bg-white border-[#E4E8F0] text-[#4B5768]'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-[11.5px] font-bold text-[#4B5768] block mb-1.5">
              Maintenance Task Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-[#E4E8F0] rounded-lg p-2 px-3 text-[13px] text-[#0F172A] bg-white resize-none focus:outline-none focus:border-[#1D4ED8]"
            />
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end gap-2.5 mt-2 pt-2 border-t border-[#EDF0F5]">
            <button
              type="button"
              onClick={onClose}
              className="border border-[#E4E8F0] bg-white text-[#4B5768] hover:bg-[#FAFBFD] font-bold text-[13px] px-3.5 py-2 rounded-lg cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#1D4ED8] hover:bg-[#1743B0] text-white font-bold text-[13px] px-4 py-2 rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
