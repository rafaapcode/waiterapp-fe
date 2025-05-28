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
}
