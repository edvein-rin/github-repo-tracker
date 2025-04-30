import { Code, styles } from "@/modules/shared";

export type RepositoryListItemProps = {
  author: string;
  name: string;
  // TODO: add rest fields.
  className?: string;
};

export const RepositoryListItem = ({
  author,
  name,
  className,
}: RepositoryListItemProps) => {
  return (
    <li className={styles(className)}>
      <Code>
        {author}/{name}
      </Code>
    </li>
  );
};
