import HistoryTable from "@/view/components/HistoryTable";
import { IoNewspaperOutline } from "react-icons/io5";
import Header from "../../components/molecule/PageHeader";
import { HistoryModelType } from "./history.type";

function HistoryView({ props }: HistoryModelType) {

  return (
    <main className="w-full h-full pt-10 overflow-y-auto">
      <Header
        Icon={IoNewspaperOutline}
        subtitle="Visualize pedidos anteriores"
        title="Histórico"
      />
      <div className="flex flex-col gap-2 mt-12">
        <HistoryTable props={props}/>
      </div>
    </main>
  );
}

export default HistoryView;
