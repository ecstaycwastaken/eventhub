import { useState } from "react";
import { toast } from "sonner";
import Button from "@/components/Button";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useHttp } from "@/hooks/useHttp";
import type { AuthResponse } from "@/types/response";
import heroBG from '@/assets/hero-bg.png';

interface AdminCreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AdminCreateUserModal({ isOpen, onClose, onSuccess }: AdminCreateUserModalProps) {
    const [showPassword, setShowPassword] = useState(false);

    const { sendRequest, loading: isLoading, error } = useHttp<AuthResponse>();

    const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

            toast.success(`User successfully created!`, {
                classNames: {
                    toast: 'bg-[#F1FFEB] text-[#44A872] font-dm font-medium rounded-xl border border-[#44A872]'
                }
            });

            if (onSuccess) onSuccess();
            onClose();

        } catch (err: unknown) {
            console.error('User creation failed:', err);
        }
    }

    return (
        <div className="fixed font-dm inset-0 z-50 flex items-center justify-center bg-black/60 p-4 md:p-6 overflow-hidden">
            <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl flex flex-col max-h-[95vh] overflow-hidden animate-in fade-in duration-200">
                {/* Header Region */}
                <div className="relative h-40 w-full shrink-0 bg-gray-100">
                    <img
                        src={heroBG}
                        alt="Background"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />
                    
                    <Button
                        bgColorClass="bg-white/10"
                        className="absolute top-4 right-4 z-20 flex items-center justify-center w-10 h-10 rounded-full text-white hover:bg-white/20 transition-colors"
                        onClick={onClose}
                    >
                        &times;
                    </Button>

                    <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col mb-1">
                        <h2 className="text-heading-2 text-white leading-tight font-bold">
                            Create New User
                        </h2>
                        <p className="text-white/80 font-medium text-body-1">
                            Add a new user or administrator to the platform.
                        </p>
                    </div>
                </div>

                {/* Content Region */}
                <div className="p-6 flex-1 overflow-y-auto">
                    <form id="create-user-form" onSubmit={handleSubmit} className="flex flex-col gap-4">
                        {error && error.message && (
                            <div className="bg-danger/10 border border-danger/30 text-danger px-4 py-3 rounded-xl text-sm mb-2">
                                {error.message}
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Left Column */}
                            <div className="flex flex-col gap-4">
                                <div>
                                    <h3 className="text-caption-3 text-black mb-1">ACCOUNT DETAILS</h3>
                                    <hr className="text-gray/50 mb-3" />
                                    
                                    <div className="flex flex-col gap-1.5 mb-3">
                                        <label htmlFor="username" className="text-sm font-medium text-text-secondary">Username</label>
                                        <input 
                                            className="w-full px-4 py-2.5 rounded-xl border border-border-strong focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm" 
                                            placeholder="Enter username" 
                                            type="text"
                                            name="username"
                                            id="username"
                                            required 
                                        />
                                    </div>

                                    <div className="flex flex-col gap-1.5 mb-3">
                                        <label htmlFor="email" className="text-sm font-medium text-text-secondary">Email Address</label>
                                        <input 
                                            className="w-full px-4 py-2.5 rounded-xl border border-border-strong focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm" 
                                            placeholder="Enter email address" 
                                            type="email"
                                            name="email"
                                            id="email"
                                            required 
                                        />
                                    </div>

                                    <div className="flex flex-col gap-1.5 mb-3">
                                        <label htmlFor="role" className="text-sm font-medium text-text-secondary">Role</label>
                                        <select 
                                            className="w-full px-4 py-2.5 rounded-xl border border-border-strong focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm bg-white" 
                                            name="role"
                                            id="role"
                                            required 
                                        >
                                            <option value="user">User</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    </div>

                                    <div className="flex flex-col gap-1.5 mb-3">
                                        <label htmlFor="password" className="text-sm font-medium text-text-secondary">Password</label>
                                        <div className="relative w-full">
                                            <input 
                                                className="w-full px-4 py-2.5 pr-12 rounded-xl border border-border-strong focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm" 
                                                placeholder="Enter password" 
                                                type={showPassword ? 'text' : 'password'}  
                                                name="password"
                                                id="password"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={togglePasswordVisibility}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                            >
                                                {showPassword ? <FaRegEyeSlash className="w-4 h-4" /> : <FaRegEye className="w-4 h-4" />}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-1.5 mb-3">
                                        <label htmlFor="password_confirmation" className="text-sm font-medium text-text-secondary">Re-type Password</label>
                                        <input 
                                            className="w-full px-4 py-2.5 rounded-xl border border-border-strong focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm" 
                                            placeholder="Re-type password" 
                                            type={showPassword ? 'text' : 'password'}
                                            name="password_confirmation"
                                            id="password_confirmation"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="flex flex-col gap-4">
                                <div>
                                    <h3 className="text-caption-3 text-black mb-1">PERSONAL INFORMATION</h3>
                                    <hr className="text-gray/50 mb-3" />

                                    <div className="grid grid-cols-2 gap-3 mb-3">
                                        <div className="flex flex-col gap-1.5">
                                            <label htmlFor="first_name" className="text-sm font-medium text-text-secondary">First Name</label>
                                            <input 
                                                className="w-full px-4 py-2.5 rounded-xl border border-border-strong focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm" 
                                                placeholder="First name" 
                                                type="text"
                                                name="first_name"
                                                id="first_name"
                                                required 
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <label htmlFor="last_name" className="text-sm font-medium text-text-secondary">Last Name</label>
                                            <input 
                                                className="w-full px-4 py-2.5 rounded-xl border border-border-strong focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm" 
                                                placeholder="Last name" 
                                                type="text"
                                                name="last_name"
                                                id="last_name"
                                                required 
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-1.5 mb-3">
                                        <label htmlFor="contact_number" className="text-sm font-medium text-text-secondary">Mobile Phone</label>
                                        <input 
                                            className="w-full px-4 py-2.5 rounded-xl border border-border-strong focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm" 
                                            placeholder="Mobile number" 
                                            type="text"
                                            name="contact_number"
                                            id="contact_number"
                                            required 
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 mb-3">
                                        <div className="flex flex-col gap-1.5">
                                            <label htmlFor="region" className="text-sm font-medium text-text-secondary">Region</label>
                                            <input 
                                                className="w-full px-4 py-2.5 rounded-xl border border-border-strong focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm" 
                                                placeholder="Region" 
                                                type="text"
                                                name="region"
                                                id="region"
                                                required 
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <label htmlFor="city" className="text-sm font-medium text-text-secondary">City</label>
                                            <input 
                                                className="w-full px-4 py-2.5 rounded-xl border border-border-strong focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm" 
                                                placeholder="City" 
                                                type="text"
                                                name="city"
                                                id="city"
                                                required 
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-1.5 mb-3">
                                        <label htmlFor="country" className="text-sm font-medium text-text-secondary">Country</label>
                                        <input 
                                            className="w-full px-4 py-2.5 rounded-xl border border-border-strong focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm" 
                                            placeholder="Country" 
                                            type="text"
                                            name="country"
                                            id="country"
                                            required 
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Action Footer */}
                <div className="p-5 border-t border-gray-100 flex gap-3 bg-white shrink-0">
                    <Button
                        bgColorClass="bg-white"
                        textColorClass="text-ink"
                        className="flex flex-1 justify-center items-center gap-2 text-button-lg w-full rounded-2xl py-3 border border-border-strong hover:bg-gray-50 shadow-sm"
                        onClick={onClose}
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        form="create-user-form"
                        bgColorClass="bg-primary"
                        textColorClass="text-white"
                        className="flex flex-1 justify-center items-center gap-2 text-button-lg w-full rounded-2xl py-3 border border-transparent shadow-raised hover:bg-primary-hover transition-colors"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            'Create User'
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
}
