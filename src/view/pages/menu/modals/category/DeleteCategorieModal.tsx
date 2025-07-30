import Modal from "@/components/Modal";
import { MenuService } from "@/services/api/menu";
import { Categorie } from "@/types/Categorie";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

interface DeleteCategorieModalProps {
  data: Categorie | null;
  isVisible: boolean;
  onClose: () => void;
  closeEditModal: () => void;
  orgId: string;
}

function DeleteCategorieModal({
  isVisible,
  onClose,
  data,
  closeEditModal,
  orgId
}: DeleteCategorieModalProps) {
  const queryClient = useQueryClient();

  const {mutateAsync:deleteCategorie, isPending } = useMutation({
    mutationFn: async (data: MenuService.DeleteCategorieInput) => {
      await MenuService.deleteCategorie(data);
    }
  })

  if (!data) {
    return null;
  }

  const onDelete = async () => {
    try {
      await deleteCategorie({id: data._id, orgId: orgId});
      toast.success("Categoria deletada com Sucesso !", {toastId: 'categoriaDeletadaSucessoId'});
      queryClient.invalidateQueries({ queryKey: ["all_categories"] });
      onClose();
      closeEditModal();
    } catch (error) {
      toast.error("Erro ao deletar a categoria", {toastId: 'categoriaDeletadaErroId'});
    }
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
