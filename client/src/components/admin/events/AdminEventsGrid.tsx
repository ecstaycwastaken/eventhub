import Button from "@/components/Button";
import EventCard from "@/components/event-browser/EventCard";
import type { EventItem } from "@/components/event-browser/EventCard";

interface AdminEventsGridProps {
  events: EventItem[];
  loading: boolean;
  error: { message?: string } | null;
  onClearFilters: () => void;
}

export default function AdminEventsGrid({
  events,
  loading,
  error,
  onClearFilters,
}: AdminEventsGridProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-red"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-danger text-body-1">{error.message || "Failed to load events"}</p>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-bg-subtle rounded-xl border border-dashed border-border-strong">
        <p className="text-text-secondary text-body-1 font-medium">No events found matching your criteria.</p>
        <Button 
          bgColorClass="bg-white" 
          textColorClass="text-ink"
          className="mt-4 border border-border-strong rounded-lg px-4 py-2 hover:bg-gray-50 text-button-sm font-semibold"
          onClick={onClearFilters}
        >
          Clear Filters
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
      {events.map((event: EventItem) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
