import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthModal from "@/components/auth/AuthModal";

function LandingLayout() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authTab, setAuthTab] = useState<'signin'>('signin')
  const { isAuthenticated } = useAuth()

  const openAuthModal = (tab: 'signin') => {
    setAuthTab(tab)
    setIsAuthModalOpen(true)
  }

  useEffect(() => {
    const handleOpenAuth = () => openAuthModal('signin');
    window.addEventListener('open-auth-modal', handleOpenAuth);
    return () => window.removeEventListener('open-auth-modal', handleOpenAuth);
  }, []);

  if (isAuthenticated) {
    return <Navigate to='/u/events' replace />
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