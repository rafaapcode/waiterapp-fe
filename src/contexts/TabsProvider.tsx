import React, { createContext, useState } from "react";

enum TABS {
  VISUALIZAR_PEDIDOS="VISUALIZAR_PEDIDOS",
  GERENCIAR_PEDIDOS="GERENCIAR_PEDIDOS",
  GERENCIAR_BARBEIROS_MESAS="GERENCIAR_BARBEIROS_MESAS",
}

interface TabsContextProvider {
  selectedTab: TABS;
  selectTab: (tab: TABS) => void;
}

export const TabsContext = createContext<TabsContextProvider>({
  selectedTab: TABS.VISUALIZAR_PEDIDOS,
  selectTab: (tab: TABS) => {}
});

type TabsProviderProps = {
  children: React.ReactNode
};

function TabsProvider({children}: TabsProviderProps) {
  const [selectedTab, setSelectedTab] = useState<TABS>(TABS.VISUALIZAR_PEDIDOS);

  const handleSelectTab = (tab: TABS) => {
    setSelectedTab(tab);
  };

  const values = {
    selectedTab,
    selectTab: handleSelectTab
  }

  return (
    <TabsContext.Provider value={values}>
      {children}
    </TabsContext.Provider>
  )
}

export default TabsProvider
