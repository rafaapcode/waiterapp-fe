import { formatCurrency } from "@/utils/formatCurrency";
import { Cell, ColumnDef } from "@tanstack/react-table";
import { EditIcon, Trash } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import TableComponent from "../Table/Table";
import { products } from "./data";
import MenuHeader from "./MenuHeader";
import EditProductModal from "./modals/products/EditProductModal";
import NewProductModal from "./modals/products/NewProductModal";

function ProductsTable() {
  const [newProductModal, setNewProductModal] = useState<boolean>(false);
  const [productIdToEdit, setProductIdToEdit] = useState<string | null>(null);

  const handleNewProductModal = useCallback(() => setNewProductModal(prev => !prev),[]);
  const handleProductIdToEdit = useCallback((id: string | null) => setProductIdToEdit(id),[]);

  const columns = useMemo((): ColumnDef<typeof products[0]>[] =>  [
    {
      accessorKey: "imageUrl",
      header: () => <p className="text-[#333333] font-semibold">Imagem</p>,
      cell: ({cell}: {cell: Cell<any, any>}) => <img src={cell.getValue()} alt="food image" className="w-14 rounded-md"/>,
      size: 10
    },
    {
      accessorKey: "name",
      header: () => <p className="text-[#333333] font-semibold">Nome</p>,
      size: 20
    },
    {
      accessorKey: "categoria",
      header: () => <p className="text-[#333333] font-semibold">Categoria</p>,
      size: 25
    },
    {
      accessorKey: "preco",
      header: () => <p className="text-[#333333] font-semibold">Preço</p>,
      cell: ({cell}: {cell: Cell<any, any>}) => <p>{formatCurrency(Number(cell.getValue()))}</p>,
      size: 36
    },
    {
      id: 'actions',
      header: () => <p className="text-[#333333] font-semibold">Ações</p>,
      cell: ({row}) => {
        const { id } = row.original
        return (
          <div className="flex gap-4">
            <button onClick={() => handleProductIdToEdit(id)} className="text-[#666666] hover:text-[#9e9e9e] transition-all duration-200">
              <EditIcon size={20} />
            </button>
            <button className="text-red-600 hover:text-red-800 transition-all duration-200">
              <Trash size={20} />
            </button>
          </div>
        );
      },
    },
  ],[]);


  return (
    <div>
      {
        newProductModal && <NewProductModal isVisible={newProductModal} onClose={handleNewProductModal}/>
      }
      {
        productIdToEdit && <EditProductModal isVisible={ !!productIdToEdit } onClose={() => handleProductIdToEdit(null)}/>
      }
      <MenuHeader onClick={handleNewProductModal} title="Novo Produto"/>
      <div className="mt-2 max-h-full overflow-y-auto">
        <TableComponent data={products} columns={columns}/>
      </div>
    </div>
  )
}

export default ProductsTable
