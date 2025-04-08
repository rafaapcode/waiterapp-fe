import { BiFoodMenu } from "react-icons/bi"

function Menu() {
  return (
    <main className="w-full h-full pt-10 overflow-y-auto">
          <header className="flex justify-between">
            <div className="flex flex-col">
              <div className="flex gap-2">
                <BiFoodMenu size={32} />
                <p className="font-semibold text-2xl">Cardápio</p>
              </div>
              <p className="text-[#666666] mt-4">Gerencie os produtos do seu estabelecimento</p>
            </div>
          </header>
        </main>
  )
}

export default Menu
