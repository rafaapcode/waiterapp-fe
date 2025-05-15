import { IngredientTypeForFe } from "@/types/Ingredients";
import { apiclient } from "@/utils/apiClient";
import { useQuery } from "@tanstack/react-query";
import { ChangeEvent, lazy, Suspense, useCallback, useState } from "react";
import { toast } from "react-toastify";
import IngredientModalSkeleton from "../ingredientsModal/IngredientModalSkeleton";
import ImageUpload from "../productFormComponents/imageUpload";
import Ingredients from "../productFormComponents/ingredients";

const IngredientModal = lazy(
  () => import("../ingredientsModal/IngredientModal")
);

interface ProductEditFormStateType {
  name: string;
  description: string;
  imageUrl?: string;
  discount: boolean;
  priceInDiscount: number;
}

interface EditProductFormProps {
  productId: string;
  onClose: () => void;
}

export default function EditProductForm({ productId, onClose }: EditProductFormProps) {
  const [product, setProduct] = useState<ProductEditFormStateType>({description: "", name: "", imageUrl: "", discount: false, priceInDiscount: 0});
  const [ingredientModal, setIngredienteModal] = useState<boolean>(false);
  const [ingredients, setIngredients] = useState<IngredientTypeForFe[]>([]);
  const [usedIngredients, setUsedIngredients] = useState<Set<string>>(new Set());
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleIngredientModal = useCallback(
    () => setIngredienteModal((prev) => !prev),
    []
  );

  const handleProductInfo = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]:value
    }))
  }

  useQuery({
    queryKey: ["get_product_info_edit_form", {productId}],
    queryFn: async () => {
      try {
        const { data } = await apiclient.get(`/product/${productId}`);
        setProduct({
          name: data.name,
          description: data.description,
          imageUrl: data.imageUrl,
          discount: false,
          priceInDiscount: 0
        })
        if(data.ingredients && data.ingredients.length > 0) {
          setUsedIngredients(new Set(data.ingredients.map((i: any) => i._id)));
        }
      } catch (error: any) {
        console.log(error.message);
        toast.error('Erro ao buscar o Produto');
        onClose();
      }
    }
  })

  return (
    <div className="grid grid-cols-2 gap-6 w-full max-h-full">
      {ingredientModal && (
        <Suspense
          fallback={<IngredientModalSkeleton isVisible={ingredientModal} />}
        >
          <IngredientModal
            isVisible={ingredientModal}
            onClose={handleIngredientModal}
          />
        </Suspense>
      )}
      <div className="space-y-6 pl-2">
        {/* Image Upload */}
        <ImageUpload selectedImage={selectedImage} setSelectedImage={setSelectedImage} imageurl={product.imageUrl}/>

        {/* Product Name */}
        <div>
          <label
            htmlFor="productName"
            className="block text-sm font-medium mb-1"
          >
            Nome do Produto
          </label>
          <input
            id="productName"
            type="text"
            name="name"
            value={product.name}
            onChange={handleProductInfo}
            className="p-4 w-full border border-gray-200 rounded-md transition-all duration-200 outline-red-500 focus:outline-red-500"
            placeholder="Ex: Pizza de Mussarela"
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium mb-1"
          >
            Descrição
          </label>
          <textarea
            rows={3}
            maxLength={110}
            id="description"
            value={product.description}
            onChange={handleProductInfo}
            className="w-full resize-none border border-gray-200 rounded-md px-2 py-1 transition-all duration-200 outline-red-500 focus:outline-red-500"
            placeholder="Ex: Pizza de Quatro Queijos com borda tradicional"
          />
          <p className="text-xs text-gray-500 mt-1">Máximo 110 caracteres</p>
        </div>
      </div>

      <Ingredients ingredients={ingredients} setIngredients={setIngredients} ingredientUsed={usedIngredients} onClick={handleIngredientModal} />
    </div>
  );
}
