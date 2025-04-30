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
  return <ul className={styles(className)}>{children}</ul>;
};
