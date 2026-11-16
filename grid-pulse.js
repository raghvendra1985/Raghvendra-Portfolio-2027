/**
 * Grid Pulse — Interactive Architectural Canvas
 * Cobalt Blue (#0022CB) and Canary Yellow (#FFE000) reactive grid trail.
 * Zero external dependencies. Lightweight, high-frame-rate canvas with
 * text avoidance and prefers-reduced-motion protection.
 */
(function() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  function initGridPulse(container) {
    if (!container || container.__gridPulseInit) return;
    container.__gridPulseInit = true;

    // Create wrapper & canvas
    const wrap = document.createElement('div');
    wrap.className = 'grid-pulse-wrap';
    wrap.setAttribute('aria-hidden', 'true');
    wrap.style.cssText = 'position:absolute;inset:0;pointer-events:none;overflow:hidden;z-index:0;mask-image:linear-gradient(to bottom, #000 88%, transparent);-webkit-mask-image:linear-gradient(to bottom, #000 88%, transparent);';

    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block;';
    wrap.appendChild(canvas);

    // Ensure container has relative positioning
    const compStyle = getComputedStyle(container);
    if (compStyle.position === 'static') {
      container.style.position = 'relative';
    }
    container.style.overflow = 'hidden';

    // Insert canvas behind child content
    container.insertBefore(wrap, container.firstChild);

    // Make sure direct sibling elements sit above the canvas
    Array.from(container.children).forEach(child => {
      if (child !== wrap) {
        const pos = getComputedStyle(child).position;
        if (pos === 'static') child.style.position = 'relative';
        child.style.zIndex = '1';
      }
    });

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cell = 24;
    const reach = 2.6;
    const ambient = 2;
    const maxLit = 180;
    const FAINT = 0.15;
    const FADE = 2.2;
    const PAD = 6;
    const FADE_IN = 160;
    const FADE_OUT = 750;

    // Cobalt palette with canary yellow accents
    // Cobalt: hue 230, Canary Yellow: hue 50
    const COBALT_TINTS = [
      'hsl(230, 95%, 65%)',
      'hsl(230, 95%, 58%)',
      'hsl(230, 90%, 50%)',
      'hsl(230, 90%, 42%)',
      'hsl(50, 100%, 50%)' // Canary Yellow accent
    ];

    let cols = 1;
    let rows = 1;
    let width = 0;
    let height = 0;
    let clear = [];
    const cells = new Map();

    const measureText = () => {
      const bounds = container.getBoundingClientRect();
      const textNodes = container.querySelectorAll('h1, h2, h3, p, span.eyebrow, [data-grid-avoid]');
      clear = Array.from(textNodes).flatMap(node => {
        try {
          const range = document.createRange();
          range.selectNodeContents(node);
          const rects = Array.from(range.getClientRects()).filter(r => r.width > 0 && r.height > 0);
          const boxes = rects.length > 0 ? rects : [node.getBoundingClientRect()];
          return boxes.map(r => ({
            left: r.left - bounds.left - PAD,
            top: r.top - bounds.top - PAD,
            right: r.right - bounds.left + PAD,
            bottom: r.bottom - bounds.top + PAD
          }));
        } catch (e) {
          return [];
        }
      });
    };

    const measure = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      if (width === 0 || height === 0) return;
      cols = Math.max(1, Math.ceil(width / cell));
      rows = Math.max(1, Math.ceil(height / cell));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      measureText();
      wake();
    };

    const brightness = (col, row) => {
      const x = col * cell + cell / 2;
      const y = row * cell + cell / 2;
      let nearest = Infinity;
      for (const r of clear) {
        const dx = Math.max(r.left - x, 0, x - r.right);
        const dy = Math.max(r.top - y, 0, y - r.bottom);
        nearest = Math.min(nearest, Math.hypot(dx, dy));
        if (nearest === 0) break;
      }
      if (nearest === Infinity) return 1;
      return FAINT + (1 - FAINT) * Math.min(1, nearest / (FADE * cell));
    };

    const pickColor = () => {
      return COBALT_TINTS[Math.floor(Math.random() * COBALT_TINTS.length)];
    };

    let frame = 0;
    const easeOut = t => 1 - Math.pow(1 - t, 2);
    const easeIn = t => t * t;

    const draw = now => {
      frame = 0;
      ctx.clearRect(0, 0, width, height);

      // Draw subtle grid lines
      ctx.strokeStyle = 'rgba(0, 34, 203, 0.05)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x <= width; x += cell) {
        ctx.moveTo(x + 0.5, 0);
        ctx.lineTo(x + 0.5, height);
      }
      for (let y = 0; y <= height; y += cell) {
        ctx.moveTo(0, y + 0.5);
        ctx.lineTo(width, y + 0.5);
      }
      ctx.stroke();

      // Draw lit cells
      for (const [key, c] of cells) {
        let alpha;
        if (now < c.until) {
          alpha = easeOut(Math.min(1, (now - c.born) / FADE_IN));
        } else {
          const t = (now - c.until) / FADE_OUT;
          if (t >= 1) {
            cells.delete(key);
            continue;
          }
          alpha = 1 - easeIn(t);
        }
        ctx.globalAlpha = Math.max(0, Math.min(1, alpha * c.dim));
        ctx.fillStyle = c.colour;
        ctx.fillRect(c.col * cell + 1, c.row * cell + 1, cell - 1, cell - 1);
      }
      ctx.globalAlpha = 1;
      if (cells.size > 0) frame = requestAnimationFrame(draw);
    };

    const wake = () => {
      if (!frame) frame = requestAnimationFrame(draw);
    };

    const light = (col, row, hold) => {
      if (col < 0 || row < 0 || col >= cols || row >= rows) return;
      if (cells.size >= maxLit) return;
      const key = `${col},${row}`;
      const now = performance.now();
      const lit = cells.get(key);
      if (lit && now < lit.until) return;

      let born = now;
      if (lit) {
        const faded = 1 - easeIn(Math.min(1, (now - lit.until) / FADE_OUT));
        born = now - (1 - Math.sqrt(Math.max(0, 1 - faded))) * FADE_IN;
      }
      cells.set(key, {
        col,
        row,
        colour: lit?.colour ?? pickColor(),
        dim: brightness(col, row),
        born,
        until: now + hold,
      });
      wake();
    };

    let pending = 0;
    let at = null;
    const paint = () => {
      pending = 0;
      if (!at) return;
      const cx = Math.floor(at.x / cell);
      const cy = Math.floor(at.y / cell);
      const span = Math.ceil(reach);
      for (let dy = -span; dy <= span; dy++) {
        for (let dx = -span; dx <= span; dx++) {
          const away = Math.hypot(dx, dy);
          if (away > reach) continue;
          if (Math.random() > 1 - away / (reach + 0.6)) continue;
          light(cx + dx, cy + dy, 260 + Math.random() * 800);
        }
      }
    };

    const isTouchOnly = window.matchMedia && window.matchMedia("(pointer: coarse)").matches;
    const onMove = event => {
      // Conserve battery on touch devices if user is just tapping or scrolling
      if (event.pointerType === "touch" && isTouchOnly) return;
      const bounds = container.getBoundingClientRect();
      if (
        event.clientX >= bounds.left &&
        event.clientX <= bounds.right &&
        event.clientY >= bounds.top &&
        event.clientY <= bounds.bottom
      ) {
        at = { x: event.clientX - bounds.left, y: event.clientY - bounds.top };
        if (!pending) pending = requestAnimationFrame(paint);
      }
    };

    let visible = true;
    let beat = 0;
    const drift = () => {
      beat = window.setTimeout(drift, 1400 + Math.random() * 1800);
      if (!visible || document.hidden) return;
      for (let i = 0; i < ambient; i++) {
        light(
          Math.floor(Math.random() * cols),
          Math.floor(Math.random() * rows),
          900 + Math.random() * 1600
        );
      }
    };
    beat = window.setTimeout(drift, 600);

    if (window.IntersectionObserver) {
      const sight = new IntersectionObserver(([entry]) => {
        visible = entry?.isIntersecting ?? true;
      });
      sight.observe(container);
    }
    if (window.ResizeObserver) {
      const resize = new ResizeObserver(measure);
      resize.observe(container);
    }

    measure();
    if (document.fonts?.ready) {
      document.fonts.ready.then(measureText).catch(() => {});
    }
    window.addEventListener('pointermove', onMove, { passive: true });
  }

  // Initialize on any element with data-grid-pulse or default studio tools heroes
  function boot() {
    const targets = document.querySelectorAll('[data-grid-pulse], .tools-hero-interactive');
    targets.forEach(initGridPulse);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
