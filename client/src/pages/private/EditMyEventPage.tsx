import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useHttp } from "@/hooks/useHttp";
import Button from "@/components/Button";
import { Spinner } from "@/components/ui/spinner";
import { type EventItem } from "@/components/event-browser/EventCard";
import type { Category } from '@/types/category';
import { EditEventForm } from "@/components/event-form";

function EditMyEventPage() {
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
            <div className="flex items-center justify-center w-full min-h-[80vh]">
                <Spinner size="lg" />
            </div>
        );
    }

    if (!eventData) {
        return (
            <div className="flex flex-col items-center justify-center w-full min-h-[80vh] gap-4">
                <p className="text-body-1 text-black">Event not found.</p>
                <Button onClick={() => navigate('/u/my-events')} bgColorClass="bg-brand-red px-6 py-3 rounded-xl text-white text-button-md flex items-center gap-2">
                    Back to My Events
                </Button>
            </div>
        );
    }

    return (
        <EditEventForm 
            eventData={eventData} 
            fetchedCategories={fetchedCategories || []} 
            id={id!} 
            bannerStyle="px-20 py-10"
            onCancel={() => navigate('/u/my-events')}
            onSuccess={() => navigate('/u/my-events')}
        />
    );
}

export default EditMyEventPage;
