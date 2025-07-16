import { Order, OrderStatus } from "@/types/Order";
import { useState } from "react";
import { toast } from "react-toastify";

export type BoardsControllerParams = {
  onCancelOrder: (orderId: string) => Promise<void>;
  onChangeOrderStatus: (orderId: string, status: OrderStatus) => Promise<void>;
};

export const useOrdersBoardController = ({
  onCancelOrder,
  onChangeOrderStatus,
}: BoardsControllerParams) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleOpenModal = (order: Order) => {
    setIsModalOpen(true);
    setSelectedOrder(order);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const handleChangeOrderStatus = async () => {
    try {
      const status =
        selectedOrder?.status === OrderStatus.WAITING
          ? OrderStatus.IN_PRODUCTION
          : OrderStatus.DONE;
      await onChangeOrderStatus(selectedOrder!._id, status);
      toast.success(
        `O pedido da mesa ${selectedOrder?.table} teve o status alterado!`
      );
      setIsModalOpen(false);
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
      }
      toast.error("Erro ao mudar o status da sua ordem.");
    }
  };

  const handleCancelOrder = async () => {
    try {
      await onCancelOrder(selectedOrder?._id!);
      toast.success(`O pedido da mesa ${selectedOrder?.table} foi cancelado!`);
      setIsModalOpen(false);
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
      }
      toast.error("Erro ao mudar ao cancelar a sua ordem.");
    }
  };

  return {
    handleOpenModal,
    handleCloseModal,
    isModalOpen,
    selectedOrder,
    handleChangeOrderStatus,
    handleCancelOrder
  };
};
