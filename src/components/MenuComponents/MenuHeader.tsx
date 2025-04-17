
interface MenuHeaderProps {
  onClick: () => void;
  title: string;
  quantity?: number;
}

function MenuHeader({ onClick, quantity, title }: MenuHeaderProps) {
  return (
    <header className="flex justify-between items-center">
      <p className="text-lg text-[#333333] font-semibold">{title}<span className="bg-[#CCCCCC33] ml-4 px-2 py-1 rounded-md">{quantity ? quantity : 0}</span></p>
      <button onClick={onClick} className="font-semibold text-[#D73035]">
        {title}
      </button>
    </header>
  )
}

export default MenuHeader
