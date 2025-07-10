import { ElementType } from 'react';
import Button from '../atoms/Button';
import HeaderContainer from '../atoms/Header';
import Text from '../atoms/Text';


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
    <HeaderContainer className="justify-between">
      <div className="flex flex-col">
        <div className="flex gap-2">
          <Icon size={iconSize ? iconSize : 32} />
          <Text className="font-semibold text-2xl">{title}</Text>
        </div>
        <Text className="text-[#666666] mt-4">{subtitle}</Text>
      </div>
      {rightButton && (
        <Button  onClick={rightButton.onClick} variant="secondary">
          <rightButton.Icon size={rightButton.iconSize ? rightButton.iconSize : 24} className="text-[#D73035]" />
          <p className="text-[#D73035] font-semibold">{rightButton.text}</p>
        </Button>
      )}
    </HeaderContainer>
  );
}

export default Header;
