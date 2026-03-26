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
  const MAX_POINTS = 45; // Bit longer tail

  // Smoothing states
  let trailX = -100;
  let trailY = -100;

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
    points = Array(10).fill({ x: e.clientX, y: e.clientY }); // Initialize with some points for a smoother start
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
    // Only disable for touch devices, not just small widths
    const touchQuery = window.matchMedia('(pointer: coarse)');
    isMobile = touchQuery.matches;

    if (isMobile) return;

    ctx = canvas.getContext('2d');
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    function animate() {
      if (document.hidden) {
        requestAnimationFrame(animate);
        return;
      }

      ringX = lerp(ringX, mouseX, 0.15);
      ringY = lerp(ringY, mouseY, 0.15);

      // Smooth Trail Logic
      if (isClicked) {
        if (points.length === 0) {
          points = Array(MAX_POINTS).fill({ x: mouseX, y: mouseY });
        }
        
        // Point 0 follows mouse directly
        points[0] = { x: mouseX, y: mouseY };
        
        // Each subsequent point lerps to the one before it for an elastic effect
        for (let i = 1; i < points.length; i++) {
          points[i] = {
            x: lerp(points[i].x, points[i - 1].x, 0.45), // Adjust for smoothness/speed
            y: lerp(points[i].y, points[i - 1].y, 0.45)
          };
        }
      }

      // Draw Trail
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      if (isClicked && points.length > 2) {
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        for (let i = 1; i < points.length; i++) {
          const ratio = (points.length - i) / points.length; // Tail is smaller
          const size = ratio * 5; 
          
          ctx.beginPath();
          ctx.moveTo(points[i-1].x, points[i-1].y);
          ctx.lineTo(points[i].x, points[i].y);
          
          ctx.strokeStyle = '#e8e4dc';
          ctx.lineWidth = size;
          ctx.stroke();
        }
      }

      // Reset points on release
      if (!isClicked && points.length > 0) {
        points = [];
      }

      requestAnimationFrame(animate);
    }
    animate();

    return () => {
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
  style="transform: translate({mouseX - 5}px, {mouseY - 5}px) scale({isClicked ? 0.6 : 1})"
></div>
<div 
  class="cursor-ring" 
  style="transform: translate({ringX - 18}px, {ringY - 18}px) scale({isHovering ? 1.6 : 1})"
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
    transition: transform 0.15s ease-out;
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
