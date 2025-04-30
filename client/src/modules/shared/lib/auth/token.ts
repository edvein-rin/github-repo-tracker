"use client";

import { useEffect, useState } from "react";

const TOKEN_KEY = "access-token";

const TOKEN_CHANGE_EVENT_NAME = "token-has-changed";

export const getToken = () => {
  if (typeof window === "undefined") {
    return null;
  }

  const token = localStorage.getItem(TOKEN_KEY);

  if (!token) {
    return null;
  }

  return token;
};

export const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
  window.dispatchEvent(new Event(TOKEN_CHANGE_EVENT_NAME));
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  window.dispatchEvent(new Event(TOKEN_CHANGE_EVENT_NAME));
};

export const useToken = () => {
  const [token, setToken] = useState<string | null>(getToken());

  useEffect(() => {
    const processStorageUpdate = () => {
      setToken(getToken());
    };

    window.addEventListener(TOKEN_CHANGE_EVENT_NAME, processStorageUpdate);

    return () => {
      window.removeEventListener(TOKEN_CHANGE_EVENT_NAME, processStorageUpdate);
    };
  }, []);

  return token;
};
