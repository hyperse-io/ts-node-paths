import { register } from 'node:module';
import { pathToFileURL } from 'node:url';

// Node 20: errors produced by reportTSError are not serialised correctly when using ESM loader
// https://github.com/TypeStrong/ts-node/issues/2026
// node:internal/process/esm_loader:34
//       internalBinding('errors').triggerUncaughtException(
// [Object: null prototype] {
//   [Symbol(nodejs.util.inspect.custom)]: [Function: [nodejs.util.inspect.custom]]
// }
process.on('uncaughtException', (err) => {
  console.error(err);
  process.exit(1);
});

// Remove --experimental-loader ExperimentalWarning as the option doesn't exist anymore / is no longer experimental nodejs/node#51196
// Export ts-node/esm-register to use with --import
// https://github.com/nodejs/node/issues/51196
register('@armit/path-alias/esm', pathToFileURL('./'));
