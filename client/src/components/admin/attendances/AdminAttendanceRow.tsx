import { LuHash, LuCheck, LuTrash2 } from "react-icons/lu";
import Button from "@/components/Button";

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
}

interface AdminAttendanceRowProps {
  attendance: AttendanceDetails;
  onMarkAttended?: (id: number) => void;
  onDelete?: (id: number) => void;
}

export default function AdminAttendanceRow({ attendance, onMarkAttended, onDelete }: AdminAttendanceRowProps) {
  const isRegistered = attendance.status === "registered";

  const getInitials = (first: string, last: string) => {
    return `${first?.charAt(0) || ""}${last?.charAt(0) || ""}`.toUpperCase() || "U";
  };

  return (
    <tr className="hover:bg-bg-subtle transition-colors group">
      {/* User Information */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          {attendance.profile_url ? (
            <img
              className="w-10 h-10 rounded-full object-cover border border-border"
              src={attendance.profile_url}
              alt={attendance.username}
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold border border-primary/20">
              {getInitials(attendance.first_name, attendance.last_name)}
            </div>
          )}
          <div className="flex flex-col">
            <p className="text-body-1 font-bold text-ink">
              {attendance.first_name} {attendance.last_name}
            </p>
            <p className="text-sm text-text-secondary">@{attendance.username}</p>
          </div>
        </div>
      </td>

      {/* Event Information */}
      <td className="px-6 py-4">
        <div className="flex flex-col">
          <p className="text-body-1 font-bold text-ink">{attendance.event_name}</p>
          <div className="flex gap-2 items-center mt-1">
            <span 
              className="inline-flex items-center justify-center px-2 py-0.5 rounded-pill text-[11px] font-semibold uppercase tracking-wide bg-opacity-10" 
              style={{ color: attendance.event_color, backgroundColor: `${attendance.event_color}1A` }}
            >
              {attendance.event_category}
            </span>
            <p className="text-xs text-text-secondary">{attendance.event_date}</p>
          </div>
        </div>
      </td>

      {/* Status */}
      <td className="px-6 py-4 text-center">
        <span
          className={`inline-flex items-center justify-center px-2.5 py-0.5 rounded-pill text-xs font-semibold uppercase tracking-wide
          ${
            isRegistered
              ? "bg-warning-bg text-warning-text border border-warning-border"
              : "bg-success-bg text-success-text"
          }`}
        >
          {attendance.status}
        </span>
      </td>

      {/* Code */}
      <td className="px-6 py-4 text-center">
        <div className="flex gap-1.5 items-center justify-center bg-bg-subtle px-2 py-1 rounded border border-border w-fit mx-auto">
          <LuHash className="text-text-muted" size={14}/>
          <p className="text-sm font-mono text-ink font-medium tracking-wide">{attendance.code}</p>
        </div>
      </td>

      {/* Actions */}
      <td className="px-6 py-4">
        <div className="flex items-center justify-center gap-3">
          {isRegistered ? (
            <Button 
              className="flex gap-1.5 items-center px-3 py-1.5 rounded-lg border border-success-text/30"
              bgColorClass="bg-success-bg"
              textColorClass="text-success-text hover:bg-success/20 transition-colors"
              onClick={() => onMarkAttended && onMarkAttended(attendance.id)}
            >
              <LuCheck size={14} />
              <span className="text-xs font-semibold">Mark Attended</span>
            </Button> 
          ) : (
             <div className="w-[124px]"></div> /* Placeholder for alignment */
          )}
          <button 
            className="p-2 text-text-secondary hover:text-danger hover:bg-danger/10 rounded-full transition-all"
            onClick={() => onDelete && onDelete(attendance.id)}
          >
            <LuTrash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  )
}
