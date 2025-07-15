import { OrderStatus } from "@/types/Order";
import { apiclient } from "@/utils/apiClient";

export class OrderService {
  static async refreshDay({
    orgId,
  }: OrderService.RefreshDayInput): Promise<OrderService.RefreshDayOutput> {
    await apiclient.patch(`/order/restart/${orgId}`);
  }

  static async getOrders({
    orgId,
  }: OrderService.GetOrdersInput): Promise<OrderService.GetOrdersOutput[]> {
    const { data: orders } = await apiclient.get<
      OrderService.GetOrdersOutput[]
    >(`/order/${orgId}`);

    return orders;
  }

  static async cancelOrder({
    orderId,
    orgId,
  }: OrderService.CancelOrderInput): Promise<void> {
    await apiclient.delete(`/order/${orgId}/${orderId}`);
  }

  static async updateOrder({
    orderId,
    orgId,
    status,
  }: OrderService.UpdateOrderInput): Promise<void> {
    await apiclient.patch(`/order/${orgId}/${orderId}`, {
      status,
    });
  }
}

export namespace OrderService {
  type Product = {
    _id: string;
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

  export type CancelOrderInput = { orgId: string; orderId: string };

  export type UpdateOrderInput = {
    orgId: string;
    orderId: string;
    status: OrderStatus;
  };
}
