import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { intro } from '../data/content';

interface IntroProps {
  onComplete: () => void;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
  type: 'circle' | 'heart';
}

function Particles() {
  const particles = useMemo<Particle[]>(() => {
    const colors = ['#c41e5c', '#ff6b9d', '#ff2d75', '#8b5cf6', '#fbbf24'];
    return Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 2,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      type: Math.random() > 0.85 ? 'heart' : 'circle',
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-violet/20 rounded-full blur-3xl animate-float-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-soft-pink/15 rounded-full blur-3xl animate-float" />
      <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-purple/10 rounded-full blur-3xl animate-float-slow" />

      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -50 - Math.random() * 30, 0],
            x: [0, (Math.random() - 0.5) * 20, 0],
            opacity: [0.2, 0.9, 0.2],
            scale: [0.8, 1.3, 0.8],
            rotate: particle.type === 'heart' ? [0, 15, -15, 0] : 0,
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {particle.type === 'heart' ? (
            <span
              style={{
                fontSize: particle.size * 3,
                color: particle.color,
                filter: `drop-shadow(0 0 ${particle.size}px ${particle.color})`,
              }}
            >
              ♥
            </span>
          ) : (
            <div
              className="rounded-full"
              style={{
                width: particle.size,
                height: particle.size,
                backgroundColor: particle.color,
                boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}

function Typewriter({ text, onComplete }: { text: string; onComplete: () => void }) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (displayedText.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, 60);
      return () => clearTimeout(timeout);
    } else if (!isComplete) {
      setIsComplete(true);
      setTimeout(onComplete, 300);
    }
  }, [displayedText, text, isComplete, onComplete]);

  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-relaxed whitespace-pre-line text-gradient text-glow">
        {displayedText}
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="inline-block w-1 h-8 sm:h-10 md:h-12 bg-gradient-to-b from-soft-pink to-red-violet ml-2 align-middle rounded-full"
          style={{ boxShadow: '0 0 15px #ff6b9d' }}
        />
      </p>
    </motion.div>
  );
}

export default function Intro({ onComplete }: IntroProps) {
  const [showButton, setShowButton] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const handleTypewriterComplete = () => {
    setShowButton(true);
  };

  const handleClick = () => {
    setIsExiting(true);
  };

  const handleExitComplete = () => {
    onComplete();
  };

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {!isExiting && (
        <motion.section
          className="fixed inset-0 z-50 flex flex-col items-center justify-center px-4 sm:px-6"
          style={{
            background: 'radial-gradient(ellipse at center, #0f0f0f 0%, #050505 100%)',
          }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 1 }}
        >
          <Particles />

          <div className="relative z-10 flex flex-col items-center gap-10 sm:gap-12 max-w-4xl mx-auto">
            <Typewriter text={intro.text} onComplete={handleTypewriterComplete} />

            <AnimatePresence>
              {showButton && (
                <motion.button
                  className="btn-primary text-lg sm:text-xl px-10 sm:px-12 py-4 sm:py-5"
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{
                    duration: 0.6,
                    type: 'spring',
                    stiffness: 200,
                  }}
                  onClick={handleClick}
                  aria-label="Comenzar experiencia"
                >
                  <span className="flex items-center gap-3">
                    {intro.buttonText}
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </span>
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-deep-black/80 to-transparent pointer-events-none" />
        </motion.section>
      )}
    </AnimatePresence>
  );
}
