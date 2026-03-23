<script>
  export let num = "01";
  export let title = "";
  export let desc = "";
  export let tags = [];
  export let link = "";
  export let featured = false;
</script>

<a 
  href={link} 
  target="_blank" 
  rel="noopener noreferrer"
  class="group relative block p-8 bg-ink-black border border-white/5 transition-colors duration-500 hover:bg-ink-surface fade-up"
>
  <!-- Animated Top Border -->
  <div 
    class="absolute top-0 left-0 right-0 h-[1.5px] bg-indigo transition-transform duration-500 origin-left"
    class:scale-x-100={featured}
    class:scale-x-0={!featured}
    class:group-hover:scale-x-100={!featured}
  ></div>

  <div class="flex flex-col h-full justify-between gap-12">
    <div>
      <span class="font-mono text-[8.5px] text-paper-ghost uppercase tracking-[0.2em] mb-4 block">
        {num} — {featured ? 'Featured - Currently working on' : 'Project'}
      </span>
      <h3 class="font-display text-xl font-bold text-paper-mid mb-3 transition-colors duration-300 group-hover:text-paper">
        {title}
      </h3>
      <p class="font-mono text-[9px] text-[#888888] leading-[1.8] line-clamp-3">
        {desc}
      </p>
    </div>

    <div class="flex flex-col gap-6">
      <div class="flex flex-wrap gap-x-4 gap-y-2">
        {#each tags as tag}
          <span class="font-mono text-[8.5px] uppercase tracking-[0.18em] text-indigo">
            {tag}
          </span>
        {/each}
      </div>

      <div class="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.15em] text-paper-mid">
        View Project
        <span class="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
      </div>
    </div>
  </div>
</a>

<style>
  .scale-x-100 { transform: scaleX(1); }
  .scale-x-0 { transform: scaleX(0); }
</style>
