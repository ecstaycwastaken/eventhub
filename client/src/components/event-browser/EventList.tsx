
import EventCard, { type EventItem } from '@/components/EventCard';

interface EventListProps {
  events: EventItem[];
  loading: boolean;
  error: string | null;
}

export function EventList({ events, loading, error }: EventListProps) {
  return (
    <div className="mx-auto grid grid-cols-1 gap-6 px-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {loading && <p className="col-span-full text-center text-gray-500">Loading events...</p>}
      {error && <p className="col-span-full text-center text-red-500">{error}</p>}
      {!loading && !error && events.map((event) => <EventCard key={event.id} event={event} />)}
      {!loading && !error && events.length === 0 && (
        <p className="col-span-full text-center text-gray-500">No events found.</p>
      )}
    </div>
  );
}
