# Landing "Para Giuliana" - Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an interactive landing page gift for Giuliana with scratch card, timeline, flip cards, quiz, and finale sections.

**Architecture:** Astro static site with React islands for interactive components. State flows linearly through sections (intro → scratch → timeline → cards → quiz → finale). Each section is a self-contained React component.

**Tech Stack:** Astro 4.x, React 18, Tailwind CSS 3.x, Framer Motion, Canvas API, canvas-confetti

**Spec:** `docs/superpowers/specs/2026-03-09-landing-giuliana-design.md`

---

## File Structure

| File | Responsibility |
|------|----------------|
| `src/pages/index.astro` | Main page, orchestrates all sections |
| `src/layouts/Layout.astro` | Base HTML layout with meta tags |
| `src/styles/global.css` | Tailwind directives + custom animations |
| `src/data/content.ts` | All text content, quiz questions, image mappings |
| `src/components/Intro.tsx` | Particles background + typewriter text + start button |
| `src/components/ScratchCard.tsx` | Canvas-based scratch reveal mechanic |
| `src/components/Timeline.tsx` | Container for timeline sections |
| `src/components/TimelineSection.tsx` | Individual photo + message with scroll animation |
| `src/components/CardGallery.tsx` | Grid container for flip cards |
| `src/components/FlipCard.tsx` | 3D flip card with photo and message |
| `src/components/Quiz.tsx` | Sequential quiz with 3 questions |
| `src/components/Finale.tsx` | Confetti + final message + video |
| `tailwind.config.mjs` | Tailwind config with custom colors |
| `astro.config.mjs` | Astro config with React integration |

---

## Chunk 1: Project Setup

### Task 1: Initialize Astro Project

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tailwind.config.mjs`
- Create: `tsconfig.json`
- Create: `src/styles/global.css`

- [ ] **Step 1: Create Astro project with pnpm**

```bash
cd C:/dev/gian/ParaGiuliana
pnpm create astro@latest . --template minimal --install --no-git --typescript strict
```

Select: Empty project, Yes to TypeScript (strict), Yes to install dependencies

- [ ] **Step 2: Add React and Tailwind integrations**

```bash
pnpm astro add react tailwind
```

Select Yes to all prompts.

- [ ] **Step 3: Install additional dependencies**

```bash
pnpm add framer-motion canvas-confetti
pnpm add -D @types/canvas-confetti
```

- [ ] **Step 4: Configure Tailwind with custom colors**

Edit `tailwind.config.mjs`:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'deep-black': '#0a0a0a',
        'red-violet': '#c41e5c',
        'soft-pink': '#ff6b9d',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'heartbeat': 'heartbeat 1.5s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(196, 30, 92, 0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(196, 30, 92, 0.8)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'heartbeat': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
      },
    },
  },
  plugins: [],
}
```

- [ ] **Step 5: Create global styles**

Edit `src/styles/global.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    @apply bg-deep-black text-white antialiased;
  }
}

@layer components {
  .btn-primary {
    @apply px-8 py-4 bg-red-violet text-white font-semibold rounded-full
           transition-all duration-300 hover:bg-soft-pink
           animate-pulse-glow cursor-pointer;
  }
}

@layer utilities {
  .perspective-1000 {
    perspective: 1000px;
  }

  .preserve-3d {
    transform-style: preserve-3d;
  }

  .backface-hidden {
    backface-visibility: hidden;
  }

  .rotate-y-180 {
    transform: rotateY(180deg);
  }
}
```

- [ ] **Step 6: Verify build works**

```bash
pnpm dev
```

Expected: Server starts at localhost:4321 with empty page

- [ ] **Step 7: Commit setup**

```bash
git add -A
git commit -m "feat: initialize Astro project with React and Tailwind"
```

---

### Task 2: Create Layout and Content Data

**Files:**
- Create: `src/layouts/Layout.astro`
- Create: `src/data/content.ts`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Create base layout**

Create `src/layouts/Layout.astro`:

```astro
---
interface Props {
  title: string;
}

const { title } = Astro.props;
---

<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Un regalo especial para alguien especial" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>{title}</title>
  </head>
  <body class="min-h-screen overflow-x-hidden">
    <slot />
  </body>
</html>

<style is:global>
  @import '../styles/global.css';
</style>
```

- [ ] **Step 2: Create content data file**

Create `src/data/content.ts`:

```typescript
export const intro = {
  text: "Hay personas que llegan a tu vida\ny la cambian para siempre...",
  buttonText: "Comenzar",
};

export const scratchCard = {
  revealText: "Giuliana, esto es para ti...",
  buttonText: "Continuar",
  image: "/img/Gemini_Generated_Image_nixaranixaranixa.png",
};

export const timelineSections = [
  {
    image: "/img/71624c42-f793-4c85-9bb3-29c4c8d74f1f.jpg",
    message: "Futura doctora que ya cura con su presencia",
    alt: "Giuliana foto 1",
  },
  {
    image: "/img/c86f21df-2701-4e1a-b5bd-c611a97a9fdf.jpg",
    message: "La que estudia hasta las 3am pero siempre tiene tiempo para escuchar",
    alt: "Giuliana foto 2",
  },
  {
    image: "/img/c8f7f60f-2ca0-4aca-8f07-759a47c63686.jpg",
    message: "Auténtica hasta en el color de pelo",
    alt: "Giuliana foto 3",
  },
  {
    image: "/img/unname4.jpg",
    message: "Graciosa sin intentarlo",
    alt: "Giuliana foto 4",
  },
];

export const cards = [
  {
    image: "/img/unnamed.jpg",
    message: "Esos lentes que ven el futuro",
    alt: "Giuliana con lentes",
  },
  {
    image: "/img/unnamed2.jpg",
    message: "Corazón de oro",
    alt: "Giuliana foto corazón",
  },
  {
    image: "/img/unnamed3.jpg",
    message: "Shot on iPhone, vibes on point",
    alt: "Giuliana selfie",
  },
  {
    image: "/img/41603e4a-74c0-49bb-acc9-ed0e5883a733.jpg",
    message: "Siempre real",
    alt: "Giuliana natural",
  },
];

export const quizQuestions = [
  {
    question: "¿Qué estudia esta persona increíble?",
    options: ["Derecho", "Medicina", "Ingeniería"],
    correct: 1,
  },
  {
    question: "¿Por qué merece esta página?",
    options: ["Porque sí", "Porque es genial", "Todas las anteriores"],
    correct: 2,
  },
  {
    question: "¿Cuánto la aprecio?",
    options: ["Mucho", "Demasiado", "No hay palabra suficiente"],
    correct: 2,
  },
];

export const finale = {
  title: "Giuliana, gracias por existir",
  message: "No necesito una fecha especial para decirte que eres importante. Solo quería que lo supieras.",
  video: "/img/WhatsApp Video 2026-03-09 at 10.38.49 AM.mp4",
};
```

- [ ] **Step 3: Update index page with layout**

Edit `src/pages/index.astro`:

```astro
---
import Layout from '../layouts/Layout.astro';
---

<Layout title="Para Giuliana">
  <main>
    <p class="text-center py-20 text-2xl">Cargando experiencia...</p>
  </main>
</Layout>
```

- [ ] **Step 4: Move images to public folder**

```bash
mv img public/
```

- [ ] **Step 5: Verify images are accessible**

```bash
pnpm dev
```

Open http://localhost:4321/img/unnamed.jpg - should display the image

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add layout and content data structure"
```

---

## Chunk 2: Intro Component

### Task 3: Create Intro Component with Typewriter Effect

**Files:**
- Create: `src/components/Intro.tsx`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Create Intro component**

Create `src/components/Intro.tsx`:

```tsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { intro } from '../data/content';

interface IntroProps {
  onComplete: () => void;
}

export default function Intro({ onComplete }: IntroProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [showButton, setShowButton] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    let index = 0;
    const text = intro.text;

    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
        setTimeout(() => setShowButton(true), 500);
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const handleStart = () => {
    setIsExiting(true);
    setTimeout(onComplete, 800);
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.section
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-deep-black"
        >
          {/* Particles background effect */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-red-violet/30 rounded-full"
                initial={{
                  x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                  y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
                }}
                animate={{
                  y: [null, Math.random() * -100 - 50],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>

          {/* Main content */}
          <div className="relative z-10 text-center px-6 max-w-2xl">
            <p className="text-2xl md:text-4xl font-light leading-relaxed whitespace-pre-line text-white/90">
              {displayedText}
              <span className="animate-pulse">|</span>
            </p>

            <AnimatePresence>
              {showButton && (
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  onClick={handleStart}
                  className="btn-primary mt-12"
                >
                  {intro.buttonText}
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 2: Add Intro to index page**

Edit `src/pages/index.astro`:

```astro
---
import Layout from '../layouts/Layout.astro';
import Intro from '../components/Intro';
---

<Layout title="Para Giuliana">
  <main id="app">
    <Intro client:load onComplete={() => {
      document.getElementById('app')?.classList.add('intro-complete');
    }} />
  </main>
</Layout>

<style>
  #app.intro-complete .intro-section {
    display: none;
  }
</style>
```

- [ ] **Step 3: Test intro animation**

```bash
pnpm dev
```

Expected:
- Particles float in background
- Text types letter by letter
- Button appears after text completes
- Click fades out the intro

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add Intro component with typewriter and particles"
```

---

## Chunk 3: ScratchCard Component

### Task 4: Create ScratchCard with Canvas

**Files:**
- Create: `src/components/ScratchCard.tsx`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Create ScratchCard component**

Create `src/components/ScratchCard.tsx`:

```tsx
import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { scratchCard } from '../data/content';

interface ScratchCardProps {
  onComplete: () => void;
}

export default function ScratchCard({ onComplete }: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [percentage, setPercentage] = useState(0);

  const REVEAL_THRESHOLD = 60;

  const calculateRevealPercentage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return 0;

    const ctx = canvas.getContext('2d');
    if (!ctx) return 0;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparentPixels = 0;

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparentPixels++;
    }

    return (transparentPixels / (pixels.length / 4)) * 100;
  }, []);

  const scratch = useCallback((x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const canvasX = (x - rect.left) * scaleX;
    const canvasY = (y - rect.top) * scaleY;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(canvasX, canvasY, 30, 0, Math.PI * 2);
    ctx.fill();

    const newPercentage = calculateRevealPercentage();
    setPercentage(newPercentage);

    if (newPercentage >= REVEAL_THRESHOLD) {
      setIsRevealed(true);
    }
  }, [isRevealed, calculateRevealPercentage]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fill with scratch layer
    ctx.fillStyle = '#4a4a4a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add some texture
    ctx.fillStyle = '#5a5a5a';
    for (let i = 0; i < 1000; i++) {
      ctx.fillRect(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        2,
        2
      );
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDrawing) scratch(e.clientX, e.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    scratch(touch.clientX, touch.clientY);
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-deep-black px-4 py-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl"
      >
        {/* Background image (revealed content) */}
        <div className="absolute inset-0">
          <img
            src={scratchCard.image}
            alt="Sorpresa para Giuliana"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-deep-black/80 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
            <p className="text-2xl font-light text-white">{scratchCard.revealText}</p>
          </div>
        </div>

        {/* Scratch canvas overlay */}
        <AnimatePresence>
          {!isRevealed && (
            <motion.canvas
              ref={canvasRef}
              width={400}
              height={533}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 w-full h-full cursor-crosshair touch-none"
              onMouseDown={() => setIsDrawing(true)}
              onMouseUp={() => setIsDrawing(false)}
              onMouseLeave={() => setIsDrawing(false)}
              onMouseMove={handleMouseMove}
              onTouchStart={() => setIsDrawing(true)}
              onTouchEnd={() => setIsDrawing(false)}
              onTouchMove={handleTouchMove}
            />
          )}
        </AnimatePresence>

        {/* Instructions */}
        {!isRevealed && percentage < 10 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <p className="text-white/80 text-lg bg-black/50 px-4 py-2 rounded-full">
              Raspa para revelar
            </p>
          </div>
        )}
      </motion.div>

      {/* Progress indicator */}
      {!isRevealed && percentage > 0 && (
        <div className="mt-4 w-full max-w-md">
          <div className="h-1 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-red-violet"
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      )}

      {/* Continue button */}
      <AnimatePresence>
        {isRevealed && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            onClick={onComplete}
            className="btn-primary mt-8"
          >
            {scratchCard.buttonText}
          </motion.button>
        )}
      </AnimatePresence>
    </section>
  );
}
```

- [ ] **Step 2: Verify scratch functionality**

```bash
pnpm dev
```

Expected:
- Grey scratch layer covers image
- Mouse/touch scratches to reveal
- Auto-completes at 60%
- Button appears after reveal

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: add ScratchCard component with canvas scratch mechanic"
```

---

## Chunk 4: Timeline Components

### Task 5: Create Timeline Components

**Files:**
- Create: `src/components/TimelineSection.tsx`
- Create: `src/components/Timeline.tsx`

- [ ] **Step 1: Create TimelineSection component**

Create `src/components/TimelineSection.tsx`:

```tsx
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface TimelineSectionProps {
  image: string;
  message: string;
  alt: string;
  index: number;
}

export default function TimelineSection({ image, message, alt, index }: TimelineSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`flex items-center gap-8 ${isEven ? 'flex-row' : 'flex-row-reverse'}
                  max-md:flex-col max-md:text-center`}
    >
      {/* Image */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full md:w-1/2"
      >
        <div className="relative overflow-hidden rounded-2xl shadow-xl">
          <img
            src={image}
            alt={alt}
            loading="lazy"
            className="w-full aspect-square object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-deep-black/40 to-transparent" />
        </div>
      </motion.div>

      {/* Message */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
        className="w-full md:w-1/2"
      >
        <p className="text-xl md:text-2xl lg:text-3xl font-light text-white/90 leading-relaxed">
          "{message}"
        </p>
      </motion.div>
    </div>
  );
}
```

- [ ] **Step 2: Create Timeline container**

Create `src/components/Timeline.tsx`:

```tsx
import { motion } from 'framer-motion';
import TimelineSection from './TimelineSection';
import { timelineSections } from '../data/content';

interface TimelineProps {
  onComplete: () => void;
}

export default function Timeline({ onComplete }: TimelineProps) {
  return (
    <section className="min-h-screen bg-deep-black py-20 px-4 md:px-8">
      <div className="max-w-5xl mx-auto space-y-24 md:space-y-32">
        {/* Heartbeat line SVG */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-center mb-12"
        >
          <svg
            width="200"
            height="40"
            viewBox="0 0 200 40"
            className="text-red-violet"
          >
            <motion.path
              d="M0,20 L40,20 L50,5 L60,35 L70,10 L80,30 L90,20 L200,20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: 'easeInOut' }}
            />
          </svg>
        </motion.div>

        {/* Timeline sections */}
        {timelineSections.map((section, index) => (
          <div key={index}>
            <TimelineSection
              image={section.image}
              message={section.message}
              alt={section.alt}
              index={index}
            />

            {/* Connector line between sections */}
            {index < timelineSections.length - 1 && (
              <div className="flex justify-center my-12">
                <div className="w-px h-24 bg-gradient-to-b from-red-violet to-transparent" />
              </div>
            )}
          </div>
        ))}

        {/* Continue button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center pt-12"
        >
          <button onClick={onComplete} className="btn-primary">
            Continuar
          </button>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Verify scroll animations work**

```bash
pnpm dev
```

Expected:
- Photos alternate left/right
- Scroll triggers fade-in animations
- Heartbeat line animates
- Mobile shows centered layout

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add Timeline components with scroll animations"
```

---

## Chunk 5: Card Gallery Components

### Task 6: Create FlipCard and CardGallery

**Files:**
- Create: `src/components/FlipCard.tsx`
- Create: `src/components/CardGallery.tsx`

- [ ] **Step 1: Create FlipCard component**

Create `src/components/FlipCard.tsx`:

```tsx
import { useState } from 'react';
import { motion } from 'framer-motion';

interface FlipCardProps {
  image: string;
  message: string;
  alt: string;
  index: number;
}

export default function FlipCard({ image, message, alt, index }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="perspective-1000 cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
      onKeyDown={(e) => e.key === 'Enter' && setIsFlipped(!isFlipped)}
      tabIndex={0}
      role="button"
      aria-label={isFlipped ? `Ocultar: ${message}` : 'Voltear carta'}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
        className="relative w-full aspect-[3/4] preserve-3d"
      >
        {/* Card back (initial state) */}
        <div className="absolute inset-0 backface-hidden rounded-xl overflow-hidden shadow-xl border-2 border-red-violet/30">
          <div className="w-full h-full bg-gradient-to-br from-red-violet to-deep-black flex items-center justify-center">
            {/* Geometric pattern */}
            <div className="absolute inset-4 border border-soft-pink/20 rounded-lg" />
            <div className="absolute inset-8 border border-soft-pink/10 rounded-lg" />
            <div className="text-6xl text-soft-pink/50">♥</div>
          </div>
        </div>

        {/* Card front (revealed) */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-xl overflow-hidden shadow-xl">
          <img
            src={image}
            alt={alt}
            loading="lazy"
            className="w-full h-3/4 object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-deep-black flex items-center justify-center p-4">
            <p className="text-center text-sm md:text-base font-light text-white/90">
              "{message}"
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
```

- [ ] **Step 2: Create CardGallery container**

Create `src/components/CardGallery.tsx`:

```tsx
import { motion } from 'framer-motion';
import FlipCard from './FlipCard';
import { cards } from '../data/content';

interface CardGalleryProps {
  onComplete: () => void;
}

export default function CardGallery({ onComplete }: CardGalleryProps) {
  return (
    <section className="min-h-screen bg-deep-black py-20 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Section title */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-light text-center mb-12 text-white/90"
        >
          Momentos que guardo
        </motion.h2>

        <p className="text-center text-white/60 mb-8">
          Haz click en cada carta para revelar
        </p>

        {/* Card grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {cards.map((card, index) => (
            <FlipCard
              key={index}
              image={card.image}
              message={card.message}
              alt={card.alt}
              index={index}
            />
          ))}
        </div>

        {/* Continue button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center pt-16"
        >
          <button onClick={onComplete} className="btn-primary">
            Continuar al quiz
          </button>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Verify 3D flip effect**

```bash
pnpm dev
```

Expected:
- Cards show back design initially
- Click flips card with 3D effect
- Front shows image + message
- Responsive grid (2 cols mobile, 4 cols desktop)

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add FlipCard and CardGallery components"
```

---

## Chunk 6: Quiz Component

### Task 7: Create Quiz Component

**Files:**
- Create: `src/components/Quiz.tsx`

- [ ] **Step 1: Create Quiz component**

Create `src/components/Quiz.tsx`:

```tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { quizQuestions } from '../data/content';

interface QuizProps {
  onComplete: () => void;
}

export default function Quiz({ onComplete }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [shake, setShake] = useState(false);
  const [correct, setCorrect] = useState(false);

  const question = quizQuestions[currentQuestion];
  const isLastQuestion = currentQuestion === quizQuestions.length - 1;

  const handleAnswer = (index: number) => {
    if (index === question.correct) {
      setCorrect(true);
      setTimeout(() => {
        setCorrect(false);
        if (isLastQuestion) {
          onComplete();
        } else {
          setCurrentQuestion((prev) => prev + 1);
        }
      }, 1000);
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <section className="min-h-screen bg-deep-black flex items-center justify-center px-4 py-20">
      <div className="max-w-xl w-full">
        {/* Progress dots */}
        <div className="flex justify-center gap-2 mb-12">
          {quizQuestions.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentQuestion
                  ? 'bg-red-violet'
                  : index < currentQuestion
                  ? 'bg-soft-pink'
                  : 'bg-white/20'
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{
              opacity: 1,
              x: shake ? [0, -10, 10, -10, 10, 0] : 0,
            }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            {/* Question */}
            <h2 className="text-2xl md:text-3xl font-light text-white mb-12">
              {question.question}
            </h2>

            {/* Options */}
            <div className="space-y-4">
              {question.options.map((option, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(index)}
                  disabled={correct}
                  className={`w-full py-4 px-6 rounded-xl border-2 transition-all
                    ${correct && index === question.correct
                      ? 'bg-green-500/20 border-green-500 text-green-400'
                      : 'border-white/20 hover:border-red-violet hover:bg-red-violet/10 text-white'
                    }
                    disabled:cursor-not-allowed
                  `}
                >
                  {option}
                </motion.button>
              ))}
            </div>

            {/* Feedback */}
            <AnimatePresence>
              {correct && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-8 text-green-400 text-xl"
                >
                  {isLastQuestion ? '¡Perfecto! 🎉' : '¡Correcto! ✓'}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify quiz functionality**

```bash
pnpm dev
```

Expected:
- Progress dots show current question
- Wrong answer shakes the component
- Correct answer highlights green
- Transitions to next question
- Last question triggers onComplete

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: add Quiz component with shake feedback"
```

---

## Chunk 7: Finale Component

### Task 8: Create Finale with Confetti

**Files:**
- Create: `src/components/Finale.tsx`

- [ ] **Step 1: Create Finale component**

Create `src/components/Finale.tsx`:

```tsx
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { finale } from '../data/content';

export default function Finale() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Fire confetti on mount
    const duration = 3000;
    const end = Date.now() + duration;

    const colors = ['#c41e5c', '#ff6b9d', '#ffffff'];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, []);

  return (
    <section className="min-h-screen bg-deep-black flex flex-col items-center justify-center px-4 py-20 text-center">
      {/* Animated heart */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', delay: 0.5 }}
        className="text-6xl md:text-8xl mb-8 animate-heartbeat"
      >
        ❤️
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="text-3xl md:text-5xl font-light text-white mb-8"
      >
        {finale.title}
      </motion.h1>

      {/* Message */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="text-lg md:text-xl text-white/80 max-w-md leading-relaxed mb-12"
      >
        {finale.message}
      </motion.p>

      {/* Video */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2 }}
        className="w-full max-w-md rounded-2xl overflow-hidden shadow-2xl"
      >
        <video
          ref={videoRef}
          src={finale.video}
          controls
          playsInline
          className="w-full"
          poster=""
        >
          Tu navegador no soporta videos.
        </video>
      </motion.div>

      {/* Final floating heart */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="mt-12 text-4xl animate-float"
      >
        💖
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Verify confetti and animations**

```bash
pnpm dev
```

Expected:
- Confetti bursts from sides on load
- Heart animates in with heartbeat
- Text fades in sequentially
- Video player appears last
- Floating heart at bottom

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: add Finale component with confetti celebration"
```

---

## Chunk 8: Integration and Polish

### Task 9: Integrate All Components

**Files:**
- Modify: `src/pages/index.astro`
- Create: `src/components/App.tsx`

- [ ] **Step 1: Create main App orchestrator**

Create `src/components/App.tsx`:

```tsx
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Intro from './Intro';
import ScratchCard from './ScratchCard';
import Timeline from './Timeline';
import CardGallery from './CardGallery';
import Quiz from './Quiz';
import Finale from './Finale';

type Section = 'intro' | 'scratch' | 'timeline' | 'cards' | 'quiz' | 'finale';

export default function App() {
  const [currentSection, setCurrentSection] = useState<Section>('intro');

  const goTo = (section: Section) => setCurrentSection(section);

  return (
    <AnimatePresence mode="wait">
      {currentSection === 'intro' && (
        <Intro key="intro" onComplete={() => goTo('scratch')} />
      )}
      {currentSection === 'scratch' && (
        <ScratchCard key="scratch" onComplete={() => goTo('timeline')} />
      )}
      {currentSection === 'timeline' && (
        <Timeline key="timeline" onComplete={() => goTo('cards')} />
      )}
      {currentSection === 'cards' && (
        <CardGallery key="cards" onComplete={() => goTo('quiz')} />
      )}
      {currentSection === 'quiz' && (
        <Quiz key="quiz" onComplete={() => goTo('finale')} />
      )}
      {currentSection === 'finale' && (
        <Finale key="finale" />
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 2: Update index page to use App**

Edit `src/pages/index.astro`:

```astro
---
import Layout from '../layouts/Layout.astro';
import App from '../components/App';
---

<Layout title="Para Giuliana">
  <App client:load />
</Layout>
```

- [ ] **Step 3: Full flow test**

```bash
pnpm dev
```

Test complete flow:
1. Intro types text, click Comenzar
2. Scratch to reveal, click Continuar
3. Scroll through timeline, click Continuar
4. Flip all cards, click Continuar al quiz
5. Answer quiz questions correctly
6. Finale with confetti plays

- [ ] **Step 4: Commit integration**

```bash
git add -A
git commit -m "feat: integrate all components in main App flow"
```

---

### Task 10: Final Polish and Accessibility

**Files:**
- Modify: `src/components/Intro.tsx` (reduce motion)
- Modify: `src/styles/global.css` (a11y)
- Create: `public/favicon.svg`

- [ ] **Step 1: Add favicon**

Create `public/favicon.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <text y=".9em" font-size="90">❤️</text>
</svg>
```

- [ ] **Step 2: Add reduced motion support**

Add to `src/styles/global.css`:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 3: Production build test**

```bash
pnpm build
pnpm preview
```

Expected: No build errors, preview works at localhost:4321

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "feat: add favicon and accessibility improvements"
```

---

### Task 11: Deploy to Vercel

- [ ] **Step 1: Install Vercel CLI (if needed)**

```bash
pnpm add -g vercel
```

- [ ] **Step 2: Deploy**

```bash
vercel
```

Follow prompts:
- Set up and deploy: Y
- Scope: your account
- Link to existing project: N
- Project name: para-giuliana
- Directory: ./
- Override settings: N

- [ ] **Step 3: Note deployment URL**

Expected output includes production URL like: https://para-giuliana.vercel.app

- [ ] **Step 4: Final commit with deployment**

```bash
git add -A
git commit -m "chore: configure for Vercel deployment"
```

---

## Summary

| Chunk | Tasks | Components |
|-------|-------|------------|
| 1 | Setup, Layout, Content | Base project |
| 2 | Intro | Typewriter + particles |
| 3 | ScratchCard | Canvas scratch reveal |
| 4 | Timeline | Scroll animations |
| 5 | CardGallery | 3D flip cards |
| 6 | Quiz | Interactive quiz |
| 7 | Finale | Confetti celebration |
| 8 | Integration | Full flow + polish |

Total: 11 tasks, ~55 steps
