import { AxiosError } from "axios";

export const errorToErrorMessage = (
  error: unknown,
  fallbackMessage = "Unexpected error"
): string => {
  if (error instanceof AxiosError) {
    return error.response?.data?.message ?? error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallbackMessage;
};
