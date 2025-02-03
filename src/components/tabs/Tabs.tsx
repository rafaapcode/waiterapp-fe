import { useTabs } from "../../hooks/useTabs";

function Tabs() {
  const {selectTab, selectedTab} = useTabs();

  return (
    <div className="flex justify-center gap-8 py-2 mt-3">
      <button className="bg-neutral-500 text-white p-2 rounded-md transition-all duration-200">Visualizar Pedidos</button>
      <button className="bg-neutral-200 p-2 rounded-md hover:bg-neutral-300 transition-all duration-200">Gerenciar Pedidos</button>
      <button className="bg-neutral-200 p-2 rounded-md hover:bg-neutral-300 transition-all duration-200">Gerenciar Barbeiros e Mesas</button>
    </div>
  )
}

export default Tabs
