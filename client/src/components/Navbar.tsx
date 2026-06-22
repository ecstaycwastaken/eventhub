import Button from '@/components/Button';
import logoImg from '@/assets/logo.png'
import { useAuth } from '@/context/AuthContext';
import { FaChevronDown } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

interface NavbarProps {
  onOpenSignIn?: () => void;
}

const Navbar = ({ onOpenSignIn }: NavbarProps) => {
  const { isAuthenticated, user } = useAuth()

  const firstName = user?.username || 'User';
  const initial = firstName.charAt(0).toUpperCase()

  return (
    <nav className='border-b border-b-foreground bg-background sticky top-0 z-50'>
      <div className="mx-auto max-w-7xl px-5">
        <div className='flex h-16 items-center justify-between'>
          <img className='h-7' src={logoImg} alt='Eventhub logo' />

          {isAuthenticated && (
            <div className='hidden md:flex items-center gap-2 font-dm'>
              <NavLink
                to='/home'
                className={({ isActive }: { isActive: boolean }) => `px-5 py-2 text-sm font-semibold rounded-full transition-colors 
                ${isActive ? 'bg-brand-red text-white' : 'text-gray-500 hover:text-gray-900 cursor-pointer'}`}
              >
                Browse Events
              </NavLink>

              <NavLink
                to='/registrations'
                className={({ isActive }: { isActive: boolean }) => `px-5 py-2 text-sm font-semibold rounded-full transition-colors 
                ${isActive ? 'bg-brand-red text-white' : 'text-gray-500 hover:text-gray-900 cursor-pointer'}`}
              >
                My Registration
              </NavLink>

              <NavLink
                to='/my-events'
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
              <div className='flex items-center gap-3 border border-gray-200 rounded-full 
                p-1 pr-3 cursor-pointer hover:bg-gray-50 transition-colors'>
                  <div className='flex items-center justify-center w-8 h-8 rounded-full bg-black text-white text-sm font-bold'>
                    {initial}
                  </div>
                  <span className="text-sm font-medium text-gray-800">
                    {firstName}
                  </span>
                  <FaChevronDown className="text-gray-400 text-xs ml-1" />
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar