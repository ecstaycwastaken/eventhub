import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthModal from "@/components/auth/AuthModal";

function LandingLayout() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authTab, setAuthTab] = useState<'signin'>('signin')
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) {
    return <Navigate to='/u/events' replace />
  }

  const openAuthModal = (tab: 'signin') => {
    setAuthTab(tab)
    setIsAuthModalOpen(true)
  }

  return (
    <>
      <Navbar 
        onOpenSignIn={() => openAuthModal('signin')}
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