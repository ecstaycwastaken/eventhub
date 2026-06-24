import Button from "@/components/Button";
import { FaPlus } from "react-icons/fa";

interface AdminEventsHeaderProps {
  totalEvents: number;
  onCreateClick: () => void;
}

export default function AdminEventsHeader({ totalEvents, onCreateClick }: AdminEventsHeaderProps) {
  return (
    <div className="w-full px-8 py-10 bg-linear-to-b from-[#681A20] to-[#9E2A33] rounded-xl flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
      <div className="flex flex-col">
        <p className="text-white/80 text-xs font-semibold tracking-wider uppercase mb-1">
          Administration • Full CRUD Access
        </p>
        <h1 className="text-white text-heading-1 font-bold">
          Events Management
        </h1>
        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-white text-3xl font-bold">{totalEvents}</span>
          <span className="text-white/70 text-sm">Total events</span>
        </div>
      </div>
      <Button 
        bgColorClass="bg-brand-red"
        className="px-6 py-3 flex items-center justify-center gap-2 rounded-xl text-button-md font-semibold text-white shadow-resting hover:shadow-raised transition-all"
        onClick={onCreateClick}
      >
        <FaPlus size={14} />
        Create Event
      </Button>
    </div>
  );
}
