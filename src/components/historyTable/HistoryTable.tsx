import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Filter, Trash2 } from "lucide-react";
import { orders } from "./mockData";

function HistoryTable() {
  return (
    <div className="w-full mt-4">
      <div className="rounded-xl border bg-white overflow-hidden">
        <Table>
          <TableHeader className="bg-[#CCCCCC33]/20">
            <TableRow>
              <TableHead className="text-[#333333] font-semibold w-[5%] pl-4">Mesa</TableHead>
              <TableHead className="w-[10%] text-ellipsis">
                <div className="flex items-center gap-1 text-[#333333] font-semibold">
                  Data
                  <Filter className="h-4 w-4" />
                </div>
              </TableHead>
              <TableHead className="text-[#333333] font-semibold text-left w-[25%]">Nome</TableHead>
              <TableHead className="text-[#333333] font-semibold text-left w-[20%]">Categoria</TableHead>
              <TableHead className="text-[#333333] font-semibold text-left flex-1">Total</TableHead>
              <TableHead className="w-[10%] text-right text-[#333333] font-semibold pr-20">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="py-6 pl-4">{order.table}</TableCell>
                <TableCell className="py-6">{order.date}</TableCell>
                <TableCell className="py-6">{order.name}</TableCell>
                <TableCell className="py-6">
                  {order.category}
                </TableCell>
                <TableCell className="py-6">{order.total}</TableCell>
                <TableCell className="text-right py-5 flex justify-center">
                  <div className="flex gap-6 w-fit">
                    <button className="text-gray-500 hover:text-gray-700">
                      <Eye className="h-5 w-5" />
                    </button>
                    <button className="text-red-500 hover:text-red-700">
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default HistoryTable;
