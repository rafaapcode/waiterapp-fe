import { useContext } from "react";
import { TabsContext } from "../contexts/TabsProvider";

export const useTabs = () => {
  return useContext(TabsContext);
};
