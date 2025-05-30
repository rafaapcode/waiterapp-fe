import { ReactNode } from "react";

interface MenuHeaderProps {
  onClick: () => void;
  title: string;
  btnTitle: string;
  quantity?: number;
  children?: ReactNode;
  filters?: boolean;
}

function MenuHeader({ onClick, quantity, title,children,btnTitle, filters = false }: MenuHeaderProps) {
  return (
    <header className="flex justify-between items-center">
      <p className="text-lg text-[#333333] font-semibold">{title}<span className="bg-[#CCCCCC33] ml-4 px-2 py-1 rounded-md">{quantity ? quantity : 0}</span></p>
      {filters && children}
      <button onClick={onClick} className="font-semibold text-[#D73035]">
        {btnTitle}
      </button>
    </header>
  )
}

export default MenuHeader
