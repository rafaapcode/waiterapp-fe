import { Cell } from "@tanstack/react-table";
import { EditIcon, Trash } from "lucide-react";
import { useMemo } from "react";
import TableComponent from "../Table/Table";
import { categories } from "./data";
import MenuHeader from "./MenuHeader";

function CategoriesTable() {
  const columns = useMemo(
    () => [
      {
        accessorKey: "emoji",
        header: () => (
          <p className="text-[#333333] font-semibold w-fit">Emoji</p>
        ),
        cell: ({ cell }: { cell: Cell<any, any> }) => (
          <p className=" w-fit">{cell.getValue()}</p>
        ),
      },
      {
        accessorKey: "name",
        header: () => (
          <p className="text-[#333333] font-semibold flex-1">Nome</p>
        ),
      },
      {
        id: "actions",
        header: () => <p className="text-[#333333] font-semibold">Ações</p>,
        cell: () => {
          return (
            <div className="flex gap-6">
              <button className="text-[#666666] hover:text-[#9e9e9e] transition-all duration-200">
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

  return (
    <div>
      <MenuHeader onClick={() => {}} title="Produtos" />
      <div className="mt-2 max-h-full overflow-y-auto">
        <TableComponent data={categories} columns={columns} />
      </div>
    </div>
  );
}

export default CategoriesTable;
