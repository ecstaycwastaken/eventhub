import { LuHash, LuCheck, LuTrash2 } from "react-icons/lu";
import Button from "../Button";

export interface AttendanceDetails {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  profile_url: string;
  event_name: string;
  event_category: string;
  event_color: string;
  event_date: string;
  status: "registered" | "attended";
  code: string;
};

function AttendanceRow({
  first_name, last_name, username, profile_url, event_name, event_category, 
  event_color, event_date, status, code
}: AttendanceDetails) {
  return (
    <tr className="my-4">
      <td>
        <div className="flex items-center gap-4 px-8">
          <img
            className="w-10 h-10 rounded-full object-cover"
            src={profile_url}
          />
          <div className="flex flex-col">
            <p className="text-sub-1 font-bold">{first_name + " " + last_name}</p>
            <p className="text-sub-1 text-gray-500 font-mono">{username}</p>
          </div>
        </div>
      </td>

      <td>
        <div className="flex flex-col px-8">
          <p className="text-sub-1 font-bold">{event_name}</p>
          <div className="flex gap-2">
            <p className={`text-sub-1 font-mono rounded`} style={{ color: event_color }}>{event_category}</p>
            <p className="text-sub-1 text-gray-500 font-mono">{event_date}</p>
          </div>
        </div>
      </td>

      <td>
        <p 
          className={`
            text-sub-1
            ${status === "registered" ? "bg-amber-300 text-amber-600" : "bg-green-300 text-green-600"}
            font-mono 
            py-0.5 
            px-1 
            text-center 
            rounded`}
        >
          {status === "registered" ? "REGISTERED" : "ATTENDED"}
        </p>
      </td>

      <td>
        <div className="flex gap-2 items-center justify-center">
          <LuHash className="text-gray"/>
          <p className="text-sub-1 font-mono">{code}</p>
        </div>
      </td>

      <td>
        <div className="flex gap-4 items-center justify-center">
          {
            status === "registered" ? 
              <Button 
                className="flex gap-2 items-center px-2 py-0.5 rounded"
                bgColorClass="bg-green-300"
                textColorClass="text-green-600"
              >
                <LuCheck />
                Mark Attended
              </Button> 
          : ""}
          <LuTrash2 className="text-red-600 cursor-pointer"/>
        </div>
      </td>
    </tr>
  )
}

export default AttendanceRow;