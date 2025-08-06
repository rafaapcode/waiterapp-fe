import DropdownMenu from "@/components/molecule/DropdownMenu";
import { MenuService } from "@/services/api/menu";
import { useQuery } from "@tanstack/react-query";
import { VscLoading } from "react-icons/vsc";

interface CategoriesProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  orgId: string;
}

function Categories({
  selectedCategory,
  setSelectedCategory,
  orgId,
}: CategoriesProps) {
  const { data: allCategories, isFetching } = useQuery({
    queryKey: ["get", "categories", orgId],
    queryFn: async () => await MenuService.getAllCategories(orgId),
  });

  const handleCategorySelect = (categoryId: string) => {
    console.log("Categoria clicada:", categoryId);
    console.log("Categoria atual:", selectedCategory);
    setSelectedCategory(categoryId);
  };

  return (
    <div>
      <label className="block text-sm font-medium mb-2">Categoria</label>
      <DropdownMenu>
        <DropdownMenu.Trigger>
          <button className="rounded-xl flex w-1/3 h-fit py-3 gap-2 items-center justify-center text-sm border  border-gray-400 disabled:bg-gray-100 disabled:text-gray-400 transition-all duration-200">
            Selecione um categoria
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content className="z-50 my-1">
          {isFetching ? (
            <div className="mx-auto">
              <VscLoading className="animate-spin" />
            </div>
          ) : (
            allCategories?.map((category) => (
              <DropdownMenu.Item onSelect={(e) => console.log(e.target)} className="flex gap-1 px-6 py-2 cursor-pointer rounded-md hover:bg-gray-100 transition-all duration-150">
                <span>{category.icon}</span>
                <span className="truncate w-full text-center">{category.name}</span>
              </DropdownMenu.Item>
            ))
          )}
        </DropdownMenu.Content>
      </DropdownMenu>
    </div>
  );
}

export default Categories;
