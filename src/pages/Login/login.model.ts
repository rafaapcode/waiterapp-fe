import { apiclient } from "@/utils/apiClient";
import { useEffect, useState } from "react";
import { redirect } from "react-router";
import { toast } from "react-toastify";
import { LoginModelType } from "./login.type";

export const useLoginModel = (): LoginModelType => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [splashTimeout, setSplashTimeout] = useState<boolean>(true);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [passwordVisibility, setPasswordVisibility] = useState<
    "password" | "text"
  >("password");
  const [userCredentials, setUserCredentials] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  const handleChangeCredentials = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    setTimeout(() => {
      setSplashTimeout(false);
    }, 1000);
  }, []);

  useEffect(() => {
    const isValidCredentials = (
      !!userCredentials.email &&
      !!userCredentials.password &&
      userCredentials.email.length > 0 &&
      userCredentials.password.length >= 8
    );

    setIsValid(isValidCredentials);
  }, [userCredentials]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      if (isValid) {
        const res = await apiclient.post("/user/login", userCredentials);

        if(res.status !== 200) {
          toast.error(res.data.message || "Erro ao realizar o login");
          return;
        }
        if(!window.localStorage) {
          toast.error(res.data.message || "Erro ao realizar o login");
          return
        }
        localStorage.setItem("token", res.data.access_token);
        redirect('/app/home')
      } else {
        console.error("Invalid credentials");
        toast.error("Credenciais inválidas");
      }
    } catch (error: any) {
      if(error.response && error.response.status === 404) {
        toast.warning("Usuário não encontrado !");
      } else {
        toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    props: {
      isValid,
      passwordVisibility,
      setPasswordVisibility,
      handleChange: handleChangeCredentials,
      splashTimeout,
      handleSubmit,
      userCredentials,
      isLoading
    },
  };
};
