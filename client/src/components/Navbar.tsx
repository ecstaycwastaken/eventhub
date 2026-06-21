import Button from '@/components/Button';
import { FaArrowRight } from "react-icons/fa";
import logoImg from '@/assets/logo.png'

const Navbar = () => {
  return (
    <nav className='border-b border-b-foreground bg-background sticky top-0 z-50'>
      <div className="mx-auto max-w-7xl px-5">
        <div className='flex h-14 items-center justify-between'>
          <img className='h-7' src={logoImg} alt='Eventhub logo' />
          <div className='flex justify-center gap-5 font-dm'>
            <Button
              bgColorClass="bg-transparent" 
              textColorClass="text-[#6B7280]"
              className="px-4 py-2 text-button-md"
            >
              Sign in
            </Button>
            <Button
              bgColorClass="bg-brand-red"
              className="flex items-center gap-2 px-4 py-2 text-button-md rounded"
            >
              Get tickets <FaArrowRight />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar