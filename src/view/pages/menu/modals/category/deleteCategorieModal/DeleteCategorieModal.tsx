import Modal from "@/components/Modal";
import { Categorie } from "@/types/Categorie";
import { LoaderCircle } from "lucide-react";
import { useCategorieController } from "./useDeleteCategorieController";

interface DeleteCategorieModalProps {
  data: Categorie | null;
  isVisible: boolean;
  onClose: () => void;
  closeEditModal: () => void;
  orgId: string;
}

function DeleteCategorieModal({
  isVisible,
  onClose,
  data,
  closeEditModal,
  orgId,
}: DeleteCategorieModalProps) {
  if (!data) {
    return null;
  }
  const { isPending, onDelete } = useCategorieController({
    closeEditModal,
    data,
    onClose,
    orgId
  });

  return (
    <Modal.Root size="sm" isVisible={isVisible} priority>
      <Modal.Header onClose={onClose}>
        <p className="text-[#333333] text-2xl font-semibold">
          Excluir Categoria
        </p>
      </Modal.Header>

      <Modal.Body className="mt-12">
        <div className="flex flex-col  items-center justify-center gap-8">
          <p className="text-[#666666]">
            Tem certeza que deseja excluir a categoria ?
          </p>
          <p className="px-6 py-2 shadow border border-[#CCCCCC] rounded-full">
            {data.icon} {data.name}
          </p>
        </div>
        <footer className="flex justify-between items-center mt-8">
          <button
            disabled={isPending}
            onClick={onClose}
            type="button"
            className="disabled:opacity-50 disabled:cursor-not-allowed py-3 px-6 text-[#D73035] font-bold border-none"
          >
            {isPending ? (
              <LoaderCircle size={22} className="animate-spin" />
            ) : (
              "Manter Categoria"
            )}
          </button>
          <button
            onClick={onDelete}
            disabled={isPending}
            type="button"
            className="bg-[#D73035] disabled:opacity-50 disabled:cursor-not-allowed rounded-[48px] border-none text-white py-3 px-6"
          >
            {isPending ? (
              <LoaderCircle size={22} className="animate-spin" />
            ) : (
              "Excluir categoria"
            )}
          </button>
        </footer>
      </Modal.Body>
    </Modal.Root>
  );
}

export default DeleteCategorieModal;
