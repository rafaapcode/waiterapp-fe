import { RiHomeLine } from "react-icons/ri"
import { RxUpdate } from "react-icons/rx"
import Header from "../../components/Header/Header"
import RestartModal from "../../components/RestartModal/RestartModal"
import Orders from "../Orders/OrdersPage"
import HomePageProps from "./home.type"

function HomeView({props}: HomePageProps) {
  const { refetchData, restartModal,  toogleRestartModal} = props;

  return (
    <main className="w-full h-full pt-10 overflow-y-auto">
      <RestartModal
        onCancel={toogleRestartModal}
        onClose={toogleRestartModal}
        isVisible={restartModal}
        onClick={refetchData}
      />
      <Header
        title="Home"
        subtitle="Acompanhe os pedidos dos clientes"
        Icon={RiHomeLine}
        rightButton={{
          Icon: RxUpdate,
          text: "Reiniciar o dia",
          onClick: toogleRestartModal
        }}
      />
      <Orders />
    </main>
  )
}

export default HomeView
