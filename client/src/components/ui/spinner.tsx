import React from 'react';

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'primary' | 'secondary' | 'white' | 'ink' | 'muted' | 'success' | 'warning' | 'danger';
  thickness?: number;
}

const sizeClasses = {
  xs: 'w-4 h-4',
  sm: 'w-6 h-6',
  md: 'w-10 h-10',
  lg: 'w-16 h-16',
  xl: 'w-24 h-24',
};

const variantClasses = {
  primary: 'text-primary', // Brand Red (#E63946)
  secondary: 'text-action-secondary', // Brand Blue (#2F5FDB)
  white: 'text-white',
  ink: 'text-ink',
  muted: 'text-text-secondary',
  success: 'text-success',
  warning: 'text-warning-border',
  danger: 'text-danger',
};

export const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ size = 'md', variant = 'primary', thickness = 2.5, className = '', ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="status"
        aria-label="loading"
        className={`inline-block shrink-0 ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
        {...props}
      >
        <svg
          className="animate-spin w-full h-full"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Faint track ring to give a high-end gauge appearance */}
          <circle
            cx="16"
            cy="16"
            r="13"
            stroke="currentColor"
            strokeWidth={thickness}
            className="opacity-15"
          />
          {/* Active rotating arc */}
          <circle
            cx="16"
            cy="16"
            r="13"
            stroke="currentColor"
            strokeWidth={thickness}
            strokeLinecap="round"
            strokeDasharray="60"
            strokeDashoffset="15"
          />
        </svg>
      </div>
    );
  }
);

Spinner.displayName = 'Spinner';
