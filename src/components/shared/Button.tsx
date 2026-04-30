import { ReactNode, ButtonHTMLAttributes } from "react";
import Link from "next/link";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  isLoading?: boolean;
  className?: string;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  isLoading = false,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-semibold transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-offset-2 dark:focus:ring-offset-slate-950 disabled:cursor-not-allowed disabled:opacity-50";

  const variants = {
    primary:
      "bg-primary-500 text-white shadow-lg shadow-primary-500/30 hover:-translate-y-0.5 hover:bg-primary-600 focus:ring-primary-500/40",
    secondary:
      "bg-secondary-500 text-white shadow-lg shadow-secondary-500/30 hover:-translate-y-0.5 hover:bg-secondary-600 focus:ring-secondary-500/40",
    outline:
      "border border-slate-300 bg-white text-slate-800 hover:-translate-y-0.5 hover:border-primary-400 hover:text-primary-600 focus:ring-primary-500/30 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-primary-500 dark:hover:text-primary-300",
    ghost:
      "text-slate-700 hover:bg-slate-100 hover:text-primary-600 focus:ring-primary-500/30 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-primary-300",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-5 py-2.5 text-sm md:text-base",
    lg: "px-7 py-3 text-base md:text-lg",
  };

  const ButtonContent = (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <svg className="-ml-1 mr-1 h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );

  if (href) {
    return (
      <Link href={href} className="block no-underline">
        {ButtonContent}
      </Link>
    );
  }

  return ButtonContent;
}
