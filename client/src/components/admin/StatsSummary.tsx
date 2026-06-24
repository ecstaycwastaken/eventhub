import { LuCalendar, LuUser, LuUserCheck, LuClipboardList } from 'react-icons/lu';

export interface StatsSummaryProps {
  totalEvents: number;
  totalUsers: number;
  totalAttendances: number;
  totalRegistrations: number;
}

const StatsSummary = ({ totalEvents, totalUsers, totalAttendances, totalRegistrations }: StatsSummaryProps) => {
  return (
    <div className="w-full bg-white rounded-lg mb-8 shadow-sm border border-border-gray">
      <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
        
        <div className="p-6 flex flex-col items-center justify-center text-center border-r border-black/10">
          <span className="text-3xl font-bold mb-1">{totalEvents || 0}</span>
          <span className="text-[11px] uppercase tracking-wider font-medium text-gray-400 mb-2 flex items-center gap-1.5"><LuCalendar /> TOTAL EVENTS</span>
          <span className="text-sm text-gray-500">Across all categories</span>
        </div>

        <div className="p-6 flex flex-col items-center justify-center text-center border-r border-black/10">
          <span className="text-3xl font-bold mb-1">{totalUsers || 0}</span>
          <span className="text-[11px] uppercase tracking-wider font-medium text-gray-400 mb-2 flex items-center gap-1.5"><LuUser /> REGISTERED USERS</span>
          <span className="text-sm text-gray-500">Total accounts created</span>
        </div>

        <div className="p-6 flex flex-col items-center justify-center text-center border-r border-black/10">
          <span className="text-3xl font-bold mb-1">{totalAttendances || 0}</span>
          <span className="text-[11px] uppercase tracking-wider font-medium text-gray-400 mb-2 flex items-center gap-1.5"><LuUserCheck /> TOTAL ATTENDANCES</span>
          <span className="text-sm text-gray-500">Users who attended</span>
        </div>

        <div className="p-6 flex flex-col items-center justify-center text-center">
          <span className="text-3xl font-bold mb-1">{totalRegistrations || 0}</span>
          <span className="text-[11px] uppercase tracking-wider font-medium text-gray-400 mb-2 flex items-center gap-1.5"><LuClipboardList /> TOTAL REGISTRATIONS</span>
          <span className="text-sm text-gray-500">Combined event registrations</span>
        </div>

      </div>
    </div>
  );
};

export default StatsSummary;
