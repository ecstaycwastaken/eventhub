import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useHttp } from "@/hooks/useHttp";
import Button from "@/components/Button";
import { Spinner } from "@/components/ui/spinner";
import { type EventItem } from "@/components/event-browser/EventCard";
import type { Category } from '@/types/category';
import { EditEventForm } from "@/components/event-form";

function AdminEditEventPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const { sendRequest: fetchEvent, loading: isFetchingEvent, data: eventData } = useHttp<EventItem>();
    const { data: fetchedCategories, sendRequest: fetchCategories, loading: isLoadingCategories } = useHttp<Category[]>();

    useEffect(() => {
        fetchCategories({
            method: 'GET',
            url: '/api/v1/categories'
        });
        
        if (id) {
            fetchEvent({
                method: 'GET',
                url: `/api/v1/event/${id}`
            });
        }
    }, [fetchCategories, fetchEvent, id]);

    if (isFetchingEvent || isLoadingCategories) {
        return (
            <div className="flex items-center justify-center w-full min-h-[70vh]">
                <Spinner size="lg" />
            </div>
        );
    }

    if (!eventData) {
        return (
            <div className="flex flex-col items-center justify-center w-full min-h-[70vh] gap-4">
                <p className="text-body-1 text-black">Event not found.</p>
                <Button onClick={() => navigate('/admin/events')} bgColorClass="bg-brand-red px-6 py-3 rounded-xl text-white text-button-md flex items-center gap-2">
                    Back to Events
                </Button>
            </div>
        );
    }

    return (
        <EditEventForm 
            eventData={eventData} 
            fetchedCategories={fetchedCategories || []} 
            id={id!} 
            onCancel={() => navigate('/admin/events')}
            onSuccess={() => navigate('/admin/events')}
        />
    );
}

export default AdminEditEventPage;
