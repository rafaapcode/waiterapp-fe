import Modal from "@/components/Modal";
import { Categorie } from "@/types/Categorie";

interface DeleteCategorieModalProps {
  data: Categorie | null;
  isVisible: boolean;
  onClose: () => void;
  closeEditModal: () => void;
}

function DeleteCategorieModal({ isVisible, onClose, data, closeEditModal}: DeleteCategorieModalProps) {

  if (!data) {
    return null;
  }

  const onDelete = async () => {
    console.log(data.id);
    onClose();
    closeEditModal();
  };

  return (
    <Modal.Root size="sm" isVisible={isVisible} priority>
      <Modal.Header onClose={onClose}>
        <p className="text-[#333333] text-2xl font-semibold">Excluir Categoria</p>
      </Modal.Header>

      <Modal.Body className="my-12">
        <div className="flex flex-col  items-center justify-center gap-8">
            <p className="text-[#666666]">Tem certeza que deseja excluir a categoria ?</p>
            <p className="px-6 py-2 shadow border border-[#CCCCCC] rounded-full">{data.emoji} {data.name}</p>
        </div>
      </Modal.Body>

      <Modal.Footer cancelTitle="Manter Categoria" onCancel={onClose} isLoading={false} orientation="horizontal" successTitle="Excluir categoria" onClick={onDelete}/>
    </Modal.Root>
  );
}

export default DeleteCategorieModal;
