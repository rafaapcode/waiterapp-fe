import { Checkbox } from "@/components/ui/checkbox";
import { MenuService } from "@/services/api/menu";
import {
  IngredientTypeForFe
} from "@/types/Ingredients";
import { useEffect, useState } from "react";

interface IngredientsProps {
  onClick: () => void;
  ingredientUsed?: string[];
  setIngredients: (ing: string[]) => void;
}

function Ingredients({
  onClick,
  ingredientUsed,
  setIngredients,
}: IngredientsProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [listedIngredients, setListedIngredients] = useState<
    IngredientTypeForFe[]
  >([]);

  const { isLoading, isFetching } = MenuService.getAllIngredients(ingredientUsed, (data) => setListedIngredients(data));

  const toggleIngredient = (id: string) => {
    setListedIngredients(
      listedIngredients.map((ingredient) =>
        ingredient.id === id
          ? { ...ingredient, selected: !ingredient.selected }
          : ingredient
      )
    );
  };

  const filteredIngredients = listedIngredients.filter((ingredient) =>
    ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (listedIngredients.length > 0) {
      const selectedIngredientsIds = listedIngredients
        .filter((ing) => ing.selected)
        .map((ings) => ings.id);
      setIngredients(selectedIngredientsIds);
    }
  }, [listedIngredients]);

  useEffect(() => {
    if (ingredientUsed && ingredientUsed.length > 0) {
      const updatedIngredients = listedIngredients.map((ingredient) => ({
        ...ingredient,
        selected: ingredientUsed.includes(ingredient.id),
      }));
      setListedIngredients(updatedIngredients);
    }
  }, [ingredientUsed]);

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-lg text-[#666666]">Ingredientes</h2>
        <button
          onClick={onClick}
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
            value={searchTerm}
            onChange={(e: any) => setSearchTerm(e.target.value)}
            className="p-4 w-full border border-gray-200 rounded-md transition-all duration-200 outline-red-500 focus:outline-red-500"
            placeholder="Ex: Mussarela"
          />
        </div>
      </div>

      <div className="max-h-[350px] overflow-y-auto flex flex-col gap-1">
        {(isLoading || isFetching) && (
          <div className="w-full h-full p-4 flex flex-col gap-2">
            <div className="h-10 w-full bg-gray-300 rounded animate-pulse"></div>
            <div className="h-10 w-full bg-gray-300 rounded animate-pulse"></div>
            <div className="h-10 w-full bg-gray-300 rounded animate-pulse"></div>
          </div>
        )}
        {listedIngredients.length > 0 ? (
          filteredIngredients.map((ingredient) => (
            <div
              key={ingredient.id}
              className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-100 transition-all duration-200"
              onClick={() => toggleIngredient(ingredient.id)}
            >
              <div className="flex items-center">
                <span className="mr-2">{ingredient.icon || "🍽️"}</span>
                <span>{ingredient.name}</span>
              </div>
              <Checkbox
                checked={ingredient.selected}
                onCheckedChange={() => toggleIngredient(ingredient.id)}
                className="h-5 w-5 border-gray-300 rounded-md"
                id={ingredient.id}
              />
            </div>
          ))
        ) : (
          <div>
            <p>Nenhum ingrediente encontrado !</p>
          </div>
        )}
      </div>
      <div className="mt-6 grid grid-cols-4 gap-y-2 gap-x-2 max-w-full max-h-[150px] overflow-y-auto pb-1">
        {listedIngredients.filter(ing => ing.selected).map((ingredient) => (
          <div
            key={ingredient.id}
            className="group px-4 py-1 rounded-xl flex gap-2 items-center justify-center text-xs bg-gray-100 transition-all duration-200 relative"
          >
            <button  onClick={() => toggleIngredient(ingredient.id)} className="hidden text-white text-sm group-hover:flex group-hover:items-center group-hover:justify-center w-full h-full absolute bg-black/70 rounded-xl transition-all duration-200">
              <p>Excluir</p>
            </button>
            <span className="text-xs">{ingredient.icon}</span>
            <span className="truncate w-full text-xs text-center">
              {ingredient.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Ingredients;
