<script>
  import { onMount } from 'svelte';
  export let items = [];
  export let speed = 30; // speed in seconds for one full rotation

  let container;
  let isVisible = true;

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
      },
      { threshold: 0 }
    );

    if (container) observer.observe(container);

    return () => {
      observer.disconnect();
    };
  });
</script>

<div 
  bind:this={container}
  class="marquee-container border-t border-b border-white/5 bg-ink-deep overflow-hidden"
>
  <div 
    class="marquee-content flex py-4 items-center" 
    style="animation-duration: {speed}s; animation-play-state: {isVisible ? 'running' : 'paused'};"
  >
    <!-- First set -->
    {#each items as item}
      <div class="marquee-item flex items-center shrink-0">
        <span class="font-mono text-[10px] uppercase tracking-[0.22em] text-indigo px-8">
          {item}
        </span>
        <span class="text-paper-ghost opacity-40 select-none">•</span>
      </div>
    {/each}
    <!-- Duplicate set for seamless loop -->
    {#each items as item}
      <div class="marquee-item flex items-center shrink-0">
        <span class="font-mono text-[10px] uppercase tracking-[0.22em] text-indigo px-8">
          {item}
        </span>
        <span class="text-paper-ghost opacity-40 select-none">•</span>
      </div>
    {/each}
  </div>
</div>

<style>
  .marquee-container:hover .marquee-content {
    animation-play-state: paused !important;
  }

  .marquee-content {
    display: flex;
    width: fit-content;
    animation: scroll linear infinite;
  }

  @keyframes scroll {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-50%);
    }
  }
</style>
