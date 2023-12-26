import classNames from "classnames";
import { PropsWithChildren } from "react";

type LinkProps = {
  href?: string;
  className?: string;
  target?: string;
  rel?: string;
};
export default function Link({
  href,
  className,
  target,
  rel,
  children,
}: PropsWithChildren<LinkProps>) {
  return (
    <a
      className={classNames(
        className,
        "underline text-slate-900 hover:text-slate-500"
      )}
      href={href}
      target={target}
      rel={rel}
    >
      {children}
    </a>
  );
}
