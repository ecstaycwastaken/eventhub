import React from 'react'
import { FiImage } from "react-icons/fi";

function ImageUploadField({ 
    previewImage, 
    onImageChange 
}: { 
    previewImage: string | null; 
    onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void 
}) {
  return (
    <label className="flex flex-col items-center justify-center w-full h-45 border-2 border-dashed 
        border-gray rounded-xl gap-2 cursor-pointer bg-[#FAFAFA] hover:bg-[#F5F6F8]
        hover:border-[#555555] transition-all mb-6 group relative overflow-hidden">
        
        {previewImage ? (
            <img src={previewImage} alt="Banner Preview" className="w-full h-full object-cover" />
        ) : (
            <>
                <FiImage className="w-10 h-10 text-[#999999] group-hover:text-[#555555] transition-colors" />
                <p className="text-[13px] text-[#555555]">Click to upload cover photo</p>
                <span className="text-[12px] text-[#999999]">Recommended size: 1280x720px (16:9)</span>
            </>
        )}
        
        <input 
            type="file" 
            accept="image/*" 
            className="hidden" 
            onChange={onImageChange} 
        />
    </label>
  )
}

export default ImageUploadField