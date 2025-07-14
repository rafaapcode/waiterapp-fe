import { lazy, Suspense, useCallback, useState } from "react";
import { BiFoodMenu } from "react-icons/bi";
import { VscLoading } from "react-icons/vsc";
import Menutab from "../../components/MenuComponents/Menutab";
import ProductsTable from "../../components/MenuComponents/ProductsTable";
import Header from "../../components/molecule/PageHeader";
import { CategoriesTableProps, ProductsTableProps } from "./menu.type";

const CategoriesTable = lazy(
  () => import("../../components/MenuComponents/CategoriesTable")
);

interface MenuViewProps {
  productsTable: ProductsTableProps["props"];
  categoriesTable: CategoriesTableProps["props"];
}

function MenuView({ productsTable, categoriesTable }: MenuViewProps) {
  const [tab, setTab] = useState<"products" | "categories">("products");

  const handleTabs = useCallback((tab: "products" | "categories") => {
    setTab(tab);
  }, []);

  return (
    <main className="w-full h-full pt-10 overflow-y-auto">
      <Header
        Icon={BiFoodMenu}
        subtitle="Gerencie os produtos do seu estabelecimento"
        title="Cardápio"
      />
      <Menutab handleTab={handleTabs} tabSelected={tab} />

      <section className="w-full mt-8">
        {tab === "products" && <ProductsTable props={productsTable} />}
        {tab === "categories" && (
          <Suspense
            fallback={
              <div className="flex justify-center py-10">
                <VscLoading size={40} className="animate-spin" />
              </div>
            }
          >
            <CategoriesTable props={categoriesTable} />
          </Suspense>
        )}
      </section>
    </main>
  );
}

export default MenuView;
