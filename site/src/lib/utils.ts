import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * The shadcn class helper, and the one import every component here shares.
 *
 * clsx flattens conditionals into a class string; tailwind-merge then resolves
 * conflicts so a later utility wins over an earlier one. Without the merge,
 * passing className="p-8" to a component whose base is "p-4" yields "p-4 p-8"
 * and the winner is decided by stylesheet order rather than by the caller.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
