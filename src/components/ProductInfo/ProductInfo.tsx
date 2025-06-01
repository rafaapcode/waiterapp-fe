import { TbRosetteDiscountFilled } from "react-icons/tb";
import { Products } from "../../types/Order";
import { formatCurrency } from "../../utils/formatCurrency";

interface ProductInfoProps {
  products: Products;
}

function ProductInfo({ products }: ProductInfoProps) {
  const { _id, product, quantity } = products;

  if(!products) {
    return null;
  }
  return (
    <div className="flex" key={_id}>
      <img
        className="w-14 h-full rounded-md"
        src={`${product.imageUrl}`}
        alt={product.name}
      />
      <span className="block min-w-[20px] text-[#666] ml-3">{quantity}x</span>
      <div className="ml-1">
        <strong className="block mb-1">{product.name}</strong>
        <div className="flex gap-2">
          <span className={`text-sm ${product.discount ? "text-green-600" : "text-[#666]"}`}>
            {formatCurrency(product.price * quantity)}
          </span>
        </div>
      </div>
      {product.discount && (
        <div className="ml-2 pt-1">
          <TbRosetteDiscountFilled />
        </div>
      )}
    </div>
  );
}

export default ProductInfo;
