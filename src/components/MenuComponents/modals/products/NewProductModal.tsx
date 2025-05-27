import Modal from "@/components/Modal";
import { apiclient, uploadImage } from "@/utils/apiClient";
import { verifyImageIntegrity } from "@/utils/verifyImage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import ProductForm from "./forms/ProductForm";
import { createProductSchema } from "./validations/createProductSchema";

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
}

function NewProductModal({ isVisible, onClose }: NewProductModalProps) {
  const queryClient = useQueryClient();
  const [product, setProduct] = useState<NewProductData>({
    image: null,
    category: "",
    description: "",
    imageUrl: "",
    ingredients: [],
    name: "",
    price: 0,
  });

  const { mutateAsync: createProductAsync, isPending } = useMutation({
    mutationFn: async (data: NewProductData) => {
      const { image, ...productData } = { ...data };

      if (!data.image) {
        productData.imageUrl =
          "https://coffective.com/wp-content/uploads/2018/06/default-featured-image.png.jpg";
      } else {
        try {
          // Verfify if the image is a virus
          const isInfected = await verifyImageIntegrity(data.image);

          if(isInfected) {
            throw new Error("Imagem infectada !");
          }

          // Upload image
          const { data: responseImageUrl } = await uploadImage.postForm("", {
            image: data.image,
          });
          productData.imageUrl = responseImageUrl.url;
        } catch (error) {
          toast.error("Não foi possível realizar o upload da sua imagem !");
          productData.imageUrl =
            "https://coffective.com/wp-content/uploads/2018/06/default-featured-image.png.jpg";
        }
      }
      const isValid = createProductSchema.safeParse(productData);

      if (!isValid.success) {
        console.log(isValid.error.errors);
        const msgs = isValid.error.issues.map((iss) => iss.message);
        throw new Error(msgs.join(" , "));
      }
      await apiclient.post("/product", productData);
    },
    onSuccess: () => {
      toast.success("Produto criado com sucesso !");
      queryClient.invalidateQueries({ queryKey: ["list_all_products"] });
      onClose();
    },
    onError: (error: any) => {
      if(error instanceof Error) {
        toast.error(error.message);
      } else {
        const err = error as AxiosError<{message: string}>;
        toast.error(err.response?.data?.message);
      }
      return;
    },
  });

  const onSave = () => createProductAsync(product);

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
