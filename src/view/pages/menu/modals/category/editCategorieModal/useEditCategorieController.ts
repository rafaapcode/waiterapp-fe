import { MenuService } from "@/services/api/menu";
import { Categorie } from "@/types/Categorie";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

interface UseEditCategorieControllerProps {
  data: Categorie;
  isVisible: boolean;
  onClose: () => void;
  orgId: string;
}

const formEditCategorieSchema = z.object({
  icon: z
    .string({ message: "O ícone é obrigatório" }).emoji("O ícone é obrigatório"),
  name: z
    .string()
    .min(4, { message: "O nome deve ter no mínimo 4 caracteres" })
    .max(50, { message: "O nome deve ter no máximo 50 caracteres" }),
});

type FormEditCategorieType = z.infer<typeof formEditCategorieSchema>;

export const useEditCategorieController = ({
  data,
  onClose,
  orgId,
}: UseEditCategorieControllerProps) => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormEditCategorieType>({
    resolver: zodResolver(formEditCategorieSchema),
    defaultValues: {
      icon: data.icon,
      name: data.name,
    },
    mode: "onBlur",
  });
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const handleDeleteModal = useCallback(
    () => setDeleteModal((prev) => !prev),
    []
  );

  const { mutateAsync: editCategorie, isPending } = useMutation({
    mutationFn: async (data: MenuService.EditCategorieInput) => {
      await MenuService.editCategorie(data);
    },
  });

  const onSave = async (formData: FormEditCategorieType) => {
    try {
      await editCategorie({
        id: data._id,
        icon: formData.icon || "🥗",
        name: formData.name,
        org: orgId,
      });
      toast.success("Categoria editada com Sucesso !", {
        toastId: "categoriaEditadaSucessoId",
      });
      queryClient.invalidateQueries({ queryKey: ["all_categories"] });
      onClose();
    } catch (error) {
      toast.error("Erro ao editar a categoria !", {
        toastId: "categoriaEditadaErroId",
      });
    }
  };

  const onSubmit = handleSubmit(onSave);

  return {
    isPending,
    deleteModal,
    handleDeleteModal,
    register,
    errors,
    onSubmit,
    isValid,
  };
};
