<script>
  import { onMount } from 'svelte';

  let mouseX = -100;
  let mouseY = -100;
  let ringX = -100;
  let ringY = -100;
  let isHovering = false;
  let isClicked = false;
  let isMobile = false;
  
  let canvas;
  let ctx;
  let points = [];
  const MAX_POINTS = 30; // Slightly shorter for performance

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

  function handleMouseDown(e) { 
    isClicked = true; 
    points = Array(5).fill({ x: e.clientX, y: e.clientY });
  }
  function handleMouseUp() { 
    isClicked = false; 
  }

  function resizeCanvas() {
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  }

  onMount(() => {
    const touchQuery = window.matchMedia('(pointer: coarse)');
    isMobile = touchQuery.matches;

    if (isMobile) return;

    ctx = canvas.getContext('2d', { alpha: true });
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    let frame;
    function animate() {
      // Lerp ring towards mouse
      ringX = lerp(ringX, mouseX, 0.15);
      ringY = lerp(ringY, mouseY, 0.15);

      // Only handle trail and canvas if clicked
      if (isClicked) {
        if (points.length === 0) {
          points = Array(MAX_POINTS).fill({ x: mouseX, y: mouseY });
        }
        
        points[0] = { x: mouseX, y: mouseY };
        
        for (let i = 1; i < points.length; i++) {
          points[i] = {
            x: lerp(points[i].x, points[i - 1].x, 0.35),
            y: lerp(points[i].y, points[i - 1].y, 0.35)
          };
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (points.length > 2) {
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.strokeStyle = '#e8e4dc';

          for (let i = 1; i < points.length; i++) {
            const ratio = (points.length - i) / points.length;
            ctx.beginPath();
            ctx.moveTo(points[i-1].x, points[i-1].y);
            ctx.lineTo(points[i].x, points[i].y);
            ctx.lineWidth = ratio * 4; 
            ctx.stroke();
          }
        }
      } else if (points.length > 0) {
        // Clear once when released
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        points = [];
      }

      frame = requestAnimationFrame(animate);
    }
    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  });
</script>

{#if !isMobile}
<canvas 
  bind:this={canvas} 
  class="cursor-canvas"
></canvas>

<div 
  class="cursor-dot" 
  style="transform: translate3d({mouseX - 5}px, {mouseY - 5}px, 0) scale({isClicked ? 0.6 : 1})"
></div>
<div 
  class="cursor-ring" 
  style="transform: translate3d({ringX - 18}px, {ringY - 18}px, 0) scale({isHovering ? 1.6 : 1})"
></div>
{/if}

<style>
  .cursor-canvas {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
    z-index: 9998;
    mix-blend-mode: difference;
    will-change: transform;
  }

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
    /* Removed transition as it's updated frequently by JS */
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
    /* Removed transition on transform as it's lerped in JS */
    transition: border-color 0.3s ease, transform 0.1s linear; /* Short linear transform for scale only */
  }
</style>
