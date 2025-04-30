"use client";

import { useEffect } from "react";
import { api } from "../api";

import { useToken } from "./token";

export const useUser = () => {
  const token = useToken();

  const { data: user, refetch } = api.users.me.useQuery({ enabled: !!token });

  useEffect(() => {
    if (token) {
      refetch();
    }
  }, [token]);

  return token ? user : null;
};
