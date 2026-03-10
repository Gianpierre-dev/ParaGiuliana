import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { scratchCard } from '../data/content';

interface ScratchCardProps {
  onComplete: () => void;
}

const REVEAL_THRESHOLD = 0.6;
const SCRATCH_RADIUS = 30;

export default function ScratchCard({ onComplete }: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isScratching, setIsScratching] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fill with grey scratch layer
    ctx.fillStyle = '#6b7280';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add scratch instruction text
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 18px Inter, system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Rasca aqui', canvas.width / 2, canvas.height / 2);
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

    // Check alpha channel (every 4th value starting at index 3)
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) {
        transparentPixels++;
      }
    }

    const totalPixels = pixels.length / 4;
    return transparentPixels / totalPixels;
  };

  const handleScratchStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (isRevealed) return;
    setIsScratching(true);

    const coords = getCoordinates(e);
    if (coords) {
      scratch(coords.x, coords.y);
    }
  };

  const handleScratchMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isScratching || isRevealed) return;

    const coords = getCoordinates(e);
    if (coords) {
      scratch(coords.x, coords.y);
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
    <section className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-soft-pink mb-2">
          {scratchCard.revealText}
        </h2>
      </motion.div>

      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative w-full max-w-md aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl"
      >
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
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 w-full h-full cursor-crosshair touch-none"
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

        {/* Revealed overlay */}
        <AnimatePresence>
          {isRevealed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-gradient-to-t from-deep-black/60 to-transparent"
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* Continue button */}
      <AnimatePresence>
        {isRevealed && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4, delay: 0.3 }}
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
