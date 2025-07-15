import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { LoaderCircle } from "lucide-react";
import { ReactNode } from "react";
import CloseIcon from "../../assets/images/close-icon.svg";

const divChildrenVariants = cva(["bg-white rounded-lg p-8"], {
  variants: {
    size: {
      sm: "w-1/4",
      md: "w-1/2",
      lg: "w-3/5",
      xl: "w-3/4",
    },
  },
});

const divVariants = cva(
  [
    "fixed w-full h-full top-0 left-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-10",
  ],
  {
    variants: {
      priority: {
        true: "z-20",
      },
    },
  }
);

interface ModalProps
  extends VariantProps<typeof divChildrenVariants>,
    VariantProps<typeof divVariants> {
  children: ReactNode;
  isVisible: boolean;
}

interface HeaderProps {
  children: ReactNode;
  onClose: () => void;
}

interface FooterProps {
  children?: ReactNode;
  orientation: "horizontal" | "vertical";
  isLoading: boolean;
  onCancel: () => void;
  onClick?: () => Promise<void>;
  cancelTitle: string;
  successTitle?: string;
}

interface CustomFooter {
  children: ReactNode;
}

interface BodyProps {
  children: ReactNode;
  className?: string;
}

function Modal({ children, isVisible, size, priority }: ModalProps) {
  if (!isVisible) {
    return null;
  }

  return (
    <div className={cn(divVariants({ priority }))}>
      <div className={cn(divChildrenVariants({ size }))}>{children}</div>
    </div>
  );
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

function Footer({
  children,
  orientation,
  isLoading,
  onCancel,
  cancelTitle,
  onClick,
  successTitle,
}: FooterProps) {
  const orientationOption: Record<typeof orientation, string> = {
    horizontal: "flex-row justify-between",
    vertical: "flex-col-reverse",
  };

  return (
    <footer className={`flex ${orientationOption[orientation]} items-center mt-8`}>
      <button
        disabled={isLoading}
        onClick={onCancel}
        type="button"
        className="disabled:opacity-50 disabled:cursor-not-allowed py-3 px-6 text-[#D73035] font-bold border-none"
      >
        {isLoading ? <LoaderCircle size={22} className="animate-spin"/> :cancelTitle}
      </button>
      {children && children}
      {!children && (
        <button
          onClick={onClick}
          disabled={isLoading}
          type="button"
          className="bg-[#D73035] disabled:opacity-50 disabled:cursor-not-allowed rounded-[48px] border-none text-white py-3 px-6"
        >
          {isLoading ? <LoaderCircle size={22} className="animate-spin"/> :successTitle}
        </button>
      )}
    </footer>
  );
}

function CustomFooter({ children }: CustomFooter) {
  return (
    <footer className="flex justify-start items-center mt-8">{children}</footer>
  );
}

function Body({children, className}: BodyProps) {
  return (
    <div className={cn('mt-10', className)}>
      {children}
    </div>
  )
}

Modal.Header = Header;
Modal.Footer = Footer;
Modal.CustomFooter = CustomFooter;
Modal.Body = Body;

export default Modal;
