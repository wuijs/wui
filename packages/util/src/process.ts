import parse from 'url-parse';
import { isFullUrl } from './judge';

export function getGlobalWindow() {
  if (typeof window !== 'undefined') return window;
  return global;
}

export function getRealHash(hash: string) {
  if (!hash || typeof hash !== 'string') return '';
  return hash.startsWith('#') ? hash.slice(1) : hash;
}

export function getUrlData(href: string) {
  const urlData = { search: '', ...parse(href, true) };
  if (urlData.query) {
    urlData.search = parse.qs.stringify(urlData.query);
  }
  urlData.hash = getRealHash(urlData.hash);
  return urlData;
}

export function getFullUrl(strOrigin: string, strPath: string) {
  const origin = typeof strOrigin === 'string' ? strOrigin : '';
  const path = typeof strPath === 'string' ? strPath : '';
  if (!path) return origin;
  if (!origin || path.startsWith(origin) || isFullUrl(path)) return path;
  return [origin.replace(/\/$/, ''), '/', path.replace(/^\//, '')].join('');
}
