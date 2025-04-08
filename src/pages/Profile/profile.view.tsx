import { CgProfile } from "react-icons/cg";

function Profile() {
  return (
    <main className="w-full h-full pt-10 overflow-y-auto">
      <header className="flex justify-between">
        <div className="flex flex-col">
          <div className="flex gap-2">
            <CgProfile size={32} />
            <p className="font-semibold text-2xl">Perfil</p>
          </div>
          <p className="text-[#666666] mt-4">Gerencie a sua conta e suas informações</p>
        </div>
      </header>
    </main>
  );
}

export default Profile;
