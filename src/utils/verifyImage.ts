import { verifyImage } from "./apiClient";

export const verifyImageIntegrity = async (image: File): Promise<boolean> => {
  try {
    const { data } = await verifyImage.postForm("/files", {file: image});
    const analyseLink = data.data.links.self;
    if(!analyseLink) {
      return true;
    }
    const {status} = await verifyImage.get(analyseLink);
    if(status !== 200) {
      return true;
    }
    return false;
  } catch (error: any) {
    console.log(error.message);
    return true;
  }
};
