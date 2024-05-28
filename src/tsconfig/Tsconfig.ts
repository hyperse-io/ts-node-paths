import { resolve } from 'path';
import { getCompilerOptions } from './getCompilerOptions.js';

export class Tsconfig {
  private tsConfigPath: string;

  get path(): string {
    return this.tsConfigPath;
  }

  constructor(tsConfigPath?: string) {
    this.tsConfigPath = tsConfigPath ?? './tsconfig.json';
  }

  getOptions(projectCwd = '') {
    const opts = getCompilerOptions(this.tsConfigPath);
    opts.baseUrl = resolve(projectCwd, opts.baseUrl);
    opts.rootDir = resolve(projectCwd, opts.rootDir);
    opts.outDir = resolve(projectCwd, opts.outDir);
    return opts;
  }
}
