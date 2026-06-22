import { useState } from "react";
import { toast } from "sonner";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6"
import Button from "@/components/Button"
import { useAuth } from "@/context/AuthContext"
import { useNavigate } from "react-router-dom"

function SignInForm({ onClose }: { onClose?: () => void }) {
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const { login } = useAuth()
    const navigate = useNavigate()

    const togglePasswordVisibility = () => setShowPassword((prev) => !prev)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)

        const formData = new FormData(e.currentTarget)
        const email = formData.get('email')
        const password = formData.get('password')

        try {
            const response = await fetch('http://127.0.0.1:8000/api/v1/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ email, password })
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Failed to sign in. Please check your credentials.')
            }

            login(data.user, data.access_token)

            const firstName = data.user?.username || 'User'
            toast.success(`Welcome back, ${firstName} !`, {
                classNames: {
                    toast:  'bg-[#F1FFEB] text-[#44A872] font-dm font-medium rounded-xl border border-[#44A872]'
                }
            })
            
            if (onClose) onClose()
            
            navigate('/home')

        }catch (err: any) {
            setError(err.message)
        }finally {
            setIsLoading(false)
        }
    }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col animate-in fade-in duration-300">

        {error && (
            <div className="w-full p-3 text-sm text-red-500 border border-red-200 bg-red-50 rounded-xl -mt-5 mb-5">
                {error}
            </div>
        )}

        <label htmlFor="email" className="text-label text-gray mb-1">EMAIL</label>
        <input className="border border-gray px-4 py-2.5 rounded-xl text-caption-3 w-full mb-5" 
            placeholder="you@example.com" 
            type="email"
            name="email"
            id="email"
            required 
        />

        <label htmlFor="password" className="text-label text-gray mb-1">PASSWORD</label>
        <div className="relative w-full mb-5">
            <input className="border border-gray px-4 py-2.5 pr-12 rounded-xl text-caption-3 w-full" 
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
            className="text-button-md py-3 rounded-xl"
            type="submit"
            disabled={isLoading}
        >
            {isLoading ? 'Signing In...' : 'Sign In'}
        </Button>
    </form>
  )
}

export default SignInForm