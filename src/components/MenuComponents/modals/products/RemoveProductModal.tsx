import Modal from "@/components/Modal";
import { apiclient } from "@/utils/apiClient";
import { formatCurrency } from "@/utils/formatCurrency";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
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
}

function RemoveProductModal({
  isVisible,
  onClose,
  data,
  editModalClose
}: RemoveProductModalProps) {
  const queryClient = useQueryClient();

  const { mutateAsync: DeleteProduct, isPending } = useMutation({
    mutationFn: async (id: string) => await apiclient.delete(`/product/${id}`),
    onSuccess: () => {
      toast.success("Produto deletado com Sucesso");
      queryClient.invalidateQueries({ queryKey: ["list_all_products"] });
      onClose();
      editModalClose();
    },
    onError: (error) => {
      const err = error as AxiosError;
      if (err.status === 404) {
        toast.warning("Produto não encontrado !");
      } else {
        toast.error("Erro ao encontrar o ID do registro");
      }
      return;
    },
  });

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
          onClick={() => DeleteProduct(data.id)}
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
