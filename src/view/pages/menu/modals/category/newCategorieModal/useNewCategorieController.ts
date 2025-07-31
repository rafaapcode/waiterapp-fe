import { MenuService } from "@/services/api/menu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

interface UseNewCategorieControllerProps {
  isVisible: boolean;
  onClose: () => void;
  orgId: string;
}

export const useNewCategorieController = ({onClose, orgId}: UseNewCategorieControllerProps) => {
  const queryClient = useQueryClient();

  const { mutateAsync: createCategorie, isPending } = useMutation({
    mutationFn: async (data: MenuService.CreateCategorieInput) => {
      await MenuService.createCategorie(data);
    },
  });

  const onSave = async () => {
    try {
      await createCategorie({
        icon: emojivalue ?? "🥗",
        name: categoryName,
        org: orgId,
      });
      toast.success("Categoria criada com Sucesso !", {
        toastId: "categoriaCriadaSucessoId",
      });
      queryClient.invalidateQueries({ queryKey: ["all_categories"] });
      onClose();
    } catch (error) {
      toast.error("Erro ao criar a categoria", {
        toastId: "categoriaCriadaErroId",
      });
    }
  };
};
