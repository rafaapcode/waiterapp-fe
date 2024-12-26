import { Order } from "../../types/Order";


type OrdersBoardProps = {
  icon: string;
  title: string;
  orders: Order[];
};

function OrdersBoard({icon, title, orders}: OrdersBoardProps) {
  return (
    <div className="p-4 flex-1 border border-[#ccc] rounded-2xl flex flex-col items-center">
      <header className="p-2 text-base flex items-center gap-2">
        <span>{icon}</span>
        <strong>{title}</strong>
        <span>(1)</span>
      </header>
      <div className="flex flex-col w-full mt-6 gap-6">
        <button
          type="button"
          className="bg-white flex flex-col justify-center items-center gap-1 w-full border border-[#ccc] h-32 rounded-lg"
        >
          <strong className="font-medium">Mesa 2</strong>
          <span className="text-sm text-[#666]">2 itens</span>
        </button>
      </div>
    </div>
  );
}

export default OrdersBoard;
