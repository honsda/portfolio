<script>
  import { onMount } from 'svelte';

  let container;
  let isVisible = true;
  let leaves = $state([]);

  const indigoColors = [
    '#7880a8', // Default Indigo
    '#5a628f', // Deeper Indigo
    '#9ea4c4', // Lighter/Muted Indigo
    '#1a1e2e', // Very Dark Indigo
    '#4a5175'  // Mid-tone Indigo
  ];
  
  function getLeafCount() {
    if (typeof window === 'undefined') return 12;
    return window.innerWidth < 768 ? 8 : 15; // Reduced for performance
  }

  function createLeaf(id) {
    const size = 12 + Math.random() * 20;
    const duration = 8 + Math.random() * 8; 
    const delay = Math.random() * -15;
    const opacity = 0.2 + Math.random() * 0.4;
    
    const startX = -10 + Math.random() * 15; 
    const startYOffset = 0 + Math.random() * 200; 
    
    const swayAmount = 30 + Math.random() * 60;
    const tumbleSpeed = 2 + Math.random() * 4;
    
    return {
      id,
      startX,
      startYOffset,
      size,
      duration,
      delay,
      opacity,
      swayAmount,
      tumbleSpeed,
      color: indigoColors[Math.floor(Math.random() * indigoColors.length)]
    };
  }

  onMount(() => {
    leaves = Array.from({ length: getLeafCount() }, (_, i) => createLeaf(i));

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
  class="gush-container animate-fade-in"
>
  {#each leaves as leaf (leaf.id)}
    <div 
      class="leaf-wrapper"
      style="
        left: {leaf.startX}%;
        top: {leaf.startYOffset}px;
        color: {leaf.color};
        --size: {leaf.size}px;
        --opacity: {leaf.opacity};
        --duration: {leaf.duration}s;
        --delay: {leaf.delay}s;
        --sway: {leaf.swayAmount}px;
        --tumble: {leaf.tumbleSpeed}s;
        animation-play-state: {isVisible ? 'running' : 'paused'};
      "
    >
      <div 
        class="leaf-tumble"
        style="animation-play-state: {isVisible ? 'running' : 'paused'};"
      >
        <svg viewBox="0 0 24 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 7C0 7 6 0 12 0C18 0 24 7 24 7C24 7 18 14 12 14C6 14 0 7 0 7Z" fill="currentColor"/>
        </svg>
      </div>
    </div>
  {/each}
</div>

<style>
  .gush-container {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    pointer-events: none;
    z-index: 0;
    perspective: 1200px;
  }

  .leaf-wrapper {
    position: absolute;
    width: var(--size);
    height: calc(var(--size) * 0.6);
    filter: none;
    will-change: transform, opacity;
    animation: horizontalGush var(--duration) linear infinite;
    animation-delay: var(--delay);
    opacity: 0;
  }

  .leaf-tumble {
    width: 100%;
    height: 100%;
    animation: tumble var(--tumble) ease-in-out infinite alternate;
  }

  @keyframes horizontalGush {
    0% {
      transform: translate3d(0, 0, 0) rotate(0deg);
      opacity: 0;
    }
    10% {
      opacity: var(--opacity);
    }
    40% {
      opacity: var(--opacity);
    }
    60% {
      transform: translate3d(60vw, calc(var(--sway) * 0.5), 0) rotate(180deg);
      opacity: 0;
    }
    100% {
      transform: translate3d(100vw, var(--sway), 0) rotate(360deg);
      opacity: 0;
    }
  }

  @keyframes tumble {
    0% {
      transform: rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0);
    }
    100% {
      transform: rotateX(180deg) rotateY(45deg) translate3d(var(--sway), 0, 0);
    }
  }

  .animate-fade-in {
    animation: fadeIn 3s ease-out forwards;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
</style>
