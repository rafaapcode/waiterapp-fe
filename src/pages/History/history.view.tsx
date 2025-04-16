import HistoryTable from "@/components/HistoryComponents/HistoryTable";
import { IoNewspaperOutline } from "react-icons/io5";
import Header from "../../components/Header/Header";

function History() {
  return (
    <main className="w-full h-full pt-10 overflow-y-auto">
      <Header
        Icon={IoNewspaperOutline}
        subtitle="Visualize pedidos anteriores"
        title="Histórico"
      />
      <div className="flex flex-col gap-2 mt-12">
        <HistoryTable />
      </div>
    </main>
  );
}

export default History;
