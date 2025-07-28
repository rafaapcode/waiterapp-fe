import { NewProductData } from "@/components/MenuComponents/modals/products/NewProductModal";
import { createProductSchema } from "@/components/MenuComponents/modals/products/validations/createProductSchema";
import { Categorie } from "@/types/Categorie";
import { IngredientsTypeFromAPI } from "@/types/Ingredients";
import { Products } from "@/types/Products";
import { apiclient, uploadImage } from "@/utils/apiClient";

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

  static async listAllCategories(
    orgId: string
  ): Promise<MenuService.ListAllCategoriesOutput> {
    const { data } = await apiclient.get(`/category/categories/${orgId}`);
    return data as Categorie[];
  }

  static async deleteCategorie({
    id,
    orgId,
  }: MenuService.DeleteCategorieInput): Promise<void> {
    await apiclient.delete(`/category/${orgId}/${id}`);
  }

  static async createProduct(
    data: MenuService.CreateProductInput
  ): Promise<void> {
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
    await apiclient.post("/product", productData);
  }

  static async getInfoProduct({
    orgId,
    productId,
  }: MenuService.GetInfoProductsInput): Promise<MenuService.GetInfoProductsOutput> {
    const { data } = await apiclient.get(`/product/${orgId}/${productId}`);
    const product = data as Products;

    return product;
  }

  static async getAllIngredients(
    ingredientUsed?: string[]
  ): Promise<MenuService.GetAllIngredientsOutput> {
    const { data } = await apiclient.get("/ingredient");
    const ingredient = data.data as IngredientsTypeFromAPI[];
    // TODO: reusar essa logica
    const formatIngredient = ingredient.map((ingredient) => ({
      id: ingredient._id,
      name: ingredient.name,
      icon: ingredient.icon,
      selected: new Set(ingredientUsed).has(ingredient._id),
    }));
    return ingredient;
  }

  static async getAllCategories(
    orgId: string
  ): Promise<MenuService.GetAllCategoriesOutput> {
    const { data } = await apiclient.get(`/category/categories/${orgId}`);
    return data as Categorie[];
  }

  static async createCategorie({
    icon,
    name,
    org,
  }: MenuService.CreateCategorieInput): Promise<void> {
    await apiclient.post("/category/categories", {
      icon,
      name,
      org,
    });
  }

  static async editCategorie({
    icon,
    name,
    org,
    id,
  }: MenuService.EditCategorieInput): Promise<void> {
    await apiclient.patch(`/category/categories/${org}/${id}`, {
      icon,
      name,
    });
  }

  static async createIngredient(
    data: MenuService.CreateIngredientInput
  ): Promise<void> {
    await apiclient.post("/ingredient", data);
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
  export type CreateProductInput = NewProductData;
  export type GetInfoProductsInput = { orgId: string; productId: string };
  export type GetInfoProductsOutput = Products | undefined;
  export type GetAllIngredientsOutput = IngredientsTypeFromAPI[] | undefined;
  export type GetAllCategoriesOutput = Categorie[];
  export type CreateCategorieInput = {
    icon: string;
    name: string;
    org: string;
  };
  export type EditCategorieInput = {
    id: string;
    icon: string;
    name: string;
    org: string;
  };
  export type CreateIngredientInput = { icon: string; name: string };
}
