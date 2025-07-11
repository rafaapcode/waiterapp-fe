import { Transition } from "@headlessui/react";
import { VscLoading } from "react-icons/vsc";
import logo from "../../assets/images/logo.svg";

interface SplashScreenProps {
  isLoading: boolean;
}

const SplashScreen = ({ isLoading }: SplashScreenProps) => (
  <Transition
    show={isLoading}
    enter="transition-opacity duration-75"
    enterFrom="opacity-0"
    enterTo="opacity-100"
    leave="transition-opacity duration-150"
    leaveFrom="opacity-100"
    leaveTo="opacity-0"
  >
    <div className="bg-neutral-900 flex flex-col gap-16 h-screen justify-center items-center">
      <img src={logo} alt="waiter logo" />
      <VscLoading className="text-neutral-600 animate-spin" size={32} />
    </div>
  </Transition>
);

export default SplashScreen;
