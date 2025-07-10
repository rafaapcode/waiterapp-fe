import { useAuth } from "@/hooks/useAuth";
import { BiFoodMenu } from "react-icons/bi";
import { CgLogOff, CgProfile } from "react-icons/cg";
import { FiUsers } from "react-icons/fi";
import { IoNewspaperOutline } from "react-icons/io5";
import { LuBuilding2 } from "react-icons/lu";
import { RiHomeLine } from "react-icons/ri";
import { NavLink, useNavigate } from "react-router";
import Section from "../atoms/Section";
import OrgDropdown from "./OrgDropdown";

function Sidebar() {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const logoutUser = () => {
    signOut();
    return navigate("/");
  };

  const styleStyleConditional = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "h-[80px] w-[80px] flex flex-col group-hover:flex-row group-hover:w-[150px] group-hover:justify-start gap-2 items-center justify-center text-[#D73035]"
      : "h-[80px] w-[80px] flex flex-col group-hover:flex-row group-hover:w-[150px] group-hover:justify-start gap-2 items-center justify-center text-[#666666]";

  return (
    <Section className="bg-[#FAFAFA] w-[80px] items-center hover:w-[300px] group transition-all duration-700" layoutType="flexCol" fillScreen >
      <OrgDropdown />
      <nav className="flex flex-col">
        <NavLink to={"/app/home"} className={styleStyleConditional}>
          <RiHomeLine  />
          <p className="opacity-0 text-sm group-hover:opacity-100 transition-all duration-150">Home</p>
        </NavLink>
        <NavLink to={"/app/history"} className={styleStyleConditional}>
          <IoNewspaperOutline  />
          <p className="opacity-0 text-sm group-hover:opacity-100 transition-all duration-150">Histórico</p>
        </NavLink>
        <NavLink to={"/app/menu"} className={styleStyleConditional}>
          <BiFoodMenu  />
          <p className="opacity-0 text-sm group-hover:opacity-100 transition-all duration-150">Cardápio</p>
        </NavLink>
        <NavLink to={"/app/users"} className={styleStyleConditional}>
          <FiUsers  />
          <p className="opacity-0 text-sm group-hover:opacity-100 transition-all duration-150">Usuários</p>
        </NavLink>
      </nav>
      <nav className="flex flex-col flex-1 justify-end items-center">
        <NavLink to={"/app/profile"} className={styleStyleConditional}>
          <CgProfile  />
          <p className="opacity-0 text-sm group-hover:opacity-100 transition-all duration-150">Meu Perfil</p>
        </NavLink>
        <NavLink to={"/app/org"} className={styleStyleConditional}>
          <LuBuilding2  />
          <p className="opacity-0 text-sm group-hover:opacity-100 transition-all duration-150">Orgs</p>
        </NavLink>
        <button
          onClick={logoutUser}
          className="flex flex-col gap-2 items-center justify-center text-[#666666] group-hover:flex-row group-hover:justify-start group-hover:w-[150px]"
        >
          <CgLogOff  />
          <p className="opacity-0 text-sm group-hover:opacity-100 transition-all duration-150">Sair</p>
        </button>
      </nav>
    </Section>
  );
}

export default Sidebar;
