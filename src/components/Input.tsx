import { cn } from "@/lib/utils";
import { CircleX } from "lucide-react";
import { ComponentProps, forwardRef } from "react";

interface InputProps extends ComponentProps<"input"> {
  name: string;
  error?: string;
  isLoading?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, name, id, className, placeholder, isLoading, ...props }, ref) => {
    const inputId = id ?? name;

    if (isLoading) {
      return (
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor={inputId} className="text-gray-300 text-sm bg-gray-300 animate-pulse w-1/12 rounded-md">
            label
          </label>
          <input
            id={inputId}
            name={name}
            {...props}
            disabled
            className="outline-none p-3 rounded-lg bg-gray-300 animate-pulse"
          />
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-1 w-full">
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
