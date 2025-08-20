import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Modal from "@/components/Modal";
import { Select } from "@/components/molecule/Select";
import { LoaderCircle } from "lucide-react";
import { Controller } from "react-hook-form";
import { useNewUserModalController } from "./useNewUserModalController";

interface NewUserModalProps {
  isVisible: boolean;
  onClose: () => void;
}

function NewUserModal({ isVisible, onClose }: NewUserModalProps) {
  const { creatingUser, onSave, register, errors, control, isValid } = useNewUserModalController({
    onClose,
  });

  return (
    <Modal.Root size="sm" isVisible={isVisible}>
      <form action="" onSubmit={onSave}>
        <Modal.Header onClose={onClose}>
          <p className="text-[#333333] text-2xl font-semibold">Novo Usuário</p>
        </Modal.Header>

        <Modal.Body className="mt-12">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <Input
                placeholder="Nome"
                error={errors.name?.message}
                {...register("name")}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Input
                placeholder="Email"
                error={errors.email?.message}
                {...register("email")}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Input
                placeholder="Senha"
                error={errors.password?.message}
                {...register("password")}
              />
            </div>

            <div className="flex flex-col gap-2">
               <label className="text-sm">Tipo</label>
                  <div className="flex gap-8">
                    <Controller
                      name="role"
                      defaultValue="WAITER"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Select
                          value={value}
                          onChange={onChange}
                          error={errors.role?.message}
                          placeholder="Tipo"
                          options={[
                            {
                              label: "Admin",
                              value: "ADMIN",
                            },
                            {
                              label: "Garçom",
                              value: "WAITER",
                            },
                          ]}
                        />
                      )}
                    />
                  </div>
            </div>
          </div>
          <div className="w-full flex justify-end">
            <Button
              disabled={creatingUser || !isValid}
              type="submit"
              variant={"primary"}
              size={"md"}
            >
              {creatingUser ? (
                <LoaderCircle size={22} className="animate-spin text-center" />
              ) : (
                "Cadastrar usuário"
              )}
            </Button>
          </div>
        </Modal.Body>
      </form>
    </Modal.Root>
  );
}

export default NewUserModal;
