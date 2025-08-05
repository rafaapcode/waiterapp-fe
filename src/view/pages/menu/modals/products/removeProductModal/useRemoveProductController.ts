import { MenuService } from "@/services/api/menu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

interface UseRemoveProductControllerProps {
  onClose: () => void;
  editModalClose: () => void;
  productId: string;
  orgId: string;
}

export const useRemoveProductController = ({ editModalClose, onClose, productId, orgId }: UseRemoveProductControllerProps) => {
  const queryClient = useQueryClient();

  const { mutateAsync: deleteProduct, isPending } = useMutation({
    mutationFn: async (data: MenuService.DeleteProductInput) => {
      await MenuService.deleteProduct(data);
    },
  });

  const onDelete = async () => {
    try {
      await deleteProduct({ id: productId, orgId });
      toast.success("Produto deletado com Sucesso", {
        toastId: "deletarProdutoSucessoId",
      });
      queryClient.invalidateQueries({ queryKey: ["list_all_products"] });
      onClose();
      editModalClose();
    } catch (error) {
      toast.error("Erro ao deletar o produto", {
        toastId: "deletarProdutoErroId",
      });
    }
  };

  return {
    onDelete,
    isPending
  }
};
