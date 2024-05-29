import { yellow } from 'colorette';
const warns = new Map<string, boolean>();

/**
 * A help to show warns only once.
 * @param message - The message to show.
 * @returns
 */
export const showWarns = (message: string) => {
  if (warns.get(message)) return;
  console.log(`${yellow('WARN')}: ${message}`);
  warns.set(message, true);
};
