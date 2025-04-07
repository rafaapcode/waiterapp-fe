import { useEffect, useState } from "react";
import { LoginModelType } from "./login.type";

export const useLoginModel = (): LoginModelType => {
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
  };

  return {
    props: {
      isValid,
      passwordVisibility,
      setPasswordVisibility,
      handleChange: handleChangeCredentials,
      splashTimeout,
      handleSubmit,
      userCredentials
    },
  };
};
