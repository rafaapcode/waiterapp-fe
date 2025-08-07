import Modal from "@/components/Modal";
import { LoaderCircle } from "lucide-react";
import ProductForm from "./forms/ProductForm";

interface NewProductModalProps {
  isVisible: boolean;
  onClose: () => void;
  orgId: string;
  userId: string;
}
export interface NewProductData {
  image: File | null;
  imageUrl: string;
  name: string;
  description: string;
  ingredients: string[];
  category: string;
  price: number;
  org: string;
  userId: string;
}

function NewProductModal({ isVisible, onClose, orgId, userId }: NewProductModalProps) {
  return (
    <Modal.Root size="lg" isVisible={isVisible}>
      <Modal.Header onClose={onClose}>
        <p className="text-[#333333] text-2xl font-semibold">Novo Produto</p>
      </Modal.Header>

      <Modal.Body className="my-2">
        <ProductForm orgId={orgId} product={product} setProduct={setProduct} />
      </Modal.Body>

      <Modal.CustomFooter>
        <div className="w-full flex justify-end">
          <button
            onClick={onSave}
            disabled={isPending}
            type="button"
            className="bg-[#D73035] disabled:bg-[#CCCCCC] disabled:cursor-not-allowed rounded-[48px] border-none text-white py-3 px-6"
          >
            {isPending ? (
              <LoaderCircle size={26} className="animate-spin" />
            ) : (
              "Salvar alterações"
            )}
          </button>
        </div>
      </Modal.CustomFooter>
    </Modal.Root>
  );
}

export default NewProductModal;
