import { IoNewspaperOutline } from "react-icons/io5";

function History() {
  return (
    <main className="w-full h-full pt-10 overflow-y-auto">
      <header className="flex justify-between">
        <div className="flex flex-col">
          <div className="flex gap-2">
            <IoNewspaperOutline size={32} />
            <p className="font-semibold text-2xl">Histórico</p>
          </div>
          <p className="text-[#666666] mt-4">Visualize pedidos anteriores</p>
        </div>
      </header>
    </main>
  );
}

export default History;
