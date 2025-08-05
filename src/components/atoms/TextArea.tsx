import { cn } from "@/utils/cn";
import { CircleX } from "lucide-react";
import { ComponentProps, forwardRef } from "react";

interface TextAreaProps extends ComponentProps<"textarea"> {
  name: string;
  error?: string;
  isLoading?: boolean;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ error, name, id, className, placeholder, isLoading, ...props }, ref) => {
    const inputId = id ?? name;

    if (isLoading) {
      return (
        <div className="flex flex-col gap-1 w-full">
          <label
            htmlFor={inputId}
            className="text-gray-300 text-sm bg-gray-300 animate-pulse w-1/12 rounded-md"
          >
            label
          </label>
          <textarea
            rows={3}
            maxLength={110}
            id={inputId}
            name={name}
            {...props}
            className="w-full resize-none border border-gray-200 rounded-md px-2 py-1 transition-all duration-200 outline-red-500 focus:outline-red-500"
            placeholder="Ex: Pizza de Quatro Queijos com borda tradicional"
          />
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-1 w-full">
        <label htmlFor={inputId} className="text-gray-600 text-sm">
          {placeholder}
        </label>
        <textarea
          ref={ref}
          rows={3}
          maxLength={110}
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

export default TextArea;
