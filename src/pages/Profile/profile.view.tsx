import ProfileEditForm from "@/components/profile/ProfileEditForm";
import { CgProfile } from "react-icons/cg";
import Header from "../../components/molecule/Header";
import { ProfilePageProps } from "./profile.type";

function ProfileView({ props }: ProfilePageProps) {
  return (
    <main className="w-full h-full pt-10 overflow-y-auto">
      <Header
        Icon={CgProfile}
        subtitle="Gerencie a sua conta e suas informações"
        title="Perfil"
      />
      <div className="mt-8">
        <ProfileEditForm props={props}/>
      </div>
    </main>
  );
}

export default ProfileView;
