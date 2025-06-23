import { apiclient } from "@/utils/apiClient";
import {
  UseMutateAsyncFunction,
  useMutation
} from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { OnErrorCBType, OnSuccessCBType } from "../types/mutations.type";

export class LoginService {
  static loginUser(
    onSuccess: OnSuccessCBType,
    onError: OnErrorCBType
  ): {
    loginUser: UseMutateAsyncFunction<
      AxiosResponse<any, any>,
      Error,
      {
        email: string;
        password: string;
      },
      unknown
    >;
    isPending: boolean;
  } {
    const { mutateAsync: loginUser, isPending } = useMutation({
      mutationFn: async (data: { email: string; password: string }) =>
        await apiclient.post("/auth/signin", data),
      onSuccess,
      onError,
    });

    return { loginUser: loginUser, isPending };
  }
}
