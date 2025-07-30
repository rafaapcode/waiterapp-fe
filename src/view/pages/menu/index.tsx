import PageHeader from "@/components/molecule/PageHeader";
import { cn } from "@/utils/cn";
import { BiFoodMenu } from "react-icons/bi";
import CategoriesTable from "./components/category";
import ProductsTable from "./components/products";
import { useMenuController } from "./useMenucontroller";

function MenuPage() {
  const { handleTabs, tab } = useMenuController();

  return (
    <main className="w-full h-full pt-10 overflow-y-auto">
      <PageHeader
        Icon={BiFoodMenu}
        subtitle="Gerencie os produtos do seu estabelecimento"
        title="Cardápio"
      />

      <section className="w-full flex mt-16 border-b">
        <button
          onClick={() => handleTabs("products")}
          className={cn(
            "w-[142px] h-[53px] rounded-lg transition-all duration-150",
            tab === "products" && "shadow-inner bg-white"
          )}
        >
          <p
            className={cn(
              "text-sm text-[#666666]",
              tab === "products" && "text-[#D73035] font-semibold"
            )}
          >
            Produtos
          </p>
        </button>
        <button
          onClick={() => handleTabs("categories")}
          className={cn(
            "w-[142px] h-[53px] rounded-lg transition-all duration-150",
            tab === "categories" && "shadow-inner bg-white"
          )}
        >
          <p
            className={cn(
              "text-sm text-[#666666]",
              tab === "categories" && "text-[#D73035] font-semibold"
            )}
          >
            Categorias
          </p>
        </button>
      </section>

      <section className="w-full mt-8">
        {tab === "products" && <ProductsTable />}
        {tab === "categories" && <CategoriesTable />}
      </section>
    </main>
  );
}

export default MenuPage;
