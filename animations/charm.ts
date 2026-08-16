"use client";

import { DURATION, EASE, gsap, type MotionConfig } from "./motion";
import { CHARM_FLICK_EVENT, consumeCharmFlick, type CharmArt, type CharmId } from "@/lib/charms";
import { clampHangX } from "@/lib/charm-storage";

export const NODE_COUNT = 12;
export const SEGMENT = 15.5;
export const STRING_LENGTH = SEGMENT * (NODE_COUNT - 1);
export const CHARM_SIZE = 64;
export const CHARM_VISUAL = 84;
export const REHANG_ZONE = 60;
export const BEAD_STATIONS = [34, 24, 15] as const;
export const DESKTOP_SCALE = 1.85;
export const MOBILE_SCALE = 1.35;
export const PHONE_SCALE = 0.58;
const STEP = 1 / 120;

type RopeNode = { x: number; y: number; px: number; py: number };

let savedRope: { hangX: number; nodes: RopeNode[]; time: number } | null = null;

type PendulumHandles = {
  charm: HTMLElement;
  visual: SVGGElement;
  world: SVGGElement;
  string: SVGPathElement;
  beads: SVGGElement;
  caption?: HTMLElement;
  switcher?: HTMLElement;
};

type PendulumOptions = {
  config: MotionConfig;
  getHangX: () => number;
  getArt: () => CharmArt;
  setHangX: (value: number) => void;
  paused: () => boolean;
  onFlick: () => void;
  onRitual: () => void;
  onSwitch?: (step: number) => void;
  applyHangX: (value: number) => void;
};

/**
 * Viewport-fixed hanging rope: 12-node Verlet string, grab, flick, re-hang.
 * No Club plugins — GSAP ticker only. Original marks, not copied 3D PNGs.
 */
export function animateCharm(handles: PendulumHandles, options: PendulumOptions) {
  const { charm, visual, world, string: stringEl, beads, caption, switcher } = handles;
  const { config, getHangX, getArt, setHangX, paused, onFlick, onRitual, onSwitch, applyHangX } = options;

  const worldScale = () => {
    const width = window.innerWidth;
    if (width < 768) return PHONE_SCALE;
    if (width < 1024 || config.isMobile) return MOBILE_SCALE;
    return DESKTOP_SCALE;
  };
  const hangPx = () => (clampHangX(getHangX()) * window.innerWidth) / worldScale();
  const maxStretch = STRING_LENGTH * 1.4;
  const toWorld = (clientX: number, clientY: number) => {
    const m = worldScale();
    return { x: clientX / m, y: clientY / m };
  };

  const seedNodes = (hx: number): RopeNode[] =>
    Array.from({ length: NODE_COUNT }, (_, i) => ({
      x: hx,
      y: i * SEGMENT,
      px: hx,
      py: i * SEGMENT,
    }));

  const hx0 = hangPx();
  let nodes: RopeNode[] =
    savedRope && savedRope.nodes.length === NODE_COUNT
      ? savedRope.nodes.map((node) => ({
          x: node.x + (hx0 - savedRope!.hangX),
          y: node.y,
          px: node.px + (hx0 - savedRope!.hangX),
          py: node.py,
        }))
      : seedNodes(hx0);
  let time = savedRope?.time ?? 0;
  let dragging = false;
  let rehang = false;
  let pointerX = hx0;
  let pointerY = STRING_LENGTH;
  let lastX = pointerX;
  let lastY = pointerY;
  let lastT = 0;
  let velocityX = 0;
  let velocityY = 0;
  let downTime = 0;
  let downX = 0;
  let downY = 0;
  let armed = false;
  let ritualLock = false;
  let mouseSeen = false;
  let mouseVx = 0;
  let lastMouseT = 0;
  let acc = 0;

  const lastNode = () => nodes[NODE_COUNT - 1];

  const pinPointer = () => {
    const hx = hangPx();
    const art = getArt();
    const dx = pointerX - hx;
    const dy = Math.max(pointerY, 8);
    const dist = Math.hypot(dx, dy) || 1;
    const reach = Math.min(Math.max(dist - art.hangOffset, 1), maxStretch);
    const tip = lastNode();
    tip.x = hx + (dx / dist) * reach;
    tip.y = (dy / dist) * reach;
  };

  const constrain = () => {
    const hx = hangPx();
    for (let iter = 0; iter < 5; iter += 1) {
      nodes[0].x = hx;
      nodes[0].y = 0;
      if (dragging) pinPointer();
      for (let a = 0; a < NODE_COUNT - 1; a += 1) {
        const n = nodes[a];
        const i = nodes[a + 1];
        const dx = i.x - n.x;
        const dy = i.y - n.y;
        const dist = Math.max(Math.hypot(dx, dy), 1e-4);
        const l = (dist - SEGMENT) / dist / 2;
        const ox = dx * l;
        const oy = dy * l;
        if (a === 0) {
          i.x -= ox * 2;
          i.y -= oy * 2;
        } else if (dragging && a === NODE_COUNT - 2) {
          n.x += ox * 2;
          n.y += oy * 2;
        } else {
          n.x += ox;
          n.y += oy;
          i.x -= ox;
          i.y -= oy;
        }
      }
    }
  };

  const alongFromEnd = (distance: number) => {
    const t = Math.min(Math.max(1 - distance / STRING_LENGTH, 0), 1) * (NODE_COUNT - 1);
    const index = Math.min(Math.floor(t), NODE_COUNT - 2);
    const u = t - index;
    const a = nodes[index];
    const b = nodes[index + 1];
    return {
      x: a.x + (b.x - a.x) * u,
      y: a.y + (b.y - a.y) * u,
      angle: Math.atan2(b.x - a.x, b.y - a.y),
    };
  };

  const ropePath = () => {
    let d = `M ${nodes[0].x} ${nodes[0].y}`;
    for (let i = 1; i < NODE_COUNT - 1; i += 1) {
      const mx = (nodes[i].x + nodes[i + 1].x) / 2;
      const my = (nodes[i].y + nodes[i + 1].y) / 2;
      d += ` Q ${nodes[i].x} ${nodes[i].y} ${mx} ${my}`;
    }
    const tip = lastNode();
    d += ` L ${tip.x} ${tip.y}`;
    return d;
  };

  const apply = () => {
    const m = worldScale();
    const tip = lastNode();
    const prev = nodes[NODE_COUNT - 2];
    const angle = Math.atan2(tip.x - prev.x, tip.y - prev.y);
    const deg = (angle * 180) / Math.PI;
    const art = getArt();
    const grabWorldX = tip.x + art.hangOffset * Math.sin(angle);
    const grabWorldY = tip.y + art.hangOffset * Math.cos(angle);
    const grabSize = Math.round(24 * m) * 2;
    const halfGrab = grabSize / 2;

    world.setAttribute("transform", `scale(${m.toFixed(4)})`);
    visual.setAttribute(
      "transform",
      `translate(${tip.x.toFixed(2)} ${tip.y.toFixed(2)}) rotate(${deg.toFixed(2)})`,
    );
    charm.style.width = `${grabSize}px`;
    charm.style.height = `${grabSize}px`;
    charm.style.transform = `translate(${(grabWorldX * m - halfGrab).toFixed(1)}px, ${(grabWorldY * m - halfGrab).toFixed(1)}px)`;
    stringEl.setAttribute("d", ropePath());

    const beadEls = beads.children;
    BEAD_STATIONS.forEach((station, index) => {
      const point = alongFromEnd(station + art.beads.raise);
      beadEls[index]?.setAttribute(
        "transform",
        `translate(${point.x.toFixed(2)} ${point.y.toFixed(2)}) rotate(${((point.angle * 180) / Math.PI).toFixed(2)})`,
      );
    });
    if (caption) {
      caption.style.transform = `translate(${grabWorldX * m}px, ${grabWorldY * m + halfGrab + 8}px) translate(-50%, 0)`;
    }
    if (switcher) {
      switcher.style.transform = `translate(${grabWorldX * m}px, ${grabWorldY * m + halfGrab + 24}px) translate(-50%, 0)`;
    }
  };

  const integrate = () => {
    time += STEP;
    const wind = 0.0035 * Math.sin(time * 0.55) + 0.002 * Math.sin(time * 1.3 + 0.8);
    for (let i = 1; i < NODE_COUNT; i += 1) {
      const node = nodes[i];
      const vx = (node.x - node.px) * 0.98;
      const vy = (node.y - node.py) * 0.98;
      node.px = node.x;
      node.py = node.y;
      node.x += vx + wind * (i / (NODE_COUNT - 1));
      node.y += vy + 0.125;
    }

    if (mouseSeen && !config.isMobile && !dragging) {
      const art = getArt();
      const tip = lastNode();
      const angle = Math.atan2(tip.x - nodes[NODE_COUNT - 2].x, tip.y - nodes[NODE_COUNT - 2].y);
      const charmX = tip.x + art.hangOffset * Math.sin(angle);
      const charmY = tip.y + art.hangOffset * Math.cos(angle);
      const i = charmX - pointerX;
      const r = charmY - pointerY;
      const s = Math.hypot(i, r);
      if (s < 40 && s > 0.5) {
        const l = (40 - s) / 40;
        tip.x += (i / s) * l * l * 0.4;
        tip.y += (r / s) * l * l * 0.4 * 0.35;
      }
      for (let l = 1; l < NODE_COUNT - 2; l += 1) {
        const node = nodes[l];
        const p = node.x - pointerX;
        const A = node.y - pointerY;
        const E = p * p + A * A;
        if (E < 1600 && E > 1) {
          const ct = Math.sqrt(E);
          const kt = ((40 - ct) / 40) * 0.8;
          node.x += (p / ct) * kt;
          node.y += (A / ct) * kt;
        }
      }
    }
  };

  constrain();
  apply();
  applyHangX(clampHangX(getHangX()));

  if (config.reducedMotion) {
    nodes = seedNodes(hangPx());
    constrain();
    apply();
    const onActivate = (event: Event) => {
      event.preventDefault();
      onRitual();
    };
    charm.addEventListener("click", onActivate);
    return () => charm.removeEventListener("click", onActivate);
  }

  const shove = (px: number, py = 0) => {
    const tip = lastNode();
    tip.px -= px;
    tip.py -= py;
  };

  const impulseFromTap = () => {
    shove(pointerX >= hangPx() ? 22 : -22, 4);
    onFlick();
  };

  const impulse = () => {
    shove((Math.random() < 0.5 ? 1 : -1) * (18 + Math.random() * 8), 2);
    onFlick();
  };

  const onFlickRequest = () => {
    if (paused() || dragging) return;
    consumeCharmFlick();
    impulse();
  };

  const onDown = (event: PointerEvent) => {
    if (event.button !== 0) return;
    const worldPoint = toWorld(event.clientX, event.clientY);
    pointerX = worldPoint.x;
    pointerY = worldPoint.y;
    lastX = pointerX;
    lastY = pointerY;
    lastT = performance.now();
    downTime = lastT;
    downX = worldPoint.x;
    downY = worldPoint.y;
    velocityX = 0;
    velocityY = 0;
    rehang = false;
    armed = true;

    if (config.isMobile) return;

    event.preventDefault();
    charm.setPointerCapture(event.pointerId);
    dragging = true;
    pinPointer();
    constrain();
    charm.style.cursor = "grabbing";
    apply();
  };

  const onMove = (event: PointerEvent) => {
    const now = performance.now();
    const moveDt = Math.max((now - (lastMouseT || now)) / 1000, 0.001);
    if (moveDt < 0.12) {
      mouseVx = Math.max(-2400, Math.min(2400, (event.clientX - pointerX) / moveDt));
    }
    lastMouseT = now;
    const worldPoint = toWorld(event.clientX, event.clientY);
    pointerX = worldPoint.x;
    pointerY = worldPoint.y;
    mouseSeen = true;

    if (!dragging) return;
    const dt = Math.max((now - lastT) / 1000, 0.001);
    velocityX = (pointerX - lastX) / dt;
    velocityY = (pointerY - lastY) / dt;
    lastX = pointerX;
    lastY = pointerY;
    lastT = now;

    if (pointerY < REHANG_ZONE) {
      rehang = true;
      const next = clampHangX(event.clientX / window.innerWidth);
      applyHangX(next);
    }

    pinPointer();
    constrain();
    apply();
  };

  const release = (event: PointerEvent) => {
    const worldPoint = toWorld(event.clientX, event.clientY);
    if (config.isMobile) {
      if (!armed) return;
      armed = false;
      const tap =
        Math.hypot(worldPoint.x - downX, worldPoint.y - downY) < 8 &&
        performance.now() - downTime < 280;
      pointerX = worldPoint.x;
      pointerY = worldPoint.y;
      if (tap && !ritualLock) impulseFromTap();
      return;
    }

    if (!dragging) return;
    dragging = false;
    charm.style.cursor = "grab";
    try {
      charm.releasePointerCapture(event.pointerId);
    } catch {
      /* already released */
    }

    if (rehang) {
      setHangX(clampHangX(event.clientX / window.innerWidth));
      rehang = false;
      constrain();
      apply();
      return;
    }

    const elapsed = performance.now() - downTime;
    const travel = Math.hypot(worldPoint.x - downX, worldPoint.y - downY);
    const click = elapsed < 280 && travel < 6;

    if (click && onSwitch) {
      onSwitch(event.shiftKey ? -1 : 1);
      shove(8 * (event.shiftKey ? -1 : 1));
      return;
    }

    const impulseX = Math.max(-28, Math.min(28, velocityX / 90));
    const impulseY = Math.max(-18, Math.min(18, velocityY / 120));
    shove(impulseX, impulseY);
    const flicked = Math.hypot(impulseX, impulseY) > 4;
    if (flicked) onFlick();
  };

  const onDblClick = (event: MouseEvent) => {
    event.preventDefault();
    ritualLock = true;
    onRitual();
    window.setTimeout(() => {
      ritualLock = false;
    }, 400);
  };

  const onKey = (event: KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onRitual();
      return;
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      onSwitch?.(1);
      return;
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      onSwitch?.(-1);
    }
  };

  const tick = () => {
    if (paused() || dragging || ritualLock) return;
    acc += Math.min(gsap.ticker.deltaRatio() / 60, 0.1);
    let stepped = false;
    let steps = 0;
    while (acc >= STEP && steps < 8) {
      integrate();
      constrain();
      acc -= STEP;
      stepped = true;
      steps += 1;
    }
    if (stepped) apply();
  };

  charm.addEventListener("pointerdown", onDown);
  window.addEventListener("pointermove", onMove);
  window.addEventListener("pointerup", release);
  window.addEventListener("pointercancel", release);
  charm.addEventListener("dblclick", onDblClick);
  charm.addEventListener("keydown", onKey);
  window.addEventListener(CHARM_FLICK_EVENT, onFlickRequest);
  gsap.ticker.add(tick);
  if (consumeCharmFlick()) impulse();

  return () => {
    savedRope = {
      hangX: hangPx(),
      nodes: nodes.map((node) => ({ ...node })),
      time,
    };
    charm.removeEventListener("pointerdown", onDown);
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("pointerup", release);
    window.removeEventListener("pointercancel", release);
    charm.removeEventListener("dblclick", onDblClick);
    charm.removeEventListener("keydown", onKey);
    window.removeEventListener(CHARM_FLICK_EVENT, onFlickRequest);
    gsap.ticker.remove(tick);
    charm.style.cursor = "";
  };
}

export function playCharmRitual(
  mark: Element,
  id: CharmId,
  reducedMotion: boolean,
  onDone?: () => void,
) {
  const done = () => onDone?.();
  gsap.killTweensOf(mark);

  if (reducedMotion) {
    done();
    return;
  }

  if (id === "period") {
    gsap.fromTo(
      mark,
      { scale: 1 },
      {
        scale: 1.18,
        duration: DURATION.xs,
        ease: EASE,
        yoyo: true,
        repeat: 1,
        transformOrigin: "50% 50%",
        onComplete: done,
      },
    );
    return;
  }

  if (id === "disc") {
    const fill = mark.querySelector<SVGElement>("[data-charm-fill]");
    if (!fill) {
      done();
      return;
    }
    gsap.fromTo(
      fill,
      { attr: { fill: "#0b1849" } },
      {
        attr: { fill: "#e4b028" },
        duration: DURATION.sm,
        ease: EASE,
        yoyo: true,
        repeat: 1,
        onComplete: done,
      },
    );
    return;
  }

  if (id === "pencil") {
    gsap.fromTo(
      mark,
      { rotate: 0 },
      {
        rotate: 10,
        duration: 0.08,
        ease: "none",
        yoyo: true,
        repeat: 5,
        transformOrigin: "50% 50%",
        onComplete: () => {
          gsap.set(mark, { rotate: 0 });
          done();
        },
      },
    );
    return;
  }

  if (id === "nimbu") {
    gsap.fromTo(
      mark,
      { scale: 1, transformOrigin: "50% 0%" },
      {
        scale: 0.86,
        duration: DURATION.xs,
        ease: EASE,
        yoyo: true,
        repeat: 1,
        onComplete: done,
      },
    );
    return;
  }

  if (id === "drishti") {
    gsap.fromTo(
      mark,
      { scale: 1 },
      {
        scale: 1.1,
        duration: DURATION.xs,
        ease: EASE,
        yoyo: true,
        repeat: 1,
        transformOrigin: "50% 50%",
        onComplete: done,
      },
    );
    return;
  }

  if (id === "daruma") {
    gsap.fromTo(
      mark,
      { scale: 1 },
      {
        scale: 1.12,
        duration: DURATION.xs,
        ease: EASE,
        yoyo: true,
        repeat: 1,
        transformOrigin: "50% 50%",
        onComplete: done,
      },
    );
    return;
  }

  if (id === "neko") {
    const paw = mark.querySelector<SVGElement>("[data-neko-paw]");
    if (!paw) {
      done();
      return;
    }
    gsap.fromTo(
      paw,
      { rotate: 0 },
      {
        rotate: -18,
        duration: 0.18,
        ease: EASE,
        yoyo: true,
        repeat: 3,
        transformOrigin: "0% 100%",
        onComplete: done,
      },
    );
    return;
  }

  if (id === "horseshoe") {
    gsap.fromTo(
      mark,
      { rotate: 0 },
      {
        rotate: 8,
        duration: 0.12,
        ease: EASE,
        yoyo: true,
        repeat: 3,
        transformOrigin: "50% 0%",
        onComplete: () => {
          gsap.set(mark, { rotate: 0 });
          done();
        },
      },
    );
    return;
  }

  if (id === "scarab") {
    const left = mark.querySelector<SVGElement>('[data-scarab-wing="left"]');
    const right = mark.querySelector<SVGElement>('[data-scarab-wing="right"]');
    if (!left || !right) {
      done();
      return;
    }
    gsap.fromTo(
      left,
      { scaleX: 1, scaleY: 1 },
      {
        scaleX: 1.85,
        scaleY: 1.15,
        duration: DURATION.sm,
        ease: EASE,
        yoyo: true,
        repeat: 1,
        transformOrigin: "100% 40%",
      },
    );
    gsap.fromTo(
      right,
      { scaleX: 1, scaleY: 1 },
      {
        scaleX: 1.85,
        scaleY: 1.15,
        duration: DURATION.sm,
        ease: EASE,
        yoyo: true,
        repeat: 1,
        transformOrigin: "0% 40%",
        onComplete: done,
      },
    );
    return;
  }

  gsap.fromTo(
    mark,
    { scale: 1 },
    {
      scale: 1.2,
      duration: DURATION.sm,
      ease: EASE,
      yoyo: true,
      repeat: 1,
      transformOrigin: "50% 50%",
      onComplete: done,
    },
  );
}

export function showCharmCaption(caption: HTMLElement, text: string, reducedMotion: boolean) {
  caption.textContent = text;
  gsap.killTweensOf(caption);
  if (reducedMotion) {
    gsap.set(caption, { autoAlpha: 1 });
    window.setTimeout(() => gsap.set(caption, { autoAlpha: 0 }), 1200);
    return;
  }
  gsap.fromTo(
    caption,
    { autoAlpha: 0 },
    {
      autoAlpha: 1,
      duration: DURATION.xs,
      ease: EASE,
    },
  );
  gsap.to(caption, {
    autoAlpha: 0,
    duration: DURATION.sm,
    ease: EASE,
    delay: 1.2,
  });
}
