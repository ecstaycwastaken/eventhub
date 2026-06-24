import { LuMusic, LuMonitor, LuTrophy } from 'react-icons/lu';

const RecentEvents = () => {
  return (
    <div className="bg-white rounded-lg shadow-resting border border-border flex flex-col overflow-hidden">
      <div className="p-5 border-b border-border flex justify-between items-center bg-bg-page">
        <h3 className="font-bold text-ink">Recent Events</h3>
        <button className="text-action-secondary text-sm font-semibold hover:text-primary-hover transition-colors flex items-center gap-1">View all &rarr;</button>
      </div>
      <div className="flex flex-col divide-y divide-border">
        {/* Event Item */}
        <div className="p-5 flex items-center gap-4 hover:bg-bg-subtle transition-colors cursor-pointer group">
          <div className="w-12 h-12 bg-gray-100 rounded-md shrink-0 flex items-center justify-center border border-border group-hover:border-gray-300 transition-colors">
             <LuMusic className="text-gray-400" size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-ink truncate text-[15px]">SoundWave Music Festival</h4>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="px-2 py-0.5 rounded text-[11px] font-semibold text-action-secondary bg-action-secondary/10">Music</span>
              <span className="text-[12px] text-text-secondary">77% full</span>
            </div>
          </div>
          <div className="shrink-0">
             <span className="px-2.5 py-1 rounded-pill text-[10px] font-bold tracking-wider bg-blue-50 text-blue-700 uppercase border border-blue-200">Upcoming</span>
          </div>
        </div>
        {/* Event Item */}
        <div className="p-5 flex items-center gap-4 hover:bg-bg-subtle transition-colors cursor-pointer group">
          <div className="w-12 h-12 bg-gray-100 rounded-md shrink-0 flex items-center justify-center border border-border group-hover:border-gray-300 transition-colors">
             <LuMonitor className="text-gray-400" size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-ink truncate text-[15px]">DevCon Philippines 2026</h4>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="px-2 py-0.5 rounded text-[11px] font-semibold text-[#8B5CF6] bg-[#8B5CF6]/10">Technology</span>
              <span className="text-[12px] text-text-secondary">99% full</span>
            </div>
          </div>
          <div className="shrink-0">
             <span className="px-2.5 py-1 rounded-pill text-[10px] font-bold tracking-wider bg-blue-50 text-blue-700 uppercase border border-blue-200">Upcoming</span>
          </div>
        </div>
        {/* Event Item */}
        <div className="p-5 flex items-center gap-4 hover:bg-bg-subtle transition-colors cursor-pointer group">
          <div className="w-12 h-12 bg-gray-100 rounded-md shrink-0 flex items-center justify-center border border-border group-hover:border-gray-300 transition-colors">
             <LuTrophy className="text-gray-400" size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-ink truncate text-[15px]">Metro Marathon 2026</h4>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="px-2 py-0.5 rounded text-[11px] font-semibold text-[#0D9488] bg-[#0D9488]/10">Sports</span>
              <span className="text-[12px] text-text-secondary">78% full</span>
            </div>
          </div>
          <div className="shrink-0">
             <span className="px-2.5 py-1 rounded-pill text-[10px] font-bold tracking-wider bg-blue-50 text-blue-700 uppercase border border-blue-200">Upcoming</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentEvents;
