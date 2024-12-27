import { useEffect } from "react";
import CloseIcon from "../../assets/images/close-icon.svg";
import { Order } from "../../types/Order";
import { formatCurrency } from "../../utils/formatCurrency";

type OrderModalProps = {
  visible: boolean;
  order: Order | null;
  handleCloseModal: () => void;
};

function OrderModal({ visible, order, handleCloseModal }: OrderModalProps) {
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

  const total = order.products.reduce((acc, { product, quantity }) => {
    return (acc += product.price * quantity);
  }, 0);


  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if(event.key === "Escape") {
        handleCloseModal();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    }
  }, []);

  return (
    <div className="fixed w-full h-full top-0 left-0 bg-black/80 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white w-1/4 rounded-lg p-8">
        <header className="flex items-center justify-between">
          <strong className="text-2xl">Mesa {order.table}</strong>
          <button onClick={handleCloseModal} type="button" className="leading-[0px]">
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
                <span className="block min-w-[20px] text-[#666] ml-3">
                  {quantity}x
                </span>
                <div className="ml-1">
                  <strong className="block mb-1">{product.name}</strong>
                  <span className="text-sm text-[#666]">
                    {formatCurrency(product.price)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between items-center mt-6">
          <span className="font-normal text-sm opacity-80">Total</span>
          <strong>{formatCurrency(total)}</strong>
        </div>

        <footer className="flex flex-col mt-8">
          <button type="button" className="bg-[#333] rounded-[48px] border-none text-white py-3 px-6 flex justify-center items-center gap-2">
            <span>🍪</span>
            <strong>Iniciar Produção</strong>
          </button>
          <button type="button" className="py-3 px-6 text-[#D73035] font-bold border-none mt-3">Cancelar Pedido</button>
        </footer>
      </div>
    </div>
  );
}

export default OrderModal;
