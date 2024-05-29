import { dirname } from 'node:path';
import type { Options } from 'pkg-up';
import { pkgUpSync } from 'pkg-up';

/**
 * Find the closest package.json file
 * @returns Returns the file path, or undefined if it could not be found.
 */
export const searchMonoProjectDir = (options: Options) => {
  const packageFile = pkgUpSync(options);
  if (packageFile && !/node_modules/.test(packageFile)) {
    return dirname(packageFile);
  }
  return undefined;
};
