import { createUserSchema } from "@/components/UsersComponents/validations/createUserValidation";
import { updateUserSchema } from "@/components/UsersComponents/validations/updateUserSchema";
import { Users } from "@/types/Users";
import { apiclient } from "@/utils/apiClient";
import {
  UseMutateAsyncFunction,
  useMutation,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { SetStateAction } from "react";
import { OnErrorCBType, OnSuccessCBType } from "../types/mutations.type";
import { NewUserData, UserData } from "../types/users.type";

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

  static createUser(
    onSuccess: OnSuccessCBType,
    onError: OnErrorCBType
  ): {
    createUser: UseMutateAsyncFunction<
      AxiosResponse<any, any> | undefined,
      Error,
      NewUserData & {
        role: "WAITER" | "ADMIN";
      },
      unknown
    >;
    isPending: boolean;
  } {
    const { mutateAsync, isPending } = useMutation({
      mutationFn: async (
        data: NewUserData & { role: "WAITER" | "ADMIN" }
      ): Promise<any> => {
        const isValid = createUserSchema.safeParse({ ...data });

        if (!isValid.success) {
          return;
        }

        return await apiclient.post(`/user`, data);
      },
      onSuccess,
      onError,
    });

    return {
      createUser: mutateAsync,
      isPending,
    };
  }

  static editUser(
    userId: string,
    onSuccess: OnSuccessCBType,
    onError: OnErrorCBType
  ): {
    editUser: UseMutateAsyncFunction<
      AxiosResponse<any, any>,
      Error,
      UserData,
      unknown
    >;
    isPending: boolean;
  } {
    const { mutateAsync, isPending } = useMutation({
      mutationFn: async (data: UserData) => {
        if (!userId || userId.length !== 24) {
          throw new Error("Id do usuário inválido");
        }
        const newUserdata = {
          ...(data.password && { password: data.password }),
          ...(data.email && { email: data.email }),
          ...(data.name && { name: data.name }),
          ...(data.role && { role: data.role }),
        };

        const isValid = updateUserSchema.safeParse(newUserdata);

        if (!isValid.success) {
          console.log(isValid.error.errors);
          throw new Error("Dados inválidos");
        }

        return await apiclient.put(`/user/${userId}`, newUserdata);
      },
      onSuccess,
      onError,
    });

    return {
      editUser: mutateAsync,
      isPending,
    };
  }

  static getUserById(
    userId: string,
    setUserInfo: (value: SetStateAction<UserData>) => void,
    setRoleSelected: (
      value: React.SetStateAction<{
        adm: boolean;
        waiter: boolean;
      }>
    ) => void
  ): UseQueryResult<
    | {
        total_pages: number;
        users: never[];
      }
    | undefined,
    Error
  > {
    return useQuery({
      queryKey: ["user", userId],
      queryFn: async () => {
        try {
          const { data } = await apiclient.get(`/user/${userId}`);
          setUserInfo({
            email: data.email,
            name: data.name,
            password: "",
            role: data.role,
          });
          if (data.role === "ADMIN") {
            setRoleSelected({ adm: true, waiter: false });
          } else {
            setRoleSelected({ adm: false, waiter: true });
          }
        } catch (error) {
          console.log(error);
          return { total_pages: 0, users: [] };
        }
      },
    });
  }

  static getMe() {
    return apiclient.get('/user/current');
  }
}
