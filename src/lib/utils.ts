import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatNameOfOrg(orgName: string): string {
  const nameSplited = orgName.split(' ');
  if(nameSplited.length < 2) {
    return `${nameSplited[0][0].toLocaleUpperCase()}${nameSplited[0][1].toLocaleUpperCase()}`
  }

  return `${nameSplited[0][0].toLocaleUpperCase()}${nameSplited[1][0].toLocaleUpperCase()}`
}
