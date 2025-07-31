import Input from "@/components/atoms/Input";
import Modal from "@/components/Modal";
import { Categorie } from "@/types/Categorie";
import { LoaderCircle } from "lucide-react";
import { lazy, Suspense } from "react";
import DeleteCategorieModalSkeleton from "../../../skeletons/category/DeleteCategorieModalSkeleton";
import { useEditCategorieController } from "./useEditCategorieController";

const DeleteCategorieModal = lazy(
  () => import("../deleteCategorieModal/DeleteCategorieModal")
);

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
  orgId,
}: EditCategorieModalProps) {
  if (!data) {
    return null;
  }
  const {
    deleteModal,
    handleDeleteModal,
    isPending,
    onSubmit,
    isValid,
    errors,
    register,
  } = useEditCategorieController({
    data,
    isVisible,
    onClose,
    orgId,
  });

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

        <Modal.Body className="mt-12">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <Input
                placeholder="Emoji"
                error={errors.icon?.message}
                {...register("icon")}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Input
                placeholder="Nome da Categoria"
                error={errors.name?.message}
                {...register("name")}
              />
            </div>
          </div>
          <div className="w-full flex justify-between mt-10">
            <button
              onClick={handleDeleteModal}
              type="button"
              className="disabled:opacity-50 disabled:cursor-not-allowed py-3 px-6 text-[#D73035] font-bold border-none"
            >
              Excluir Categoria
            </button>
            <button
              onClick={onSubmit}
              disabled={!isValid || isPending}
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
        </Modal.Body>
      </Modal.Root>
    </>
  );
}

export default EditCategorieModal;
