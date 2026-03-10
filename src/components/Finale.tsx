import { useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { finale } from "../data/content";

export default function Finale() {
  useEffect(() => {
    const duration = 3000;
    const end = Date.now() + duration;
    const colors = ["#c41e5c", "#ff6b9d", "#ffffff"];

    const frame = () => {
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
    };

    frame();
  }, []);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-gradient-to-b from-pink-900 to-pink-950">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", duration: 0.8 }}
        className="text-6xl md:text-8xl animate-heartbeat mb-8"
      >
        💖
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-3xl md:text-5xl font-bold text-white text-center mb-6"
      >
        {finale.title}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-lg md:text-xl text-pink-200 text-center max-w-2xl mb-10"
      >
        {finale.message}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7 }}
        className="w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl"
      >
        <video
          src={finale.video}
          controls
          className="w-full"
          playsInline
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-12 text-4xl animate-float"
      >
        💕
      </motion.div>
    </section>
  );
}
