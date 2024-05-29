import {
  load as loadTs,
  LoadFn,
  resolve as resolveTs,
  ResolveFn,
} from 'ts-node/esm';
import { pathToFileURL } from 'url';
import { pathAlias } from '../path-alias.js';
import { createMatchPath } from '../tool/createMatchPath.js';
import { replace } from '../tool/replace.js';
import '../types/ts-node.d.js';

pathAlias.showInConsole();

const matchPath = createMatchPath(pathAlias.opts.baseUrl, pathAlias.opts.paths);

export async function load(
  url: string,
  context: { conditions: string[]; format: string },
  defaultLoad: LoadFn
): Promise<unknown> {
  const isTsNode = pathAlias.checkTsNode(url);
  if (isTsNode) {
    return loadTs(url, context, defaultLoad);
  } else {
    return defaultLoad(url, context, defaultLoad);
  }
}

// Use the ts-node mechanism only if applied
export const resolve: ResolveFn = async (
  specifier,
  context,
  defaultResolve
) => {
  const isTsNode = pathAlias.checkTsNode(specifier, context);
  if (isTsNode) {
    // USE TS-NODE TO HANDLE THE INCOMING MODULES
    const lastIndexOfIndex = specifier.lastIndexOf('/index.js');
    if (lastIndexOfIndex !== -1) {
      // Handle index.js
      const trimmed = specifier.substring(0, lastIndexOfIndex);
      const match = matchPath(trimmed);
      if (match) {
        return resolveTs(
          pathToFileURL(`${match}/index.js`).href,
          context,
          defaultResolve
        );
      }
    } else {
      const ext = (specifier.match(/\.(m|c)?js$/gi) ?? ['.js'])[0];
      const clearedPath = specifier.replace(/\.(m|c)?js$/gi, '');

      const match = matchPath(clearedPath);
      if (match) {
        return resolveTs(
          pathToFileURL(`${match}${ext}`).href,
          context,
          defaultResolve
        );
      } else if (typeof context.parentURL === 'string') {
        const newPath = replace(specifier, context.parentURL);
        if (typeof newPath === 'string') {
          const newUrl =
            process.platform !== 'win32'
              ? pathToFileURL(newPath).href
              : newPath;

          return resolveTs(newUrl, context, defaultResolve);
        }
      }
    }
    return resolveTs(specifier, context, defaultResolve);
  } else {
    // Use node directly, skipping ts-node
    const newEspecif = replace(specifier, context.parentURL);
    if (typeof newEspecif === 'string') {
      return defaultResolve(newEspecif, context, defaultResolve);
    } else {
      return defaultResolve(specifier, context, defaultResolve);
    }
  }
};
