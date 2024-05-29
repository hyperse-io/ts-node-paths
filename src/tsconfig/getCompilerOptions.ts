import { showWarns } from '../tool/showWarns.js';
import { CompilerOptions } from '../types/tsconfig.js';
import {
  TsConfigCompilerOptionsNotFoundError,
  TsConfigFieldsNotFoundError,
} from './errors/index.js';
import { TsConfigJsonLoader } from './TsConfigJsonLoader.js';

export function getCompilerOptions(path: string): CompilerOptions {
  const json = new TsConfigJsonLoader(path).loadSync();
  const compilerOptions = json.compilerOptions;
  const fields: string[] = ['baseUrl', 'rootDir', 'outDir'];

  if (!compilerOptions || Object.keys(compilerOptions).length === 0) {
    throw new TsConfigCompilerOptionsNotFoundError();
  }

  if (!fields.every((field) => !!(compilerOptions as any)[field])) {
    throw new TsConfigFieldsNotFoundError();
  }

  if (compilerOptions.baseUrl === './src') {
    showWarns("`baseUrl` use './' instead of `./src`");
  }

  return {
    paths: {},
    ...compilerOptions,
  } as CompilerOptions;
}
