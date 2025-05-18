import { CONSTANTS } from "@/constants";
import createTable from "@/hooks/createTable";
import { Users } from "@/types/Users";
import { apiclient } from "@/utils/apiClient";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { AxiosError } from "axios";
import { Edit, LoaderCircle, Trash } from "lucide-react";
import { lazy, Suspense, useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import MenuHeader from "../MenuComponents/MenuHeader";
import Pagination from "../pagination/Pagination";
import Table from "../Table";
import EditUserModalSkeleton from "./skeletons/EditUserModalSkeleton";
import NewUserModalSkeleton from "./skeletons/NewUserModalSkeleton";

const NewUserModal = lazy(() => import("./modals/NewUserModal"));
const EditUserModal = lazy(() => import("./modals/EditUserModal"));

function UsersTable() {
  const [newUserModal, setNewUserModal] = useState<boolean>(false);
  const [page, SetCurrentPage] = useState<number>(1);
  const [userToEdit, setUserToEditModal] = useState<string | null>(null);
  const navigate = useNavigate();

  const toggleNewUserModal = useCallback(
    () => setNewUserModal((prev) => !prev),
    []
  );

  const { data: AllUsers, isPending } = useQuery({
    queryKey: ["all_users", {page}],
    queryFn: async () => {
      try {
        const { data } = await apiclient.get(`/user/all/${page}`);
        return { total_pages: data.total_pages, users: data.users.map((u: any) => ({...u, id: u._id})) } as {total_pages: number; users: Users[]};
      } catch (error) {
        console.log(error);
        const err = error as AxiosError;
        if (err.status === 400 || err.status === 404) {
          const msgs =
            (err.response?.data as { message: string }) ??
            "Erro ao buscar os usuários";
          toast.error(msgs.message);
          return {total_pages: 0, users: []};
        }
        if (err.status === 401) {
          toast.error(
            "Sua sessão terminou !"
          );
          localStorage.removeItem(CONSTANTS.TOKEN);
          return navigate("/");
        }
        return {total_pages: 0, users: []};
      }
    },
  });

  const columns = useMemo(
    (): ColumnDef<Users>[] => [
      {
        id: "nome",
        accessorKey: "name",
        header: () => <p className="text-[#333333] font-semibold">Nome</p>,
        size: 15,
      },
      {
        id: "email",
        accessorKey: "email",
        header: () => <p className="text-[#333333] font-semibold">E-mail</p>,
        size: 45,
      },
      {
        id: "role",
        accessorKey: "role",
        header: () => <p className="text-[#333333] font-semibold">Cargo</p>,
        size: 30,
      },
      {
        enableColumnFilter: false,
        enableGlobalFilter: false,
        enableHiding: false,
        enableGrouping: false,
        enableSorting: false,
        enableResizing: false,
        enableMultiSort: false,
        id: "actions",
        header: () => <p className="text-[#333333] font-semibold">Ações</p>,
        cell: ({ row }) => {
          return (
            <div className="flex gap-4">
              <button
                onClick={() => setUserToEditModal(row.original.id)}
                className="text-[#666666] hover:text-[#9e9e9e] transition-all duration-200"
              >
                <Edit size={20} />
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

  const table = createTable(AllUsers?.users || [], columns);

  return (
    <>
      {newUserModal && (
        <Suspense fallback={<NewUserModalSkeleton isVisible={newUserModal} />}>
          <NewUserModal isVisible={newUserModal} onClose={toggleNewUserModal} />
        </Suspense>
      )}
      {userToEdit && (
        <Suspense fallback={<EditUserModalSkeleton isVisible={!!userToEdit} />}>
          <EditUserModal
            userId={userToEdit}
            isVisible={!!userToEdit}
            onClose={() => setUserToEditModal(null)}
          />
        </Suspense>
      )}
      <MenuHeader
        quantity={AllUsers?.users.length ?? 0}
        onClick={toggleNewUserModal}
        btnTitle="Novo usuário"
        title="Usuários"
      />

      {isPending ? (
        <div className="w-full flex justify-center items-center h-20">
          <LoaderCircle size={26} className="animate-spin" />
        </div>
      ) : (
        <Table.Root table={table}>
          <Table.Container>
            <Table.Header />
            <Table.Body />
          </Table.Container>
          <Pagination
            existsOrder={AllUsers?.users.length !== 0}
            page={page}
            setCurrentPage={SetCurrentPage}
            totalPage={AllUsers?.total_pages || 0}
          />
        </Table.Root>
      )}
    </>
  );
}

export default UsersTable;
