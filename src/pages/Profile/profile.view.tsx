import { CgProfile } from "react-icons/cg";
import Header from "../../components/Header/Header";

function Profile() {
  return (
    <main className="w-full h-full pt-10 overflow-y-auto">
      <Header
        Icon={CgProfile}
        subtitle="Gerencie a sua conta e suas informações"
        title="Perfil"
      />
      <div className="bg-red-300 mt-8">
        <h1>teste</h1>
      </div>
    </main>
  );
}

export default Profile;
