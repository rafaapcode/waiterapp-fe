import RestartModalSkeleton from "@/components/RestartModal/RestartModalSkeleton";
import { lazy, Suspense } from "react";
import { RiHomeLine } from "react-icons/ri";
import { RxUpdate } from "react-icons/rx";
import Header from "../../components/molecule/Header";
import Orders from "../Orders/OrdersPage";
import HomePageProps from "./home.type";

const RestartModal = lazy(
  () => import("../../components/RestartModal/RestartModal")
);

function HomeView({ props }: HomePageProps) {
  const { refetchData, restartModal, toogleRestartModal } = props;

  return (
    <main className="w-full h-full pt-10 overflow-y-auto">
      {restartModal && (
        <Suspense
          fallback={<RestartModalSkeleton isVisible={restartModal} size="sm"/>}
        >
          <RestartModal
            onCancel={toogleRestartModal}
            onClose={toogleRestartModal}
            isVisible={restartModal}
            onClick={refetchData}
          />
        </Suspense>
      )}
      <Header
        title="Home"
        subtitle="Acompanhe os pedidos dos clientes"
        Icon={RiHomeLine}
        rightButton={{
          Icon: RxUpdate,
          text: "Reiniciar o dia",
          onClick: toogleRestartModal,
        }}
      />
      <Orders />
    </main>
  );
}

export default HomeView;
