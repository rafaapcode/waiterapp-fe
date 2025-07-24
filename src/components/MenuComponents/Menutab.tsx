import { cn } from "@/utils/cn";

interface MenuTabProps {
  tabSelected: "products" | "categories";
  handleTab: (tab: "products" | "categories") => void;
}

function Menutab({ handleTab, tabSelected }: MenuTabProps) {
  return (
    <section className="w-full flex mt-16 border-b">
      <button onClick={() => handleTab("products")} className={cn('w-[142px] h-[53px] rounded-lg transition-all duration-150', tabSelected === "products" && 'shadow-inner bg-white')}>
        <p className={cn("text-sm text-[#666666]", tabSelected === "products" && "text-[#D73035] font-semibold")}>Produtos</p>
      </button>
      <button onClick={() => handleTab("categories")} className={cn('w-[142px] h-[53px] rounded-lg transition-all duration-150', tabSelected === "categories" && 'shadow-inner bg-white')}>
        <p className={cn("text-sm text-[#666666]", tabSelected === "categories" && "text-[#D73035] font-semibold")}>Categorias</p>
      </button>
    </section>
  )
}

export default Menutab
