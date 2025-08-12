import Button from "@/components/atoms/Button";
import Modal from "@/components/Modal";
import { LoaderCircle } from "lucide-react";
import { useDeleteUserModalController } from "./useDeleteUserModalController";

interface DeleteUserModalProps {
  isVisible: boolean;
  onClose: () => void;
  onEditModalClose: () => void;
  userData: {
    id: string;
    name: string;
    email: string;
  };
}

function DeleteUserModal({
  isVisible,
  onClose,
  userData,
  onEditModalClose,
}: DeleteUserModalProps) {
  const { deletingUser, onDelete } = useDeleteUserModalController({
    onClose,
    onEditModalClose,
  });

  return (
    <Modal.Root size="sm" isVisible={isVisible} priority>
      <Modal.Header onClose={onClose}>
        <p className="text-[#333333] text-2xl font-semibold">Editar Usuário</p>
      </Modal.Header>

      <Modal.Body className="mt-12">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm">
              Nome
            </label>
            <input
              required
              readOnly
              defaultValue={userData.name}
              minLength={4}
              type="text"
              id="name"
              name="name"
              className="p-4 w-full border border-gray-300 rounded-md transition-all duration-200 text-gray-400"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm">
              Email
            </label>
            <input
              defaultValue={userData.email}
              required
              readOnly
              type="email"
              id="email"
              name="email"
              className="p-4 w-full border border-gray-300 rounded-md transition-all duration-200 text-gray-400"
            />
          </div>
        </div>
        <footer className="flex justify-between items-center mt-8">
          <Button
            disabled={deletingUser}
            onClick={onClose}
            type="button"
            variant={"secondary"}
          >
            {deletingUser ? (
              <LoaderCircle size={22} className="animate-spin" />
            ) : (
              "Manter usuário"
            )}
          </Button>
          <Button
            onClick={() => onDelete(userData.id)}
            disabled={deletingUser}
            type="button"
            size={"md"}
          >
            {deletingUser ? (
              <LoaderCircle size={22} className="animate-spin" />
            ) : (
              "Excluir usuário"
            )}
          </Button>
        </footer>
      </Modal.Body>
    </Modal.Root>
  );
}

export default DeleteUserModal;
