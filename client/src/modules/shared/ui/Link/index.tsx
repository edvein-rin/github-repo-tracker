import { AnchorHTMLAttributes } from "react";

export type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement>;

export const Link = (props: LinkProps) => (
  <a
    className="flex items-center gap-2 hover:underline hover:underline-offset-4"
    {...props}
  />
);
