import { VscLoading } from "react-icons/vsc";
import logo from "../../assets/images/logo.svg";

const SplashScreen = () => (
  <div className="bg-neutral-900 flex flex-col gap-16 h-screen justify-center items-center">
    <img src={logo} alt="waiter logo" />
    <VscLoading className="text-neutral-600 animate-spin" size={32} />
  </div>
);

export default SplashScreen
