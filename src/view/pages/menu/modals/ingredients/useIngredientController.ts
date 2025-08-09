import { MenuService } from "@/services/api/menu";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import z from "zod";

interface UseIngredienttControllerProps {
  onClose: () => void;
}

const formCreateIngredientSchema = z.object({
  icon: z
    .string({ message: "O ícone é obrigatório" })
    .emoji("O ícone é obrigatório"),
  name: z
    .string()
    .min(4, { message: "O nome deve ter no mínimo 4 caracteres" })
    .max(50, { message: "O nome deve ter no máximo 50 caracteres" }),
});

type FormCreateIngredientType = z.infer<typeof formCreateIngredientSchema>;
export const useIngredientController = ({
  onClose,
}: UseIngredienttControllerProps) => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormCreateIngredientType>({
    resolver: zodResolver(formCreateIngredientSchema),
    mode: "onChange",
  });

  const { mutateAsync: createIngredient, isPending } = useMutation({
    mutationFn: async (data: MenuService.CreateIngredientInput) => {
      await MenuService.createIngredient(data);
    },
  });

  const onSave = async (data: FormCreateIngredientType) => {
    try {
      await createIngredient({
        icon: data.icon ?? "🥗",
        name: data.name,
      });
      toast.success("Categoria criada com Sucesso !", {
        toastId: "ingredientCriadoSucessoId",
      });
      queryClient.invalidateQueries({
         queryKey: ["get", "allingredients"],
      });
      onClose();
    } catch (error) {
      toast.error("Erro ao criar a categoria", {
        toastId: "ingredientCriadoErroId",
      });
    }
  };

  const onSubmit = handleSubmit(onSave);

  return {
    onSubmit,
    register,
    errors,
    isValid,
    isPending,
  };
};
