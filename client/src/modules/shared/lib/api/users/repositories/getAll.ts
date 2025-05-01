import { useQuery as useReactQuery } from "@tanstack/react-query";

import type { User, Repository } from "../../../entities";
import { axiosClient } from "../../axiosClient";
import { QueryKey } from "../../../query-client";

export const request = (data: { userId: User["id"] }) =>
  axiosClient
    .get<{ repositories: Repository[] }>(`users/${data.userId}/repositories`)
    .then((response) => response.data);

export const useQuery = (
  data: { userId: User["id"] },
  options?: { enabled?: boolean }
) =>
  useReactQuery({
    queryKey: [QueryKey.USERS, data.userId, QueryKey.REPOSITORIES],
    queryFn: () => request({ userId: data.userId }),
    ...options,
  });

export const getAll = {
  request,
  useQuery,
};
