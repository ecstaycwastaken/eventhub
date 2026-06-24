import { LuCalendar, LuUser, LuUserCheck, LuDollarSign } from 'react-icons/lu';

const StatsSummary = () => {
  return (
    <div className="w-full bg-white rounded-lg mb-8 shadow-sm border border-border-gray">
      <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
        
        <div className="p-6 flex flex-col items-center justify-center text-center border-r border-black/10">
          <span className="text-3xl font-bold mb-1">6</span>
          <span className="text-[11px] uppercase tracking-wider font-medium text-gray-400 mb-2 flex items-center gap-1.5"><LuCalendar /> TOTAL EVENTS</span>
          <span className="text-sm text-gray-500">~ 1 ongoing</span>
        </div>

        <div className="p-6 flex flex-col items-center justify-center text-center border-r border-black/10">
          <span className="text-3xl font-bold mb-1">10</span>
          <span className="text-[11px] uppercase tracking-wider font-medium text-gray-400 mb-2 flex items-center gap-1.5"><LuUser /> REGISTERED USERS</span>
          <span className="text-sm text-gray-500">~ 10 regular users</span>
        </div>

        <div className="p-6 flex flex-col items-center justify-center text-center border-r border-black/10">
          <span className="text-3xl font-bold mb-1">12</span>
          <span className="text-[11px] uppercase tracking-wider font-medium text-gray-400 mb-2 flex items-center gap-1.5"><LuUserCheck /> TOTAL ATTENDANCES</span>
          <span className="text-sm text-gray-500">~ 7 attended</span>
        </div>

        <div className="p-6 flex flex-col items-center justify-center text-center">
          <span className="text-3xl font-bold mb-1">₱19.3M</span>
          <span className="text-[11px] uppercase tracking-wider font-medium text-gray-400 mb-2 flex items-center gap-1.5"><LuDollarSign /> REVENUE</span>
          <span className="text-sm text-gray-500">~ combined ticket sales</span>
        </div>

      </div>
    </div>
  );
};

export default StatsSummary;
