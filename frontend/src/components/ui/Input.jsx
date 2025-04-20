import React, { forwardRef } from "react";

const Input = forwardRef(
  (
    {
      className = "",
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      fullWidth = true,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;

    return (
      <div className={`${fullWidth ? "w-full" : ""} mb-4`}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            className={`
            w-full rounded-lg border ${
              error
                ? "border-error-500 focus:ring-error-500"
                : "border-gray-300 focus:ring-primary-500"
            } 
            shadow-input focus:border-transparent focus:outline-none focus:ring-2 transition duration-200
            ${leftIcon ? "pl-10" : "pl-4"} 
            ${rightIcon ? "pr-10" : "pr-4"} 
            py-3
            ${className}
          `}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={
              error
                ? `${inputId}-error`
                : helperText
                ? `${inputId}-helper`
                : undefined
            }
            {...props}
          />

          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500">
              {rightIcon}
            </div>
          )}
        </div>

        {error && (
          <p className="mt-1 text-sm text-error-600" id={`${inputId}-error`}>
            {error}
          </p>
        )}

        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-500" id={`${inputId}-helper`}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
