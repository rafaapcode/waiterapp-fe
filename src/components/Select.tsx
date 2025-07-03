import { cn } from "@/lib/utils";
import { CircleX } from "lucide-react";
import { ComponentProps, forwardRef } from "react";

interface SelectProps extends ComponentProps<"select"> {
  name: string;
  error?: string;
  isLoading?: boolean;
  label: string;
  options: {value: string; label: string}[];
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ error, name, id, className, isLoading, label, options, ...props }, ref) => {
    const selectId = id ?? name;

    if (isLoading) {
      return (
        <div className="flex flex-col gap-1 w-full">
          <label
            htmlFor={selectId}
            className="text-gray-300 text-sm bg-gray-300 animate-pulse w-1/12 rounded-md"
          >
            label
          </label>
          <input
            id={selectId}
            name={name}
            disabled
            className="outline-none p-3 rounded-lg bg-gray-300 animate-pulse"
          />
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-1 w-full">
        <label htmlFor={selectId} className="text-gray-600 text-sm">
          {label}
        </label>
        <select
          ref={ref}
          id={selectId}
          name={name}
          {...props}
          className={cn(
            "outline-none transition-all duration-100 border p-3 rounded-lg border-gray-300 focus:border-gray-500",
            error && "border-red-500 focus:border-red-500",
            className
          )}
        >
          {
            options.map(({label, value}, idx) => <option value={value}>{label}</option>)
          }
        </select>
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

export default Select;
