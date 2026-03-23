<script>
  import { onMount } from 'svelte';

  let leaves = $state([]);
  const leafCount = 20;

  function createLeaf(id) {
    return {
      id,
      // Start in the top right corner area
      x: 60 + Math.random() * 40, 
      y: -5,
      size: 12 + Math.random() * 15,
      duration: 8 + Math.random() * 12,
      delay: Math.random() * -20, // Negative delay so some start mid-air
      opacity: 0.2 + Math.random() * 0.4,
      rotation: Math.random() * 360,
      sway: 100 + Math.random() * 150
    };
  }

  onMount(() => {
    leaves = Array.from({ length: leafCount }, (_, i) => createLeaf(i));
  });
</script>

<div class="leaves-container">
  {#each leaves as leaf (leaf.id)}
    <div 
      class="leaf"
      style="
        left: {leaf.x}%;
        top: {leaf.y}%;
        width: {leaf.size}px;
        height: {leaf.size * 0.7}px;
        opacity: {leaf.opacity};
        animation: fall {leaf.duration}s linear infinite;
        animation-delay: {leaf.delay}s;
        --sway: {leaf.sway}px;
        --start-rot: {leaf.rotation}deg;
      "
    >
      <svg viewBox="0 0 24 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 7C0 7 6 0 12 0C18 0 24 7 24 7C24 7 18 14 12 14C6 14 0 7 0 7Z" fill="currentColor"/>
      </svg>
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
  }

  .leaf {
    position: absolute;
    color: #e8e4dc; /* paper-DEFAULT */
    filter: blur(0.5px);
    will-change: transform;
  }

  @keyframes fall {
    0% {
      transform: translate(0, 0) rotate(var(--start-rot));
    }
    25% {
      transform: translate(calc(var(--sway) * -0.5), 25vh) rotate(calc(var(--start-rot) + 90deg));
    }
    50% {
      transform: translate(calc(var(--sway) * -1), 50vh) rotate(calc(var(--start-rot) + 180deg));
    }
    75% {
      transform: translate(calc(var(--sway) * -1.5), 75vh) rotate(calc(var(--start-rot) + 270deg));
    }
    100% {
      transform: translate(calc(var(--sway) * -2), 110vh) rotate(calc(var(--start-rot) + 360deg));
    }
  }
</style>
