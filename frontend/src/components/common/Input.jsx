import { memo, forwardRef } from "react";

const Input = memo(
  forwardRef(({ label, error, className = "", hint, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label className="text-sm font-medium text-slate-600">{label}</label>
        )}
        <input
          ref={ref}
          className={`input-field ${error ? "input-error" : ""} ${className}`}
          {...props}
        />
        {error && (
          <p className="text-xs text-red-500 flex items-center gap-1 mt-0.5">
            <span>⚠</span> {error}
          </p>
        )}
        {hint && !error && (
          <p className="text-xs text-slate-400 mt-0.5">{hint}</p>
        )}
      </div>
    );
  })
);

Input.displayName = "Input";
export default Input;
