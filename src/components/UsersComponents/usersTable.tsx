import createTable from "@/hooks/createTable";
import { Users } from "@/types/Users";
import { UseMutateAsyncFunction } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { AxiosResponse } from "axios";
import { Edit, LoaderCircle, Trash } from "lucide-react";
import {
  Dispatch,
  lazy,
  SetStateAction,
  Suspense,
  useMemo
} from "react";
import MenuHeader from "../MenuComponents/MenuHeader";
import Pagination from "../pagination/Pagination";
import Table from "../Table";
import EditUserModalSkeleton from "./skeletons/EditUserModalSkeleton";
import NewUserModalSkeleton from "./skeletons/NewUserModalSkeleton";

const NewUserModal = lazy(() => import("./modals/NewUserModal"));
const EditUserModal = lazy(() => import("./modals/EditUserModal"));

interface UsersTableProps {
  props: {
    newUserModal: boolean;
    toggleNewUserModal: () => void;
    userToEdit: string | null;
    setUserToEditModal: Dispatch<SetStateAction<string | null>>;
    page: number;
    setCurrentPage: Dispatch<SetStateAction<number>>;
    AllUsers: {total_pages: number; users: Users[];} | undefined;
    isPending: boolean;
    deleteUser: UseMutateAsyncFunction<void | AxiosResponse<any, any>, Error, string, unknown>;
  };
}

function UsersTable({props}: UsersTableProps) {
  const { AllUsers, deleteUser, isPending, newUserModal, page, setCurrentPage, setUserToEditModal, toggleNewUserModal, userToEdit } = props;

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
              <button
                disabled={row.original.role === "ADMIN"}
                onClick={() => deleteUser(row.original.id)}
                className="text-red-600 hover:text-red-800 disabled:text-red-300 transition-all duration-200"
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
            setCurrentPage={setCurrentPage}
            totalPage={AllUsers?.total_pages || 0}
          />
        </Table.Root>
      )}
    </>
  );
}

export default UsersTable;
