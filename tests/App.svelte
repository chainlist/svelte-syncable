<script>
  import { count } from './store.js';
</script>

Count is <span id="count">{$count}</span>
<button on:click={() => $count += 1} id="inc">Increment</button>
<button on:click={() => $count -= 1} id="dec">Decrement</button>