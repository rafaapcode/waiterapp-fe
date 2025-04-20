import Modal from "@/components/Modal";
import ProductForm from "./ProductForm";

interface NewProductModalProps {
  isVisible: boolean;
  onClose: () => void;
}


function NewProductModal({isVisible, onClose}: NewProductModalProps) {
  return (
    <Modal.Root size="lg" isVisible={isVisible}>
      <Modal.Header onClose={onClose}>
        <p className="text-[#333333] text-2xl font-semibold">Novo Produto</p>
      </Modal.Header>

      <Modal.Body className="my-2">
       <ProductForm />
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
