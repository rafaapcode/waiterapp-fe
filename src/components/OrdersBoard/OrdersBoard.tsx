import { lazy, Suspense, useState } from "react";
import { toast } from "react-toastify";
import { Order } from "../../types/Order";
import OrderModalSkeleton from "../OrderModal/OrderModalSkeleton";

const OrderModal = lazy(() => import("../OrderModal/OrderModal"));

type OrdersBoardProps = {
  icon: string;
  title: string;
  orders: Order[];
  onCancelOrder: (orderId: string) => Promise<void>;
  onChangeOrderStatus: (
    orderId: string,
    status: Order["status"]
  ) => Promise<void>;
};

function OrdersBoard({
  icon,
  title,
  orders,
  onCancelOrder,
  onChangeOrderStatus,
}: OrdersBoardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isLoading, setIsloading] = useState(false);

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
      setIsloading(true);
      const status =
        selectedOrder?.status === "WAITING" ? "IN_PRODUCTION" : "DONE";
      await onChangeOrderStatus(selectedOrder!._id, status);
      toast.success(
        `O pedido da mesa ${selectedOrder?.table} teve o status alterado!`
      );
      setIsloading(false);
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
      setIsloading(true);
      await onCancelOrder(selectedOrder?._id!);
      toast.success(`O pedido da mesa ${selectedOrder?.table} foi cancelado!`);
      setIsloading(false);
      setIsModalOpen(false);
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
      }
      toast.error("Erro ao mudar ao cancelar a sua ordem.");
    }
  };

  return (
    <div className="p-4 flex-1 border border-[#ccc] rounded-2xl flex flex-col items-center">
      {isModalOpen && (
        <Suspense fallback={<OrderModalSkeleton visible={isModalOpen} />}>
          <OrderModal
            handleCloseModal={handleCloseModal}
            order={selectedOrder}
            visible={isModalOpen}
            handleCancelOrder={handleCancelOrder}
            isLoading={isLoading}
            onChangeOrderStatus={handleChangeOrderStatus}
          />
        </Suspense>
      )}
      <header className="p-2 text-base flex items-center gap-2">
        <span>{icon}</span>
        <strong>{title}</strong>
        <span>({orders.length})</span>
      </header>
      {orders.length > 0 ? (
        <div className="flex flex-col w-full mt-6 gap-6 overflow-y-auto max-h-[600px]">
          {orders.map((order) => (
            <button
              onClick={() => handleOpenModal(order)}
              key={order._id}
              type="button"
              className="bg-white flex flex-col justify-center items-center gap-1 w-full border border-[#ccc] h-32 min-h-20 rounded-lg"
            >
              <strong className="font-medium">Mesa {order.table}</strong>
              <span className="text-sm text-[#666]">
                {order.products.length}{" "}
                {order.products.length > 1 ? "itens" : "item"}
              </span>
            </button>
          ))}
        </div>
      ) : (
        <div className="flex flex-col w-full mt-6 gap-6 items-center">
          <h1>Nenhum produto encontrado</h1>
        </div>
      )}
    </div>
  );
}

export default OrdersBoard;
