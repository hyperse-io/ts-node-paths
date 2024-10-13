import { register } from 'node:module';
import { pathToFileURL } from 'node:url';
import { pathAlias } from '../path-alias.js';
import { showWarns } from '../tool/showWarns.js';

process.on('uncaughtException', (err) => {
  console.error(err);
  process.exit(1);
});

if (process.env.TS_NODE_PROJECT) {
  showWarns('USING `TS_NODE_PATHS_PROJECT` instead ');
  delete process.env.TS_NODE_PROJECT;
}

// Skip project config resolution and loading
process.env.TS_NODE_SKIP_PROJECT = 'true';

// https://github.com/TypeStrong/ts-node?tab=readme-ov-file#typechecking
// Use TypeScript's faster transpileModule
process.env.TS_NODE_TRANSPILE_ONLY = 'true';

process.env.TS_NODE_COMPILER_OPTIONS = JSON.stringify(pathAlias.opts);

register('@hyperse/ts-node-paths/esm', pathToFileURL('./'));
