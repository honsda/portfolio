<script>
  import { onMount } from 'svelte';

  let leaves = $state([]);
  
  function getLeafCount() {
    if (typeof window === 'undefined') return 20;
    return window.innerWidth < 768 ? 15 : 23;
  }

  function createLeaf(id) {
    // ... rest of createLeaf logic
    const size = 10 + Math.random() * 18;
    const duration = 10 + Math.random() * 15;
    const delay = Math.random() * -25;
    const opacity = 0.15 + Math.random() * 0.35;
    const startX = Math.random() * 100;
    const swayAmount = 40 + Math.random() * 80;
    const tumbleSpeed = 2 + Math.random() * 4;
    
    return { id, startX, size, duration, delay, opacity, swayAmount, tumbleSpeed };
  }

  onMount(() => {
    leaves = Array.from({ length: getLeafCount() }, (_, i) => createLeaf(i));
  });
</script>

<div class="leaves-container animate-fade-in">
  {#each leaves as leaf (leaf.id)}
    <div 
      class="leaf-wrapper"
      style="
        left: {leaf.startX}%;
        --size: {leaf.size}px;
        --opacity: {leaf.opacity};
        --duration: {leaf.duration}s;
        --delay: {leaf.delay}s;
        --sway: {leaf.swayAmount}px;
        --tumble: {leaf.tumbleSpeed}s;
      "
    >
      <div class="leaf-tumble">
        <svg viewBox="0 0 24 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 7C0 7 6 0 12 0C18 0 24 7 24 7C24 7 18 14 12 14C6 14 0 7 0 7Z" fill="currentColor"/>
        </svg>
      </div>
    </div>
  {/each}
</div>

<style>
  .leaves-container {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    pointer-events: none;
    z-index: 5;
    perspective: 1000px;
  }

  .leaf-wrapper {
    position: absolute;
    top: -50px;
    width: var(--size);
    height: calc(var(--size) * 0.6);
    opacity: var(--opacity);
    color: #e8e4dc; /* paper-DEFAULT */
    filter: blur(0.4px);
    will-change: transform;
    animation: fall var(--duration) linear infinite;
    animation-delay: var(--delay);
  }

  .leaf-tumble {
    width: 100%;
    height: 100%;
    animation: tumble var(--tumble) ease-in-out infinite alternate;
  }

  @keyframes fall {
    0% {
      transform: translateY(0) translateX(0) rotate(0deg);
    }
    100% {
      /* Fall past the bottom and drift horizontally based on sway */
      transform: translateY(110vh) translateX(calc(var(--sway) * -1.5)) rotate(360deg);
    }
  }

  @keyframes tumble {
    0% {
      transform: rotateX(0deg) rotateY(0deg) translateX(0);
    }
    100% {
      /* Simulate leaf flipping and swaying back/forth */
      transform: rotateX(180deg) rotateY(45deg) translateX(var(--sway));
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
