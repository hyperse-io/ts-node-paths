declare module 'ts-node/esm' {
  export interface Context {
    conditions: string[];
    parentURL: string | undefined;
  }

  export type ResolveFn = (
    specifier: string,
    context: Context,
    defaultResolve: ResolveFn
  ) => Promise<{ url: string }>;

  export type LoadFunction = (
    url: string,
    context: Record<string, unknown>,
    loadFn: LoadFunction
  ) => Promise<unknown>;

  export const resolve: ResolveFn;
  export function load(
    url: string,
    context: Record<string, unknown>,
    loadFn: LoadFunction
  ): any;
  export function transformSource(): any;
}
