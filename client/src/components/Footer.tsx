import logoImg from '@/assets/logo.png'

function Footer() {
  return (
    <footer className="flex items-center justify-between px-14 py-7 z-30 font-dm border-t border-t-foreground bg-background">
        <div className='flex flex-col items-start gap-2'>
            <img className='h-5' src={logoImg} alt='Eventhub logo' />
            <p className='text-[#6B7280] text-sub-2 ml-1'>
                Your go-to platform for discovering and registering
                <br /> for events that matter.
            </p>
        </div>
        <div className='flex flex-col items-end gap-2'>
            <div className='flex gap-4'>
                <p className='text-[#6B7280] text-sub-2'>About</p>
                <p className='text-[#6B7280] text-sub-2'>Contact</p>
                <p className='text-[#6B7280] text-sub-2'>Privacy</p>
            </div>
            <p className='text-[#6B7280] text-sub-2'>
                © 2026 EventHub. All rights reserved.
            </p>
        </div>
    </footer>
  )
}

export default Footer