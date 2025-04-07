import { BsEye, BsEyeSlash } from "react-icons/bs";
import { VscLoading } from "react-icons/vsc";
import logo from "../../assets/images/logo.svg";
import { LoginModelType } from "./login.type";

const SplashScreen = () => (
  <div className="bg-neutral-900 flex flex-col gap-16 h-screen justify-center items-center">
    <img src={logo} alt="waiter logo" />
    <VscLoading className="text-neutral-600 animate-spin" size={32} />
  </div>
);

function LoginView({ props }: LoginModelType) {
  const {
    splashTimeout,
    passwordVisibility,
    setPasswordVisibility,
    setUserCredentials,
    isValid,
    handleSubmit
  } = props;

  if (splashTimeout) {
    return <SplashScreen />;
  }

  return (
    <main className="container mx-auto h-screen flex items-center justify-center">
      <div className="flex flex-col gap-10">
        <div className="text-center">
          <p className="text-[#333333] text-base font-semibold leading-10">
            Bem-vindo(a) ao
          </p>
          <p className="text-[#333333] text-[32px]">
            <span className="font-bold">WAITER</span>APP
          </p>
        </div>
        <form onSubmit={handleSubmit} className="w-[384px] h-[394px]">
          <div className="w-full flex flex-col gap-4">
            <div className="w-full flex flex-col gap-2">
              <label htmlFor="email" className="text-[#999999]">
                E-mail
              </label>
              <input
                onChange={(e) =>
                  setUserCredentials((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
                type="email"
                name="email"
                id="email"
                className="border border-[#CCCCCC] rounded-lg p-4"
                placeholder="Seu e-mail de acesso"
              />
            </div>
            <div className="w-full flex flex-col gap-2">
              <label htmlFor="senha" className="text-[#999999]">
                Senha
              </label>
              <div className="border border-[#CCCCCC] rounded-lg flex items-center pr-3 group">
                <input
                  onChange={(e) =>
                    setUserCredentials((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  type={passwordVisibility}
                  name="senha"
                  id="senha"
                  className="w-full h-full p-4 outline-none border-none bg-transparent"
                  placeholder="Informe sua senha"
                />
                {passwordVisibility === "password" && <BsEye onClick={() => setPasswordVisibility("text")} size={24} className="cursor-pointer text-[#666666] hidden group-hover:block"/>}
                {passwordVisibility === "text" && <BsEyeSlash onClick={() => setPasswordVisibility("password")} size={24} className="cursor-pointer text-[#666666] hidden group-hover:block"/>}
              </div>
            </div>
            <button
              disabled={!isValid}
              type="submit"
              className="bg-[#D73035] hover:bg-[#ec4248] text-white p-2 disabled:bg-[#CCCCCC] py-[14px] px-7 rounded-[44px] transition-all  duration-200"
            >
              Fazer Login
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default LoginView;
