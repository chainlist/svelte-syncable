import { writable } from 'svelte/store';

let prefix = 'svelteStore';

const get = (key) => {
  if (typeof window === 'undefined' || !window.localStorage) return;
  const value = localStorage.getItem(key);
  return value === undefined
    ? ""
    : JSON.parse(value);
};

const set = (key, value) => {
  if (typeof window === 'undefined' || !window.localStorage) return;

  localStorage.setItem(key, JSON.stringify(value));
};

const syncValue = (key, observable) => {
  observable.subscribe(data => {
    set(key, data);
  });

  return observable;
};

export const setPrefix = (prefixName) => {
  prefix = prefixName;
};

export const syncable = (name, value, hydrate = true) => {
  const key = `${prefix}-${name}`;
  let lastValue = value;

  if (hydrate) {
    lastValue = get(key) || value;
  }

  return syncValue(key, writable(lastValue));
};
