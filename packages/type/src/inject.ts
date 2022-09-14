import { FnWithArgs } from './base/type';
import { IApp } from './app';

export type NextFn = FnWithArgs<void, []>;
export type InjectFn = FnWithArgs<void, [app: IApp, next: NextFn]>;
