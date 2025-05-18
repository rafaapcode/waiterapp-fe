import { Categorie } from "@/types/Categorie";
import { Products } from "@/types/Products";
import { apiclient } from "@/utils/apiClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { CategoriesTableProps, ProductsForFe, ProductsTableProps } from "./menu.type";

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

  const { mutateAsync: DeleteProduct } = useMutation({
    mutationFn: async (id: string) => await apiclient.delete(`/product/${id}`),
    onSuccess: () => {
      toast.success("Produto deletado com Sucesso");
      queryClient.invalidateQueries({ queryKey: ["list_all_products"] });
    },
    onError: (error) => {
      const err = error as AxiosError;
      if (err.status === 404) {
        toast.warning("Produto não encontrado !");
      } else {
        toast.error("Erro ao encontrar o ID do registro");
      }
      return;
    },
  });

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["list_all_products"],
    queryFn: async (): Promise<ProductsForFe[]> => {
      try {
        const { data } = await apiclient.get("/product");
        const products = data as Products[];

        return products.map((product) => ({
          id: product._id,
          categoria: product.category.name,
          imageUrl: product.imageUrl,
          name: product.name,
          preco: product.discount ? product.priceInDiscount : product.price,
        }));
      } catch (error) {
        return [];
      }
    },
  });

  return {
    props: {
      data,
      DeleteProduct,
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

  const { mutateAsync: DeleteCategorie, isPending } = useMutation({
    mutationFn: async (id: string) => await apiclient.delete(`/category/${id}`),
    onSuccess: () => {
      toast.success("Categoria deletada com Sucesso !");
      queryClient.invalidateQueries({ queryKey: ["all_categories"] });
    },
    onError: (error) => {
      const err = error as AxiosError;
      if (err.status === 404) {
        toast.warning("Id da categoria não encontrada !");
      } else {
        toast.error("Erro ao encontrar o ID da categoria");
      }
      return;
    },
  });

  const { data } = useQuery({
    queryKey: ["all_categories"],
    staleTime: Infinity,
    queryFn: async (): Promise<Categorie[]> => {
      try {
        const { data } = await apiclient.get("/category/categories");
        return data as Categorie[];
      } catch (error: any) {
        console.log(error.response);
        return [];
      }
    },
  });

  return {
    props: {
      data,
      editCategorieModal,
      handleEditCategorieModal,
      handleNewCategorieModal,
      isPending,
      newCategorieModal,
      DeleteCategorie
    }
  }
};
