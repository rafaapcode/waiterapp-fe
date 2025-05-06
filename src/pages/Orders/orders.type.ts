import { Order } from "../../types/Order";

export type OrdersViewType = {
 props: {
  waiting: Order[];
  inProduction: Order[];
  done: Order[];
  handleCancelOrder: (orderId: string) => void;
  handleStatusChange: (orderId: string, status: Order['status']) => void;
 }
};
