import { useMutation as useReactQueryMutation } from "@tanstack/react-query";

import type { User, Repository } from "../../../entities";
import { axiosClient } from "../../axiosClient";
import { queryClient, QueryKey } from "../../../query-client";

export const request = (data: { userId: User["id"]; repositoryPath: string }) =>
  axiosClient
    .post<Repository>(`/users/${data.userId}/repositories`, {
      repositoryPath: data.repositoryPath,
    })
    .then((response) => response.data);

export const useMutation = () =>
  useReactQueryMutation({
    mutationFn: (data: { userId: User["id"]; repositoryPath: string }) =>
      request(data),
    onSuccess: async (data, variables) => {
      await queryClient.invalidateQueries({
        queryKey: [QueryKey.USERS, variables.userId, QueryKey.REPOSITORIES],
      });
      await queryClient.invalidateQueries({
        queryKey: [
          QueryKey.USERS,
          variables.userId,
          QueryKey.REPOSITORIES,
          data.id,
        ],
      });
    },
  });

export const create = {
  request,
  useMutation,
};
