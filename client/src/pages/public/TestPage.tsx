import { useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { FiImage, FiCalendar, FiClock, FiMapPin, FiGlobe } from "react-icons/fi";

// Note: Assuming a standard Button component based on your SignUpForm.tsx snippet.
// If you have a global one, you can swap these out.

export default function TestPage({ onSuccess }: { onSuccess?: () => void }) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Form interactive states matching DESIGN.md toggles
    const [category, setCategory] = useState("Technology");
    const [eventType, setEventType] = useState<"In-person" | "Online">("In-person");
    const [ticketType, setTicketType] = useState<"Free" | "Paid">("Free");

    const categories = ["Technology", "Design", "Business", "Community", "Education", "Arts", "Sports"];

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        // Append state-based values that might not be captured by standard inputs
        formData.append("category", category);
        formData.append("eventType", eventType);
        formData.append("ticketType", ticketType);
        
        const payload = Object.fromEntries(formData.entries());

        try {
            // Mock API call based on your structure
            console.log("Submitting Event Payload:", payload);
            await new Promise(resolve => setTimeout(resolve, 1500)); // Simulating network
            
            // Handle success
            if (onSuccess) onSuccess();
            
        } catch (err: any) {
            setError(err.message || "Failed to create event.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F5F6F8] font-sans pb-16">
            {/* 5.1 Navbar (Logged-In Variant Mock) */}
            <nav className="h-[60px] bg-white border-b border-[#E5E7EB] flex items-center justify-between px-4 lg:px-10">
                <div className="font-bold text-[18px] text-[#E8313A] flex items-center gap-2">
                    <div className="w-4 h-4 bg-[#E8313A] rounded-sm"></div>
                    EventHub
                </div>
                <div className="hidden md:flex gap-6 text-[14px] font-medium text-[#1A1A1A]">
                    <a href="#" className="hover:text-[#E8313A]">Browse Events</a>
                    <a href="#" className="hover:text-[#E8313A]">My Registrations</a>
                    <a href="#" className="bg-[#E8313A] text-white px-4 py-1.5 rounded-full">Create Event</a>
                </div>
                <div className="flex items-center gap-2 text-[14px] font-medium">
                    <span>Marcus</span>
                    <div className="w-8 h-8 bg-[#E5E7EB] rounded-full flex items-center justify-center text-[12px]">M</div>
                </div>
            </nav>

            {/* 5.2 Page Header Banner */}
            <div className="w-full bg-gradient-to-br from-[#7A1515] to-[#5C0F0F] px-4 lg:px-10 py-8 text-white">
                <div className="max-w-[1140px] mx-auto">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-white/65 mb-2">
                        Your Account
                    </p>
                    <h1 className="text-[28px] md:text-[32px] font-bold leading-tight mb-2">
                        Create New Event
                    </h1>
                    <p className="text-[14px] text-white/75">
                        Fill in the details below to publish your event.
                    </p>
                </div>
            </div>

            {/* Main Layout - Max Width 1140px */}
            <div className="max-w-[1140px] mx-auto px-4 lg:px-10 mt-8 flex flex-col lg:flex-row gap-8 items-start">
                
                {/* Main Form Card (~65%) */}
                <main className="w-full lg:w-[65%] bg-white rounded-xl border border-[#E5E7EB] shadow-sm p-6 md:p-8">
                    <form onSubmit={handleSubmit} className="flex flex-col animate-in fade-in duration-300">
                        
                        {error && (
                            <div className="w-full p-3 mb-6 text-sm text-red-500 border border-red-200 bg-red-50 rounded-xl">
                                {error}
                            </div>
                        )}

                        {/* SECTION 1: EVENT DETAILS */}
                        <section>
                            <p className="text-[11px] font-semibold tracking-[0.08em] uppercase text-[#999999] mb-5">Event Details</p>
                            
                            {/* Image Upload Zone */}
                            <div className="w-full h-[180px] border-2 border-dashed border-[#E5E7EB] rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer bg-[#FAFAFA] hover:bg-[#F5F6F8] hover:border-[#555555] transition-all mb-6 group">
                                <FiImage className="w-10 h-10 text-[#999999] group-hover:text-[#555555] transition-colors" />
                                <p className="text-[13px] text-[#555555]">Click to upload cover photo</p>
                                <span className="text-[12px] text-[#999999]">Recommended size: 1280x720px (16:9)</span>
                            </div>

                            <div className="mb-6">
                                <label htmlFor="eventName" className="block text-[13px] font-medium text-[#1A1A1A] mb-1.5">
                                    Event Name <span className="text-[#E8313A]">*</span>
                                </label>
                                <input 
                                    className="w-full h-11 px-3.5 text-[14px] text-[#1A1A1A] bg-white border border-[#E5E7EB] rounded-lg outline-none focus:border-[#1A1A1A] transition-colors placeholder:text-[#999999]" 
                                    placeholder="e.g. TechConf Philippines 2027" 
                                    type="text"
                                    name="eventName"
                                    id="eventName"
                                    required 
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-[13px] font-medium text-[#1A1A1A] mb-1.5">
                                    Category <span className="text-[#E8313A]">*</span>
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {categories.map((cat) => (
                                        <div 
                                            key={cat}
                                            onClick={() => setCategory(cat)}
                                            className={`cursor-pointer px-3.5 py-1.5 text-[13px] font-medium rounded-full border-[1.5px] transition-all
                                                ${category === cat 
                                                    ? 'bg-[#3B82F6] text-white border-transparent' 
                                                    : 'bg-[#F5F6F8] text-[#555555] border-transparent hover:border-[#1A1A1A] hover:text-[#1A1A1A]'
                                                }`}
                                        >
                                            {cat}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-6">
                                <label htmlFor="shortDesc" className="block text-[13px] font-medium text-[#1A1A1A] mb-1.5">
                                    Short Description <span className="text-[#E8313A]">*</span>
                                </label>
                                <textarea 
                                    className="w-full min-h-[120px] p-3.5 text-[14px] text-[#1A1A1A] bg-white border border-[#E5E7EB] rounded-lg outline-none focus:border-[#1A1A1A] transition-colors resize-y placeholder:text-[#999999]" 
                                    placeholder="Brief summary of the event..." 
                                    name="shortDesc"
                                    id="shortDesc"
                                    maxLength={200}
                                    required 
                                />
                                <p className="text-[12px] text-[#555555] text-right mt-1">0/200</p>
                            </div>
                        </section>

                        {/* SECTION 2: DATE & TIME */}
                        <section className="border-t border-[#E5E7EB] pt-7 mt-2">
                            <p className="text-[11px] font-semibold tracking-[0.08em] uppercase text-[#999999] mb-5">Date & Time</p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label htmlFor="startDate" className="block text-[13px] font-medium text-[#1A1A1A] mb-1.5">Start Date <span className="text-[#E8313A]">*</span></label>
                                    <div className="relative">
                                        <FiCalendar className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#999999]" />
                                        <input type="date" id="startDate" name="startDate" required className="w-full h-11 pl-10 pr-3.5 text-[14px] text-[#1A1A1A] bg-white border border-[#E5E7EB] rounded-lg outline-none focus:border-[#1A1A1A] transition-colors" />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="startTime" className="block text-[13px] font-medium text-[#1A1A1A] mb-1.5">Start Time <span className="text-[#E8313A]">*</span></label>
                                    <div className="relative">
                                        <FiClock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#999999]" />
                                        <input type="time" id="startTime" name="startTime" required className="w-full h-11 pl-10 pr-3.5 text-[14px] text-[#1A1A1A] bg-white border border-[#E5E7EB] rounded-lg outline-none focus:border-[#1A1A1A] transition-colors" />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                                <div>
                                    <label htmlFor="endDate" className="block text-[13px] font-medium text-[#1A1A1A] mb-1.5">End Date <span className="text-[#E8313A]">*</span></label>
                                    <div className="relative">
                                        <FiCalendar className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#999999]" />
                                        <input type="date" id="endDate" name="endDate" required className="w-full h-11 pl-10 pr-3.5 text-[14px] text-[#1A1A1A] bg-white border border-[#E5E7EB] rounded-lg outline-none focus:border-[#1A1A1A] transition-colors" />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="endTime" className="block text-[13px] font-medium text-[#1A1A1A] mb-1.5">End Time <span className="text-[#E8313A]">*</span></label>
                                    <div className="relative">
                                        <FiClock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#999999]" />
                                        <input type="time" id="endTime" name="endTime" required className="w-full h-11 pl-10 pr-3.5 text-[14px] text-[#1A1A1A] bg-white border border-[#E5E7EB] rounded-lg outline-none focus:border-[#1A1A1A] transition-colors" />
                                    </div>
                                </div>
                            </div>
                            <p className="text-[12px] text-[#555555]">Duration: -- hours</p>
                        </section>

                        {/* SECTION 3: LOCATION */}
                        <section className="border-t border-[#E5E7EB] pt-7 mt-7">
                            <p className="text-[11px] font-semibold tracking-[0.08em] uppercase text-[#999999] mb-5">Location</p>
                            
                            {/* Toggle Switch */}
                            <div className="flex bg-[#F5F6F8] rounded-lg p-1 w-fit mb-5" role="radiogroup">
                                {["In-person", "Online"].map((type) => (
                                    <button 
                                        key={type}
                                        type="button" 
                                        role="radio"
                                        aria-checked={eventType === type}
                                        onClick={() => setEventType(type as any)} 
                                        className={`px-5 py-2 text-[14px] rounded-md transition-all ${eventType === type ? 'bg-[#1A1A1A] text-white font-semibold' : 'text-[#555555] font-medium hover:text-[#1A1A1A]'}`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>

                            {/* Conditional Rendering based on Event Type */}
                            {eventType === "In-person" ? (
                                <div className="space-y-5 animate-in fade-in zoom-in-95 duration-200">
                                    <div>
                                        <label htmlFor="venue" className="block text-[13px] font-medium text-[#1A1A1A] mb-1.5">Venue Name <span className="text-[#E8313A]">*</span></label>
                                        <div className="relative">
                                            <FiMapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#999999]" />
                                            <input type="text" id="venue" name="venue" required className="w-full h-11 pl-10 pr-3.5 text-[14px] text-[#1A1A1A] bg-white border border-[#E5E7EB] rounded-lg outline-none focus:border-[#1A1A1A] transition-colors placeholder:text-[#999999]" placeholder="e.g. SMX Convention Center" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="region" className="block text-[13px] font-medium text-[#1A1A1A] mb-1.5">Region <span className="text-[#E8313A]">*</span></label>
                                            <select id="region" name="region" required className="w-full h-11 px-3.5 text-[14px] text-[#1A1A1A] bg-white border border-[#E5E7EB] rounded-lg outline-none focus:border-[#1A1A1A] transition-colors appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%20%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M5%207.5L10%2012.5L15%207.5%22%20stroke%3D%22%23999999%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[position:right_10px_center]">
                                                <option value="">Select Region</option>
                                                <option value="NCR">Metro Manila</option>
                                                <option value="Cebu">Cebu</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="city" className="block text-[13px] font-medium text-[#1A1A1A] mb-1.5">City <span className="text-[#E8313A]">*</span></label>
                                            <input type="text" id="city" name="city" required className="w-full h-11 px-3.5 text-[14px] text-[#1A1A1A] bg-white border border-[#E5E7EB] rounded-lg outline-none focus:border-[#1A1A1A] transition-colors placeholder:text-[#999999]" placeholder="City" />
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-5 animate-in fade-in zoom-in-95 duration-200">
                                    <div>
                                        <label htmlFor="platform" className="block text-[13px] font-medium text-[#1A1A1A] mb-1.5">Online Platform <span className="text-[#E8313A]">*</span></label>
                                        <input type="text" id="platform" name="platform" required className="w-full h-11 px-3.5 text-[14px] text-[#1A1A1A] bg-white border border-[#E5E7EB] rounded-lg outline-none focus:border-[#1A1A1A] transition-colors placeholder:text-[#999999]" placeholder="e.g. Zoom, Google Meet" />
                                    </div>
                                    <div>
                                        <label htmlFor="link" className="block text-[13px] font-medium text-[#1A1A1A] mb-1.5">Online Link <span className="text-[#E8313A]">*</span></label>
                                        <div className="relative">
                                            <FiGlobe className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#999999]" />
                                            <input type="url" id="link" name="link" required className="w-full h-11 pl-10 pr-3.5 text-[14px] text-[#1A1A1A] bg-white border border-[#E5E7EB] rounded-lg outline-none focus:border-[#1A1A1A] transition-colors placeholder:text-[#999999]" placeholder="https://..." />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </section>

                        {/* SECTION 4: TICKETS & CAPACITY */}
                        <section className="border-t border-[#E5E7EB] pt-7 mt-7">
                            <p className="text-[11px] font-semibold tracking-[0.08em] uppercase text-[#999999] mb-5">Tickets & Capacity</p>
                            
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
                                        <label htmlFor="price" className="block text-[13px] font-medium text-[#1A1A1A] mb-1.5">Price (₱) <span className="text-[#E8313A]">*</span></label>
                                        <div className="relative">
                                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#555555] font-medium">₱</span>
                                            <input type="number" id="price" name="price" required className="w-full h-11 pl-8 pr-3.5 text-[14px] text-[#1A1A1A] bg-white border border-[#E5E7EB] rounded-lg outline-none focus:border-[#1A1A1A] transition-colors placeholder:text-[#999999]" placeholder="0.00" />
                                        </div>
                                    </div>
                                )}
                                <div className={ticketType === "Free" ? "md:max-w-[50%]" : ""}>
                                    <label htmlFor="slots" className="block text-[13px] font-medium text-[#1A1A1A] mb-1.5">Available Slots <span className="text-[#E8313A]">*</span></label>
                                    <input type="number" id="slots" name="slots" required className="w-full h-11 px-3.5 text-[14px] text-[#1A1A1A] bg-white border border-[#E5E7EB] rounded-lg outline-none focus:border-[#1A1A1A] transition-colors placeholder:text-[#999999]" placeholder="e.g. 500" />
                                    <p className="text-[12px] text-[#555555] mt-1.5">Attendees will see this on your event card.</p>
                                </div>
                            </div>

                            {/* 5.9 Notice Box */}
                            <div className="bg-[#FEFCE8] border-[1.5px] border-[#F59E0B] rounded-lg p-3.5 text-[12px] text-[#92400E] leading-relaxed mt-2">
                                <strong className="font-bold uppercase text-[11px] tracking-[0.04em] block mb-1">Important:</strong>
                                Event details you publish cannot be changed once attendees have registered. Please review your event name, date, and venue carefully before publishing.
                            </div>
                        </section>

                        {/* SECTION 5: ADDITIONAL INFO */}
                        <section className="border-t border-[#E5E7EB] pt-7 mt-7">
                            <p className="text-[11px] font-semibold tracking-[0.08em] uppercase text-[#999999] mb-5">Additional Info</p>
                            <div className="mb-6">
                                <label htmlFor="tags" className="block text-[13px] font-medium text-[#1A1A1A] mb-1.5">Tags</label>
                                <input type="text" id="tags" name="tags" className="w-full h-11 px-3.5 text-[14px] text-[#1A1A1A] bg-white border border-[#E5E7EB] rounded-lg outline-none focus:border-[#1A1A1A] transition-colors placeholder:text-[#999999]" placeholder="Add up to 5 tags (comma separated)" />
                            </div>
                        </section>

                        {/* Form Actions (Bottom) */}
                        <div className="flex flex-col-reverse md:flex-row justify-between items-center border-t border-[#E5E7EB] pt-8 mt-4 gap-4">
                            <div className="flex w-full md:w-auto gap-3">
                                <button type="button" className="flex-1 md:flex-none h-12 px-6 text-[15px] font-semibold text-white bg-[#1A1A1A] rounded-lg hover:opacity-85 transition-opacity">
                                    Save Draft
                                </button>
                                <button type="button" className="flex-1 md:flex-none h-[44px] px-5 text-[14px] font-medium text-[#1A1A1A] bg-transparent border border-[#E5E7EB] rounded-lg hover:border-[#555555] transition-colors self-center">
                                    Discard
                                </button>
                            </div>
                            <button 
                                type="submit" 
                                disabled={isLoading}
                                className="w-full md:w-auto flex items-center justify-center gap-2 h-12 px-7 text-[15px] font-semibold text-white bg-[#E8313A] rounded-lg hover:bg-[#C9282F] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isLoading ? "Publishing..." : <>Publish event <FaArrowRight /></>}
                            </button>
                        </div>
                    </form>
                </main>

                {/* Sidebar Card (~32%) */}
                <aside className="w-full lg:w-[32%] sticky top-6 bg-white border border-[#E5E7EB] rounded-xl p-6 shadow-sm">
                    <p className="text-[14px] font-semibold text-[#1A1A1A] border-b border-[#E5E7EB] pb-3 mb-4">
                        Event Preview
                    </p>
                    
                    {/* Mini Event Card Preview */}
                    <div className="border border-[#E5E7EB] rounded-xl overflow-hidden mb-6">
                        <div className="w-full h-[160px] bg-[#E5E7EB] relative">
                            {/* Price Badge */}
                            <div className={`absolute top-3 left-3 text-[11px] font-semibold text-white px-2.5 py-1 rounded-full ${ticketType === 'Free' ? 'bg-[#16A34A]' : 'bg-[#1A1A1A]'}`}>
                                {ticketType === 'Free' ? 'Free' : 'Paid'}
                            </div>
                            {/* Slots */}
                            <div className="absolute bottom-3 right-3 text-[12px] font-medium text-white bg-black/60 px-2 py-1 rounded-md">
                                -- slots left
                            </div>
                        </div>
                        <div className="p-4">
                            <h4 className="text-[14px] font-bold text-[#1A1A1A] mb-2 truncate">Your Event Name</h4>
                            <p className="text-[12px] text-[#555555] flex items-center gap-1.5 mb-1.5">
                                <FiCalendar className="w-3.5 h-3.5" /> Date, Time
                            </p>
                            <div className="inline-block text-[11px] font-semibold text-white bg-[#3B82F6] px-2 py-0.5 rounded-full my-1.5">
                                {category}
                            </div>
                            <p className="text-[12px] text-[#555555] flex items-center gap-1.5 mb-4">
                                {eventType === 'In-person' ? <FiMapPin className="w-3.5 h-3.5" /> : <FiGlobe className="w-3.5 h-3.5" />}
                                {eventType === 'In-person' ? 'Venue location' : 'Online event'}
                            </p>
                            <button className="w-full h-9 bg-[#2563EB] text-white font-semibold text-[13px] rounded-md pointer-events-none">
                                Request to Join
                            </button>
                        </div>
                    </div>

                    <div className="text-[12px] text-[#555555] text-center flex items-center justify-center gap-1.5 mb-6">
                        <div className="w-2 h-2 bg-[#999999] rounded-full"></div>
                        Status: Draft
                    </div>

                    {/* Replicated Publish Controls */}
                    <button className="w-full flex items-center justify-center gap-2 h-12 mb-3 text-[15px] font-semibold text-white bg-[#E8313A] rounded-lg hover:bg-[#C9282F] transition-colors">
                        Publish event <FaArrowRight />
                    </button>
                    <button className="w-full h-12 mb-3 text-[14px] font-medium text-[#1A1A1A] bg-transparent border border-[#555555] rounded-lg transition-colors">
                        Save as draft
                    </button>
                    <button className="block w-full text-center text-[13px] font-medium text-[#E8313A] hover:underline mt-2">
                        Discard changes
                    </button>
                </aside>

            </div>
        </div>
    );
}