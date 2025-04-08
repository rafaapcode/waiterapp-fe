import { RxUpdate } from "react-icons/rx";
import Modal from "../Modal";

interface RestartModalProps {
  isVisible: boolean;
  size?: "sm" | "md" | "lg";
  onClose: () => void;
  onCancel: () => void;
  onClick: () => Promise<void>;
}

function RestartModal({
  size = "sm",
  isVisible,
  onClose,
  onCancel,
  onClick,
}: RestartModalProps) {
  return (
    <Modal.Root size={size} isVisible={isVisible}>
      <Modal.Header onClose={onClose}>
        <div className="flex items-center gap-4">
          <RxUpdate size={24} className="text-[#333333]" />
          <p className="text-[#333333] text-2xl font-semibold">
            Reiniciar o dia
          </p>
        </div>
      </Modal.Header>
      <Modal.Body className="my-12">
        <div className="w-3/4 mx-auto">
          <p className="text-center font-semibold">
            Ao reiniciar o dia, todos os pedidos serão arquivados no status
            atual.
          </p>
          <p className="text-center font-semibold mt-4">
            Deseja reniciar o dia ?
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer
        isLoading={false}
        cancelTitle="Não, continuar pedidos"
        successTitle="Sim, reiniciar o dia"
        orientation="horizontal"
        onCancel={onCancel}
        onClick={onClick}
      />
    </Modal.Root>
  );
}

export default RestartModal;
