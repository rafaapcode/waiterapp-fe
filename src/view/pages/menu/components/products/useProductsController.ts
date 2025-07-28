import { useAuth } from "@/hooks/useAuth";
import { MenuService } from "@/services/api/menu";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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

  const { mutateAsync: deleteProduct, isPending: deletingProduct } =
    useMutation({
      mutationFn: async (productId: string) =>
        MenuService.deleteProduct({ id: productId, orgId: user.orgId }),
    });

  const { data: products, isFetching: isFetchingProducts } = useQuery({
    queryKey: ["get", "all_products", { orgId: user.orgId }],
    queryFn: async () => {
      return await MenuService.listAllProducts(user.orgId);
    }
  });

  const handleDeleteProduct = async (productId: string) => {
    try {
      await deleteProduct(productId);
      queryClient.invalidateQueries({
        queryKey: ["get", "all_products", { orgId: user.orgId }],
      });
    } catch (error) {
      toast.error("Erro ao deletar o produto");
    }
  };

  return {
    products,
    isFetchingProducts,
    handleDeleteProduct,
    deletingProduct,
    handleNewProductModal,
    handleProductIdToEdit,
    newProductModal,
    productIdToEdit,
    orgId: user.orgId,
    userId: user.id,
  };
};
