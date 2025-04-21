import createTable from "@/hooks/createTable";
import { Users } from "@/types/Users";
import {
  ColumnDef
} from "@tanstack/react-table";
import { Edit, Trash } from "lucide-react";
import {
  useMemo
} from "react";
import MenuHeader from "../MenuComponents/MenuHeader";
import Pagination from "../pagination/Pagination";
import Table from "../Table";
import { users } from "./mockdata";

function UsersTable() {

  const columns = useMemo(
    (): ColumnDef<Users>[] => [
      {
        id: "nome",
        accessorKey: "nome",
        header: () => <p className="text-[#333333] font-semibold">Nome</p>,
        size: 15,
      },
      {
        id: "email",
        accessorKey: "email",
        header: () => (
          <p className="text-[#333333] font-semibold">E-mail</p>
        ),
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
                onClick={() => {}}
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

  const table = createTable(users, columns);

  return (
    <>
     <MenuHeader
        quantity={users.length ?? 0}
        onClick={() => {}}
        title="Novo usuário"
      />

      <Table.Root table={table}>
        <Table.Container>
          <Table.Header />
          <Table.Body />
        </Table.Container>
        <Pagination
          toFirstPage={() => {}}
          toLastPage={() => {}}
          toNextPage={() => {}}
          toPreviousPage={() => {}}
        />
      </Table.Root>
    </>
  );
}

export default UsersTable;
