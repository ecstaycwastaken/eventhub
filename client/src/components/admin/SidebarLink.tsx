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
        flex flex-col md:flex-row items-center justify-center md:justify-start
        px-1 md:px-3 py-1.5 md:py-2.5 rounded-md transition-colors font-medium
        ${isActive 
          ? "text-primary md:bg-primary md:text-white" 
          : "text-text-secondary hover:text-ink hover:bg-bg-subtle"
        }
        ${collapsed ? "md:justify-center" : "md:justify-start"}
        flex-1 md:flex-none w-full md:w-auto h-full md:h-auto
      `}
      title={collapsed ? label : undefined}
    >
      <Icon className="text-[20px] md:text-[18px] shrink-0 mb-1 md:mb-0" />
      <span
        className={`
          text-[10px] md:text-[15px]
          whitespace-nowrap overflow-hidden transition-all duration-300
          md:ml-3
          ${collapsed ? "md:w-0 md:opacity-0 md:ml-0 hidden md:block" : "w-full md:w-full opacity-100 block"}
          text-center md:text-left
        `}
      >
        {label}
      </span>
    </NavLink>
  )
}

export default SidebarLink;