<script>
  import { onMount } from 'svelte';

  export let rootMargin = '200px 0px 200px 0px';
  export let threshold = 0;
  export let once = true; 

  let container;
  let isVisible = false;

  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          isVisible = true;
          if (once) observer.disconnect();
        } else if (!once) {
          isVisible = false;
        }
      },
      {
        rootMargin,
        threshold
      }
    );

    if (container) observer.observe(container);

    return () => {
      observer.disconnect();
    };
  });
</script>

<div bind:this={container} class="lazy-load-wrapper">
  {#if isVisible}
    <slot />
  {/if}
</div>

<style>
  .lazy-load-wrapper {
    width: 100%;
    min-height: 1px;
  }
</style>
