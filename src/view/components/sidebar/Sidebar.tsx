import Section from "@/components/atoms/Section";
import SidebarItem from "@/view/components/sidebar/SidebarItem";
import { Building2, History, House, LogOut, SquareMenu, UserPen, UsersIcon } from "lucide-react";
import OrgDropdown from "./OrgDropdown";

function Sidebar() {
  return (
    <Section
      className="bg-[#FAFAFA] w-[80px] justify-between items-center hover:items-start hover:w-[300px] group transition-all duration-700 overflow-x-hidden hover:pl-10"
      layoutType="flexCol"
      fillScreen
    >
      {/* Primeira parte */}
      <div className="flex-1 w-full">
        <div className="flex justify-center items-center w-full">
          <OrgDropdown />
        </div>
        <SidebarItem Icon={House} title="Home" route="home" />
        <SidebarItem Icon={History} title="Histórico" route="history" />
        <SidebarItem Icon={SquareMenu} title="Cardápio" route="menu" />
        <SidebarItem Icon={UsersIcon} title="Usuários" route="users" />
      </div>

      {/* Segunda parte */}
      <div className="w-full">
        <SidebarItem Icon={UserPen} title="Perfil" route="profile" />
        <SidebarItem Icon={Building2} title="Orgs" route="org" />
        <SidebarItem Icon={LogOut} title="Sair" logout />
      </div>
    </Section>
  );
}

export default Sidebar;
