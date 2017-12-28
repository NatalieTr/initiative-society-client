/* SystemJS module definition */

interface NodeRequireFunction {
  (id: string): any;
}

interface NodeModule {
  exports: any;
  require: NodeRequireFunction;
  id: string;
  filename: string;
  loaded: boolean;
  parent: NodeModule | null;
  children: NodeModule[];
}

interface NodeRequire extends NodeRequireFunction {
  resolve(id: string): string;
  cache: any;
  extensions: any;
  main: NodeModule | undefined;
}

declare var module: NodeModule;
declare var require: NodeRequire;
