import Input from "@/components/atoms/Input";
import TextArea from "@/components/atoms/TextArea";
import { Select } from "@/components/molecule/Select";
import { LoaderCircle } from "lucide-react";
import { lazy, Suspense } from "react";
import { Controller } from "react-hook-form";
import RemoveProductModal from "../../../modals/products/removeProductModal/RemoveProductModal";
import IngredientModalSkeleton from "../../../skeletons/ingredients/IngredientModalSkeleton";
import RemoveProductModalSkeleton from "../../../skeletons/products/RemoveProductModalSkeleton";
import ImageUpload from "../../imageUpload";
import Ingredients from "../../ingredients";
import { useEditProductFormController } from "./useEditProductFormController";

const IngredientModal = lazy(
  () => import("../../../modals/ingredients/IngredientModal")
);

interface ProductFormProps {
  onClose: () => void;
  productid: string;
}

export default function EditProductForm({
  onClose,
  productid,
}: ProductFormProps) {
  const {
    handleIngredientModal,
    ingredientModal,
    errors,
    register,
    control,
    isValid,
    onSubmit,
    isPending,
    allIngredients,
    categories,
    fetchingCategories,
    selectedIngredients,
    toggleIngredients,
    fetchingIngredients,
    removeProductModal,
    toggleRemoveProductModal,
    orgId,
    isDirty,
  } = useEditProductFormController({
    onClose,
    productid,
  });

        // <div className="flex items-center space-x-2">
        //   <Switch
        //     id="promotion-mode"
        //     checked={product.discount}
        //     onCheckedChange={(checked) => setProduct(prev => ({...prev, discount: checked}))}
        //   />
        //   <label
        //     htmlFor="promotion-mode"
        //     className="flex items-center cursor-pointer"
        //   >
        //     <Tag className="h-4 w-4 mr-2 text-red-500" />
        //     Produto em promoção
        //   </label>
        // </div>
        // {product.discount && (
        //   <div className="pl-7 border-l-2 border-red-200">
        //     <label
        //       htmlFor="salePrice"
        //       className="block text-sm font-medium text-red-600"
        //     >
        //       Preço promocional (R$)
        //     </label>
        //    <input
        //         id="salePrice"
        //         value={product.priceInDiscount}
        //         onChange={(e) =>
        //           setProduct((prev) => ({
        //             ...prev,
        //             priceInDiscount: Number(e.target.value),
        //           }))
        //         }
        //         className="px-4 py-2 w-full border border-gray-200 rounded-md transition-all duration-200 outline-red-500 focus:outline-red-500"
        //         placeholder="Ex: 0,00"
        //       />
        //   </div>
        // )}

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
      {removeProductModal && (
        <Suspense
          fallback={
            <RemoveProductModalSkeleton isVisible={removeProductModal} />
          }
        >
          <RemoveProductModal
            orgId={orgId}
            data={{
              id: "data._id",
              imageUrl: "data.imageUrl",
              category: "data.category.name",
              name: "data.name",
              price: `${"data.price"}`,
            }}
            isVisible={removeProductModal}
            onClose={toggleRemoveProductModal}
            editModalClose={onClose}
          />
        </Suspense>
      )}
      <div className="space-y-4 pl-2">
        {/* Image Upload */}
        <Controller
          name="image"
          control={control}
          render={({ field: { value, onChange } }) => (
            <ImageUpload
              selectedImage={value ?? null}
              setSelectedImage={(file: File | null) =>
                onChange(file ?? undefined)
              }
            />
          )}
        />

        {/* Product Name */}
        <div>
          <Input
            placeholder="Nome do produto"
            error={errors.name?.message}
            {...register("name")}
          />
        </div>

        {/* Description */}
        <div>
          <TextArea
            placeholder="Descrição"
            error={errors.description?.message}
            {...register("description")}
          />
          <p className="text-xs text-gray-500 mt-1">Máximo 110 caracteres</p>
        </div>

        <div>
          <Input
            placeholder="Preço (R$)"
            error={errors.price?.message}
            type="number"
            {...register("price")}
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm mb-2">Categoria</label>
          {fetchingCategories && (
            <div className="animate-pulse bg-gray-200 h-[52px] rounded-md" />
          )}
          {categories && !fetchingCategories && (
            <Controller
              name="category"
              defaultValue=""
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select
                  value={value}
                  onChange={onChange}
                  error={errors.category?.message}
                  placeholder="Categoria"
                  options={categories.map((cats) => ({
                    label: `${cats.icon} - ${cats.name}`,
                    value: cats.id,
                  }))}
                />
              )}
            />
          )}
        </div>
      </div>

      {/* Ings */}
      <Ingredients
        allIngredients={allIngredients ?? []}
        fetchingIngredients={fetchingIngredients}
        onClickModal={handleIngredientModal}
        selectedIngredients={selectedIngredients}
        toggleIngredients={toggleIngredients}
      />

      <div className="col-span-2 flex justify-end">
        <button
          onClick={onSubmit}
          disabled={isPending || !isValid || !isDirty}
          type="button"
          className="bg-[#D73035] disabled:bg-[#CCCCCC] disabled:cursor-not-allowed rounded-[48px] border-none text-white py-3 px-6"
        >
          {isPending ? (
            <LoaderCircle size={26} className="animate-spin" />
          ) : (
            "Criar Produto"
          )}
        </button>
      </div>
    </div>
  );
}
