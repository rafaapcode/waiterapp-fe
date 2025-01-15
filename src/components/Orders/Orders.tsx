import { useEffect, useState } from "react";
import { Order } from "../../types/Order";
import { api } from "../../utils/api";
import OrdersBoard from "../OrdersBoard/OrdersBoard";

function Orders() {
  const [orders, setOders] = useState<Order[]>([]);

  useEffect(() => {
    api.get("/orders").then(({data}) => {
      setOders(data);
    })
  }, []);

  const waiting = orders.filter((order) => order.status === "WAITING");
  const inProduction = orders.filter((order) => order.status === "IN_PRODUCTION");
  const done = orders.filter((order) => order.status === "DONE");

  const handleCancelOrder = (orderId: string) => {
    setOders(prev => prev.filter(order => order._id !== orderId));
  }

  return (
    <div className="w-full max-w-[1216px] my-10 mx-auto flex gap-8">
      <OrdersBoard orders={waiting} icon="🕛" title="Fila de espera" onCancelOrder={handleCancelOrder} />
      <OrdersBoard orders={inProduction} icon="🍪" title="Em preparação" onCancelOrder={handleCancelOrder} />
      <OrdersBoard orders={done} icon="🆗" title="Concluído"  onCancelOrder={handleCancelOrder}/>
    </div>
  );
}

export default Orders;
