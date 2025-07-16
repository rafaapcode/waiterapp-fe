import OrdersBoard from "../OrdersBoard";
import { useOrdersController } from "./useOrdersController";

function OrdersView() {
  const {done, handleCancelOrder, handleStatusChange, inProduction, waiting, updatingOrder, cancelingOrder} = useOrdersController();

   return (
    <div className="max-w-full mt-12 mx-auto flex gap-8">
      <OrdersBoard
        isLoading={updatingOrder || cancelingOrder}
        orders={waiting}
        icon="🕛"
        title="Fila de espera"
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleStatusChange}
      />
      <OrdersBoard
        isLoading={updatingOrder || cancelingOrder}
        orders={inProduction}
        icon="🍪"
        title="Em preparação"
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleStatusChange}
      />
      <OrdersBoard
        isLoading={updatingOrder || cancelingOrder}
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
