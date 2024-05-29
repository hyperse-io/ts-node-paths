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

  export const resolve: ResolveFn;

  export type LoadFn = (
    url: string,
    context: Record<string, unknown>,
    loadFn: LoadFunction
  ) => any;

  export const load: LoadFn;
  export function transformSource(): any;
}
