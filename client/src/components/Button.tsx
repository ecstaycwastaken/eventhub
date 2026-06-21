import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    bgColorClass?: string;
    textColorClass?: string;
}

function Button({
    children,
    bgColorClass = "bg-default",
    textColorClass = "text-white",
    className = "",
    ...props
}: ButtonProps) {
  return (
    <button
    {...props}
    className={`
        ${bgColorClass} ${textColorClass}
        transition-all duration-200 cursor-pointer
        hover:brightness-90 active:brightness-110 active:scale-95
        ${className}
        `}
    > 
        {children}
    </button>
  )
}

export default Button