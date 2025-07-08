import { cn } from "@/utils/cn";
import { LoaderCircle } from "lucide-react";
import { ComponentProps, ReactNode } from "react";

interface ButtonProps extends ComponentProps<"button"> {
  isLoading?: boolean;
  children: ReactNode;
}

function Button({ isLoading, children, className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        "flex justify-center items-center gap-2 bg-[#D73035] hover:bg-[#ec4248] text-white p-2 disabled:bg-[#CCCCCC] py-[14px] px-7 rounded-[44px] transition-all  duration-200",
        className
      )}
    >
      {isLoading ? (
        <LoaderCircle size={26} className="animate-spin mx-auto" />
      ) : (
        children
      )}
    </button>
  );
}

export default Button;
