import TableComponent from "../Table/Table";
import { columnsHistoryTable } from "./columns";
import { orders } from "./mockData";

function HistoryTable() {
  return (
    <TableComponent data={orders} columns={columnsHistoryTable}/>
  );
}

export default HistoryTable;
