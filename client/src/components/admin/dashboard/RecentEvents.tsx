import { LuMusic, LuMonitor, LuTrophy, LuCalendar, LuImage } from 'react-icons/lu';

export interface RecentEvent {
  id: number;
  title: string;
  capacity: number;
  banner_image: string | null;
  created_at: string;
  category: string | null;
  attendances: number;
}

export interface RecentEventsProps {
  recentEvents: RecentEvent[];
}

const getCategoryStyles = (categoryName: string | null) => {
  const name = (categoryName || '').toLowerCase();
  if (name.includes('music')) return { icon: <LuMusic className="text-gray-400" size={20} />, colorClass: 'text-action-secondary bg-action-secondary/10' };
  if (name.includes('tech')) return { icon: <LuMonitor className="text-gray-400" size={20} />, colorClass: 'text-[#8B5CF6] bg-[#8B5CF6]/10' };
  if (name.includes('sport')) return { icon: <LuTrophy className="text-gray-400" size={20} />, colorClass: 'text-[#0D9488] bg-[#0D9488]/10' };
  if (name.includes('art')) return { icon: <LuImage className="text-gray-400" size={20} />, colorClass: 'text-[#D97706] bg-[#D97706]/10' };
  return { icon: <LuCalendar className="text-gray-400" size={20} />, colorClass: 'text-gray-600 bg-gray-100' };
};

const RecentEvents = ({ recentEvents }: RecentEventsProps) => {
  const safeRecentEvents = recentEvents || [];
  return (
    <div className="bg-white rounded-lg shadow-resting border border-border flex flex-col overflow-hidden h-full">
      <div className="p-5 border-b border-border flex justify-between items-center bg-bg-page shrink-0">
        <h3 className="font-bold text-ink">Recent Events</h3>
      </div>
      <div className="flex flex-col divide-y divide-border overflow-y-auto custom-scrollbar" style={{ maxHeight: '350px' }}>
        {safeRecentEvents.length > 0 ? (
          safeRecentEvents.map((event) => {
            const { icon, colorClass } = getCategoryStyles(event.category);
            const percentage = event.capacity > 0 ? Math.round((event.attendances / event.capacity) * 100) : 0;
            const bannerUrl = event.banner_image ? (event.banner_image.startsWith('http') ? event.banner_image : `${import.meta.env.VITE_SERVER_URL}/storage/${event.banner_image}`) : null;

            return (
              <div key={event.id} className="p-5 flex items-center gap-4 hover:bg-bg-subtle transition-colors cursor-pointer group">
                {bannerUrl ? (
                   <div className="w-12 h-12 rounded-md shrink-0 border border-border overflow-hidden">
                     <img src={bannerUrl} alt={event.title} className="w-full h-full object-cover" />
                   </div>
                ) : (
                  <div className="w-12 h-12 bg-gray-100 rounded-md shrink-0 flex items-center justify-center border border-border group-hover:border-gray-300 transition-colors">
                     {icon}
                  </div>
                )}
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-ink truncate text-[15px]">{event.title}</h4>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${colorClass}`}>
                      {event.category || 'Uncategorized'}
                    </span>
                    <span className="text-[12px] text-text-secondary">{percentage}% full</span>
                  </div>
                </div>
                <div className="shrink-0">
                   <span className="px-2.5 py-1 rounded-pill text-[10px] font-bold tracking-wider bg-blue-50 text-blue-700 uppercase border border-blue-200">
                     {new Date(event.created_at) > new Date() ? 'Upcoming' : 'Recent'}
                   </span>
                </div>
              </div>
            );
          })
        ) : (
           <div className="p-8 text-center text-text-secondary italic">No recent events found.</div>
        )}
      </div>
    </div>
  );
};

export default RecentEvents;
