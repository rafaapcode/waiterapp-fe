import { BiFoodMenu } from "react-icons/bi";
import { CgLogOff, CgProfile } from "react-icons/cg";
import { FiUsers } from "react-icons/fi";
import { IoNewspaperOutline } from "react-icons/io5";
import { RiHomeLine } from "react-icons/ri";
import { NavLink } from "react-router";
import LogoSidebar from "../../assets/images/icon-sidebar.svg";

function Sidebar() {


  return (
    <section className="bg-white w-[108px] flex flex-col shadow-md">
      <div className="flex items-center justify-center h-[108px] w-[108px]">
        <img src={LogoSidebar} alt="Logo" className="w-11 h-7" />
      </div>
      <nav className="flex flex-col">
        <NavLink
          to={"/app/orders"}
          className="h-[108px] w-[108px] flex flex-col gap-2 items-center justify-center"
        >
          <RiHomeLine size={28} className="text-[#666666]" />
          <p>Home</p>
        </NavLink>
        <NavLink
          to={"/app/orders"}
          className="h-[108px] w-[108px] flex flex-col gap-2 items-center justify-center"
        >
          <IoNewspaperOutline size={28} className="text-[#666666]" />
          <p>Histórico</p>
        </NavLink>
        <NavLink
          to={"/app/orders"}
          className="h-[108px] w-[108px] flex flex-col gap-2 items-center justify-center"
        >
          <BiFoodMenu size={28} className="text-[#666666]" />
          <p>Cardápio</p>
        </NavLink>
        <NavLink
          to={"/app/orders"}
          className="h-[108px] w-[108px] flex flex-col gap-2 items-center justify-center"
        >
          <FiUsers size={28} className="text-[#666666]" />
          <p>Usuários</p>
        </NavLink>
      </nav>
      <nav className="flex flex-col flex-1 justify-end">
        <NavLink
          to={"/app/orders"}
          className={({isActive}) => isActive ? "h-[108px] w-[108px] flex flex-col gap-2 items-center justify-center text-[#D73035]" : "h-[108px] w-[108px] flex flex-col gap-2 items-center justify-center text-[#666666]"}
        >
          <CgProfile  size={28} />
          <p>Meu Perfil</p>
        </NavLink>
        <NavLink
          to={"/app/orders"}
          className="h-[108px] w-[108px] flex flex-col gap-2 items-center justify-center"
        >
          <CgLogOff  size={28} className="text-[#666666]" />
          <p>Sair</p>
        </NavLink>
      </nav>
    </section>
  );
}

export default Sidebar;
