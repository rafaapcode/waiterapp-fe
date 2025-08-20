import { UsersService } from "@/services/api/users";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

interface UserNewUserModalControllerProps {
  onClose: () => void;
}

const createUserSchema = z.object({
  name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
  role: z.enum(["WAITER", "ADMIN"], {
    errorMap: () => ({ message: "Selecione uma função" }),
  }),
});

type CreateUserFormData = z.infer<typeof createUserSchema>;

export const useNewUserModalController = ({ onClose }: UserNewUserModalControllerProps) => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: {errors, isValid},
    control
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserSchema),
  });

  const { mutateAsync: createUser, isPending: creatingUser } = useMutation({
    mutationFn: async (data: UsersService.CreateUserInput) => {
      return await UsersService.createUser(data);
    }
  })


  const onSave = handleSubmit(async (data) => {
    try {
      createUser(data);
      toast.success("Usuário criado com sucesso !", {toastId: 'createUserSuccessId'});
      queryClient.invalidateQueries({ queryKey: ["all_users"] });
      onClose();
    } catch (error) {
      console.log('Error to create a user', error)
      toast.error('Erro ao criar usuário', {toastId: 'createUserErrorId'});
    }
  });

  return {
    onSave,
    creatingUser,
    register,
    errors,
    isValid,
    control
  }
}
