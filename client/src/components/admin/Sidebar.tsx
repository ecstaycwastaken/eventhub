import { FaCalendar, FaTags, FaUser, FaUserCheck } from "react-icons/fa";
import { FaChartSimple } from "react-icons/fa6";
import { FiMenu } from "react-icons/fi";
import type { IconType } from "react-icons";
import { IoMdArrowBack } from "react-icons/io";
import SidebarLink from "./SidebarLink";

export interface NavLinkItem {
  label: string;
  path: string;
  icon: IconType;
}

interface SidebarProps {
  collapsed: boolean;
  title?: string;
  links?: NavLinkItem[];
  onToggle?: () => void;
}

const defaultAdminLinks: NavLinkItem[] = [
  { label: "Dashboard", path: "/admin", icon: FaChartSimple },
  { label: "Events", path: "/admin/events", icon: FaCalendar },
  { label: "Users", path: "/admin/users", icon: FaUser },
  { label: "Attendances", path: "/admin/attendances", icon: FaUserCheck },
  { label: "Categories", path: "/admin/categories", icon: FaTags },
];

function Sidebar({ collapsed, title = "Admin Dashboard", links = defaultAdminLinks, onToggle }: SidebarProps) {
  return (
    <aside className={`sticky left-0 top-0 border-r border-border bg-bg-page h-[calc(100vh-70px)] transition-all duration-300 flex flex-col z-20 ${collapsed ? "w-18" : "w-64"}`}>
      <div className="flex items-center h-16 border-b border-border px-5 mb-4 gap-4">
        {onToggle && (
            <button onClick={onToggle} className="text-gray-500 hover:text-black transition-colors shrink-0">
                <FiMenu size={20} />
            </button>
        )}
        
        {!collapsed && (
          <h1 className="text-lg font-bold text-gray-900 truncate">{title}</h1>
        )}
      </div>

      <nav className="flex flex-col px-3 gap-2 h-full">
        {links.map((link) => (
          <SidebarLink 
            key={link.path}
            path={link.path}
            icon={link.icon}
            label={link.label}
            collapsed={collapsed}
          />
        ))}
        <div className="mt-auto mb-4">
          <SidebarLink
            path="/u/events"
            icon={IoMdArrowBack}
            label="Return to EventHub"
            collapsed={collapsed}
          />
        </div>
      </nav>
    </aside>
  )
}

export default Sidebar;