import { Profile } from "@/types/Profile";
import { UseFormHandleSubmit, UseFormRegister } from "react-hook-form";

export interface ProfilePageProps {
  props: {
    onSubmit: (data: Profile) => Promise<void>;
    register: UseFormRegister<{
      name: string;
      email: string;
      confirmPassword: string;
      currentPassword: string;
      newPassword: string;
    }>;
    handleSubmit: UseFormHandleSubmit<
      {
        name: string;
        email: string;
        confirmPassword: string;
        currentPassword: string;
        newPassword: string;
      },
      {
        name: string;
        email: string;
        confirmPassword: string;
        currentPassword: string;
        newPassword: string;
      }
    >;
    isDirty: boolean;
    isLoading: boolean;
    isPending: boolean;
  };
}
