import { formatCurrency } from "@/utils/formatCurrency";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Eye, Trash } from "lucide-react";
import TableComponent from "../Table/Table";
import { products } from "./data";
import MenuHeader from "./MenuHeader";

function ProductsTable() {
  const table = useReactTable({
    data: products,
    columns: [
      {
        accessorKey: "imageUrl",
        header: () => <p className="text-[#333333] font-semibold">Imagem</p>,
        cell: ({cell}) => <img src={cell.getValue()} alt="food image" className="w-14 rounded-md"/>
      },
      {
        accessorKey: "name",
        header: () => <p className="text-[#333333] font-semibold">Nome</p>,
      },
      {
        accessorKey: "categoria",
        header: () => <p className="text-[#333333] font-semibold">Categoria</p>,
      },
      {
        accessorKey: "preco",
        header: () => <p className="text-[#333333] font-semibold">Preço</p>,
        cell: ({cell}) => <p>{formatCurrency(Number(cell.getValue()))}</p>,
      },
      {
        id: 'actions',
        header: () => <p className="text-[#333333] font-semibold">Ações</p>,
        cell: () => {
          return (
            <div className="flex gap-4">
              <button className="text-[#666666] hover:text-[#9e9e9e] transition-all duration-200">
                <Eye size={20} />
              </button>
              <button className="text-red-600 hover:text-red-800 transition-all duration-200">
                <Trash size={20} />
              </button>
            </div>
          );
        },
      },
    ],
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <MenuHeader onClick={() => {}} title="Produtos"/>
      <div className="mt-2 max-h-full overflow-y-auto">
        <TableComponent tableconfig={table}/>
      </div>
    </div>
  )
}

export default ProductsTable
