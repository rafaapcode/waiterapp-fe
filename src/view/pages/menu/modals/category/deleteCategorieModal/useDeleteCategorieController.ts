import { MenuService } from "@/services/api/menu";
import { Categorie } from "@/types/Categorie";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

interface UseCategorieControllerProps {
  data: Categorie;
  onClose: () => void;
  closeEditModal: () => void;
  orgId: string;
}

export const useCategorieController = ({closeEditModal, data, onClose, orgId}: UseCategorieControllerProps) => {
  const queryClient = useQueryClient();

  const { mutateAsync: deleteCategorie, isPending } = useMutation({
    mutationFn: async (data: MenuService.DeleteCategorieInput) => {
      await MenuService.deleteCategorie(data);
    },
  });


  const onDelete = async () => {
    try {
      await deleteCategorie({ id: data._id, orgId: orgId });
      toast.success("Categoria deletada com Sucesso !", {
        toastId: "categoriaDeletadaSucessoId",
      });
      queryClient.invalidateQueries({ queryKey: ["all_categories"] });
      onClose();
      closeEditModal();
    } catch (error) {
      toast.error("Erro ao deletar a categoria", {
        toastId: "categoriaDeletadaErroId",
      });
    }
  };

  return {
    onDelete,
    isPending
  }
};
