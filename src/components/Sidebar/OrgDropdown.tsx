import { useUser } from "@/context/user";
import { cn } from "@/lib/utils";
import { OrgService } from "@/services/api/org";
import { useQuery } from "@tanstack/react-query";
import { CirclePlus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { VscLoading } from "react-icons/vsc";
import { useNavigate } from "react-router";
import IconSidebar from "../../assets/images/icon-sidebar.svg";

function OrgDropdown() {
  const stateUser = useUser((state) => state.user);
  const setOrgId = useUser((state) => state.setOrgId);
  const setImageUrl = useUser((state) => state.setOrgImageUrl);
  const navigate = useNavigate();
  const [showOrgs, setShowOrgs] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowOrgs(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCreateNew = () => {
    navigate("/org/register");
  };

  const { isLoading, data } = useQuery({
    enabled: !!stateUser.id,
    queryKey: ["orgs-user", stateUser.id],
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
    <section ref={dropdownRef} className="h-[108px] w-[108px] relative">
      <button
        onClick={() => {
          setShowOrgs((prev) => !prev);
        }}
        className="flex items-center justify-center h-full w-full hover:bg-gray-100 transition-all duration-100 rounded-md"
      >
        {
          !stateUser.orgId && <img src={IconSidebar} alt="Logo" className="w-11 h-7" />
        }
        {
          stateUser.orgImageUrl && <img src={stateUser.orgImageUrl} alt="Logo" className="w-11 h-7" />
        }
        {
          !stateUser.orgImageUrl && <p>NO</p>
        }
      </button>
      <div
        className={cn(
          "flex pointer-events-none flex-col justify-center items-start gap-2 bg-gradient-to-r from-[#FAFAFA] to-gray-200 absolute top-0 p-4 opacity-0 -right-0 w-0 border-r border-gray-400 rounded-br-md transition-all duration-150",
          showOrgs && "-right-60 w-60 opacity-100 pointer-events-auto"
        )}
      >
        {isLoading ? (
          <div className="mx-auto">
            <VscLoading className="animate-spin" />
          </div>
        ) : data ? (
          <>
            {data.map((org) => (
              <button
                key={org._id}
                onClick={() => {
                  setOrgId(org._id);
                  setShowOrgs((prev) => !prev)
                }}
                className="text-sm hover:bg-gray-300 px-4 py-1 rounded-lg max-w-56 truncate text-ellipsis transition-all duration-150"
              >
                {org.name}
              </button>
            ))}
          </>
        ) : (
          <button
            onClick={handleCreateNew}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm max-w-56 bg-white text-gray-700 hover:bg-gray-50 focus:outline-none transition-colors"
          >
            <CirclePlus size={14} />
            Criar Nova Organização
          </button>
        )}
      </div>
    </section>
  );
}

export default OrgDropdown;
