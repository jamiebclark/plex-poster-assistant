import classNames from "classnames";
import { PropsWithChildren } from "react";

type AppButtonProps = {
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  title?: string;
};
export default function AppButton({
  onClick,
  className,
  children,
  disabled,
  title,
}: PropsWithChildren<AppButtonProps>) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      title={title}
      className={classNames(
        className,
        "border rounded bg-slate-400 p-2 disabled:opacity-50 transition-all hover:bg-slate-500"
      )}
    >
      {children}
    </button>
  );
}
