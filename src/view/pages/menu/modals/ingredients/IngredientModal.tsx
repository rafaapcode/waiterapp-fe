import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Modal from "@/components/Modal";
import { LoaderCircle } from "lucide-react";
import { useIngredientController } from "./useIngredientController";

interface IngredientModalProps {
  isVisible: boolean;
  onClose: () => void;
}

function IngredientModal({ isVisible, onClose }: IngredientModalProps) {
  const { errors, isPending, isValid, onSubmit, register } =
    useIngredientController({
      onClose,
    });

  return (
    <Modal.Root size="sm" isVisible={isVisible} priority>
      <Modal.Header onClose={onClose}>
        <p className="text-[#333333] text-2xl font-semibold">
          Novo Ingrediente
        </p>
      </Modal.Header>

      <Modal.Body className="mt-4">
        <form className="flex flex-col gap-8" onSubmit={onSubmit}>
          <div className="flex flex-col gap-2">
            <Input
              placeholder="Emoji"
              error={errors.icon?.message}
              {...register("icon")}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Input
              placeholder="Nome do Ingrediente"
              error={errors.name?.message}
              {...register("name")}
            />
          </div>

          <div className="w-full flex justify-end">
            <Button
              disabled={!isValid || isPending}
              type="submit"
             variant={"primary"}
            >
              {isPending ? (
                <LoaderCircle size={22} className="animate-spin" />
              ) : (
                "Salvar alterações"
              )}
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal.Root>
  );
}

export default IngredientModal;
