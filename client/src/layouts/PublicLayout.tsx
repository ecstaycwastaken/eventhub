import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthModal from "@/components/auth/AuthModal";

function PublicLayout() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authTab, setAuthTab] = useState<'signin'>('signin')

  const openAuthModal = (tab: 'signin') => {
    setAuthTab(tab)
    setIsAuthModalOpen(true)
  }

  useEffect(() => {
    const handleOpenAuth = () => openAuthModal('signin');
    window.addEventListener('open-auth-modal', handleOpenAuth);
    return () => window.removeEventListener('open-auth-modal', handleOpenAuth);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFFFF]">
      <Navbar 
        onOpenSignIn={() => openAuthModal('signin')}
      />
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
      <Footer />

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        initialTab={authTab}
      />
    </div>
  )
}

export default PublicLayout
