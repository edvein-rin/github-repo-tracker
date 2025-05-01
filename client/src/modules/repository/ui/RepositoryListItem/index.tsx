import { Button, Code, Link, styles } from "@/modules/shared";

export type RepositoryListItemProps = {
  author: string;
  name: string;
  url: string;
  starsCount: number;
  forksCount: number;
  openIssuesCount: number;
  creationDate: Date;
  onReload?: () => void;
  onDelete?: () => void;
  className?: string;
};

export const RepositoryListItem = ({
  author,
  name,
  url,
  starsCount,
  forksCount,
  openIssuesCount,
  creationDate,
  onReload,
  onDelete,
  className,
}: RepositoryListItemProps) => (
  <li
    className={styles(
      "flex flex-col gap-3",
      "w-[600px]",
      "py-4 px-6",
      "bg-foreground text-background rounded-3xl",
      className
    )}
  >
    <div className="flex justify-between">
      <Link href={url} target="_blank" rel="noopener noreferrer">
        <Code className="p-0">
          {author}/{name}
        </Code>
      </Link>
      <b>{new Date(creationDate).toLocaleDateString()}</b>
    </div>
    <div className="flex gap-4">
      <div className="flex gap-1 items-center">
        <b>{starsCount}</b>
        <span>stars</span>
      </div>
      <div className="flex gap-1 items-center">
        <b>{forksCount}</b>
        <span>forks</span>
      </div>
      <div className="flex gap-1 items-center">
        <b>{openIssuesCount}</b>
        <span>open issues</span>
      </div>
      <div className="grow flex justify-end">
        <div className="flex gap-4">
          <Button
            variant="clean"
            className="hover:underline"
            onClick={onReload}
          >
            Reload
          </Button>
          <Button
            variant="clean"
            className="hover:underline"
            onClick={onDelete}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  </li>
);
