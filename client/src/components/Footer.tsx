import logoImg from '@/assets/logo.png'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="flex items-center justify-between px-14 py-7 z-30 font-dm border-t border-t-foreground bg-background">
        <Link to="/" className='flex flex-col items-start gap-2 cursor-pointer hover:opacity-80 transition-opacity'>
            <img className='h-5' src={logoImg} alt='Eventhub logo' />
            <p className='text-[#6B7280] text-sub-2 ml-1'>
                Your go-to platform for discovering and registering
                <br /> for events that matter.
            </p>
        </Link>
        <div className='flex flex-col items-end gap-2'>
            <div className='flex gap-4'>
                <Link to="/about" className='text-[#6B7280] text-sub-2 hover:text-[#111111] transition-colors'>About</Link>
                <Link to="/contact" className='text-[#6B7280] text-sub-2 hover:text-[#111111] transition-colors'>Contact</Link>
                <Link to="/privacy" className='text-[#6B7280] text-sub-2 hover:text-[#111111] transition-colors'>Privacy</Link>
            </div>
            <p className='text-[#6B7280] text-sub-2'>
                © 2026 EventHub. All rights reserved.
            </p>
        </div>
    </footer>
  )
}

export default Footer