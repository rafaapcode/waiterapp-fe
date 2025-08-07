import { useAuth } from "@/hooks/useAuth";
import { MenuService } from "@/services/api/menu";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import z from "zod";

const createProductschema = z.object({
  image: z.instanceof(File).optional(),
  name: z.string().min(4, "O nome deve ter no mínimo 4 caracteres"),
  description: z
    .string()
    .min(10, "A descrição deve ter no mínimo 10 caracteres"),
  price: z.string(),
  category: z
    .string({ required_error: "Categoria é obrigatória" })
    .min(2, "A categoria é obrigatória"),
});

type CreateProductFormData = z.infer<typeof createProductschema>;

interface UseCreateProductFormControllerProps {
  onClose: () => void;
}

export const useCreateProductFormController = ({onClose}: UseCreateProductFormControllerProps) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [ingredientModal, setIngredienteModal] = useState<boolean>(false);

  const handleIngredientModal = useCallback(
    () => setIngredienteModal((prev) => !prev),
    []
  );
  const [selectedIngredients, setIngredients] = useState<string[]>([]);

  const { data: allCategories, isFetching: fetchingCategories } = useQuery({
    queryKey: ["get", "categories", user.orgId],
    queryFn: async () => await MenuService.getAllCategories(user.orgId),
  });

  const { data: allIngredients, isFetching: fetchingIngredients } = useQuery({
    queryKey: ["get", "allingredients"],
    queryFn: async () => {
      const ings = await MenuService.getAllIngredients();
      return ings;
    },
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<CreateProductFormData>({
    resolver: zodResolver(createProductschema),
    mode: "onChange",
  });

  const { mutateAsync: createProductMutation, isPending } = useMutation({
    mutationFn: async (data: MenuService.CreateProductInput) =>
      await MenuService.createProduct(data),
  });

  const toggleIngredients = (ingredientId: string) => {
    setIngredients(prev => {
      const ingredientExistsIndex = prev.findIndex(ing => ing === ingredientId);
      if(ingredientExistsIndex === -1) {
        return [...prev, ingredientId];
      }
      const oldIngredients = [...prev];
      oldIngredients.splice(ingredientExistsIndex, 1);
      return oldIngredients;
    });
  }

  const onCreate = async (data: CreateProductFormData) => {
    try {
      await createProductMutation({
        ...data,
        price: Number(data.price),
        image: data.image ?? null,
        org: user.orgId,
        userId: user.id,
        imageUrl: "",
        ingredients: selectedIngredients
      });
      toast.success("Produto criado com sucesso !", {toastId: 'produtoCriadoSucessoId'});
      queryClient.invalidateQueries({ queryKey: ["list_all_products"] });
      onClose();
    } catch (error) {
      toast.error("Erro ao criar o produto !", {toastId: 'produtoCriadoErroId'});
    }
  };

  const onSubmit = handleSubmit(onCreate);

  return {
    onSubmit,
    ingredientModal,
    handleIngredientModal,
    register,
    errors,
    isValid,
    control,
    isPending,
    categories: allCategories,
    fetchingCategories,
    allIngredients,
    fetchingIngredients,
    orgId: user.orgId,
    userId: user.id,
    selectedIngredients,
    toggleIngredients,
  };
};
