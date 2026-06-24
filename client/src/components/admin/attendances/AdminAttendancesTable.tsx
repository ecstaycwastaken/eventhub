import Button from "@/components/Button";
import AdminAttendanceRow, { type AttendanceDetails } from "./AdminAttendanceRow";

interface AdminAttendancesTableProps {
  attendances: AttendanceDetails[];
  loading?: boolean;
  error?: { message?: string } | null;
  onClearFilters: () => void;
  onMarkAttended?: (id: number) => void;
  onDelete?: (id: number) => void;
}

export default function AdminAttendancesTable({
  attendances,
  loading = false,
  error = null,
  onClearFilters,
  onMarkAttended,
  onDelete,
}: AdminAttendancesTableProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20 bg-white rounded-xl border border-border">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-20 bg-white rounded-xl border border-border">
        <p className="text-danger text-body-1">{error.message || "Failed to load attendances"}</p>
      </div>
    );
  }

  if (attendances.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-bg-subtle rounded-xl border border-dashed border-border-strong">
        <p className="text-text-secondary text-body-1 font-medium">No records found matching your criteria.</p>
        <Button 
          bgColorClass="bg-white" 
          textColorClass="text-ink"
          className="mt-4 border border-border-strong rounded-lg px-4 py-2 hover:bg-gray-50 text-button-sm font-semibold shadow-resting"
          onClick={onClearFilters}
        >
          Clear Filters
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-border shadow-resting overflow-hidden">
      <div className="overflow-x-auto no-scrollbar">
        <table className="w-full text-left border-collapse min-w-200">
          <thead>
            <tr className="bg-bg-subtle border-b border-border text-xs uppercase tracking-wider text-text-muted font-medium">
              <th className="px-6 py-4 w-64">User</th>
              <th className="px-6 py-4 w-72">Event</th>
              <th className="px-6 py-4 text-center w-32">Status</th>
              <th className="px-6 py-4 text-center w-32">Code</th>
              <th className="px-6 py-4 text-center w-48">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {attendances.map((attendance) => (
              <AdminAttendanceRow 
                key={attendance.id} 
                attendance={attendance} 
                onMarkAttended={onMarkAttended} 
                onDelete={onDelete} 
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
