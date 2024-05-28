import { TsConfigJsonLoader } from '../TsConfigJsonLoader.js';

describe('tsconfig json', () => {
  test('Read tsconfig.json', () => {
    const file = new TsConfigJsonLoader('./tsconfig.json');
    const json = file.loadSync();
    expect(json?.compilerOptions?.baseUrl).toBe('./src');
    expect(json).toMatchObject({
      compilerOptions: {
        baseUrl: './src',
        rootDir: './',
        outDir: './dist',
      },
    });
  });
});
