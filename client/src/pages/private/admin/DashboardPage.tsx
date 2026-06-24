import {
  StatsSummary,
  RegistrationVsAttendanceChart,
  EventsByCategoryChart,
  RecentEvents,
  RecentAttendances
} from '@/components/admin';

const DashboardPage = () => {
  return (
    <div className="flex flex-col h-full bg-bg-page w-full max-w-300 mx-auto pb-12">
      <div className="w-full rounded-lg my-6 flex flex-col justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold mb-1">SITE OVERVIEW</h1>
          <span className="text-[11px] uppercase tracking-wider font-medium mb-2 block">
            Full administrative access • Site Moderator
          </span>
        </div>
      </div>

      <StatsSummary />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <RegistrationVsAttendanceChart />
        <EventsByCategoryChart />
      </div>

      {/* Lists Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentEvents />
        <RecentAttendances />
      </div>
    </div>
  );
};

export default DashboardPage;