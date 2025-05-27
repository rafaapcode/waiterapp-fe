import { MenuService } from "@/services/api/menu";
import { Categorie } from "@/types/Categorie";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { CategoriesTableProps, ProductsTableProps } from "./menu.type";

export const useProductsMenu = (): ProductsTableProps => {
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

  const { data, isLoading, isFetching } = MenuService.listAllProducts();

  return {
    props: {
      data,
      DeleteProduct: deleteProduct,
      handleNewProductModal,
      handleProductIdToEdit,
      isFetching,
      newProductModal,
      isLoading,
      productIdToEdit,
    },
  };
};

export const useCategorieMenu = (): CategoriesTableProps => {
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

  const { deleteCategorie, isPending } = MenuService.deleteCategorie(
    () => {
      toast.success("Categoria deletada com Sucesso !");
      queryClient.invalidateQueries({ queryKey: ["all_categories"] });
    },
    (error) => {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message);
      return;
    }
  );

  const { data } = MenuService.listAllCategories();

  return {
    props: {
      data,
      editCategorieModal,
      handleEditCategorieModal,
      handleNewCategorieModal,
      isPending,
      newCategorieModal,
      DeleteCategorie: deleteCategorie,
    },
  };
};
