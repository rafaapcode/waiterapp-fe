import { ElementType } from 'react';

interface HeaderProps {
  title: string;
  subtitle: string;
  Icon: ElementType;
  iconSize?: number;
  rightButton?: {
    Icon: ElementType;
    text: string;
    onClick: () => void;
    iconSize?: number;
  };
}

function Header({ title, subtitle, Icon, rightButton, iconSize }: HeaderProps) {
  return (
    <header className="flex justify-between">
      <div className="flex flex-col">
        <div className="flex gap-2">
          <Icon size={iconSize ? iconSize : 32} />
          <p className="font-semibold text-2xl">{title}</p>
        </div>
        <p className="text-[#666666] mt-4">{subtitle}</p>
      </div>
      {rightButton && (
        <button className="flex gap-2 items-center" onClick={rightButton.onClick}>
          <rightButton.Icon size={rightButton.iconSize ? rightButton.iconSize : 24} className="text-[#D73035]" />
          <p className="text-[#D73035] font-semibold">{rightButton.text}</p>
        </button>
      )}
    </header>
  );
}

export default Header;
