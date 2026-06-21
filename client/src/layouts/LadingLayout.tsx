import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthModal from "@/components/auth/AuthModal";

function LandingLayout() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authTab, setAuthTab] = useState<'signin' | 'signup'>('signin')

  const openAuthModal = (tab: 'signin' | 'signup') => {
    setAuthTab(tab)
    setIsAuthModalOpen(true)
  }

  return (
    <>
      <Navbar 
        onOpenSignIn={() => openAuthModal('signin')} 
        onOpenSignUp={() => openAuthModal('signup')}
      />
        <Outlet />
      <Footer />

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        initialTab={authTab}
      />
    </>
  )
}

export default LandingLayout