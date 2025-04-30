import classNames from "classnames";
import { extendTailwindMerge } from "tailwind-merge";

const mergeTailwindClasses = extendTailwindMerge({});

/**
 * Joins CSS classes and merges Tailwind CSS classes.
 */
export const styles = (...arguments_: classNames.ArgumentArray) =>
  mergeTailwindClasses(classNames(...arguments_));
