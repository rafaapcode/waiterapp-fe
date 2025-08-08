import { useAuth } from "@/hooks/useAuth";
import { MenuService } from "@/services/api/menu";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import z from "zod";

const editProductschema = z.object({
  image: z.instanceof(File).optional(),
  name: z.string().min(4, "O nome deve ter no mínimo 4 caracteres").optional(),
  description: z
    .string()
    .min(10, "A descrição deve ter no mínimo 10 caracteres").optional(),
  price: z.string().optional(),
  category: z
    .string({ required_error: "Categoria é obrigatória" })
    .min(2, "A categoria é obrigatória").optional(),
  discount: z
    .boolean().optional(),
  priceInDiscount: z.string().optional()
});

type EditProductFormData = z.infer<typeof editProductschema>;

interface UseEditProductFormControllerProps {
  onClose: () => void;
  productid: string;
}

export const useEditProductFormController = ({
  onClose,
  productid,
}: UseEditProductFormControllerProps) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [ingredientModal, setIngredienteModal] = useState<boolean>(false);
  const [removeProductModal, setRemoveProductModal] = useState<boolean>(false);

  const toggleRemoveProductModal = useCallback(
    () => setRemoveProductModal((prev) => !prev),
    []
  );

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
    formState: { errors, isValid, isDirty, dirtyFields},
    getValues
  } = useForm<EditProductFormData>({
    resolver: zodResolver(editProductschema),
    mode: "onChange",
    defaultValues: async () => {
      const product = await MenuService.getInfoProduct({
        orgId: user.orgId,
        productId: productid,
      });
      setIngredients(product?.ingredients.map(ing => ing._id) || [])
      return {
        category: product?.category._id ?? '',
        description: product?.description ?? '',
        name: product?.name ?? '',
        price: `${product?.price ?? '0'}`,
        discount: product?.discount,
        priceInDiscount: `${product?.priceInDiscount ?? '0'}`
      };
    },
  });

  const { mutateAsync: editProductMutation, isPending } = useMutation({
    mutationFn: async (data: MenuService.CreateProductInput) =>
      await MenuService.editProduct({
        userId: user.id,
        org: user.orgId,
        productId: productid
      }),
  });

  const toggleIngredients = (ingredientId: string) => {
    setIngredients((prev) => {
      const ingredientExistsIndex = prev.findIndex(
        (ing) => ing === ingredientId
      );
      if (ingredientExistsIndex === -1) {
        return [...prev, ingredientId];
      }
      const oldIngredients = [...prev];
      oldIngredients.splice(ingredientExistsIndex, 1);
      return oldIngredients;
    });
  };

  const onEdit = async (data: EditProductFormData) => {
    try {
      const keysDirtiedFields = Object.keys(dirtyFields);
      const changedFields = Object.keys(data).reduce((acc, curr) => {
        if(keysDirtiedFields.includes(curr)) {
          const key = curr as keyof EditProductFormData;
          acc[key] = data[key];
        }

        return acc;
      }, {} as Record<string, any>);
      // await editProductMutation({
      //   ...data,
      //   price: Number(data.price),
      //   image: data.image ?? null,
      //   org: user.orgId,
      //   userId: user.id,
      //   imageUrl: "",
      //   ingredients: selectedIngredients,
      // });
      console.log(changedFields);
      toast.success("Produto editado com sucesso com sucesso !", {toastId: 'produtoEditadoSucessoId'});
      queryClient.invalidateQueries({ queryKey: ["list_all_products"] });
      onClose();
    } catch (error) {
      toast.error("Erro ao editar o produto !", {toastId: 'produtoEditadoErroId'});
    }
  };

  const onSubmit = handleSubmit(onEdit);

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
    removeProductModal,
    toggleRemoveProductModal,
    isDirty,
    discount: getValues().discount
  };
};
