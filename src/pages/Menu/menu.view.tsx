import { useCallback, useState } from "react";
import { BiFoodMenu } from "react-icons/bi";
import Header from "../../components/Header/Header";
import CategoriesTable from "../../components/MenuComponents/CategoriesTable";
import Menutab from "../../components/MenuComponents/Menutab";
import ProductsTable from "../../components/MenuComponents/ProductsTable";

function Menu() {
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
      <Menutab handleTab={handleTabs} tabSelected={tab}/>

    <section className="w-full mt-8">
      {tab === "products" && <ProductsTable />}
      {tab === "categories" && <CategoriesTable />}
    </section>

    </main>
  )
}

export default Menu
