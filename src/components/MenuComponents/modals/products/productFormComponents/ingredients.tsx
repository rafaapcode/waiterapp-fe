import { Checkbox } from "@/components/ui/checkbox";
import { IngredientsTypeFromAPI, IngredientTypeForFe } from "@/types/Ingredients";
import { apiclient } from "@/utils/apiClient";
import { useQuery } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useState } from "react";


interface IngredientsProps {
  onClick: () => void;
  selectedIngredients: Set<string>;
  ingredients: IngredientTypeForFe[];
  setIngredients: Dispatch<SetStateAction<IngredientTypeForFe[]>>
}

function Ingredients({ onClick, selectedIngredients, ingredients, setIngredients}: IngredientsProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const { isLoading, isFetching } = useQuery({
    queryKey: ["all_ingredients"],
    staleTime: Infinity,
    queryFn: async () => {
      try {
        const { data } = await apiclient.get("/ingredient");
        const ingredients = data.data as IngredientsTypeFromAPI[];
        const formatIngredient = ingredients.map((ingredient) => ({
          id: ingredient._id,
          name: ingredient.name,
          icon: ingredient.icon,
          selected: selectedIngredients.has(ingredient._id),
        }));
        setIngredients(formatIngredient);
      } catch (error: any) {
        console.log(error.message);
        setIngredients([]);
      }
    },
  });

  const toggleIngredient = (id: string) => {
    setIngredients(
      ingredients.map((ingredient) =>
        ingredient.id === id
          ? { ...ingredient, selected: !ingredient.selected }
          : ingredient
      )
    );
  };

  const filteredIngredients = ingredients.filter((ingredient) =>
    ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

      <div className="max-h-[400px] overflow-y-auto flex flex-col gap-1">
        {(isLoading || isFetching) && (
          <div className="w-full h-full p-4 flex flex-col gap-2">
            <div className="h-10 w-full bg-gray-300 rounded animate-pulse"></div>
            <div className="h-10 w-full bg-gray-300 rounded animate-pulse"></div>
            <div className="h-10 w-full bg-gray-300 rounded animate-pulse"></div>
          </div>
        )}
        {ingredients.length > 0 ? (
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
    </div>
  );
}

export default Ingredients;
