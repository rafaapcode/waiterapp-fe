import { useAuth } from "@/hooks/useAuth";
import { LoginService } from "@/services/api/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, 'A senha deve ter ao menos 6 caracteres')
});

type LoginBody = z.infer<typeof loginSchema>;

export function useLoginController() {
  const navigate = useNavigate();
  const { setUser, signIn } = useAuth();
  const [passwordVisibility, setPasswordVisibility] = useState<
    "password" | "text"
  >("password");


  const { handleSubmit: hookHandleSubmit, register, formState: {errors, isValid} } = useForm<LoginBody>({
    resolver: zodResolver(loginSchema)
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: LoginBody) => {
      return await LoginService.loginUser(data);
    }
  });

  const handleSubmit = hookHandleSubmit(async (data) => {
    try {
      const {access_token, refresh_token, id, role} = await mutateAsync(data);
      signIn(access_token, refresh_token);
      setUser({
        id,
        role
      });
      navigate('/app/home');
    } catch (error) {
      console.log(error);
      toast.error('Erro ao realizar o login');
    }
  });

  return {
    isValid,
    passwordVisibility,
    setPasswordVisibility,
    errors,
    handleSubmit,
    register,
    isPending,
  };
}
