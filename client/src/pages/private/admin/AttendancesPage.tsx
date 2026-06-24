import AttendanceRow, { type AttendanceDetails } from "@/components/admin/AttendanceRow";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { LuEllipsis, LuLibrary, LuUserCheck } from "react-icons/lu";

function AttendancesPage() {
  const [search, setSearch] = useState("");
  const [statuses, _setStatuses] = useState<string[]>([
    "all", "registered", "attended"
  ]);
  const [selectedStatus, setSelectedStatus] = useState("all");

  const [attendances, _setAttendances] = useState<AttendanceDetails[]>([
    {
      id: 1,
      first_name: "Karl Joseph",
      last_name: "Logdat",
      username: "ctrlaltdel2",
      profile_url: "https://images.unsplash.com/photo-1780556934041-b92ce1112b45?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      event_name: "Real Event",
      event_category: "Technology",
      event_color: "#be123c",
      event_date: "Mar 30, 2005",
      status: "attended",
      code: "SWF-1727"
    },
    {
      id: 2,
      first_name: "Juan",
      last_name: "Dela Cruz",
      username: "jdc_123",
      profile_url: "https://plus.unsplash.com/premium_photo-1716138192476-f34e85ad43c2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      event_name: "Tunay na event",
      event_category: "Music",
      event_color: "#1e3a8a",
      event_date: "Jan 30, 2027",
      status: "registered",
      code: "SWF-0001"
    },
    {
      id: 2,
      first_name: "Juan",
      last_name: "Dela Cruz",
      username: "jdc_123",
      profile_url: "https://images.unsplash.com/photo-1780995175298-5b1abe9642cc?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      event_name: "Tunay na event",
      event_category: "Music",
      event_color: "#1e3a8a",
      event_date: "Jan 30, 2027",
      status: "registered",
      code: "SWF-0001"
    },
  ]);

  return (
    <div className="flex flex-col h-full">
      <div className="w-full bg-white rounded-lg mb-8 shadow-sm border border-border-gray">
        <div className="grid grid-cols-2 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
        
        <div className="p-6 flex flex-col items-center justify-center text-center border-r border-black/10">
          <span className="text-3xl font-bold mb-1">12</span>
          <span className="text-[11px] uppercase tracking-wider font-medium text-gray-400 mb-2 flex items-center gap-1.5"><LuLibrary /> TOTAL RECORDS</span>
          <span className="text-sm text-gray-500">Across all events</span>
        </div>

        <div className="p-6 flex flex-col items-center justify-center text-center border-r border-black/10">
          <span className="text-3xl font-bold mb-1">7</span>
          <span className="text-[11px] uppercase tracking-wider font-medium text-gray-400 mb-2 flex items-center gap-1.5"><LuEllipsis /> REGISTERED</span>
          <span className="text-sm text-gray-500">Pending attendances</span>
        </div>

        <div className="p-6 flex flex-col items-center justify-center text-center border-r border-black/10">
          <span className="text-3xl font-bold mb-1">27</span>
          <span className="text-[11px] uppercase tracking-wider font-medium text-gray-400 mb-2 flex items-center gap-1.5"><LuUserCheck /> ATTENDED</span>
          <span className="text-sm text-gray-500">Users who attended</span>
        </div>

        </div>
      </div>

      {/* search and filter */}
      <div className="flex w-full items-center gap-2">
        <div className="flex items-center flex-1 border border-gray-300 rounded-md p-2 gap-2">
          <FaSearch className="text-gray-300" />
          <input
            type="text"
            placeholder="Search attendances..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full
              focus:outline-none
            "
          />
        </div>

        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="rounded-md border border-gray-300 px-4 py-2 focus:outline-none"
        >
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <table className="w-full table-fixed my-8 rounded-md border border-border-gray border-separate border-spacing-2">
        <thead>
          <tr className="my-4">
            <th className="w-64">USER</th>
            <th className="text-center w-64">EVENT</th>
            <th className="text-center w-24">STATUS</th>
            <th className="text-center">CODE</th>
            <th className="text-center w-64">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {
            attendances.map((attendance) => (
              <AttendanceRow
                id={attendance.id}
                first_name={attendance.first_name}
                last_name={attendance.last_name}
                username={attendance.username}
                profile_url={attendance.profile_url}
                event_name={attendance.event_name}
                event_category={attendance.event_category}
                event_color={attendance.event_color}
                event_date={attendance.event_date}
                status={attendance.status}
                code={attendance.code}
              />
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default AttendancesPage;