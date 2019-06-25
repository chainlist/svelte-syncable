import App from './App.svelte';
import { syncable, setPrefix } from '../index';

let app = null;


describe('syncable', () => {
  beforeEach(() => {
    setPrefix('svelteStore');
    localStorage.clear();
  });
  
  test('App is OKAY', () => {
    app = new App({ target: document.body });
    expect(app).toBeTruthy();
  });

  test('syncable store in localStorage', () => {
    syncable('count', 0);

    expect(localStorage.setItem).toHaveBeenLastCalledWith('svelteStore-count', "0");
  });

  test('syncable has a new prefix', () => {
    setPrefix('foobar');
    syncable('count', 0);

    expect(localStorage.setItem).toHaveBeenLastCalledWith('foobar-count', "0");
  });

  test('syncable return a SvelteObservable', () => {
    const count = syncable('count', 0);

    expect(count.subscribe).toBeInstanceOf(Function);
    expect(count.set).toBeInstanceOf(Function);
    expect(count.update).toBeInstanceOf(Function);
  });

  test('update observable from a component', () => {
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
});
