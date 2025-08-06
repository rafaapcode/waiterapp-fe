import Input from "@/components/atoms/Input";
import TextArea from "@/components/atoms/TextArea";
import { Select } from "@/components/molecule/Select";
import { LoaderCircle } from "lucide-react";
import { lazy, Suspense } from "react";
import { Controller } from "react-hook-form";
import IngredientModalSkeleton from "../../../skeletons/ingredients/IngredientModalSkeleton";
import ImageUpload from "../../imageUpload";
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
    allIngredients,
    categories,
    fetchingCategories,
  } = useCreateProductFormController();
  console.log(allIngredients);
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
      {/* {allIngredients?.map((ing, index) => (
        <div
          key={ing.id}
          className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-100 transition-all duration-200"
          // onClick={() => toggleIngredient(ingredient.id)}
        >
          <div className="flex items-center">
            <span className="mr-2">{ing.icon || "🍽️"}</span>
            <span>{ing.name}</span>
          </div>
          <Checkbox
            checked={ing.selected}
            // onCheckedChange={() => toggleIngredient(ingredient.id)}
            className="h-5 w-5 border-gray-300 rounded-md"
            id={ing.id}
          />
        </div>
      ))} */}

      {/* <Controller
        name="ingredients"
        control={control}
        render={({ field: { onChange } }) => (
          <Ingredients
            onClick={handleIngredientModal}
            setIngredients={(ings) => onChange(ings)}
          />
        )}
      /> */}
      {/* <Ingredients
        onClick={handleIngredientModal}
        setIngredients={(ings) => console.log(ings)}
      /> */}

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
