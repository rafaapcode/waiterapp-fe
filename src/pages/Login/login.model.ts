import { useSetToken } from "@/hooks/useToken";
import { apiclient } from "@/utils/apiClient";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { LoginModelType } from "./login.type";

export const useLoginModel = (): LoginModelType => {
  const setToken = useSetToken();
  const navigate = useNavigate();
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

  const { mutateAsync: loginUser, isPending } = useMutation({
    mutationFn: async (data: typeof userCredentials) =>
      await apiclient.post("/user/login", data),
    onSuccess: ({ data, status }) => {
      if (isValid) {
        if (status !== 200) {
          toast.error(data.message || "Erro ao realizar o login");
          return;
        }

        if(!data.role || data.role !== "ADMIN") {
          toast.error("Você não tem permissão para acessar o sistema");
          return;
        }

        const tokenResponse = setToken(data.access_token);

        if (!tokenResponse) {
          toast.error(data.message || "Erro ao realizar o login");
          return;
        }

        return navigate("/app/home");
      } else {
        toast.error("Credenciais inválidas");
      }
    },
    onError: (error) => {
      const err = error as AxiosError;
      if(err.status === 404) {
        toast.warning("Usuário ou senha incorretos");
      } else {
        toast.error("Erro ao realizar o login , contate o suporte");
      }
      return;
    },
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
    const isValidCredentials =
      !!userCredentials.email &&
      !!userCredentials.password &&
      userCredentials.email.length > 0 &&
      userCredentials.password.length >= 8;

    setIsValid(isValidCredentials);
  }, [userCredentials]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginUser(userCredentials);
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
      isLoading: isPending,
    },
  };
};
