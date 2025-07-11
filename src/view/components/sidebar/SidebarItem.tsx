import { cn } from "@/utils/cn";
import { ElementType } from "react";
import { NavLink } from "react-router";

interface SidebarItemProps {
  route?: string;
  Icon: ElementType;
  title: string;
}

function SidebarItem({ Icon, title, route = "" }: SidebarItemProps) {

  return (
    <NavLink
      to={route}
      className={({ isActive }) =>
        cn(
          "group-hover:justify-start group-hover:gap-2 flex justify-center items-center h-[50px] text-[#666666] transition-all duration-150 mb-4 last:mb-0",
          isActive && "text-[#D73035]"
        )
      }
    >
      <Icon />
      <p className="hidden group-hover:block">{title}</p>
    </NavLink>
  );
}

export default SidebarItem;
