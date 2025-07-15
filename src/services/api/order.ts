import { Order, OrderStatus } from "@/types/Order";
import { apiclient } from "@/utils/apiClient";
import { UseMutateAsyncFunction, useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { OnErrorCBType, OnSuccessCBType } from "../types/mutations.type";

export class OrderService {
  static async refreshDay({
    orgId,
  }: OrderService.RefreshDayInput): Promise<OrderService.RefreshDayOutput> {
    await apiclient.patch(`/order/restart/${orgId}`);
  }

  static async getOrders({
    orgId,
  }: OrderService.GetOrdersInput): Promise<OrderService.GetOrdersOutput[]> {
    const { data: orders } = await apiclient.get<OrderService.GetOrdersOutput[]>(`/order/${orgId}`);

    return orders;
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
  type Product = {
    product: {
      _id: string;
      name: string;
      description: string;
      imageUrl: string;
      category: string;
    };
    quantity: number;
    discount: boolean;
    price: number;
  };

  export type RefreshDayInput = {
    orgId: string;
  };
  export type RefreshDayOutput = void;

  export type GetOrdersInput = {
    orgId: string;
  };
  export type GetOrdersOutput = {
    _id: string;
    createdAt: string;
    table: string;
    status: OrderStatus;
    products: Product[];
  };
}
