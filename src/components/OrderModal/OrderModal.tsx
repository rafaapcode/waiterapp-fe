import { useEffect } from "react";
import { Order } from "../../types/Order";
import { formatCurrency } from "../../utils/formatCurrency";
import Modal from "../Modal";
import ProductInfo from "../ProductInfo/ProductInfo";

type OrderModalProps = {
  visible: boolean;
  order: Order | null;
  handleCloseModal: () => void;
  handleCancelOrder: () => Promise<void>;
  isLoading: boolean;
  onChangeOrderStatus: () => Promise<void>;
};

function OrderModal({
  visible,
  order,
  handleCloseModal,
  handleCancelOrder,
  isLoading,
  onChangeOrderStatus,
}: OrderModalProps) {
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
    const productPrice = product.discount
      ? product.priceInDiscount
      : product.price;

    return (acc += productPrice * quantity);
  }, 0);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleCloseModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return (
    <Modal.Root isVisible={visible} size="sm">
      <Modal.Header onClose={handleCloseModal}>
        <strong className="text-2xl">Mesa {order.table}</strong>
      </Modal.Header>

      <Modal.Body className="">
        <div className="mt-8">
          <small className="text-sm opacity-80">Status do pedido</small>
          <div className="flex gap-2 items-center mt-2">
            <span>{orderStatus[order.status].icon}</span>
            <strong>{orderStatus[order.status].text}</strong>
          </div>
        </div>
        <div className="mt-8">
          <strong className="font-normal text-base opacity-80">Itens</strong>
          <div className="mt-4 flex flex-col gap-4 max-h-full overflow-y-auto">
            {order.products.map((product) => (
              <ProductInfo products={product} />
            ))}
          </div>
        </div>
        <div className="flex justify-between items-center mt-6">
          <span className="font-normal text-sm opacity-80">Total</span>
          <strong>{formatCurrency(total)}</strong>
        </div>
      </Modal.Body>

      <Modal.Footer
        cancelTitle="Cancelar Pedido"
        isLoading={isLoading}
        onCancel={handleCancelOrder}
        orientation="vertical"
      >
        {order.status !== "DONE" && (
          <button
            onClick={onChangeOrderStatus}
            disabled={isLoading}
            type="button"
            className="bg-[#333] disabled:opacity-50 disabled:cursor-not-allowed rounded-[48px] border-none text-white py-3 px-6 flex justify-center items-center gap-2 w-full"
          >
            <span>
              {order.status === "WAITING" && "🍪"}
              {order.status === "IN_PRODUCTION" && "🆗"}
            </span>
            <strong>
              {order.status === "WAITING" && "Iniciar Produção"}
              {order.status === "IN_PRODUCTION" && "Concluir Pedido"}
            </strong>
          </button>
        )}
      </Modal.Footer>
    </Modal.Root>
  );
}

export default OrderModal;
