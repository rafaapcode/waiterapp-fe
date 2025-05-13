import createTable from "@/hooks/createTable";
import { Categorie } from "@/types/Categorie";
import { apiclient } from "@/utils/apiClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Cell, ColumnDef } from "@tanstack/react-table";
import { AxiosError } from "axios";
import { EditIcon, Trash } from "lucide-react";
import { lazy, Suspense, useCallback, useMemo, useState } from "react";
import { toast } from "react-toastify";
import Pagination from "../pagination/Pagination";
import Table from "../Table";
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
  const [page, setCurrentPage] = useState<number>(1);
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
    queryKey: ["all_categories", {page}],
    // staleTime: Infinity,
    queryFn: async (): Promise<{total_pages: number; categories: Categorie[]}> => {
      try {
        const { data } = await apiclient.get(`/category/categories/1`);

        return data as {total_pages: number; categories: Categorie[]};
      } catch (error: any) {
        console.log(error.response);
        return {total_pages: 0,  categories: []};
      }
    },
  });

  const handlePage = (type: "Next" | "Previous" | "First" | "Last") => {
    switch (type) {
      case "First":
        setCurrentPage(1);
        break;
      case "Previous":
        setCurrentPage((prev) => (prev >= 0 && prev > 1 ? prev - 1 : 1));
        break;
      case "Next":
        setCurrentPage((prev) => prev + 1);
        break;
      case "Last":
        setCurrentPage(data?.total_pages || 1);
        break;
      default:
        setCurrentPage(1);
        break;
    }
  };

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
              <button disabled={isPending} onClick={() => mutateAsync(row.original._id)} className="text-red-600 hover:text-red-800 transition-all duration-200">
                <Trash size={20} />
              </button>
            </div>
          );
        },
      },
    ],
    []
  );

  const table = createTable(data?.categories || [], columns);
  console.log(page)
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
      <MenuHeader
        quantity={(data?.categories || []).length ?? 0}
        onClick={handleNewCategorieModal}
        title="Nova Categoria"
      />
      <div className="mt-2 max-h-full overflow-y-auto">
        <Table.Root table={table}>
          <Table.Container>
            <Table.Header />
            <Table.Body />
          </Table.Container>
        </Table.Root>
         <Pagination
          existsOrder={data?.categories.length !== 0}
          totalPage={data?.total_pages || 1}
          page={page}
          handlePage={handlePage}
        />
      </div>
    </div>
  );
}

export default CategoriesTable;
