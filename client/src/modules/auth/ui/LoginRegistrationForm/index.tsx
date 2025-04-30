"use client";

import { Button, styles, TextInput } from "@/modules/shared";
import { api, setToken } from "@/modules/shared/lib";
import { AxiosError } from "axios";
import { ChangeEventHandler, useCallback, useState } from "react";

export type LoginRegistrationFormProps = {
  className?: string;
};

export const LoginRegistrationForm = ({
  className,
}: LoginRegistrationFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  const { mutateAsync: loginAsync } = api.auth.login.useMutation();

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        const { accessToken } = await loginAsync({ email, password });
        setToken(accessToken);
        setEmail("");
        setPassword("");
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response?.status === 401) {
            setErrorMessage("Invalid email or password");
          }
        } else {
          setErrorMessage(JSON.stringify(error));
        }
      }
    },
    [loginAsync]
  );

  const handleLoginButtonClick = useCallback(() => {
    setErrorMessage(undefined);
    void login(email, password);
  }, [email, password]);

  const { mutateAsync: registerAsync } = api.auth.register.useMutation();

  const register = useCallback(
    async (email: string, password: string) => {
      try {
        const { accessToken } = await registerAsync({ email, password });
        setToken(accessToken);
        setEmail("");
        setPassword("");
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response?.status === 400) {
            setErrorMessage("Invalid email");
          }
          if (error.response?.status === 500) {
            setErrorMessage("Internal server error");
          }
        } else {
          setErrorMessage(JSON.stringify(error));
        }
      }
    },
    [registerAsync]
  );

  const handleRegisterButtonClick = useCallback(() => {
    setErrorMessage(undefined);
    void register(email, password);
  }, [email, password]);

  const handleEmailInputChange: ChangeEventHandler<HTMLInputElement> =
    useCallback((event) => {
      setEmail(event.target.value);
    }, []);

  const handlePasswordInputChange: ChangeEventHandler<HTMLInputElement> =
    useCallback((event) => {
      setPassword(event.target.value);
    }, []);

  return (
    <form className={styles("flex flex-col gap-2", className)}>
      <div className="flex gap-[24px] flex-wrap items-center justify-center">
        <TextInput
          name="email"
          placeholder="Email"
          type="email"
          required
          value={email}
          onChange={handleEmailInputChange}
        />
        <TextInput
          name="password"
          placeholder="Password"
          type="password"
          required
          value={password}
          onChange={handlePasswordInputChange}
        />
        <Button onClick={handleLoginButtonClick}>Login</Button>
        <Button onClick={handleRegisterButtonClick} variant="secondary">
          Register
        </Button>
      </div>
      {errorMessage && (
        <span className="line-clamp-1 text-red-400 px-5" title={errorMessage}>
          {errorMessage}
        </span>
      )}
    </form>
  );
};
