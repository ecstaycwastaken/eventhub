import { FaSearch } from "react-icons/fa";
import type { Category } from "@/types/category";

interface AdminEventsFilterProps {
  search: string;
  setSearch: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  activeCategories: Category[];
}

export default function AdminEventsFilter({
  search,
  setSearch,
  category,
  setCategory,
  activeCategories,
}: AdminEventsFilterProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[24rem_1fr] w-full items-center gap-4 mb-8">
      {/* Search */}
      <div className="flex items-center w-full border border-border-strong rounded-pill px-4 py-2 bg-white focus-within:ring-2 focus-within:ring-brand-red/20 transition-shadow">
        <FaSearch className="text-text-muted mr-2" />
        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full focus:outline-none text-body-1 text-text-primary bg-transparent"
        />
      </div>

      {/* Category Pill Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full pb-2 md:pb-0">
        {activeCategories.map((c) => {
          const isActive = category === (c.name.toLowerCase() === 'all' ? 'all' : c.id);
          return (
            <button
              key={c.id}
              onClick={() => setCategory(c.name.toLowerCase() === 'all' ? 'all' : c.id)}
              className={`whitespace-nowrap px-4 py-1.5 rounded-pill text-sm font-medium transition-colors ${
                isActive
                  ? "bg-brand-red text-white border border-transparent"
                  : "bg-white text-text-primary border border-border-strong hover:bg-bg-subtle"
              }`}
            >
              {c.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
