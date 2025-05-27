import { Users } from "@/types/Users";
import { apiclient } from "@/utils/apiClient";
import {
  UseMutateAsyncFunction,
  useMutation,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { OnErrorCBType, OnSuccessCBType } from "../types/mutations.type";

export class UsersService {
  static deleteUser(
    onSuccess: OnSuccessCBType,
    onError: OnErrorCBType
  ): {
    deleteUser: UseMutateAsyncFunction<
      AxiosResponse<any, any>,
      Error,
      string,
      unknown
    >;
  } {
    const { mutateAsync } = useMutation({
      mutationFn: async (id: string) => await apiclient.delete(`/user/${id}`),
      onSuccess,
      onError,
    });

    return { deleteUser: mutateAsync };
  }

  static getAllUsers(page: number): UseQueryResult<
    {
      total_pages: number;
      users: Users[];
    },
    Error
  > {
    return useQuery({
      queryKey: ["all_users", { page }],
      queryFn: async () => {
        try {
          const { data } = await apiclient.get(`/user/all/${page}`);
          return {
            total_pages: data.total_pages,
            users: data.users.map((u: any) => ({ ...u, id: u._id })),
          } as { total_pages: number; users: Users[] };
        } catch (error) {
          console.log(error);
          return { total_pages: 0, users: [] };
        }
      },
    });
  }
}
