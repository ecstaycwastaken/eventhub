import { useState, useEffect } from "react";
import { useHttp } from "@/hooks/useHttp";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FiEdit2, FiTrash2, FiSearch } from "react-icons/fi";
import { IoMdAlert } from "react-icons/io";
import { toast } from "sonner";

import type { EventWithCategory } from "@/types/event";
import Button from "@/components/Button";
import { Spinner } from "@/components/ui/spinner";
import DeleteConfirmationModal from "@/components/ui/DeleteConfirmationModal";

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

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-200">
                <thead className="bg-[#2D2D2D] text-white text-label uppercase tracking-wider">
                    <tr>
                        <th className="p-4 rounded-tl-xl">Event</th>
                        <th className="p-4">Date</th>
                        <th className="p-4">Category</th>
                        <th className="p-4">Capacity</th>
                        <th className="p-4 text-center rounded-tr-xl">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-caption-2">
                    {loading && (
                        <tr>
                            <td colSpan={5} className="p-16 text-center">
                                <div className="flex flex-col items-center justify-center gap-3 text-gray-500">
                                    <Spinner size="md" variant="primary" />
                                    <p className="font-medium text-caption-1">Fetching your events...</p>
                                </div>
                            </td>
                        </tr>
                    )}

                    {error && !loading && (
                        <tr>
                            <td colSpan={5} className="p-12">
                                <div className="flex-1 flex flex-col items-center justify-center py-10">
                                    <IoMdAlert className="text-warning-text w-12 h-12 mb-4 mx-auto" />
                                    <h3 className="text-lg font-bold text-ink mb-1">Failed to load data</h3>
                                    <p className="text-text-secondary">{errorMessage || 'An error occurred.'}</p>
                                    <Button
                                        bgColorClass="bg-brand-red"
                                        className={'px-5 py-2.5 rounded-md font-medium shadow-sm text-button-lg mt-5'}
                                        onClick={() => sendRequest({ method: 'GET', url: '/api/v1/event/my-events/' })}
                                    >
                                        Try Again
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    )}

                    {filteredEvents.length === 0 && !loading && !error && (
                        <tr>
                            <td colSpan={5} className="p-12 text-center text-gray-500">
                                {searchQuery ? 'No events match your search.' : 'No events found. Click "+ New Event" to get started!'}
                            </td>
                        </tr>
                    )}
                    
                    {!loading && !error && filteredEvents.map((event) => {
                        const date = new Date(event.date);
                        const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                        
                        const attendeesCount = event.event_attendances_count || 0;
                        const fillPercentage = Math.min((attendeesCount / event.capacity) * 100, 100);

                        return (
                            <tr key={event.id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="p-4">
                                    <p className="font-bold text-gray-900">{event.title}</p>
                                    <p className="text-gray-500 text-caption-3 mt-0.5">{event.venue}</p>
                                </td>
                                <td className="p-4 text-gray-600">
                                    {formattedDate}
                                </td>
                                <td className="p-4">
                                    <span className="border border-gray-200 text-gray-600 px-3 py-1 rounded-md text-caption-3">
                                        {event.category.name}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <p className="text-caption-3 text-gray-900 mb-1.5">{attendeesCount}/{event.capacity}</p>
                                    <div className="w-full bg-gray-100 rounded-full h-1">
                                        <div className="bg-[#CB2229] h-1 rounded-full transition-all duration-500" style={{ width: `${fillPercentage}%` }}></div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center justify-center gap-4">
                                        <Button 
                                            bgColorClass="bg-transparent"
                                            textColorClass="text-gray"
                                            onClick={() => navigate(`/u/my-events/edit/${event.id}`)}>
                                            <FiEdit2 size={16} />
                                        </Button>

                                        <Button 
                                            bgColorClass="bg-transparent"
                                            textColorClass="text-brand-red"
                                            onClick={() => handleDeleteClick(event)}>
                                            <FiTrash2 size={16} />
                                        </Button>   
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>

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