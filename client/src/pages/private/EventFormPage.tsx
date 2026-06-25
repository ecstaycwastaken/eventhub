import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useHttp } from "@/hooks/useHttp";
import { EventForm } from "@/components/event-form";
import Button from "@/components/Button";
import { Spinner } from "@/components/ui/spinner";
import { FaArrowLeft } from "react-icons/fa6";
import type { Category } from "@/types/category";

function EventFormPage() {
    const navigate = useNavigate();
    const { data: fetchedCategories, sendRequest: fetchCategories, loading: isLoadingCategories } = useHttp<Category[]>();

    useEffect(() => {
        fetchCategories({
            method: 'GET',
            url: '/api/v1/categories'
        });
    }, [fetchCategories]);

    if (isLoadingCategories) {
        return (
            <div className="flex items-center justify-center w-full min-h-[80vh]">
                <Spinner size="lg" />
            </div>
        );
    }

    return (
        <div className="flex flex-col font-dm min-h-screen px-20 py-10">
            <div className="mb-4">
                <Button 
                    bgColorClass="bg-transparent"
                    textColorClass="text-black"
                    className="flex items-center gap-2 text-button-sm"
                    onClick={() => navigate('/home/my-events')}
                >
                    <FaArrowLeft size={20} /> Back to My Events
                </Button>
            </div>

            <EventForm 
                mode="create"
                fetchedCategories={fetchedCategories || []}
                isLoadingCategories={isLoadingCategories}
                onCancel={() => navigate('/u/my-events')}
                onSuccess={() => navigate('/u/my-events')}
            />
        </div>
    );
}

export default EventFormPage;