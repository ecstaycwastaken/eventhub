import { FaSquare } from "react-icons/fa";
import { LuTag } from "react-icons/lu";
import type { Category } from "@/types/category";

export interface CategoryCardProps {
  category: Category;
  onEdit: (category: Category) => void;
  onDelete: (categoryId: string) => void;
}

function CategoryCard({ category, onEdit, onDelete }: CategoryCardProps) {
  const { id, name, color, event_count = 0, attendance_count = 0 } = category;
  
  return (
    <div className="flex flex-col p-5 gap-4 w-full justify-center rounded-[16px] shadow-resting bg-white border border-border-strong relative transition-transform hover:-translate-y-1 hover:shadow-raised">
      <div className="flex items-center gap-3">
        { /* icon */}
        <div className="flex items-center justify-center rounded-lg bg-bg-subtle h-12 w-12 shrink-0">
          <LuTag className="h-6 w-6" style={{ color }}/>
        </div>
        { /* name and color */}
        <div className="flex flex-col overflow-hidden">
          <h2 className="text-[17px] font-bold text-ink truncate" title={name}>{name}</h2>
          <p className="text-sub-1 font-mono text-gray-500" style={{ color }}>{color}</p>
        </div>
      </div>

      <hr className="border-border-strong"/>

      { /* cat info */}
      <div className="grid grid-cols-3 grid-rows-2 gap-y-1">
        <div><p className="text-heading-3 text-center">{event_count}</p></div>
        <div><p className="text-heading-3 text-center border-x border-border-strong">{attendance_count}</p></div>
        <div className="flex items-center justify-center"><FaSquare className="w-4 h-4" style={{ color }}/></div>
        <div className="text-center text-[11px] font-medium uppercase tracking-[0.08em] text-gray-500">Events</div>
        <div className="text-center text-[11px] font-medium uppercase tracking-[0.08em] text-gray-500 border-x border-border-strong">Attends</div>
        <div className="text-center text-[11px] font-medium uppercase tracking-[0.08em] text-gray-500">Color</div>
      </div>
      
      <div className="flex w-full gap-2 mt-2">
          <button 
            className="flex-7 py-2 rounded-xl border-[1.5px] border-border-strong text-ink font-semibold text-[15px] hover:bg-bg-subtle transition-colors"
            onClick={() => onEdit(category)}
          >
            Edit
          </button>
          <button 
            className="flex-3 py-2 rounded-xl border-[1.5px] border-border-strong text-brand-red font-semibold text-[15px] hover:bg-red-50 hover:border-red-200 transition-colors"
            onClick={() => onDelete(id)}
          >
            Delete
          </button>
      </div>
    </div>
  );
}

export default CategoryCard;