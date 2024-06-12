import { yellow } from 'colorette';
const warns = new Map<string, boolean>();

/**
 * A help to show warns only once.
 * @param message - The message to show.
 * @param context - The context of the message.
 * @returns
 */
export const showWarns = (message: string, context?: string) => {
  if (warns.get(message)) return;
  console.log(`${yellow('WARN')}: ${message}`, context);
  warns.set(message, true);
};
