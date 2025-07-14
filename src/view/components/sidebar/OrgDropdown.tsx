import IconSidebar from "@/assets/images/icon-sidebar.svg";
import Divider from "@/components/atoms/Divider";
import DropdownMenu from "@/components/molecule/DropdownMenu";
import { useAuth } from "@/hooks/useAuth";
import { OrgService } from "@/services/api/org";
import { formatNameOfOrg } from "@/utils/formatNameOfOrg";
import { useQuery } from "@tanstack/react-query";
import { CirclePlus } from "lucide-react";
import { VscLoading } from "react-icons/vsc";
import { useNavigate } from "react-router";

function OrgDropdown() {
  const { user, setOrgInfo } = useAuth();
  const navigate = useNavigate();

  const handleCreateNew = () => {
    navigate("/org/register");
  };

  const { isLoading, data } = useQuery({
    enabled: !!user.id,
    queryKey: ["orgs-user", user.id],
    queryFn: async () => {
      try {
        return await OrgService.listOrgsOfUser();
      } catch (error) {
        console.log(error);
        return undefined;
      }
    },
  });
  return (
    <DropdownMenu>
      <DropdownMenu.Trigger>
        <div className="flex items-center justify-center cursor-pointer">
          {!user.orgId && (
            <img src={IconSidebar} alt="Logo" className="w-11 h-7" />
          )}
          {user.orgImageUrl && (
            <img
              src={user.orgImageUrl}
              alt="Logo"
              className="w-full h-full object-cover"
            />
          )}
          {!user.orgImageUrl && user.orgName && (
            <p className="text-3xl text-gray-700 font-semibold">
              {formatNameOfOrg(user.orgName)}
            </p>
          )}
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content side="right">
        {isLoading ? (
          <div className="mx-auto">
            <VscLoading className="animate-spin" />
          </div>
        ) : (
          <>
            <DropdownMenu.Item
              onSelect={handleCreateNew}
              className="cursor-pointer py-2 rounded-lg px-4 flex items-center justify-center gap-2 max-w-64 bg-white text-gray-700 hover:bg-gray-50 focus:outline-none transition-colors"
            >
              <CirclePlus size={14} />
              Criar Nova Organização
            </DropdownMenu.Item>
            {(data && data.filter(org => org._id !== user.orgId).length > 0) && <Divider />}
            {data?.filter(org => org._id !== user.orgId).map((org) => (
              <DropdownMenu.Item
                onSelect={() => {
                  setOrgInfo({
                    orgId: org._id,
                    imgUrl: org.imageUrl || "",
                    name: org.name,
                  });
                }}
                key={org._id}
                className="cursor-pointer text-sm hover:bg-gray-50 px-4 py-2 rounded-lg max-w-56 truncate text-ellipsis transition-all duration-150"
              >
                {org.name}
              </DropdownMenu.Item>
            ))}
          </>
        )}
      </DropdownMenu.Content>
    </DropdownMenu>
  );
}

export default OrgDropdown;
