import type { IconType } from "react-icons";
import { NavLink, useLocation } from "react-router-dom";

interface SidebarLinkProps {
  label: string,
  icon: IconType,
  path: string,
  collapsed: boolean,
}

function SidebarLink({label, icon, path, collapsed}: SidebarLinkProps) {
  const Icon = icon; 
  const { pathname } = useLocation();

  // Normalize pathnames by removing trailing slash for consistent matching
  const normalizedPath = path.replace(/\/$/, "");
  const normalizedCurrent = pathname.replace(/\/$/, "");
  const isActive = path !== '#' && (
    normalizedCurrent === normalizedPath || 
    (
      normalizedPath !== '/admin' &&
      normalizedPath !== '/u/my-events' && 
      normalizedCurrent.startsWith(normalizedPath + '/')
    )
  );

  return (
    <NavLink 
      to={path} 
      onClick={(e) => {
        if (path === '#') {
          e.preventDefault();
        }
      }}
      className={`
        flex items-center px-3 py-2.5 rounded-md text-[15px] font-medium transition-colors
        ${isActive 
          ? "bg-primary text-white" 
          : "text-text-secondary hover:text-ink hover:bg-bg-subtle"
        }
        ${collapsed ? "justify-center" : "justify-start"}
      `}
      title={collapsed ? label : undefined}
    >
      <Icon size={18} className="shrink-0" />
      <span
        className={`
          whitespace-nowrap overflow-hidden transition-all duration-300
          ${collapsed ? "w-0 opacity-0 ml-0" : "w-full opacity-100 ml-3"}
        `}
      >
        {label}
      </span>
    </NavLink>
  )
}

export default SidebarLink;