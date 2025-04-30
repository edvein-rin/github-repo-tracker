import {
  UseQueryOptions,
  useQuery as useReactQuery,
} from "@tanstack/react-query";

import { axiosClient } from "../axiosClient";
import { User } from "../../entities";
import { QueryKey } from "../../query-client";

export const request = () =>
  axiosClient.get<User>("/users/me").then((response) => response.data);

export const useQuery = (options: { enabled?: boolean }) =>
  useReactQuery({
    queryKey: [QueryKey.USERS, "me"],
    queryFn: () => request(),
    ...options,
  });

export const me = {
  request,
  useQuery,
};
