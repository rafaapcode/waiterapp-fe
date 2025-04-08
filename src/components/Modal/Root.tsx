import { ReactNode } from "react";

interface RootProps {
  children: ReactNode;
  isVisible: boolean;
  size: "sm" | "md" | "lg";
}

function Root({ children, isVisible,size}: RootProps) {
  const sizeClass: Record<typeof size, string> = {
    sm: "w-1/4",
    md: "w-1/2",
    lg: "w-3/4",
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed w-full h-full top-0 left-0 bg-black/80 backdrop-blur-sm flex items-center justify-center">
      <div className={`bg-white ${sizeClass[size]} rounded-lg p-8`}>{children}</div>
    </div>
  );
}

export default Root;
