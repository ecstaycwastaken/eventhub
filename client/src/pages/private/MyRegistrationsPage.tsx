import { useEffect } from "react";
import { useHttp } from "@/hooks/useHttp";
import { Spinner } from "@/components/ui/spinner";
import { EventList } from "@/components/event-browser/EventList"; 
import type { EventWithCategory } from "@/types/event";

interface RegisteredEventsResponse {
    has_registered_events: boolean;
    events: EventWithCategory[];
    total_events: number;
}

function MyRegistrationsPage() {
    const { data, loading, error, sendRequest } = useHttp<RegisteredEventsResponse>();

    useEffect(() => {
        const fetchRegistrations = () => {
            sendRequest({
                method: 'GET',
                url: '/api/v1/event/registered-events'
            });
        };
        fetchRegistrations();

        window.addEventListener('rsvp-changed', fetchRegistrations);
        return () => window.removeEventListener('rsvp-changed', fetchRegistrations);
    }, [sendRequest]);

    const events = data?.events || [];
    const totalEvents = data?.total_events || 0;
    const errorMessage = error ? (error.message || "Failed to load events") : null;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const upcomingEvents = events.filter(e => {
        const status = e.user_status || e.event_attendances?.[0]?.status;
        const eventDate = new Date(e.date);
        eventDate.setHours(0, 0, 0, 0);
        return status === 'registered' && eventDate >= today;
    });

    const pastEvents = events.filter(e => {
        const status = e.user_status || e.event_attendances?.[0]?.status;
        const eventDate = new Date(e.date);
        eventDate.setHours(0, 0, 0, 0);
        return status === 'attended' || (status === 'registered' && eventDate < today);
    });

  return (
    <div className="flex flex-col font-dm min-h-screen px-8 md:px-20 py-10 bg-[#F9FAFB]">
        <div className="flex flex-col w-full px-12 py-10 bg-linear-to-b from-[#A72C35] to-[#5C171C] rounded-xl mb-10 shadow-lg relative overflow-hidden">
            <div className="relative z-10">
                <p className="text-white/70 text-sub-1 mb-3 font-medium uppercase tracking-wider">
                    YOUR ACCOUNT
                </p>
                <h1 className="text-white text-heading-1 font-bold mb-8 text-4xl">
                    My Registrations
                </h1>
                
                {loading ? (
                    <Spinner size="md" variant="white" className="mt-2" />
                ) : (
                    <>
                        <h1 className="text-white text-heading-1 mb-1">
                            {totalEvents}
                        </h1>
                        <p className="text-white/70 text-sub-1 tracking-widest uppercase">
                            Total Events
                        </p>
                    </>
                )}
            </div>
            <div className="absolute -right-20 -top-40 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl pointer-events-none"></div>
        </div>

        <div className="w-full mb-8">
            <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
            <EventList 
                events={upcomingEvents}
                loading={loading}
                error={errorMessage}
            />
        </div>

        {(!loading && pastEvents.length > 0) && (
            <div className="w-full mb-8">
                <h2 className="text-2xl font-bold mb-4">Past & Attended Events</h2>
                <EventList 
                    events={pastEvents}
                    loading={false}
                    error={null}
                />
            </div>
        )}
        
    </div>
  )
}

export default MyRegistrationsPage