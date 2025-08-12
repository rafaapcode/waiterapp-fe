import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Modal from "@/components/Modal";
import { Select } from "@/components/molecule/Select";
import { LoaderCircle } from "lucide-react";
import { lazy, Suspense } from "react";
import { Controller } from "react-hook-form";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import DeleteUserModalSkeleton from "../../skeletons/DeleteUserModalSkeleton";
import EditUserModalSkeleton from "../../skeletons/EditUserModalSkeleton";
import { useEditUserModalController } from "./useEditUserModalController";

const DeleteUserModal = lazy(
  () => import("../deleteUserModal/DeleteUserModal")
);

interface EditUserModalProps {
  isVisible: boolean;
  onClose: () => void;
  userId: string;
}

function EditUserModal({ isVisible, onClose, userId }: EditUserModalProps) {
  const {
    deleteUserModal,
    toggleDeleteUserModal,
    gettingUser,
    userData,
    errors,
    register,
    passwordVisibility,
    togglePasswordVisibilityModal,
    control,
    onEdit,
    editingUser,
    isDirty,
    isValid,
  } = useEditUserModalController({
    onClose,
    userId,
  });

  return (
    <>
      {deleteUserModal && (
        <Suspense
          fallback={
            <DeleteUserModalSkeleton
              isVisible={deleteUserModal && !gettingUser && !!userData}
            />
          }
        >
          <DeleteUserModal
            onEditModalClose={onClose}
            isVisible={deleteUserModal}
            onClose={toggleDeleteUserModal}
            userData={{
              id: userId,
              name: userData?.name ?? "",
              email: userData?.email ?? "",
            }}
          />
        </Suspense>
      )}

      {gettingUser ? (
        <EditUserModalSkeleton isVisible={gettingUser} />
      ) : (
        <Modal.Root size="sm" isVisible={isVisible}>
          <Modal.Header onClose={onClose}>
            <p className="text-[#333333] text-2xl font-semibold">
              Editar Usuário
            </p>
          </Modal.Header>

          <Modal.Body className="my-12">
            <form onSubmit={onEdit}>
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
                  <div className="border border-[#CCCCCC] rounded-lg flex items-center pr-3 group">
                    <Input
                      placeholder="Senha"
                      error={errors.password?.message}
                      {...register("password")}
                      type=""
                    />
                    {passwordVisibility === "password" && (
                      <BsEye
                        onClick={() => togglePasswordVisibilityModal()}
                        size={24}
                        className="cursor-pointer text-[#666666] hidden group-hover:block"
                      />
                    )}
                    {passwordVisibility === "text" && (
                      <BsEyeSlash
                        onClick={() => togglePasswordVisibilityModal()}
                        size={24}
                        className="cursor-pointer text-[#666666] hidden group-hover:block"
                      />
                    )}
                  </div>
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
              <div className="w-full flex justify-between">
                <Button
                  onClick={toggleDeleteUserModal}
                  type="button"
                  variant="secondary"
                >
                  Excluir Usuário
                </Button>
                <Button
                  disabled={!isValid || !isDirty || editingUser}
                  type="submit"
                  variant="primary"
                  size={"md"}
                >
                  {editingUser ? (
                    <LoaderCircle size={22} className="animate-spin" />
                  ) : (
                    "Salvar alterações"
                  )}
                </Button>
              </div>
            </form>
          </Modal.Body>
        </Modal.Root>
      )}
    </>
  );
}

export default EditUserModal;
