import createTable from "@/hooks/createTable";
import { Products } from "@/types/Products";
import { apiclient } from "@/utils/apiClient";
import { formatCurrency } from "@/utils/formatCurrency";
import { useQuery } from "@tanstack/react-query";
import { Cell, ColumnDef } from "@tanstack/react-table";
import { EditIcon, LoaderCircle, Trash } from "lucide-react";
import { lazy, Suspense, useCallback, useMemo, useState } from "react";
import Table from "../Table";
import MenuHeader from "./MenuHeader";
import NewProductModalSkeleton from "./modals/products/skeletons/NewProductModalSkeleton";

const NewProductModal = lazy(() => import("./modals/products/NewProductModal"));
const EditProductModal = lazy(
  () => import("./modals/products/EditProductModal")
);

interface ProductsForFe {
  id: string;
  imageUrl: string;
  name: string;
  categoria: string;
  preco: number;
}

function ProductsTable() {
  const [newProductModal, setNewProductModal] = useState<boolean>(false);
  const [productIdToEdit, setProductIdToEdit] = useState<string | null>(null);

  const handleNewProductModal = useCallback(
    () => setNewProductModal((prev) => !prev),
    []
  );
  const handleProductIdToEdit = useCallback(
    (id: string | null) => setProductIdToEdit(id),
    []
  );

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["list_all_products"],
    queryFn: async (): Promise<ProductsForFe[]> => {
      try {
        const { data } = await apiclient.get("/product");
        const products = data as Products[];

        return products.map((product) => ({
          id: product._id,
          categoria: product.category.name,
          imageUrl: product.imageUrl,
          name: product.name,
          preco: product.discount ? product.priceInDiscount : product.price,
        }));
      } catch (error) {
        return [];
      }
    },
  });

  const columns = useMemo(
    (): ColumnDef<ProductsForFe>[] => [
      {
        accessorKey: "imageUrl",
        header: () => <p className="text-[#333333] font-semibold">Imagem</p>,
        cell: ({ cell }: { cell: Cell<any, any> }) => (
          <img
            src={cell.getValue()}
            alt="food image"
            className="w-14 rounded-md"
          />
        ),
        size: 10,
      },
      {
        accessorKey: "name",
        header: () => <p className="text-[#333333] font-semibold">Nome</p>,
        size: 20,
      },
      {
        accessorKey: "categoria",
        header: () => <p className="text-[#333333] font-semibold">Categoria</p>,
        size: 25,
      },
      {
        accessorKey: "preco",
        header: () => <p className="text-[#333333] font-semibold">Preço</p>,
        cell: ({ cell }: { cell: Cell<any, any> }) => (
          <p>{formatCurrency(Number(cell.getValue()))}</p>
        ),
        size: 36,
      },
      {
        id: "actions",
        header: () => <p className="text-[#333333] font-semibold">Ações</p>,
        cell: ({ row }) => {
          const { id } = row.original;
          return (
            <div className="flex gap-4">
              <button
                onClick={() => handleProductIdToEdit(id)}
                className="text-[#666666] hover:text-[#9e9e9e] transition-all duration-200"
              >
                <EditIcon size={20} />
              </button>
              <button className="text-red-600 hover:text-red-800 transition-all duration-200">
                <Trash size={20} />
              </button>
            </div>
          );
        },
      },
    ],
    []
  );

  const table = createTable(data || [], columns);

  return (
    <div>
      {newProductModal && (
        <Suspense
          fallback={<NewProductModalSkeleton isVisible={newProductModal} />}
        >
          <NewProductModal
            isVisible={newProductModal}
            onClose={handleNewProductModal}
          />
        </Suspense>
      )}
      {productIdToEdit && (
        <Suspense
          fallback={<NewProductModalSkeleton isVisible={!!productIdToEdit} />}
        >
          <EditProductModal
            productid={productIdToEdit}
            isVisible={!!productIdToEdit}
            onClose={() => handleProductIdToEdit(null)}
          />
        </Suspense>
      )}
      <MenuHeader quantity={data?.length} onClick={handleNewProductModal} title="Produtos" btnTitle="Novo Produto" />
      <div className="mt-2 max-h-full overflow-y-auto">
        {isLoading || isFetching ? (
          <LoaderCircle
            size={26}
            className="animate-spin"
          />
        ) : (
          <Table.Root table={table}>
            <Table.Container>
              <Table.Header />
              <Table.Body />
            </Table.Container>
          </Table.Root>
        )}
      </div>
    </div>
  );
}

export default ProductsTable;
