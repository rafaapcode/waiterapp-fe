import { UserRoles } from "@/types/Users";
import { apiclient } from "@/utils/apiClient";

export class LoginService {
  static async loginUser(
    data: LoginService.Input
  ): Promise<LoginService.Output> {
    const { data: res } = await apiclient.post<LoginService.Output>(
      "/auth/signin",
      data
    );
    return res;
  }
}

export namespace LoginService {
  export type Input = { email: string; password: string };

  export type Output = {
    access_token: string;
    refresh_token: string;
    role: UserRoles;
    id: string;
  };
}
