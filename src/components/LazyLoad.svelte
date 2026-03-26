<script>
  import { onMount } from 'svelte';

  export let rootMargin = '400px 0px 400px 0px';
  export let threshold = 0;
  export let once = true; // Default to true to prevent flickering/remounting lag

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

<div bind:this={container} class="lazy-load-wrapper" class:is-visible={isVisible}>
  {#if isVisible}
    <slot />
  {/if}
</div>

<style>
  .lazy-load-wrapper {
    display: block;
    width: 100%;
    min-height: 1px; /* Ensure there is a box to observe */
  }
  
  /* When visible, we can act as a pass-through if needed, 
     but keeping it block is safer for layout stability */
  .is-visible {
    min-height: auto;
  }
</style>
