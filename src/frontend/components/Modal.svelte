<script>
  import { createEventDispatcher, onMount, onDestroy } from 'svelte';

  const dispatch = createEventDispatcher();

  onMount(() => {
    document.body.classList.add('scroll-lock');
  });

  onDestroy(() => {
    document.body.classList.remove('scroll-lock');
  });
</script>

<style lang="scss">
  .modal-background {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 7;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.9);
    overflow: hidden;
  }
</style>

<div class="modal-background" on:click={() => dispatch('close')} />
<slot name="modal" />
