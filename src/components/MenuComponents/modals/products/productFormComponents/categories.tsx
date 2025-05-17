import { Categorie } from "@/types/Categorie";
import { apiclient } from "@/utils/apiClient";
import { useQuery } from "@tanstack/react-query";

interface CategoriesProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

function Categories({ selectedCategory,setSelectedCategory }: CategoriesProps) {
  const { data } = useQuery({
    queryKey: ["all_categories"],
    queryFn: async (): Promise<Categorie[]> => {
      try {
        const {data} = await apiclient.get("/category/categories");
        return data as Categorie[]
      } catch (error: any) {
        console.log(error.message);
        return [];
      }
    }
  })

  const toggleCategory = (id: string) => {
    setSelectedCategory(id);
  };

  return (
    <div className="h-full">
      <label className="block text-sm font-medium mb-2">Categoria</label>
      <div className="flex flex-wrap w-full max-h-[200px] overflow-y-auto gap-2">
        {(!data || data.length === 0) ? <div><p>Nenhuma categoria encontrada</p></div> : data.map((category) => (
          <button
            key={category._id}
            onClick={() => toggleCategory(category._id)}
            className={`max-w-36 px-6 py-2 rounded-3xl flex gap-2 items-center justify-center text-xs disabled:bg-gray-100 disabled:text-gray-400 transition-all duration-200 ${
              selectedCategory === category._id
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
