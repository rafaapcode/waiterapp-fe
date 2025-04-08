import { FiUsers } from "react-icons/fi";

function Users() {
  return (
    <main className="w-full h-full pt-10 overflow-y-auto">
      <header className="flex justify-between">
        <div className="flex flex-col">
          <div className="flex gap-2">
            <FiUsers size={32} />
            <p className="font-semibold text-2xl">Usuários</p>
          </div>
          <p className="text-[#666666] mt-4">Cadastre e gerencie seus usuários</p>
        </div>
      </header>
    </main>
  );
}

export default Users;
