import Modal from "@/components/Modal";
import { MenuService } from "@/services/api/menu";
import { Categorie } from "@/types/Categorie";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { LoaderCircle } from "lucide-react";
import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import DeleteCategorieModalSkeleton from "./DeleteCategorieModalSkeleton";

const DeleteCategorieModal = lazy(() => import("./DeleteCategorieModal"));

interface EditCategorieModalProps {
  data: Categorie | null;
  isVisible: boolean;
  onClose: () => void;
  orgId: string;
}

function EditCategorieModal({
  isVisible,
  onClose,
  data,
  orgId
}: EditCategorieModalProps) {
  const queryClient = useQueryClient();
  const [emojiValue, setEmoji] = useState<string>("");
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [categoryName, setCategorieName] = useState<string>("");
  const handleDeleteModal = useCallback(
    () => setDeleteModal((prev) => !prev),
    []
  );

  const { editCategorie, isPending } = MenuService.editCategorie(
    () => {
      toast.success("Categoria editada com Sucesso !");
      queryClient.invalidateQueries({ queryKey: ["all_categories"] });
      onClose();
    },
    (error) => {
      const err = error as AxiosError<{message: string}>;
      toast.error(err.response?.data?.message);
      return;
    }
  );

  useEffect(() => {
    if (data && isVisible) {
      setEmoji(data.icon);
      setCategorieName(data.name);
    }
  }, [data, isVisible]);

  if (!data) {
    return null;
  }

  const onSave = () => {
    if (!categoryName) {
      toast.error("O nome da categoria é obrigatório");
      return;
    }
    editCategorie({ id: data._id, icon: emojiValue || "🥗", name: categoryName, org: orgId });
  };

  return (
    <>
      {deleteModal && (
        <Suspense
          fallback={<DeleteCategorieModalSkeleton isVisible={deleteModal} />}
        >
          <DeleteCategorieModal
            orgId={orgId}
            closeEditModal={onClose}
            isVisible={deleteModal}
            data={data}
            onClose={handleDeleteModal}
          />
        </Suspense>
      )}
      <Modal.Root size="sm" isVisible={isVisible}>
        <Modal.Header onClose={onClose}>
          <p className="text-[#333333] text-2xl font-semibold">
            Editar Categoria
          </p>
        </Modal.Header>

        <Modal.Body className="my-12">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <label htmlFor="emoji" className="text-[#333333]">
                Emoji
              </label>
              <input
                value={emojiValue}
                onChange={(e) => setEmoji(e.target.value)}
                id="emoji"
                type="text"
                className="p-4 border border-[#CCCCCC] rounded-md"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="categoria" className="text-[#333333]">
                Nome da Categoria
              </label>
              <input
                value={categoryName}
                onChange={(e) => setCategorieName(e.target.value)}
                id="categoria"
                type="text"
                placeholder="Ex: Lanches"
                className="p-4 border border-[#CCCCCC] rounded-md"
              />
            </div>
          </div>
        </Modal.Body>

        <Modal.CustomFooter>
          <div className="w-full flex justify-between">
            <button
              onClick={handleDeleteModal}
              type="button"
              className="disabled:opacity-50 disabled:cursor-not-allowed py-3 px-6 text-[#D73035] font-bold border-none"
            >
              Excluir Categoria
            </button>
            <button
              onClick={onSave}
              disabled={categoryName.length < 4 || !emojiValue || isPending}
              type="button"
              className="bg-[#D73035] disabled:bg-[#CCCCCC] disabled:cursor-not-allowed rounded-[48px] border-none text-white py-3 px-6"
            >
              {isPending ? (
                <LoaderCircle size={22} className="animate-spin" />
              ) : (
                "Salvar alterações"
              )}
            </button>
          </div>
        </Modal.CustomFooter>
      </Modal.Root>
    </>
  );
}

export default EditCategorieModal;
