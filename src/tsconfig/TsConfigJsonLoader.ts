import { getTsconfig } from 'get-tsconfig';
import { basename, resolve } from 'path';
import { TsConfigNotFoundError } from './errors/index.js';

export class TsConfigJsonLoader {
  private configPath: string;

  constructor(path: string) {
    this.configPath = resolve(path);
  }

  loadSync() {
    const configName = basename(this.configPath);
    const tsConfig = getTsconfig(
      this.configPath,
      configName.endsWith('.json') ? configName : undefined
    );
    if (!tsConfig) {
      throw new TsConfigNotFoundError();
    }
    return tsConfig.config;
  }
}
