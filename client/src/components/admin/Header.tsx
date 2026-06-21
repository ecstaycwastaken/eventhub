import { FaBars } from "react-icons/fa";

interface HeaderProps {
    collapsed: boolean,
    setCollapsed: React.Dispatch<React.SetStateAction<boolean>>,
}

function Header({ collapsed, setCollapsed }: HeaderProps) {
    return (
        <header className="h-16 flex items-center px-4">
            <button onClick={() => setCollapsed(!collapsed)} className="p-2 rounded">
                <FaBars />
            </button>

            <h1 className="ml-4">Admin Dashboard</h1>
        </header>
    )
}

export default Header;