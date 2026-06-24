import type { CategoryInfo } from "@/components/admin/CategoryCard";
import CategoryCard from "@/components/admin/CategoryCard";
import Button from "@/components/Button";
import { useState } from "react";
import { FaPlus, FaSquare } from "react-icons/fa";
import { LuPlus, LuTag } from "react-icons/lu";

function CategoriesPage() {
  const [categories, setCategories] = useState<CategoryInfo[]>([
    {
      name: "Music",
      hexcode: "#a21caf",
      event_count: 67,
      attendance_count: 1727,
    },
    {
      name: "Technology",
      hexcode: "#1d4ed8",
      event_count: 4,
      attendance_count: 38,
    },
    {
      name: "Business",
      hexcode: "#15803d",
      event_count: 1,
      attendance_count: 3,
    },
  ]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex">
        <div className='mb-4 flex-1'>
          <h1 className="text-heading-1">Categories</h1>
          <p className='text-sub-1 text-gray-500'>Categories table • Full CRUD access</p>
        </div>
        <Button 
          bgColorClass="bg-[#C2313C]"
          className="my-3 px-6 flex items-center gap-2 rounded-md text-body-1"
        >
          <FaPlus />
          Add Category
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {
          categories.map((c) => (
            <CategoryCard
              name={c.name}
              hexcode={c.hexcode}
              event_count={c.event_count}
              attendance_count={c.attendance_count}
            />
          ))
        }

        <div className="w-full h-48 rounded bg-gray-50 
        border-2 border-dashed hover:border-gray-300 border-gray-200 
        flex flex-col items-center justify-center cursor-pointer
        transition-all duration-200 text-gray-300 hover:text-gray-500">
          <div className="flex flex-col items-center justify-center">
            <LuPlus className="w-8 h-8"/>
            <p className="text-body-1">Add Category</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoriesPage;