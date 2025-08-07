import Modal from "@/components/Modal";
import { lazy } from "react";
import EditProductForm from "../../components/forms/editProductForm/EditForm";

const RemoveProductModal = lazy(() => import("./removeProductModal/RemoveProductModal"));

export interface ProductFieldsChanged {
  ingredients: string[];
  newIngredients: string[];
  image: File | null;
  description: string;
  name: string;
  discount: boolean;
  priceInDiscount: number;
  imageUrl: string;
  price: number;
}

interface EditProductModalProps {
  isVisible: boolean;
  onClose: () => void;
  productid: string;
  orgId: string;
}

function EditProductModal({
  isVisible,
  onClose,
  productid,
}: EditProductModalProps) {
  return (
    <>
      <Modal.Root size="lg" isVisible={isVisible}>
        <Modal.Header onClose={onClose}>
          <p className="text-[#333333] text-2xl font-semibold">
            Editar Produto
          </p>
        </Modal.Header>

        <Modal.Body className="my-4">
          <EditProductForm onClose={onClose} productid={productid}/>
        </Modal.Body>
      </Modal.Root>
    </>
  );
}

export default EditProductModal;
