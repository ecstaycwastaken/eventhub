import { useState } from "react";
import { FiImage, FiCalendar, FiClock, FiMapPin, FiGlobe } from "react-icons/fi"
import { FaArrowRight } from "react-icons/fa6"
import Button from "@/components/Button"
import EventCard, { type EventItem } from "@/components/EventCard";

function MyEventsPage() {
    const [error, setError] = useState(null)
    const [charCount, setCharCount] = useState(0)
    const [ticketType, setTicketType] = useState<"Free" | "Paid">("Free")

    const [categoryId, setCategoryId] = useState<number | null>(null);

    const [title, setTitle] = useState("")
    const [eventDate, setEventDate] = useState("")
    const [eventTime, setEventTime] = useState("")
    const [venue, setVenue] = useState("")
    const [capacity, setCapacity] = useState("")
    const [price, setPrice] = useState("")

    const categories = [
        { id: 1, name: "Technology" },
        { id: 2, name: "Design" },
        { id: 3, name: "Business" },
        { id: 4, name: "Community" },
        { id: 5, name: "Education" },
        { id: 6, name: "Arts" },
        { id: 7, name: "Sports" }
    ]

    const selectedCategory = categories.find(c => c.id === categoryId);

    const previewDate = eventDate && eventTime 
        ? new Date(`${eventDate}T${eventTime}`).toISOString() 
        : new Date().toISOString(); // Defaults to current

    const previewEvent: EventItem = {
        id: 'preview',
        user_id: 'preview',
        title: title || 'Your Event Name',
        description: 'Preview description',
        date: previewDate,
        venue: venue || 'Venue Location',
        capacity: Number(capacity) || 0,
        price: ticketType === "Free" ? "0" : (price || "0"),
        banner_image: null, 
        category: {
            id: String(categoryId || '0'),
            name: selectedCategory ? selectedCategory.name : 'Category',
            color: '#3B82F6'
        }
    };

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
                <form className="flex flex-col">
                    <section>
                        <p className="text-gray text-sub-1 mb-5">EVENT DETAILS</p>

                        <div className="flex flex-col items-center justify-center w-full h-45 border-2 border-dashed 
                            border-[#E5E7EB] rounded-xl  gap-2 cursor-pointer bg-[#FAFAFA] hover:bg-[#F5F6F8]
                            hover:border-[#555555] transition-all mb-6 group">
                            <FiImage className="w-10 h-10 text-[#999999] group-hover:text-[#555555] transition-colors" />
                            <p className="text-[13px] text-[#555555]">Click to upload cover photo</p>
                            <span className="text-[12px] text-[#999999]">Recommended size: 1280x720px (16:9)</span>
                        </div>

                        <div className="mb-6">
                            <label htmlFor="title" className="text-black text-sub-1 block mb-2">
                                Event Name <span className="text-[#E8313A]">*</span>
                            </label>
                            <input className="border border-[#E5E7EB] px-4 py-2.5 rounded-xl text-caption-3 w-full h-11" 
                                placeholder="Enter event name..." 
                                type="text"
                                name="title"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required 
                            />
                        </div>

                        <div className="mb-6">
                            <label 
                                htmlFor="category" 
                                className={`block text-sub-1 mb-2 ${error === "Please select a category for your event." ? 
                                    "text-[#E8313A]" : "text-black"}`}
                            >
                                Category <span className="text-[#E8313A]">*</span>
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {categories.map((cat) => (
                                    <div 
                                        key={cat.id}
                                        onClick={() => setCategoryId(cat.id)}
                                        className={`cursor-pointer px-3.5 py-1.5 text-button-sm font-medium rounded-full border-2 transition-all
                                            ${categoryId === cat.id
                                                ? 'bg-[#3B82F6] text-white border-transparent' 
                                                : 'bg-[#F5F6F8] text-[#555555] border-transparent hover:border-[#1A1A1A] hover:text-[#1A1A1A]'
                                            }`}
                                    >
                                        {cat.name}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mb-6">
                            <label htmlFor="description" className="text-black text-sub-1 block mb-2">
                                Short Description <span className="text-[#E8313A]">*</span>
                            </label>
                            <textarea className="border border-[#E5E7EB] px-4 py-2.5 rounded-xl text-caption-2 w-full min-h-30" 
                                placeholder="Brief summary of the event..."
                                name="description"
                                id="description"
                                maxLength={200}
                                required 
                                onChange={(e) => setCharCount(e.target.value.length)}
                            />
                            <p className="text-gray text-sub-1 text-right mt-1">{charCount}/200</p>
                        </div>
                    </section>

                    <section className="border-t border-[#E5E7EB] pt-7 mt-2">
                        <p className="text-gray text-sub-1 mb-5">DATE & TIME</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label htmlFor="eventDate" className="text-black text-sub-1 block mb-2">
                                    Event Date <span className="text-[#E8313A]">*</span>
                                </label>
                                <div className="relative">
                                    <FiCalendar className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#999999] cursor-pointer" />
                                    <input 
                                        className="border border-[#E5E7EB] pl-10 pr-4 py-2.5 rounded-xl text-caption-3 w-full h-11"
                                        type="date" 
                                        id="eventDate" 
                                        name="eventDate" 
                                        value={eventDate}
                                        onChange={(e) => setEventDate(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                 <label htmlFor="eventTime" className="text-black text-sub-1 block mb-2">
                                    Event Time <span className="text-[#E8313A]">*</span>
                                </label>
                                <div className="relative">
                                    <FiClock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#999999] cursor-pointer" />
                                    <input
                                        className="border border-[#E5E7EB] pl-10 pr-4 py-2.5 rounded-xl text-caption-3 w-full h-11"
                                        type="time" 
                                        id="eventTime" 
                                        name="eventTime" 
                                        value={eventTime}
                                        onChange={(e) => setEventTime(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="border-t border-[#E5E7EB] pt-7 mt-2">
                        <p className="text-gray text-sub-1 mb-5">LOCATION</p>

                        <div className="mb-6">
                            <label htmlFor="venue" className="text-black text-sub-1 block mb-2">
                                Venue Name <span className="text-[#E8313A]">*</span>
                            </label>
                            <div className="relative">
                                <FiMapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#999999]" />
                                <input className="border border-[#E5E7EB] pl-10 pr  -4 py-2.5 rounded-xl text-caption-3 w-full h-11" 
                                    placeholder="Enter venue name..." 
                                    type="text"
                                    name="venue"
                                    id="venue"
                                    value={venue}
                                    onChange={(e) => setVenue(e.target.value)}
                                    required 
                                />
                            </div>
                        </div>
                    </section>

                    <section className="border-t border-[#E5E7EB] pt-7 mt-2">
                        <p className="text-gray text-sub-1 mb-5">TICKETS & CAPACITY</p>

                        <div className="flex bg-[#F5F6F8] rounded-lg p-1 w-fit mb-5" role="radiogroup">
                            {["Free", "Paid"].map((type) => (
                                <button 
                                    key={type}
                                    type="button" 
                                    role="radio"
                                    aria-checked={ticketType === type}
                                    onClick={() => setTicketType(type as any)} 
                                    className={`px-5 py-2 text-[14px] rounded-md transition-all ${ticketType === type ? 'bg-[#1A1A1A] text-white font-semibold' : 'text-[#555555] font-medium hover:text-[#1A1A1A]'}`}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                            {ticketType === "Paid" && (
                                <div className="animate-in fade-in zoom-in-95 duration-200">
                                    <label htmlFor="price" className="text-black text-sub-1 block mb-2">
                                        Price (₱) <span className="text-[#E8313A]">*</span>
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#555555] font-medium">₱</span>
                                        <input className="border border-[#E5E7EB] pl-10 pr-4 py-2.5 rounded-xl text-caption-3 w-full h-11" 
                                            placeholder="0.00" 
                                            type="number"
                                            name="price"
                                            id="price"
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                            required 
                                        />
                                    </div>
                                </div>
                            )}
                            <div className={ticketType === "Free" ? "md:max-w-[50%]" : ""}>
                                <label htmlFor="capacity" className="text-black text-sub-1 block mb-2">
                                    Available Slots <span className="text-[#E8313A]">*</span>
                                </label>
                                <input className="border border-[#E5E7EB] px-4 py-2.5 rounded-xl text-caption-3 w-full h-11" 
                                    placeholder="e.g. 500" 
                                    type="number"
                                    name="capacity"
                                    id="capacity"
                                    value={capacity}
                                    onChange={(e) => setCapacity(e.target.value)}
                                    required 
                                />
                            </div>
                        </div>
                    </section>

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
                            className="flex items-center justify-center gap-2 text-button-md py-3 rounded-xl w-full md:w-[50%]"
                        >
                            Publish event <FaArrowRight />
                        </Button>
                    </div>
                </form>
            </main>

            <aside className="w-full lg:w-[32%] sticky top-6 bg-white border border-[#E5E7EB] rounded-xl p-6 shadow-sm">
                <p className="text-gray text-sub-1 mb-5">EVENT PREVIEW</p>
                
                <div className="pointer-events-none mb-6">
                    <EventCard event={previewEvent} />
                </div>

                <Button
                    bgColorClass="bg-brand-red"
                    className="flex items-center justify-center gap-2 text-button-md py-3 rounded-xl w-full"
                >
                    Publish event <FaArrowRight />
                </Button>
            </aside>
        </div>
    </div>
  )
}

export default MyEventsPage