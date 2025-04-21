import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';

interface Ingredient {
  id: string;
  name: string;
  selected: boolean;
  icon: string;
}

interface IngredientsProps {
  onClick: () => void;
}

function Ingredients({onClick}:IngredientsProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { id: "1", name: "Prato", selected: true, icon: "🧀" },
    { id: "2", name: "Cheddar", selected: true, icon: "🧀" },
    { id: "3", name: "Mussarela", selected: true, icon: "🧀" },
    { id: "4", name: "Parmesão", selected: true, icon: "🧀" },
    { id: "5", name: "Cebola", selected: true, icon: "🥬" },
    { id: "6", name: "Rúcula", selected: false, icon: "🥬" },
    { id: "7", name: "Tomate", selected: false, icon: "🥬" },
    { id: "15", name: "Cebola", selected: true, icon: "🥬" },
    { id: "16", name: "Rúcula", selected: false, icon: "🥬" },
    { id: "27", name: "Tomate", selected: false, icon: "🥬" },
  ]);

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
          <button onClick={onClick} className="text-red-500 text-sm font-semibold">
            Novo Ingrediente
          </button>
        </div>

        <div className="my-6">
          <label htmlFor="ingredientSearch">Busque o ingrediente</label>
          <div className="mt-2 relative">
            <input
              id='ingredientSearch'
              type="text"
              value={searchTerm}
              onChange={(e: any) => setSearchTerm(e.target.value)}
              className="p-4 w-full border border-gray-200 rounded-md transition-all duration-200 outline-red-500 focus:outline-red-500"
              placeholder="Ex: Mussarela"
            />
          </div>
        </div>

        <div className="max-h-[400px] overflow-y-auto flex flex-col gap-1">
          {filteredIngredients.map((ingredient) => (
            <div
              key={ingredient.id}
              className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-100 transition-all duration-200"
              onClick={() => toggleIngredient(ingredient.id)}
            >
              <div className="flex items-center">
                <span className="mr-2">
                  {ingredient.icon || "🍽️"}
                </span>
                <span>{ingredient.name}</span>
              </div>
              <Checkbox
                checked={ingredient.selected}
                onCheckedChange={() => toggleIngredient(ingredient.id)}
                className="h-5 w-5 border-gray-300 rounded-md"
                id={ingredient.id}
              />
            </div>
          ))}
        </div>
      </div>
  )
}

export default Ingredients
