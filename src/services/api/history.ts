import { HistoryOrder } from "@/types/Order";
import { apiclient } from "@/utils/apiClient";
import { DateRange } from "react-day-picker";

export class HistoryService {
  static async deleteOrder({
    orderid,
    orgId,
  }: HistoryService.DeleteOrderInput): Promise<void> {
    await apiclient.delete(`/order/history/${orgId}/${orderid}`);
  }

  static async getHistoryOrders({
    page,
    orgId,
  }: HistoryService.GetHistoryOrdersInput): Promise<HistoryService.GetHistoryOrdersOutput> {
    const { data: historyOrders } = await apiclient.get(
      `/order/history/${orgId}/${page}`
    );

    return historyOrders;
  }

  static async getFilteredHistoryOrders({
    filteredDateSelected,
    orgId,
    page,
  }: HistoryService.GetFilteredHistoryOrdersInput): Promise<HistoryService.GetFilteredHistoryOrdersOutput> {
    const { data: historyOrdersFiltered } =
      await apiclient.get<HistoryService.GetFilteredHistoryOrdersOutput>(
        `/order/history/filter/${orgId}/${page}`,
        {
          params: {
            to: filteredDateSelected?.to,
            from: filteredDateSelected?.from,
          },
        }
      );
    return historyOrdersFiltered;
  }
}

export namespace HistoryService {
  export type DeleteOrderInput = {
    orgId: string;
    orderid: string;
  };

  export type GetFilteredHistoryOrdersInput = {
    orgId: string;
    page: number;
    filteredDateSelected: DateRange | undefined;
  };
  export type GetFilteredHistoryOrdersOutput = {
    total_pages: number;
    history: HistoryOrder[]
  };

  export type GetHistoryOrdersInput = {
    orgId: string;
    page: number;
  };
  export type GetHistoryOrdersOutput = {
    total_pages: number;
    history: HistoryOrder[]
  };
}
