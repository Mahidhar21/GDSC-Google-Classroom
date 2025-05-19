import { Loader2 } from "lucide-react";

const Button = ({
  variant = "primary",
  size = "md",
  fullWidth = false,
  loading = false,
  icon,
  iconPosition = "left",
  children,
  className,
  disabled,
  ...props
}) => {
  const variantClasses = {
    primary:
      "bg-primary-600 hover:bg-primary-700 text-white focus:ring-primary-500",
    secondary:
      "bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 focus:ring-gray-500",
    success:
      "bg-success-600 hover:bg-success-700 text-white focus:ring-success-500",
    danger: "bg-error-600 hover:bg-error-700 text-white focus:ring-error-500",
    outline:
      "bg-transparent border border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-500",
    ghost: "bg-transparent hover:bg-gray-100 text-gray-700 focus:ring-gray-500",
  };

  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2.5",
    lg: "px-5 py-3 text-lg",
  };

  const isDisabled = disabled || loading;

  return (
    <button
      className={`rounded-lg font-medium inline-flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
        variantClasses[variant]
      } ${sizeClasses[size]} ${fullWidth ? "w-full" : ""} ${
        isDisabled ? "opacity-70 cursor-not-allowed pointer-events-none" : ""
      } ${className}`}
      disabled={isDisabled}
      {...props}
    >
      {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}

      {!loading && icon && iconPosition === "left" && (
        <span className="mr-2">{icon}</span>
      )}

      {children}

      {!loading && icon && iconPosition === "right" && (
        <span className="ml-2">{icon}</span>
      )}
    </button>
  );
};

export default Button;
