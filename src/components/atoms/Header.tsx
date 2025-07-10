import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps } from "react";

const headerVariants = cva(["w-full"], {
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

interface HeaderProps
  extends ComponentProps<"div">,
    VariantProps<typeof headerVariants> {}

function HeaderContainer({
  children,
  className,
  fillScreen,
  layoutType,
  ...props
}: HeaderProps) {
  return (
    <header
      {...props}
      className={cn(headerVariants({ fillScreen, layoutType }), className)}
    >
      {children}
    </header>
  );
}

export default HeaderContainer;
