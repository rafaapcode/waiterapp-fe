import { HistoryOrder } from "@/types/Order";
import { AxiosResponse } from "axios";
import { LoaderCircle } from "lucide-react";
import { toast } from "react-toastify";
import Modal from "../../Modal";
import ProductInfo from "../../ProductInfo/ProductInfo";

interface HistoryModal {
  isVisible: boolean;
  isLoading: boolean;
  onClose: () => void;
  onDelete: (id: string) => Promise<AxiosResponse<any, any>>;
  order: HistoryOrder | null;
}

function HistoryModal({ isVisible, onClose, onDelete, order, isLoading }: HistoryModal) {
  const handleOnDelete = () => {
    if (order?.id) {
      onDelete(order.id);
    } else {
      toast.error("Erro ao encontrar o ID do registro");
    }
  };

  if (!order) {
    return null;
  }

  return (
    <Modal.Root size="sm" isVisible={isVisible}>
      <Modal.Header onClose={onClose}>
        <p className="text-2xl font-semibold text-[#333333]">{order.table}</p>
      </Modal.Header>

      <Modal.Body className="mb-8">
        <div className="w-full flex flex-col gap-2 mt-8">
          <p className="text-sm text-[#333333]">Data do pedido</p>
          <p className="text-[#333333] font-semibold">
            {Intl.DateTimeFormat("pt-BR", { dateStyle: "short" }).format(
              new Date(order.data)
            )}
          </p>
        </div>

        <div className="w-full flex flex-col gap-6 mt-8">
          <p className="text-sm text-[#333333]">Itens</p>
          <div className="flex flex-col gap-2 max-h-[500px] overflow-y-auto">
            {order.itens.map((iten) => (
              <ProductInfo
                key={iten.id}
                products={{
                  _id: iten.id,
                  quantity: iten.quantity,
                  product: {
                    _id: iten.id,
                    discount: iten.discount,
                    imageUrl: iten.imageUrl,
                    name: iten.name,
                    price: iten.price,
                    priceInDiscount: iten.priceInDiscount,
                  },
                }}
              />
            ))}
          </div>
          <footer className="flex justify-between items-center">
            <p className="text-sm text-[#333333]">Total</p>
            <p className="text-[#333333] font-semibold">{order.totalPrice}</p>
          </footer>
        </div>
      </Modal.Body>

      <Modal.CustomFooter>
        <button
          disabled={isLoading}
          onClick={handleOnDelete}
          className="text-[#D73035] font-semibold"
        >
          {isLoading ? (
            <LoaderCircle size={22} className="animate-spin" />
          ) : (
            "Excluir Registro"
          )}
        </button>
      </Modal.CustomFooter>
    </Modal.Root>
  );
}

export default HistoryModal;
