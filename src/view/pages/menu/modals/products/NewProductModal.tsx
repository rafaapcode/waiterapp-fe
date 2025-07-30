import Modal from "@/components/Modal";
import { MenuService } from "@/services/api/menu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import ProductForm from "../../components/ProductForm";

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
  const queryClient = useQueryClient();
  const [product, setProduct] = useState<NewProductData>({
    image: null,
    category: "",
    description: "",
    imageUrl: "",
    ingredients: [],
    name: "",
    price: 0,
    org: orgId,
    userId: ''
  });
  const {mutateAsync: createProduct, isPending} = useMutation({
    mutationFn: async (data: MenuService.CreateProductInput) => {
      await MenuService.createProduct(data);
    }
  })

  const onSave = async () => {
    try {
      await createProduct({...product, userId: userId, org: orgId});
      toast.success("Produto criado com sucesso !", {toastId: 'criarProdutoSucessoId'});
      queryClient.invalidateQueries({ queryKey: ["list_all_products"] });
      onClose();
    } catch (error) {
      toast.error("Erro ao criar o produto", {toastId: 'criarProdutoErroId'});
    }
  }

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
