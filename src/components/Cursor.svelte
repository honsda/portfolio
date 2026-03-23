<script>
  import { onMount } from 'svelte';

  let mouseX = -100;
  let mouseY = -100;
  let ringX = -100;
  let ringY = -100;
  let isHovering = false;
  let isMobile = false;

  const lerp = (start, end, factor) => start + (end - start) * factor;

  function moveCursor(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }

  function handleMouseOver(e) {
    const target = e.target;
    if (target.closest('a, button, [role="button"], .interactive')) {
      isHovering = true;
    } else {
      isHovering = false;
    }
  }

  onMount(() => {
    isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) return;

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    function animate() {
      ringX = lerp(ringX, mouseX, 0.12);
      ringY = lerp(ringY, mouseY, 0.12);
      requestAnimationFrame(animate);
    }
    animate();

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  });
</script>

{#if !isMobile}
<div 
  class="cursor-dot" 
  style="transform: translate({mouseX - 5}px, {mouseY - 5}px)"
></div>
<div 
  class="cursor-ring" 
  class:hover={isHovering}
  style="transform: translate({ringX - 18}px, {ringY - 18}px) scale({isHovering ? 1.8 : 1})"
></div>
{/if}

<style>
  .cursor-dot {
    position: fixed;
    top: 0;
    left: 0;
    width: 10px;
    height: 10px;
    background-color: #e8e4dc;
    border-radius: 50%;
    pointer-events: none;
    z-index: 10000;
    mix-blend-mode: difference;
  }

  .cursor-ring {
    position: fixed;
    top: 0;
    left: 0;
    width: 36px;
    height: 36px;
    border: 1px solid #7880a8;
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.3s ease-out;
  }
</style>
