import { useCategorieMenu, useProductsMenu } from "./menu.data";
import MenuView from "./menu.view";

function MenuPage() {
  const { props: ProductsProps } = useProductsMenu();
  const { props: CategorieProps } = useCategorieMenu();

  return (
   <MenuView productsTable={ProductsProps} categoriesTable={CategorieProps}/>
  )
}

export default MenuPage
