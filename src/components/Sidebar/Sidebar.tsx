import { BiFoodMenu } from "react-icons/bi";
import { CgLogOff, CgProfile } from "react-icons/cg";
import { FiUsers } from "react-icons/fi";
import { IoNewspaperOutline } from "react-icons/io5";
import { RiHomeLine } from "react-icons/ri";
import { NavLink, useNavigate } from "react-router";
import LogoSidebar from "../../assets/images/icon-sidebar.svg";

function Sidebar() {
  const navigate = useNavigate();

  const logoutUser = () => {
    localStorage.removeItem("token");
    return navigate("/");
  }

  const styleStyleConditional = ({isActive}: {isActive: boolean}) => isActive ? "group relative h-[108px] w-[108px] flex flex-col gap-2 items-center justify-center text-[#D73035]" : "group h-[108px] w-[108px] flex flex-col gap-2 items-center justify-center text-[#666666]"

  return (
    <section className="bg-white w-[108px] flex flex-col shadow-md">
      <div className="flex items-center justify-center h-[108px] w-[108px]">
        <img src={LogoSidebar} alt="Logo" className="w-11 h-7" />
      </div>
      <nav className="flex flex-col">
        <NavLink
          to={"/app/home"}
          className={styleStyleConditional}
        >
          <RiHomeLine size={28} />
          <p>Home</p>
          <div className="group-[.relative]:w-1/5 absolute bottom-4 w-0 rounded-md h-[2px] bg-red-500 transition-all duration-150"/>
        </NavLink>
        <NavLink
          to={"/app/history"}
           className={styleStyleConditional}
        >
          <IoNewspaperOutline size={28} />
          <p>Histórico</p>
          <div className="group-[.relative]:w-1/5 absolute bottom-4 w-0 rounded-md h-[2px] bg-red-500 transition-all duration-150"/>
        </NavLink>
        <NavLink
          to={"/app/menu"}
           className={styleStyleConditional}
        >
          <BiFoodMenu size={28} />
          <p>Cardápio</p>
          <div className="group-[.relative]:w-1/5 absolute bottom-4 w-0 rounded-md h-[2px] bg-red-500 transition-all duration-150"/>
        </NavLink>
        <NavLink
          to={"/app/users"}
           className={styleStyleConditional}
        >
          <FiUsers size={28} />
          <p>Usuários</p>
          <div className="group-[.relative]:w-1/5 absolute bottom-4 w-0 rounded-md h-[2px] bg-red-500 transition-all duration-150"/>
        </NavLink>
      </nav>
      <nav className="flex flex-col flex-1 justify-end">
        <NavLink
          to={"/app/profile"}
          className={styleStyleConditional}
        >
          <CgProfile  size={28} />
          <p>Meu Perfil</p>
          <div className="group-[.relative]:w-1/5 absolute bottom-4 w-0 rounded-md h-[2px] bg-red-500 transition-all duration-150"/>
        </NavLink>
        <button
          onClick={logoutUser}
          className="h-[108px] w-[108px] flex flex-col gap-2 items-center justify-center text-[#666666]"
        >
          <CgLogOff  size={28} />
          <p>Sair</p>
          <div className="group-[.relative]:w-1/5 absolute bottom-4 w-0 rounded-md h-[2px] bg-red-500 transition-all duration-150"/>
        </button>
      </nav>
    </section>
  );
}

export default Sidebar;
