import { useAuth } from "@/hooks/useAuth";
import { MenuService } from "@/services/api/menu";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";

export const useProductsController = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [newProductModal, setNewProductModal] = useState<boolean>(false);
  const [productIdToEdit, setProductIdToEdit] = useState<string | null>(null);

  const handleNewProductModal = useCallback(
    () => setNewProductModal((prev) => !prev),
    []
  );
  const handleProductIdToEdit = useCallback(
    (id: string | null) => setProductIdToEdit(id),
    []
  );

  const { deleteProduct } = MenuService.deleteProduct(
    () => {
      toast.success("Produto deletado com Sucesso");
      queryClient.invalidateQueries({ queryKey: ["list_all_products"] });
    },
    (error) => {
      const err = error as AxiosError;
      if (err.status === 404) {
        toast.warning("Produto não encontrado !");
      } else {
        toast.error("Erro ao encontrar o ID do registro");
      }
      return;
    }
  );

  const { data, isLoading, isFetching } = MenuService.listAllProducts(
    user.orgId
  );

  return {
    data,
    DeleteProduct: deleteProduct,
    handleNewProductModal,
    handleProductIdToEdit,
    isFetching,
    newProductModal,
    isLoading,
    productIdToEdit,
    orgId: user.orgId,
    userId: user.id,
  };
};
