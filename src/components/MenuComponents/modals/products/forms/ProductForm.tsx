import {
  Dispatch,
  lazy,
  SetStateAction,
  Suspense,
  useCallback,
  useState,
} from "react";
import IngredientModalSkeleton from "../ingredientsModal/IngredientModalSkeleton";
import { NewProductData } from "../NewProductModal";
import Categories from "../productFormComponents/categories";
import ImageUpload from "../productFormComponents/imageUpload";
import Ingredients from "../productFormComponents/ingredients";

const IngredientModal = lazy(
  () => import("../ingredientsModal/IngredientModal")
);

interface ProductFormProp {
  product: NewProductData;
  setProduct: Dispatch<SetStateAction<NewProductData>>;
  orgId: string;
}

export default function ProductForm({ product, setProduct, orgId }: ProductFormProp) {
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
      <div className="space-y-4 pl-2">
        {/* Image Upload */}
        <ImageUpload
          selectedImage={product.image}
          setSelectedImage={(file: File | null) =>
            setProduct((prev) => ({ ...prev, image: file }))
          }
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
            value={product.name}
            onChange={(e) =>
              setProduct((prev) => ({ ...prev, name: e.target.value }))
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
              setProduct((prev) => ({ ...prev, description: e.target.value }))
            }
            className="w-full resize-none border border-gray-200 rounded-md px-2 py-1 transition-all duration-200 outline-red-500 focus:outline-red-500"
            placeholder="Ex: Pizza de Quatro Queijos com borda tradicional"
          />
          <p className="text-xs text-gray-500 mt-1">Máximo 110 caracteres</p>
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium mb-1">
            Preço (R$)
          </label>
          <input
            id="price"
            type="number"
            name="price"
            value={product.price}
            onChange={(e) =>
              setProduct(
                (prev) => prev && { ...prev, price: Number(e.target.value) }
              )
            }
            className="px-4 py-2 w-full border border-gray-200 rounded-md transition-all duration-200 outline-red-500 focus:outline-red-500"
            placeholder="Ex: 120"
          />
        </div>

        {/* Category */}
        <Categories
          orgId={orgId}
          selectedCategory={product.category}
          setSelectedCategory={(category) =>
            setProduct((prev) => ({ ...prev, category }))
          }
        />
      </div>
      <Ingredients
        onClick={handleIngredientModal}
        setIngredients={(ings) =>
          setProduct((prev) => ({ ...prev, ingredients: ings }))
        }
      />
    </div>
  );
}
