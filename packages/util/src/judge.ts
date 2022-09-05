export function isRegExp(exp: any) {
  if (!exp) return false;
  return Object.prototype.toString.call(exp) === '[object RegExp]';
}

export function isFullUrl(url: string) {
  return /^(https?:)?\/\/([^\/]+\/?)+/.test(url);
}
