import { ReactNode } from "react";

import { styles } from "@/modules/shared";

export type RepositoryListProps = {
  className?: string;
  children?: ReactNode;
};

export const RepositoryList = ({
  children,
  className,
}: RepositoryListProps) => {
  return (
    <ul className={styles("flex flex-col gap-4", className)}>{children}</ul>
  );
};
