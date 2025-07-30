import Modal from "@/components/Modal";
import { MenuService } from "@/services/api/menu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

interface IngredientModalProps {
  isVisible: boolean;
  onClose: () => void;
}

function IngredientModal({ isVisible, onClose }: IngredientModalProps) {
  const queryClient = useQueryClient();
  const [emojiValue, setEmoji] = useState<string>("🍕");
  const [ingredientName, setIngredientName] = useState<string>("");

  const {mutateAsync: createIngredient, isPending} = useMutation({
    mutationFn: async (data: MenuService.CreateIngredientInput) => {
      await MenuService.createIngredient(data);
    }
  });

  const onSave = async () => {
    if (!emojiValue || !ingredientName) {
      toast.error("Emoji e o nome do ingrediente são obrigatórios !");
      return;
    }
    try {
      await createIngredient({ icon: emojiValue, name: ingredientName });
      toast.success("Ingrediente cadastrado com Sucesso", {toastId: 'cadastroSucessoIngrediente'});
      queryClient.invalidateQueries({ queryKey: ["all_ingredients"] });
      onClose();
    } catch (error) {
      toast.error("Erro ao cadastrar ingredients", {toastId: 'cadastroErroIngrediente'});
    }
  };

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
            onClick={onSave}
            disabled={(ingredientName.length < 4 && !emojiValue) || isPending}
            type="button"
            className="bg-[#D73035] disabled:bg-[#CCCCCC] disabled:cursor-not-allowed rounded-[48px] border-none text-white py-3 px-6"
          >
            {isPending ? (
              <LoaderCircle size={22} className="animate-spin" />
            ) : (
              "Salvar alterações"
            )}
          </button>
        </div>
      </Modal.CustomFooter>
    </Modal.Root>
  );
}

export default IngredientModal;
