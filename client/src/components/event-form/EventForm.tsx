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
import DeleteConfirmationModal from "@/components/ui/DeleteConfirmationModal";

export interface EventFormProps {
    mode: 'create' | 'edit';
    /** Required when mode === 'edit' */
    eventData?: EventItem;
    /** Required when mode === 'edit' */
    id?: string;
    fetchedCategories: Category[];
    isLoadingCategories?: boolean;
    bannerStyle?: string;
    onCancel: () => void;
    onSuccess: () => void;
}

const LABELS = {
    create: {
        heading: 'Create New Event',
        subheading: 'Fill in the details below to publish your event.',
        cancelButton: 'Discard',
        submitButton: 'Publish event',
        submittingButton: 'Publishing...',
        successToast: 'Event published successfully!',
        errorToast: 'Failed to publish event. Please check the form.',
    },
    edit: {
        heading: 'Edit Event',
        subheading: 'Update the details below to save changes to your event.',
        cancelButton: 'Cancel',
        submitButton: 'Save changes',
        submittingButton: 'Saving changes...',
        successToast: 'Event updated successfully!',
        errorToast: 'Failed to update event. Please check the form.',
    },
} as const;

function buildInitialFormData(mode: 'create' | 'edit', eventData?: EventItem): EventCreationFormData {
    if (mode === 'create' || !eventData) {
        return {
            title: "",
            description: "",
            categoryId: null,
            eventDate: "",
            eventTime: "",
            venue: "",
            capacity: "",
            price: "",
            ticketType: "Free",
        };
    }

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
        ticketType: Number(eventData.price) > 0 ? "Paid" : "Free",
    };
}

function EventForm({ mode, eventData, id, fetchedCategories, isLoadingCategories = false, bannerStyle, onCancel, onSuccess }: EventFormProps) {
    const labels = LABELS[mode];
    const [localError, setLocalError] = useState<string | null>(null);
    const [bannerImage, setBannerImage] = useState<File | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const [formData, setFormData] = useState<EventCreationFormData>(
        () => buildInitialFormData(mode, eventData)
    );

    const [previewImage, setPreviewImage] = useState<string | null>(
        mode === 'edit' && eventData?.banner_image ? eventData.banner_image : null
    );

    const { sendRequest, loading: isSubmitting, error } = useHttp<EventItem>();
    const { sendRequest: deleteEvent, loading: isDeleting } = useHttp();

    const handleDelete = async () => {
        if (!id) return;
        try {
            const response = await deleteEvent({
                method: 'DELETE',
                url: `/api/v1/event/delete/${id}`
            });
            if (response) {
                toast.success("Event deleted successfully!", {
                    classNames: {
                        toast: 'bg-[#F1FFEB] text-[#44A872] font-dm font-medium rounded-xl border border-[#44A872]'
                    }
                });
                setIsDeleteModalOpen(false);
                onSuccess();
            }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            toast.error("Failed to delete event. Please try again.");
        }
    };

    const handleChange = (field: string, value: string | number) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const activeCategories = fetchedCategories || [];
    const selectedCategory = activeCategories.find(c => c.id === formData.categoryId);

    const previewDate = formData.eventDate && formData.eventTime 
        ? new Date(`${formData.eventDate}T${formData.eventTime}`).toISOString() 
        : new Date().toISOString();

    const previewEvent: EventItem = {
        id: eventData?.id || 'preview',
        user_id: eventData?.user_id || 'preview',
        category_id: formData.categoryId || '0',
        title: formData.title || 'Your Event Name',
        description: formData.description || 'Preview description',
        date: previewDate,
        venue: formData.venue || 'Venue Location',
        capacity: Number(formData.capacity) || 0,
        price: formData.ticketType === "Free" ? 0.0 : (Number(formData.price) || 0),
        banner_image: previewImage || "",
        created_at: eventData?.created_at || new Date().toISOString(),
        updated_at: eventData?.updated_at || new Date().toISOString(),
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

        if (mode === 'edit') {
            // IMPORTANT: Because we are sending files to a Laravel PUT endpoint,
            // we must send a POST request with '_method' set to 'PUT'.
            submitData.append('_method', 'PUT');
        }

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
        
        const url = mode === 'create'
            ? '/api/v1/event/create'
            : `/api/v1/event/update/${id}`;

        try {
            const response = await sendRequest({
                method: 'POST',
                url,
                data: submitData
            });

            if (response) {
                toast.success(labels.successToast, {
                    classNames: {
                        toast:  'bg-[#F1FFEB] text-[#44A872] font-dm font-medium rounded-xl border border-[#44A872]'
                    }
                });

                if (mode === 'create') {
                    setFormData(buildInitialFormData('create'));
                    setBannerImage(null);
                    setPreviewImage(null);
                    (e.target as HTMLFormElement).reset();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
                
                onSuccess();
            }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            toast.error(labels.errorToast);
        }
    }

    return (
        <div className={`flex flex-col font-dm w-full pb-10 ${bannerStyle || ''}`}>
            <div className="flex flex-col w-full px-12 py-14 bg-linear-to-b from-[#A72C35] to-[#5C171C] rounded-xl">
                <h1 className="text-white text-heading-1">
                    {labels.heading}
                </h1>
                <p className="text-white/70 text-sub-1">
                    {labels.subheading}
                </p>
            </div>

            <div className="max-w-285 w-full mx-auto px-4 lg:px-10 mt-8 flex flex-col lg:flex-row gap-8 items-start">
                <main className="w-full lg:w-[65%] bg-white rounded-xl border border-gray shadow-sm p-6 md:p-8">
                    <form id="event-form" onSubmit={handleSubmit} className="flex flex-col">

                        <ImageUploadField 
                            previewImage={previewImage} 
                            onImageChange={handleImageChange} 
                        />

                        <BasicDetailsSection 
                            formData={formData} 
                            handleChange={handleChange} 
                            activeCategories={activeCategories} 
                            isLoadingCategories={isLoadingCategories}
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
                            {mode === 'edit' && (
                                <Button
                                    bgColorClass="bg-transparent"
                                    textColorClass="text-[#E8313A]"
                                    className="border border-[#E8313A] text-button-md py-3 rounded-xl w-full md:w-auto md:flex-1"
                                    type="button"
                                    onClick={() => setIsDeleteModalOpen(true)}
                                >
                                    Delete Event
                                </Button>
                            )}
                            <Button
                                bgColorClass="bg-transparent"
                                textColorClass="text-black"
                                className="border border-gray text-button-md py-3 rounded-xl w-full md:w-auto md:flex-1"
                                type="button"
                                onClick={onCancel}
                            >
                                {labels.cancelButton}
                            </Button>
                            <Button
                                bgColorClass="bg-brand-red"
                                className="flex items-center justify-center gap-2 text-button-md py-3 rounded-xl w-full md:w-auto md:flex-1 disabled:opacity-70 disabled:cursor-not-allowed"
                                type="submit"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? labels.submittingButton : (
                                    <>{labels.submitButton} <FaArrowRight /></>
                                )}
                            </Button>
                        </div>
                    </form>
                </main>

                <PreviewSidebar previewEvent={previewEvent} />
            </div>

            {/* Delete Confirmation Modal */}
            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                title="Delete Event"
                description="Are you sure you want to delete this event? This action cannot be undone."
                isDeleting={isDeleting}
                onCancel={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDelete}
            />
        </div>
    )
}

export default EventForm;
