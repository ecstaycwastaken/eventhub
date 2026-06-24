import type { EventCreationFormData } from "@/types/event";

function TicketsSection({ formData, handleChange }: { 
    formData: EventCreationFormData; 
    handleChange: (field: string, value: string | number) => void; 
}) {
  return (
    <section className="border-t border-border-gray pt-7 mt-2">
        <p className="text-gray text-sub-1 mb-5">TICKETS & CAPACITY</p>

        <div className="flex bg-[#F5F6F8] rounded-lg p-1 w-fit mb-5" role="radiogroup">
            {["Free", "Paid"].map((type) => (
                <button 
                    key={type}
                    type="button" 
                    role="radio"
                    aria-checked={formData.ticketType === type}
                    onClick={() => handleChange("ticketType", type)} 
                    className={`px-5 py-2 text-[14px] rounded-md transition-all ${formData.ticketType === type ? 'bg-[#1A1A1A] text-white font-semibold' : 'text-[#555555] font-medium hover:text-[#1A1A1A]'}`}
                >
                    {type}
                </button>
            ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            {formData.ticketType === "Paid" && (
                <div className="animate-in fade-in zoom-in-95 duration-200">
                    <label htmlFor="price" className="text-black text-sub-1 block mb-2">
                        Price (₱) <span className="text-[#E8313A]">*</span>
                    </label>
                    <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#555555] font-medium">₱</span>
                        <input className="border border-border-gray pl-10 pr-4 py-2.5 rounded-xl text-caption-3 w-full h-11" 
                            placeholder="0.00" 
                            type="number"
                            name="price"
                            id="price"
                            value={formData.price}
                            onChange={(e) => handleChange("price", e.target.value)}
                            required 
                        />
                    </div>
                </div>
            )}
            <div className={formData.ticketType === "Free" ? "md:max-w-[50%]" : ""}>
                <label htmlFor="capacity" className="text-black text-sub-1 block mb-2">
                    Available Slots <span className="text-[#E8313A]">*</span>
                </label>
                <input className="border border-border-gray px-4 py-2.5 rounded-xl text-caption-3 w-full h-11" 
                    placeholder="e.g. 500" 
                    type="number"
                    name="capacity"
                    id="capacity"
                    value={formData.capacity}
                    onChange={(e) => handleChange("capacity", e.target.value)}
                    required 
                />
            </div>
        </div>
    </section>
  )
}

export default TicketsSection