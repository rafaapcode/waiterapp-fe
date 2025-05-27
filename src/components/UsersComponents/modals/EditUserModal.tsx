import Modal from "@/components/Modal";
import { apiclient } from "@/utils/apiClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { LoaderCircle } from "lucide-react";
import {
  ChangeEvent,
  FormEvent,
  lazy,
  Suspense,
  useCallback,
  useState,
} from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { toast } from "react-toastify";
import DeleteUserModalSkeleton from "../skeletons/DeleteUserModalSkeleton";
import EditUserModalSkeleton from "../skeletons/EditUserModalSkeleton";
import { updateUserSchema } from "../validations/updateUserSchema";

const DeleteUserModal = lazy(() => import("./DeleteUserModal"));

interface EditUserModalProps {
  isVisible: boolean;
  onClose: () => void;
  userId: string;
}

interface UserData {
  email: string;
  name: string;
  password: string;
  role: "ADMIN" | "WAITER";
}

function EditUserModal({ isVisible, onClose, userId }: EditUserModalProps) {
  const queryClient = useQueryClient();
  const [deleteUserModal, setDeleteUserModal] = useState<boolean>(false);
  const [passwordVisibility, setPasswordVisibility] = useState<
    "password" | "text"
  >("password");
  const [roleSelected, setRoleSelected] = useState<{
    adm: boolean;
    waiter: boolean;
  }>({ adm: false, waiter: false });

  const [userInfo, setUserInfo] = useState<UserData>({
    email: "",
    name: "",
    password: "",
    role: "ADMIN",
  });

  const { isLoading, isFetching } = useQuery({
    queryKey: ["user", userId],
    queryFn: async () => {
      try {
        const { data } = await apiclient.get(`/user/${userId}`);
        setUserInfo({
          email: data.email,
          name: data.name,
          password: "",
          role: data.role,
        });
        if(data.role === "ADMIN") {
          setRoleSelected({adm: true, waiter: false})
        } else {
          setRoleSelected({adm: false, waiter: true})
        }
      } catch (error) {
        console.log(error);
        const err = error as AxiosError<{message: string}>;
        toast.error(err.response?.data?.message);
        return { total_pages: 0, users: [] };
      }
    },
  });

  const {mutateAsync: editUserMutate, isPending} = useMutation({
    mutationFn: async (data: UserData) => {
      if (!userId || userId.length !== 24) {
        toast.error("Id do usuário inválido");
        return;
      }
      const newUserdata = {
        ...(data.password && { password: data.password }),
        ...(data.email && { email: data.email }),
        ...(data.name && { name: data.name }),
        ...(data.role && { role: data.role }),
      }

      const isValid = updateUserSchema.safeParse(newUserdata);

      if (!isValid.success) {
        console.log(isValid.error.errors);
        const msgs = isValid.error.issues.map((iss) => iss.message);
        toast.error(msgs.join(", "));
        throw new Error("Dados inválidos");
      }

      await apiclient.put(`/user/${userId}`, newUserdata);
    },
    onSuccess: () => {
      toast.success("Usuário atualizado com sucesso !");
      queryClient.invalidateQueries({queryKey: ["all_users"]})
      onClose();
    },
    onError: (error) => {
      const err = error as AxiosError<{message: string}>;
      toast.error(err.response?.data?.message);
      return;
    },
  });

  const toggleDeleteUserModel = useCallback(
    () => setDeleteUserModal((prev) => !prev),
    []
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSave = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: UserData = {
      ...userInfo,
      role: roleSelected.adm ? "ADMIN" : "WAITER",
    };
    console.log(roleSelected.adm)
    console.log('Novo dado a ser editado',data);
    editUserMutate(data);
  };

  return (
    <>
      {deleteUserModal && (
        <Suspense
          fallback={<DeleteUserModalSkeleton isVisible={deleteUserModal} />}
        >
          <DeleteUserModal
            onEditModalClose={onClose}
            isVisible={deleteUserModal}
            onClose={toggleDeleteUserModel}
            userData={{ id: userId, name: userInfo.name, email: userInfo.email }}
          />
        </Suspense>
      )}
      {isLoading || isFetching ? (
        <EditUserModalSkeleton isVisible={isLoading || isFetching} />
      ) : (
        <Modal.Root size="sm" isVisible={isVisible}>
          <form action="" onSubmit={onSave}>
            <Modal.Header onClose={onClose}>
              <p className="text-[#333333] text-2xl font-semibold">
                Editar Usuário
              </p>
            </Modal.Header>

            <Modal.Body className="my-12">
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm">
                    Nome
                  </label>
                  <input
                    required
                    value={userInfo.name}
                    onChange={handleChange}
                    minLength={4}
                    type="text"
                    id="name"
                    name="name"
                    className="p-4 w-full border border-gray-300 rounded-md transition-all duration-200"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm">
                    Email
                  </label>
                  <input
                    required
                    value={userInfo.email}
                    onChange={handleChange}
                    type="email"
                    id="email"
                    name="email"
                    className="p-4 w-full border border-gray-300 rounded-md transition-all duration-200"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="senha" className="text-sm">
                    Senha
                  </label>
                  <div className="border border-[#CCCCCC] rounded-lg flex items-center pr-3 group">
                    <input
                      value={userInfo.password}
                      onChange={handleChange}
                      type={passwordVisibility}
                      name="password"
                      id="senha"
                      className="w-full h-full outline-none border-none p-4 transition-all duration-200 bg-transparent"
                      placeholder="Informe sua nova senha"
                    />
                    {passwordVisibility === "password" && (
                      <BsEye
                        onClick={() => setPasswordVisibility("text")}
                        size={24}
                        className="cursor-pointer text-[#666666] hidden group-hover:block"
                      />
                    )}
                    {passwordVisibility === "text" && (
                      <BsEyeSlash
                        onClick={() => setPasswordVisibility("password")}
                        size={24}
                        className="cursor-pointer text-[#666666] hidden group-hover:block"
                      />
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm">Tipo</label>
                  <div className="flex gap-8">
                    <div className="flex gap-2">
                      <input
                        defaultChecked={userInfo.role === "ADMIN"}
                        onChange={(e) =>
                          setRoleSelected({
                            waiter: false,
                            adm: e.target.checked,
                          })
                        }
                        type="radio"
                        name="role"
                        id="tipo-adm"
                      />
                      <p>Admin</p>
                    </div>
                    <div className="flex gap-2">
                      <input
                        defaultChecked={userInfo.role === "WAITER"}
                        onChange={(e) =>
                          setRoleSelected({
                            adm: false,
                            waiter: e.target.checked,
                          })
                        }
                        type="radio"
                        name="role"
                        id="tipo-garcom"
                      />
                      <p>Garçom</p>
                    </div>
                  </div>
                </div>
              </div>
            </Modal.Body>

            <Modal.CustomFooter>
              <div className="w-full flex  justify-between">
                <button
                  onClick={toggleDeleteUserModel}
                  type="button"
                  className="disabled:bg-[#CCCCCC] disabled:cursor-not-allowed rounded-[48px] border-none text-red-500 px-6 font-semibold"
                >
                  Excluir usuário
                </button>
                <button
                  disabled={isPending}
                  type="submit"
                  className="bg-[#D73035] disabled:bg-[#CCCCCC] disabled:cursor-not-allowed rounded-[48px] border-none text-white py-3 px-6"
                >
                  {isPending ? <LoaderCircle size={24} className="animate-spin"/> :"Salvar alterações"}
                </button>
              </div>
            </Modal.CustomFooter>
          </form>
        </Modal.Root>
      )}
    </>
  );
}

export default EditUserModal;
