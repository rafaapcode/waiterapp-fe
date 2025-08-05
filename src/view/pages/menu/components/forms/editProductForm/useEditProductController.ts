import { MenuService } from "@/services/api/menu";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const editProductschema = z.object({
  image: z.instanceof(File).optional(),
  name: z.string(),
  description: z.string(),
  price: z.number().positive('O preço deve ser possível'),
  discount: z.boolean(),
  priceInDiscount: z.number().positive('O preço deve ser possível')
});

type EditProductFormData = z.infer<typeof editProductschema>;

interface UseEditProductControllerProps {
  onClose: () => void;
}

export const useEditProductController = ({onClose}: UseEditProductControllerProps) => {
  const queryClient = useQueryClient();
  const [ingredientModal, setIngredienteModal] = useState<boolean>(false);

  const handleIngredientModal = useCallback(
    () => setIngredienteModal((prev) => !prev),
    []
  );

  const {
    register,
    handleSubmit,
    formState: {errors, isValid, isDirty},
  } = useForm<EditProductFormData>({
    resolver: zodResolver(editProductschema),
    mode: 'onChange'
  });

  const { mutateAsync: editProductMutation, isPending } = useMutation({
    mutationFn: async (data: MenuService.EditProductInput) => {
      await MenuService.editProduct(data);
    }
  });

  const onSave = async (data: EditProductFormData) => {
    try {
      await editProductMutation(data);
      toast.success("Produto atualizado com sucesso !");
      queryClient.invalidateQueries({ queryKey: ["list_all_products"] });
      queryClient.invalidateQueries({
        queryKey: ["history_orders", { page: 1 }],
      });
      onClose();
    } catch (error) {
      toast.error('Erro ao editar o produto');
    }
  };

  const onSubmit = handleSubmit(onSave);

  return {
    register,
    errors,
    isValid,
    isDirty,
    onSubmit,
    handleIngredientModal,
    ingredientModal,
    isPending
  }
};
