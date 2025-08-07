import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

interface IngredientsProps {
  onClickModal: () => void;
  toggleIngredients: (ingid: string) => void;
  allIngredients: {
    id: string;
    name: string;
    icon: string;
    selected?: boolean;
  }[];
  fetchingIngredients: boolean;
  selectedIngredients: string[];
}

function Ingredients({
  allIngredients,
  fetchingIngredients,
  onClickModal,
  toggleIngredients,
  selectedIngredients
}: IngredientsProps) {
  const [searchIngredient, setSearchIngredients] = useState("");

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-lg text-[#666666]">Ingredientes</h2>
        <button
          onClick={onClickModal}
          className="text-red-500 text-sm font-semibold"
        >
          Novo Ingrediente
        </button>
      </div>

      <div className="my-6">
        <label htmlFor="ingredientSearch">Busque o ingrediente</label>
        <div className="mt-2 relative">
          <input
            id="ingredientSearch"
            type="text"
            value={searchIngredient}
            onChange={(e: any) => setSearchIngredients(e.target.value)}
            className="p-4 w-full border border-gray-200 rounded-md transition-all duration-200 outline-red-500 focus:outline-red-500"
            placeholder="Ex: Mussarela"
          />
        </div>
      </div>
      <div className="max-h-[500px] overflow-y-auto flex flex-col gap-1">
        {fetchingIngredients && (
          <div className="w-full h-full p-4 flex flex-col gap-2">
            <div className="h-10 w-full bg-gray-300 rounded animate-pulse"></div>
            <div className="h-10 w-full bg-gray-300 rounded animate-pulse"></div>
            <div className="h-10 w-full bg-gray-300 rounded animate-pulse"></div>
          </div>
        )}
        {!fetchingIngredients &&
          allIngredients &&
          allIngredients
            .filter((ing) => ing.name.toLowerCase().includes(searchIngredient.toLowerCase()))
            .map((ing) => (
              <div
                key={ing.id}
                className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-100 transition-all duration-200"
                onClick={() => toggleIngredients(ing.id)}
              >
                <div className="flex items-center">
                  <span className="mr-2">{ing.icon || "🍽️"}</span>
                  <span>{ing.name}</span>
                </div>
                <Checkbox
                  checked={
                    selectedIngredients.find((i) => i === ing.id) ? true : false
                  }
                  className="h-5 w-5 border-gray-300 rounded-md"
                  id={ing.id}
                />
              </div>
            ))}
      </div>
    </div>
  );
}

export default Ingredients;
