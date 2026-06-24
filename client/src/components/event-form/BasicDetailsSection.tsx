import { Spinner } from "@/components/ui/spinner";

interface BasicDetailsProps {
    formData: any; 
    handleChange: (field: string, value: any) => void;
    activeCategories: any[];
    isLoadingCategories: boolean;
    error: any;
    localError: string | null; 
}

function BasicDetailsSection({ 
    formData, 
    handleChange, 
    activeCategories, 
    isLoadingCategories,
    error,
    localError
}: BasicDetailsProps) {
    
    const currentLength = formData.description?.length || 0;

  return (
    <section>
        <div className="mb-6">
            {error && error.message && (
                <div className="w-full p-3 text-sm text-red-500 border border-red-200 bg-red-50 rounded-xl -mt-5 mb-5">
                    {error.message}
                </div>
            )}
        </div>

        <p className="text-gray text-sub-1 mb-5">EVENT DETAILS</p>

        <div className="mb-6">
            <label htmlFor="title" className="text-black text-sub-1 block mb-2">
                Event Name <span className="text-[#E8313A]">*</span>
            </label>
            <input className="border border-gray px-4 py-2.5 rounded-xl text-caption-3 w-full h-11" 
                placeholder="Enter event name..." 
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                required 
            />
        </div>

        <div className="mb-6">
            <label 
                htmlFor="category" 
                className={`block text-sub-1 mb-2 ${localError === "Please select a category for your event." ? 
                    "text-[#E8313A]" : "text-black"}`}
            >
                Category <span className="text-[#E8313A]">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
                {isLoadingCategories && (
                    <div className="flex items-center gap-2 text-sm text-gray-500 py-1">
                        <Spinner size="xs" variant="muted" />
                        <span>Loading categories...</span>
                    </div>
                )}
                
                {activeCategories.map((cat) => (
                    <div 
                        key={cat.id}
                        onClick={() => handleChange("categoryId", cat.id)}
                        className={`cursor-pointer px-3.5 py-1.5 text-button-sm font-medium rounded-full border-2 transition-all
                            ${formData.categoryId === cat.id
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
            <textarea className="border border-gray px-4 py-2.5 rounded-xl text-caption-2 w-full min-h-30" 
                placeholder="Brief summary of the event..."
                name="description"
                id="description"
                maxLength={200}
                required 
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
            />
            <p className="text-gray text-sub-1 text-right mt-1">{currentLength}/200</p>
        </div>
    </section>
  )
}

export default BasicDetailsSection