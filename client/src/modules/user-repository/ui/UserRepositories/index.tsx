import { RepositoryList, RepositoryListItem } from "@/modules/repository";
import { styles } from "@/modules/shared";

export type UserRepositoriesProps = {
  className?: string;
};

export const UserRepositories = ({ className }: UserRepositoriesProps) => {
  const repositories: { id: number }[] = [];

  return (
    <RepositoryList className={styles(className)}>
      {repositories.map(
        (repository) => null
        // <RepositoryListItem key={repository.id} />
      )}
    </RepositoryList>
  );
};
