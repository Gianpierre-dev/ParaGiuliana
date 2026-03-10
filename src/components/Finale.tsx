import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { finale } from "../data/content";

interface FloatingHeart {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

export default function Finale() {
  // Generate floating hearts
  const floatingHearts = useMemo<FloatingHeart[]>(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 20 + 10,
      delay: Math.random() * 3,
      duration: Math.random() * 4 + 4,
    }));
  }, []);

  useEffect(() => {
    // Initial burst
    const burst = () => {
      confetti({
        particleCount: 100,
        spread: 100,
        origin: { x: 0.5, y: 0.5 },
        colors: ["#c41e5c", "#ff6b9d", "#ff2d75", "#ffffff", "#fbbf24"],
      });
    };
    burst();

    // Continuous side confetti
    const duration = 5000;
    const end = Date.now() + duration;
    const colors = ["#c41e5c", "#ff6b9d", "#ff2d75", "#ffffff"];

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      });

      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }, []);

  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at center top, #1a0510 0%, #0a0305 50%, #050505 100%)',
      }}
    >
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-violet/20 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-soft-pink/15 rounded-full blur-3xl animate-float" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-hot-pink/10 rounded-full blur-3xl animate-pulse-glow" />

        {/* Floating hearts */}
        {floatingHearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute text-soft-pink/30"
            style={{
              left: `${heart.x}%`,
              top: `${heart.y}%`,
              fontSize: heart.size,
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, 10, -10, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: heart.duration,
              delay: heart.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            ♥
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center max-w-3xl mx-auto">
        {/* Big heart */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 1, bounce: 0.5 }}
          className="mb-6 sm:mb-8"
        >
          <motion.span
            animate={{
              scale: [1, 1.15, 1, 1.15, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="text-6xl sm:text-7xl md:text-8xl block"
            style={{
              filter: 'drop-shadow(0 0 30px rgba(255, 107, 157, 0.8))',
            }}
          >
            💖
          </motion.span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-center mb-4 sm:mb-6 px-4"
        >
          <span className="text-gradient text-glow font-medium">{finale.title}</span>
        </motion.h1>

        {/* Message */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-lg sm:text-xl md:text-2xl text-white/80 text-center max-w-2xl mb-8 sm:mb-10 px-4 leading-relaxed"
        >
          {finale.message}
        </motion.p>

        {/* Video container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8, type: "spring" }}
          className="w-full max-w-2xl px-4"
        >
          <div
            className="rounded-2xl sm:rounded-3xl overflow-hidden"
            style={{
              boxShadow: '0 0 60px rgba(196, 30, 92, 0.4), 0 30px 60px rgba(0, 0, 0, 0.5)',
              border: '2px solid rgba(196, 30, 92, 0.3)',
            }}
          >
            <video
              src={finale.video}
              controls
              className="w-full"
              playsInline
            />
          </div>
        </motion.div>

        {/* Bottom hearts */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-10 sm:mt-12 flex gap-4"
        >
          {['💕', '💗', '💕'].map((emoji, i) => (
            <motion.span
              key={i}
              animate={{
                y: [0, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                delay: i * 0.3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-3xl sm:text-4xl"
              style={{
                filter: 'drop-shadow(0 0 15px rgba(255, 107, 157, 0.5))',
              }}
            >
              {emoji}
            </motion.span>
          ))}
        </motion.div>

        {/* Signature */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-8 text-white/40 text-sm sm:text-base italic"
        >
          Con todo mi cariño ✨
        </motion.p>
      </div>
    </section>
  );
}
