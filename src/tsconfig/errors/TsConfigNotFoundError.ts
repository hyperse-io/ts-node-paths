export class TsConfigNotFoundError extends Error {
  constructor() {
    super('No valid "tsconfig.json" found!');
  }
}
