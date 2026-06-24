import { LuCopy } from 'react-icons/lu';

const RecentAttendances = () => {
  return (
    <div className="bg-white rounded-lg shadow-resting border border-border flex flex-col overflow-hidden">
      <div className="p-5 border-b border-border flex justify-between items-center bg-bg-page">
        <h3 className="font-bold text-ink">Recent Attendances</h3>
        <button className="text-action-secondary text-sm font-semibold hover:text-primary-hover transition-colors flex items-center gap-1">View all &rarr;</button>
      </div>
      <div className="flex flex-col divide-y divide-border">
        {/* Attendance Item */}
        <div className="p-5 flex items-center gap-4 hover:bg-bg-subtle transition-colors cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-pink-100 text-pink-700 font-bold flex items-center justify-center shrink-0 text-sm">
            JD
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-ink truncate text-[14px]">Juan Dela Cruz</h4>
            <p className="text-[12px] text-text-secondary truncate mt-0.5">SoundWave Music Festival</p>
          </div>
          <div className="flex flex-col items-end gap-1.5 shrink-0">
            <span className="px-2 py-0.5 rounded-pill text-[10px] font-bold tracking-wide bg-warning-bg text-warning-text uppercase">Registered</span>
            <span className="text-[11px] font-mono text-text-muted flex items-center gap-1">SWF-9841 <LuCopy size={12}/></span>
          </div>
        </div>
        {/* Attendance Item */}
        <div className="p-5 flex items-center gap-4 hover:bg-bg-subtle transition-colors cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center shrink-0 text-sm">
            GM
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-ink truncate text-[14px]">Grace Mendoza</h4>
            <p className="text-[12px] text-text-secondary truncate mt-0.5">SoundWave Music Festival</p>
          </div>
          <div className="flex flex-col items-end gap-1.5 shrink-0">
            <span className="px-2 py-0.5 rounded-pill text-[10px] font-bold tracking-wide bg-warning-bg text-warning-text uppercase">Registered</span>
            <span className="text-[11px] font-mono text-text-muted flex items-center gap-1">SWF-9842 <LuCopy size={12}/></span>
          </div>
        </div>
        {/* Attendance Item */}
        <div className="p-5 flex items-center gap-4 hover:bg-bg-subtle transition-colors cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-lime-100 text-lime-700 font-bold flex items-center justify-center shrink-0 text-sm">
            CR
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-ink truncate text-[14px]">Carla Ramos</h4>
            <p className="text-[12px] text-text-secondary truncate mt-0.5">SoundWave Music Festival</p>
          </div>
          <div className="flex flex-col items-end gap-1.5 shrink-0">
            <span className="px-2 py-0.5 rounded-pill text-[10px] font-bold tracking-wide bg-success-bg text-success-text uppercase">Attended</span>
            <span className="text-[11px] font-mono text-text-muted flex items-center gap-1">SWF-9843 <LuCopy size={12}/></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentAttendances;
