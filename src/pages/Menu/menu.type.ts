import { Categorie } from "@/types/Categorie";
import { UseMutateAsyncFunction } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export interface ProductsForFe {
  id: string;
  imageUrl: string;
  name: string;
  categoria: string;
  preco: number;
}

export interface ProductsTableProps {
  props: {
    newProductModal: boolean;
    productIdToEdit: string | null;
    handleNewProductModal: () => void;
    handleProductIdToEdit: (id: string | null) => void;
    DeleteProduct: UseMutateAsyncFunction<AxiosResponse<any, any>, Error, string, unknown>;
    data: ProductsForFe[] | undefined;
    isLoading: boolean;
    isFetching: boolean;
  }
}

export interface CategoriesTableProps {
  props : {
    newCategorieModal: boolean;
    editCategorieModal: Categorie | null;
    handleNewCategorieModal: () => void;
    handleEditCategorieModal: (data: Categorie | null) => void;
    DeleteCategorie: UseMutateAsyncFunction<AxiosResponse<any, any>, Error, string, unknown>;
    isPending: boolean;
    data: Categorie[] | undefined;
  }
}

