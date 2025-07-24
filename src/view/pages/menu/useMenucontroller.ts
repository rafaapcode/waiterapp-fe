import { useCallback, useState } from "react";

export const useMenuController = () => {
  const [tab, setTab] = useState<"products" | "categories">("products");

  const handleTabs = useCallback((tab: "products" | "categories") => {
    setTab(tab);
  }, []);

  return {
    tab,
    handleTabs
  }
};
