import Button from "@/components/atoms/Button";
import Modal from "@/components/molecule/Modal";
import { LoaderCircle } from "lucide-react";
import { RxUpdate } from "react-icons/rx";

interface RestartModalProps {
  isVisible: boolean;
  size?: "sm" | "md" | "lg";
  onClose: () => void;
  onCancel: () => void;
  onClick: () => Promise<void>;
  isLoading?: boolean;
}

function RestartModal({
  size = "sm",
  isVisible,
  onClose,
  onCancel,
  onClick,
  isLoading = false,
}: RestartModalProps) {
  return (
    <Modal size={size} isVisible={isVisible}>
      <Modal.Header onClose={onClose}>
        <div className="flex items-center gap-4">
          <RxUpdate size={24} className="text-[#333333]" />
          <p className="text-[#333333] text-2xl font-semibold">
            Reiniciar o dia
          </p>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="w-3/4 mx-auto">
          <p className="text-center font-semibold">
            Ao reiniciar o dia, todos os pedidos serão arquivados no status
            atual.
          </p>
          <p className="text-center font-semibold mt-4">
            Deseja reniciar o dia ?
          </p>
        </div>
        <div className="mt-10 flex">
          <Button
            onClick={onCancel}
            type="button"
            variant="secondary"
            className="disabled:opacity-50 disabled:cursor-not-allowed py-3 px-6 text-[#D73035] font-bold border-none"
          >
            Não, continuar pedidos
          </Button>
          <Button
            onClick={onClick}
            disabled={isLoading}
            type="button"
          >
            {isLoading ? (
              <LoaderCircle size={22} className="animate-spin" />
            ) : (
              "Sim, reiniciar o dia"
            )}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default RestartModal;
