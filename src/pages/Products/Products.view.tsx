import { GoPlus } from "react-icons/go";
import ListProducts from "../../components/listProducts/ListProducts";
import { ProductsViewProps } from "./Products.type";

function ProductsView({ props }: ProductsViewProps) {
  const {products} = props;

  return (
    <div className="w-full max-w-[1216px] my-10 mx-auto flex flex-col gap-8">
      <div className="w-full flex justify-end">
        <button className="bg-neutral-200 rounded-md p-1 hover:bg-neutral-300 transition-all duration-150">
          <GoPlus size={25} />
        </button>
      </div>
      <div>
        <ListProducts />
      </div>
    </div>
  );
}

export default ProductsView;
