import { useAuth } from "@/hooks/useAuth";
import { OrderService } from "@/services/api/order";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";

export const useHomeController = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [restartModal, setRestartModal] = useState<boolean>(false);

  const toogleRestartModal = useCallback(
    () => setRestartModal((prev) => !prev),
    []
  );

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (orgId: string) => OrderService.refreshDay({ orgId }),
  });

  const refetchData = async () => {
    try {
      await mutateAsync(user.orgId);
      toogleRestartModal();
      queryClient.invalidateQueries({
        queryKey: ["get", "orders", user.orgId],
      });
    } catch (error: any) {
      console.log(error);
      toast.error("Erro ao reiniciar o dia.", {toastId: 'restartDayId'});
    }
  };

  return {
    restartModal,
    toogleRestartModal,
    refetchData,
    isPending,
  };
};
