import HistoryTable from "@/components/historyTable/HistoryTable";
import { useCallback, useState } from "react";
import { IoNewspaperOutline } from "react-icons/io5";
import Header from "../../components/Header/Header";
import HistoryModal from "../../components/HistoryModal/HistoryModal";

function History() {
  const [historyModalVisibility, setHistoryModalVisibility] =
    useState<boolean>(false);

  const toggleVisibilityModal = useCallback(
    () => setHistoryModalVisibility((prev) => !prev),
    []
  );

  return (
    <main className="w-full h-full pt-10 overflow-y-auto">
      <Header
        Icon={IoNewspaperOutline}
        subtitle="Visualize pedidos anteriores"
        title="Histórico"
      />
      <HistoryModal
        isVisible={historyModalVisibility}
        onClose={toggleVisibilityModal}
        onDelete={() => Promise.resolve()}
        isLoading={false}
      />
      <div className="flex flex-col gap-2 mt-12">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text=[#333333]">Pedidos</h2>
          <span className="bg-[#CCCCCC33]/40 px-2 py-1 rounded-md text-[#333333]">
            3
          </span>
        </div>

        <HistoryTable />
      </div>
    </main>
  );
}

export default History;
