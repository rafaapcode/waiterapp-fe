import Input from "@/components/atoms/Input";
import TextArea from "@/components/atoms/TextArea";
import { Select } from "@/components/molecule/Select";
import { LoaderCircle } from "lucide-react";
import { lazy, Suspense } from "react";
import { Controller } from "react-hook-form";
import IngredientModalSkeleton from "../../../skeletons/ingredients/IngredientModalSkeleton";
import ImageUpload from "../../imageUpload";
import Ingredients from "../../ingredients";
import { useCreateProductFormController } from "./useCreateProductFormController";

const IngredientModal = lazy(
  () => import("../../../modals/ingredients/IngredientModal")
);

export default function ProductForm() {
  const {
    handleIngredientModal,
    ingredientModal,
    errors,
    register,
    control,
    isValid,
    onSubmit,
    isPending,
    orgId,
    categories,
    fetchingCategories,
  } = useCreateProductFormController();

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
          {categories && (
            <Controller
              name="category"
              defaultValue=""
              control={control}
              render={({ field: { onChange, value } }) => {
                return (
                  <Select
                    value={value}
                    onChange={(cat) => console.log(cat)}
                    error={errors.category?.message}
                    placeholder="Categoria"
                    options={categories.map((cats) => ({
                      label: `${cats.icon} - ${cats.name}`,
                      value: cats._id,
                    }))}
                  />
                );
              }}
            />
          )}
        </div>
      </div>

      <Controller
        name="ingredients"
        control={control}
        render={({ field: { onChange } }) => (
          <Ingredients
            onClick={handleIngredientModal}
            setIngredients={(ings) => onChange(ings)}
          />
        )}
      />

      <div className="col-span-2 flex justify-end">
        <button
          onClick={onSubmit}
          disabled={isPending || !isValid}
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
