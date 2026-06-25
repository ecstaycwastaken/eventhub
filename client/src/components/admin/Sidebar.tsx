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
  className?: string;
}

const defaultAdminLinks: NavLinkItem[] = [
  { label: "Dashboard", path: "/admin", icon: FaChartSimple },
  { label: "Events", path: "/admin/events", icon: FaCalendar },
  { label: "Users", path: "/admin/users", icon: FaUser },
  { label: "Attendances", path: "/admin/attendances", icon: FaUserCheck },
  { label: "Categories", path: "/admin/categories", icon: FaTags },
];

function Sidebar({ collapsed, title = "Admin Dashboard", links = defaultAdminLinks, onToggle, className }: SidebarProps) {
  return (
    <aside className={`
      fixed bottom-0 left-0 right-0 z-50 bg-bg-page border-t border-border flex flex-row h-16
      md:flex-col md:border-r md:border-t-0 md:transition-all md:duration-300 md:z-20
      ${collapsed ? "md:w-18" : "md:w-64"}
      ${className || "md:sticky md:top-0 md:h-screen"}
    `}>
      <div className="hidden md:flex items-center h-16 border-b border-border px-5 mb-4 gap-4">
        {onToggle && (
            <button onClick={onToggle} className="text-gray-500 hover:text-black transition-colors shrink-0">
                <FiMenu size={20} />
            </button>
        )}
        
        {!collapsed && (
          <h1 className="text-lg font-bold text-gray-900 truncate">{title}</h1>
        )}
      </div>

      <nav className="flex flex-row md:flex-col justify-around md:justify-start px-1 md:px-3 gap-1 md:gap-2 h-full md:h-auto w-full flex-1">
        {links.map((link) => (
          <SidebarLink 
            key={link.path}
            path={link.path}
            icon={link.icon}
            label={link.label}
            collapsed={collapsed}
          />
        ))}
        <SidebarLink
          path="/u/events"
          icon={IoMdArrowBack}
          label="Return"
          collapsed={collapsed}
          className="md:mt-auto md:mb-4"
        />
      </nav>
    </aside>
  )
}

export default Sidebar;