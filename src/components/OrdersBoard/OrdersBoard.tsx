import { useState } from "react";
import { Order } from "../../types/Order";
import OrderModal from "../OrderModal/OrderModal";

type OrdersBoardProps = {
  icon: string;
  title: string;
  orders: Order[];
};

function OrdersBoard({ icon, title, orders }: OrdersBoardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleOpenModal = (order: Order) => {
    setIsModalOpen(true);
    setSelectedOrder(order);
  } ;


  return (
    <div className="p-4 flex-1 border border-[#ccc] rounded-2xl flex flex-col items-center">
      <OrderModal order={selectedOrder} visible={isModalOpen}/>
      <header className="p-2 text-base flex items-center gap-2">
        <span>{icon}</span>
        <strong>{title}</strong>
        <span>({orders.length})</span>
      </header>
      {orders.length > 0 && (
        <div className="flex flex-col w-full mt-6 gap-6">
          {orders.map((order) => (
            <button
              onClick={() => handleOpenModal(order)}
              key={order._id}
              type="button"
              className="bg-white flex flex-col justify-center items-center gap-1 w-full border border-[#ccc] h-32 rounded-lg"
            >
              <strong className="font-medium">Mesa {order.table}</strong>
              <span className="text-sm text-[#666]">
                {order.products.length} {order.products.length > 1 ? "itens" : "item"}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrdersBoard;
