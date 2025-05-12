import HistoryTable from "@/components/HistoryComponents/HistoryTable";
import { IoNewspaperOutline } from "react-icons/io5";
import Header from "../../components/Header/Header";
import { HistoryModelType } from "./history.type";

function HistoryView({ props }: HistoryModelType) {

  const {
    data,
    filterDateSelected,
    handlePage,
    handleResetData,
    handleSelectedDate,
    handleSelectedOrder,
    isFetching,
    isPending,
    onDeleteOrder,
    page,
    selectedOrder
  } = props;

  return (
    <main className="w-full h-full pt-10 overflow-y-auto">
      <Header
        Icon={IoNewspaperOutline}
        subtitle="Visualize pedidos anteriores"
        title="Histórico"
      />
      <div className="flex flex-col gap-2 mt-12">
        <HistoryTable
          data={data}
          filterDateSelected={filterDateSelected}
          handlePage={handlePage}
          handleResetData={handleResetData}
          handleSelectedDate={handleSelectedDate}
          handleSelectedOrder={handleSelectedOrder}
          isFetching={isFetching}
          isPending={isPending}
          onDeleteOrder={onDeleteOrder}
          page={page}
          selectedOrder={selectedOrder}
        />
      </div>
    </main>
  );
}

export default HistoryView;
