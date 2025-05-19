import { forwardRef } from "react";

const Input = forwardRef(
  ({ className, icon, endIcon, error, ...props }, ref) => {
    return (
      <div className="relative w-full">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            {icon}
          </div>
        )}

        <input
          className={`w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 shadow-input ${
            icon ? "pl-10" : ""
          } ${endIcon ? "pr-10" : ""} ${
            error ? "border-error-500 focus:ring-error-500" : ""
          } ${className}`}
          ref={ref}
          {...props}
        />

        {endIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {endIcon}
          </div>
        )}

        {error && <p className="mt-1 text-sm text-error-600">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
