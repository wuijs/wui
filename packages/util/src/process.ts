import parse from 'url-parse';
import { FileType } from '@wuijs/type';
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

function getSplitLabel(url: string) {
  const searchIndex = url.indexOf('?');
  const hashIndex = url.indexOf('#');
  if (searchIndex !== -1 && hashIndex === -1) return '?';
  if (searchIndex === -1 && hashIndex !== -1) return '#';
  if (searchIndex < hashIndex) return '?';
  if (searchIndex > hashIndex) return '#';
  return '?';
}

export function getFileName(file: string) {
  const placeholder = 'Ω';
  let url = file || '';
  url = url.replace('??', placeholder);
  url = url.split(getSplitLabel(url))[0];
  url = url.replace(placeholder, '??');
  return url.split('/').pop();
}

export function getFileExt(file: string, defaultExtName?: FileType) {
  const fileName = getFileName(file);
  const defExtName = defaultExtName || FileType.JSON;
  if (!fileName) return defExtName;

  const canIUse = (s: string) => s === FileType.CSS || s === FileType.JS || s === FileType.JSON || s === FileType.HTML;
  if (canIUse(fileName)) return fileName as FileType;
  let ext = (fileName.match(/\[?\.([^\.]+)\]?$/g) || []).map((s) => s.replace(/\[|\.|\]/g, ''))[0] as FileType;
  ext = /^x?html?$/i.test(ext) ? FileType.HTML : ext;
  ext = ['ejs', 'es', 'ts', 'mjs', 'jsx', 'tsx', 'vue'].includes(ext) ? FileType.JS : ext;
  return canIUse(ext) ? ext : defExtName;
}
