import { existsSync } from 'fs';
import { rm } from 'fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Format } from 'tsup';
import { build } from 'tsup';

const getDirname = (url: string, subDir = '') => {
  return join(dirname(fileURLToPath(url)), subDir);
};

async function buildAll() {
  const entries = {
    'src/index.ts': {
      format: ['esm', 'cjs'],
      entry: 'index',
      dts: true,
      clean: true,
      outExtension: undefined,
    },
    'src/loader/esm.ts': {
      format: ['esm'],
      entry: 'loader/esm',
      dts: false,
      clean: false,
      outExtension() {
        return {
          js: `.js`,
        };
      },
    },
    'src/loader/register.ts': {
      format: ['esm'],
      entry: 'loader/register',
      dts: false,
      clean: false,
      outExtension() {
        return {
          js: `.js`,
        };
      },
    },
  };

  for (const [key, value] of Object.entries(entries)) {
    const { format, entry, dts, clean, outExtension } = value;
    await build({
      splitting: false,
      treeshake: true,
      tsconfig: getDirname(import.meta.url, '../tsconfig.build.json'),
      entry: {
        [entry]: key,
      },
      dts,
      clean,
      outExtension,
      format: format as Format[],
    });
  }
}
(async () => {
  const dist = getDirname(import.meta.url, '../dist');
  if (existsSync(dist)) {
    await rm(dist, {
      recursive: true,
    });
  }
  await buildAll();
})();
