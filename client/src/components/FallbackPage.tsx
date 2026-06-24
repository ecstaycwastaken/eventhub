import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import AuthModal from "@/components/auth/AuthModal";

interface FallbackPageProps {
  eyebrow: string;
  title: string;
  description: string;
  helperText?: string;
  illustration: React.ReactNode;
  eyebrowColorClass?: string;
  glowBgClass?: string;
  borderGlowClass?: string;
}

const FallbackPage = ({
  eyebrow,
  title,
  description,
  helperText,
  illustration,
  eyebrowColorClass = "text-brand-red",
  glowBgClass = "bg-brand-red/10 group-hover:bg-brand-red/20",
  borderGlowClass = "border-brand-red/15",
}: FallbackPageProps) => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authTab, setAuthTab] = useState<'signin'>('signin');

  const openAuthModal = (tab: 'signin') => {
    setAuthTab(tab);
    setIsAuthModalOpen(true);
  };

  const handleGoHome = () => {
    if (isAuthenticated) {
      navigate('/u/events');
    } else {
      navigate('/');
    }
  };

  const handleSignOut = () => {
    logout();
  };

  return (
    <div className="flex flex-col min-h-screen bg-bg-page font-dm text-text-primary">
      <Navbar onOpenSignIn={() => openAuthModal('signin')} />

      <main className="flex-1 flex items-center justify-center px-6 py-12 md:py-24">
        <div className="w-full max-w-lg bg-white rounded-lg border border-border shadow-resting p-8 md:p-12 text-center transition-all duration-300 hover:shadow-raised hover:scale-[1.01]">
          
          {/* Central focal visual with glow & micro-animation */}
          <div className="relative w-24 h-24 mx-auto mb-6 flex items-center justify-center group">
            {/* Glowing halo background */}
            <div className={`absolute inset-0 rounded-full blur-xl transition-all duration-500 group-hover:scale-110 animate-pulse ${glowBgClass}`}></div>
            {/* Glassmorphic backing circle */}
            <div className={`absolute inset-0 bg-white/40 rounded-full shadow-inner backdrop-blur-xs transition-transform duration-500 group-hover:scale-105 border ${borderGlowClass}`}></div>
            
            {illustration}
          </div>

          <span className={`text-label uppercase tracking-widest font-semibold block mb-2 ${eyebrowColorClass}`}>
            {eyebrow}
          </span>

          <h1 className="text-heading-1 font-bold text-ink mb-4">
            {title}
          </h1>

          <p className="text-text-secondary text-body-1 leading-relaxed mb-6">
            {description}
          </p>

          {helperText && (
            <p className="text-text-muted text-body-2 mb-8">
              {helperText}
            </p>
          )}

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              bgColorClass="bg-brand-red"
              textColorClass="text-white"
              className="w-full sm:w-auto px-6 py-2.5 rounded-lg text-button-md font-semibold shadow-sm"
              onClick={handleGoHome}
            >
              Browse Events
            </Button>

            {isAuthenticated ? (
              <Button
                bgColorClass="bg-white"
                textColorClass="text-text-primary"
                className="w-full sm:w-auto px-6 py-2.5 rounded-lg text-button-md font-semibold border border-border-strong hover:bg-bg-subtle"
                onClick={handleSignOut}
              >
                Sign Out
              </Button>
            ) : (
              <Button
                bgColorClass="bg-white"
                textColorClass="text-text-primary"
                className="w-full sm:w-auto px-6 py-2.5 rounded-lg text-button-md font-semibold border border-border-strong hover:bg-bg-subtle"
                onClick={() => openAuthModal('signin')}
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      </main>

      <Footer />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialTab={authTab}
      />
    </div>
  );
};

export default FallbackPage;
