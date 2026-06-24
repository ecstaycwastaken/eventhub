import { useState } from "react";
import { toast } from "sonner";
import { useHttp } from "@/hooks/useHttp";
import { 
    BasicDetailsSection,
    DateTimeSection,
    ImageUploadField,
    LocationSection,
    PreviewSidebar,
    TicketsSection
} from "./index";
import Button from "@/components/Button";
import { type EventItem } from "@/components/event-browser/EventCard";
import type { Category } from '@/types/category';
import type { EventCreationFormData } from "@/types/event";
import { FaArrowRight } from "react-icons/fa6";

export interface EditEventFormProps {
    eventData: EventItem;
    fetchedCategories: Category[];
    id: string;
    bannerStyle?: string;
    onCancel: () => void;
    onSuccess: () => void;
}

function EditEventForm({ eventData, fetchedCategories, id, bannerStyle, onCancel, onSuccess }: EditEventFormProps) {
    const [localError, setLocalError] = useState<string | null>(null);
    const [bannerImage, setBannerImage] = useState<File | null>(null);

    const [formData, setFormData] = useState<EventCreationFormData>(() => {
        let eventDate = "";
        let eventTime = "";
        
        if (eventData.date) {
            const dateObj = new Date(eventData.date);
            if (!isNaN(dateObj.getTime())) {
                const yyyy = dateObj.getFullYear();
                const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
                const dd = String(dateObj.getDate()).padStart(2, '0');
                eventDate = `${yyyy}-${mm}-${dd}`;
                
                const hh = String(dateObj.getHours()).padStart(2, '0');
                const min = String(dateObj.getMinutes()).padStart(2, '0');
                eventTime = `${hh}:${min}`;
            }
        }

        return {
            title: eventData.title || "",
            description: eventData.description || "",
            categoryId: eventData.category?.id || eventData.category_id || null,
            eventDate,
            eventTime,
            venue: eventData.venue || "",
            capacity: eventData.capacity?.toString() || "0",
            price: eventData.price?.toString() || "0",
            ticketType: Number(eventData.price) > 0 ? "Paid" : "Free"
        };
    });

    const [previewImage, setPreviewImage] = useState<string | null>(eventData.banner_image || null);
    const { sendRequest: updateEvent, loading: isSubmitting, error } = useHttp<EventItem>();

    const handleChange = (field: string, value: string | number) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const activeCategories = fetchedCategories || [];
    const selectedCategory = activeCategories.find(c => c.id === formData.categoryId);

    const previewDate = formData.eventDate && formData.eventTime 
        ? new Date(`${formData.eventDate}T${formData.eventTime}`).toISOString() 
        : new Date().toISOString();

    const previewEvent: EventItem = {
        id: eventData.id || 'preview',
        user_id: eventData.user_id || 'preview',
        category_id: formData.categoryId || '0',
        title: formData.title || 'Your Event Name',
        description: formData.description || 'Preview description',
        date: previewDate,
        venue: formData.venue || 'Venue Location',
        capacity: Number(formData.capacity) || 0,
        price: formData.ticketType === "Free" ? 0.0 : (Number(formData.price) || 0),
        banner_image: previewImage || "",
        created_at: eventData.created_at || new Date().toISOString(),
        updated_at: eventData.updated_at || new Date().toISOString(),
        category: {
            id: formData.categoryId || '0',
            name: selectedCategory ? selectedCategory.name : 'Category',
            color: selectedCategory ? selectedCategory.color : '#3B82F6'
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setBannerImage(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLocalError(null);

        if (!formData.categoryId) {
            setLocalError("Please select a category for your event.");
            return;
        }
        
        const combinedDateTime = `${formData.eventDate} ${formData.eventTime}`;

        const submitData = new FormData();
        // IMPORTANT: Because we are sending files to a Laravel PUT endpoint,
        // we must send a POST request with '_method' set to 'PUT'.
        submitData.append('_method', 'PUT');
        submitData.append('title', formData.title);
        submitData.append('description', formData.description);
        submitData.append('category', formData.categoryId);
        submitData.append('date', combinedDateTime);
        submitData.append('venue', formData.venue);
        submitData.append('capacity', formData.capacity);
        submitData.append('price', formData.ticketType === "Free" ? "0.0" : formData.price);

        if (bannerImage) {
            submitData.append('banner_image', bannerImage);
        }
        
        try {
            const response = await updateEvent({
                method: 'POST',
                url: `/api/v1/event/update/${id}`,
                data: submitData
            });

            if (response) {
                toast.success('Event updated successfully!', {
                    classNames: {
                        toast:  'bg-[#F1FFEB] text-[#44A872] font-dm font-medium rounded-xl border border-[#44A872]'
                    }
                });
                
                onSuccess();
            }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            toast.error("Failed to update event. Please check the form.");
        }
    }

    return (
        <div className={`flex flex-col font-dm w-full pb-10 ${bannerStyle || ''}`}>
            <div className="flex flex-col w-full px-12 py-14 bg-linear-to-b from-[#A72C35] to-[#5C171C] rounded-xl">
                <h1 className="text-white text-heading-1">
                    Edit Event
                </h1>
                <p className="text-white/70 text-sub-1">
                    Update the details below to save changes to your event.
                </p>
            </div>

            <div className="max-w-285 w-full mx-auto px-4 lg:px-10 mt-8 flex flex-col lg:flex-row gap-8 items-start">
                <main className="w-full lg:w-[65%] bg-white rounded-xl border border-gray shadow-sm p-6 md:p-8">
                    <form id="edit-event-form" onSubmit={handleSubmit} className="flex flex-col">

                        <ImageUploadField 
                            previewImage={previewImage} 
                            onImageChange={handleImageChange} 
                        />

                        <BasicDetailsSection 
                            formData={formData} 
                            handleChange={handleChange} 
                            activeCategories={activeCategories} 
                            isLoadingCategories={false}
                            error={error}
                            localError={localError}
                        />

                        <DateTimeSection
                            formData={formData} 
                            handleChange={handleChange}
                        />

                        <LocationSection
                            formData={formData} 
                            handleChange={handleChange}
                        />
                        
                        <TicketsSection
                            formData={formData} 
                            handleChange={handleChange}
                        />

                        <section className="border-t border-gray pt-7 mt-2">
                            <div className="bg-yellow border border-border-yellow p-3 rounded-xl mb-6">
                                <p className="text-caption-3 text-[#973C00]">
                                    <b>IMPORTANT</b>: Please ensure that all event details provided are accurate and fully comply with our <span className="underline">Terms of Service</span>. We maintain a strict zero-tolerance policy for any illegal activities. It is your sole responsibility to ensure that your event is lawful, safe, and does not promote unauthorized commerce, restricted substances, or illicit behavior. Failure to comply will result in immediate event cancellation, account termination, and potential reporting to local law enforcement.
                                </p>
                            </div>
                        </section>
                        
                        <div className="flex flex-col-reverse md:flex-row justify-between items-center border-t border-gray pt-8 mt-4 gap-4">
                            <Button
                                bgColorClass="bg-transparent"
                                textColorClass="text-black"
                                className="border border-gray text-button-md py-3 rounded-xl w-full md:w-[50%]"
                                type="button"
                                onClick={onCancel}
                            >
                                Cancel
                            </Button>
                            <Button
                                bgColorClass="bg-brand-red"
                                className="flex items-center justify-center gap-2 text-button-md py-3 rounded-xl w-full md:w-[50%]
                                    disabled:opacity-70 disabled:cursor-not-allowed"
                                type="submit"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Saving changes...' : (
                                    <>Save changes <FaArrowRight /></>
                                )}
                            </Button>
                        </div>
                    </form>
                </main>

                <PreviewSidebar 
                    previewEvent={previewEvent} 
                    isSubmitting={isSubmitting} 
                />
            </div>
        </div>
    )
}

export default EditEventForm;
