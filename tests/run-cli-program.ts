import type { Options } from 'execa';
import { execa } from 'execa';

/**
 * Process execute typescript script file using `@hyperse/ts-node-paths`
 * @param program - The absolute typescript file path
 * @param options - The configuration of `execa` { env: { TS_NODE_PROJECT: tsconfig } }
 * @param args - The runtime argv for program
 */
const runTsScript = <T extends Options>(
  program: string,
  options: T,
  ...args: string[]
) => {
  const moduleArgs = [
    '--import',
    '@hyperse/ts-node-paths/register',
    '--no-warnings',
  ];
  return execa('node', moduleArgs.concat(program, ...args), {
    ...options,
  });
};

export async function runTsCliMock(program: string, ...args: string[]) {
  const result = await runTsScript(
    program,
    {
      env: {
        TS_NODE_PATHS_PROJECT: 'tsconfig.json',
      },
    },
    ...args
  );
  return {
    stdout: result.stdout,
    stderr: result.stderr,
    exitCode: result.exitCode,
  };
}
