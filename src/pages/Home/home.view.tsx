import { RiHomeLine } from "react-icons/ri"
import { RxUpdate } from "react-icons/rx"
import Orders from "../Orders/OrdersPage"

function Home() {
  return (
    <main className="w-full h-full pt-10 overflow-y-auto">
      <header className="flex justify-between">
        <div className="flex flex-col">
          <div className="flex gap-2">
            <RiHomeLine size={32} />
            <p className="font-semibold text-2xl">Home</p>
          </div>
          <p className="text-[#666666] mt-4">Acompanhe os pedidos dos clientes</p>
        </div>
        <button className="flex gap-2 items-center">
          <RxUpdate  size={24} className="text-[#D73035]"/>
          <p className="text-[#D73035] font-semibold">Reiniciar o dia</p>
        </button>
      </header>
      <Orders />
    </main>
  )
}

export default Home
