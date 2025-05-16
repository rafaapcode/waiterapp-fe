import { Products } from "@/types/Products";
import { Dispatch, lazy, Suspense, useCallback, useState } from "react";
import { ProductFieldsChanged } from "../EditProductModal";
import IngredientModalSkeleton from "../ingredientsModal/IngredientModalSkeleton";
import ImageUpload from "../productFormComponents/imageUpload";
import { default as Ingredients } from "../productFormComponents/ingredients";

const IngredientModal = lazy(
  () => import("../ingredientsModal/IngredientModal")
);


interface EditProductFormProps {
  data: Products;
  setProduct: Dispatch<React.SetStateAction<ProductFieldsChanged | undefined
  >>
  imageSelected: File | null;
}

export default function EditProductForm({ data, setProduct, imageSelected }: EditProductFormProps) {
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
        <ImageUpload
          selectedImage={imageSelected}
          setSelectedImage={(file: File | null) => setProduct(prev => (prev && {...prev, image: file}))}
          imageurl={data.imageUrl}
        />

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
            value={data.name}
            onChange={(e) => setProduct(prev => (prev && {...prev, name: e.target.value}))}
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
            value={data.description}
            onChange={(e) => setProduct(prev => (prev && {...prev, description: e.target.value}))}
            className="w-full resize-none border border-gray-200 rounded-md px-2 py-1 transition-all duration-200 outline-red-500 focus:outline-red-500"
            placeholder="Ex: Pizza de Quatro Queijos com borda tradicional"
          />
          <p className="text-xs text-gray-500 mt-1">Máximo 110 caracteres</p>
        </div>
      </div>

      <Ingredients
        ingredients={data.ingredients.map(ing => ({id: ing._id,icon: ing.icon, name: ing.name, selected: false}))}
        setIngredients={(ings) => setProduct(prev => (prev && {...prev, ingredients: ings}))}
        ingredientUsed={new Set(data.ingredients.map(ing => ing._id))}
        onClick={handleIngredientModal}
      />
    </div>
  );
}
