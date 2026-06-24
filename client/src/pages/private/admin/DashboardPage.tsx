import { useEffect } from 'react';
import {
  StatsSummary,
  RegistrationVsAttendanceChart,
  EventsByCategoryChart,
  RecentEvents,
  RecentAttendances
} from '@/components/admin/dashboard';
import { useHttp } from '@/hooks/useHttp';
import { Spinner } from '@/components/ui/spinner';
import { IoMdAlert } from "react-icons/io";

interface AdminOverviewResponse {
  total_events: number;
  total_users: number;
  total_attendances: number;
  total_registrations: number;
  registration_data: { date: string; registrations: number }[];
  attendance_data: { date: string; attendances: number }[];
  events_by_category: { category_id: number; category_name: string | null; event_count: number }[];
  recent_events: { id: number; title: string; capacity: number; banner_image: string | null; created_at: string; category: string | null; attendances: number }[];
  recent_attendances: { user_id: number; user_fullname: string; user_profile_image: string | null; event_id: number; event_title: string; code: string; status: string }[];
}

const DashboardPage = () => {
  const { data, loading, error, sendRequest } = useHttp<AdminOverviewResponse>();

  useEffect(() => {
    sendRequest({
      url: '/api/v1/admin/overview',
      method: 'GET'
    });
  }, [sendRequest]);

  return (
    <div className="flex flex-col h-full bg-bg-page w-full max-w-300 mx-auto pb-12">
      <div className="w-full rounded-lg my-6 flex flex-col justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold mb-1">SITE OVERVIEW</h1>
          <span className="text-[11px] uppercase tracking-wider font-medium mb-2 block text-text-secondary">
            Full administrative access • Site Moderator
          </span>
        </div>
      </div>

      {loading && (
        <div className="flex-1 flex flex-col items-center justify-center min-h-100">
          <Spinner size="md" variant="primary" className="mb-4" />
          <p className="text-text-secondary font-medium animate-pulse">Loading overview data...</p>
        </div>
      )}

      {error && !loading && (
        <div className="flex-1 flex flex-col items-center justify-center min-h-100">
          <IoMdAlert className="text-warning-text w-12 h-12 mb-4" />
          <h3 className="text-lg font-bold text-ink mb-1">Failed to load data</h3>
          <p className="text-text-secondary">{error.message || 'An error occurred.'}</p>
          <button 
            onClick={() => sendRequest({ url: '/api/v1/admin/overview', method: 'GET' })}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover font-semibold transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {data && !loading && !error && (
        <>
          <StatsSummary 
            totalEvents={data.total_events}
            totalUsers={data.total_users}
            totalAttendances={data.total_attendances}
            totalRegistrations={data.total_registrations}
          />

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <RegistrationVsAttendanceChart 
              registrationData={data.registration_data}
              attendanceData={data.attendance_data}
            />
            <EventsByCategoryChart 
              eventsByCategory={data.events_by_category}
            />
          </div>

          {/* Lists Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RecentEvents 
              recentEvents={data.recent_events}
            />
            <RecentAttendances 
              recentAttendances={data.recent_attendances}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardPage;