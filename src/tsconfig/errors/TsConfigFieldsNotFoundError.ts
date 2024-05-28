export class TsConfigFieldsNotFoundError extends Error {
  constructor() {
    super(
      'Fields `baseUrl`, `rootDir`, `outDir`, `paths` are missing in "tsconfig.json"!'
    );
  }
}
