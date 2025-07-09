import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps } from "react";

const mainVariants = cva(["w-full p-4"], {
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

interface MainProps
  extends ComponentProps<"div">,
    VariantProps<typeof mainVariants> {}

function Main({
  children,
  className,
  fillScreen,
  layoutType,
  ...props
}: MainProps) {
  return (
    <main
      {...props}
      className={cn(mainVariants({ fillScreen, layoutType }), className)}
    >
      {children}
    </main>
  );
}

export default Main;
