import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { runTsCliMock } from './run-cli-program.js';

const getDirname = (url: string, ...paths: string[]) => {
  return join(dirname(fileURLToPath(url)), ...paths);
};

const cliPath = getDirname(import.meta.url, './cli-test.ts');

describe('test suites of exec program', () => {
  it('should correct invoke cli.ts', async () => {
    const { stderr, stdout } = await runTsCliMock(cliPath);
    console.log(stderr, stdout);
    expect(stderr).toBe('');
    expect(stdout).toMatch(/cli.../);
  });
});
