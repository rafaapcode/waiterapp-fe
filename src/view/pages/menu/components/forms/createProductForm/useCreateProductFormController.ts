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
  name: z.string().min(4, 'O nome deve ter no mínimo 4 caracteres'),
  description: z.string().min(10, 'A descrição deve ter no mínimo 10 caracteres'),
  price: z.string().regex(/\D+/g, 'O preço deve ser um número válido'),
  category: z.string({required_error: 'Categoria é obrigatória'}).min(2, 'A categoria é obrigatória'),
  ingredients: z.string().array(),
});

type CreateProductFormData = z.infer<typeof createProductschema>;

export const useCreateProductFormController = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [ingredientModal, setIngredienteModal] = useState<boolean>(false);

  const handleIngredientModal = useCallback(
    () => setIngredienteModal((prev) => !prev),
    []
  );

  const { data: allCategories, isFetching } = useQuery({
    queryKey: ["get", "categories", user.orgId],
    queryFn: async () => await MenuService.getAllCategories(user.orgId),
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

  const onCreate = async (data: CreateProductFormData) => {
    try {
      // await createProductMutation({
      //   ...data,
      //   price: Number(data.price),
      //   image: data.image ?? null,
      //   org: user.orgId,
      //   userId: user.id,
      //   imageUrl: "",
      // });
      console.log(data);
      toast.success("Produto criado com sucesso !");
      queryClient.invalidateQueries({ queryKey: ["list_all_products"] });
    } catch (error) {
      toast.error("Erro ao criar o produto !");
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
    fetchingCategories: isFetching,
    orgId: user.orgId,
    userId: user.id
  };
};
