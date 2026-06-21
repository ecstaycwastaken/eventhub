import type { IconType } from "react-icons";
import { NavLink } from "react-router-dom";

interface SidebarLinkProps {
  label: string,
  icon: IconType,
  path: string,
  collapsed: boolean,
}

function SidebarLink({label, icon, path, collapsed}: SidebarLinkProps) {
  const Icon = icon; 

  return (
    <NavLink to={path} className='w-full flex items-center px-4 py-3 hover:bg-gray-200'>
      <Icon size={20}/>
      <span
        className={`
          ml-3 whitespace-nowrap overflow-hidden transition-all duration-300 text-left
          ${collapsed ? "w-0 opacity-0" : "w-32 opacity-100"}
        `}
      >
        {label}
      </span>
    </NavLink>
  )
}

export default SidebarLink;