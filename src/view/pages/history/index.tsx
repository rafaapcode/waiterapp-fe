import PageHeader from "@/components/molecule/PageHeader";
import HistoryTable from "@/view/components/HistoryTable";
import { IoNewspaperOutline } from "react-icons/io5";
import { useHistoryController } from "./useHistoryController";

function History() {
  const props = useHistoryController();

  return (
    <main className="w-full h-full pt-10 overflow-y-auto">
      <PageHeader
        Icon={IoNewspaperOutline}
        subtitle="Visualize pedidos anteriores"
        title="Histórico"
      />
      <div className="flex flex-col gap-2 mt-12">
        <HistoryTable {...props}/>
      </div>
    </main>
  )
}

export default History
