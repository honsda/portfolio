<script>
  import { onMount } from 'svelte';

  export let rootMargin = '600px 0px 600px 0px';
  export let threshold = 0;

  let container;
  let isVisible = false;

  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
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

<div bind:this={container} style="display: contents;">
  {#if isVisible}
    <slot />
  {/if}
</div>
