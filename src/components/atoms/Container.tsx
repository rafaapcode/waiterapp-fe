import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps } from "react";

const divVariants = cva(["w-full p-4"], {
  variants: {
    layoutType: {
      flex: "flex justify-start items-center gap-4",
      flexCol: "flex flex-col justify-center items-start gap-4",
      grid: "grid gap-4",
    },
    fillScreen: {
      true: "h-full",
    },
  },
  defaultVariants: {
    layoutType: "flex",
    fillScreen: false,
  },
});

interface ContainerProps
  extends ComponentProps<"div">,
    VariantProps<typeof divVariants> {}

function Container({
  children,
  className,
  fillScreen,
  layoutType,
  ...props
}: ContainerProps) {
  return (
    <div
      {...props}
      className={cn(divVariants({ fillScreen, layoutType }), className)}
    >
      {children}
    </div>
  );
}

export default Container;
