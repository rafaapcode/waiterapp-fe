import { useCallback, useState } from "react";
import { IoNewspaperOutline } from "react-icons/io5";
import Header from "../../components/Header/Header";
import HistoryModal from "../../components/HistoryModal/HistoryModal";

function History() {
  const [historyModalVisibility, setHistoryModalVisibility] = useState<boolean>(false);

  const toggleVisibilityModal = useCallback(() => setHistoryModalVisibility(prev => !prev),[]);

  return (
    <main className="w-full h-full pt-10 overflow-y-auto">
      <Header
        Icon={IoNewspaperOutline}
        subtitle="Visualize pedidos anteriores"
        title="Histórico"
      />
      <HistoryModal isVisible={historyModalVisibility} onClose={toggleVisibilityModal} onDelete={() => Promise.resolve()} isLoading={false}/>
    </main>
  );
}

export default History;
