import { HistoryOrder } from "@/types/Order";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import Modal from "../../Modal";
import ProductInfo from "../../ProductInfo/ProductInfo";

interface HistoryModal {
  isVisible: boolean;
  onClose: () => void;
  onDelete: (id: string) => Promise<void>;
  order: HistoryOrder | null;
}

function HistoryModal({ isVisible, onClose, onDelete, order }: HistoryModal) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleOnDelete = () => {
    if (order?.id) {
      setIsLoading(true);
      onDelete(order.id)
        .then(() => {
          toast.success("Registro deletado com Sucesso !");
          onClose();
        })
        .catch(() => toast.error("Erro ao deletar o registro"))
        .finally(() => setIsLoading(false));
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
            {order.itens.map((iten, i) => (
              <ProductInfo
                key={i}
                products={{
                  _id: i,
                  quantity: iten.quantity,
                  product: {
                    _id: "123312",
                    discount: false,
                    imageUrl: iten.imageUrl,
                    name: iten.name,
                    price: 12.0,
                    priceInDiscount: 0.0,
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
