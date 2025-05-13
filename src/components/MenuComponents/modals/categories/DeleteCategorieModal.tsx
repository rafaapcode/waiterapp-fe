import Modal from "@/components/Modal";
import { Categorie } from "@/types/Categorie";
import { apiclient } from "@/utils/apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

interface DeleteCategorieModalProps {
  data: Categorie | null;
  isVisible: boolean;
  onClose: () => void;
  closeEditModal: () => void;
}

function DeleteCategorieModal({
  isVisible,
  onClose,
  data,
  closeEditModal,
}: DeleteCategorieModalProps) {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (id: string) => await apiclient.delete(`/category/${id}`),
    onSuccess: () => {
      toast.success("Categoria deletada com Sucesso !");
      queryClient.invalidateQueries({ queryKey: ["all_categories"] });
      onClose();
      closeEditModal();
    },
    onError: (error) => {
      const err = error as AxiosError;
      if (err.status === 404) {
        toast.warning("Id da categoria não encontrada !");
      } else {
        toast.error("Erro ao encontrar o ID da categoria");
      }
      return;
    },
  });

  if (!data) {
    return null;
  }

  const onDelete = async () => {
    mutateAsync(data._id)
  };

  return (
    <Modal.Root size="sm" isVisible={isVisible} priority>
      <Modal.Header onClose={onClose}>
        <p className="text-[#333333] text-2xl font-semibold">
          Excluir Categoria
        </p>
      </Modal.Header>

      <Modal.Body className="my-12">
        <div className="flex flex-col  items-center justify-center gap-8">
          <p className="text-[#666666]">
            Tem certeza que deseja excluir a categoria ?
          </p>
          <p className="px-6 py-2 shadow border border-[#CCCCCC] rounded-full">
            {data.icon} {data.name}
          </p>
        </div>
      </Modal.Body>

      <Modal.Footer
        cancelTitle="Manter Categoria"
        onCancel={onClose}
        isLoading={isPending}
        orientation="horizontal"
        successTitle="Excluir categoria"
        onClick={onDelete}
      />
    </Modal.Root>
  );
}

export default DeleteCategorieModal;
