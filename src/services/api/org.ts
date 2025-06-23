import { apiclient } from "@/utils/apiClient";

export class OrgService {

  static async listOrgsOfUser(): Promise<OrgService.ListOrgsOutPut> {
    const { data } = await apiclient.get<OrgService.ListOrgsOutPut>('/org/user');
    return data;
  }

}


export namespace OrgService {
  // export type NewOrgInput {

  // }

  // export type NewOrgOutPut {

  // }
  export type ListOrgsOutPut = {_id: string; name: string; imageUrl?: string}[];
}
