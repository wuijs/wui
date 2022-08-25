import { pkgName, cMicroDebugger } from './contant';

function print(type: string, args: any[]) {
  const log = args.length > 1 ? args.shift() : type;
  console[type](`[${pkgName}] ${log}${args.length ? ':' : ''}`, ...args);
}

export function printLog(...args: any[]) {
  const debuggerVal = typeof localStorage !== 'undefined' ? localStorage.getItem(cMicroDebugger) : 'true';
  if (debuggerVal === '1' || debuggerVal === 'true') {
    print('log', args);
  }
}

export function printWarn(...args: any[]) {
  print('warn', args);
}

export function printError(...args: any[]) {
  print('error', args);
}

export function throwError(errorMsg?: string) {
  throw new TypeError(`[${pkgName}] error: ${errorMsg}`);
}
