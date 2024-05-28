export class TsConfigCompilerOptionsNotFoundError extends Error {
  constructor() {
    super('`compilerOptions` are missing in "tsconfig.json"!');
  }
}
