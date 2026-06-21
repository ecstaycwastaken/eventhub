import { FaCalendar, FaTags, FaUser, FaUserCheck } from "react-icons/fa";
import { FaChartSimple, FaE } from "react-icons/fa6";
import logoImg from '@/assets/logo.png';
import SidebarLink from "./SidebarLink";

interface SidebarProps {
  collapsed: boolean,
}

function Sidebar({ collapsed }: SidebarProps) {
  return (
    <aside className={`border-r border-gray-300 h-screen ${collapsed ? "w-16" : "w-64"}`}>
      {!collapsed ? 
      <img className="m-2 h-7" src={logoImg} alt="EventHub Logo" />
      :
      <FaE className="my-2 mx-4 h-7"/>
      }

      <nav className="mt-2">
        <SidebarLink path="/" icon={FaChartSimple} label="Dashboard" collapsed={collapsed} />
        <SidebarLink path="#" icon={FaCalendar} label="Events" collapsed={collapsed} />
        <SidebarLink path="#" icon={FaUser} label="Users" collapsed={collapsed} />
        <SidebarLink path="#" icon={FaUserCheck} label="Attendances" collapsed={collapsed} />
      </nav>
    </aside>
  )
}

export default Sidebar;