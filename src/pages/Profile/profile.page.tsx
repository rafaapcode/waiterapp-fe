import { useProfileModel } from "./profile.model";
import ProfileView from "./profile.view";

function ProfilePage() {
  const { props } = useProfileModel();
  return <ProfileView props={props} />;
}

export default ProfilePage;
