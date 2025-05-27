import { HistoryOrder } from "@/types/Order";
import { apiclient } from "@/utils/apiClient";
import {
  UseMutateAsyncFunction,
  useMutation,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { DateRange } from "react-day-picker";
import { OnErrorCBType, OnSuccessCBType } from "../types/mutations.type";

export class HistoryService {
  static deleteOrder(
    onSuccess: OnSuccessCBType,
    onError: OnErrorCBType
  ): {
    deleteOrder: UseMutateAsyncFunction<
      AxiosResponse<any, any>,
      Error,
      string,
      unknown
    >;
    isPending: boolean;
  } {
    const { mutateAsync: deleteOrder, isPending } = useMutation({
      mutationFn: async (id: string) =>
        await apiclient.delete(`/order/history/${id}`),
      onSuccess,
      onError,
    });

    return { deleteOrder: deleteOrder, isPending };
  }

  static getHistoryOrders(
    page: number,
    cb: (data: { total_pages: number; history: HistoryOrder[] }) => void
  ): UseQueryResult<{ total_pages: number; history: HistoryOrder[] }, Error> {
    return useQuery({
      queryKey: ["history_orders", { page }],
      queryFn: async (): Promise<{
        total_pages: number;
        history: HistoryOrder[];
      }> => {
        try {
          const { data: historyOrders } = await apiclient.get(
            `/order/history/${page}`
          );
          cb(historyOrders);
          return historyOrders;
        } catch (error) {
          console.log(error);
          cb({ total_pages: 0, history: [] });
          return { total_pages: 0, history: [] };
        }
      },
    });
  }

  static getFilteredHistoryOrders(
    page: number,
    filteredDateSelected: DateRange | undefined,
    cb: (data: { total_pages: number; history: HistoryOrder[] }) => void
  ): UseQueryResult<
    {
      total_pages: number;
      history: HistoryOrder[];
    },
    Error
  > {
    return useQuery({
      enabled: !!(filteredDateSelected?.to && filteredDateSelected.from),
      queryKey: ["history_orders", { page }, filteredDateSelected],
      queryFn: async (): Promise<{
        total_pages: number;
        history: HistoryOrder[];
      }> => {
        try {
          const { data: historyOrdersFiltered } = await apiclient.get(
            `/order/history/filter/${page}`,
            {
              params: {
                to: filteredDateSelected?.to,
                from: filteredDateSelected?.from,
              },
            }
          );
          cb(historyOrdersFiltered);
          return historyOrdersFiltered;
        } catch (error) {
          console.log(error);
          cb({ total_pages: 0, history: [] });
          return { total_pages: 0, history: [] };
        }
      },
    });
  }
}
