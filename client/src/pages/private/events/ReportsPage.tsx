import { useState, useEffect, useCallback } from 'react';
import { useHttp } from '@/hooks/useHttp';
import { Spinner } from '@/components/ui/spinner';
import { IoMdAlert } from 'react-icons/io';
import { FiUsers, FiCheckSquare, FiCheckCircle, FiTrendingUp } from 'react-icons/fi';
import type { EventsReportResponse } from '@/types/event';

import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function ReportsPage() {
  const { data, loading, error, sendRequest } = useHttp<EventsReportResponse>();
  const [selectedEventId, setSelectedEventId] = useState('');

  const fetchReport = useCallback(() => {
    const url = selectedEventId
      ? `/api/v1/event/my-events/report?event_id=${selectedEventId}`
      : '/api/v1/event/my-events/report';
    sendRequest({ method: 'GET', url });
  }, [selectedEventId, sendRequest]);

  useEffect(() => {
    fetchReport();
  }, [fetchReport]);

  const handleEventChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedEventId(e.target.value);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatShortDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  // --- KPI Cards Config ---
  const kpiCards = data
    ? [
        { icon: FiUsers, value: data.total_registered, label: 'TOTAL REGISTERED', color: 'text-gray-600' },
        { icon: FiCheckSquare, value: data.total_confirmed, label: 'CONFIRMED', color: 'text-gray-600' },
        { icon: FiCheckCircle, value: data.total_checked_in, label: 'CHECKED IN', color: 'text-green-600' },
        { icon: FiTrendingUp, value: data.available_slots, label: 'AVAILABLE SLOTS', color: 'text-gray-600' },
      ]
    : [];

  // --- Doughnut Chart ---
  const doughnutData = data
    ? {
        labels: ['Confirmed', 'Checked In'],
        datasets: [
          {
            data: [data.registration_status.confirmed, data.registration_status.checked_in],
            backgroundColor: ['#E63946', '#2D2D2D'],
            borderWidth: 0,
            hoverOffset: 6,
          },
        ],
      }
    : null;

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '60%',
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#111111',
        titleFont: { family: 'DM Sans, sans-serif' as const },
        bodyFont: { family: 'DM Sans, sans-serif' as const },
        padding: 10,
        cornerRadius: 8,
      },
    },
  };

  // --- Bar Chart ---
  const barData = data
    ? {
        labels: (data.registration_overtime || []).map((r) => formatShortDate(r.date)),
        datasets: [
          {
            data: (data.registration_overtime || []).map((r) => r.count),
            backgroundColor: '#E63946',
            borderRadius: 4,
            maxBarThickness: 40,
          },
        ],
      }
    : null;

  const maxBarVal = data
    ? Math.max(...(data.registration_overtime || []).map((r) => r.count), 1)
    : 1;

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#111111',
        titleFont: { family: 'DM Sans, sans-serif' as const },
        bodyFont: { family: 'DM Sans, sans-serif' as const },
        padding: 10,
        cornerRadius: 8,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#9CA3AF', font: { family: 'DM Sans, sans-serif', size: 11 } },
        border: { display: false },
      },
      y: {
        min: 0,
        max: Math.ceil(maxBarVal * 1.25),
        ticks: {
          stepSize: Math.max(1, Math.ceil(maxBarVal * 1.25 / 4)),
          color: '#9CA3AF',
          font: { family: 'DM Sans, sans-serif', size: 11 },
          padding: 8,
        },
        border: { display: false },
        grid: { color: '#F3F4F6' },
      },
    },
  };

  // --- Status Badge ---
  const statusBadge = (status: string) => {
    if (status === 'attended') {
      return (
        <span className="bg-[#2D2D2D] text-white px-3 py-1 rounded-md text-xs font-medium inline-block">
          Checked In
        </span>
      );
    }
    return (
      <span className="bg-[#DCFCE7] text-success-text px-3 py-1 rounded-md text-xs font-medium inline-block">
        Confirmed
      </span>
    );
  };

  // --- Render ---
  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-12 font-dm">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-heading-2 font-bold text-gray-900 leading-tight">Reports</h1>
          <p className="text-gray-500 text-caption-1">Event performance and registration analytics</p>
        </div>
        <select
          id="event-selector"
          value={selectedEventId}
          onChange={handleEventChange}
          className="border border-gray-200 rounded-lg px-4 py-2.5 bg-white text-caption-2 outline-none focus:border-gray-400 cursor-pointer w-full md:w-auto min-w-55"
        >
          <option value="">All Events Overview</option>
          {(data?.events_list || []).map((evt) => (
            <option key={evt.id} value={evt.id}>
              {evt.title}
            </option>
          ))}
        </select>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex-1 flex flex-col items-center justify-center min-h-100">
          <Spinner size="md" variant="primary" className="mb-4" />
          <p className="text-text-secondary font-medium animate-pulse">Loading report data...</p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="flex-1 flex flex-col items-center justify-center min-h-100">
          <IoMdAlert className="text-warning-text w-12 h-12 mb-4" />
          <h3 className="text-lg font-bold text-ink mb-1">Failed to load data</h3>
          <p className="text-text-secondary">{error.message || 'An error occurred.'}</p>
          <button
            onClick={fetchReport}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover font-semibold transition-colors cursor-pointer"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Report Content */}
      {data && !loading && !error && (
        <>
          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {kpiCards.map((card) => (
              <div
                key={card.label}
                className="bg-white border border-gray-200 rounded-xl p-5 flex items-start gap-3"
              >
                <div className={`mt-0.5 ${card.color}`}>
                  <card.icon size={20} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                  <p className="text-xs uppercase tracking-wider text-gray-500 mt-1">{card.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Registration Status Doughnut */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h2 className="font-bold text-lg text-gray-900 mb-4">Registration Status</h2>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 min-h-55">
                {doughnutData && (data.registration_status.confirmed > 0 || data.registration_status.checked_in > 0) ? (
                  <>
                    <div className="w-45 h-45 relative shrink-0">
                      <Doughnut data={doughnutData} options={doughnutOptions} />
                    </div>
                    <div className="flex flex-col gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-[#E63946] shrink-0"></span>
                        <span className="text-[#E63946] font-medium">Confirmed ({data.registration_status.confirmed})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-[#2D2D2D] shrink-0"></span>
                        <span className="text-[#2D2D2D] font-medium">Checked In ({data.registration_status.checked_in})</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <p className="text-gray-400 text-sm italic">No registration data available</p>
                )}
              </div>
            </div>

            {/* Registrations Over Time Bar */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h2 className="font-bold text-lg text-gray-900 mb-4">Registrations Over Time</h2>
              <div className="min-h-55 relative">
                {barData && barData.labels.length > 0 ? (
                  <Bar data={barData} options={barOptions} />
                ) : (
                  <div className="flex items-center justify-center h-full min-h-55">
                    <p className="text-gray-400 text-sm italic">No overtime data available</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Attendee List */}
          <div>
            <div className="bg-[#2D2D2D] text-white rounded-t-xl px-6 py-3 flex justify-between items-center">
              <span className="font-bold">Attendee List</span>
              <span className="text-sm">{data.attendees.length} registrations</span>
            </div>
            <div className="bg-white border border-gray-200 rounded-b-xl overflow-hidden overflow-x-auto custom-scrollbar">
              <table className="w-full text-left border-collapse min-w-175">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-6 py-3 text-xs uppercase tracking-wider text-gray-500 font-semibold">Attendee</th>
                    <th className="px-6 py-3 text-xs uppercase tracking-wider text-gray-500 font-semibold">Code</th>
                    <th className="px-6 py-3 text-xs uppercase tracking-wider text-gray-500 font-semibold">Status</th>
                    <th className="px-6 py-3 text-xs uppercase tracking-wider text-gray-500 font-semibold">Registered</th>
                    <th className="px-6 py-3 text-xs uppercase tracking-wider text-gray-500 font-semibold">Checked In</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {data.attendees.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-gray-400 italic">
                        No attendees yet
                      </td>
                    </tr>
                  )}
                  {data.attendees.map((attendee, idx) => (
                    <tr key={`${attendee.code}-${idx}`} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-bold text-gray-900">{attendee.full_name}</p>
                        <p className="text-gray-500 text-sm mt-0.5">{attendee.email}</p>
                      </td>
                      <td className="px-6 py-4 font-mono text-sm text-gray-600">
                        {attendee.code}
                      </td>
                      <td className="px-6 py-4">
                        {statusBadge(attendee.status)}
                      </td>
                      <td className="px-6 py-4 text-gray-600 text-sm">
                        {formatDate(attendee.registered_at)}
                      </td>
                      <td className="px-6 py-4 text-gray-600 text-sm">
                        {attendee.checked_in_at ? formatDate(attendee.checked_in_at) : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ReportsPage;