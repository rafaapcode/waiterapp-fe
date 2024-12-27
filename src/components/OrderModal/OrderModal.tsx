import CloseIcon from "../../assets/images/close-icon.svg";
import { Order } from "../../types/Order";

type OrderModalProps = {
  visible: boolean;
  order: Order | null;
};

function OrderModal({ visible, order }: OrderModalProps) {
  const orderStatus = {
    DONE: {
      icon: "🆗",
      text: "Concluído",
    },
    WAITING: {
      icon: "🕛",
      text: "Fila de espera",
    },
    IN_PRODUCTION: {
      icon: "🍪",
      text: "Em preparação",
    },
  };

  if (!visible || !order) {
    return null;
  }

  return (
    <div className="fixed w-full h-full top-0 left-0 bg-black/80 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white w-1/4 rounded-lg p-8">
        <header className="flex items-center justify-between">
          <strong className="text-2xl">Mesa {order.table}</strong>
          <button type="button" className="leading-[0px]">
            <img src={CloseIcon} alt="close-icon" />
          </button>
        </header>
        <div className="mt-8">
          <small className="text-sm opacity-80">Status do pedido</small>
          <div className="flex gap-2 items-center mt-2">
            <span>{orderStatus[order.status].icon}</span>
            <strong>{orderStatus[order.status].text}</strong>
          </div>
        </div>
        <div className="mt-8">
          <strong className="font-normal text-base opacity-80">Itens</strong>
          <div className="mt-4 flex flex-col gap-4">
            {order.products.map(({ _id, product, quantity }) => (
              <div className="flex">
                <img
                  className="w-14 h-[28.51px] rounded-md"
                  src={`http://localhost:3001/uploads/${product.imagePath}`}
                  alt={product.name}
                />
                <span className="block min-w-[20px] text-[#666] ml-3">{quantity}x</span>
                <div className="ml-1">
                  <strong className="block mb-1">{product.name}</strong>
                  <span className="text-sm text-[#666]">{new Intl.NumberFormat("pt-BR", {style: "currency", currency: "BRL"}).format(product.price)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderModal;
