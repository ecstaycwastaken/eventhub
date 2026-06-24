import { useState, useEffect } from "react";
import { toast } from "sonner";
import { FaArrowRight } from "react-icons/fa6";

import Button from "@/components/Button";
import { type EventItem } from "@/components/EventCard";
import { useHttp } from "@/hooks/useHttp";
import ImageUploadField from "@/components/eventForm/ImageUploadField";
import BasicDetailsSection from "@/components/eventForm/BasicDetailsSection";
import DateTimeSection from "@/components/eventForm/DateTimeSection";
import LocationSection from "@/components/eventForm/LocationSection";
import TicketsSection from "@/components/eventForm/TicketsSection";
import PreviewSidebar from "@/components/eventForm/PreviewSidebar";


function MyEventsPage() {
    const [localError, setLocalError] = useState<string | null>(null);
    const [bannerImage, setBannerImage] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        categoryId: null as string | null,
        eventDate: "",
        eventTime: "",
        venue: "",
        capacity: "",
        price: "",
        ticketType: "Free" as "Free" | "Paid"
    });

    const handleChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const { sendRequest, loading: isSubmitting, error } = useHttp<EventItem>();
    const { data: fetchedCategories, sendRequest: fetchCategories, loading: isLoadingCategories } = useHttp<any[]>();

    useEffect(() => {
        fetchCategories({
            method: 'GET',
            url: '/api/v1/categories'
        });
    }, [fetchCategories]);

    const activeCategories = fetchedCategories || [];
    const selectedCategory = activeCategories.find(c => c.id === formData.categoryId);

    const previewDate = formData.eventDate && formData.eventTime 
        ? new Date(`${formData.eventDate}T${formData.eventTime}`).toISOString() 
        : new Date().toISOString(); // Defaults to current

    const previewEvent: EventItem = {
        id: 'preview',
        user_id: 'preview',
        title: formData.title || 'Your Event Name',
        description: formData.description || 'Preview description',
        date: previewDate,
        venue: formData.venue || 'Venue Location',
        capacity: Number(formData.capacity) || 0,
        price: formData.ticketType === "Free" ? "0" : (formData.price || "0"),
        banner_image: previewImage, 
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
            const response = await sendRequest({
                method: 'POST',
                url: '/api/v1/event/create',
                data: submitData
            });

            if (response) {
                toast.success('Event published successfully!', {
                    classNames: {
                        toast:  'bg-[#F1FFEB] text-[#44A872] font-dm font-medium rounded-xl border border-[#44A872]'
                    }
                });
                
                setFormData({
                    title: "", description: "", categoryId: null, eventDate: "", 
                    eventTime: "", venue: "", capacity: "", price: "", ticketType: "Free"
                });
                setBannerImage(null);
                setPreviewImage(null);

                (e.target as HTMLFormElement).reset();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        } catch (err) {
            toast.error("Failed to publish event. Please check the form.");
        }

    }

  return (
    <div className="flex flex-col font-dm min-h-screen px-20 py-10">
        <div className="flex flex-col w-full px-12 py-14 bg-linear-to-b from-[#A72C35] to-[#5C171C] rounded-xl">
            <h1 className="text-white text-heading-1">
                Create New Event
            </h1>
            <p className="text-white/70 text-sub-1">
                Fill in the details below to publish your event.
            </p>
        </div>

        <div className="max-w-285 w-full mx-auto px-4 lg:px-10 mt-8 flex flex-col lg:flex-row gap-8 items-start">
            <main className="w-full lg:w-[65%] bg-white rounded-xl border border-[#E5E7EB] shadow-sm p-6 md:p-8">
                <form id="create-event-form" onSubmit={handleSubmit} className="flex flex-col">

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

                    <section className="border-t border-[#E5E7EB] pt-7 mt-2">
                        <div className="bg-yellow border border-border-yellow p-3 rounded-xl mb-6">
                            <p className="text-caption-3 text-[#973C00]">
                                <b>IMPORTANT</b>: Please ensure that all event details provided are accurate and fully comply with our <span className="underline">Terms of Service</span>. We maintain a strict zero-tolerance policy for any illegal activities. It is your sole responsibility to ensure that your event is lawful, safe, and does not promote unauthorized commerce, restricted substances, or illicit behavior. Failure to comply will result in immediate event cancellation, account termination, and potential reporting to local law enforcement.
                            </p>
                        </div>
                    </section>
                    
                    <div className="flex flex-col-reverse md:flex-row justify-between items-center border-t border-[#E5E7EB] pt-8 mt-4 gap-4">
                        <Button
                            bgColorClass="bg-transparent"
                            textColorClass="text-black"
                            className="border border-[#E5E7EB] text-button-md py-3 rounded-xl w-full md:w-[50%]"
                        >
                            Discard
                        </Button>
                        <Button
                            bgColorClass="bg-brand-red"
                            className="flex items-center justify-center gap-2 text-button-md py-3 rounded-xl w-full md:w-[50%]
                                disabled:opacity-70 disabled:cursor-not-allowed"
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Publishing...' : (
                                <>Publish event <FaArrowRight /></>
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

export default MyEventsPage