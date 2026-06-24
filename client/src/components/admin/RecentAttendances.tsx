import { LuCopy } from 'react-icons/lu';

export interface RecentAttendance {
  user_id: number;
  user_fullname: string;
  user_profile_image: string | null;
  event_id: number;
  event_title: string;
  code: string;
  status: string;
}

export interface RecentAttendancesProps {
  recentAttendances: RecentAttendance[];
}

const getInitials = (name: string) => {
  const parts = name.split(' ').filter(p => p.trim() !== '');
  if (parts.length === 0) return '??';
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const getRandomBgColor = (name: string) => {
  const colors = [
    'bg-pink-100 text-pink-700',
    'bg-indigo-100 text-indigo-700',
    'bg-lime-100 text-lime-700',
    'bg-amber-100 text-amber-700',
    'bg-teal-100 text-teal-700'
  ];
  const charCode = name.charCodeAt(0) || 0;
  return colors[charCode % colors.length];
};

const RecentAttendances = ({ recentAttendances }: RecentAttendancesProps) => {
  const safeRecentAttendances = recentAttendances || [];
  return (
    <div className="bg-white rounded-lg shadow-resting border border-border flex flex-col overflow-hidden h-full">
      <div className="p-5 border-b border-border flex justify-between items-center bg-bg-page shrink-0">
        <h3 className="font-bold text-ink">Recent Attendances</h3>
      </div>
      <div className="flex flex-col divide-y divide-border overflow-y-auto custom-scrollbar" style={{ maxHeight: '350px' }}>
        {safeRecentAttendances.length > 0 ? (
          safeRecentAttendances.map((attendance, index) => {
            const isAttended = attendance.status === 'attended';
            const statusClass = isAttended 
              ? 'bg-success-bg text-success-text' 
              : 'bg-warning-bg text-warning-text';
            
            const profileUrl = attendance.user_profile_image ? (attendance.user_profile_image.startsWith('http') ? attendance.user_profile_image : `${import.meta.env.VITE_SERVER_URL}/storage/${attendance.user_profile_image}`) : null;

            return (
              <div key={`${attendance.event_id}-${attendance.user_id}-${index}`} className="p-5 flex items-center gap-4 hover:bg-bg-subtle transition-colors cursor-pointer">
                {profileUrl ? (
                   <div className="w-10 h-10 rounded-full shrink-0 border border-border overflow-hidden">
                     <img src={profileUrl} alt={attendance.user_fullname} className="w-full h-full object-cover" />
                   </div>
                ) : (
                  <div className={`w-10 h-10 rounded-full font-bold flex items-center justify-center shrink-0 text-sm ${getRandomBgColor(attendance.user_fullname)}`}>
                    {getInitials(attendance.user_fullname)}
                  </div>
                )}
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-ink truncate text-[14px]">{attendance.user_fullname}</h4>
                  <p className="text-[12px] text-text-secondary truncate mt-0.5">{attendance.event_title}</p>
                </div>
                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <span className={`px-2 py-0.5 rounded-pill text-[10px] font-bold tracking-wide uppercase ${statusClass}`}>
                    {attendance.status}
                  </span>
                  <span className="text-[11px] font-mono text-text-muted flex items-center gap-1" title="Copy Code">
                    {attendance.code} <LuCopy size={12} className="cursor-pointer hover:text-ink"/>
                  </span>
                </div>
              </div>
            );
          })
        ) : (
           <div className="p-8 text-center text-text-secondary italic">No recent attendances found.</div>
        )}
      </div>
    </div>
  );
};

export default RecentAttendances;
