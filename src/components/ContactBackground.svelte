<script>
  import { onMount } from 'svelte';
  import data from '../data/contact-words.json';

  const { words } = data;

  let container;
  let isVisible = true;

  const colors = [
    '#7880a8', // indigo
    '#e8e4dc', // paper
    'rgba(232, 228, 220, 0.4)', // paper-ghost
    '#5a628f', // deeper indigo
    '#1a1e2e'  // very dark indigo
  ];

  let lanes = $state([]);

  function createLanes() {
    // Create 4-5 horizontal lanes
    return Array.from({ length: 5 }, (_, i) => {
      // Shuffled words for this lane
      const laneWords = [...words]
        .sort(() => Math.random() - 0.5)
        .map((text, idx) => ({
          id: `${i}-${idx}`,
          text,
          size: 2 + Math.random() * 4, // 2rem to 6rem
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: 0.05 + Math.random() * 0.1, // very subtle
          duration: 30 + Math.random() * 40, // 30s to 70s
          delay: Math.random() * -60 // start mid-way
        }));
      
      return { id: i, words: laneWords };
    });
  }

  onMount(() => {
    lanes = createLanes();

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

<div bind:this={container} class="contact-rolling-bg">
  {#each lanes as lane (lane.id)}
    <div class="lane" style="--lane-top: {lane.id * 20}%">
      <div 
        class="marquee-track" 
        style="animation-play-state: {isVisible ? 'running' : 'paused'};"
      >
        <div class="marquee-content">
          {#each lane.words as word (word.id)}
            <span 
              class="word" 
              style="
                font-size: {word.size}rem; 
                color: {word.color}; 
                opacity: {word.opacity};
                --duration: {word.duration}s;
                --delay: {word.delay}s;
              "
            >
              {word.text}
            </span>
          {/each}
        </div>
        <!-- Duplicate for seamless loop -->
        <div class="marquee-content" aria-hidden="true">
          {#each lane.words as word (word.id + '-dup')}
            <span 
              class="word" 
              style="
                font-size: {word.size}rem; 
                color: {word.color}; 
                opacity: {word.opacity};
                --duration: {word.duration}s;
                --delay: {word.delay}s;
              "
            >
              {word.text}
            </span>
          {/each}
        </div>
      </div>
    </div>
  {/each}
</div>

<style>
  .contact-rolling-bg {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100vw;
    height: 100%;
    overflow: hidden;
    pointer-events: none;
    z-index: 0;
    opacity: 0.6;
    mask-image: linear-gradient(to bottom, transparent, black 20%, black 80%, transparent);
  }

  .lane {
    position: absolute;
    top: var(--lane-top);
    width: 100%;
    white-space: nowrap;
    display: flex;
  }

  .marquee-track {
    display: flex;
    width: fit-content;
    animation: roll var(--duration, 60s) linear infinite;
    animation-delay: var(--delay, 0s);
  }

  .marquee-content {
    display: flex;
    align-items: center;
    gap: 4rem;
    padding-right: 4rem;
  }

  .word {
    font-family: 'Zen Old Mincho', serif;
    font-weight: 900;
    text-transform: lowercase;
    letter-spacing: -0.05em;
  }

  @keyframes roll {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
</style>
