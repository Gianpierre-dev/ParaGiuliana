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

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleFlip();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: 15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1, type: 'spring' }}
      viewport={{ once: true }}
      className="w-full aspect-[3/4]"
      style={{ perspective: '1000px' }}
    >
      <motion.div
        onClick={handleFlip}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-label={`Flip card: ${alt}`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        className="relative w-full h-full cursor-pointer"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Back - revealed state (image + message) */}
        <div
          className="absolute inset-0 rounded-2xl sm:rounded-3xl overflow-hidden"
          style={{
            boxShadow: '0 0 40px rgba(196, 30, 92, 0.4), 0 20px 40px rgba(0, 0, 0, 0.5)',
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          {/* Decorative border */}
          <div className="absolute inset-0 rounded-2xl sm:rounded-3xl border-2 border-soft-pink/30 pointer-events-none z-10" />

          {/* Image */}
          <div className="absolute inset-0">
            <img
              src={image}
              alt={alt}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {/* Gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-deep-black via-deep-black/30 to-transparent" />
          </div>

          {/* Message overlay at bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={isFlipped ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="text-white text-xs sm:text-sm text-center font-medium leading-relaxed text-glow"
            >
              "{message}"
            </motion.p>
          </div>
        </div>

        {/* Front - initial state (heart symbol) */}
        <div
          className="absolute inset-0 rounded-2xl sm:rounded-3xl overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #c41e5c 0%, #1a0a10 50%, #c41e5c 100%)',
            backgroundSize: '200% 200%',
            boxShadow: '0 0 30px rgba(196, 30, 92, 0.3), 0 15px 30px rgba(0, 0, 0, 0.4)',
            backfaceVisibility: 'hidden',
          }}
        >
          {/* Decorative border */}
          <div className="absolute inset-0 rounded-2xl sm:rounded-3xl border border-soft-pink/20 pointer-events-none" />

          {/* Shimmer effect */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
              backgroundSize: '200% 200%',
              animation: 'shimmer 3s linear infinite',
            }}
          />

          {/* Heart icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{
                scale: [1, 1.15, 1, 1.15, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-12 h-12 sm:w-16 sm:h-16 text-soft-pink"
                style={{
                  filter: 'drop-shadow(0 0 15px rgba(255, 107, 157, 0.8))',
                }}
              >
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
            </motion.div>
          </div>

          {/* Tap hint */}
          <div className="absolute bottom-3 left-0 right-0 text-center">
            <motion.p
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-white/60 text-xs font-medium"
            >
              Toca para revelar
            </motion.p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
