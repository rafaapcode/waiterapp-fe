import { TABS } from "../../contexts/TabsProvider";
import { useTabs } from "../../hooks/useTabs";
import Orders from "../../pages/Orders/OrdersPage";
import Products from "../../pages/Products/ProductsPage";
import WaitersTable from "../../pages/WaiterAndTables/WaitersTablePage";

function TabsContent() {
  const {selectedTab} = useTabs();

  switch (selectedTab) {
    case TABS.VISUALIZAR_PEDIDOS:
      return <Orders />
    case TABS.GERENCIAR_PRODUTOS:
      return <Products />
    case TABS.GERENCIAR_GARCOM_MESAS:
      return <WaitersTable />
  }
}

export default TabsContent
