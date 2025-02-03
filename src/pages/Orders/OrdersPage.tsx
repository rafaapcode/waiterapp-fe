import OrdersView from "./Orders.view";
import { useOrdersModel } from "./oders.model";

function Orders() {

  const {props} = useOrdersModel();

  return <OrdersView props={props}/>
}

export default Orders;
