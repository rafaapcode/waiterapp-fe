import { cn } from "@/lib/utils";
import { CircleX } from "lucide-react";
import { ComponentProps, forwardRef } from "react";

interface InputProps extends ComponentProps<"input"> {
  name: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, name, id, className, placeholder, ...props }, ref) => {
    const inputId = id ?? name;

    return (
      <div className="flex flex-col gap-1">
        <label htmlFor={inputId} className="text-gray-600 text-sm">
          {placeholder}
        </label>
        <input
          ref={ref}
          id={inputId}
          name={name}
          {...props}
          className={cn(
            "outline-none transition-all duration-100 border p-3 rounded-lg border-gray-300 focus:border-gray-500",
            error && "border-red-500 focus:border-red-500",
            className
          )}
        />
        {error && (
          <span className="text-xs text-red-800 flex items-center gap-1">
            <CircleX size={14} />
            {error}
          </span>
        )}
      </div>
    );
  }
);

export default Input;
