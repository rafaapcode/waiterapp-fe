import { useState } from 'react';

function Categories() {
  const [selectedCategory, setSelectedCategory] = useState("pizzas");
  const categories = [
    { id: "pizzas", name: "Pizzas", icon: "🍕" },
    { id: "lanches", name: "Lanches", icon: "🥪" },
    { id: "promocoes", name: "Promoções", icon: "🏷️" },
    { id: "bebidas", name: "Bebidas", icon: "🥤" },
    { id: "categoria1", name: "Categoria", icon: "📦" },
    { id: "categoria2", name: "Categoria", icon: "📦" },
    { id: "categoria3", name: "Categoria", icon: "📦" },
    { id: "categoria4", name: "Categoria", icon: "📦" },
    { id: "categoria5", name: "Categoria", icon: "📦" },
    { id: "categoria7", name: "Categoria", icon: "📦" },
  ];
  return (
    <div className="h-full">
          <label className="block text-sm font-medium mb-2">Categoria</label>
          <div className="flex flex-wrap w-full max-h-[200px] overflow-y-auto gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`max-w-36 px-6 py-1  rounded-3xl flex flex-col items-center justify-center text-xs ${
                  selectedCategory === category.id
                    ? "bg-orange-50 text-orange-500 border border-orange-200"
                    : "border bg-white"
                }`}
              >
                <span>{category.icon}</span>
                <span className="truncate w-full text-center">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
  )
}

export default Categories
