<script>
  export let items = [];
  export let speed = 30; // speed in seconds for one full rotation
</script>

<div class="marquee-container border-t border-b border-white/5 bg-ink-deep overflow-hidden">
  <div class="marquee-content flex py-4 items-center" style="animation-duration: {speed}s">
    <!-- First set -->
    {#each items as item}
      <div class="marquee-item flex items-center shrink-0">
        <span class="font-mono text-[10px] uppercase tracking-[0.22em] text-indigo-DEFAULT px-8">
          {item}
        </span>
        <span class="text-paper-ghost opacity-40 select-none">•</span>
      </div>
    {/each}
    <!-- Duplicate set for seamless loop -->
    {#each items as item}
      <div class="marquee-item flex items-center shrink-0">
        <span class="font-mono text-[10px] uppercase tracking-[0.22em] text-indigo-DEFAULT px-8">
          {item}
        </span>
        <span class="text-paper-ghost opacity-40 select-none">•</span>
      </div>
    {/each}
  </div>
</div>

<style>
  .marquee-container:hover .marquee-content {
    animation-play-state: paused;
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
