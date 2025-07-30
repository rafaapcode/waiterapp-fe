import Modal from "@/components/Modal";
import { MenuService } from "@/services/api/menu";
import { formatCurrency } from "@/utils/formatCurrency";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Image, LoaderCircle } from "lucide-react";
import { toast } from "react-toastify";

interface RemoveProductModalProps {
  isVisible: boolean;
  onClose: () => void;
  editModalClose: () => void;
  data: {
    imageUrl?: string;
    category: string;
    name: string;
    price: string;
    id: string;
  };
  orgId: string;
}

function RemoveProductModal({
  isVisible,
  onClose,
  data,
  editModalClose,
  orgId
}: RemoveProductModalProps) {
  const queryClient = useQueryClient();

  const {mutateAsync:deleteProduct, isPending } = useMutation({
    mutationFn: async (data: MenuService.DeleteProductInput) => {
      await MenuService.deleteProduct(data);
    }
  });

  const onDelete = async () => {
    try {
      await deleteProduct({id: data.id, orgId});
      toast.success("Produto deletado com Sucesso", {toastId: 'deletarProdutoSucessoId'});
      queryClient.invalidateQueries({ queryKey: ["list_all_products"] });
      onClose();
      editModalClose();
    } catch (error) {
      toast.error("Erro ao deletar o produto", {toastId: 'deletarProdutoErroId'});
    }
  }

  return (
    <Modal.Root size="sm" isVisible={isVisible} priority>
      <Modal.Header onClose={onClose}>
        <p className="text-[#333333] text-2xl font-semibold">Excluir Produto</p>
      </Modal.Header>

      <Modal.Body className="my-2">
        <div className="flex flex-col gap-4 my-12 text-center">
          <p>Tem certeza que deseja excluir o produto ?</p>
          <div className="min-h-[123px] flex rounded-lg border border-gray-200 overflow-hidden">
            <div className="w-1/2 h-full flex justify-center items-center bg-[#FAFAFA] overflow-hidden">
              {data.imageUrl && (
                <img
                  src={data.imageUrl}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
              )}
              {!data.imageUrl && <Image className="text-gray-400" />}
            </div>
            <div className="w-1/2 h-full p-4 text-left">
              <p className="text-[#333333] text-lg">{data.category}</p>
              <p className="text-[#333333] text-lg font-semibold">
                {data.name}
              </p>
              <p className="text-[#333333] text-lg">
                {formatCurrency(parseFloat(data.price))}
              </p>
            </div>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer
        cancelTitle="Manter Produto"
        onCancel={onClose}
        isLoading={isPending}
        orientation="horizontal"
      >
        <button
          onClick={() => onDelete()}
          type="button"
          className="bg-[#D73035] disabled:bg-[#CCCCCC] disabled:cursor-not-allowed rounded-[48px] border-none text-white py-3 px-6"
        >
          {isPending ? <LoaderCircle size={24} className="animate-spin"/> :"Excluir produto"}
        </button>
      </Modal.Footer>
    </Modal.Root>
  );
}

export default RemoveProductModal;
