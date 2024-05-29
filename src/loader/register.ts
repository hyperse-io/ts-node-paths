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

process.env.TS_NODE_SKIP_PROJECT = 'true';
process.env.TS_NODE_COMPILER_OPTIONS = JSON.stringify(pathAlias.opts);

register('@hyperse/ts-node-paths/esm', pathToFileURL('./'));
