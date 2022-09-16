import {} from '@wuijs/type';
import { cDrivenByWuiMicro, cBaseTime, getGlobalWindow } from '@wuijs/util';
import { oldBaseTime } from './extra';

const globalWindow = getGlobalWindow();

globalWindow[cDrivenByWuiMicro] = true;
globalWindow[cBaseTime] = globalWindow[oldBaseTime] || globalWindow[cBaseTime] || Date.now();

export function register() {}
export function inject() {}
export function hook() {}
export function start() {}
