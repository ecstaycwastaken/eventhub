import { FaCalendar, FaTags, FaUser, FaUserCheck } from "react-icons/fa";
import { FaChartSimple } from "react-icons/fa6";
import SidebarLink from "./SidebarLink";

interface SidebarProps {
  collapsed: boolean,
}

function Sidebar({ collapsed }: SidebarProps) {
  return (
    <aside className={`fixed left-0 top-0 border-r border-border bg-bg-page h-screen transition-all duration-300 flex flex-col z-20 ${collapsed ? "w-20" : "w-64"}`}>
      <div className="flex items-center justify-center h-16 border-b border-border mb-4">
        {!collapsed ? 
          <h1 className="text-lg font-medium">Admin Dashboard</h1>
          :
          <div className="flex items-center justify-center h-7 w-7 bg-brand-red rounded-sm text-white">
            <p>A</p>
          </div>
        }
      </div>

      <nav className="flex flex-col px-3 gap-2">
        <SidebarLink path="/admin" icon={FaChartSimple} label="Dashboard" collapsed={collapsed} />
        <SidebarLink path="/admin/events" icon={FaCalendar} label="Events" collapsed={collapsed} />
        <SidebarLink path="#" icon={FaUser} label="Users" collapsed={collapsed} />
        <SidebarLink path="#" icon={FaUserCheck} label="Attendances" collapsed={collapsed} />
        <SidebarLink path="#" icon={FaTags} label="Categories" collapsed={collapsed} />
      </nav>
    </aside>
  )
}

export default Sidebar;