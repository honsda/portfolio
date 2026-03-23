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
  const MAX_POINTS = 60; // Longer tail

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
    // Check for touch capability or small screen
    const touchQuery = window.matchMedia('(pointer: coarse)');
    isMobile = touchQuery.matches || window.innerWidth < 768;

    if (isMobile) return;

    ctx = canvas.getContext('2d');
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    function animate() {
      ringX = lerp(ringX, mouseX, 0.15);
      ringY = lerp(ringY, mouseY, 0.15);

      // Pull back effect: always push current position if clicked
      if (isClicked) {
        points.push({ x: mouseX, y: mouseY });
        if (points.length > MAX_POINTS) points.shift();
      }

      // Draw Trail
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      if (points.length > 2) {
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.globalCompositeOperation = 'difference';

        // Draw multiple segments for tapering effect
        for (let i = 1; i < points.length - 1; i++) {
          const ratio = i / points.length;
          const size = ratio * 6; // Head is larger
          
          ctx.beginPath();
          // Connect midpoints for a smooth continuous curve
          const xc1 = (points[i].x + points[i-1].x) / 2;
          const yc1 = (points[i].y + points[i-1].y) / 2;
          const xc2 = (points[i+1].x + points[i].x) / 2;
          const yc2 = (points[i+1].y + points[i].y) / 2;

          ctx.moveTo(xc1, yc1);
          ctx.quadraticCurveTo(points[i].x, points[i].y, xc2, yc2);
          
          ctx.strokeStyle = '#e8e4dc'; // Solid color, no fade
          ctx.lineWidth = size;
          ctx.stroke();
        }
      }

      // Age and prune points
      if (!isClicked && points.length > 0) {
        points.shift();
        if (points.length > 0) points.shift(); // Faster collapse
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
