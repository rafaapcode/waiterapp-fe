import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { lazy, Suspense, useCallback, useState } from "react";
import IngredientModalSkeleton from "./ingredientsModal/IngredientModalSkeleton";
import Categories from "./productFormComponents/categories";
import ImageUpload from "./productFormComponents/imageUpload";
import Ingredients from "./productFormComponents/ingredients";

const IngredientModal = lazy(
  () => import("./ingredientsModal/IngredientModal")
);

export default function ProductForm() {
  const [productName, setProductName] = useState("Quatro Queijos");
  const [description, setDescription] = useState(
    "Pizza de Quatro Queijos com borda tradicional"
  );
  const [ingredientModal, setIngredienteModal] = useState<boolean>(false);

  const handleIngredientModal = useCallback(
    () => setIngredienteModal((prev) => !prev),
    []
  );

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
        <ImageUpload />

        {/* Product Name */}
        <div>
          <label
            htmlFor="productName"
            className="block text-sm font-medium mb-1"
          >
            Nome do Produto
          </label>
          <Input
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full"
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
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full resize-none"
            maxLength={110}
            rows={3}
          />
          <p className="text-xs text-gray-500 mt-1">Máximo 110 caracteres</p>
        </div>

        {/* Category */}
        <Categories />
      </div>

      <Ingredients onClick={handleIngredientModal} />
    </div>
  );
}
