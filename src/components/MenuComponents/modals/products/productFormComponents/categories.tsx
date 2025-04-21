import { useState } from "react";

function Categories() {
  const [selectedCategory, setSelectedCategory] = useState<string[]>([
    "pizzas",
  ]);
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

  const toggleCategory = (id: string) => {
    if (selectedCategory.length === 3) {
      if (!selectedCategory.includes(id)) {
        alert("Você só pode selecionar 3 categorias!");
        return;
      }
    }
    if (selectedCategory.includes(id)) {
      const index = selectedCategory.indexOf(id);
      if (index !== -1) {
        const newSelectedCategories = [...selectedCategory];
        newSelectedCategories.splice(index, 1);
        setSelectedCategory(newSelectedCategories);
      }
    } else {
      setSelectedCategory((prev) => [...prev, id]);
    }
  };

  return (
    <div className="h-full">
      <label className="block text-sm font-medium mb-2">Categoria</label>
      <div className="flex flex-wrap w-full max-h-[200px] overflow-y-auto gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            disabled={selectedCategory.length === 3 && !selectedCategory.includes(category.id)}
            onClick={() => toggleCategory(category.id)}
            className={`max-w-36 px-6 py-2 rounded-3xl flex gap-2 items-center justify-center text-xs disabled:bg-gray-100 disabled:text-gray-400 transition-all duration-200 ${
              selectedCategory.includes(category.id)
                ? "border border-red-500"
                : "border bg-white"
            }`}
          >
            <span>{category.icon}</span>
            <span className="truncate w-full text-center">{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Categories;
