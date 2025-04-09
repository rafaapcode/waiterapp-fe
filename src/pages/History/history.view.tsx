import { IoNewspaperOutline } from "react-icons/io5";
import Header from "../../components/Header/Header";
import HistoryModal from "../../components/HistoryModal/HistoryModal";

function History() {
  return (
    <main className="w-full h-full pt-10 overflow-y-auto">
      <Header
        Icon={IoNewspaperOutline}
        subtitle="Visualize pedidos anteriores"
        title="Histórico"
      />
      <HistoryModal />
    </main>
  );
}

export default History;
