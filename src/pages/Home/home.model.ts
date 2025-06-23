import { useUser } from "@/context/user";
import { apiclient } from "@/utils/apiClient";
import { AxiosError } from "axios";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import HomePageProps from "./home.type";

export const useHomeModel = (): HomePageProps => {
  const stateUser = useUser((state) => state.user);
  const [restartModal, setRestartModal] = useState<boolean>(false);

  const toogleRestartModal = useCallback(
    () => setRestartModal((prev) => !prev),
    []
  );

  const refetchData = async () => {
    try {
      const res = await apiclient.patch(`/order/restart/${stateUser.orgId}`);
      if (res.status != 200) {
        toast.error("Erro ao reinicializar o dia !");
      } else {
        toast.success(res.data.message);
        toogleRestartModal();
      }
    } catch (error: any) {
      console.log(error);
      const err = error as AxiosError<{message: string}>;
      toast.error(err.response?.data?.message)
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
