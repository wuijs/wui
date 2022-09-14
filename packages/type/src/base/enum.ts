export enum AppStatus {
  NOT_ACTIVED = 'NOT_ACTIVED',
  ACTIVING = 'ACTIVING',
  ACTIVED = 'ACTIVED',
  NOT_RENDERED = 'NOT_RENDERED',
  RENDERING = 'RENDERING',
  RENDERED = 'RENDERED',
}

export enum HistoryType {
  BROWSER = 'browser',
  HASH = 'hash',
  MEMORY = 'memory',
  MPA = 'mpa',
}

export enum FileType {
  HTML = 'html',
  CSS = 'css',
  JS = 'js',
  JSON = 'json',
}

export enum EndType {
  PC = 'pc', // `pc` 在实际应用时配置较多，为防止繁杂，默认之
  H5 = 'h5',
  NONE = 'none', // 响应式
}

export enum InjectName {}

export enum HookName {}

export enum HookEvent {}
