export function toArray<T>(arr: T | T[]) {
  if (!arr) return [] as T[];
  if (Array.isArray(arr)) return arr;
  return [arr];
}

export function toPromise<T>(res: T | Promise<T>) {
  if (res instanceof Promise) return res;
  return Promise.resolve(res);
}

export function toFix(target: number, len?: number) {
  const length = typeof len === 'number' ? len : Number(len) || 2;
  const powVal = Math.pow(10, length);
  const val = Number(target) || 0;
  return val ? Math.floor(val * powVal) / powVal : val;
}
