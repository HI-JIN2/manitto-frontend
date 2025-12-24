"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  r: number;
  s: number;
  w: number;
};

const SNOW_COUNT = 140;

// 전역 애니메이션 상태 (페이지 전환 시에도 유지)
declare global {
  interface Window {
    __snowAnimation?: {
      particles: Particle[];
      frame: number;
      isRunning: boolean;
      canvas: HTMLCanvasElement | null;
      ctx: CanvasRenderingContext2D | null;
      init: (canvas: HTMLCanvasElement) => void;
    };
  }
}

// 전역 애니메이션 초기화 (한 번만 실행)
if (typeof window !== "undefined" && !window.__snowAnimation) {
  let width = window.innerWidth;
  let height = window.innerHeight;
  let particles: Particle[] = [];
  let animationFrame: number | null = null;

  const initParticles = (w: number, h: number) => {
    particles = Array.from({ length: SNOW_COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 1 + Math.random() * 2.2,
      s: 0.5 + Math.random() * 1,
      w: 0.5 + Math.random() * 0.8,
    }));
  };

  initParticles(width, height);

  const draw = () => {
    if (!window.__snowAnimation?.ctx || !window.__snowAnimation.canvas) {
      animationFrame = requestAnimationFrame(draw);
      return;
    }

    const { ctx, canvas } = window.__snowAnimation;
    width = canvas.width;
    height = canvas.height;

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "rgba(255,255,255,0.8)";

    for (const p of particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
      // Update
      p.y += p.s;
      p.x += Math.sin(p.y * 0.01) * p.w;

      if (p.y > height) {
        p.y = -5;
        p.x = Math.random() * width;
      }
    }
    animationFrame = requestAnimationFrame(draw);
  };

  window.__snowAnimation = {
    particles,
    frame: 0,
    isRunning: false,
    canvas: null,
    ctx: null,
    init: (canvas: HTMLCanvasElement) => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      window.__snowAnimation!.canvas = canvas;
      window.__snowAnimation!.ctx = ctx;

      // 애니메이션이 실행 중이 아니면 시작
      if (!window.__snowAnimation!.isRunning) {
        window.__snowAnimation!.isRunning = true;
        animationFrame = requestAnimationFrame(draw);
        window.__snowAnimation!.frame = animationFrame;
      }
    },
  };

  // 리사이즈 핸들러
  window.addEventListener("resize", () => {
    if (window.__snowAnimation?.canvas) {
      window.__snowAnimation.canvas.width = window.innerWidth;
      window.__snowAnimation.canvas.height = window.innerHeight;
    }
  });
}

export function Snow() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !window.__snowAnimation) return;

    // 전역 애니메이션에 canvas 등록
    window.__snowAnimation.init(canvas);

    // cleanup 시 canvas만 제거 (애니메이션은 계속 실행)
    return () => {
      if (window.__snowAnimation) {
        window.__snowAnimation.canvas = null;
        window.__snowAnimation.ctx = null;
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 opacity-70 mix-blend-screen"
    />
  );
}

