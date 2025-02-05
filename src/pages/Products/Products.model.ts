import { useEffect, useState } from "react";
import { Products } from "../../types/Products";
import { api } from "../../utils/api";
import { ProductsViewProps } from "./Products.type";

export const useProductsModel = (): ProductsViewProps => {
  const [allProducts, setAllProducts] = useState<Products[]>([]);

  useEffect(() => {
    api.get("/product").then(({data}) => setAllProducts(data));
  }, []);

  return {
    props: {
      products: allProducts
    }
  }
};
