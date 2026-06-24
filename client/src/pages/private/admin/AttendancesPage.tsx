import { useState, useMemo, useCallback } from "react";
import { PageHeader } from "@/components/admin";
import { 
  AdminAttendancesFilter, 
  AdminAttendancesTable, 
  type AttendanceDetails 
} from "@/components/admin/attendances";
import { LuLibrary, LuEllipsis, LuUserCheck } from "react-icons/lu";
import { toast } from "sonner";

function AttendancesPage() {
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const [attendances, setAttendances] = useState<AttendanceDetails[]>([
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
      id: 3,
      first_name: "Juan",
      last_name: "Dela Cruz",
      username: "jdc_123",
      profile_url: "https://images.unsplash.com/photo-1780995175298-5b1abe9642cc?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      event_name: "Tunay na event",
      event_category: "Music",
      event_color: "#1e3a8a",
      event_date: "Jan 30, 2027",
      status: "registered",
      code: "SWF-0002"
    },
  ]);

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

  const handleMarkAttended = (id: number) => {
    setAttendances(prev => prev.map(a => 
      a.id === id ? { ...a, status: "attended" as const } : a
    ));
    toast.success("Attendance marked successfully!", {
      classNames: {
        toast: 'bg-[#F1FFEB] text-[#44A872] font-dm font-medium rounded-xl border border-[#44A872]'
      }
    });
  };

  const handleDelete = (id: number) => {
    setAttendances(prev => prev.filter(a => a.id !== id));
    toast.success("Record deleted successfully!", {
      classNames: {
        toast: 'bg-[#F1FFEB] text-[#44A872] font-dm font-medium rounded-xl border border-[#44A872]'
      }
    });
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
        onClearFilters={handleClearFilters}
        onMarkAttended={handleMarkAttended}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default AttendancesPage;