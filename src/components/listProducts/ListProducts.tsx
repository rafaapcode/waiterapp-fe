import { formatCurrency } from "../../utils/formatCurrency";

function ListProducts() {
  return (
    <div className="bg-neutral-200 p-2 rounded-md flex items-center gap-6 w-1/2 mx-auto">
      {/* Image  */}
      <div className="w-20">
        <img
          src="https://static.itdg.com.br/images/640-440/47d6583c93d77edac5244cab67ba660b/253447-378226756-original.jpg"
          alt="product image"
          className="rounded-md object-cover"
        />
      </div>

      {/* Name and description */}
      <div className="flex flex-col max-w-[80%] overflow-hidden">
        <p className="text-xl">Name</p>
        <p>descrição legal até demais</p>
      </div>

      {/* price */}
      <div className="text-xl">
        {formatCurrency(45)}
      </div>
    </div>
  );
}

export default ListProducts;
