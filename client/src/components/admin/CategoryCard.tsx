import { FaSquare } from "react-icons/fa";
import { LuTag } from "react-icons/lu";

export interface CategoryInfo {
  name: string;
  hexcode: string;
  event_count: number;
  attendance_count: number;
};

function CategoryCard({
  name, hexcode, event_count, attendance_count
}: CategoryInfo) {
  return (
    <div className="flex flex-col p-4 gap-4 w-full h-48 justify-center  rounded border border-border-gray">
      <div className="flex items-center gap-2">
        { /* icon */}
        <div className="flex items-center justify-center rounded bg-gray-200 h-10 w-10">
          <LuTag className="h-6 w-6" style={{ color: hexcode }}/>
        </div>
        { /* name and hex */}
        <div className="flex flex-col">
          <h2 className="text-heading-2">{name}</h2>
          <p className="text-sub-1 font-mono" style={{ color: hexcode }}>{hexcode}</p>
        </div>
      </div>

      <hr className="border-border-gray"/>

      { /* cat info */}
      <div className="grid grid-cols-3 grid-rows-2">
        <div><p className="text-heading-3 text-center">{event_count}</p></div>
        <div><p className="text-heading-3 text-center border-x border-border-gray">{attendance_count}</p></div>
        <div className="flex items-center justify-center"><FaSquare className="w-4 h-4" style={{ color: hexcode }}/></div>
        <div className="text-center text-sub-1 font-mono text-gray-500">Events</div>
        <div className="text-center text-sub-1 font-mono text-gray-500 border-x border-border-gray">Attendances</div>
        <div className="text-center text-sub-1 font-mono text-gray-500">Color</div>
      </div>
    </div>
  );
}

export default CategoryCard;