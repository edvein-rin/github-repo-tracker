import { InputHTMLAttributes } from "react";
import { styles } from "../../lib";

export type TextInputProps = InputHTMLAttributes<HTMLInputElement>;

export const TextInput = (props: TextInputProps) => (
  <input
    className={styles(
      "rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto",
      "focus:outline-none"
    )}
    type="text"
    {...props}
  />
);
