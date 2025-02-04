import { TABS } from "../../contexts/TabsProvider";
import { useTabs } from "../../hooks/useTabs";
import Orders from "../../pages/Orders/OrdersPage";
import ProductsView from "../../pages/Products/Products.view";
import WaitersTableView from "../../pages/WaiterAndTables/WaitersTable.view";

function TabsContent() {
  const {selectedTab} = useTabs();

  switch (selectedTab) {
    case TABS.VISUALIZAR_PEDIDOS:
      return <Orders />
    case TABS.GERENCIAR_PRODUTOS:
      return <ProductsView />
    case TABS.GERENCIAR_GARCOM_MESAS:
      return <WaitersTableView />
  }
}

export default TabsContent
