'use client';

import { useEffect, useRef } from 'react';

interface Shockwave {
  x: number;       // origin pixel x
  y: number;       // origin pixel y
  radius: number;  // current expanding radius in pixels
  maxRadius: number;
  speed: number;
  alpha: number;   // current opacity
}

export default function HexBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // ── Config ──────────────────────────────────────────
    const HEX_SIZE      = 20;      // small hexagons
    const MOUSE_RADIUS  = 120;     // px — area of influence around cursor
    const ZOOM_PEAK     = 1.45;    // max scale at cursor centre
    const GLOW_PEAK     = 0.75;    // max outline alpha at cursor centre
    const BASE_ALPHA    = 0.09;    // resting outline alpha
    const BASE_SPOKE    = 0.04;    // resting spoke alpha
    const SHOCK_WIDTH   = 38;      // thickness of shockwave ring in px
    const SHOCK_SPEED   = 14;      // px per frame
    // ────────────────────────────────────────────────────

    const hexH  = Math.sqrt(3) * HEX_SIZE;
    const hexColW = HEX_SIZE * 1.5; // horizontal distance between col centres

    let mouseX = -9999;
    let mouseY = -9999;
    let animId: number;
    const shockwaves: Shockwave[] = [];

    function resize() {
      canvas!.width  = window.innerWidth;
      canvas!.height = window.innerHeight;
    }

    /** Flat-top hex centre for grid col / row */
    function hexCenter(col: number, row: number): [number, number] {
      const x = col * hexColW;
      const y = row * hexH + (col % 2 !== 0 ? hexH / 2 : 0);
      return [x, y];
    }

    /** 6 vertices of a flat-top hexagon, scaled around cx/cy */
    function hexVertices(
      cx: number, cy: number, scale: number
    ): [number, number][] {
      return Array.from({ length: 6 }, (_, i) => {
        const a = (Math.PI / 3) * i;
        return [
          cx + HEX_SIZE * scale * Math.cos(a),
          cy + HEX_SIZE * scale * Math.sin(a),
        ] as [number, number];
      });
    }

    function draw() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cols = Math.ceil(canvas.width  / hexColW) + 2;
      const rows = Math.ceil(canvas.height / hexH)    + 2;

      for (let col = -1; col < cols; col++) {
        for (let row = -1; row < rows; row++) {
          const [cx, cy] = hexCenter(col, row);

          // ── Mouse proximity influence ──────────────────
          const dMouse  = Math.hypot(mouseX - cx, mouseY - cy);
          const tMouse  = Math.max(0, 1 - dMouse / MOUSE_RADIUS); // 0→1
          const tSmooth = tMouse * tMouse * (3 - 2 * tMouse);    // smoothstep

          // ── Shockwave influence ────────────────────────
          let shockBoost = 0;
          for (const sw of shockwaves) {
            const dSW   = Math.hypot(sw.x - cx, sw.y - cy);
            const front = sw.radius;
            const dist  = Math.abs(dSW - front);
            if (dist < SHOCK_WIDTH / 2) {
              const t = 1 - dist / (SHOCK_WIDTH / 2);
              shockBoost = Math.max(shockBoost, t * sw.alpha);
            }
          }

          const boost   = Math.max(tSmooth, shockBoost);
          const scale   = 1 + tSmooth * (ZOOM_PEAK - 1);          // only mouse scales up
          const outlineA = BASE_ALPHA + boost * (GLOW_PEAK - BASE_ALPHA);
          const spokeA   = BASE_SPOKE + boost * 0.25;
          const lw       = 0.6 + boost * 1.6;

          const verts = hexVertices(cx, cy, scale);

          // Hex outline
          ctx.beginPath();
          ctx.moveTo(verts[0][0], verts[0][1]);
          for (let i = 1; i < 6; i++) ctx.lineTo(verts[i][0], verts[i][1]);
          ctx.closePath();
          ctx.strokeStyle = `rgba(255,0,0,${outlineA})`;
          ctx.lineWidth   = lw;
          ctx.stroke();

          // Spokes
          ctx.lineWidth   = 0.35;
          ctx.strokeStyle = `rgba(255,0,0,${spokeA})`;
          for (const [vx, vy] of verts) {
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.lineTo(vx, vy);
            ctx.stroke();
          }

          // Fill glow
          if (boost > 0.05) {
            ctx.beginPath();
            ctx.moveTo(verts[0][0], verts[0][1]);
            for (let i = 1; i < 6; i++) ctx.lineTo(verts[i][0], verts[i][1]);
            ctx.closePath();
            ctx.fillStyle = `rgba(255,0,0,${boost * 0.07})`;
            ctx.fill();
          }
        }
      }

      // Advance shockwaves
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const sw = shockwaves[i];
        sw.radius += SHOCK_SPEED;
        // Fade out as it expands past half its max radius
        sw.alpha = Math.max(0, 1 - sw.radius / sw.maxRadius);
        if (sw.alpha <= 0) shockwaves.splice(i, 1);
      }

      animId = requestAnimationFrame(draw);
    }

    function onMouseMove(e: MouseEvent) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }

    function onMouseLeave() {
      mouseX = -9999;
      mouseY = -9999;
    }

    function onClick(e: MouseEvent) {
      const diagonal = Math.hypot(canvas!.width, canvas!.height);
      shockwaves.push({
        x:         e.clientX,
        y:         e.clientY,
        radius:    0,
        maxRadius: diagonal,
        speed:     SHOCK_SPEED,
        alpha:     1,
      });
    }

    resize();
    window.addEventListener('resize',     resize);
    window.addEventListener('mousemove',  onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('click',      onClick);

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize',     resize);
      window.removeEventListener('mousemove',  onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('click',      onClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position:      'fixed',
        inset:         0,
        width:         '100%',
        height:        '100%',
        zIndex:        0,
        pointerEvents: 'none',
      }}
    />
  );
}
