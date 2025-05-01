"use client";

import { RepositoryList, RepositoryListItem } from "@/modules/repository";
import { api, styles } from "@/modules/shared";
import { useUser } from "@/modules/shared/lib";
import { useCallback } from "react";

export type UserRepositoriesProps = {
  className?: string;
};

export const UserRepositories = ({ className }: UserRepositoriesProps) => {
  const user = useUser();

  const { data, isLoading, error } = api.users.repositories.getAll.useQuery(
    {
      userId: user?.id ?? 0,
    },
    { enabled: !!user }
  );
  const repositories = data?.repositories;

  const { mutateAsync: reloadRepositoryAsync } =
    api.users.repositories.reload.useMutation();

  const { mutateAsync: removeRepositoryAsync } =
    api.users.repositories.remove.useMutation();

  const onRepositoryReload = useCallback(
    (repositoryId: number) => {
      if (!user) return;
      return reloadRepositoryAsync({
        userId: user.id,
        repositoryId,
      });
    },
    [user]
  );
  const onRepositoryDelete = useCallback(
    (repositoryId: number) => {
      if (!user) return;
      return removeRepositoryAsync({
        userId: user.id,
        repositoryId,
      });
    },
    [user]
  );

  if (!user) {
    return null;
  }

  if (error) {
    throw error;
  }

  if (isLoading || !repositories) {
    return <div>Loading...</div>;
  }

  return (
    <RepositoryList className={styles(className)}>
      {repositories.length === 0 && (
        <div className="text-center">
          You don't have any repositories yet. Create one to get started!
        </div>
      )}
      {repositories.map((repository) => {
        const handleReload = () => {
          return onRepositoryReload(repository.id);
        };
        const handleDelete = () => {
          return onRepositoryDelete(repository.id);
        };

        return (
          <RepositoryListItem
            key={repository.id}
            author={repository.author}
            name={repository.name}
            url={repository.url}
            starsCount={repository.starsCount}
            forksCount={repository.forksCount}
            openIssuesCount={repository.openIssuesCount}
            creationDate={repository.creationDate}
            onReload={handleReload}
            onDelete={handleDelete}
          />
        );
      })}
    </RepositoryList>
  );
};
