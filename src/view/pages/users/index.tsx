import TableComponent from "@/components/molecule/Table";
import createTable from "@/hooks/createTable";
import { Users } from "@/types/Users";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, LoaderCircle, Trash } from "lucide-react";
import {
  lazy,
  Suspense,
  useMemo
} from "react";
import Pagination from "../../../components/molecule/Pagination";
import UserHeader from "./components/header";
import EditUserModalSkeleton from "./skeletons/EditUserModalSkeleton";
import NewUserModalSkeleton from "./skeletons/NewUserModalSkeleton";
import { useUsersController } from "./useUsersController";

const NewUserModal = lazy(() => import("./modals/NewUserModal"));
const EditUserModal = lazy(() => import("./modals/EditUserModal"));

function UsersTable() {
  const { allUsers, gettingAllUsers, handleDeleteUser, newUserModal, page, setCurrentPage, setUserToEditModal, toggleNewUserModal, userToEdit } = useUsersController();

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
                onClick={() => handleDeleteUser(row.original.id)}
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

  const table = createTable(allUsers?.users || [], columns);

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

      <UserHeader
        quantity={allUsers?.users.length ?? 0}
        onClick={toggleNewUserModal}
        btnTitle="Novo usuário"
        title="Usuários"
      />

      {gettingAllUsers ? (
        <div className="w-full flex justify-center items-center h-20">
          <LoaderCircle size={26} className="animate-spin" />
        </div>
      ) : (
        <TableComponent table={table}>
          <TableComponent.Container>
            <TableComponent.Header />
            <TableComponent.Body />
          </TableComponent.Container>
          <Pagination
            existsOrder={allUsers?.users.length !== 0}
            page={page}
            setCurrentPage={setCurrentPage}
            totalPage={allUsers?.total_pages || 0}
          />
        </TableComponent>
      )}
    </>
  );
}

export default UsersTable;
