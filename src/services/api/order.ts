import { Order } from "@/types/Order";
import { apiclient } from "@/utils/apiClient";
import {
  UseMutateAsyncFunction,
  useMutation,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { OnErrorCBType, OnSuccessCBType } from "../types/mutations.type";

export class OrderService {
  static getOrders(): UseQueryResult<Order[], Error> {
    return useQuery({
      queryKey: ["orders"],
      queryFn: async (): Promise<Order[]> => {
        try {
          const { data: orders } = await apiclient.get("/order");
          return orders;
        } catch (error) {
          return [];
        }
      },
    });
  }

  static cancelOrder(
    onSuccess: OnSuccessCBType,
    onError: OnErrorCBType
  ): {
    cancelOrder: UseMutateAsyncFunction<
      AxiosResponse<any, any>,
      Error,
      string,
      unknown
    >;
  } {
    const { mutateAsync } = useMutation({
      mutationFn: async (orderId: string) =>
        await apiclient.delete(`/order/${orderId}`),
      onSuccess,
      onError,
    });

    return { cancelOrder: mutateAsync };
  }

  static updateOrder(
    onSuccess: OnSuccessCBType,
    onError: OnErrorCBType
  ): {
    updateOrder: UseMutateAsyncFunction<
      AxiosResponse<any, any>,
      Error,
      {
        orderId: string;
        status: Order["status"];
      },
      unknown
    >;
  } {
    const { mutateAsync } = useMutation({
      mutationFn: async (data: { orderId: string; status: Order["status"] }) =>
        await apiclient.patch(`/order/${data.orderId}`, {
          status: data.status,
        }),
      onSuccess,
      onError,
    });

    return { updateOrder: mutateAsync };
  }
}
