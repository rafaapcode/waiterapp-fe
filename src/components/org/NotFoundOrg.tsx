import { useUser } from "@/context/user";
import { OrgService } from "@/services/api/org";
import { useQuery } from "@tanstack/react-query";
import { Building2, CirclePlus } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { VscLoading } from "react-icons/vsc";
import { useNavigate } from "react-router";
import SelectSkeleton from "./SelectSkeleton";

function NotFoundOrg() {
  const stateUser = useUser((state) => state.user);
  const setOrgId = useUser((state) => state.setOrgId);
  const setOrgImage = useUser((state) => state.setOrgImageUrl);
  const navigate = useNavigate();
  const [selectedOrganization, setSelectedOrganization] = useState<string>("");

  const { isLoading, isFetching, data } = useQuery({
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

  const handleCreateNew = () => {
    navigate("/org/register");
  };

  const handleSelectOrganization = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOrganization(e.target.value);
  };
  const continueWithOrg = () => {
    const orgSelected = data?.find(d => d._id === selectedOrganization);
    setOrgId(selectedOrganization);
    setOrgImage(orgSelected?.imageUrl || '');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="p-6 text-center border-b border-gray-200">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
            <Building2 />
          </div>
          <h1 className="text-xl font-semibold text-gray-900 mb-2">
            Selecionar Organização
          </h1>
          <p className="text-sm text-gray-600">
            Nenhuma organização foi selecionada. Escolha uma organização
            existente ou crie uma nova.
          </p>
        </div>

        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="organization-select"
              className="block text-sm font-medium text-gray-700"
            >
              Organizações Disponíveis
            </label>
            {isLoading ? (
              <SelectSkeleton />
            ) : (
              <div className="relative">
                <select
                  disabled={!data}
                  id="organization-select"
                  value={selectedOrganization}
                  onChange={handleSelectOrganization}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none bg-white text-gray-900"
                >
                  <option value="">Selecione uma organização</option>
                  {data?.map((org) => (
                    <option key={org._id} value={org._id}>
                      {org.name}
                    </option>
                  ))}
                </select>
                {isFetching && (
                  <div className="absolute inset-y-0 right-2 flex items-center pr-3 pointer-events-none">
                    <VscLoading size={16} className="animate-spin" />
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">ou</span>
            </div>
          </div>

          <button
            onClick={handleCreateNew}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-gray-700 hover:bg-gray-50 focus:outline-none transition-colors"
          >
            <CirclePlus size={14} />
            Criar Nova Organização
          </button>

          <button
            onClick={continueWithOrg}
            disabled={!selectedOrganization}
            className="w-full px-4 py-2 disabled:bg-red-300 disabled:cursor-not-allowed bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
          >
            Continuar com Organização Selecionada
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotFoundOrg;
