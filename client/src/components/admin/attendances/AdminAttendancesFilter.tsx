import { FaSearch } from "react-icons/fa";

interface AdminAttendancesFilterProps {
  search: string;
  setSearch: (val: string) => void;
  status: string;
  setStatus: (val: string) => void;
}

export default function AdminAttendancesFilter({
  search,
  setSearch,
  status,
  setStatus,
}: AdminAttendancesFilterProps) {
  const statuses = ["all", "registered", "attended"];

  return (
    <div className="flex flex-col sm:flex-row w-full items-start sm:items-center gap-4 mb-6">
      {/* Search Input */}
      <div className="flex flex-1 w-full relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FaSearch className="text-text-muted" size={14} />
        </div>
        <input
          type="text"
          placeholder="Search by user or event name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-white border border-border-strong rounded-pill text-body-1 text-ink placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
        />
      </div>

      {/* Status Filter Tabs */}
      <div className="flex items-center gap-2 bg-bg-subtle p-1 rounded-pill border border-border self-stretch sm:self-auto shrink-0 overflow-x-auto no-scrollbar">
        {statuses.map((s) => {
          const isActive = status === s;
          return (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`
                px-4 py-1.5 rounded-pill text-sm font-semibold capitalize whitespace-nowrap transition-all duration-200
                ${isActive 
                  ? "bg-brand-red text-white shadow-resting" 
                  : "bg-transparent text-text-secondary hover:text-ink hover:bg-gray-200/50"
                }
              `}
            >
              {s}
            </button>
          );
        })}
      </div>
    </div>
  );
}
