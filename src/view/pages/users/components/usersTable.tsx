import Pagination from "@/components/molecule/Pagination";
import TableComponent from "@/components/molecule/Table";
import { Users } from "@/types/Users";
import { Table } from "@tanstack/react-table";
import { Dispatch } from "react";

interface UsersTableProps {
  table: Table<Users>;
  existsOrder: boolean;
  page: number;
  totalPage: number;
  setCurrentPage: Dispatch<React.SetStateAction<number>>;
}

function UsersTable({
  existsOrder,
  page,
  setCurrentPage,
  table,
  totalPage,
}: UsersTableProps) {
  return (
    <TableComponent table={table}>
      <TableComponent.Container>
        <TableComponent.Header />
        <TableComponent.Body />
      </TableComponent.Container>
      <Pagination
        existsOrder={existsOrder}
        page={page}
        setCurrentPage={setCurrentPage}
        totalPage={totalPage}
      />
    </TableComponent>
  );
}

export default UsersTable;
