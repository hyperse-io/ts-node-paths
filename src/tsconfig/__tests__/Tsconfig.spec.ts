import { resolve } from 'path';
import { Tsconfig } from '../Tsconfig.js';

describe('test suites of tsconfig', () => {
  test('Get Aliases "tsconfig.01.json"', () => {
    const tsconfig = new Tsconfig('./tsconfig-tests/tsconfig.01.json');
    const opts = tsconfig.getOptions();

    expect(opts?.baseUrl).toBe(resolve('./src'));
    expect(opts?.rootDir).toBe(resolve('./src'));
    expect(opts?.outDir).toBe(resolve('./dist'));
    expect(opts?.paths).toMatchObject({
      '@models/*': ['./models/*'],
      '@tool/*': ['./tool/*'],
    });
  });

  test('Get Aliases "tsconfig.02.json"', () => {
    const tsconfig = new Tsconfig('./tsconfig-tests/tsconfig.02.json');
    const opts = tsconfig.getOptions();

    expect(opts?.baseUrl).toBe(resolve('./src'));
    expect(opts?.rootDir).toBe(resolve('./src'));
    expect(opts?.outDir).toBe(resolve('./dist'));
    expect(opts?.paths).toMatchObject({
      '@models/*': ['./models/*'],
      '@tool/*': ['./tool/*'],
    });
  });

  test('Get Aliases "tsconfig.03.json"', () => {
    const tsconfig = new Tsconfig('./tsconfig-tests/tsconfig.03.json');
    const opts = tsconfig.getOptions();

    expect(opts?.baseUrl).toBe(resolve('./src'));
    expect(opts?.rootDir).toBe(resolve('./src'));
    expect(opts?.outDir).toBe(resolve('./dist'));
    expect(opts?.paths).toMatchObject({
      '@models/*': ['./models/*'],
      '@tool/*': ['./tool/*'],
    });
  });
});
