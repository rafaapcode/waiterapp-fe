import { formatCurrency } from "@/utils/formatCurrency";
import Modal from "../../Modal";
import ProductInfo from "../../ProductInfo/ProductInfo";
import { Order } from "../mockData";

interface HistoryModal {
  isVisible: boolean;
  onClose: () => void;
  onDelete: () => Promise<void>;
  isLoading: boolean;
  order: Order | null;
}

function HistoryModal({ isVisible, onClose, onDelete,isLoading, order }: HistoryModal) {

  if (!order) {
    return null;
  }

  return (
    <Modal.Root size="sm" isVisible={isVisible}>
      <Modal.Header onClose={onClose}>
        <p className="text-2xl font-semibold text-[#333333]">Mesa {order.table}</p>
      </Modal.Header>

      <Modal.Body className="mb-8">
        <div className="w-full flex flex-col gap-2 mt-8">
          <p className="text-sm text-[#333333]">Data do pedido</p>
          <p className="text-[#333333] font-semibold">{order.date}</p>
        </div>

        <div className="w-full flex flex-col gap-6 mt-8">
          <p className="text-sm text-[#333333]">Itens</p>
          <div className="flex flex-col gap-2 max-h-[500px] overflow-y-auto">
            {Array.from({length: 10}).map((_, i) => (
              <ProductInfo
                key={i}
                products={{
                  _id: "123",
                  quantity: 12,
                  product: {
                    _id: "123312",
                    discount: false,
                    imageUrl:
                      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    name: "Saudavel",
                    price: 12.0,
                    priceInDiscount: 0.0,
                  },
                }}
              />
            ))}
          </div>
          <footer className="flex justify-between items-center">
            <p className="text-sm text-[#333333]">Total</p>
            <p className="text-[#333333] font-semibold">{formatCurrency(order.total)}</p>
          </footer>
        </div>
      </Modal.Body>

      <Modal.CustomFooter>
        <button disabled={isLoading} onClick={onDelete} className="text-[#D73035] font-semibold">
          Excluir Registro
        </button>
      </Modal.CustomFooter>
    </Modal.Root>
  );
}

export default HistoryModal;
