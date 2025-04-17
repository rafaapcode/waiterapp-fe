import { Cell, ColumnDef } from "@tanstack/react-table";
import { EditIcon, Trash } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import TableComponent from "../Table/Table";
import { categories } from "./data";
import MenuHeader from "./MenuHeader";
import EditCategorieModal from "./modals/categories/EditCategorieModal";
import CategorieModal from "./modals/categories/NewCategorieModal";

function CategoriesTable() {
  const [newCategorieModal, setNewCategorieModal] = useState<boolean>(false);
  const [editCategorieModal, setEditCategorieModal] = useState<boolean>(false);

  const handleNewCategorieModal = useCallback(
    () => setNewCategorieModal((prev) => !prev),
    []
  );
  const handleEditCategorieModal = useCallback(
    () => setEditCategorieModal((prev) => !prev),
    []
  );

  const columns = useMemo(
    (): ColumnDef<{ emoji: string; name: string }>[] => [
      {
        accessorKey: "emoji",
        header: () => (
          <p className="text-[#333333] font-semibold w-fit">Emoji</p>
        ),
        cell: ({ cell }: { cell: Cell<any, any> }) => (
          <p className=" w-fit">{cell.getValue()}</p>
        ),
        size: 10,
      },
      {
        accessorKey: "name",
        header: () => (
          <p className="text-[#333333] font-semibold flex-1">Nome</p>
        ),
        size: 80,
      },
      {
        id: "actions",
        header: () => <p className="text-[#333333] font-semibold">Ações</p>,
        cell: ({ row }) => {
          return (
            <>
              <EditCategorieModal
                data={row.original}
                isVisible={editCategorieModal}
                onClose={handleEditCategorieModal}
              />
              <div className="flex gap-6">
                <button
                  onClick={handleEditCategorieModal}
                  className="text-[#666666] hover:text-[#9e9e9e] transition-all duration-200"
                >
                  <EditIcon size={20} />
                </button>
                <button className="text-red-600 hover:text-red-800 transition-all duration-200">
                  <Trash size={20} />
                </button>
              </div>
            </>
          );
        },
      },
    ],
    []
  );

  return (
    <div>
      <CategorieModal
        isVisible={newCategorieModal}
        onClose={handleNewCategorieModal}
      />
      <MenuHeader onClick={handleNewCategorieModal} title="Nova Categoria" />
      <div className="mt-2 max-h-full overflow-y-auto">
        <TableComponent data={categories} columns={columns} />
      </div>
    </div>
  );
}

export default CategoriesTable;
