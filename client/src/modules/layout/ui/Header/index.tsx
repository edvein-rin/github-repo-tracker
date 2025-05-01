"use client";

import { LoginRegistrationForm } from "@/modules/auth";
import { Button, styles } from "@/modules/shared";
import { removeToken, useUser } from "@/modules/shared/lib";

export type HeaderProps = {
  className?: string;
};

export const Header = ({ className }: HeaderProps) => {
  const user = useUser();

  const handleLogoutButtonClick = () => {
    removeToken();
  };

  return (
    <header
      className={styles("min-h-12 flex items-center justify-center", className)}
    >
      {typeof window === "undefined" ? (
        <div>Loading...</div>
      ) : (
        <>
          {user === undefined && <div>Loading...</div>}
          {user === null && <LoginRegistrationForm />}
          {!!user && (
            <div className="flex gap-6 items-center">
              <span className="font-bold">{user.email}</span>
              <Button onClick={handleLogoutButtonClick}>Logout</Button>
            </div>
          )}
        </>
      )}
    </header>
  );
};
