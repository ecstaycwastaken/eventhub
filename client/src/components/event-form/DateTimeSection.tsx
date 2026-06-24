import { FiCalendar, FiClock } from "react-icons/fi";

function DateTimeSection({ formData, handleChange }: { 
    formData: any; 
    handleChange: (field: string, value: any) => void; 
}) {
  return (
    <section className="border-t border-gray pt-7 mt-2">
        <p className="text-gray text-sub-1 mb-5">DATE & TIME</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
                <label htmlFor="eventDate" className="text-black text-sub-1 block mb-2">
                    Event Date <span className="text-[#E8313A]">*</span>
                </label>
                <div className="relative">
                    <FiCalendar className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#999999] cursor-pointer" />
                    <input 
                        className="border border-gray pl-10 pr-4 py-2.5 rounded-xl text-caption-3 w-full h-11"
                        type="date" 
                        id="eventDate" 
                        name="eventDate" 
                        value={formData.eventDate}
                        onChange={(e) => handleChange("eventDate", e.target.value)}
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
                        className="border border-gray pl-10 pr-4 py-2.5 rounded-xl text-caption-3 w-full h-11"
                        type="time" 
                        id="eventTime" 
                        name="eventTime" 
                        value={formData.eventTime}
                        onChange={(e) => handleChange("eventTime", e.target.value)}
                        required
                    />
                </div>
            </div>
        </div>
    </section>
  )
}

export default DateTimeSection