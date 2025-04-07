import { ChangeEvent, Dispatch, FormEvent } from "react";

export interface LoginModelType {
  props: {
    splashTimeout: boolean;
    passwordVisibility: "password" | "text";
    setPasswordVisibility: Dispatch<React.SetStateAction<"password" | "text">>;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    isValid: boolean | string;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
    userCredentials: {email: string; password: string};
  };
}
