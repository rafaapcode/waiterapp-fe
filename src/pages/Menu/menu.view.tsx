import { BiFoodMenu } from "react-icons/bi"
import Header from "../../components/Header/Header"

function Menu() {
  return (
    <main className="w-full h-full pt-10 overflow-y-auto">
      <Header
        Icon={BiFoodMenu}
        subtitle="Gerencie os produtos do seu estabelecimento"
        title="Cardápio"
      />
    </main>
  )
}

export default Menu
