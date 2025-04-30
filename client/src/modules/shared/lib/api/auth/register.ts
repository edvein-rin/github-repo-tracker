import { useMutation as useReactQueryMutation } from "@tanstack/react-query";

import { axiosClient } from "../axiosClient";
import { queryClient, QueryKey } from "../../query-client";

export const request = (data: { email: string; password: string }) =>
  axiosClient
    .post<{ accessToken: string }>("/auth/register", data)
    .then((response) => response.data);

export const useMutation = () =>
  useReactQueryMutation({
    mutationFn: (data: { email: string; password: string }) => request(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [QueryKey.USERS, "me"] });
    },
  });

export const register = {
  request,
  useMutation,
};
