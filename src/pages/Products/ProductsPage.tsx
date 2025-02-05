import { useProductsModel } from "./Products.model";
import ProductsView from "./Products.view";

function ProductsPage() {
  const {props} = useProductsModel();

  return (
    <ProductsView props={props}/>
  )
}

export default ProductsPage
