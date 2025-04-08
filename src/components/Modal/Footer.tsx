import { ReactNode } from "react";

interface FooterProps {
  children?: ReactNode;
  orientation: "horizontal" | "vertical";
  isLoading: boolean;
  onCancel: () => Promise<void>;
  onClick?: () => Promise<void>;
  cancelTitle: string;
  successTitle?: string;
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
    horizontal: "flex-row",
    vertical: "flex-col",
  };

  return (
    <footer className={`flex ${orientationOption[orientation]} mt-8`}>
      {children && children}
      {!children && (
        <button
          onClick={onClick}
          disabled={isLoading}
          type="button"
          className="bg-[#333] disabled:opacity-50 disabled:cursor-not-allowed rounded-[48px] border-none text-white py-3 px-6 flex justify-center items-center gap-2"
        >
          {successTitle}
        </button>
      )}
      <button
        disabled={isLoading}
        onClick={onCancel}
        type="button"
        className="disabled:opacity-50 disabled:cursor-not-allowed py-3 px-6 text-[#D73035] font-bold border-none mt-3"
      >
        {cancelTitle}
      </button>
    </footer>
  );
}

export default Footer;
