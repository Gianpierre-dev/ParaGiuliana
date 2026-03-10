import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { scratchCard } from '../data/content';

interface ScratchCardProps {
  onComplete: () => void;
}

const REVEAL_THRESHOLD = 0.55;
const SCRATCH_RADIUS = 35;

export default function ScratchCard({ onComplete }: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isScratching, setIsScratching] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [scratchProgress, setScratchProgress] = useState(0);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#374151');
    gradient.addColorStop(0.5, '#4b5563');
    gradient.addColorStop(1, '#374151');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add shimmer effect pattern
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    for (let i = 0; i < 100; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const size = Math.random() * 3 + 1;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
  }, []);

  useEffect(() => {
    if (imageLoaded) {
      initCanvas();
    }
  }, [imageLoaded, initCanvas]);

  useEffect(() => {
    const handleResize = () => {
      if (!isRevealed && imageLoaded) {
        initCanvas();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isRevealed, imageLoaded, initCanvas]);

  const getCoordinates = (
    e: React.MouseEvent | React.TouchEvent
  ): { x: number; y: number } | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();

    if ('touches' in e) {
      const touch = e.touches[0];
      if (!touch) return null;
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      };
    }

    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const scratch = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.globalCompositeOperation = 'destination-out';

    // Create soft scratch effect
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, SCRATCH_RADIUS);
    gradient.addColorStop(0, 'rgba(0,0,0,1)');
    gradient.addColorStop(0.5, 'rgba(0,0,0,0.8)');
    gradient.addColorStop(1, 'rgba(0,0,0,0)');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, SCRATCH_RADIUS, 0, Math.PI * 2);
    ctx.fill();
  };

  const calculateRevealedPercentage = (): number => {
    const canvas = canvasRef.current;
    if (!canvas) return 0;

    const ctx = canvas.getContext('2d');
    if (!ctx) return 0;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparentPixels = 0;

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] < 128) {
        transparentPixels++;
      }
    }

    const totalPixels = pixels.length / 4;
    return transparentPixels / totalPixels;
  };

  const handleScratchStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (isRevealed) return;
    e.preventDefault();
    setIsScratching(true);

    const coords = getCoordinates(e);
    if (coords) {
      scratch(coords.x, coords.y);
    }
  };

  const handleScratchMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isScratching || isRevealed) return;
    e.preventDefault();

    const coords = getCoordinates(e);
    if (coords) {
      scratch(coords.x, coords.y);

      // Update progress periodically
      const percentage = calculateRevealedPercentage();
      setScratchProgress(Math.min(percentage / REVEAL_THRESHOLD * 100, 100));
    }
  };

  const handleScratchEnd = () => {
    if (isRevealed) return;
    setIsScratching(false);

    const percentage = calculateRevealedPercentage();
    if (percentage >= REVEAL_THRESHOLD) {
      setIsRevealed(true);
    }
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8"
      style={{
        background: 'radial-gradient(ellipse at center, #0f0f0f 0%, #050505 100%)',
      }}
    >
      {/* Title with glow */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-6 sm:mb-8"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-gradient text-glow">
          {scratchCard.revealText}
        </h2>
      </motion.div>

      {/* Scratch card container */}
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
        animate={{ opacity: 1, scale: 1, rotateX: 0 }}
        transition={{ duration: 0.8, delay: 0.2, type: 'spring' }}
        className="relative w-full max-w-sm sm:max-w-md aspect-[3/4] rounded-3xl overflow-hidden card-glow"
        style={{
          boxShadow: '0 0 60px rgba(196, 30, 92, 0.3), 0 25px 50px rgba(0, 0, 0, 0.5)',
        }}
      >
        {/* Decorative border */}
        <div className="absolute inset-0 rounded-3xl border-2 border-red-violet/30 pointer-events-none z-20" />

        {/* Background image */}
        <img
          src={scratchCard.image}
          alt="Sorpresa para Giuliana"
          onLoad={handleImageLoad}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Scratch canvas layer */}
        <AnimatePresence>
          {!isRevealed && (
            <motion.canvas
              ref={canvasRef}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 w-full h-full cursor-crosshair touch-none z-10"
              onMouseDown={handleScratchStart}
              onMouseMove={handleScratchMove}
              onMouseUp={handleScratchEnd}
              onMouseLeave={handleScratchEnd}
              onTouchStart={handleScratchStart}
              onTouchMove={handleScratchMove}
              onTouchEnd={handleScratchEnd}
              aria-label="Area para raspar y revelar la imagen"
              role="img"
            />
          )}
        </AnimatePresence>

        {/* Instruction overlay */}
        <AnimatePresence>
          {!isRevealed && scratchProgress < 10 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-5xl sm:text-6xl mb-4"
              >
                👆
              </motion.div>
              <p className="text-white text-lg sm:text-xl font-medium px-6 py-3 rounded-full glass-effect">
                Raspa para revelar
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress glow effect */}
        {!isRevealed && scratchProgress > 10 && (
          <div
            className="absolute inset-0 pointer-events-none z-15 transition-opacity duration-300"
            style={{
              boxShadow: `inset 0 0 ${scratchProgress}px rgba(255, 107, 157, ${scratchProgress / 200})`,
            }}
          />
        )}
      </motion.div>

      {/* Progress bar */}
      <AnimatePresence>
        {!isRevealed && scratchProgress > 5 && (
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: '100%' }}
            exit={{ opacity: 0 }}
            className="w-full max-w-sm sm:max-w-md mt-6"
          >
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #c41e5c, #ff6b9d, #c41e5c)',
                  backgroundSize: '200% 100%',
                  width: `${scratchProgress}%`,
                }}
                animate={{
                  backgroundPosition: ['0% center', '200% center'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            </div>
            <p className="text-white/50 text-sm text-center mt-2">
              {Math.round(scratchProgress)}% revelado
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Continue button */}
      <AnimatePresence>
        {isRevealed && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, type: 'spring' }}
            className="mt-8"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onComplete}
              className="btn-primary text-lg px-10 py-4"
            >
              <span className="flex items-center gap-3">
                {scratchCard.buttonText}
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
