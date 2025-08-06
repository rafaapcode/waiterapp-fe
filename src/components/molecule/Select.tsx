import * as RDXSelect from "@radix-ui/react-select";
import { ChevronDownIcon, ChevronUpIcon, CircleX } from "lucide-react";
import { useState } from "react";
import { cn } from "../../utils/cn";

interface SelectProps {
  className?: string;
  error?: string;
  placeholder?: string;
  options: {
    value: string;
    label: string;
  }[];
  onChange?: (value: string) => void;
  value?: string;
}

export function Select({
  className,
  error,
  placeholder,
  options,
  onChange,
  value,
}: SelectProps) {
  const [selectedValue, setSelectedValue] = useState<string | undefined>(value);

  const handleSelect = (value: string) => {
    console.log(value);
    setSelectedValue(value);
    onChange?.(value);
  };

  return (
    <div>
      <div className="relative">
        <label
          className={cn(
            "absolute z-10 top-1/2 -translate-y-1/2 left-3 text-gray-700 pointer-events-none",
            selectedValue &&
              "text-xs left-[13px] top-2 transition-all translate-y-0"
          )}
        >
          {placeholder}
        </label>

        <RDXSelect.Root value={value} onValueChange={handleSelect}>
          <RDXSelect.Trigger
            className={cn(
              "relative w-full bg-white rounded-lg border border-gray-400 px-3 h-[52px] text-gray-800 focus:border-gray-800 transition-all duration-100 outline-none text-left pt-4",
              error && "!border-red-800",
              className
            )}
          >
            <RDXSelect.Value />
            <RDXSelect.Icon className="absolute right-3 bottom-3">
              <ChevronDownIcon className="size-6 text-gray-800" />
            </RDXSelect.Icon>
          </RDXSelect.Trigger>

          <RDXSelect.Portal>
            <RDXSelect.Content className="z-40 overflow-hidden bg-white rounded-2xl border border-gray-200 shadow-xl">
              <RDXSelect.ScrollUpButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-gray-800">
                <ChevronUpIcon />
              </RDXSelect.ScrollUpButton>

              <RDXSelect.Viewport className="p-2">
                {options.map((option) => (
                  <RDXSelect.Item
                    key={option.value}
                    value={option.value}
                    className="p-2 text-sm text-gray-800 data-[highlighted]:bg-gray-50 rounded-lg transition-colors duration-150 data-[state=checked]:font-bold outline-none"
                  >
                    <RDXSelect.ItemText>{option.label}</RDXSelect.ItemText>
                  </RDXSelect.Item>
                ))}
              </RDXSelect.Viewport>

              <RDXSelect.ScrollDownButton className="flex h-[25px] cursor-default items-center justify-center bg-white  text-gray-800">
                <ChevronDownIcon />
              </RDXSelect.ScrollDownButton>
            </RDXSelect.Content>
          </RDXSelect.Portal>
        </RDXSelect.Root>
      </div>

      {error && (
        <span className="text-xs text-red-800 flex items-center gap-1">
          <CircleX size={14} />
          {error}
        </span>
      )}
    </div>
  );
}
