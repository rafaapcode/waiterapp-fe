import OrdersBoard from "../../components/OrdersBoard/OrdersBoard";
import { OrdersViewType } from "./orders.type";

function OrdersView({props}: OrdersViewType) {
  const {done, handleCancelOrder, handleStatusChange, inProduction, waiting} = props;

   return (
    <div className="max-w-full mt-12 mx-auto flex gap-8">
      <OrdersBoard
        orders={waiting}
        icon="🕛"
        title="Fila de espera"
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleStatusChange}
      />
      <OrdersBoard
        orders={inProduction}
        icon="🍪"
        title="Em preparação"
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleStatusChange}
      />
      <OrdersBoard
        orders={done}
        icon="🆗"
        title="Concluído"
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleStatusChange}
      />
    </div>
  );
}

export default OrdersView;
