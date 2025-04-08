import { useCallback, useState } from "react";
import HomePageProps from "./home.type";

export const useHomeModel = (): HomePageProps => {
  const [restartModal, setRestartModal] = useState<boolean>(false);

    const toogleRestartModal = useCallback(() => setRestartModal(prev => !prev), []);

    const refetchData = async () => console.log("teste")


  return {
    props: {
      restartModal,
      toogleRestartModal,
      refetchData
    }
  }
};
