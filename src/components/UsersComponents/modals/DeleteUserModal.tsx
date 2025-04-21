import Modal from "@/components/Modal";
import { FormEvent } from "react";

interface DeleteUserModalProps {
  isVisible: boolean;
  onClose: () => void;
  userData: {
    name: string;
    email: string;
  };
}

function DeleteUserModal({ isVisible, onClose, userData }: DeleteUserModalProps) {

  const onSave = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(data);
  };

  return (
    <Modal.Root size="sm" isVisible={isVisible} priority>
      <form action="" onSubmit={onSave}>
        <Modal.Header onClose={onClose}>
          <p className="text-[#333333] text-2xl font-semibold">Editar Usuário</p>
        </Modal.Header>

        <Modal.Body className="my-12">
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
        </Modal.Body>

        <Modal.CustomFooter>
          <div className="w-full flex justify-between">
          <button
                onClick={onClose}
                type="button"
                className="disabled:bg-[#CCCCCC] disabled:cursor-not-allowed rounded-[48px] border-none text-red-500 px-6 font-semibold"
              >
                Manter usuário
              </button>
            <button
              // onClick={onSave}
              // disabled={categoryName.length < 4}
              type="submit"
              className="bg-[#D73035] disabled:bg-[#CCCCCC] disabled:cursor-not-allowed rounded-[48px] border-none text-white py-3 px-6"
            >
              Excluir usuário
            </button>
          </div>
        </Modal.CustomFooter>
      </form>
    </Modal.Root>
  );
}

export default DeleteUserModal;
