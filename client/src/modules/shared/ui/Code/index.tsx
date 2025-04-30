import { styles } from "@/modules/shared";
import { ReactNode } from "react";

export type CodeProps = {
  children?: ReactNode;
  className?: string;
};

export const Code = ({ children, className }: CodeProps) => (
  <code
    className={styles(
      "bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold",
      className
    )}
  >
    {children}
  </code>
);
