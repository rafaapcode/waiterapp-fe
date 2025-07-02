import { UpdateOrgBody } from "@/pages/Org/info/userOrgInfoController";
import { CreateOrgBody } from "@/pages/Org/register/useOrgController";
import { apiclient, cepClient, uploadImage } from "@/utils/apiClient";

export class OrgService {
  static async listOrgsOfUser(): Promise<OrgService.ListOrgsOutPut> {
    const { data } = await apiclient.get<OrgService.ListOrgsOutPut>(
      "/org/user"
    );
    return data;
  }

  static async createOrg({
    data,
  }: OrgService.CreateOrgInput): Promise<OrgService.CreateOrgOutPut> {
    const {
      bairro: neighborhood,
      localidade: city,
      logradouro: street,
    } = await OrgService.getInfoFromCep({ cep: data.cep });

    let imageUrl = "";
    if (!data.image) {
      imageUrl = "";
    } else {
      const { url } = await OrgService.uploadImage({
        image: data.image,
        userid: data.userid,
      });

      imageUrl = url;
    }

    const { data: res } = await apiclient.post<OrgService.CreateOrgOutPut>(
      "/org",
      {
        name: data.name,
        email: data.email,
        description: data.description,
        openHour: data.openHour,
        closeHour: data.closeHour,
        cep: data.cep,
        city,
        street,
        neighborhood,
        ...(imageUrl && { imageUrl }),
      }
    );

    return res;
  }

  static async getOrg({
    orgid,
  }: OrgService.GetOrgInPut): Promise<OrgService.GetOrgOutPut> {
    const { data } = await apiclient.get<OrgService.GetOrgOutPut>(
      `/org/${orgid}`
    );

    return data;
  }

  static async updateOrg({
    newData,
    orgId,
    defaultvalues,
  }: OrgService.UpdateOrgInput): Promise<void> {
    await apiclient.patch(`/org/${orgId}`);
  }

  static async getInfoFromCep({
    cep,
  }: OrgService.GetInfoFromCepInPut): Promise<OrgService.GetInfoFromCepOutPut> {
    const { data } = await cepClient.get<OrgService.GetInfoFromCepOutPut>(
      `/${cep}/json/`
    );

    return data;
  }

  static async uploadImage({
    userid,
    image,
  }: OrgService.UploadImageInPut): Promise<OrgService.UploadImageOutPut> {
    const { data: res } =
      await uploadImage.postForm<OrgService.UploadImageOutPut>(
        `?userid=${userid}&categoryOfImage='ORG'`,
        {
          file: image,
        }
      );

    return {
      url: res.url,
    };
  }

  static getOnlyTheDirtyFields({
    newData,
    defaultvalues,
  }: {
    newData: UpdateOrgBody;
    defaultvalues: UpdateOrgBody;
  }): UpdateOrgBody {
    const dirtiedFields = {} as UpdateOrgBody;

    const newDataKeys = Object.keys(newData);

    for(const dataKey of newDataKeys) {
      const key = dataKey as keyof typeof newData;

      if(newData[key] !== defaultvalues[key]){
        dirtiedFields[key] = newData[key];
      }
    }
    console.log(dirtiedFields);
    return {
      cep: "123",
    };
  }
}

export namespace OrgService {
  export type FullOrgInfo = {
    cep: string;
    city: string;
    closeHour: string;
    description: string;
    email: string;
    imageUrl?: string;
    name: string;
    neighborhood: string;
    openHour: string;
    street: string;
    user: string;
  };

  export type UpdateOrgInput = {
    orgId: string;
    newData: UpdateOrgBody;
    defaultvalues: UpdateOrgBody;
  };

  export type CreateOrgInput = {
    data: CreateOrgBody & { userid: string };
  };

  export type CreateOrgOutPut = {
    orgId: string;
    name: string;
    imgUrl?: string;
  };
  export type ListOrgsOutPut = {
    _id: string;
    name: string;
    imageUrl?: string;
  }[];

  export type GetInfoFromCepInPut = {
    cep: string;
  };
  export type GetInfoFromCepOutPut = {
    logradouro: string;
    bairro: string;
    localidade: string;
  };

  export type UploadImageInPut = {
    userid: string;
    image: File;
  };

  export type UploadImageOutPut = {
    url: string;
  };

  export type GetOrgInPut = {
    orgid: string;
  };

  export type GetOrgOutPut = FullOrgInfo;
}
