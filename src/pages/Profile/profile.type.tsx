import { Profile } from "@/types/Profile";

export interface ProfilePageProps {
  props :{
    onSubmit: (data: Profile) => Promise<void>;
  }
}
