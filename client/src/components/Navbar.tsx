import Button from '@/components/Button'
import logoImg from '@/assets/logo.png'
import { useAuth } from '@/context/AuthContext'
import { FaChevronDown } from 'react-icons/fa'
import { NavLink, Link } from 'react-router-dom'
import { useState } from 'react'

interface NavbarProps {
  onOpenSignIn?: () => void;
}

const Navbar = ({ onOpenSignIn }: NavbarProps) => {
  const { isAuthenticated, user, logout } = useAuth()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const displayName = user?.username || user?.first_name || 'User';
  const initial = displayName.charAt(0).toUpperCase()

  return (
    <nav className='border-b border-b-foreground bg-background sticky top-0 z-50'>
      <div className="mx-auto max-w-7xl px-5">
        <div className='flex h-16 items-center justify-between'>
          <img className='h-7' src={logoImg} alt='Eventhub logo' />

          {isAuthenticated && (
            <div className='hidden md:flex items-center gap-2 font-dm'>
              <NavLink
                to='/home/events'
                className={({ isActive }: { isActive: boolean }) => `px-5 py-2 text-sm font-semibold rounded-full transition-colors 
                ${isActive ? 'bg-brand-red text-white' : 'text-gray-500 hover:text-gray-900 cursor-pointer'}`}
              >
                Browse Events
              </NavLink>

              <NavLink
                to='/home/registrations'
                className={({ isActive }: { isActive: boolean }) => `px-5 py-2 text-sm font-semibold rounded-full transition-colors 
                ${isActive ? 'bg-brand-red text-white' : 'text-gray-500 hover:text-gray-900 cursor-pointer'}`}
              >
                My Registration
              </NavLink>

              <NavLink
                to='/home/my-events'
                className={({ isActive }: { isActive: boolean }) => `px-5 py-2 text-sm font-semibold rounded-full transition-colors 
                ${isActive ? 'bg-brand-red text-white' : 'text-gray-500 hover:text-gray-900 cursor-pointer'}`}
              >
                My Events
              </NavLink>
            </div>
          )}

          <div className='flex justify-end font-dm shrink-0'>
            {!isAuthenticated ? (
              <Button
                bgColorClass="bg-brand-red"
                className="px-4 py-2 text-button-md rounded"
                onClick={onOpenSignIn}
              >
                Sign in
              </Button> 
            ) : (
              <div className='relative'>
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
                    <Button
                      bgColorClass="bg-transparent"
                      textColorClass="text-brand-red"
                      className="w-full text-left px-4 py-2 text-sm hover:bg-red-100 font-medium transition-colors"
                      onClick={() => {
                        logout()
                        setIsDropdownOpen(false)
                      }}
                    >
                      Sign out
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar