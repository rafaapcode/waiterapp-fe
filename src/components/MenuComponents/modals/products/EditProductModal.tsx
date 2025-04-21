import Modal from "@/components/Modal";

interface EditProductModalProps {
  isVisible: boolean;
  onClose: () => void;
}


function EditProductModal({isVisible, onClose}: EditProductModalProps) {
  return (
    <Modal.Root size="lg" isVisible={isVisible}>
      <Modal.Header onClose={onClose}>
        <p className="text-[#333333] text-2xl font-semibold">Editar Produto</p>
      </Modal.Header>

      <Modal.Body className="my-4">
        <div className="bg-red-300">
          <h1>Edição</h1>
        </div>
      </Modal.Body>

      <Modal.CustomFooter>
        <div className="w-full flex justify-between">
        <button
            // onClick={onSave}
            // disabled={categoryName.length < 4}
            type="button"
            className="disabled:bg-[#CCCCCC] disabled:cursor-not-allowed rounded-[48px] border-none text-red-500 px-6 font-semibold"
          >
            Excluir Produto
          </button>
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

export default EditProductModal;
