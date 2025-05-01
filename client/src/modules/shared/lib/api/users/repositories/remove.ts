import { useMutation as useReactQueryMutation } from "@tanstack/react-query";

import type { User, Repository } from "../../../entities";
import { axiosClient } from "../../axiosClient";
import { queryClient, QueryKey } from "../../../query-client";

export const request = (data: {
  userId: User["id"];
  repositoryId: Repository["id"];
}) =>
  axiosClient
    .delete<void>(`/users/${data.userId}/repositories/${data.repositoryId}`)
    .then((response) => response.data);

export const useMutation = () =>
  useReactQueryMutation({
    mutationFn: (data: {
      userId: User["id"];
      repositoryId: Repository["id"];
    }) => request(data),
    onSuccess: async (_data, variables) => {
      await queryClient.invalidateQueries({
        queryKey: [QueryKey.USERS, variables.userId, QueryKey.REPOSITORIES],
      });
      await queryClient.invalidateQueries({
        queryKey: [
          QueryKey.USERS,
          variables.userId,
          QueryKey.REPOSITORIES,
          variables.repositoryId,
        ],
      });
    },
  });

export const remove = {
  request,
  useMutation,
};
