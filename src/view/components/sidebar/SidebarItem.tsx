import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/utils/cn";
import { ElementType } from "react";
import { NavLink, useNavigate } from "react-router";

interface SidebarItemProps {
  route?: string;
  Icon: ElementType;
  title: string;
  logout?: boolean;
}

function SidebarItem({
  Icon,
  title,
  logout = false,
  route = "",
}: SidebarItemProps) {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const logoutUser = () => {
    signOut();
    return navigate("/");
  };

  if (logout) {
    return (
      <button
        onClick={logoutUser}
        className="group-hover:justify-start group-hover:gap-2 flex items-center justify-center h-[50px] w-full text-[#666666] transition-all duration-150 mb-4 last:mb-0"
      >
        <Icon />
        <p className="hidden group-hover:block">{title}</p>
      </button>
    );
  }

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
