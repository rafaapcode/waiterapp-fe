import UsersTable from "@/components/UsersComponents/usersTable";
import { FiUsers } from "react-icons/fi";
import Header from "../../components/Header/Header";
import { UsersPageProps } from "./users.type";

function UsersView({ props }: UsersPageProps) {
  return (
    <main className="w-full h-full pt-10 overflow-y-auto">
      <Header
        Icon={FiUsers}
        subtitle="Cadastre e gerencie seus usuários"
        title="Usuários"
      />
      <section className="w-full mt-8">
        <UsersTable props={props}/>
      </section>
    </main>
  );
}

export default UsersView;
