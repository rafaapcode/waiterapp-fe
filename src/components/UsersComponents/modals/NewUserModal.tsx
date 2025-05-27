import Modal from "@/components/Modal";
import { apiclient } from "@/utils/apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { LoaderCircle } from "lucide-react";
import { FormEvent, useRef, useState } from "react";
import { toast } from "react-toastify";
import { createUserSchema } from "../validations/createUserValidation";

interface NewUserModalProps {
  isVisible: boolean;
  onClose: () => void;
}

interface NewUserData {
  name: string;
  email: string;
  password: string;
}

function NewUserModal({ isVisible, onClose }: NewUserModalProps) {
  const queryClient = useQueryClient();
  const [userData, setUserData] = useState<NewUserData>({
    email: "",
    name: "",
    password: "",
  });
  const admRadio = useRef<HTMLInputElement>(null);

  const { mutateAsync: creteUser, isPending } = useMutation({
    mutationFn: async (data: NewUserData & { role: "WAITER" | "ADMIN" }) => {
      const isValid = createUserSchema.safeParse({ ...data });

      if (!isValid.success) {
        const msgs = isValid.error.issues.map((err) => err.message).join(" , ");
        toast.error(msgs);
        return;
      }

      await apiclient.post(`/user`, data);
    },
    onSuccess: () => {
      toast.success("Usuário criado com sucesso !");
      queryClient.invalidateQueries({ queryKey: ["all_users", { page: 1 }] });
      onClose();
    },
    onError: (error) => {
      const err = error as AxiosError<{message: string}>;
      toast.error(err.response?.data?.message);
      return;
    },
  });

  const onSave = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const admChecked = admRadio.current?.checked;

    creteUser({ ...userData, role: admChecked ? "ADMIN" : "WAITER" });
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
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, name: e.target.value }))
                }
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
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, email: e.target.value }))
                }
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
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, password: e.target.value }))
                }
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
              disabled={isPending}
              type="submit"
              className="bg-[#D73035] w-full disabled:bg-[#CCCCCC] disabled:cursor-not-allowed rounded-[48px] border-none text-white py-3 px-6"
            >
              {isPending ? (
                <div className="flex justify-center items-center">
                  <LoaderCircle size={24} className="animate-spin text-center" />
                </div>
              ) : (
                "Cadastrar usuário"
              )}
            </button>
          </div>
        </Modal.CustomFooter>
      </form>
    </Modal.Root>
  );
}

export default NewUserModal;
