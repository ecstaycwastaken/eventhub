import { useState } from "react";
import Button from "@/components/Button"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";

function SignUpForm() {
    const [showPassword, setShowPassword] = useState(false)

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev)
    }
    
  return (
    <form className="flex flex-col gap-3 items-center animate-in fade-in duration-300">
        <div className="flex gap-5">
            <div className="flex-1">
                <h1 className="text-caption-3 text-black">USERNAME AND PASSWORD</h1>
                <hr className="text-gray/50 mb-3" />

                <label htmlFor="username" className="text-label text-gray mb-1">USERNAME</label>
                <input className="border border-gray px-4 py-2.5 rounded-xl text-caption-3 w-full mb-5" 
                    placeholder="Enter your username" 
                    type="text"
                    name="username"
                    id="username"
                    required 
                />

                <label htmlFor="userPassword" className="text-label text-gray mb-1">PASSWORD</label>
                <div className="relative w-full mb-5">
                    <input className="border border-gray px-4 py-2.5 pr-12 rounded-xl text-caption-3 w-full" 
                        placeholder="Enter your password" 
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

                <label htmlFor="userPasswordConfirmation" className="text-label text-gray mb-1">RE-TYPE PASSWORD</label>
                <input className="border border-gray px-4 py-2.5 pr-12 rounded-xl text-caption-3 w-full" 
                    placeholder="Re-type your password" 
                    type={showPassword ? 'text' : 'password'}
                    name="userPasswordConfirmation"
                    id="userPasswordConfirmation"
                    required
                />

                <h1 className="text-caption-3 text-black mt-5">CONTACT INFORMATION</h1>
                <hr className="text-gray/50 mb-3" />

                <label htmlFor="userEmail" className="text-label text-gray mb-1">EMAIL ADDRESS</label>
                <input className="border border-gray px-4 py-2.5 rounded-xl text-caption-3 w-full mb-5" 
                    placeholder="Enter your email address" 
                    type="email"
                    name="userEmail"
                    id="userEmail"
                    required 
                />

                <label htmlFor="country" className="text-label text-gray mb-1">COUNTRY</label>
                <input className="border border-gray px-4 py-2.5 rounded-xl text-caption-3 w-full mb-5" 
                    placeholder="Enter your country of origin" 
                    type="text"
                    name="country"
                    id="country"
                    required 
                />

                <label htmlFor="mobileNumber" className="text-label text-gray mb-1">MOBILE PHONE</label>
                <input className="border border-gray px-4 py-2.5 rounded-xl text-caption-3 w-full mb-5" 
                    placeholder="Enter your mobile number" 
                    type="text"
                    name="mobileNumber"
                    id="mobileNumber"
                    required 
                />

                <div className="flex gap-2">
                    <div className="flex-1">
                        <label htmlFor="region" className="text-label text-gray mb-1">REGION</label>
                        <input className="border border-gray px-4 py-2.5 rounded-xl text-caption-3 w-full mb-5" 
                            placeholder="" 
                            type="text"
                            name="region"
                            id="region"
                            required 
                        />
                    </div>
                    <div className="flex-1">
                        <label htmlFor="city" className="text-label text-gray mb-1">CITY</label>
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

                <label htmlFor="firstName" className="text-label text-gray mb-1">FIRST NAME</label>
                <input className="border border-gray px-4 py-2.5 rounded-xl text-caption-3 w-full mb-5" 
                    placeholder="Enter your first name" 
                    type="text"
                    name="firstName"
                    id="firstName"
                    required 
                />

                <label htmlFor="lastName" className="text-label text-gray mb-1">LAST NAME</label>
                <input className="border border-gray px-4 py-2.5 rounded-xl text-caption-3 w-full mb-5" 
                    placeholder="Enter your last name" 
                    type="text"
                    name="lastName"
                    id="lastName"
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
            className="text-button-md py-3 rounded-xl w-full flex justify-center items-center gap-1"
            type="submit"
        >
            Create Account <FaArrowRight />
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