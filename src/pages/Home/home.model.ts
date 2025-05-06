import { apiclient } from "@/utils/apiClient";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import HomePageProps from "./home.type";

export const useHomeModel = (): HomePageProps => {
  const [restartModal, setRestartModal] = useState<boolean>(false);

  const toogleRestartModal = useCallback(
    () => setRestartModal((prev) => !prev),
    []
  );

  const refetchData = async () => {
    try {
      const res = await apiclient.patch("/order");
      if (res.status != 200) {
        toast.error("Erro ao reinicializar o dia !");
      } else {
        toast.success(res.data.message);
        toogleRestartModal();
      }
    } catch (error: any) {
      console.log("Error Catch", error);
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Erro ao reinicializar o dia !");
      }
    }
  };

  return {
    props: {
      restartModal,
      toogleRestartModal,
      refetchData,
    },
  };
};
