import UsersTable from "@/components/UsersComponents/usersTable";
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
      <section className="w-full mt-8">
        <UsersTable />
      </section>
    </main>
  );
}

export default Users;
