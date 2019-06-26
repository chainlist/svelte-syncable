# Svelte Store Storage plugin [![Build Status](https://travis-ci.com/chainlist/svelte-syncable.svg?branch=master)](https://travis-ci.com/chainlist/svelte-syncable)

## Install

`npm i -D svelte-syncable`

or

`yarn add -D svelte-syncable`

## How to use


Setting a prefix is optional, the default one is `svelteStore`

Create your syncable store value
```javascript
// store.js
import { syncable, setPrefix } from 'svelte-syncable';

// All the syncable value will be stored as "foorbar-{name}"
setPrefix('foobar');

export const answer = syncable('answer', 42);
export const todos = syncable('todos', [
    { id: 1, text: 'Find the answer of life', done: false }
]);
```

Use your store value as every other svelte store observables
```html
// Component.svelte
<script>
    import { answer, todos } from './store.js';
</script>

<ul>
    {#each $todos as todo, todo.id}
        <li>{todo.text}</li>
    {/each}
</ul>

The count is {$answer}
```

## API

### setPrefix(prefix: string): void

Set the localStorage prefix to {name}
The function has to be called on the top of your store.js file.

### syncable(name: string, value: any, hydrate: boolean = true): SvelteObservable

Create a svelte observable store value and synchronize it with the localStorage.
The value will by hydrated from the localStorage by default, set `hydrate` to false to avoid this behavior.
The `hydrate` parameter is optional and set to true by default.


```javascript
import { syncable } from 'svelte-syncable';
import { writable } from 'svelte/store';

export const count = syncable('count', 0, false);
```
