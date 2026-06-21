import { useState } from "react";
import Button from "@/components/Button"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

function SignInForm() {
    const [showPassword, setShowPassword] = useState(false)

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev)
    }

  return (
    <form className="flex flex-col animate-in fade-in duration-300">
        <label htmlFor="email" className="text-label text-gray mb-1">EMAIL</label>
        <input className="border border-gray px-4 py-2.5 rounded-xl text-caption-3 w-full mb-5" 
            placeholder="you@example.com" 
            type="email"
            name="userEmail"
            id="userEmail"
            required 
        />

        <label htmlFor="userPassword" className="text-label text-gray mb-1">PASSWORD</label>
        <div className="relative w-full mb-5">
            <input className="border border-gray px-4 py-2.5 pr-12 rounded-xl text-caption-3 w-full" 
                placeholder="••••••••" 
                type={showPassword ? 'text' : 'password'}  
                name="userPassword"
                id="userPassword"
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
            className="text-button-md py-3 rounded-xl"
            type="submit"
        >
            Sign In
        </Button>
    </form>
  )
}

export default SignInForm