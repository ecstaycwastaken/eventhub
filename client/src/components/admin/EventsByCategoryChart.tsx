import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  type ChartOptions,
  type ChartData
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const EventsByCategoryChart = () => {
  const categories = [
    { name: 'Music', count: 1, color: '#2F5FDB', bgClass: 'bg-action-secondary' },
    { name: 'Technology', count: 1, color: '#8B5CF6', bgClass: 'bg-[#8B5CF6]' },
    { name: 'Sports', count: 1, color: '#0D9488', bgClass: 'bg-[#0D9488]' },
    { name: 'Arts & Culture', count: 1, color: '#D97706', bgClass: 'bg-[#D97706]' },
  ];

  const totalCategoryEvents = categories.reduce((sum, c) => sum + c.count, 0);

  const donutChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '75%',
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#111111',
        titleFont: { family: 'Inter, sans-serif' },
        bodyFont: { family: 'Inter, sans-serif' },
        padding: 10,
        cornerRadius: 8,
      }
    }
  };

  const donutChartData: ChartData<'doughnut'> = {
    labels: categories.map(c => c.name),
    datasets: [
      {
        data: categories.map(c => c.count),
        backgroundColor: categories.map(c => c.color),
        borderWidth: 0,
        hoverOffset: 4
      }
    ]
  };

  return (
    <div className="lg:col-span-1 bg-white rounded-lg shadow-resting border border-border p-5 flex flex-col h-full">
      <div className="mb-1.5 shrink-0">
        <h2 className="text-lg font-bold text-ink">Events by Category</h2>
        <p className="text-xs text-text-secondary">Active distribution by type</p>
      </div>
      <div className="flex-1 flex flex-col items-center justify-between min-h-0 mt-1">
        <div className="w-24 h-24 relative shrink-0 flex items-center justify-center">
          <Doughnut options={donutChartOptions} data={donutChartData} />
          <div className="absolute flex flex-col items-center justify-center pointer-events-none">
            <span className="text-lg font-bold text-ink leading-none">{totalCategoryEvents}</span>
            <span className="text-[8px] uppercase tracking-wider text-text-secondary mt-0.5 leading-none">Total</span>
          </div>
        </div>
        
        <div className="w-full mt-2 overflow-y-auto max-h-32 pr-1 px-1" style={{ scrollbarWidth: 'thin' }}>
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border/80 text-[9px] uppercase font-bold tracking-wider text-text-secondary/80">
                <th className="pb-1 font-bold">Category</th>
                <th className="pb-1 text-right font-bold">Active Events</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {categories.map((c) => (
                <tr key={c.name} className="hover:bg-bg-subtle/50 transition-colors group">
                  <td className="py-1 font-medium text-ink flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${c.bgClass} shrink-0`}></span>
                    {c.name}
                  </td>
                  <td className="py-1 text-right font-semibold text-text-secondary">{c.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EventsByCategoryChart;
