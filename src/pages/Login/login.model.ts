import { useEffect, useMemo, useState } from "react";
import { LoginModelType } from "./login.type";

export const useLoginModel = (): LoginModelType => {
  const [splashTimeout, setSplashTimeout] = useState<boolean>(true);
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

  useEffect(() => {
    setTimeout(() => {
      setSplashTimeout(false);
    }, 1000);
  }, []);

  const isValid = useMemo(() => {
    return (
      userCredentials.email &&
      userCredentials.password &&
      userCredentials.email.length > 0 &&
      userCredentials.password.length >= 8
    );
  }, [userCredentials]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isValid) {
      console.log("Logging in with:", userCredentials);
      setUserCredentials({
        email: "",
        password: "",
      });
    } else {
      console.error("Invalid credentials");
    }
  }

  return {
    props: {
      isValid,
      passwordVisibility,
      setPasswordVisibility,
      setUserCredentials,
      splashTimeout,
      handleSubmit
    },
  };
};
