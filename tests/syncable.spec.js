import App from './App.svelte';
import { syncable, setPrefix } from '../index';
import { get } from 'svelte/store';

let app = null;


describe('syncable', () => {
  beforeEach(() => {
    setPrefix('svelteStore');
    localStorage.clear();
  });
  
  test('App is constructed', () => {
    app = new App({ target: document.body });
    expect(app).toBeTruthy();
  });

  test('syncable stores in localStorage', () => {
    syncable('count', 0);

    expect(localStorage.setItem).toHaveBeenLastCalledWith('svelteStore-count', "0");
  });

  test('syncable has a new prefix', () => {
    setPrefix('foobar');
    syncable('count', 0);

    expect(localStorage.setItem).toHaveBeenLastCalledWith('foobar-count', "0");
  });

  test('syncable returns a SvelteObservable', () => {
    const count = syncable('count', 0);

    expect(count.subscribe).toBeInstanceOf(Function);
    expect(count.set).toBeInstanceOf(Function);
    expect(count.update).toBeInstanceOf(Function);
  });

  test('stores is synced on component actions', () => {
    let app = new App({ target: document.body });

    const count = document.querySelector('#count');
    const increment = document.body.querySelector('#inc');
    const decrement = document.body.querySelector('#dec');

    increment.click();
    expect(localStorage.getItem('svelteStore-count')).toBe('1');
    increment.click();
    expect(localStorage.getItem('svelteStore-count')).toBe('2');

    setTimeout(() => expect(count.innerText).toBe('2'));
    
    decrement.click();
    expect(localStorage.getItem('svelteStore-count')).toBe('1');
    decrement.click();
    expect(localStorage.getItem('svelteStore-count')).toBe('0');
    setTimeout(() => expect(count.innerText).toBe('0'));
  });

  test('syncable is hydrated from the stored value', () => {
    localStorage.setItem('svelteStore-count', 42);
    
    const countObservable = syncable('count', 0);

    expect(get(countObservable)).toBe(42);
  });

  test('syncable is not hydrated from the stored value', () => {
    localStorage.setItem('svelteStore-count', 42);

    const countObservable = syncable('count', 0, false);

    expect(get(countObservable)).toBe(0);
  });
});
