import { ProductFieldsChanged } from "@/components/MenuComponents/modals/products/EditProductModal";
import { NewProductData } from "@/components/MenuComponents/modals/products/NewProductModal";
import { createProductSchema } from "@/components/MenuComponents/modals/products/validations/createProductSchema";
import { Categorie } from "@/types/Categorie";
import {
  IngredientsTypeFromAPI,
  IngredientTypeForFe,
} from "@/types/Ingredients";
import { Products } from "@/types/Products";
import { apiclient, uploadImage } from "@/utils/apiClient";
import {
  UseMutateAsyncFunction,
  useMutation,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { OnErrorCBType, OnSuccessCBType } from "../types/mutations.type";

export class MenuService {
  static async listAllProducts(
    orgId: string
  ): Promise<MenuService.ListAllProductOutput> {
    const { data } = await apiclient.get(`/product/${orgId}`);
    const products = data as Products[];

    return products.map((product) => ({
      id: product._id,
      categoria: product.category.name,
      imageUrl: product.imageUrl,
      name: product.name,
      preco: product.discount ? product.priceInDiscount : product.price,
    }));
  }

  static async deleteProduct({
    id,
    orgId,
  }: MenuService.DeleteProductInput): Promise<void> {
    await apiclient.delete(`/product/${orgId}/${id}`);
  }

  static async listAllCategories(orgId: string): Promise<MenuService.ListAllCategoriesOutput> {
    const { data } = await apiclient.get(`/category/categories/${orgId}`);
    return data as Categorie[];
  }

  static async deleteCategorie({id, orgId}: MenuService.DeleteCategorieInput): Promise<void> {
    await apiclient.delete(`/category/${orgId}/${id}`);
  }

  static createProduct(
    onSuccess: OnSuccessCBType,
    onError: OnErrorCBType
  ): {
    createProduct: UseMutateAsyncFunction<
      AxiosResponse<any, any>,
      any,
      NewProductData,
      unknown
    >;
    isPending: boolean;
  } {
    const { mutateAsync, isPending } = useMutation({
      mutationFn: async (data: NewProductData) => {
        const { image, ...productData } = { ...data };

        if (!data.image) {
          productData.imageUrl =
            "https://coffective.com/wp-content/uploads/2018/06/default-featured-image.png.jpg";
        } else {
          try {
            // Upload image
            const { data: responseImageUrl } = await uploadImage.postForm(
              `?userid=${data.userId}&orgId=${data.org}&productId=${data.name}&categoryOfImage='PRODUCT'`,
              {
                file: data.image,
              }
            );
            productData.imageUrl = responseImageUrl.url;
          } catch (error) {
            productData.imageUrl =
              "https://coffective.com/wp-content/uploads/2018/06/default-featured-image.png.jpg";
          }
        }
        const isValid = createProductSchema.safeParse(productData);

        if (!isValid.success) {
          console.log(isValid.error.errors);
          const msgs = isValid.error.issues.map((iss) => iss.message);
          throw new Error(msgs.join(" , "));
        }
        return await apiclient.post("/product", productData);
      },
      onSuccess,
      onError,
    });

    return { createProduct: mutateAsync, isPending };
  }

  static getInfoProduct(
    { orgId, productId }: { orgId: string; productId: string },
    onClose: () => void,
    cb: (data: ProductFieldsChanged) => void
  ): UseQueryResult<Products | undefined, Error> {
    return useQuery({
      queryKey: ["get_product_info_edit_form", { productId, orgId }],
      queryFn: async () => {
        try {
          const { data } = await apiclient.get(
            `/product/${orgId}/${productId}`
          );
          const product = data as Products;
          cb({
            description: product.description,
            discount: product.discount,
            image: null,
            imageUrl: product.imageUrl,
            ingredients: product.ingredients.map((ing) => ing._id),
            name: product.name,
            priceInDiscount: product.priceInDiscount,
            newIngredients: [],
            price: data.price,
          });
          return product;
        } catch (error: any) {
          console.log(error.message);
          onClose();
        }
      },
    });
  }

  static getAllIngredients(
    ingredientUsed: string[] | undefined,
    cb: (data: IngredientTypeForFe[]) => void
  ): UseQueryResult<IngredientsTypeFromAPI[] | undefined, Error> {
    return useQuery({
      queryKey: ["all_ingredients"],
      queryFn: async () => {
        try {
          const { data } = await apiclient.get("/ingredient");
          const ingredient = data.data as IngredientsTypeFromAPI[];
          const formatIngredient = ingredient.map((ingredient) => ({
            id: ingredient._id,
            name: ingredient.name,
            icon: ingredient.icon,
            selected: new Set(ingredientUsed).has(ingredient._id),
          }));
          cb(formatIngredient);
          return ingredient;
        } catch (error: any) {
          console.log(error.message);
          cb([]);
        }
      },
    });
  }

  static getAllCategories(orgId: string): UseQueryResult<Categorie[], Error> {
    return useQuery({
      queryKey: ["all_categories", orgId],
      queryFn: async (): Promise<Categorie[]> => {
        try {
          const { data } = await apiclient.get(`/category/categories/${orgId}`);
          return data as Categorie[];
        } catch (error: any) {
          console.log(error.message);
          return [];
        }
      },
    });
  }

  static createCategorie(
    onSuccess: OnSuccessCBType,
    onError: OnErrorCBType
  ): {
    createCategorie: UseMutateAsyncFunction<
      AxiosResponse<any, any>,
      Error,
      {
        icon: string;
        name: string;
        org: string;
      },
      unknown
    >;
    isPending: boolean;
  } {
    const { mutateAsync, isPending } = useMutation({
      mutationFn: async ({
        name,
        icon,
        org,
      }: {
        icon: string;
        name: string;
        org: string;
      }) => {
        return await apiclient.post("/category/categories", {
          icon,
          name,
          org,
        });
      },
      onSuccess,
      onError,
    });

    return { createCategorie: mutateAsync, isPending };
  }

  static editCategorie(
    onSuccess: OnSuccessCBType,
    onError: OnErrorCBType
  ): {
    editCategorie: UseMutateAsyncFunction<
      AxiosResponse<any, any>,
      Error,
      {
        id: string;
        icon: string;
        name: string;
        org: string;
      },
      unknown
    >;
    isPending: boolean;
  } {
    const { mutateAsync, isPending } = useMutation({
      mutationFn: async ({
        id,
        icon,
        name,
        org,
      }: {
        id: string;
        icon: string;
        name: string;
        org: string;
      }) => {
        return await apiclient.patch(`/category/categories/${org}/${id}`, {
          icon,
          name,
        });
      },
      onSuccess,
      onError,
    });

    return { editCategorie: mutateAsync, isPending };
  }

  static createIngredient(
    onSuccess: OnSuccessCBType,
    onError: OnErrorCBType
  ): {
    createIngredient: UseMutateAsyncFunction<
      AxiosResponse<any, any>,
      Error,
      {
        icon: string;
        name: string;
      },
      unknown
    >;
    isPending: boolean;
  } {
    const { mutateAsync, isPending } = useMutation({
      mutationFn: async (data: { icon: string; name: string }) =>
        await apiclient.post("/ingredient", data),
      onSuccess,
      onError,
    });

    return { createIngredient: mutateAsync, isPending };
  }
}

export namespace MenuService {
  export type ListAllProductOutput = {
    id: string;
    imageUrl: string;
    name: string;
    categoria: string;
    preco: number;
  }[];

  export type DeleteProductInput = { orgId: string; id: string };
  export type DeleteCategorieInput = { orgId: string; id: string };
  export type ListAllCategoriesOutput = Categorie[];
}
