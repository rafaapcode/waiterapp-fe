import { CreateOrgBody } from "@/pages/Org/useOrgController";
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
}

export namespace OrgService {
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
    cep: string;
    logradouro: string;
    complemento: string;
    unidade: string;
    bairro: string;
    localidade: string;
    uf: string;
    estado: string;
    regiao: string;
    ibge: string;
    gia: string;
    ddd: string;
    siafi: string;
  };

  export type UploadImageInPut = {
    userid: string;
    image: File;
  };

  export type UploadImageOutPut = {
    url: string;
    // categoryOfImage: 'PRODUCT';
  };
}
