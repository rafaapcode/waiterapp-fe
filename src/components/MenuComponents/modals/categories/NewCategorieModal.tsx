import Modal from "@/components/Modal";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

interface NewCategorieModalProps {
  isVisible: boolean;
  onClose: () => void;
}

function NewCategorieModal({ isVisible, onClose }: NewCategorieModalProps) {
  const emojiRef = useRef<HTMLInputElement>(null);
  const [categoryName, setCategorieName] = useState<string>("");

  const onSave = () => {
    const emojivalue = emojiRef.current?.value.toString();
    if(!categoryName) {
      toast.error('O nome da categoria é obrigatório');
      return;
    }
    console.log(emojivalue);
    console.log(categoryName);
  };

  return (
    <Modal.Root size="sm" isVisible={isVisible}>
      <Modal.Header onClose={onClose}>
        <p className="text-[#333333] text-2xl font-semibold">Nova Categoria</p>
      </Modal.Header>

      <Modal.Body className="my-12">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <label htmlFor="emoji" className="text-[#333333]">Emoji</label>
            <input ref={emojiRef} id="emoji" defaultValue={"🍽️"} type="text" className="p-4 border border-[#CCCCCC] rounded-md"/>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="categoria" className="text-[#333333]">Nome da Categoria</label>
            <input value={categoryName} onChange={e => setCategorieName(e.target.value)} id="categoria"  type="text" placeholder="Ex: Lanches" className="p-4 border border-[#CCCCCC] rounded-md"/>
          </div>
        </div>
      </Modal.Body>

      <Modal.CustomFooter>
        <div className="w-full flex justify-end">
          <button
            onClick={onSave}
            disabled={categoryName.length < 4}
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

export default NewCategorieModal;
