import Modal from "@/components/Modal";
import { lazy, Suspense, useCallback, useState } from "react";
import EditProductForm from "./forms/EditProductForm";
import RemoveProductModalSkeleton from "./skeletons/RemoveProductModalSkeleton";

const RemoveProductModal = lazy(() => import("./RemoveProductModal"));

interface EditProductModalProps {
  isVisible: boolean;
  onClose: () => void;
  productid: string;
}

function EditProductModal({ isVisible, onClose, productid }: EditProductModalProps) {
  const [removeProductModal, setRemoveProductModal] = useState<boolean>(false);

  const toggleRemoveProductModal = useCallback(
    () => setRemoveProductModal((prev) => !prev),
    []
  );

  return (
    <>
      {
        removeProductModal && (
          <Suspense fallback={<RemoveProductModalSkeleton isVisible={removeProductModal}/>}>
             <RemoveProductModal data={{imageUrl: "", category: "🍕 Pizza",name: "pizza", price: "12.00"}}  isVisible={removeProductModal} onClose={toggleRemoveProductModal} />
          </Suspense>
        )
      }
      <Modal.Root size="lg" isVisible={isVisible}>
        <Modal.Header onClose={onClose}>
          <p className="text-[#333333] text-2xl font-semibold">
            Editar Produto
          </p>
        </Modal.Header>

        <Modal.Body className="my-4">
          <EditProductForm productId={productid} />
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
