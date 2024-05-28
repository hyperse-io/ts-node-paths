export interface ModuleRef {
  id: string;
  path: string;
  exports: Record<string, unknown>;
  children: ModuleRef[];
  loaded: boolean;
}
