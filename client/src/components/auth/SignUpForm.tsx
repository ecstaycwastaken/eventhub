import { useState } from "react";
import { toast } from "sonner";
import Button from "@/components/Button"
import { Spinner } from "@/components/ui/spinner";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";
import { useHttp } from "@/hooks/useHttp";
import type { AuthResponse } from "@/types/response";

function SignUpForm({ onSuccess }: { onSuccess?: () => void }) {
    const [showPassword, setShowPassword] = useState(false);

    const { sendRequest, loading: isLoading, error } = useHttp<AuthResponse>();

    const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const payload = Object.fromEntries(formData.entries());

        try {
            const response = await sendRequest({
                url: '/api/v1/auth/signup',
                method: 'POST',
                data: payload
            });

            if (!response || !response.data) return;

            toast.success(`Registration successful! Please log in.`, {
                classNames: {
                    toast:  'bg-[#F1FFEB] text-[#44A872] font-dm font-medium rounded-xl border border-[#44A872]'
                }
            });

            if (onSuccess) onSuccess();

        } catch (err: unknown) {
            // Error handled by useHttp hook
            console.error('Registration failed:', err);
        }
    }
    
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 items-center animate-in fade-in duration-300">

        {error && error.message && (
            <div className="w-full p-3 text-sm text-red-500 border border-red-200 bg-red-50 rounded-xl">
                {error.message}
            </div>
        )}

        <div className="flex gap-5">
            <div className="flex-1">
                <h1 className="text-caption-3 text-black">USERNAME AND PASSWORD</h1>
                <hr className="text-gray/50 mb-3" />

                <label htmlFor="username" className="text-label text-gray mb-1">USERNAME <span className="text-red-500">*</span></label>
                <input className="border border-gray px-4 py-2.5 rounded-xl text-caption-3 w-full mb-5" 
                    placeholder="Enter your username" 
                    type="text"
                    name="username"
                    id="username"
                    required 
                />

                <label htmlFor="password" className="text-label text-gray mb-1">PASSWORD <span className="text-red-500">*</span></label>
                <div className="relative w-full mb-5">
                    <input className="border border-gray px-4 py-2.5 pr-12 rounded-xl text-caption-3 w-full [&::-ms-reveal]:hidden [&::-ms-clear]:hidden" 
                        placeholder="Enter your password" 
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

                <label htmlFor="password_confirmation" className="text-label text-gray mb-1">RE-TYPE PASSWORD <span className="text-red-500">*</span></label>
                <input className="border border-gray px-4 py-2.5 pr-12 rounded-xl text-caption-3 w-full [&::-ms-reveal]:hidden [&::-ms-clear]:hidden" 
                    placeholder="Re-type your password" 
                    type={showPassword ? 'text' : 'password'}
                    name="password_confirmation"
                    id="password_confirmation"
                    required
                />

                <h1 className="text-caption-3 text-black mt-5">CONTACT INFORMATION</h1>
                <hr className="text-gray/50 mb-3" />

                <label htmlFor="email" className="text-label text-gray mb-1">EMAIL ADDRESS <span className="text-red-500">*</span></label>
                <input className="border border-gray px-4 py-2.5 rounded-xl text-caption-3 w-full mb-5" 
                    placeholder="Enter your email address" 
                    type="email"
                    name="email"
                    id="email"
                    required 
                />

                <label htmlFor="country" className="text-label text-gray mb-1">COUNTRY <span className="text-red-500">*</span></label>
                <input className="border border-gray px-4 py-2.5 rounded-xl text-caption-3 w-full mb-5" 
                    placeholder="Enter your country of origin" 
                    type="text"
                    name="country"
                    id="country"
                    required 
                />

                <label htmlFor="contact_number" className="text-label text-gray mb-1">MOBILE PHONE <span className="text-red-500">*</span></label>
                <input className="border border-gray px-4 py-2.5 rounded-xl text-caption-3 w-full mb-5" 
                    placeholder="Enter your mobile number" 
                    type="text"
                    name="contact_number"
                    id="contact_number"
                    required 
                />

                <div className="flex gap-2">
                    <div className="flex-1">
                        <label htmlFor="region" className="text-label text-gray mb-1">REGION <span className="text-red-500">*</span></label>
                        <input className="border border-gray px-4 py-2.5 rounded-xl text-caption-3 w-full mb-5" 
                            placeholder="" 
                            type="text"
                            name="region"
                            id="region"
                            required 
                        />
                    </div>
                    <div className="flex-1">
                        <label htmlFor="city" className="text-label text-gray mb-1">CITY <span className="text-red-500">*</span></label>
                        <input className="border border-gray px-4 py-2.5 rounded-xl text-caption-3 w-full mb-5" 
                            placeholder="" 
                            type="text"
                            name="city"
                            id="city"
                            required 
                        />
                    </div>
                </div>
            </div>
            <div className="flex-1">
                <h1 className="text-caption-3 text-black">PERSONAL INFORMATION</h1>
                <hr className="text-gray/50 mb-3" />

                <label htmlFor="first_name" className="text-label text-gray mb-1">FIRST NAME <span className="text-red-500">*</span></label>
                <input className="border border-gray px-4 py-2.5 rounded-xl text-caption-3 w-full mb-5" 
                    placeholder="Enter your first name" 
                    type="text"
                    name="first_name"
                    id="first_name"
                    required 
                />

                <label htmlFor="last_name" className="text-label text-gray mb-1">LAST NAME <span className="text-red-500">*</span></label>
                <input className="border border-gray px-4 py-2.5 rounded-xl text-caption-3 w-full mb-5" 
                    placeholder="Enter your last name" 
                    type="text"
                    name="last_name"
                    id="last_name"
                    required 
                />

                <div className="bg-yellow border border-border-yellow p-3 rounded-xl">
                    <p className="text-caption-3 text-[#973C00]">
                        <b>IMPORTANT</b>: Please make sure that the First Name and Last Name you entered match your valid government ID. In case of discrepancy, we reserve the right to require supporting documents upon redemption of your ticket.
                    </p>
                </div>
            </div>
        </div>

        <Button
            bgColorClass="bg-brand-red"
            className={`text-button-md py-3 rounded-xl w-full flex justify-center items-center gap-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            type="submit"
            disabled={isLoading}
        >
            {isLoading ? (
                <>
                    <Spinner size="xs" variant="white" />
                    <span>Creating Account...</span>
                </>
            ) : (
                <>Create Account <FaArrowRight /></>
            )}
        </Button>

        <p className="text-sub-1 text-gray">
            By registering you agree to our 
            <span className="underline">Terms of Service</span> and&nbsp;
            <span className="underline">Privacy Policy</span>.
        </p>
    </form>
  )
}

export default SignUpForm