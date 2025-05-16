import { Dispatch, lazy, Suspense, useCallback, useState } from "react";
import { ProductFieldsChanged } from "../EditProductModal";
import IngredientModalSkeleton from "../ingredientsModal/IngredientModalSkeleton";
import ImageUpload from "../productFormComponents/imageUpload";
import { default as Ingredients } from "../productFormComponents/ingredients";

const IngredientModal = lazy(
  () => import("../ingredientsModal/IngredientModal")
);

interface EditProductFormProps {
  product: ProductFieldsChanged;
  setProduct: Dispatch<React.SetStateAction<ProductFieldsChanged>>;
}

export default function EditProductForm({
  product,
  setProduct,
}: EditProductFormProps) {
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
          selectedImage={product.image}
          setSelectedImage={(file: File | null) =>
            setProduct((prev) => ({ ...prev, image: file }))
          }
          imageurl={product.imageUrl}
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
            value={product.name}
            onChange={(e) =>
              setProduct((prev) => prev && { ...prev, name: e.target.value })
            }
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
            onChange={(e) =>
              setProduct(
                (prev) => prev && { ...prev, description: e.target.value }
              )
            }
            className="w-full resize-none border border-gray-200 rounded-md px-2 py-1 transition-all duration-200 outline-red-500 focus:outline-red-500"
            placeholder="Ex: Pizza de Quatro Queijos com borda tradicional"
          />
          <p className="text-xs text-gray-500 mt-1">Máximo 110 caracteres</p>
        </div>
      </div>

      <Ingredients
          setIngredients={(ings) => setProduct((prev) => prev && { ...prev, newIngredients: ings })}
          ingredientUsed={product.ingredients}
          onClick={handleIngredientModal}
        />
    </div>
  );
}
