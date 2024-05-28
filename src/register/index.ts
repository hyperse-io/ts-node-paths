import { Module } from 'module';
import { addAlias } from 'module-alias';
import { join } from 'path';
import { REGISTER_INSTANCE } from 'ts-node';
import { HYPERSE_TS_NODE } from '../constants.js';
import { pathAlias } from '../path-alias.js';
import { leftReplacer } from '../tool/left-replacer.js';
import type { ModuleRef } from './module-ref.cjs';

// Declare the base path of the code to execute
pathAlias.showInConsole(true);
const isTsNode = Object.getOwnPropertySymbols(process).some(
  (s) => s === REGISTER_INSTANCE
);

// Mark in process ofject the ts-node is in use
if (isTsNode) {
  (process as any)[HYPERSE_TS_NODE] = true;
}

const base = leftReplacer(
  pathAlias.opts.baseUrl,
  pathAlias.opts.rootDir,
  isTsNode ? pathAlias.opts.rootDir : pathAlias.opts.outDir
);

// Replaces the original "_resolveFilename" with a custom one
const originalResolver = (Module as any)._resolveFilename;
(Module as any)._resolveFilename = (
  input: string,
  module: ModuleRef,
  flag: boolean
) => {
  if (module && module.path.startsWith(pathAlias.opts.rootDir)) {
    input = input.replace(/\.js$/gi, '.ts');
    input = input.replace(/\.mjs$/gi, '.mts');
  }

  return originalResolver(input, module, flag);
};

// Add all alias
Object.entries(pathAlias.opts.paths).forEach(([alias, paths]) => {
  alias = alias.replace(/(\\|\/)\*/g, '');
  paths
    .map((p) => p.replace(/(\\|\/)\*/g, ''))
    .forEach((p) => {
      const path = join(base, p);
      addAlias(alias, path);
    });
});
