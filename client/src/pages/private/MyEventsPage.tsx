import { useEffect } from "react";
import { useHttp } from "@/hooks/useHttp";
import { useNavigate } from "react-router-dom";
import { EventList } from "@/components/event-browser/EventList";
import type { EventWithCategory } from "@/types/event";
import Button from "@/components/Button";

interface MyEventsResponse {
    hasEvents: boolean;
    events: EventWithCategory[];
    total_events: number;
}

function MyEventsPage() {
    const { data, loading, error, sendRequest } = useHttp<MyEventsResponse>();
    const navigate = useNavigate();

    useEffect(() => {
        sendRequest({
            method: 'GET',
            url: '/api/v1/event/my-events/'
        })
    }, [sendRequest]);

    const eventsToShow = data?.events || [];
    const totalEvents = data?.total_events || 0;
    const errorMessage = error?.message || null;

  return (
    <div className="flex flex-col font-dm min-h-screen px-20 py-10">
        <div className="flex flex-col w-full px-12 py-10 bg-linear-to-b from-[#A72C35] to-[#5C171C] rounded-xl">
            <p className="text-white/70 text-sub-1 mb-3">
                YOUR ACCOUNT
            </p>
            <h1 className="text-white text-heading-1 mb-7">
                My Events
            </h1>
            <h1 className="text-white text-heading-1">
                {loading ?  'Retrieving your events...' : `${totalEvents}`}
            </h1>
            <p className="text-white/70 text-sub-1">
                TOTAL
            </p>
        </div>

        <div className="flex flex-col gap-10 w-full mt-10">
            <Button
                bgColorClass="bg-brand-red"
                className={'self-end text-button-lg py-3 w-50 rounded-xl flex justify-center items-center gap-2'}
                onClick={() => navigate('/u/my-events/create-event')}
            >
                Create Event
            </Button>
            <EventList events={eventsToShow} loading={loading} error={errorMessage} />
        </div>
    </div>
  )
}

export default MyEventsPage