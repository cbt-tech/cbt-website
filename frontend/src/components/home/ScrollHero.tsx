"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import { motion, useAnimationFrame, useMotionValue, useReducedMotion, useSpring, type MotionValue } from "framer-motion";
import { Container } from "@/components/ui/Container";

const tunnelColors = ["#0661f1", "#178fe5", "#031c51", "#666d78"] as const;

function smoothstep(edgeStart: number, edgeEnd: number, value: number) {
  const progress = Math.max(0, Math.min(1, (value - edgeStart) / (edgeEnd - edgeStart)));
  return progress * progress * (3 - 2 * progress);
}

function TunnelCanvas({ progress, pointerX, pointerY, reducedMotion }: { progress: MotionValue<number>; pointerX: MotionValue<number>; pointerY: MotionValue<number>; reducedMotion: boolean | null }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sizeRef = useRef({ width: 0, height: 0, pixelRatio: 1 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(bounds.width * pixelRatio);
      canvas.height = Math.round(bounds.height * pixelRatio);
      sizeRef.current = { width: bounds.width, height: bounds.height, pixelRatio };
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);

  useAnimationFrame((time) => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    const { width, height, pixelRatio } = sizeRef.current;
    if (!canvas || !context || width === 0 || height === 0) return;
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    context.clearRect(0, 0, width, height);
    const mobile = width < 640;
    const ringCount = mobile ? 20 : 28;
    const pointsPerRing = mobile ? 34 : 48;
    const scroll = progress.get();
    const elapsedSeconds = reducedMotion ? 0 : time / 1000;
    const pointerShiftX = pointerX.get() * width * 0.04;
    const pointerShiftY = pointerY.get() * height * 0.035;
    const forwardFlow = scroll * 0.82;
    const rotation = Math.sin(elapsedSeconds * 0.08) * 0.035;
    const vanishingX = width * 0.5 + pointerShiftX;
    const vanishingY = height * (0.48 + Math.cos(scroll * Math.PI * 1.5) * 0.012) + pointerShiftY;
    const scrollPerspective = 1 + Math.sin(scroll * Math.PI * 2) * 0.045;

    for (let ring = 0; ring < ringCount; ring += 1) {
      const depth = (ring / ringCount + forwardFlow) % 1;
      const perspectiveDepth = Math.pow(depth, 1.55);
      const radiusX = width * (0.025 + perspectiveDepth * 0.79) * scrollPerspective;
      const radiusY = height * (0.02 + perspectiveDepth * 0.82) / scrollPerspective;
      const depthFade = smoothstep(0.025, 0.22, depth) * (1 - smoothstep(0.91, 1, depth));
      context.fillStyle = tunnelColors[ring % tunnelColors.length];
      for (let point = 0; point < pointsPerRing; point += 1) {
        const angle = (point / pointsPerRing) * Math.PI * 2 + rotation;
        const ripple = 1 + Math.sin(angle * 4 + elapsedSeconds * 0.22 + depth * 7.5 + scroll * 4) * (0.012 + depth * 0.018);
        const x = vanishingX + Math.cos(angle) * radiusX * ripple + pointerShiftX * depth * 0.42;
        const y = vanishingY + Math.sin(angle) * radiusY * ripple + Math.sin(angle * 2 - elapsedSeconds * 0.14 + ring * 0.19) * height * 0.006 * depth + pointerShiftY * depth * 0.42;
        if (x < -20 || x > width + 20 || y < -20 || y > height + 20) continue;
        const horizontalPosition = x / width;
        const verticalPosition = y / height;
        const contentX = (horizontalPosition - 0.5) / (mobile ? 0.44 : 0.37);
        const contentY = (verticalPosition - 0.48) / (mobile ? 0.4 : 0.35);
        const contentDistance = Math.sqrt(contentX * contentX + contentY * contentY);
        const contentClearance = 0.08 + smoothstep(0.72, 1.16, contentDistance) * 0.92;
        const edgeDistance = Math.min(1, Math.sqrt(Math.pow((horizontalPosition - 0.5) * 2, 2) + Math.pow((verticalPosition - 0.5) * 2, 2)));
        const opacity = (0.08 + perspectiveDepth * 0.82) * depthFade * contentClearance * (0.74 + edgeDistance * 0.34);
        if (opacity < 0.014) continue;
        context.globalAlpha = opacity;
        context.beginPath();
        context.arc(x, y, (0.55 + perspectiveDepth * (mobile ? 5 : 6.2)) * (0.82 + edgeDistance * 0.24), 0, Math.PI * 2);
        context.fill();
      }
    }
    context.globalAlpha = 1;
  });

  return <canvas ref={canvasRef} className="absolute inset-0 size-full" aria-hidden="true" />;
}

const ease = [0.22, 1, 0.36, 1] as const;
const marqueeItems = [
  "AI Agents & Automation",
  "IoT Solutions",
  "Salesforce CRM",
  "Web Development",
  "Mobile App Development",
  "Cloud Services",
  "Cybersecurity",
] as const;

function AnimatedWords({ text, stage, scene, className }: { text: string; stage: number; scene: number; className: string }) {
  const active = stage === scene;
  const past = stage > scene;

  return (
    <motion.span
      className={`absolute inset-x-0 mx-auto flex w-[calc(100%_-_0.5rem)] flex-wrap items-center justify-center gap-x-[.22em] gap-y-[.04em] px-2 [perspective:900px] ${className}`}
      initial={false}
      animate={active
        ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
        : { opacity: 0, y: past ? -20 : 20, scale: past ? 1.015 : .97, filter: "blur(6px)" }}
      transition={{ duration: .55, ease }}
      aria-hidden="true"
    >
      {text.split(" ").map((word, index) => (
        <span key={`${word}-${index}`} className="inline-block px-[.06em] pb-[.14em]">
          <motion.span
            className="inline-block"
            initial={false}
            animate={active
              ? { opacity: 1, y: "0%", rotateX: 0 }
              : { opacity: 0, y: past ? "-85%" : "85%", rotateX: past ? 10 : -12 }}
            transition={{ duration: .58, delay: active ? index * .055 : index * .018, ease }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

export function ScrollHero() {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const backgroundTarget = useMotionValue(0);
  const backgroundProgress = useSpring(backgroundTarget, { stiffness: 42, damping: 18, mass: 0.8 });
  const smoothPointerX = useSpring(pointerX, { stiffness: 80, damping: 24, mass: 0.5 });
  const smoothPointerY = useSpring(pointerY, { stiffness: 80, damping: 24, mass: 0.5 });
  const reducedMotion = useReducedMotion();
  const [stage, setStage] = useState(0);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const timers: Array<ReturnType<typeof setTimeout>> = [];
    if (reducedMotion) {
      timers.push(setTimeout(() => setStage(0), 0));
      return () => timers.forEach(clearTimeout);
    }
    timers.push(setTimeout(() => setStage(0), 0));
    timers.push(setTimeout(() => setStage(1), 1900));
    timers.push(setTimeout(() => setStage(2), 3800));
    timers.push(setTimeout(() => setStage(3), 5600));
    timers.push(setTimeout(() => setStage(4), 7400));
    timers.push(setTimeout(() => setCycle((current) => current + 1), 9800));
    return () => timers.forEach(clearTimeout);
  }, [cycle, reducedMotion]);

  useEffect(() => {
    backgroundTarget.set(stage / 4);
  }, [backgroundTarget, stage]);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5);
    pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5);
  };

  return (
    <section className="relative h-[clamp(520px,68svh,760px)] overflow-hidden bg-white" aria-labelledby="agentic-ai-hero-title">
      <div className="relative size-full" onPointerMove={handlePointerMove} onPointerLeave={() => { pointerX.set(0); pointerY.set(0); }}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,white_0%,white_40%,color-mix(in_srgb,var(--brand-sky)_8%,white)_100%)]" />
        <motion.div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[58%] w-[48%] -translate-x-1/2 -translate-y-1/2 rounded-[48%] bg-[radial-gradient(ellipse_at_35%_38%,color-mix(in_srgb,var(--brand-sky)_18%,transparent),transparent_68%)] blur-2xl"
          animate={reducedMotion ? undefined : { opacity: [.28, .52, .28], scale: [.92, 1.08, .92], x: [-10, 12, -10] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        />
        <div className="pointer-events-none absolute inset-0"><TunnelCanvas progress={backgroundProgress} pointerX={smoothPointerX} pointerY={smoothPointerY} reducedMotion={reducedMotion} /></div>

        <Container className="relative z-10 h-full max-w-[1500px] px-5 sm:px-8 lg:px-12 xl:px-16">
          <h1 id="agentic-ai-hero-title" className="relative flex h-full w-full items-center justify-center text-center" aria-label="AI is transforming how businesses work. We put it to work for yours. From time-consuming workflows to intelligent automation with custom AI agent solutions.">
            <AnimatedWords text="AI Is Transforming How Businesses Work." stage={stage} scene={0} className="max-w-[760px] text-[clamp(1.35rem,2.7vw,2.8rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-[var(--brand-blue)]" />
            <AnimatedWords text="We Put It to Work for Yours." stage={stage} scene={1} className="max-w-[880px] text-[clamp(1.6rem,3.8vw,4rem)] font-semibold leading-[.98] tracking-[-0.045em] text-[var(--brand-navy)]" />
            <AnimatedWords text="From Time-Consuming Workflows" stage={stage} scene={2} className="max-w-[1020px] text-[clamp(1.8rem,4.8vw,5.1rem)] font-semibold leading-[.94] tracking-[-0.052em] text-[var(--brand-blue)]" />
            <AnimatedWords text="to Intelligent Automation" stage={stage} scene={3} className="max-w-[1120px] text-[clamp(2rem,5.8vw,6.2rem)] font-semibold leading-[.91] tracking-[-0.06em] text-[var(--brand-navy)]" />
            <AnimatedWords text="with Custom AI Agent Solutions." stage={stage} scene={4} className="max-w-[1240px] text-[clamp(2.15rem,6.8vw,7.2rem)] font-semibold leading-[.89] tracking-[-0.065em] text-[var(--brand-navy)]" />
          </h1>
        </Container>
        <div className="pointer-events-none absolute bottom-20 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2" aria-hidden="true">
          {Array.from({ length: 5 }, (_, index) => (
            <motion.span
              key={index}
              className="h-1 rounded-full bg-[var(--brand-blue)]"
              animate={{ width: stage === index ? 24 : 5, opacity: stage === index ? 1 : .22 }}
              transition={{ duration: reducedMotion ? 0 : .4, ease }}
            />
          ))}
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-16 overflow-hidden bg-[var(--brand-navy)] text-white" aria-hidden="true">
          <motion.div
            className="flex h-full w-max items-center"
            animate={reducedMotion ? undefined : { x: ["0%", "-50%"] }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          >
            {Array.from({ length: 2 }, (_, groupIndex) => (
              <div key={groupIndex} className="flex shrink-0 items-center">
                {marqueeItems.map((item) => (
                  <div key={`${groupIndex}-${item}`} className="flex items-center">
                    <span className="px-7 text-xs font-bold uppercase tracking-[.22em] text-white/90 sm:px-10 sm:text-sm">{item}</span>
                    <span className="size-1 rounded-full bg-[var(--brand-sky)] shadow-[0_0_8px_var(--brand-sky)]" />
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
          <motion.span
            className="absolute inset-y-0 left-0 w-1/4 bg-[linear-gradient(90deg,transparent,rgba(23,143,229,.2),transparent)] blur-sm"
            animate={reducedMotion ? undefined : { x: ["-150%", "500%"] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </div>
    </section>
  );
}
