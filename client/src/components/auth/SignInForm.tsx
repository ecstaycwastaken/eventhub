import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import Button from "@/components/Button";
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/hooks/useAuth";
import { useHttp } from "@/hooks/useHttp";
import type { AuthResponse } from "@/types/response";

function SignInForm({ onClose }: { onClose?: () => void }) {
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const { updateAuthState } = useAuth();
    const { sendRequest, loading: isLoading, error } = useHttp<AuthResponse>();

    const togglePasswordVisibility = () => setShowPassword((prev) => !prev)

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const email = formData.get('email')
        const password = formData.get('password')

        try {
            const response = await sendRequest({
                url: '/api/v1/auth/login',
                method: 'POST',
                data: { email, password }
            });

            if (!response || !response.data) return;

            const data = response.data;

            updateAuthState(data.user);

            const firstName = data.user?.first_name || data.user?.username || 'User';
            toast.success(`Welcome back, ${firstName}!`, {
                classNames: {
                    toast:  'bg-[#F1FFEB] text-[#44A872] font-dm font-medium rounded-xl border border-[#44A872]'
                }
            });

            if (onClose) onClose();
            navigate('/u/events');
        } catch (err: unknown) {
            // Error handled by useHttp hook
            console.error('Login failed:', err);
        }
    }

    

    return (
        <form onSubmit={handleSubmit} className="flex flex-col animate-in fade-in duration-300">

            {error && error.message && (
                <div className="w-full p-3 text-sm text-red-500 border border-red-200 bg-red-50 rounded-xl -mt-5 mb-5">
                    {error.message}
                </div>
            )}

            <label htmlFor="email" className="text-label text-gray mb-1">EMAIL <span className="text-red-500">*</span></label>
            <input className="border border-gray px-4 py-2.5 rounded-xl text-caption-3 w-full mb-5" 
                placeholder="you@example.com" 
                type="email"
                name="email"
                id="email"
                required 
            />

            <label htmlFor="password" className="text-label text-gray mb-1">PASSWORD <span className="text-red-500">*</span></label>
            <div className="relative w-full mb-5">
                <input className="border border-gray px-4 py-2.5 pr-12 rounded-xl text-caption-3 w-full [&::-ms-reveal]:hidden [&::-ms-clear]:hidden" 
                    placeholder="••••••••" 
                    type={showPassword ? 'text' : 'password'}  
                    name="password"
                    id="password"
                    required
                />
                <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                >
                    {showPassword ? (
                        <FaRegEyeSlash className="w-4 h-4" />
                    ) : (
                        <FaRegEye className="w-4 h-4" />
                    )}
                </button>
            </div>

            <a href="#" className="self-end text-label text-gray mb-5">Forgot Password?</a>

            <Button
                bgColorClass="bg-brand-red"
                className={`text-button-md py-3 rounded-xl flex justify-center items-center gap-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                type="submit"
                disabled={isLoading}
            >
                {isLoading ? (
                    <>
                        <Spinner size="xs" variant="white" />
                        <span>Signing In...</span>
                    </>
                ) : (
                    'Sign In'
                )}
            </Button>
        </form>
    )
}

export default SignInForm