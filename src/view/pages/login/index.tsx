import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useLoginController } from "./useLoginController";

function LoginPage() {
  const {
    passwordVisibility,
    setPasswordVisibility,
    isValid,
    handleSubmit,
    register,
    errors,
    isPending
  } = useLoginController();

  return (
    <main className="container mx-auto h-screen flex items-center justify-center">
      <div className="flex flex-col gap-10">
        <div className="text-center">
          <p className="text-[#333333] text-base font-semibold leading-10">
            Bem-vindo(a) ao
          </p>
          <p className="text-[#333333] text-[32px]">
            <span className="font-bold">WAITERY</span>APP
          </p>
        </div>
        <form onSubmit={handleSubmit} className="w-[384px] h-[394px]">
          <div className="w-full flex flex-col gap-4">
            <div className="w-full flex flex-col gap-2">
              <Input
                type="email"
                placeholder="E-mail"
                {...register('email')}
                error={errors.email?.message}
              />
            </div>
            <div className="w-full flex flex-col gap-2  relative">
              <Input
                type={passwordVisibility}
                placeholder="Senha"
                 {...register('password')}
                 error={errors.password?.message}
              />
              {passwordVisibility === "password" && (
                <BsEye
                  onClick={() => setPasswordVisibility("text")}
                  size={24}
                  className="cursor-pointer text-[#666666] absolute bottom-3 right-4"
                />
              )}
              {passwordVisibility === "text" && (
                <BsEyeSlash
                  onClick={() => setPasswordVisibility("password")}
                  size={24}
                  className="cursor-pointer text-[#666666] absolute bottom-3 right-4"
                />
              )}
            </div>
            <Button isLoading={isPending} disabled={!isValid || isPending} type="submit">
              Fazer Login
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default LoginPage;
