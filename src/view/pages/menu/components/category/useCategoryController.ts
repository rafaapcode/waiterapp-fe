import { useAuth } from "@/hooks/useAuth";
import { MenuService } from "@/services/api/menu";
import { Categorie } from "@/types/Categorie";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useCallback, useState } from "react";
import { toast } from "react-toastify";

export const useCategoryController = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [newCategorieModal, setNewCategorieModal] = useState<boolean>(false);
  const [editCategorieModal, setEditCategorieModal] =
    useState<Categorie | null>(null);

  const handleNewCategorieModal = useCallback(
    () => setNewCategorieModal((prev) => !prev),
    []
  );
  const handleEditCategorieModal = useCallback(
    (data: Categorie | null) => setEditCategorieModal(data),
    []
  );

  const { mutateAsync: deleteCategorie, isPending } = useMutation({
    mutationFn: async (data: MenuService.DeleteCategorieInput) => {
      await MenuService.deleteCategorie(data);
    },
  });

  const { data } = useQuery({
    queryKey: ["list_all_categories", { orgId: user.orgId }],
    queryFn: async () => await MenuService.listAllCategories(user.orgId),
  });

  const onDeleteCategorie = async (catId: string) => {
    try {
      await deleteCategorie({ id: catId, orgId: user.orgId });
      toast.success("Categoria deletada com Sucesso !", {
        toastId: "categoriaDeletadaSucessoId",
      });
      queryClient.invalidateQueries({ queryKey: ["list_all_categories", { orgId: user.orgId }] });
    } catch (error) {
      toast.error("Erro ao deletar a categoria", {
        toastId: "categoriaDeletadaErroId",
      });
    }
  };


  return {
    data,
    editCategorieModal,
    handleEditCategorieModal,
    handleNewCategorieModal,
    isPending,
    newCategorieModal,
    onDeleteCategorie,
    orgId: user.orgId,
  };
};
