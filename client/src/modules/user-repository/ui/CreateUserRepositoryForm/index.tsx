"use client";

import { api, Button, styles, TextInput } from "@/modules/shared";
import { useUser } from "@/modules/shared/lib";
import { errorToErrorMessage } from "@/modules/shared/lib/errorToErrorMessage";
import { useActionState } from "react";

export type CreateUserRepositoryFormProps = {
  className?: string;
};

export const CreateUserRepositoryForm = ({
  className,
}: CreateUserRepositoryFormProps) => {
  const user = useUser();

  const { mutateAsync: createUserRepositoryAsync } =
    api.users.repositories.create.useMutation();

  const [{ error }, submitAction, isPending] = useActionState<
    {
      error: unknown | null;
    },
    FormData
  >(
    async (_previousState, formData) => {
      if (!user) {
        return { error: "User is not logged in" };
      }

      const repositoryPath = formData.get("repositoryPath") as string;

      try {
        await createUserRepositoryAsync({
          userId: user.id,
          repositoryPath: repositoryPath,
        });
      } catch (error) {
        return { error };
      }

      return { error: null };
    },
    { error: null }
  );

  const errorMessage = error ? errorToErrorMessage(error) : null;

  if (!user) {
    return null;
  }

  return (
    <form
      className={styles("flex flex-col gap-2", className)}
      action={submitAction}
    >
      <div className="flex gap-4 justify-center">
        <TextInput name="repositoryPath" placeholder="author/repository-name" />
        <Button type="submit" disabled={isPending}>
          Add
        </Button>
      </div>
      {!!errorMessage && (
        <span className="line-clamp-1 text-red-400 px-5" title={errorMessage}>
          {errorMessage}
        </span>
      )}
    </form>
  );
};
