import { Users } from "@/types/Users";
import { apiclient } from "@/utils/apiClient";

export class UsersService {
  static async deleteUser(userId: string) {
    await apiclient.delete(`/user/${userId}`);
  }

  static async getAllUsers(
    page: number
  ): Promise<UsersService.GetAllUsersOutput> {
    const { data } = await apiclient.get<UsersService.GetAllUsersOutput>(
      `/user/all/${page}`
    );
    return {
      total_pages: data.total_pages,
      users: data.users.map((u: any) => ({ ...u, id: u._id })),
    } as UsersService.GetAllUsersOutput;
  }

  static async createUser(
    BoardsControllerParams: UsersService.CreateUserInput
  ): Promise<UsersService.CreateUserOutput> {
    const { data } = await apiclient.post<UsersService.CreateUserOutput>(
      `/user`,
      BoardsControllerParams
    );

    return data;
  }

  static async editUser({
    userId,
    ...params
  }: UsersService.EditUserInput): Promise<UsersService.EditUserOutput> {
    const { data } = await apiclient.put<UsersService.EditUserOutput>(
      `/user/${userId}`,
      params
    );

    return data;
  }

  static async getUserById(
    userId: string
  ): Promise<UsersService.GetAllUsersOutput> {
    const { data } = await apiclient.get<UsersService.GetAllUsersOutput>(
      `/user/${userId}`
    );

    return data;
  }

  static async getMe(): Promise<UsersService.GetCurrentUserOutput> {
    const { data } = await apiclient.get<UsersService.GetCurrentUserOutput>(
      "/user/current"
    );
    return data;
  }
}

export namespace UsersService {
  export type GetAllUsersOutput = { total_pages: number; users: Users[] };
  export type CreateUserInput = {
    name: string;
    email: string;
    password: string;
    role: "WAITER" | "ADMIN";
  };
  export type CreateUserOutput = {
    name: string;
    email: string;
    role: "WAITER" | "ADMIN";
    id: string;
  };
  export type EditUserInput = {
    userId: string;
    name?: string;
    email?: string;
    password?: string;
    role?: "WAITER" | "ADMIN";
  };
  export type EditUserOutput = {
    name: string;
    email: string;
    role: "WAITER" | "ADMIN";
  };
  export type GetUserOutput = {
    name: string;
    email: string;
    role: "WAITER" | "ADMIN";
    id: string;
  };
  export type GetCurrentUserOutput = {
    name: string;
    email: string;
    id: string;
  };
}
