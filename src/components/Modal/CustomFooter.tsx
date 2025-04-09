import { ReactNode } from "react";

interface CustomFooter {
  children: ReactNode;
}

function CustomFooter({ children }: CustomFooter) {
  return (
    <footer className="flex justify-start items-center mt-8">{children}</footer>
  );
}

export default CustomFooter;
