import { ReactNode } from "react";
import CloseIcon from "../../assets/images/close-icon.svg";

interface HeaderProps {
  children: ReactNode;
  onClose: () => void;
}

function Header({ children, onClose }: HeaderProps) {
  return (
    <header className="flex items-center justify-between">
      {children}
      <button onClick={onClose} type="button" className="leading-[0px]">
        <img src={CloseIcon} alt="close-icon" />
      </button>
    </header>
  );
}

export default Header;
