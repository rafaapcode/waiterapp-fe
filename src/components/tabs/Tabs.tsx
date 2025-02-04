import { TABS } from "../../contexts/TabsProvider";
import { useTabs } from "../../hooks/useTabs";

function Tabs() {
  const {selectTab, selectedTab} = useTabs();

  const variationOfStyles = {
    selected: "bg-neutral-500 text-white p-2 rounded-md transition-all duration-200",
    default: "bg-neutral-200 p-2 rounded-md hover:bg-neutral-300 transition-all duration-200"
  };
  console.log(selectedTab);
  return (
    <div className="flex justify-center gap-8 py-2 mt-3">
      <button onClick={() => selectTab(TABS.VISUALIZAR_PEDIDOS)} className={selectedTab === TABS.VISUALIZAR_PEDIDOS ? variationOfStyles.selected : variationOfStyles.default}>Visualizar Pedidos</button>
      <button onClick={() => selectTab(TABS.GERENCIAR_PRODUTOS)} className={selectedTab === TABS.GERENCIAR_PRODUTOS ? variationOfStyles.selected : variationOfStyles.default}>Gerenciar Produtos</button>
      <button onClick={() => selectTab(TABS.GERENCIAR_GARCOM_MESAS)} className={selectedTab === TABS.GERENCIAR_GARCOM_MESAS ? variationOfStyles.selected : variationOfStyles.default}>Gerenciar Garçons e Mesas</button>
    </div>
  )
}

export default Tabs
