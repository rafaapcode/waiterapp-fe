import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { LoaderCircle } from "lucide-react";
import { ComponentProps, ReactNode } from "react";

const buttonVariants = cva(
  [
    "flex justify-center items-center gap-2 text-white transition-all  duration-200",
  ],
  {
    variants: {
      variant: {
        primary: "bg-[#D73035] hover:bg-[#ec4248] disabled:bg-[#CCCCCC]",
        secondary:
          "bg-tranparent hover:tranparent text-[#D73035] disabled:text-[#c74e52] font-bold hover:text-red-400",
      },
      size: {
        sm: "py-[6px] px-3 rounded-[35px]",
        md: "py-[10px] px-5 rounded-[40px]",
        lg: "py-[14px] px-7 rounded-[44px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "lg",
    },
  }
);

interface ButtonProps
  extends ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  children: ReactNode;
}

function Button({
  isLoading,
  children,
  className,
  variant,
  size,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        "flex justify-center items-center gap-2 text-white disabled:bg-[#CCCCCC] transition-all  duration-200",
        buttonVariants({ variant, size }),
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
