import { getCompilerOptions } from '../getCompilerOptions.js';

describe('get compiler options', () => {
  test('Read "tsconfig.01.json"', () => {
    const options = getCompilerOptions('./tsconfig-tests/tsconfig.01.json');

    expect(options).toMatchObject({
      rootDir: './src',
      outDir: './dist',
      baseUrl: './src',
      paths: {
        '@models/*': ['./models/*'],
        '@tool/*': ['./tool/*'],
      },
    });
  });

  test('Read "tsconfig.02.json"', () => {
    const options = getCompilerOptions('./tsconfig-tests/tsconfig.02.json');

    expect(options).toMatchObject({
      rootDir: './src',
      outDir: './dist',
      baseUrl: './src',
      paths: {
        '@models/*': ['./models/*'],
        '@tool/*': ['./tool/*'],
      },
    });
  });

  test('Read "tsconfig.03.json"', () => {
    const options = getCompilerOptions('./tsconfig-tests/tsconfig.03.json');
    expect(options).toMatchObject({
      rootDir: './src',
      outDir: './dist',
      baseUrl: './src',
      paths: {
        '@models/*': ['./models/*'],
        '@tool/*': ['./tool/*'],
      },
    });
  });

  test('Read "tsconfig.npm.json"', () => {
    const options = getCompilerOptions('./tsconfig-tests/tsconfig.npm.json');
    expect(options).toMatchObject({
      module: 'nodenext',
      moduleResolution: 'nodenext',
      target: 'es2020',
    });
  });

  test('Read "tsconfig.compiler-options.json"', () => {
    expect(() => {
      getCompilerOptions('./tsconfig-tests/tsconfig.compiler-options.json');
    }).toThrowError('`compilerOptions` are missing in "tsconfig.json"!');
  });

  test('Read "tsconfig.tsconfig.no-fields.json"', () => {
    expect(() => {
      getCompilerOptions('./tsconfig-tests/tsconfig.fields.json');
    }).toThrowError(
      'Fields `baseUrl`, `rootDir`, `outDir`, `paths` are missing in "tsconfig.json"!'
    );
  });
});
