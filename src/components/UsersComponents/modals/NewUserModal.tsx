import Modal from "@/components/Modal";
import { FormEvent, useRef } from "react";

interface NewUserModalProps {
  isVisible: boolean;
  onClose: () => void;
}

function NewUserModal({ isVisible, onClose }: NewUserModalProps) {
  const admRadio = useRef<HTMLInputElement>(null);
  const waiterRadio = useRef<HTMLInputElement>(null);

  const onSave = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const admChecked = admRadio.current?.checked;
    const waiterChecked = waiterRadio.current?.checked;
    console.log(admRadio.current?.checked);
  };

  return (
    <Modal.Root size="sm" isVisible={isVisible}>
      <form action="" onSubmit={onSave}>
        <Modal.Header onClose={onClose}>
          <p className="text-[#333333] text-2xl font-semibold">Novo Usuário</p>
        </Modal.Header>

        <Modal.Body className="my-12">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm">
                Nome
              </label>
              <input
                required
                minLength={4}
                type="text"
                id="name"
                className="p-4 w-full border border-gray-300 rounded-md transition-all duration-200 outline-red-500 focus:outline-red-500"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm">
                Email
              </label>
              <input
                required
                type="email"
                id="email"
                className="p-4 w-full border border-gray-300 rounded-md transition-all duration-200 outline-red-500 focus:outline-red-500"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="senha" className="text-sm">
                Senha
              </label>
              <input
                minLength={8}
                required
                type="password"
                id="senha"
                className="p-4 w-full border border-gray-300 rounded-md transition-all duration-200 outline-red-500 focus:outline-red-500"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm">Tipo</label>
              <div className="flex gap-8">
                <div className="flex gap-2">
                  <input
                    ref={admRadio}
                    type="radio"
                    name="role-type"
                    id="tipo-adm"
                  />
                  <p>Admin</p>
                </div>
                <div className="flex gap-2">
                  <input
                    ref={waiterRadio}
                    defaultChecked
                    type="radio"
                    name="role-type"
                    id="tipo-garcom"
                  />
                  <p>Garçom</p>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>

        <Modal.CustomFooter>
          <div className="w-full flex justify-end">
            <button
              // disabled={categoryName.length < 4}
              type="submit"
              className="bg-[#D73035] w-full disabled:bg-[#CCCCCC] disabled:cursor-not-allowed rounded-[48px] border-none text-white py-3 px-6"
            >
              Cadastrar usuário
            </button>
          </div>
        </Modal.CustomFooter>
      </form>
    </Modal.Root>
  );
}

export default NewUserModal;
