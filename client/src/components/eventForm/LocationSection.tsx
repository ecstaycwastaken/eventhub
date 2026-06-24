import { FiMapPin } from "react-icons/fi";

function LocationSection({ formData, handleChange }: { 
    formData: any; 
    handleChange: (field: string, value: any) => void; 
}) {
  return (
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
                value={formData.venue}
                onChange={(e) => handleChange("venue", e.target.value)}
                required 
            />
        </div>
    </div>
</section>
  )
}

export default LocationSection