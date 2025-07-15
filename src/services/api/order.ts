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
  // await apiclient.patch(`/order/restart/${user.orgId}`);

  static async refreshDay({ orgId }: OrderService.RefreshDayInput): Promise<OrderService.RefreshDayOutput> {
    await apiclient.patch(`/order/restart/${orgId}`);
  }

  static getOrders(orgId: string): UseQueryResult<Order[], Error> {
    return useQuery({
      queryKey: ["orders", orgId],
      queryFn: async (): Promise<Order[]> => {
        try {
          const { data: orders } = await apiclient.get(`/order/${orgId}`);
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
      { orgId: string; orderId: string },
      unknown
    >;
  } {
    const { mutateAsync } = useMutation({
      mutationFn: async ({
        orderId,
        orgId,
      }: {
        orgId: string;
        orderId: string;
      }) => await apiclient.delete(`/order/${orgId}/${orderId}`),
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
        orgId: string;
        orderId: string;
        status: Order["status"];
      },
      unknown
    >;
  } {
    const { mutateAsync } = useMutation({
      mutationFn: async (data: {
        orgId: string;
        orderId: string;
        status: Order["status"];
      }) =>
        await apiclient.patch(`/order/${data.orgId}/${data.orderId}`, {
          status: data.status,
        }),
      onSuccess,
      onError,
    });

    return { updateOrder: mutateAsync };
  }
}

export namespace OrderService {
  export type RefreshDayInput = {
    orgId: string;
  };
  export type RefreshDayOutput = void;
}
