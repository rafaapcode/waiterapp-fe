import { HistoryOrder } from "@/types/Order";
import { AxiosResponse } from "axios";
import { DateRange } from "react-day-picker";

export interface HistoryModelType {
  props: {
    selectedOrder: HistoryOrder | null;
    isPending: boolean;
    isFetching: boolean;
    handleSelectedOrder: (order: HistoryOrder | null) => void;
    onDeleteOrder: (id: string) => Promise<AxiosResponse<any, any>>;
    data: { total_pages: number; history: HistoryOrder[] };
    handleResetData: () => void;
    filterDateSelected: DateRange | undefined;
    handleSelectedDate: (date: DateRange | undefined) => void;
    handlePage: (type: "Next" | "Previous" | "First" | "Last") => void;
    page: number;
  };
}
