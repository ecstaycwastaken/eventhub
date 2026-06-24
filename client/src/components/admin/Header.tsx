import { FaBars } from "react-icons/fa";
import logoImg from '@/assets/logo.png';

interface HeaderProps {
    collapsed: boolean,
    setCollapsed: React.Dispatch<React.SetStateAction<boolean>>,
}

function Header({ collapsed, setCollapsed }: HeaderProps) {
    return (
        <header className="sticky top-0 z-40 h-16 flex items-center px-4 py-8 bg-white border-b border-gray-300">
            <button onClick={() => setCollapsed(!collapsed)} className="p-2 rounded">
                <FaBars />
            </button>

            <div className="ml-4">
                <img className="h-7" src={logoImg} alt="EventHub Logo" />
            </div>
        </header>
    )
}

export default Header;