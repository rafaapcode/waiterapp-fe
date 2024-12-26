import { Order } from "../../types/Order";
import OrdersBoard from "../OrdersBoard/OrdersBoard";

const orders: Order[] = [
  {
    _id: "676ae7a6ee2020f4f99174ac",
    status: "IN_PRODUCTION",
    table: "2",
   products: [
    {
      _id: "676ae1873a1abd5712fc84eb",
      quantity: 2,
      product: {
        _id: "676ae1873a1abd5712fc84eb",
        name: "Pizza",
        imagePath: "1735057799136-pizza-image.jpg",
        price: 100
      }
    }
   ]
  },
];

function Orders() {
  return (
    <div className="w-full max-w-[1216px] my-10 mx-auto flex gap-8">
      <OrdersBoard orders={orders} icon="🕛" title="Fila de espera" />
      <OrdersBoard orders={orders} icon="🍪" title="Em preparação" />
      <OrdersBoard orders={orders} icon="🆗" title="Concluído" />
    </div>
  );
}

export default Orders;
