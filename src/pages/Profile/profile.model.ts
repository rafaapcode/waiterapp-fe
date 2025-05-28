import { updateProfileDataSchema } from "@/components/profile/schema/updateProfileSchema";
import { useSetToken } from "@/hooks/useToken";
import { ProfileService } from "@/services/api/profile";
import { Profile } from "@/types/Profile";
import { apiclient } from "@/utils/apiClient";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ProfilePageProps } from "./profile.type";

export type DirtedFields = Partial<
  Readonly<{
    name?: boolean | undefined;
    email?: boolean | undefined;
    confirmPassword?: boolean | undefined;
    currentPassword?: boolean | undefined;
    newPassword?: boolean | undefined;
  }>
>;

const getDefaultValues = async () => {
  try {
    const { data } = await apiclient.get("/user/current");
    const userData = data as { email: string; name: string };

    return {
      name: userData.name,
      email: userData.email,
      confirmPassword: "",
      currentPassword: "",
      newPassword: "",
    };
  } catch (error) {
    return {
      name: "",
      email: "",
      confirmPassword: "",
      currentPassword: "",
      newPassword: "",
    };
  }
};

const extractChangedFields = (
  data: Profile,
  dirtyFields: DirtedFields
): Partial<{
  name?: string;
  email?: string;
  confirm_password?: string;
  current_password?: string;
  new_password?: string;
}> | null => {
  if (!data) {
    return null;
  }

  const changedFields: Partial<{
    name?: string;
    email?: string;
    confirm_password?: string;
    current_password?: string;
    new_password?: string;
  }> = {};

  const fieldsChanged = Object.keys(dirtyFields);

  for (const fieldChanged of fieldsChanged) {
    if (fieldChanged === "confirmPassword") {
      changedFields["confirm_password"] = data[fieldChanged as keyof Profile];
      continue;
    }

    if (fieldChanged === "currentPassword") {
      changedFields["current_password"] = data[fieldChanged as keyof Profile];
      continue;
    }

    if (fieldChanged === "newPassword") {
      changedFields["new_password"] = data[fieldChanged as keyof Profile];
      continue;
    }

    changedFields[fieldChanged as keyof Profile] =
      data[fieldChanged as keyof Profile];
  }

  console.log(changedFields);

  return changedFields;
};

export const useProfileModel = (): ProfilePageProps => {
  const setToken = useSetToken();
  const {
    register,
    handleSubmit,
    formState: { isDirty, isLoading, dirtyFields },
  } = useForm({
    defaultValues: getDefaultValues,
  });

  const { updateProfile, isPending } = ProfileService.updateProfile(
    (data: any) => {
      if (data) {
        if (data.access_token) {
          setToken(data.access_token);
          toast.success("Perfil atualizado com sucesso!");
        } else {
          toast.success("Perfil atualizado com sucesso!");
        }
      } else {
        toast.error("Erro ao atualizar o perfil");
      }
    },
    (error) => {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message);
    }
  );

  const onSubmit = async (data: Profile) => {
    if (!data) {
      return;
    }

    const isValid = updateProfileDataSchema.safeParse({
      ...(data.name && { name: data.name }),
      ...(data.email && { email: data.email }),
      ...(data.currentPassword && { currentPassword: data.currentPassword }),
      ...(data.newPassword && { newPassword: data.newPassword }),
      ...(data.confirmPassword && { confirmPassword: data.confirmPassword }),
    });

    if (!isValid.success) {
      const errorMessage = isValid.error.errors
        .map((err) => err.message)
        .join("\n");
      toast.error(errorMessage, { style: { width: "400px" } });
      return;
    }
    const extractedFields = extractChangedFields(data, dirtyFields);

    if (!extractedFields) {
      toast.error("Nenhum campo foi alterado");
      return;
    }

    await updateProfile(extractedFields);
  };

  return {
    props: {
      handleSubmit,
      isDirty,
      isLoading,
      onSubmit,
      register,
      isPending,
    },
  };
};
