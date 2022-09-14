export type KeyObject<T> = { [key: string]: T };
export type ToBeRequired<T, K extends keyof T> = Pick<Required<T>, K> & Omit<T, K>;
export type FnWithArgs<T, P extends any[]> = (...args: P) => T;

export type ActivityFn = FnWithArgs<boolean, [location?: Location]>;
export type Activity = string | RegExp | ActivityFn;
export type MountNode = HTMLElement | string;
export type IgnoreFile = string | RegExp | FnWithArgs<boolean, [url: string, appName?: string]>;

export type FakeWindow = Window & Record<PropertyKey, any>;
export type FakeDocument = Document & Record<PropertyKey, any>;
export type FakeLocation = Location & Record<PropertyKey, any>;
