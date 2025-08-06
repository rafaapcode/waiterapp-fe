import { cn } from "@/utils/cn";
import * as RDXDropdownMenu from "@radix-ui/react-dropdown-menu";
import { ReactNode } from "react";

interface DropdownMenuProps {
  children: ReactNode;
}

interface DropdownMenuTriggerProps {
  children: ReactNode;
  className?: string;
}

interface DropdownMenuContentProps {
  children: ReactNode;
  className?: string;
  side?: "right" | "top" | "bottom" | "left";
}

interface DropdownMenuItemProps {
  children: ReactNode;
  className?: string;
  onSelect?: (e: any | undefined) => void;
}

function DropdownMenu({ children }: DropdownMenuProps) {
  return <RDXDropdownMenu.Root>{children}</RDXDropdownMenu.Root>;
}

function DropdownTrigger({ children, className }: DropdownMenuTriggerProps) {
  return (
    <RDXDropdownMenu.Trigger className={cn("outline-none size-28 relative",  className)} asChild>
      {children}
    </RDXDropdownMenu.Trigger>
  );
}

function DropdownContent({ children, className,side }: DropdownMenuContentProps) {
  return (
    <RDXDropdownMenu.Portal>
      <RDXDropdownMenu.Content side={side} className={cn("ml-6 p-2 rounded-xl shadow-xl bg-white border border-gray-400", className)}>{children}</RDXDropdownMenu.Content>
    </RDXDropdownMenu.Portal>
  );
}

function DropdownItem({ children, onSelect, className }: DropdownMenuItemProps) {
  return <RDXDropdownMenu.Item onSelect={onSelect} className={cn("outline-none",  className)}>{children}</RDXDropdownMenu.Item>;
}

DropdownMenu.Trigger = DropdownTrigger;
DropdownMenu.Content = DropdownContent;
DropdownMenu.Item = DropdownItem;

export default DropdownMenu;
