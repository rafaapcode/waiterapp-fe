import { Order, OrderStatus } from "@/types/Order";
import OrderModalSkeleton from "@/view/pages/home/components/OrderModal/OrderModalSkeleton";
import { lazy, Suspense } from "react";
import { useOrdersBoardController } from "./useOrdersBoardController";
const OrderModal = lazy(() => import("@/view/pages/home/components/OrderModal/OrderModal"));

type OrdersBoardProps = {
  icon: string;
  title: string;
  orders: Order[];
  onCancelOrder: (orderId: string) => Promise<void>;
  onChangeOrderStatus: (orderId: string, status: OrderStatus) => Promise<void>;
  isLoading: boolean;
};

function OrdersBoard({
  icon,
  onCancelOrder,
  onChangeOrderStatus,
  orders,
  title,
  isLoading,
}: OrdersBoardProps) {
  const {
    handleCloseModal,
    handleOpenModal,
    isModalOpen,
    selectedOrder,
    handleCancelOrder,
    handleChangeOrderStatus,
  } = useOrdersBoardController({
    onCancelOrder,
    onChangeOrderStatus,
  });

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
