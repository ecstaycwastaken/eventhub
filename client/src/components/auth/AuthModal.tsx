import { useState } from "react";
import AuthBg from "@/assets/AuthBg.jpg"
import logo from "@/assets/logo.png"
import Button from "@/components/Button"
import SignInForm from "./SignInForm"
import SignUpForm from "./SignUpForm"

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialTab?: 'signin' | 'signup';
}

function AuthModal({ isOpen, onClose, initialTab = 'signin' }: AuthModalProps) {
    const [activeTab, setActiveTab] = useState<'signin' | 'signup'>(initialTab);
    if (!isOpen) return null;

    return (
        <div className="font-dm fixed inset-0 z-50 flex justify-center items-center p-4 bg-black/80 overflow-y-auto"
            onClick={onClose}
        >
            <div className={`m-auto w-full transition-all duration-300 ease-in-out
                ${activeTab === 'signin' ? 'max-w-md' : 'max-w-4xl'}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="relative px-8 pt-8 pb-12 rounded-t-3xl overflow-hidden shrink-0 min-h-40 md:min-h-55"
                    style={{
                        backgroundImage: `url(${AuthBg})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                >
                    <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/70 to-[#121212]"></div>

                    <Button
                        bgColorClass="bg-white/10"
                        className="absolute top-6 right-6 z-20 flex items-center justify-center w-8 h-8 rounded-full"
                        onClick={onClose}
                    >
                        &times;
                    </Button>

                    <div className="relative z-10 flex flex-col items-start">
                        <img className="h-8 rounded" src={logo} alt="Eventhub logo" />
                        <br />
                        <h2 className="text-white text-heading-3 mb-2">
                            {activeTab === 'signin' ? 'Welcome back.' : 'Create your account.'}
                        </h2>
                        <p className="text-white/60 text-sub-1">
                            {activeTab === 'signin' ? 'Sign in to discover and register for events.'
                                : 'Fill in the details below to get started — it\'s free.'}
                        </p>
                    </div>
                </div>

                <div className="bg-white rounded-3xl w-full p-8 relative z-10 -mt-10">
                    <div className="flex p-1 rounded-xl mb-8 bg-gray-100">
                        <button className={`flex-1 py-2 text-button-md rounded-lg transition-all
                            ${activeTab === 'signin' ? 'bg-black text-white' : 'text-gray-500 hover:text-gray-900'}`}
                            onClick={() => setActiveTab('signin')}
                        >
                            Sign In
                        </button>
                        <button className={`flex-1 py-2 text-button-md rounded-lg transition-all
                            ${activeTab === 'signup' ? 'bg-black text-white' : 'text-gray-500 hover:text-gray-900'}`}
                            onClick={() => setActiveTab('signup')}
                        >
                            Create Account
                        </button>
                    </div>

                    <div>
                        {activeTab === 'signin'
                            ? <SignInForm onClose={onClose} />
                            : <SignUpForm onSuccess={() => setActiveTab('signin')} />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthModal