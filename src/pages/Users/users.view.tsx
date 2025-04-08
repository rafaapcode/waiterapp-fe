import { FiUsers } from "react-icons/fi";
import Header from "../../components/Header/Header";

function Users() {
  return (
    <main className="w-full h-full pt-10 overflow-y-auto">
      <Header
        Icon={FiUsers}
        subtitle="Cadastre e gerencie seus usuários"
        title="Usuários"
      />
    </main>
  );
}

export default Users;
