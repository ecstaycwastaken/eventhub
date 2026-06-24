import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  type ChartOptions,
  type ChartData
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const RegistrationVsAttendanceChart = () => {
  const lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: '#111111',
        titleFont: { family: 'Inter, sans-serif' },
        bodyFont: { family: 'Inter, sans-serif' },
        padding: 10,
        cornerRadius: 8,
      },
    },
    scales: {
      x: {
        grid: { display: false, drawOnChartArea: false },
        ticks: { color: '#9CA3AF', font: { family: 'Inter, sans-serif', size: 11 } },
        border: { display: false }
      },
      y: {
        min: 0,
        max: 600,
        ticks: { 
          stepSize: 150, 
          color: '#9CA3AF', 
          font: { family: 'Inter, sans-serif', size: 10 },
          padding: 10
        },
        border: { display: false },
        grid: { color: '#F3F4F6' }
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    },
    elements: {
      line: {
        tension: 0.4
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4
      }
    }
  };

  const lineChartData: ChartData<'line'> = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Attended',
        data: [120, 160, 210, 240, 290, 420, 280],
        borderColor: '#0D9488', // Teal
        backgroundColor: 'rgba(13, 148, 136, 0.1)',
        borderWidth: 3,
        fill: false,
      },
      {
        label: 'Registered',
        data: [90, 120, 150, 190, 240, 360, 210],
        borderColor: '#2F5FDB', // Action Secondary
        backgroundColor: 'rgba(47, 95, 219, 0.1)',
        borderWidth: 3,
        fill: false,
      }
    ],
  };

  return (
    <div className="lg:col-span-2 bg-white rounded-lg shadow-resting border border-border p-6 flex flex-col h-[350px]">
      <div className="flex justify-between items-start mb-6 shrink-0">
        <div>
          <h2 className="text-lg font-bold text-ink">Registration vs Attendance</h2>
          <p className="text-sm text-text-secondary">Event Attendances • past 7 days</p>
        </div>
        <div className="flex gap-4 text-xs font-medium mt-1">
          <span className="flex items-center gap-1.5 text-text-secondary">
            <span className="w-2.5 h-2.5 rounded-full bg-action-secondary"></span> Registered
          </span>
          <span className="flex items-center gap-1.5 text-text-secondary">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-500"></span> Attended
          </span>
        </div>
      </div>
      <div className="flex-1 w-full relative min-h-0">
        <Line options={lineChartOptions} data={lineChartData} />
      </div>
    </div>
  );
};

export default RegistrationVsAttendanceChart;
