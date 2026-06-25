import { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import Button from '@/components/Button';
import logoImg from '@/assets/logo.png';
import { useAuth } from '@/hooks/useAuth';
import { FaChevronDown, FaBars, FaTimes } from 'react-icons/fa';

interface NavbarProps {
  onOpenSignIn?: () => void;
}

const Navbar = ({ onOpenSignIn }: NavbarProps) => {
  const { isAuthenticated, user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const displayName = user?.username || user?.first_name || 'User';
  const initial = displayName.charAt(0).toUpperCase();

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const onLogout = () => {
    logout();
    setIsDropdownOpen(false);
  }

  return (
    <nav className='border-b border-b-foreground bg-background sticky top-0 z-50'>
      <div className="mx-auto max-w-7xl px-5">
        <div className='flex h-16 items-center justify-between'>
          <img className='h-7' src={logoImg} alt='Eventhub logo' />

          {isAuthenticated && (
            <div className='hidden md:flex items-center gap-2 font-dm'>
              <NavLink
                to='/u/events'
                className={({ isActive }: { isActive: boolean }) => `px-5 py-2 text-sm font-semibold rounded-full transition-colors 
                ${isActive ? 'bg-brand-red text-white' : 'text-gray-500 hover:text-gray-900 cursor-pointer'}`}
              >
                Browse Events
              </NavLink>

              <NavLink
                to='/u/my-registrations'
                className={({ isActive }: { isActive: boolean }) => `px-5 py-2 text-sm font-semibold rounded-full transition-colors 
                ${isActive ? 'bg-brand-red text-white' : 'text-gray-500 hover:text-gray-900 cursor-pointer'}`}
              >
                My Registration
              </NavLink>

              <NavLink
                to='/u/my-events'
                className={({ isActive }: { isActive: boolean }) => `px-5 py-2 text-sm font-semibold rounded-full transition-colors 
                ${isActive ? 'bg-brand-red text-white' : 'text-gray-500 hover:text-gray-900 cursor-pointer'}`}
              >
                My Events
              </NavLink>
            </div>
          )}

          <div className='flex items-center justify-end gap-3 font-dm shrink-0'>
            {!isAuthenticated ? (
              <Button
                bgColorClass="bg-brand-red"
                className="px-4 py-2 text-button-md rounded"
                onClick={onOpenSignIn}
              >
                Sign in
              </Button> 
            ) : (
              <div className='relative' ref={dropdownRef}>
                <div className='flex items-center gap-3 border border-gray-200 rounded-full 
                  p-1 pr-3 cursor-pointer hover:bg-gray-50 transition-colors'
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}  
                >
                    <div className='flex items-center justify-center w-8 h-8 rounded-full bg-black text-white text-sm font-bold'>
                      {initial}
                    </div>
                    <span className="text-sm font-medium text-gray-800">
                      {displayName}
                    </span>
                    <FaChevronDown className="text-gray-400 text-xs ml-1" />
                </div>
                
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100 mb-1">
                      <p className="text-xs text-gray-500">Signed in as</p>
                      <p className="text-sm font-bold text-gray-900 truncate">{user?.email}</p>
                    </div>
                    {user?.role === 'admin' && (
                      <NavLink
                        to="/admin"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-medium transition-colors"
                      >
                        Admin Dashboard
                      </NavLink>
                    )}
                    <Button
                      bgColorClass="bg-transparent"
                      textColorClass="text-brand-red"
                      className="w-full text-left px-4 py-2 text-sm hover:bg-red-100 font-medium transition-colors"
                      onClick={onLogout}
                    >
                      Sign out
                    </Button>
                  </div>
                )}
              </div>
            )}

            {isAuthenticated && (
              <button 
                className='md:hidden text-gray-600 hover:text-gray-900 focus:outline-none ml-1 flex items-center justify-center h-8 w-8'
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
              </button>
            )}
          </div>
        </div>
      </div>

      {isAuthenticated && isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-5 py-4 flex flex-col gap-2 font-dm absolute top-full w-full left-0 shadow-md z-40">
          <NavLink
            to='/u/events'
            onClick={() => setIsMobileMenuOpen(false)}
            className={({ isActive }: { isActive: boolean }) => `block px-4 py-3 text-sm font-semibold rounded-lg transition-colors 
            ${isActive ? 'bg-brand-red text-white' : 'text-gray-700 hover:bg-gray-50'}`}
          >
            Browse Events
          </NavLink>
          <NavLink
            to='/u/my-registrations'
            onClick={() => setIsMobileMenuOpen(false)}
            className={({ isActive }: { isActive: boolean }) => `block px-4 py-3 text-sm font-semibold rounded-lg transition-colors 
            ${isActive ? 'bg-brand-red text-white' : 'text-gray-700 hover:bg-gray-50'}`}
          >
            My Registration
          </NavLink>
          <NavLink
            to='/u/my-events'
            onClick={() => setIsMobileMenuOpen(false)}
            className={({ isActive }: { isActive: boolean }) => `block px-4 py-3 text-sm font-semibold rounded-lg transition-colors 
            ${isActive ? 'bg-brand-red text-white' : 'text-gray-700 hover:bg-gray-50'}`}
          >
            My Events
          </NavLink>
        </div>
      )}
    </nav>
  )
}

export default Navbar