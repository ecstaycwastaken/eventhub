import { useState, useMemo, useCallback, useEffect } from "react";
import { PageHeader } from "@/components/admin";
import { 
  AdminAttendancesFilter, 
  AdminAttendancesTable, 
  type AttendanceDetails 
} from "@/components/admin/attendances";
import DeleteConfirmationModal from "@/components/ui/DeleteConfirmationModal";
import { LuLibrary, LuEllipsis, LuUserCheck } from "react-icons/lu";
import { toast } from "sonner";
import { useHttp } from "@/hooks";
import type { GetAllEventsAttendanceResponse } from "@/types/response";

function AttendancesPage() {
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [deleteAttendanceId, setDeleteAttendanceId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const { sendRequest, loading, error } = useHttp<GetAllEventsAttendanceResponse>();
  const [attendances, setAttendances] = useState<AttendanceDetails[]>([]);

  useEffect(() => {
    const fetchAttendances = async () => {
      const response = await sendRequest({
        method: "GET",
        url: "/api/v1/event/all-events-attendances",
      });

      if (response && response.data.events_attendance_data) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const flatAttendances: AttendanceDetails[] = response.data.events_attendance_data.flatMap((event: any) => 
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          event.attendees.map((a: any) => ({
            id: a.code, // The backend delete uses the code as the unique identifier
            first_name: a.first_name || (a.full_name ? a.full_name.split(' ')[0] : ""),
            last_name: a.last_name || (a.full_name ? a.full_name.split(' ').slice(1).join(' ') : ""),
            username: a.username || (a.full_name ? a.full_name.replace(/\s/g, '').toLowerCase() : "unknown"),
            profile_url: a.profile_url || "",
            event_id: event.event_id,
            event_name: event.title,
            event_category: event.category || "General",
            event_color: event.color || "#6b7280",
            event_date: event.date,
            status: a.status,
            code: a.code,
          }))
        );
        setAttendances(flatAttendances);
      }
    };
    fetchAttendances();
  }, [sendRequest]);

  const filteredAttendances = useMemo(() => {
    let filtered = attendances;

    if (selectedStatus !== "all") {
      filtered = filtered.filter((a) => a.status.toLowerCase() === selectedStatus.toLowerCase());
    }

    if (search) {
      const query = search.toLowerCase();
      filtered = filtered.filter(
        (a) =>
          a.first_name.toLowerCase().includes(query) ||
          a.last_name.toLowerCase().includes(query) ||
          a.username.toLowerCase().includes(query) ||
          a.event_name.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [attendances, search, selectedStatus]);

  const handleClearFilters = useCallback(() => {
    setSearch("");
    setSelectedStatus("all");
  }, []);

  const handleMarkAttended = async (attendance: AttendanceDetails) => {
    try {
      const response = await sendRequest({
        method: "POST",
        url: `/api/v1/event/check-in?event_id=${attendance.event_id}&code=${attendance.code}`
      });
      if (response) {
        setAttendances(prev => prev.map(a => 
          a.id === attendance.id ? { ...a, status: "attended" as const } : a
        ));
        toast.success("Attendance marked successfully!", {
          classNames: {
            toast: 'bg-[#F1FFEB] text-[#44A872] font-dm font-medium rounded-xl border border-[#44A872]'
          }
        });
      }
    } catch (err: unknown) {
      toast.error((err as Error).message || "Failed to mark attendance.");
    }
  };

  const handleDeleteClick = (id: string) => {
    setDeleteAttendanceId(id);
  };

  const confirmDelete = async () => {
    if (!deleteAttendanceId) return;
    
    setIsDeleting(true);
    try {
      const response = await sendRequest({
        method: "DELETE",
        url: `/api/v1/event/attendance/${deleteAttendanceId}`
      });
      if (response) {
        setAttendances(prev => prev.filter(a => a.id !== deleteAttendanceId));
        toast.success("Record deleted successfully!", {
          classNames: {
            toast: 'bg-[#F1FFEB] text-[#44A872] font-dm font-medium rounded-xl border border-[#44A872]'
          }
        });
      }
    } catch (err: unknown) {
      toast.error((err as Error).message || "Failed to delete record.");
    } finally {
      setIsDeleting(false);
      setDeleteAttendanceId(null);
    }
  };

  const stats = {
    total: attendances.length,
    registered: attendances.filter(a => a.status === "registered").length,
    attended: attendances.filter(a => a.status === "attended").length
  };

  return (
    <div className="flex flex-col h-full font-dm pb-10">
      <PageHeader 
        title="Attendances" 
        subtitle="Manage event registrations and attendances"
        total={attendances.length}
        type="attendances"
      />

      {/* Stats Summary */}
      <div className="w-full bg-white rounded-xl mb-8 shadow-sm border border-border-gray">
        <div className="grid grid-cols-2 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-black/10">
          <div className="p-6 flex flex-col items-center justify-center text-center border-r border-black/10">
            <span className="text-3xl font-bold mb-1">{stats.total}</span>
            <span className="text-[11px] uppercase tracking-wider font-medium text-gray-400 mb-2 flex items-center gap-1.5"><LuLibrary /> TOTAL RECORDS</span>
            <span className="text-sm text-gray-500">Across all events</span>
          </div>

          <div className="p-6 flex flex-col items-center justify-center text-center border-r border-black/10">
            <span className="text-3xl font-bold mb-1">{stats.registered}</span>
            <span className="text-[11px] uppercase tracking-wider font-medium text-gray-400 mb-2 flex items-center gap-1.5"><LuEllipsis /> REGISTERED</span>
            <span className="text-sm text-gray-500">Pending attendances</span>
          </div>

          <div className="p-6 flex flex-col items-center justify-center text-center">
            <span className="text-3xl font-bold mb-1">{stats.attended}</span>
            <span className="text-[11px] uppercase tracking-wider font-medium text-gray-400 mb-2 flex items-center gap-1.5"><LuUserCheck /> ATTENDED</span>
            <span className="text-sm text-gray-500">Users who attended</span>
          </div>
        </div>
      </div>

      <AdminAttendancesFilter 
        search={search}
        setSearch={setSearch}
        status={selectedStatus}
        setStatus={setSelectedStatus}
      />

      <AdminAttendancesTable 
        attendances={filteredAttendances}
        loading={loading}
        error={error}
        onClearFilters={handleClearFilters}
        onMarkAttended={handleMarkAttended}
        onDelete={handleDeleteClick}
      />

      <DeleteConfirmationModal 
        isOpen={!!deleteAttendanceId}
        title="Delete Attendance"
        description="Are you sure you want to delete this attendance record? This action cannot be undone."
        isDeleting={isDeleting}
        onCancel={() => setDeleteAttendanceId(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}

export default AttendancesPage;
