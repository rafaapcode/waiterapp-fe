import TableComponent from "@/components/molecule/Table";
import createTable from "@/hooks/createTable";
import { formatCurrency } from "@/utils/formatCurrency";
import { Cell, ColumnDef } from "@tanstack/react-table";
import { EditIcon, LoaderCircle, Trash } from "lucide-react";
import { lazy, Suspense, useMemo } from "react";
import NewProductModalSkeleton from "../../skeletons/products/NewProductModalSkeleton";
import MenuHeader from "../MenuHeader";
import { useProductsController } from "./useProductsController";

const NewProductModal = lazy(() => import("../../modals/products/NewProductModal"));
const EditProductModal = lazy(
  () => import("../../modals/products/editProductModal/EditProductModal")
);

interface ProductsForFe {
  id: string;
  imageUrl: string;
  name: string;
  categoria: string;
  preco: number;
}

function ProductsTable() {
  const {
    handleDeleteProduct,
    products,
    deletingProduct,
    isFetchingProducts,
    handleNewProductModal,
    handleProductIdToEdit,
    newProductModal,
    productIdToEdit,
    orgId
  } = useProductsController();

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
              <button
                onClick={() =>
                  handleDeleteProduct(row.original.id)
                }
                className="text-red-600 hover:text-red-800 transition-all duration-200"
              >
                {deletingProduct &&  <LoaderCircle size={20} className="animate-spin text-red-500" />}
                {!deletingProduct && <Trash size={20} />}
              </button>
            </div>
          );
        },
      },
    ],
    []
  );

  const table = createTable(products || [], columns);

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
            orgId={orgId}
            productid={productIdToEdit}
            isVisible={!!productIdToEdit}
            onClose={() => handleProductIdToEdit(null)}
          />
        </Suspense>
      )}

      <MenuHeader
        quantity={products?.length}
        onClick={handleNewProductModal}
        title="Produtos"
        btnTitle="Novo Produto"
      />

      <div className="mt-2 max-h-full overflow-y-auto">
        {isFetchingProducts ? (
          <div className="w-full mt-4 p-4 flex justify-center items-center">
            <LoaderCircle size={26} className="animate-spin" />
          </div>
        ) : (
          <TableComponent table={table}>
            <TableComponent.Container>
              <TableComponent.Header />
              <TableComponent.Body />
            </TableComponent.Container>
          </TableComponent>
        )}
      </div>
    </div>
  );
}

export default ProductsTable;
