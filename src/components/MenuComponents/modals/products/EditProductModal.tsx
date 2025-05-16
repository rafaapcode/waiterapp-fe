import Modal from "@/components/Modal";
import { Products } from "@/types/Products";
import { apiclient } from "@/utils/apiClient";
import { useQuery } from "@tanstack/react-query";
import { lazy, Suspense, useCallback, useState } from "react";
import { toast } from "react-toastify";
import EditProductForm from "./forms/EditProductForm";
import RemoveProductModalSkeleton from "./skeletons/RemoveProductModalSkeleton";

const RemoveProductModal = lazy(() => import("./RemoveProductModal"));

interface EditProductModalProps {
  isVisible: boolean;
  onClose: () => void;
  productid: string;
}

function EditProductModal({
  isVisible,
  onClose,
  productid,
}: EditProductModalProps) {
  const [removeProductModal, setRemoveProductModal] = useState<boolean>(false);

  const toggleRemoveProductModal = useCallback(
    () => setRemoveProductModal((prev) => !prev),
    []
  );

  const { data } = useQuery({
    queryKey: ["get_product_info_edit_form", { productid }],
    queryFn: async () => {
      try {
        const { data } = await apiclient.get(`/product/${productid}`);

        return data as Products;
      } catch (error: any) {
        console.log(error.message);
        toast.error("Erro ao buscar o Produto");
        onClose();
      }
    },
  });

  return (
    <>
      {removeProductModal && data && (
        <Suspense
          fallback={
            <RemoveProductModalSkeleton isVisible={removeProductModal} />
          }
        >
          <RemoveProductModal
            data={{
              id: data._id,
              imageUrl: data.imageUrl,
              category: data.category.name,
              name: data.name,
              price: `${data.price}`,
            }}
            isVisible={removeProductModal}
            onClose={toggleRemoveProductModal}
            editModalClose={onClose}
          />
        </Suspense>
      )}
      <Modal.Root size="lg" isVisible={isVisible}>
        <Modal.Header onClose={onClose}>
          <p className="text-[#333333] text-2xl font-semibold">
            Editar Produto
          </p>
        </Modal.Header>

        <Modal.Body className="my-4">
          {!data ? (
            <div>
              <p>Nenhum produto encontrado !</p>
            </div>
          ) : (
            <EditProductForm data={data} />
          )}
        </Modal.Body>

        <Modal.CustomFooter>
          <div className="w-full flex justify-between">
            <button
              onClick={toggleRemoveProductModal}
              type="button"
              className="disabled:bg-[#CCCCCC] disabled:cursor-not-allowed rounded-[48px] border-none text-red-500 px-6 font-semibold"
            >
              Excluir Produto
            </button>
            <button
              // onClick={onSave}
              // disabled={categoryName.length < 4}
              type="button"
              className="bg-[#D73035] disabled:bg-[#CCCCCC] disabled:cursor-not-allowed rounded-[48px] border-none text-white py-3 px-6"
            >
              Salvar alterações
            </button>
          </div>
        </Modal.CustomFooter>
      </Modal.Root>
    </>
  );
}

export default EditProductModal;
