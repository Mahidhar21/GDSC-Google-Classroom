import React from "react";

const Button = ({
  children,
  className = "",
  variant = "primary",
  size = "md",
  isLoading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  disabled,
  type = "button",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-colors duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    primary:
      "bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 focus:ring-primary-500",
    secondary:
      "bg-secondary-600 text-white hover:bg-secondary-700 active:bg-secondary-800 focus:ring-secondary-500",
    accent:
      "bg-accent-500 text-white hover:bg-accent-600 active:bg-accent-700 focus:ring-accent-400",
    outline:
      "bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50 active:bg-gray-100 focus:ring-gray-500",
    ghost:
      "bg-transparent text-gray-700 hover:bg-gray-100 active:bg-gray-200 focus:ring-gray-500",
  };

  const sizes = {
    sm: "text-sm px-3 py-2",
    md: "text-base px-5 py-2.5",
    lg: "text-lg px-6 py-3",
  };

  const disabledStyles =
    disabled || isLoading ? "opacity-60 cursor-not-allowed" : "";

  const widthStyles = fullWidth ? "w-full" : "";

  return (
    <button
      type={type}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${disabledStyles}
        ${widthStyles}
        ${className}
      `}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}

      {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
};

export default Button;
