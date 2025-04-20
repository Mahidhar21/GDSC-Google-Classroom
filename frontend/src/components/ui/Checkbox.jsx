import React, { forwardRef } from "react";

const Checkbox = forwardRef(
  ({ className = "", label, error, helperText, id, ...props }, ref) => {
    const checkboxId =
      id || `checkbox-${Math.random().toString(36).substring(2, 9)}`;

    return (
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            ref={ref}
            id={checkboxId}
            type="checkbox"
            className={`
            h-4 w-4 rounded border-gray-300 text-primary-600 
            focus:ring-primary-500 focus:ring-offset-0
            ${error ? "border-error-500" : ""}
            ${className}
          `}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={
              error
                ? `${checkboxId}-error`
                : helperText
                ? `${checkboxId}-helper`
                : undefined
            }
            {...props}
          />
        </div>

        <div className="ml-3 text-sm">
          {label && (
            <label htmlFor={checkboxId} className="font-medium text-gray-700">
              {label}
            </label>
          )}

          {error && (
            <p
              className="mt-1 text-sm text-error-600"
              id={`${checkboxId}-error`}
            >
              {error}
            </p>
          )}

          {helperText && !error && (
            <p
              className="mt-1 text-sm text-gray-500"
              id={`${checkboxId}-helper`}
            >
              {helperText}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
