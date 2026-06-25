import { useState, useEffect } from "react";
import { useHttp } from "@/hooks/useHttp";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { toast } from "sonner";

import type { EventWithCategory } from "@/types/event";
import Button from "@/components/Button";
import DeleteConfirmationModal from "@/components/ui/DeleteConfirmationModal";
import EventTable from "@/components/event-browser/EventTable";

interface MyEventsResponse {
    hasEvents: boolean;
    events: EventWithCategory[];
    total_events: number;
}

function MyEventsPage() {
    const { data, loading, error, sendRequest } = useHttp<MyEventsResponse>(); 
    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');

    useEffect(() => {
        sendRequest({
            method: 'GET',
            url: '/api/v1/event/my-events/'
        })
    }, [sendRequest]);

    const eventsToShow = data?.events || [];
    const totalEvents = data?.total_events || 0;
    const errorMessage = error?.message || null;

    const filteredEvents = eventsToShow.filter((event) => 
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.category.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setSearchQuery(val);
        
        const newParams = new URLSearchParams(searchParams.toString());
        if (val.trim()) {
            newParams.set('q', val.trim());
        } else {
            newParams.delete('q');
        }
        setSearchParams(newParams);
    };

    const { sendRequest: deleteRequest, loading: isDeleting } = useHttp();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [eventToDelete, setEventToDelete] = useState<EventWithCategory | null>(null);

    const handleDeleteClick = (event: EventWithCategory) => {
        setEventToDelete(event);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!eventToDelete) return;

        try {
            const response = await deleteRequest({
                method: 'DELETE',
                url: `/api/v1/event/delete/${eventToDelete.id}`
            });

            if (response) {
                toast.success("Event deleted successfully!", {
                    classNames: {
                        toast: 'bg-[#F1FFEB] text-[#44A872] font-dm font-medium rounded-xl border border-[#44A872]'
                    }
                });
                
                setIsDeleteModalOpen(false);
                setEventToDelete(null);
                
                sendRequest({ method: 'GET', url: '/api/v1/event/my-events/' });
            }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            toast.error("Failed to delete event. Please try again.");
        }
    };

  return (
    <div className="p-8 md:p-12 font-dm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
                <h1 className="text-heading-2 font-bold text-gray-900 leading-tight">Events Created</h1>
                <p className="text-gray-500 font-caption-1">{loading ? 'Loading...' : `${totalEvents} total events`}</p>
            </div>
            <Button
                bgColorClass="bg-brand-red"
                className={'px-5 py-2.5 rounded-lg font-medium shadow-sm text-button-lg'}
                onClick={() => navigate('/u/my-events/create-event')}
            >
                + New Event
            </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                    type="text" 
                    placeholder="Search events..." 
                    className="w-full pl-11 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg outline-none focus:border-gray-400 transition-colors"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>
        </div>

        <EventTable 
            events={filteredEvents}
            loading={loading}
            error={error}
            errorMessage={errorMessage}
            searchQuery={searchQuery}
            onRetry={() => sendRequest({ method: 'GET', url: '/api/v1/event/my-events/' })}
            onEdit={(id) => navigate(`/u/my-events/edit/${id}`)}
            onDelete={handleDeleteClick}
        />

        <DeleteConfirmationModal
            isOpen={isDeleteModalOpen}
            title="Delete Event"
            description={`Are you sure you want to delete "${eventToDelete?.title}"? This action cannot be undone.`}
            isDeleting={isDeleting}
            onCancel={() => {
                setIsDeleteModalOpen(false);
                setEventToDelete(null);
            }}
            onConfirm={handleConfirmDelete}
        />
    </div>
  )
}

export default MyEventsPage