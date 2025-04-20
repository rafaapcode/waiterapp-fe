import { ReactNode } from "react";

interface RootProps {
  children: ReactNode;
  isVisible: boolean;
  size: "sm" | "md" | "lg" | "xl";
  priority?: boolean;
}

function Root({ children, isVisible,size, priority}: RootProps) {
  const sizeClass: Record<typeof size, string> = {
    sm: "w-1/4",
    md: "w-1/2",
    lg: "w-3/5",
    xl: "w-3/4",
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className={`fixed w-full h-full top-0 left-0 bg-black/80 backdrop-blur-sm flex items-center justify-center ${priority ? "z-20" : "z-10"}`}>
      <div className={`bg-white ${sizeClass[size]} rounded-lg p-8`}>{children}</div>
    </div>
  );
}

export default Root;
