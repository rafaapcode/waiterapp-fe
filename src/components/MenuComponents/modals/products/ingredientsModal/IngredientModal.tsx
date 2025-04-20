import Modal from "@/components/Modal";
import { useState } from "react";

interface IngredientModalProps {
  isVisible: boolean;
  onClose: () => void;
}

function IngredientModal({ isVisible, onClose }: IngredientModalProps) {
  const [emojiValue, setEmoji] = useState<string>("🍕");
  const [ingredientName, setIngredientName] = useState<string>("");

  return (
    <Modal.Root size="sm" isVisible={isVisible} priority>
      <Modal.Header onClose={onClose}>
        <p className="text-[#333333] text-2xl font-semibold">
          Novo Ingrediente
        </p>
      </Modal.Header>

      <Modal.Body className="my-4">
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
              Nome do Ingrediente
            </label>
            <input
              value={ingredientName}
              onChange={(e) => setIngredientName(e.target.value)}
              id="ingredient"
              type="text"
              placeholder="Ex: Carne"
              className="p-4 border border-[#CCCCCC] rounded-md"
            />
          </div>
        </div>
      </Modal.Body>

      <Modal.CustomFooter>
        <div className="w-full flex justify-end">
          <button
            // onClick={onSave}
            disabled={ingredientName.length < 4}
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

export default IngredientModal;
