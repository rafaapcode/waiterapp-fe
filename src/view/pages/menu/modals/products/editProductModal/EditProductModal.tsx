import Modal from "@/components/Modal";
import { MenuService } from "@/services/api/menu";
import { apiclient, uploadImage } from "@/utils/apiClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { lazy, Suspense, useCallback, useState } from "react";
import { toast } from "react-toastify";
import EditProductForm from "../../../components/EditProductForm";
import NewProductModalSkeleton from "../../../skeletons/products/NewProductModalSkeleton";
import RemoveProductModalSkeleton from "../../../skeletons/products/RemoveProductModalSkeleton";
import { updateProductSchema } from "../../../validations/updateProductSchema";

const RemoveProductModal = lazy(() => import("../removeProductModal/RemoveProductModal"));

export interface ProductFieldsChanged {
  ingredients: string[];
  newIngredients: string[];
  image: File | null;
  description: string;
  name: string;
  discount: boolean;
  priceInDiscount: number;
  imageUrl: string;
  price: number;
}

interface EditProductModalProps {
  isVisible: boolean;
  onClose: () => void;
  productid: string;
  orgId: string;
}

function EditProductModal({
  isVisible,
  onClose,
  productid,
  orgId
}: EditProductModalProps) {
  const queryClient = useQueryClient();
  const [removeProductModal, setRemoveProductModal] = useState<boolean>(false);
  const [product, setProduct] = useState<ProductFieldsChanged>({
    description: "",
    discount: false,
    image: null,
    ingredients: [],
    name: "",
    priceInDiscount: 0,
    imageUrl: "",
    newIngredients: [],
    price: 0,
  });

  const toggleRemoveProductModal = useCallback(
    () => setRemoveProductModal((prev) => !prev),
    []
  );

  // const { data, isLoading, isFetching } = MenuService.getInfoProduct({productId: productid, orgId: orgId}, onClose, (data) => setProduct(data));
  const {data, isFetching} = useQuery({
    queryKey: ['getInfoProduct', {productid, orgId}],
    queryFn: async () => await MenuService.getInfoProduct({orgId, productId: productid})
  });

  const { mutateAsync: editProductMutation, isPending } = useMutation({
    mutationFn: async (data: ProductFieldsChanged) => {
      const productDataUpdated = {
        description: data.description,
        discount: data.discount,
        ingredients:
          data.newIngredients.length > 0
            ? data.newIngredients
            : data.ingredients,
        name: data.name,
        priceInDiscount: data.priceInDiscount,
        imageUrl: data.imageUrl,
        price: data.price,
      };

      const isValid = updateProductSchema.safeParse(productDataUpdated);

      if (!isValid.success) {
        const msgs = isValid.error.issues.map((iss) => iss.message);
        throw new Error(msgs.join(" , "));
      }

      if (data.image) {
        try {
          // Upload  image
          const { data: responseImageUrl } = await uploadImage.postForm("", {
            image: data.image,
          });
          productDataUpdated.imageUrl = responseImageUrl.url;
        } catch (error: any) {
          if(error.message === "Imagem infectada !") {
            toast.error("Sua imagem pode estar infectada !");
            productDataUpdated.imageUrl = data.imageUrl;
          } else {
            toast.error("Não foi possível realizar o upload da sua imagem !");
            productDataUpdated.imageUrl = data.imageUrl;
          }
        }
      }

      await apiclient.put(`/product/${productid}`, productDataUpdated);
    },
    onSuccess: () => {
      toast.success("Produto atualizado com sucesso !");
      queryClient.invalidateQueries({ queryKey: ["list_all_products"] });
      queryClient.invalidateQueries({
        queryKey: ["history_orders", { page: 1 }],
      });
      onClose();
    },
    onError: (error) => {
      if(error instanceof Error) {
        toast.error(error.message);
      } else {
        const err = error as AxiosError<{message: string}>;
        toast.error(err.response?.data?.message);
      }
      return;
    },
  });

  const onSave = () => {
    editProductMutation(product);
  };

  return (
    <>
      {removeProductModal && data && (
        <Suspense
          fallback={
            <RemoveProductModalSkeleton isVisible={removeProductModal} />
          }
        >
          <RemoveProductModal
            orgId={orgId}
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
          ) : isFetching ? (
            <NewProductModalSkeleton isVisible={isFetching} />
          ) : (
            <EditProductForm product={product} setProduct={setProduct} />
          )}
        </Modal.Body>
      </Modal.Root>
    </>
  );
}

export default EditProductModal;
