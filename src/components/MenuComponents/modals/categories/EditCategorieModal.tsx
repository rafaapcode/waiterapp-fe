import Modal from "@/components/Modal";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import DeleteCategorieModal from "./DeleteCategorieModal";

interface NewCategorieModalProps {
  data: { id: string; emoji: string; name: string };
  isVisible: boolean;
  onClose: () => void;
}

function EditCategorieModal({
  isVisible,
  onClose,
  data,
}: NewCategorieModalProps) {
  const [emojiValue, setEmoji] = useState<string>("");
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [categoryName, setCategorieName] = useState<string>("");

  const handleDeleteModal = useCallback(() => setDeleteModal(prev => !prev), []);

  useEffect(() => {
    if (isVisible && data) {
      setEmoji(data.emoji);
      setCategorieName(data.name);
    }
  }, [data, isVisible]);

  const onSave = () => {
    if (!categoryName) {
      toast.error("O nome da categoria é obrigatório");
      return;
    }
    console.log(emojiValue);
    console.log(categoryName);
  };

  return (
    <>
      <DeleteCategorieModal closeEditModal={onClose} isVisible={deleteModal} data={data} onClose={handleDeleteModal} />
      <Modal.Root size="sm" isVisible={isVisible}>
        <Modal.Header onClose={onClose}>
          <p className="text-[#333333] text-2xl font-semibold">
            Editar Categoria
          </p>
        </Modal.Header>

        <Modal.Body className="my-12">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <label htmlFor="emoji" className="text-[#333333]">
                Emoji
              </label>
              <input
                value={emojiValue}
                onChange={(e) => setEmoji(e.target.value)}
                id="emoji"
                type="text"
                className="p-4 border border-[#CCCCCC] rounded-md"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="categoria" className="text-[#333333]">
                Nome da Categoria
              </label>
              <input
                value={categoryName}
                onChange={(e) => setCategorieName(e.target.value)}
                id="categoria"
                type="text"
                placeholder="Ex: Lanches"
                className="p-4 border border-[#CCCCCC] rounded-md"
              />
            </div>
          </div>
        </Modal.Body>

        <Modal.CustomFooter>
          <div className="w-full flex justify-between">
            <button
              // disabled={}
              onClick={handleDeleteModal}
              type="button"
              className="disabled:opacity-50 disabled:cursor-not-allowed py-3 px-6 text-[#D73035] font-bold border-none"
            >
              Excluir Categoria
            </button>
            <button
              onClick={onSave}
              disabled={categoryName.length < 4 || !emojiValue}
              type="button"
              className="bg-[#D73035] disabled:bg-[#CCCCCC] disabled:cursor-not-allowed rounded-[48px] border-none text-white py-3 px-6"
            >
              Salvar alterações
            </button>
          </div>
        </Modal.CustomFooter>
      </Modal.Root>
    </>
  );
}

export default EditCategorieModal;
