import { ProductsForFe } from "@/pages/Menu/menu.type";
import { Categorie } from "@/types/Categorie";
import { Products } from "@/types/Products";
import { apiclient } from "@/utils/apiClient";
import {
  UseMutateAsyncFunction,
  useMutation,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { OnErrorCBType, OnSuccessCBType } from "../types/mutations.type";

export class MenuService {
  static listAllProducts(): UseQueryResult<ProductsForFe[], Error> {
    return useQuery({
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
  }

  static deleteProduct(
    onSuccess: OnSuccessCBType,
    onError: OnErrorCBType
  ): {
    deleteProduct: UseMutateAsyncFunction<
      AxiosResponse<any, any>,
      Error,
      string,
      unknown
    >;
  } {
    const { mutateAsync: deleteProduct } = useMutation({
      mutationFn: async (id: string) =>
        await apiclient.delete(`/product/${id}`),
      onSuccess,
      onError,
    });

    return { deleteProduct };
  }

  static listAllCategories(): UseQueryResult<Categorie[], Error> {
    return useQuery({
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
  }

   static deleteCategorie(
    onSuccess: OnSuccessCBType,
    onError: OnErrorCBType
  ): {
    deleteCategorie: UseMutateAsyncFunction<
      AxiosResponse<any, any>,
      Error,
      string,
      unknown
    >;
    isPending: boolean;
  } {
    const { mutateAsync: deleteCategorie, isPending } = useMutation({
        mutationFn: async (id: string) => await apiclient.delete(`/category/${id}`),
        onSuccess,
        onError,
      });

    return { deleteCategorie, isPending };
  }
}
