import { Select } from "@/components/molecule/Select";
import { MenuService } from "@/services/api/menu";
import { useQuery } from "@tanstack/react-query";

interface CategoriesProps {
  value: string;
  onChange: (category: string) => void;
  orgId: string;
}

function Categories({ orgId, onChange, value }: CategoriesProps) {
  const { data: allCategories, isFetching } = useQuery({
    queryKey: ["get", "categories", orgId],
    queryFn: async () => await MenuService.getAllCategories(orgId),
  });

  return (
    <div>
      <label className="block text-sm mb-2">Categoria</label>
      {allCategories && (
        <Select
          value={value}
          onChange={(cat) => onChange(cat)}
          // error={errors.type?.message}
          placeholder="Categoria"
          options={allCategories?.map((cats) => ({
            label: `${cats.icon} - ${cats.name}`,
            value: cats._id,
          }))}
        />
      )}
    </div>
  );
}

export default Categories;
