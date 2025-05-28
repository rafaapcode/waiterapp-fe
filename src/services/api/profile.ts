import { apiclient } from "@/utils/apiClient";
import { UseMutateAsyncFunction, useMutation } from "@tanstack/react-query";
import { OnErrorCBType, OnSuccessCBType } from "../types/mutations.type";

export class ProfileService {
  static updateProfile(
    onSuccess: OnSuccessCBType,
    onError: OnErrorCBType
  ): {
    updateProfile: UseMutateAsyncFunction<
      any,
      Error,
      Partial<{
        name?: string;
        email?: string;
        confirm_password?: string;
        current_password?: string;
        new_password?: string;
      }>,
      unknown
    >;
    isPending: boolean;
  } {
    const { mutateAsync, isPending } = useMutation({
      mutationFn: async (
        data: Partial<{
          name?: string;
          email?: string;
          confirm_password?: string;
          current_password?: string;
          new_password?: string;
        }>
      ) => {
        const { data: response } = await apiclient.put("/user/current", data);

        return response;
      },
      onSuccess,
      onError,
    });

    return { updateProfile: mutateAsync, isPending };
  }

  static async getDefaultValuesOfProfile(): Promise<{
    name: string;
    email: string;
    confirmPassword: string;
    currentPassword: string;
    newPassword: string;
  }> {
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
  }
}
