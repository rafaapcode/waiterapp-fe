import Modal from "@/components/Modal";
import { useState } from "react";
import ProductForm from "./forms/ProductForm";

interface NewProductModalProps {
  isVisible: boolean;
  onClose: () => void;
}
export interface NewProductData {
  image: File | null;
  imageUrl: string;
  productName: string;
  description: string;
  ingredients: string[];
  category: string;
  price: number;
  discount: boolean;
  priceInDiscount: number;
}


function NewProductModal({isVisible, onClose}: NewProductModalProps) {
  const [product, setProduct] = useState<NewProductData>({
    image: null,
    category: "",
    description: "",
    imageUrl: "",
    ingredients: [],
    productName: "",
    price: 0,
    discount: false,
    priceInDiscount: 0
  });

  console.log("new product", product);
  return (
    <Modal.Root size="lg" isVisible={isVisible}>
      <Modal.Header onClose={onClose}>
        <p className="text-[#333333] text-2xl font-semibold">Novo Produto</p>
      </Modal.Header>

      <Modal.Body className="my-2">
       <ProductForm product={product} setProduct={setProduct}/>
      </Modal.Body>

      <Modal.CustomFooter>
        <div className="w-full flex justify-end">
          <button
            // onClick={onSave}
            // disabled={categoryName.length < 4}
            type="button"
            className="bg-[#D73035] disabled:bg-[#CCCCCC] disabled:cursor-not-allowed rounded-[48px] border-none text-white py-3 px-6"
          >
            Salvar alterações
          </button>
        </div>
      </Modal.CustomFooter>
    </Modal.Root>
  );
}

export default NewProductModal;
