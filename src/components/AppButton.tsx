import classNames from "classnames";
import { PropsWithChildren } from "react";

const typeColors = {
  default: "bg-slate-400 hover:bg-slate-500",
  primary: "bg-blue-700 text-white hover:bg-blue-900",
} as const;

type AppButtonProps = {
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  title?: string;
  type?: keyof typeof typeColors;
};

export default function AppButton({
  onClick,
  className,
  children,
  disabled,
  title,
  type: customType,
}: PropsWithChildren<AppButtonProps>) {
  const type = customType ?? "default";

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      title={title}
      className={classNames(
        className,
        "border rounded p-2 disabled:opacity-50 transition-all",
        typeColors[type]
      )}
    >
      {children}
    </button>
  );
}
