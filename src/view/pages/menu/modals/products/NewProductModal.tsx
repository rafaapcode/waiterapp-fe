import Modal from "@/components/Modal";
import ProductForm from "../../components/forms/createProductForm/ProductForm";

interface NewProductModalProps {
  isVisible: boolean;
  onClose: () => void;
}


function NewProductModal({ isVisible, onClose }: NewProductModalProps) {
  return (
    <Modal.Root size="lg" isVisible={isVisible}>
      <Modal.Header onClose={onClose}>
        <p className="text-[#333333] text-2xl font-semibold">Novo Produto</p>
      </Modal.Header>

      <Modal.Body className="my-2">
        <ProductForm onClose={onClose}/>
      </Modal.Body>
    </Modal.Root>
  );
}

export default NewProductModal;
