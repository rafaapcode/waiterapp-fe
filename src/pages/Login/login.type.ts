import { Dispatch, FormEvent } from "react";

export interface LoginModelType {
  props: {
    splashTimeout: boolean;
    passwordVisibility: "password" | "text";
    setPasswordVisibility: Dispatch<React.SetStateAction<"password" | "text">>;
    setUserCredentials: Dispatch<
      React.SetStateAction<{
        email: string;
        password: string;
      }>
    >;
    isValid: boolean | string;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  };
}
