import createTable from "@/hooks/createTable";
import { Categorie } from "@/types/Categorie";
import { Cell, ColumnDef } from "@tanstack/react-table";
import { EditIcon, Trash } from "lucide-react";
import { lazy, Suspense, useCallback, useMemo, useState } from "react";
import Table from "../Table";
import { categories } from "./data";
import MenuHeader from "./MenuHeader";
import EditCategorieModalSkeleton from "./modals/categories/EditCategorieModalSkeleton";
import NewCategorieModalSkeleton from "./modals/categories/NewCategorieModalSkeleton";

const CategorieModal = lazy(() => import("./modals/categories/NewCategorieModal"));
const EditCategorieModal = lazy(() => import("./modals/categories/EditCategorieModal"));

function CategoriesTable() {
  const [newCategorieModal, setNewCategorieModal] = useState<boolean>(false);
  const [editCategorieModal, setEditCategorieModal] = useState<Categorie | null>(null);

  const handleNewCategorieModal = useCallback(
    () => setNewCategorieModal((prev) => !prev),
    []
  );
  const handleEditCategorieModal = useCallback(
    (data: Categorie | null) => setEditCategorieModal(data),
    []
  );

  const columns = useMemo(
    (): ColumnDef<{ id: string; emoji: string; name: string }>[] => [
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
            <div className="flex gap-6">
              <button
                onClick={() => handleEditCategorieModal(row.original)}
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

  const table = createTable(categories, columns);

  return (
    <div>
      {
        newCategorieModal && <Suspense fallback={<NewCategorieModalSkeleton isVisible={newCategorieModal} />}>
          <CategorieModal
            isVisible={newCategorieModal}
            onClose={handleNewCategorieModal}
          />
        </Suspense>
      }
      {
        editCategorieModal && <Suspense fallback={<EditCategorieModalSkeleton isVisible={!!editCategorieModal} />}>
          <EditCategorieModal
            data={editCategorieModal}
            isVisible={!!editCategorieModal}
            onClose={() => handleEditCategorieModal(null)}
          />
        </Suspense>
      }
      <MenuHeader quantity={categories.length ?? 0} onClick={handleNewCategorieModal} title="Nova Categoria" />
      <div className="mt-2 max-h-full overflow-y-auto">
        <Table.Root table={table}>
          <Table.Header />
          <Table.Body />
        </Table.Root>
      </div>
    </div>
  );
}

export default CategoriesTable;
