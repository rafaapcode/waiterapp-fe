import PageHeader from "@/components/molecule/PageHeader";
import createTable from "@/hooks/createTable";
import { Users } from "@/types/Users";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, LoaderCircle, Trash } from "lucide-react";
import { lazy, Suspense, useMemo } from "react";
import { FiUsers } from "react-icons/fi";
import UserHeader from "./components/header";
import UsersTable from "./components/usersTable";
import EditUserModalSkeleton from "./skeletons/EditUserModalSkeleton";
import NewUserModalSkeleton from "./skeletons/NewUserModalSkeleton";
import { useUsersController } from "./useUsersController";

const NewUserModal = lazy(() => import("./modals/newUserModal/NewUserModal"));
const EditUserModal = lazy(
  () => import("./modals/editUserModal/EditUserModal")
);

function UsersPage() {
  const {
    allUsers,
    gettingAllUsers,
    handleDeleteUser,
    userModalIsOpen,
    page,
    setCurrentPage,
    setUserToEditModal,
    setUserModalIsOpen,
    userToEdit,
  } = useUsersController();

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
  console.log('New User MOdal', userModalIsOpen)
  return (
    <main className="w-full h-full pt-10 overflow-y-auto">
      {userModalIsOpen && (
        <Suspense fallback={<NewUserModalSkeleton isVisible={userModalIsOpen} />}>
          {/* <NewUserModal isVisible={newUserModal} onClose={toggleNewUserModal} /> */}
          <p>teste</p>
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

      <PageHeader
        Icon={FiUsers}
        subtitle="Cadastre e gerencie seus usuários"
        title="Usuários"
      />
      <section className="w-full mt-16">
        <UserHeader
          quantity={allUsers?.users.length ?? 0}
          onClick={() => setUserModalIsOpen(true)}
          btnTitle="Novo usuário"
          title="Usuários"
        />

        {gettingAllUsers ? (
          <div className="w-full flex justify-center items-center h-20">
            <LoaderCircle size={26} className="animate-spin" />
          </div>
        ) : (
          <UsersTable
            existsOrder={allUsers?.users.length !== 0}
            page={page}
            setCurrentPage={setCurrentPage}
            table={table}
            totalPage={allUsers?.total_pages || 0}
          />
        )}
      </section>
    </main>
  );
}

export default UsersPage;
