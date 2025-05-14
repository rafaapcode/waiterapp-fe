import createTable from "@/hooks/createTable";
import { Categorie } from "@/types/Categorie";
import { apiclient } from "@/utils/apiClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Cell,
  ColumnDef,
  getFilteredRowModel,
  TableOptions,
} from "@tanstack/react-table";
import { AxiosError } from "axios";
import { EditIcon, Trash } from "lucide-react";
import { lazy, Suspense, useCallback, useMemo, useState } from "react";
import { toast } from "react-toastify";
import Table from "../Table";
import InputFilter from "../Table/InputFilter";
import MenuHeader from "./MenuHeader";
import EditCategorieModalSkeleton from "./modals/categories/EditCategorieModalSkeleton";
import NewCategorieModalSkeleton from "./modals/categories/NewCategorieModalSkeleton";

const CategorieModal = lazy(
  () => import("./modals/categories/NewCategorieModal")
);
const EditCategorieModal = lazy(
  () => import("./modals/categories/EditCategorieModal")
);

function CategoriesTable() {
  const queryClient = useQueryClient();
  const [newCategorieModal, setNewCategorieModal] = useState<boolean>(false);
  const [editCategorieModal, setEditCategorieModal] =
    useState<Categorie | null>(null);

  const handleNewCategorieModal = useCallback(
    () => setNewCategorieModal((prev) => !prev),
    []
  );
  const handleEditCategorieModal = useCallback(
    (data: Categorie | null) => setEditCategorieModal(data),
    []
  );

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (id: string) => await apiclient.delete(`/category/${id}`),
    onSuccess: () => {
      toast.success("Categoria deletada com Sucesso !");
      queryClient.invalidateQueries({ queryKey: ["all_categories"] });
    },
    onError: (error) => {
      const err = error as AxiosError;
      if (err.status === 404) {
        toast.warning("Id da categoria não encontrada !");
      } else {
        toast.error("Erro ao encontrar o ID da categoria");
      }
      return;
    },
  });

  const { data } = useQuery({
    queryKey: ["all_categories"],
    staleTime: Infinity,
    queryFn: async (): Promise<Categorie[]> => {
      try {
        const { data } = await apiclient.get("/category/categories");
        return data as Categorie[];
      } catch (error: any) {
        console.log(error.response);
        return [];
      }
    },
  });

  const columns = useMemo(
    (): ColumnDef<{ _id: string; icon: string; name: string }>[] => [
      {
        accessorKey: "icon",
        header: () => (
          <p className="text-[#333333] font-semibold w-fit">Emoji</p>
        ),
        cell: ({ cell }: { cell: Cell<any, any> }) => {
          if (cell.getValue() === "") {
            return <p className="w-fit">🥗</p>;
          }

          return <p className="w-fit">{cell.getValue()}</p>;
        },
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
              <button
                disabled={isPending}
                onClick={() => mutateAsync(row.original._id)}
                className="text-red-600 hover:text-red-800 transition-all duration-200"
              >
                <Trash size={20} />
              </button>
            </div>
          );
        },
      },
    ],
    []
  );

  const optionsTable: Omit<
    TableOptions<Categorie>,
    "columns" | "data" | "getCoreRowModel"
  > = {
    getFilteredRowModel: getFilteredRowModel(),
  };

  const table = createTable(data || [], columns, optionsTable);

  return (
    <div>
      {newCategorieModal && (
        <Suspense
          fallback={<NewCategorieModalSkeleton isVisible={newCategorieModal} />}
        >
          <CategorieModal
            isVisible={newCategorieModal}
            onClose={handleNewCategorieModal}
          />
        </Suspense>
      )}
      {editCategorieModal && (
        <Suspense
          fallback={
            <EditCategorieModalSkeleton isVisible={!!editCategorieModal} />
          }
        >
          <EditCategorieModal
            data={editCategorieModal}
            isVisible={!!editCategorieModal}
            onClose={() => handleEditCategorieModal(null)}
          />
        </Suspense>
      )}
      <div className="max-h-full overflow-y-auto">
        <Table.Root table={table}>
          <MenuHeader
            quantity={(data || []).length ?? 0}
            onClick={handleNewCategorieModal}
            title="Nova Categoria"
            filters
          >
            <div className="w-3/4 mx-auto px-2">
              <InputFilter />
            </div>
          </MenuHeader>
          <Table.Container>
            <Table.Header />
            <Table.Body />
          </Table.Container>
        </Table.Root>
      </div>
    </div>
  );
}

export default CategoriesTable;
