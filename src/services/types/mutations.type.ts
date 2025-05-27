import { AxiosResponse } from "axios";

export type OnSuccessCBType = (data: AxiosResponse<any, any>) => Promise<unknown> | unknown | undefined

export type OnErrorCBType = (error: Error) => Promise<unknown> | unknown | undefined
