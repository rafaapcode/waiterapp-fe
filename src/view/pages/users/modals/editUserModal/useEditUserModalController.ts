import { UsersService } from "@/services/api/users";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const editUserSchema = z.object({
  email: z.string({required_error: 'Email é obrigatório'}).email('Email inválido'),
  name: z.string({required_error: 'Nome é obrigatório'}).min(3, 'O nome deve ter no mínimo 3 caracteres'),
  password: z.string({required_error: 'Senha é obrigatório'}).min(8, 'A senha deve ter no mínimo 8 caracteres'),
  role: z.enum(["ADMIN", "WAITER"], {message: 'O role é obrigatório'}),
});

type EditUserFormData = z.infer<typeof editUserSchema>;

interface UseEditUserModalControllerProps {
  onClose: () => void;
  userId: string;
}

export const useEditUserModalController = ({ onClose, userId }: UseEditUserModalControllerProps) => {
const queryClient = useQueryClient();
  const [deleteUserModal, setDeleteUserModal] = useState<boolean>(false);
  const [passwordVisibility, setPasswordVisibility] = useState<
    "password" | "text"
  >("password");

  const {
    register,
    formState: {errors, isValid, isDirty},
    handleSubmit,
    control
  } = useForm<EditUserFormData>({
    resolver: zodResolver(editUserSchema),
    mode: 'onChange'
  });

  const { data: userData, isFetching: gettingUser } = useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      return await UsersService.getUserById(userId);
    }
  });

  const { mutateAsync: editUser, isPending: editingUser } = useMutation({
    mutationFn: async (userData: UsersService.EditUserInput) => {
      await UsersService.editUser(userData);
    }
  });

  const toggleDeleteUserModal = useCallback(
    () => setDeleteUserModal((prev) => !prev),
    []
  );

  const togglePasswordVisibilityModal = useCallback(
    () => setPasswordVisibility((prev) => prev === "password" ? "text" : "password"),
    []
  );

  const onEdit = handleSubmit(async (data) => {
    try {
      await editUser({
        ...data,
        userId
      });
      toast.success("Usuário atualizado com sucesso !");
      queryClient.invalidateQueries({ queryKey: ['user', userId] });
      onClose();
    } catch (error) {
      toast.error('Erro ao editar o usuário');
    }
  });

  return {
    userData,
    gettingUser,
    toggleDeleteUserModal,
    deleteUserModal,
    onEdit,
    editingUser,
    register,
    errors,
    isValid,
    isDirty,
    togglePasswordVisibilityModal,
    passwordVisibility,
    control
  }
}
