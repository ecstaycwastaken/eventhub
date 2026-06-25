import Sidebar, { type NavLinkItem } from "@/components/admin/Sidebar";
import { FiCalendar, FiCheckSquare, FiBarChart2 } from "react-icons/fi";
import { useState } from "react";
import { Outlet } from "react-router-dom";


const hostLinks: NavLinkItem[] = [
    { label: "Events", path: "/u/my-events", icon: FiCalendar },
    { label: "Check-In", path: "/u/my-events/check-in", icon: FiCheckSquare },
    { label: "Reports", path: "/u/my-events/reports", icon: FiBarChart2 },
];

function EventsLayout() {
    const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="flex min-h-[calc(100vh-70px)] bg-[#F9FAFB] font-dm">
      <Sidebar collapsed={collapsed} title="Host Dashboard" links={hostLinks} onToggle={() => setCollapsed(!collapsed)} />

      <div className="flex-1 flex flex-col min-w-0">

        <main className="flex-1 p-6 text-body-1 color-foreground">
          <Outlet />
        </main>

      </div>
    </div>
  )
}

export default EventsLayout