import Modal from "@/components/Modal";
import { useUser } from "@/context/user";
import { MenuService } from "@/services/api/menu";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import ProductForm from "./forms/ProductForm";

interface NewProductModalProps {
  isVisible: boolean;
  onClose: () => void;
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

function NewProductModal({ isVisible, onClose }: NewProductModalProps) {
  const user = useUser((state: any) => state.user);
  const queryClient = useQueryClient();
  const [product, setProduct] = useState<NewProductData>({
    image: null,
    category: "",
    description: "",
    imageUrl: "",
    ingredients: [],
    name: "",
    price: 0,
    org: '',
    userId: ''
  });

  const { createProduct, isPending } = MenuService.createProduct(
    () => {
      toast.success("Produto criado com sucesso !");
      queryClient.invalidateQueries({ queryKey: ["list_all_products"] });
      onClose();
    },
    (error: any) => {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        const err = error as AxiosError<{ message: string }>;
        toast.error(err.response?.data?.message);
      }
      return;
    }
  );

  const onSave = () => createProduct({...product, userId: user});

  return (
    <Modal.Root size="lg" isVisible={isVisible}>
      <Modal.Header onClose={onClose}>
        <p className="text-[#333333] text-2xl font-semibold">Novo Produto</p>
      </Modal.Header>

      <Modal.Body className="my-2">
        <ProductForm product={product} setProduct={setProduct} />
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
